import { TransactionType, TransactionEventOrigin } from './transaction';
import { IgxBaseTransactionService } from './base-transaction';
import { EventEmitter } from '@angular/core';
import { isObject, mergeObjects } from '../../core/utils';
export class IgxTransactionService extends IgxBaseTransactionService {
    constructor() {
        super(...arguments);
        /**
         * @inheritdoc
         */
        this.onStateUpdate = new EventEmitter();
        this._transactions = [];
        this._redoStack = [];
        this._undoStack = [];
        this._states = new Map();
    }
    /**
     * @inheritdoc
     */
    get canUndo() {
        return this._undoStack.length > 0;
    }
    /**
     * @inheritdoc
     */
    get canRedo() {
        return this._redoStack.length > 0;
    }
    /**
     * @inheritdoc
     */
    add(transaction, recordRef) {
        const states = this._isPending ? this._pendingStates : this._states;
        this.verifyAddedTransaction(states, transaction, recordRef);
        this.addTransaction(transaction, states, recordRef);
    }
    /**
     * @inheritdoc
     */
    getTransactionLog(id) {
        if (id !== undefined) {
            return this._transactions.filter(t => t.id === id);
        }
        return [...this._transactions];
    }
    /**
     * @inheritdoc
     */
    getAggregatedChanges(mergeChanges) {
        const result = [];
        this._states.forEach((state, key) => {
            const value = mergeChanges ? this.mergeValues(state.recordRef, state.value) : state.value;
            result.push({ id: key, newValue: value, type: state.type });
        });
        return result;
    }
    /**
     * @inheritdoc
     */
    getState(id, pending = false) {
        return pending ? this._pendingStates.get(id) : this._states.get(id);
    }
    /**
     * @inheritdoc
     */
    get enabled() {
        return true;
    }
    /**
     * @inheritdoc
     */
    getAggregatedValue(id, mergeChanges) {
        const state = this._states.get(id);
        const pendingState = super.getState(id);
        //  if there is no state and there is no pending state return null
        if (!state && !pendingState) {
            return null;
        }
        const pendingChange = super.getAggregatedValue(id, false);
        const change = state && state.value;
        let aggregatedValue = this.mergeValues(change, pendingChange);
        if (mergeChanges) {
            const originalValue = state ? state.recordRef : pendingState.recordRef;
            aggregatedValue = this.mergeValues(originalValue, aggregatedValue);
        }
        return aggregatedValue;
    }
    /**
     * @inheritdoc
     */
    endPending(commit) {
        this._isPending = false;
        if (commit) {
            const actions = [];
            // don't use addTransaction due to custom undo handling
            for (const transaction of this._pendingTransactions) {
                const pendingState = this._pendingStates.get(transaction.id);
                this._transactions.push(transaction);
                this.updateState(this._states, transaction, pendingState.recordRef);
                actions.push({ transaction, recordRef: pendingState.recordRef });
            }
            this._undoStack.push(actions);
            this._redoStack = [];
            this.onStateUpdate.emit({ origin: TransactionEventOrigin.END, actions });
        }
        super.endPending(commit);
    }
    /**
     * @inheritdoc
     */
    commit(data, id) {
        if (id !== undefined) {
            const state = this.getState(id);
            if (state) {
                this.updateRecord(data, state);
            }
        }
        else {
            this._states.forEach((s) => {
                this.updateRecord(data, s);
            });
        }
        this.clear(id);
    }
    /**
     * @inheritdoc
     */
    clear(id) {
        if (id !== undefined) {
            this._transactions = this._transactions.filter(t => t.id !== id);
            this._states.delete(id);
            //  Undo stack is an array of actions. Each action is array of transaction like objects
            //  We are going trough all the actions. For each action we are filtering out transactions
            //  with provided id. Finally if any action ends up as empty array we are removing it from
            //  undo stack
            this._undoStack = this._undoStack.map(a => a.filter(t => t.transaction.id !== id)).filter(a => a.length > 0);
        }
        else {
            this._transactions = [];
            this._states.clear();
            this._undoStack = [];
        }
        this._redoStack = [];
        this.onStateUpdate.emit({ origin: TransactionEventOrigin.CLEAR, actions: [] });
    }
    /**
     * @inheritdoc
     */
    undo() {
        if (this._undoStack.length <= 0) {
            return;
        }
        const lastActions = this._undoStack.pop();
        this._transactions.splice(this._transactions.length - lastActions.length);
        this._redoStack.push(lastActions);
        this._states.clear();
        for (const currentActions of this._undoStack) {
            for (const transaction of currentActions) {
                this.updateState(this._states, transaction.transaction, transaction.recordRef);
            }
        }
        this.onStateUpdate.emit({ origin: TransactionEventOrigin.UNDO, actions: lastActions });
    }
    /**
     * @inheritdoc
     */
    redo() {
        if (this._redoStack.length > 0) {
            const actions = this._redoStack.pop();
            for (const action of actions) {
                this.updateState(this._states, action.transaction, action.recordRef);
                this._transactions.push(action.transaction);
            }
            this._undoStack.push(actions);
            this.onStateUpdate.emit({ origin: TransactionEventOrigin.REDO, actions });
        }
    }
    addTransaction(transaction, states, recordRef) {
        this.updateState(states, transaction, recordRef);
        const transactions = this._isPending ? this._pendingTransactions : this._transactions;
        transactions.push(transaction);
        if (!this._isPending) {
            const actions = [{ transaction, recordRef }];
            this._undoStack.push(actions);
            this._redoStack = [];
            this.onStateUpdate.emit({ origin: TransactionEventOrigin.ADD, actions });
        }
    }
    /**
     * Verifies if the passed transaction is correct. If not throws an exception.
     *
     * @param transaction Transaction to be verified
     */
    verifyAddedTransaction(states, transaction, recordRef) {
        const state = states.get(transaction.id);
        switch (transaction.type) {
            case TransactionType.ADD:
                if (state) {
                    //  cannot add same item twice
                    throw new Error(`Cannot add this transaction. Transaction with id: ${transaction.id} has been already added.`);
                }
                break;
            case TransactionType.DELETE:
            case TransactionType.UPDATE:
                if (state && state.type === TransactionType.DELETE) {
                    //  cannot delete or update deleted items
                    throw new Error(`Cannot add this transaction. Transaction with id: ${transaction.id} has been already deleted.`);
                }
                if (!state && !recordRef && !this._isPending) {
                    //  cannot initially add transaction or delete item with no recordRef
                    throw new Error(`Cannot add this transaction. This is first transaction of type ${transaction.type} ` +
                        `for id ${transaction.id}. For first transaction of this type recordRef is mandatory.`);
                }
                break;
        }
    }
    /**
     * Updates the provided states collection according to passed transaction and recordRef
     *
     * @param states States collection to apply the update to
     * @param transaction Transaction to apply to the current state
     * @param recordRef Reference to the value of the record in data source, if any, where transaction should be applied
     */
    updateState(states, transaction, recordRef) {
        let state = states.get(transaction.id);
        //  if TransactionType is ADD simply add transaction to states;
        //  if TransactionType is DELETE:
        //    - if there is state with this id of type ADD remove it from the states;
        //    - if there is state with this id of type UPDATE change its type to DELETE;
        //    - if there is no state with this id add transaction to states;
        //  if TransactionType is UPDATE:
        //    - if there is state with this id of type ADD merge new value and state recordRef into state new value
        //    - if there is state with this id of type UPDATE merge new value into state new value
        //    - if there is state with this id and state type is DELETE change its type to UPDATE
        //    - if there is no state with this id add transaction to states;
        if (state) {
            switch (transaction.type) {
                case TransactionType.DELETE:
                    if (state.type === TransactionType.ADD) {
                        states.delete(transaction.id);
                    }
                    else if (state.type === TransactionType.UPDATE) {
                        state.value = transaction.newValue;
                        state.type = TransactionType.DELETE;
                    }
                    break;
                case TransactionType.UPDATE:
                    if (isObject(state.value)) {
                        if (state.type === TransactionType.ADD) {
                            state.value = this.mergeValues(state.value, transaction.newValue);
                        }
                        if (state.type === TransactionType.UPDATE) {
                            mergeObjects(state.value, transaction.newValue);
                        }
                    }
                    else {
                        state.value = transaction.newValue;
                    }
            }
        }
        else {
            state = { value: this.cloneStrategy.clone(transaction.newValue), recordRef, type: transaction.type };
            states.set(transaction.id, state);
        }
        //  should not clean pending state. This will happen automatically on endPending call
        if (!this._isPending) {
            this.cleanState(transaction.id, states);
        }
    }
    /**
     * Compares the state with recordRef and clears all duplicated values. If any state ends as
     * empty object removes it from states.
     *
     * @param state State to clean
     */
    cleanState(id, states) {
        const state = states.get(id);
        //  do nothing if
        //  there is no state, or
        //  there is no state value (e.g. DELETED transaction), or
        //  there is no recordRef (e.g. ADDED transaction)
        if (state && state.value && state.recordRef) {
            //  if state's value is object compare each key with the ones in recordRef
            //  if values in any key are the same delete it from state's value
            //  if state's value is not object, simply compare with recordRef and remove
            //  the state if they are equal
            if (isObject(state.recordRef)) {
                for (const key of Object.keys(state.value)) {
                    if (JSON.stringify(state.recordRef[key]) === JSON.stringify(state.value[key])) {
                        delete state.value[key];
                    }
                }
                //  if state's value is empty remove the state from the states, only if state is not DELETE type
                if (state.type !== TransactionType.DELETE && Object.keys(state.value).length === 0) {
                    states.delete(id);
                }
            }
            else {
                if (state.recordRef === state.value) {
                    states.delete(id);
                }
            }
        }
    }
    /**
     * Updates state related record in the provided data
     *
     * @param data Data source to update
     * @param state State to update data from
     */
    updateRecord(data, state) {
        const index = data.findIndex(i => JSON.stringify(i) === JSON.stringify(state.recordRef || {}));
        switch (state.type) {
            case TransactionType.ADD:
                data.push(state.value);
                break;
            case TransactionType.DELETE:
                if (0 <= index && index < data.length) {
                    data.splice(index, 1);
                }
                break;
            case TransactionType.UPDATE:
                if (0 <= index && index < data.length) {
                    data[index] = this.updateValue(state);
                }
                break;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWd4LXRyYW5zYWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaWduaXRldWktYW5ndWxhci9zcmMvbGliL3NlcnZpY2VzL3RyYW5zYWN0aW9uL2lneC10cmFuc2FjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQXNCLGVBQWUsRUFBb0Isc0JBQXNCLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDdEgsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDL0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3QyxPQUFPLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRTFELE1BQU0sT0FBTyxxQkFBOEQsU0FBUSx5QkFBK0I7SUFBbEg7O1FBQ0k7O1dBRUc7UUFDSSxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFvQixDQUFDO1FBRWxELGtCQUFhLEdBQVEsRUFBRSxDQUFDO1FBQ3hCLGVBQVUsR0FBa0IsRUFBRSxDQUFDO1FBQy9CLGVBQVUsR0FBa0IsRUFBRSxDQUFDO1FBQy9CLFlBQU8sR0FBZ0IsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQWlWL0MsQ0FBQztJQS9VRzs7T0FFRztJQUNILElBQVcsT0FBTztRQUNkLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7T0FFRztJQUNILElBQVcsT0FBTztRQUNkLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7T0FFRztJQUNJLEdBQUcsQ0FBQyxXQUFjLEVBQUUsU0FBZTtRQUN0QyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxpQkFBaUIsQ0FBQyxFQUFRO1FBQzdCLElBQUksRUFBRSxLQUFLLFNBQVMsRUFBRTtZQUNsQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztTQUN0RDtRQUNELE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxvQkFBb0IsQ0FBQyxZQUFxQjtRQUM3QyxNQUFNLE1BQU0sR0FBUSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFRLEVBQUUsR0FBUSxFQUFFLEVBQUU7WUFDeEMsTUFBTSxLQUFLLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQzFGLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQU8sQ0FBQyxDQUFDO1FBQ3JFLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksUUFBUSxDQUFDLEVBQU8sRUFBRSxVQUFtQixLQUFLO1FBQzdDLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBVyxPQUFPO1FBQ2QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksa0JBQWtCLENBQUMsRUFBTyxFQUFFLFlBQXFCO1FBQ3BELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ25DLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFeEMsa0VBQWtFO1FBQ2xFLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDekIsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUVELE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDMUQsTUFBTSxNQUFNLEdBQUcsS0FBSyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDcEMsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDOUQsSUFBSSxZQUFZLEVBQUU7WUFDZCxNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUM7WUFDdkUsZUFBZSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1NBQ3RFO1FBQ0QsT0FBTyxlQUFlLENBQUM7SUFDM0IsQ0FBQztJQUVEOztPQUVHO0lBQ0ksVUFBVSxDQUFDLE1BQWU7UUFDN0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxNQUFNLEVBQUU7WUFDUixNQUFNLE9BQU8sR0FBZ0IsRUFBRSxDQUFDO1lBQ2hDLHVEQUF1RDtZQUN2RCxLQUFLLE1BQU0sV0FBVyxJQUFJLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtnQkFDakQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUM3RCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDckMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3BFLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO2FBQ3BFO1lBRUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7WUFFckIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsc0JBQXNCLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7U0FDNUU7UUFDRCxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRDs7T0FFRztJQUNJLE1BQU0sQ0FBQyxJQUFXLEVBQUUsRUFBUTtRQUMvQixJQUFJLEVBQUUsS0FBSyxTQUFTLEVBQUU7WUFDbEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNoQyxJQUFJLEtBQUssRUFBRTtnQkFDUCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQzthQUNsQztTQUNKO2FBQU07WUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUksRUFBRSxFQUFFO2dCQUMxQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMvQixDQUFDLENBQUMsQ0FBQztTQUNOO1FBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRUQ7O09BRUc7SUFDSSxLQUFLLENBQUMsRUFBUTtRQUNqQixJQUFJLEVBQUUsS0FBSyxTQUFTLEVBQUU7WUFDbEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDakUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDeEIsdUZBQXVGO1lBQ3ZGLDBGQUEwRjtZQUMxRiwwRkFBMEY7WUFDMUYsY0FBYztZQUNkLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ2hIO2FBQU07WUFDSCxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1NBQ3hCO1FBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsc0JBQXNCLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFFRDs7T0FFRztJQUNJLElBQUk7UUFDUCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUM3QixPQUFPO1NBQ1Y7UUFFRCxNQUFNLFdBQVcsR0FBZ0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN2RCxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNyQixLQUFLLE1BQU0sY0FBYyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDMUMsS0FBSyxNQUFNLFdBQVcsSUFBSSxjQUFjLEVBQUU7Z0JBQ3RDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUNsRjtTQUNKO1FBRUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsc0JBQXNCLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQzNGLENBQUM7SUFFRDs7T0FFRztJQUNJLElBQUk7UUFDUCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUM1QixNQUFNLE9BQU8sR0FBZ0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNuRCxLQUFLLE1BQU0sTUFBTSxJQUFJLE9BQU8sRUFBRTtnQkFDMUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNyRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDL0M7WUFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxzQkFBc0IsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztTQUM3RTtJQUNMLENBQUM7SUFFUyxjQUFjLENBQUMsV0FBYyxFQUFFLE1BQW1CLEVBQUUsU0FBZTtRQUN6RSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFakQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQ3RGLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbEIsTUFBTSxPQUFPLEdBQUcsQ0FBQyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLHNCQUFzQixDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1NBQzVFO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7SUFDTyxzQkFBc0IsQ0FBQyxNQUFtQixFQUFFLFdBQWMsRUFBRSxTQUFlO1FBQ2pGLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3pDLFFBQVEsV0FBVyxDQUFDLElBQUksRUFBRTtZQUN0QixLQUFLLGVBQWUsQ0FBQyxHQUFHO2dCQUNwQixJQUFJLEtBQUssRUFBRTtvQkFDUCw4QkFBOEI7b0JBQzlCLE1BQU0sSUFBSSxLQUFLLENBQUMscURBQXFELFdBQVcsQ0FBQyxFQUFFLDBCQUEwQixDQUFDLENBQUM7aUJBQ2xIO2dCQUNELE1BQU07WUFDVixLQUFLLGVBQWUsQ0FBQyxNQUFNLENBQUM7WUFDNUIsS0FBSyxlQUFlLENBQUMsTUFBTTtnQkFDdkIsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxlQUFlLENBQUMsTUFBTSxFQUFFO29CQUNoRCx5Q0FBeUM7b0JBQ3pDLE1BQU0sSUFBSSxLQUFLLENBQUMscURBQXFELFdBQVcsQ0FBQyxFQUFFLDRCQUE0QixDQUFDLENBQUM7aUJBQ3BIO2dCQUNELElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO29CQUMxQyxxRUFBcUU7b0JBQ3JFLE1BQU0sSUFBSSxLQUFLLENBQUMsa0VBQWtFLFdBQVcsQ0FBQyxJQUFJLEdBQUc7d0JBQ2pHLFVBQVUsV0FBVyxDQUFDLEVBQUUsOERBQThELENBQUMsQ0FBQztpQkFDL0Y7Z0JBQ0QsTUFBTTtTQUNiO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNPLFdBQVcsQ0FBQyxNQUFtQixFQUFFLFdBQWMsRUFBRSxTQUFlO1FBQ3RFLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZDLCtEQUErRDtRQUMvRCxpQ0FBaUM7UUFDakMsNkVBQTZFO1FBQzdFLGdGQUFnRjtRQUNoRixvRUFBb0U7UUFDcEUsaUNBQWlDO1FBQ2pDLDJHQUEyRztRQUMzRywwRkFBMEY7UUFDMUYseUZBQXlGO1FBQ3pGLG9FQUFvRTtRQUNwRSxJQUFJLEtBQUssRUFBRTtZQUNQLFFBQVEsV0FBVyxDQUFDLElBQUksRUFBRTtnQkFDdEIsS0FBSyxlQUFlLENBQUMsTUFBTTtvQkFDdkIsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLGVBQWUsQ0FBQyxHQUFHLEVBQUU7d0JBQ3BDLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO3FCQUNqQzt5QkFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssZUFBZSxDQUFDLE1BQU0sRUFBRTt3QkFDOUMsS0FBSyxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDO3dCQUNuQyxLQUFLLENBQUMsSUFBSSxHQUFHLGVBQWUsQ0FBQyxNQUFNLENBQUM7cUJBQ3ZDO29CQUNELE1BQU07Z0JBQ1YsS0FBSyxlQUFlLENBQUMsTUFBTTtvQkFDdkIsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO3dCQUN2QixJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssZUFBZSxDQUFDLEdBQUcsRUFBRTs0QkFDcEMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3lCQUNyRTt3QkFDRCxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssZUFBZSxDQUFDLE1BQU0sRUFBRTs0QkFDbkMsWUFBWSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3lCQUN2RDtxQkFDSjt5QkFBTTt3QkFDSCxLQUFLLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUM7cUJBQ3RDO2FBQ1I7U0FDSjthQUFNO1lBQ0gsS0FBSyxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFdBQVcsQ0FBQyxJQUFJLEVBQU8sQ0FBQztZQUMxRyxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDckM7UUFFRCxxRkFBcUY7UUFDckYsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQzNDO0lBQ0wsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ08sVUFBVSxDQUFDLEVBQU8sRUFBRSxNQUFtQjtRQUM3QyxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzdCLGlCQUFpQjtRQUNqQix5QkFBeUI7UUFDekIsMERBQTBEO1FBQzFELGtEQUFrRDtRQUNsRCxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxTQUFTLEVBQUU7WUFDekMsMEVBQTBFO1lBQzFFLGtFQUFrRTtZQUNsRSw0RUFBNEU7WUFDNUUsK0JBQStCO1lBQy9CLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDM0IsS0FBSyxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDeEMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTt3QkFDM0UsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUMzQjtpQkFDSjtnQkFFRCxnR0FBZ0c7Z0JBQ2hHLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxlQUFlLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7b0JBQ2hGLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQ3JCO2FBQ0o7aUJBQU07Z0JBQ0gsSUFBSSxLQUFLLENBQUMsU0FBUyxLQUFLLEtBQUssQ0FBQyxLQUFLLEVBQUU7b0JBQ2pDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQ3JCO2FBQ0o7U0FDSjtJQUNMLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNPLFlBQVksQ0FBQyxJQUFXLEVBQUUsS0FBUTtRQUN4QyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMvRixRQUFRLEtBQUssQ0FBQyxJQUFJLEVBQUU7WUFDaEIsS0FBSyxlQUFlLENBQUMsR0FBRztnQkFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3ZCLE1BQU07WUFDVixLQUFLLGVBQWUsQ0FBQyxNQUFNO2dCQUN2QixJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUU7b0JBQ25DLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNO1lBQ1YsS0FBSyxlQUFlLENBQUMsTUFBTTtnQkFDdkIsSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFO29CQUNuQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDekM7Z0JBQ0QsTUFBTTtTQUNiO0lBQ0wsQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJhbnNhY3Rpb24sIFN0YXRlLCBUcmFuc2FjdGlvblR5cGUsIFN0YXRlVXBkYXRlRXZlbnQsIFRyYW5zYWN0aW9uRXZlbnRPcmlnaW4sIEFjdGlvbiB9IGZyb20gJy4vdHJhbnNhY3Rpb24nO1xuaW1wb3J0IHsgSWd4QmFzZVRyYW5zYWN0aW9uU2VydmljZSB9IGZyb20gJy4vYmFzZS10cmFuc2FjdGlvbic7XG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzT2JqZWN0LCBtZXJnZU9iamVjdHMgfSBmcm9tICcuLi8uLi9jb3JlL3V0aWxzJztcblxuZXhwb3J0IGNsYXNzIElneFRyYW5zYWN0aW9uU2VydmljZTxUIGV4dGVuZHMgVHJhbnNhY3Rpb24sIFMgZXh0ZW5kcyBTdGF0ZT4gZXh0ZW5kcyBJZ3hCYXNlVHJhbnNhY3Rpb25TZXJ2aWNlPFQsIFM+IHtcbiAgICAvKipcbiAgICAgKiBAaW5oZXJpdGRvY1xuICAgICAqL1xuICAgIHB1YmxpYyBvblN0YXRlVXBkYXRlID0gbmV3IEV2ZW50RW1pdHRlcjxTdGF0ZVVwZGF0ZUV2ZW50PigpO1xuXG4gICAgcHJvdGVjdGVkIF90cmFuc2FjdGlvbnM6IFRbXSA9IFtdO1xuICAgIHByb3RlY3RlZCBfcmVkb1N0YWNrOiBBY3Rpb248VD5bXVtdID0gW107XG4gICAgcHJvdGVjdGVkIF91bmRvU3RhY2s6IEFjdGlvbjxUPltdW10gPSBbXTtcbiAgICBwcm90ZWN0ZWQgX3N0YXRlczogTWFwPGFueSwgUz4gPSBuZXcgTWFwKCk7XG5cbiAgICAvKipcbiAgICAgKiBAaW5oZXJpdGRvY1xuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgY2FuVW5kbygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VuZG9TdGFjay5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBpbmhlcml0ZG9jXG4gICAgICovXG4gICAgcHVibGljIGdldCBjYW5SZWRvKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVkb1N0YWNrLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGluaGVyaXRkb2NcbiAgICAgKi9cbiAgICBwdWJsaWMgYWRkKHRyYW5zYWN0aW9uOiBULCByZWNvcmRSZWY/OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgc3RhdGVzID0gdGhpcy5faXNQZW5kaW5nID8gdGhpcy5fcGVuZGluZ1N0YXRlcyA6IHRoaXMuX3N0YXRlcztcbiAgICAgICAgdGhpcy52ZXJpZnlBZGRlZFRyYW5zYWN0aW9uKHN0YXRlcywgdHJhbnNhY3Rpb24sIHJlY29yZFJlZik7XG4gICAgICAgIHRoaXMuYWRkVHJhbnNhY3Rpb24odHJhbnNhY3Rpb24sIHN0YXRlcywgcmVjb3JkUmVmKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaW5oZXJpdGRvY1xuICAgICAqL1xuICAgIHB1YmxpYyBnZXRUcmFuc2FjdGlvbkxvZyhpZD86IGFueSk6IFRbXSB7XG4gICAgICAgIGlmIChpZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdHJhbnNhY3Rpb25zLmZpbHRlcih0ID0+IHQuaWQgPT09IGlkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gWy4uLnRoaXMuX3RyYW5zYWN0aW9uc107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGluaGVyaXRkb2NcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0QWdncmVnYXRlZENoYW5nZXMobWVyZ2VDaGFuZ2VzOiBib29sZWFuKTogVFtdIHtcbiAgICAgICAgY29uc3QgcmVzdWx0OiBUW10gPSBbXTtcbiAgICAgICAgdGhpcy5fc3RhdGVzLmZvckVhY2goKHN0YXRlOiBTLCBrZXk6IGFueSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBtZXJnZUNoYW5nZXMgPyB0aGlzLm1lcmdlVmFsdWVzKHN0YXRlLnJlY29yZFJlZiwgc3RhdGUudmFsdWUpIDogc3RhdGUudmFsdWU7XG4gICAgICAgICAgICByZXN1bHQucHVzaCh7IGlkOiBrZXksIG5ld1ZhbHVlOiB2YWx1ZSwgdHlwZTogc3RhdGUudHlwZSB9IGFzIFQpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaW5oZXJpdGRvY1xuICAgICAqL1xuICAgIHB1YmxpYyBnZXRTdGF0ZShpZDogYW55LCBwZW5kaW5nOiBib29sZWFuID0gZmFsc2UpOiBTIHtcbiAgICAgICAgcmV0dXJuIHBlbmRpbmcgPyB0aGlzLl9wZW5kaW5nU3RhdGVzLmdldChpZCkgOiB0aGlzLl9zdGF0ZXMuZ2V0KGlkKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaW5oZXJpdGRvY1xuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgZW5hYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGluaGVyaXRkb2NcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0QWdncmVnYXRlZFZhbHVlKGlkOiBhbnksIG1lcmdlQ2hhbmdlczogYm9vbGVhbik6IGFueSB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5fc3RhdGVzLmdldChpZCk7XG4gICAgICAgIGNvbnN0IHBlbmRpbmdTdGF0ZSA9IHN1cGVyLmdldFN0YXRlKGlkKTtcblxuICAgICAgICAvLyAgaWYgdGhlcmUgaXMgbm8gc3RhdGUgYW5kIHRoZXJlIGlzIG5vIHBlbmRpbmcgc3RhdGUgcmV0dXJuIG51bGxcbiAgICAgICAgaWYgKCFzdGF0ZSAmJiAhcGVuZGluZ1N0YXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBlbmRpbmdDaGFuZ2UgPSBzdXBlci5nZXRBZ2dyZWdhdGVkVmFsdWUoaWQsIGZhbHNlKTtcbiAgICAgICAgY29uc3QgY2hhbmdlID0gc3RhdGUgJiYgc3RhdGUudmFsdWU7XG4gICAgICAgIGxldCBhZ2dyZWdhdGVkVmFsdWUgPSB0aGlzLm1lcmdlVmFsdWVzKGNoYW5nZSwgcGVuZGluZ0NoYW5nZSk7XG4gICAgICAgIGlmIChtZXJnZUNoYW5nZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IG9yaWdpbmFsVmFsdWUgPSBzdGF0ZSA/IHN0YXRlLnJlY29yZFJlZiA6IHBlbmRpbmdTdGF0ZS5yZWNvcmRSZWY7XG4gICAgICAgICAgICBhZ2dyZWdhdGVkVmFsdWUgPSB0aGlzLm1lcmdlVmFsdWVzKG9yaWdpbmFsVmFsdWUsIGFnZ3JlZ2F0ZWRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFnZ3JlZ2F0ZWRWYWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaW5oZXJpdGRvY1xuICAgICAqL1xuICAgIHB1YmxpYyBlbmRQZW5kaW5nKGNvbW1pdDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLl9pc1BlbmRpbmcgPSBmYWxzZTtcbiAgICAgICAgaWYgKGNvbW1pdCkge1xuICAgICAgICAgICAgY29uc3QgYWN0aW9uczogQWN0aW9uPFQ+W10gPSBbXTtcbiAgICAgICAgICAgIC8vIGRvbid0IHVzZSBhZGRUcmFuc2FjdGlvbiBkdWUgdG8gY3VzdG9tIHVuZG8gaGFuZGxpbmdcbiAgICAgICAgICAgIGZvciAoY29uc3QgdHJhbnNhY3Rpb24gb2YgdGhpcy5fcGVuZGluZ1RyYW5zYWN0aW9ucykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBlbmRpbmdTdGF0ZSA9IHRoaXMuX3BlbmRpbmdTdGF0ZXMuZ2V0KHRyYW5zYWN0aW9uLmlkKTtcbiAgICAgICAgICAgICAgICB0aGlzLl90cmFuc2FjdGlvbnMucHVzaCh0cmFuc2FjdGlvbik7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSh0aGlzLl9zdGF0ZXMsIHRyYW5zYWN0aW9uLCBwZW5kaW5nU3RhdGUucmVjb3JkUmVmKTtcbiAgICAgICAgICAgICAgICBhY3Rpb25zLnB1c2goeyB0cmFuc2FjdGlvbiwgcmVjb3JkUmVmOiBwZW5kaW5nU3RhdGUucmVjb3JkUmVmIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl91bmRvU3RhY2sucHVzaChhY3Rpb25zKTtcbiAgICAgICAgICAgIHRoaXMuX3JlZG9TdGFjayA9IFtdO1xuXG4gICAgICAgICAgICB0aGlzLm9uU3RhdGVVcGRhdGUuZW1pdCh7IG9yaWdpbjogVHJhbnNhY3Rpb25FdmVudE9yaWdpbi5FTkQsIGFjdGlvbnMgfSk7XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIuZW5kUGVuZGluZyhjb21taXQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBpbmhlcml0ZG9jXG4gICAgICovXG4gICAgcHVibGljIGNvbW1pdChkYXRhOiBhbnlbXSwgaWQ/OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKGlkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5nZXRTdGF0ZShpZCk7XG4gICAgICAgICAgICBpZiAoc3RhdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVJlY29yZChkYXRhLCBzdGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9zdGF0ZXMuZm9yRWFjaCgoczogUykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUmVjb3JkKGRhdGEsIHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jbGVhcihpZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGluaGVyaXRkb2NcbiAgICAgKi9cbiAgICBwdWJsaWMgY2xlYXIoaWQ/OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKGlkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3RyYW5zYWN0aW9ucyA9IHRoaXMuX3RyYW5zYWN0aW9ucy5maWx0ZXIodCA9PiB0LmlkICE9PSBpZCk7XG4gICAgICAgICAgICB0aGlzLl9zdGF0ZXMuZGVsZXRlKGlkKTtcbiAgICAgICAgICAgIC8vICBVbmRvIHN0YWNrIGlzIGFuIGFycmF5IG9mIGFjdGlvbnMuIEVhY2ggYWN0aW9uIGlzIGFycmF5IG9mIHRyYW5zYWN0aW9uIGxpa2Ugb2JqZWN0c1xuICAgICAgICAgICAgLy8gIFdlIGFyZSBnb2luZyB0cm91Z2ggYWxsIHRoZSBhY3Rpb25zLiBGb3IgZWFjaCBhY3Rpb24gd2UgYXJlIGZpbHRlcmluZyBvdXQgdHJhbnNhY3Rpb25zXG4gICAgICAgICAgICAvLyAgd2l0aCBwcm92aWRlZCBpZC4gRmluYWxseSBpZiBhbnkgYWN0aW9uIGVuZHMgdXAgYXMgZW1wdHkgYXJyYXkgd2UgYXJlIHJlbW92aW5nIGl0IGZyb21cbiAgICAgICAgICAgIC8vICB1bmRvIHN0YWNrXG4gICAgICAgICAgICB0aGlzLl91bmRvU3RhY2sgPSB0aGlzLl91bmRvU3RhY2subWFwKGEgPT4gYS5maWx0ZXIodCA9PiB0LnRyYW5zYWN0aW9uLmlkICE9PSBpZCkpLmZpbHRlcihhID0+IGEubGVuZ3RoID4gMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl90cmFuc2FjdGlvbnMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRlcy5jbGVhcigpO1xuICAgICAgICAgICAgdGhpcy5fdW5kb1N0YWNrID0gW107XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcmVkb1N0YWNrID0gW107XG4gICAgICAgIHRoaXMub25TdGF0ZVVwZGF0ZS5lbWl0KHsgb3JpZ2luOiBUcmFuc2FjdGlvbkV2ZW50T3JpZ2luLkNMRUFSLCBhY3Rpb25zOiBbXSB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaW5oZXJpdGRvY1xuICAgICAqL1xuICAgIHB1YmxpYyB1bmRvKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fdW5kb1N0YWNrLmxlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBsYXN0QWN0aW9uczogQWN0aW9uPFQ+W10gPSB0aGlzLl91bmRvU3RhY2sucG9wKCk7XG4gICAgICAgIHRoaXMuX3RyYW5zYWN0aW9ucy5zcGxpY2UodGhpcy5fdHJhbnNhY3Rpb25zLmxlbmd0aCAtIGxhc3RBY3Rpb25zLmxlbmd0aCk7XG4gICAgICAgIHRoaXMuX3JlZG9TdGFjay5wdXNoKGxhc3RBY3Rpb25zKTtcblxuICAgICAgICB0aGlzLl9zdGF0ZXMuY2xlYXIoKTtcbiAgICAgICAgZm9yIChjb25zdCBjdXJyZW50QWN0aW9ucyBvZiB0aGlzLl91bmRvU3RhY2spIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdHJhbnNhY3Rpb24gb2YgY3VycmVudEFjdGlvbnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlKHRoaXMuX3N0YXRlcywgdHJhbnNhY3Rpb24udHJhbnNhY3Rpb24sIHRyYW5zYWN0aW9uLnJlY29yZFJlZik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uU3RhdGVVcGRhdGUuZW1pdCh7IG9yaWdpbjogVHJhbnNhY3Rpb25FdmVudE9yaWdpbi5VTkRPLCBhY3Rpb25zOiBsYXN0QWN0aW9ucyB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaW5oZXJpdGRvY1xuICAgICAqL1xuICAgIHB1YmxpYyByZWRvKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fcmVkb1N0YWNrLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGFjdGlvbnM6IEFjdGlvbjxUPltdID0gdGhpcy5fcmVkb1N0YWNrLnBvcCgpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBhY3Rpb24gb2YgYWN0aW9ucykge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU3RhdGUodGhpcy5fc3RhdGVzLCBhY3Rpb24udHJhbnNhY3Rpb24sIGFjdGlvbi5yZWNvcmRSZWYpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RyYW5zYWN0aW9ucy5wdXNoKGFjdGlvbi50cmFuc2FjdGlvbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX3VuZG9TdGFjay5wdXNoKGFjdGlvbnMpO1xuICAgICAgICAgICAgdGhpcy5vblN0YXRlVXBkYXRlLmVtaXQoeyBvcmlnaW46IFRyYW5zYWN0aW9uRXZlbnRPcmlnaW4uUkVETywgYWN0aW9ucyB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBhZGRUcmFuc2FjdGlvbih0cmFuc2FjdGlvbjogVCwgc3RhdGVzOiBNYXA8YW55LCBTPiwgcmVjb3JkUmVmPzogYW55KSB7XG4gICAgICAgIHRoaXMudXBkYXRlU3RhdGUoc3RhdGVzLCB0cmFuc2FjdGlvbiwgcmVjb3JkUmVmKTtcblxuICAgICAgICBjb25zdCB0cmFuc2FjdGlvbnMgPSB0aGlzLl9pc1BlbmRpbmcgPyB0aGlzLl9wZW5kaW5nVHJhbnNhY3Rpb25zIDogdGhpcy5fdHJhbnNhY3Rpb25zO1xuICAgICAgICB0cmFuc2FjdGlvbnMucHVzaCh0cmFuc2FjdGlvbik7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9pc1BlbmRpbmcpIHtcbiAgICAgICAgICAgIGNvbnN0IGFjdGlvbnMgPSBbeyB0cmFuc2FjdGlvbiwgcmVjb3JkUmVmIH1dO1xuICAgICAgICAgICAgdGhpcy5fdW5kb1N0YWNrLnB1c2goYWN0aW9ucyk7XG4gICAgICAgICAgICB0aGlzLl9yZWRvU3RhY2sgPSBbXTtcbiAgICAgICAgICAgIHRoaXMub25TdGF0ZVVwZGF0ZS5lbWl0KHsgb3JpZ2luOiBUcmFuc2FjdGlvbkV2ZW50T3JpZ2luLkFERCwgYWN0aW9ucyB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFZlcmlmaWVzIGlmIHRoZSBwYXNzZWQgdHJhbnNhY3Rpb24gaXMgY29ycmVjdC4gSWYgbm90IHRocm93cyBhbiBleGNlcHRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdHJhbnNhY3Rpb24gVHJhbnNhY3Rpb24gdG8gYmUgdmVyaWZpZWRcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgdmVyaWZ5QWRkZWRUcmFuc2FjdGlvbihzdGF0ZXM6IE1hcDxhbnksIFM+LCB0cmFuc2FjdGlvbjogVCwgcmVjb3JkUmVmPzogYW55KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gc3RhdGVzLmdldCh0cmFuc2FjdGlvbi5pZCk7XG4gICAgICAgIHN3aXRjaCAodHJhbnNhY3Rpb24udHlwZSkge1xuICAgICAgICAgICAgY2FzZSBUcmFuc2FjdGlvblR5cGUuQUREOlxuICAgICAgICAgICAgICAgIGlmIChzdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyAgY2Fubm90IGFkZCBzYW1lIGl0ZW0gdHdpY2VcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgYWRkIHRoaXMgdHJhbnNhY3Rpb24uIFRyYW5zYWN0aW9uIHdpdGggaWQ6ICR7dHJhbnNhY3Rpb24uaWR9IGhhcyBiZWVuIGFscmVhZHkgYWRkZWQuYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBUcmFuc2FjdGlvblR5cGUuREVMRVRFOlxuICAgICAgICAgICAgY2FzZSBUcmFuc2FjdGlvblR5cGUuVVBEQVRFOlxuICAgICAgICAgICAgICAgIGlmIChzdGF0ZSAmJiBzdGF0ZS50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuREVMRVRFKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICBjYW5ub3QgZGVsZXRlIG9yIHVwZGF0ZSBkZWxldGVkIGl0ZW1zXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IGFkZCB0aGlzIHRyYW5zYWN0aW9uLiBUcmFuc2FjdGlvbiB3aXRoIGlkOiAke3RyYW5zYWN0aW9uLmlkfSBoYXMgYmVlbiBhbHJlYWR5IGRlbGV0ZWQuYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghc3RhdGUgJiYgIXJlY29yZFJlZiAmJiAhdGhpcy5faXNQZW5kaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICBjYW5ub3QgaW5pdGlhbGx5IGFkZCB0cmFuc2FjdGlvbiBvciBkZWxldGUgaXRlbSB3aXRoIG5vIHJlY29yZFJlZlxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBhZGQgdGhpcyB0cmFuc2FjdGlvbi4gVGhpcyBpcyBmaXJzdCB0cmFuc2FjdGlvbiBvZiB0eXBlICR7dHJhbnNhY3Rpb24udHlwZX0gYCArXG4gICAgICAgICAgICAgICAgICAgICAgICBgZm9yIGlkICR7dHJhbnNhY3Rpb24uaWR9LiBGb3IgZmlyc3QgdHJhbnNhY3Rpb24gb2YgdGhpcyB0eXBlIHJlY29yZFJlZiBpcyBtYW5kYXRvcnkuYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgcHJvdmlkZWQgc3RhdGVzIGNvbGxlY3Rpb24gYWNjb3JkaW5nIHRvIHBhc3NlZCB0cmFuc2FjdGlvbiBhbmQgcmVjb3JkUmVmXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc3RhdGVzIFN0YXRlcyBjb2xsZWN0aW9uIHRvIGFwcGx5IHRoZSB1cGRhdGUgdG9cbiAgICAgKiBAcGFyYW0gdHJhbnNhY3Rpb24gVHJhbnNhY3Rpb24gdG8gYXBwbHkgdG8gdGhlIGN1cnJlbnQgc3RhdGVcbiAgICAgKiBAcGFyYW0gcmVjb3JkUmVmIFJlZmVyZW5jZSB0byB0aGUgdmFsdWUgb2YgdGhlIHJlY29yZCBpbiBkYXRhIHNvdXJjZSwgaWYgYW55LCB3aGVyZSB0cmFuc2FjdGlvbiBzaG91bGQgYmUgYXBwbGllZFxuICAgICAqL1xuICAgIHByb3RlY3RlZCB1cGRhdGVTdGF0ZShzdGF0ZXM6IE1hcDxhbnksIFM+LCB0cmFuc2FjdGlvbjogVCwgcmVjb3JkUmVmPzogYW55KTogdm9pZCB7XG4gICAgICAgIGxldCBzdGF0ZSA9IHN0YXRlcy5nZXQodHJhbnNhY3Rpb24uaWQpO1xuICAgICAgICAvLyAgaWYgVHJhbnNhY3Rpb25UeXBlIGlzIEFERCBzaW1wbHkgYWRkIHRyYW5zYWN0aW9uIHRvIHN0YXRlcztcbiAgICAgICAgLy8gIGlmIFRyYW5zYWN0aW9uVHlwZSBpcyBERUxFVEU6XG4gICAgICAgIC8vICAgIC0gaWYgdGhlcmUgaXMgc3RhdGUgd2l0aCB0aGlzIGlkIG9mIHR5cGUgQUREIHJlbW92ZSBpdCBmcm9tIHRoZSBzdGF0ZXM7XG4gICAgICAgIC8vICAgIC0gaWYgdGhlcmUgaXMgc3RhdGUgd2l0aCB0aGlzIGlkIG9mIHR5cGUgVVBEQVRFIGNoYW5nZSBpdHMgdHlwZSB0byBERUxFVEU7XG4gICAgICAgIC8vICAgIC0gaWYgdGhlcmUgaXMgbm8gc3RhdGUgd2l0aCB0aGlzIGlkIGFkZCB0cmFuc2FjdGlvbiB0byBzdGF0ZXM7XG4gICAgICAgIC8vICBpZiBUcmFuc2FjdGlvblR5cGUgaXMgVVBEQVRFOlxuICAgICAgICAvLyAgICAtIGlmIHRoZXJlIGlzIHN0YXRlIHdpdGggdGhpcyBpZCBvZiB0eXBlIEFERCBtZXJnZSBuZXcgdmFsdWUgYW5kIHN0YXRlIHJlY29yZFJlZiBpbnRvIHN0YXRlIG5ldyB2YWx1ZVxuICAgICAgICAvLyAgICAtIGlmIHRoZXJlIGlzIHN0YXRlIHdpdGggdGhpcyBpZCBvZiB0eXBlIFVQREFURSBtZXJnZSBuZXcgdmFsdWUgaW50byBzdGF0ZSBuZXcgdmFsdWVcbiAgICAgICAgLy8gICAgLSBpZiB0aGVyZSBpcyBzdGF0ZSB3aXRoIHRoaXMgaWQgYW5kIHN0YXRlIHR5cGUgaXMgREVMRVRFIGNoYW5nZSBpdHMgdHlwZSB0byBVUERBVEVcbiAgICAgICAgLy8gICAgLSBpZiB0aGVyZSBpcyBubyBzdGF0ZSB3aXRoIHRoaXMgaWQgYWRkIHRyYW5zYWN0aW9uIHRvIHN0YXRlcztcbiAgICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHRyYW5zYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFRyYW5zYWN0aW9uVHlwZS5ERUxFVEU6XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0ZS50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQUREKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZXMuZGVsZXRlKHRyYW5zYWN0aW9uLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0ZS50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuVVBEQVRFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZS52YWx1ZSA9IHRyYW5zYWN0aW9uLm5ld1ZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUudHlwZSA9IFRyYW5zYWN0aW9uVHlwZS5ERUxFVEU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBUcmFuc2FjdGlvblR5cGUuVVBEQVRFOlxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNPYmplY3Qoc3RhdGUudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdGUudHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFERCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLnZhbHVlID0gdGhpcy5tZXJnZVZhbHVlcyhzdGF0ZS52YWx1ZSwgdHJhbnNhY3Rpb24ubmV3VmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRlLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5VUERBVEUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVyZ2VPYmplY3RzKHN0YXRlLnZhbHVlLCB0cmFuc2FjdGlvbi5uZXdWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZS52YWx1ZSA9IHRyYW5zYWN0aW9uLm5ld1ZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdGF0ZSA9IHsgdmFsdWU6IHRoaXMuY2xvbmVTdHJhdGVneS5jbG9uZSh0cmFuc2FjdGlvbi5uZXdWYWx1ZSksIHJlY29yZFJlZiwgdHlwZTogdHJhbnNhY3Rpb24udHlwZSB9IGFzIFM7XG4gICAgICAgICAgICBzdGF0ZXMuc2V0KHRyYW5zYWN0aW9uLmlkLCBzdGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyAgc2hvdWxkIG5vdCBjbGVhbiBwZW5kaW5nIHN0YXRlLiBUaGlzIHdpbGwgaGFwcGVuIGF1dG9tYXRpY2FsbHkgb24gZW5kUGVuZGluZyBjYWxsXG4gICAgICAgIGlmICghdGhpcy5faXNQZW5kaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFuU3RhdGUodHJhbnNhY3Rpb24uaWQsIHN0YXRlcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb21wYXJlcyB0aGUgc3RhdGUgd2l0aCByZWNvcmRSZWYgYW5kIGNsZWFycyBhbGwgZHVwbGljYXRlZCB2YWx1ZXMuIElmIGFueSBzdGF0ZSBlbmRzIGFzXG4gICAgICogZW1wdHkgb2JqZWN0IHJlbW92ZXMgaXQgZnJvbSBzdGF0ZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc3RhdGUgU3RhdGUgdG8gY2xlYW5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgY2xlYW5TdGF0ZShpZDogYW55LCBzdGF0ZXM6IE1hcDxhbnksIFM+KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gc3RhdGVzLmdldChpZCk7XG4gICAgICAgIC8vICBkbyBub3RoaW5nIGlmXG4gICAgICAgIC8vICB0aGVyZSBpcyBubyBzdGF0ZSwgb3JcbiAgICAgICAgLy8gIHRoZXJlIGlzIG5vIHN0YXRlIHZhbHVlIChlLmcuIERFTEVURUQgdHJhbnNhY3Rpb24pLCBvclxuICAgICAgICAvLyAgdGhlcmUgaXMgbm8gcmVjb3JkUmVmIChlLmcuIEFEREVEIHRyYW5zYWN0aW9uKVxuICAgICAgICBpZiAoc3RhdGUgJiYgc3RhdGUudmFsdWUgJiYgc3RhdGUucmVjb3JkUmVmKSB7XG4gICAgICAgICAgICAvLyAgaWYgc3RhdGUncyB2YWx1ZSBpcyBvYmplY3QgY29tcGFyZSBlYWNoIGtleSB3aXRoIHRoZSBvbmVzIGluIHJlY29yZFJlZlxuICAgICAgICAgICAgLy8gIGlmIHZhbHVlcyBpbiBhbnkga2V5IGFyZSB0aGUgc2FtZSBkZWxldGUgaXQgZnJvbSBzdGF0ZSdzIHZhbHVlXG4gICAgICAgICAgICAvLyAgaWYgc3RhdGUncyB2YWx1ZSBpcyBub3Qgb2JqZWN0LCBzaW1wbHkgY29tcGFyZSB3aXRoIHJlY29yZFJlZiBhbmQgcmVtb3ZlXG4gICAgICAgICAgICAvLyAgdGhlIHN0YXRlIGlmIHRoZXkgYXJlIGVxdWFsXG4gICAgICAgICAgICBpZiAoaXNPYmplY3Qoc3RhdGUucmVjb3JkUmVmKSkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHN0YXRlLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoSlNPTi5zdHJpbmdpZnkoc3RhdGUucmVjb3JkUmVmW2tleV0pID09PSBKU09OLnN0cmluZ2lmeShzdGF0ZS52YWx1ZVtrZXldKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHN0YXRlLnZhbHVlW2tleV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyAgaWYgc3RhdGUncyB2YWx1ZSBpcyBlbXB0eSByZW1vdmUgdGhlIHN0YXRlIGZyb20gdGhlIHN0YXRlcywgb25seSBpZiBzdGF0ZSBpcyBub3QgREVMRVRFIHR5cGVcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGUudHlwZSAhPT0gVHJhbnNhY3Rpb25UeXBlLkRFTEVURSAmJiBPYmplY3Qua2V5cyhzdGF0ZS52YWx1ZSkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlcy5kZWxldGUoaWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlLnJlY29yZFJlZiA9PT0gc3RhdGUudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVzLmRlbGV0ZShpZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyBzdGF0ZSByZWxhdGVkIHJlY29yZCBpbiB0aGUgcHJvdmlkZWQgZGF0YVxuICAgICAqXG4gICAgICogQHBhcmFtIGRhdGEgRGF0YSBzb3VyY2UgdG8gdXBkYXRlXG4gICAgICogQHBhcmFtIHN0YXRlIFN0YXRlIHRvIHVwZGF0ZSBkYXRhIGZyb21cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgdXBkYXRlUmVjb3JkKGRhdGE6IGFueVtdLCBzdGF0ZTogUykge1xuICAgICAgICBjb25zdCBpbmRleCA9IGRhdGEuZmluZEluZGV4KGkgPT4gSlNPTi5zdHJpbmdpZnkoaSkgPT09IEpTT04uc3RyaW5naWZ5KHN0YXRlLnJlY29yZFJlZiB8fCB7fSkpO1xuICAgICAgICBzd2l0Y2ggKHN0YXRlLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgVHJhbnNhY3Rpb25UeXBlLkFERDpcbiAgICAgICAgICAgICAgICBkYXRhLnB1c2goc3RhdGUudmFsdWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBUcmFuc2FjdGlvblR5cGUuREVMRVRFOlxuICAgICAgICAgICAgICAgIGlmICgwIDw9IGluZGV4ICYmIGluZGV4IDwgZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgVHJhbnNhY3Rpb25UeXBlLlVQREFURTpcbiAgICAgICAgICAgICAgICBpZiAoMCA8PSBpbmRleCAmJiBpbmRleCA8IGRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFbaW5kZXhdID0gdGhpcy51cGRhdGVWYWx1ZShzdGF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19
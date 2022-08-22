import { TransactionService, Transaction, State, StateUpdateEvent } from './transaction';
import { EventEmitter } from '@angular/core';
import { IDataCloneStrategy } from '../../data-operations/data-clone-strategy';
export declare class IgxBaseTransactionService<T extends Transaction, S extends State> implements TransactionService<T, S> {
    /**
     * @inheritdoc
     */
    get cloneStrategy(): IDataCloneStrategy;
    set cloneStrategy(strategy: IDataCloneStrategy);
    /**
     * @inheritdoc
     */
    get canRedo(): boolean;
    /**
     * @inheritdoc
     */
    get canUndo(): boolean;
    /**
     * @inheritdoc
     */
    get enabled(): boolean;
    /**
     * @inheritdoc
     */
    onStateUpdate: EventEmitter<StateUpdateEvent>;
    protected _isPending: boolean;
    protected _pendingTransactions: T[];
    protected _pendingStates: Map<any, S>;
    private _cloneStrategy;
    /**
     * @inheritdoc
     */
    add(transaction: T, recordRef?: any): void;
    /**
     * @inheritdoc
     */
    getTransactionLog(_id?: any): T[];
    /**
     * @inheritdoc
     */
    undo(): void;
    /**
     * @inheritdoc
     */
    redo(): void;
    /**
     * @inheritdoc
     */
    getAggregatedChanges(mergeChanges: boolean): T[];
    /**
     * @inheritdoc
     */
    getState(id: any): S;
    /**
     * @inheritdoc
     */
    getAggregatedValue(id: any, mergeChanges: boolean): any;
    /**
     * @inheritdoc
     */
    commit(_data: any[], _id?: any): void;
    /**
     * @inheritdoc
     */
    clear(_id?: any): void;
    /**
     * @inheritdoc
     */
    startPending(): void;
    /**
     * @inheritdoc
     */
    endPending(_commit: boolean): void;
    /**
     * Updates the provided states collection according to passed transaction and recordRef
     *
     * @param states States collection to apply the update to
     * @param transaction Transaction to apply to the current state
     * @param recordRef Reference to the value of the record in data source, if any, where transaction should be applied
     */
    protected updateState(states: Map<any, S>, transaction: T, recordRef?: any): void;
    /**
     * Updates the recordRef of the provided state with all the changes in the state. Accepts primitive and object value types
     *
     * @param state State to update value for
     * @returns updated value including all the changes in provided state
     */
    protected updateValue(state: S): any;
    /**
     * Merges second values in first value and the result in empty object. If values are primitive type
     * returns second value if exists, or first value.
     *
     * @param first Value to merge into
     * @param second Value to merge
     */
    protected mergeValues<U>(first: U, second: U): U;
}

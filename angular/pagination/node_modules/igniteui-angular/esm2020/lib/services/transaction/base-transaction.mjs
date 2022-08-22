import { EventEmitter } from '@angular/core';
import { isObject, mergeObjects } from '../../core/utils';
import { DefaultDataCloneStrategy } from '../../data-operations/data-clone-strategy';
export class IgxBaseTransactionService {
    constructor() {
        /**
         * @inheritdoc
         */
        this.onStateUpdate = new EventEmitter();
        this._isPending = false;
        this._pendingTransactions = [];
        this._pendingStates = new Map();
        this._cloneStrategy = new DefaultDataCloneStrategy();
    }
    /**
     * @inheritdoc
     */
    get cloneStrategy() {
        return this._cloneStrategy;
    }
    set cloneStrategy(strategy) {
        if (strategy) {
            this._cloneStrategy = strategy;
        }
    }
    /**
     * @inheritdoc
     */
    get canRedo() {
        return false;
    }
    /**
     * @inheritdoc
     */
    get canUndo() {
        return false;
    }
    /**
     * @inheritdoc
     */
    get enabled() {
        return this._isPending;
    }
    /**
     * @inheritdoc
     */
    add(transaction, recordRef) {
        if (this._isPending) {
            this.updateState(this._pendingStates, transaction, recordRef);
            this._pendingTransactions.push(transaction);
        }
    }
    /**
     * @inheritdoc
     */
    getTransactionLog(_id) {
        return [];
    }
    /**
     * @inheritdoc
     */
    undo() { }
    /**
     * @inheritdoc
     */
    redo() { }
    /**
     * @inheritdoc
     */
    getAggregatedChanges(mergeChanges) {
        const result = [];
        this._pendingStates.forEach((state, key) => {
            const value = mergeChanges ? this.getAggregatedValue(key, mergeChanges) : state.value;
            result.push({ id: key, newValue: value, type: state.type });
        });
        return result;
    }
    /**
     * @inheritdoc
     */
    getState(id) {
        return this._pendingStates.get(id);
    }
    /**
     * @inheritdoc
     */
    getAggregatedValue(id, mergeChanges) {
        const state = this._pendingStates.get(id);
        if (!state) {
            return null;
        }
        if (mergeChanges && state.recordRef) {
            return this.updateValue(state);
        }
        return state.value;
    }
    /**
     * @inheritdoc
     */
    commit(_data, _id) { }
    /**
     * @inheritdoc
     */
    clear(_id) {
        this._pendingStates.clear();
        this._pendingTransactions = [];
    }
    /**
     * @inheritdoc
     */
    startPending() {
        this._isPending = true;
    }
    /**
     * @inheritdoc
     */
    endPending(_commit) {
        this._isPending = false;
        this._pendingStates.clear();
        this._pendingTransactions = [];
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
        if (state) {
            if (isObject(state.value)) {
                mergeObjects(state.value, transaction.newValue);
            }
            else {
                state.value = transaction.newValue;
            }
        }
        else {
            state = { value: this.cloneStrategy.clone(transaction.newValue), recordRef, type: transaction.type };
            states.set(transaction.id, state);
        }
    }
    /**
     * Updates the recordRef of the provided state with all the changes in the state. Accepts primitive and object value types
     *
     * @param state State to update value for
     * @returns updated value including all the changes in provided state
     */
    updateValue(state) {
        return this.mergeValues(state.recordRef, state.value);
    }
    /**
     * Merges second values in first value and the result in empty object. If values are primitive type
     * returns second value if exists, or first value.
     *
     * @param first Value to merge into
     * @param second Value to merge
     */
    mergeValues(first, second) {
        if (isObject(first) || isObject(second)) {
            return mergeObjects(this.cloneStrategy.clone(first), second);
        }
        else {
            return second ? second : first;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS10cmFuc2FjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2lnbml0ZXVpLWFuZ3VsYXIvc3JjL2xpYi9zZXJ2aWNlcy90cmFuc2FjdGlvbi9iYXNlLXRyYW5zYWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsd0JBQXdCLEVBQXNCLE1BQU0sMkNBQTJDLENBQUM7QUFFekcsTUFBTSxPQUFPLHlCQUF5QjtJQUF0QztRQW1DSTs7V0FFRztRQUNJLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQW9CLENBQUM7UUFFbEQsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQix5QkFBb0IsR0FBUSxFQUFFLENBQUM7UUFDL0IsbUJBQWMsR0FBZ0IsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUMxQyxtQkFBYyxHQUF1QixJQUFJLHdCQUF3QixFQUFFLENBQUM7SUF5SWhGLENBQUM7SUFuTEc7O09BRUc7SUFDSCxJQUFXLGFBQWE7UUFDcEIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQy9CLENBQUM7SUFFRCxJQUFXLGFBQWEsQ0FBQyxRQUE0QjtRQUNqRCxJQUFJLFFBQVEsRUFBRTtZQUNWLElBQUksQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFDO1NBQ2xDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBVyxPQUFPO1FBQ2QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBVyxPQUFPO1FBQ2QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBVyxPQUFPO1FBQ2QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7SUFZRDs7T0FFRztJQUNJLEdBQUcsQ0FBQyxXQUFjLEVBQUUsU0FBZTtRQUN0QyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUM5RCxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQy9DO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0ksaUJBQWlCLENBQUMsR0FBUztRQUM5QixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFRDs7T0FFRztJQUNJLElBQUksS0FBVyxDQUFDO0lBRXZCOztPQUVHO0lBQ0ksSUFBSSxLQUFXLENBQUM7SUFFdkI7O09BRUc7SUFDSSxvQkFBb0IsQ0FBQyxZQUFxQjtRQUM3QyxNQUFNLE1BQU0sR0FBUSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFRLEVBQUUsR0FBUSxFQUFFLEVBQUU7WUFDL0MsTUFBTSxLQUFLLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQ3RGLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQU8sQ0FBQyxDQUFDO1FBQ3JFLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksUUFBUSxDQUFDLEVBQU87UUFDbkIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxrQkFBa0IsQ0FBQyxFQUFPLEVBQUUsWUFBcUI7UUFDcEQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxJQUFJLFlBQVksSUFBSSxLQUFLLENBQUMsU0FBUyxFQUFFO1lBQ2pDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNsQztRQUNELE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBRUQ7O09BRUc7SUFDSSxNQUFNLENBQUMsS0FBWSxFQUFFLEdBQVMsSUFBVSxDQUFDO0lBRWhEOztPQUVHO0lBQ0ksS0FBSyxDQUFDLEdBQVM7UUFDbEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRDs7T0FFRztJQUNJLFlBQVk7UUFDZixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztJQUMzQixDQUFDO0lBRUQ7O09BRUc7SUFDSSxVQUFVLENBQUMsT0FBZ0I7UUFDOUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFHRDs7Ozs7O09BTUc7SUFDTyxXQUFXLENBQUMsTUFBbUIsRUFBRSxXQUFjLEVBQUUsU0FBZTtRQUN0RSxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN2QyxJQUFJLEtBQUssRUFBRTtZQUNQLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDdkIsWUFBWSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ25EO2lCQUFNO2dCQUNILEtBQUssQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQzthQUN0QztTQUNKO2FBQU07WUFDSCxLQUFLLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsV0FBVyxDQUFDLElBQUksRUFBTyxDQUFDO1lBQzFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNyQztJQUNMLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNPLFdBQVcsQ0FBQyxLQUFRO1FBQzFCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ08sV0FBVyxDQUFJLEtBQVEsRUFBRSxNQUFTO1FBQ3hDLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNyQyxPQUFPLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUNoRTthQUFNO1lBQ0gsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1NBQ2xDO0lBQ0wsQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJhbnNhY3Rpb25TZXJ2aWNlLCBUcmFuc2FjdGlvbiwgU3RhdGUsIFN0YXRlVXBkYXRlRXZlbnQgfSBmcm9tICcuL3RyYW5zYWN0aW9uJztcbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNPYmplY3QsIG1lcmdlT2JqZWN0cyB9IGZyb20gJy4uLy4uL2NvcmUvdXRpbHMnO1xuaW1wb3J0IHsgRGVmYXVsdERhdGFDbG9uZVN0cmF0ZWd5LCBJRGF0YUNsb25lU3RyYXRlZ3kgfSBmcm9tICcuLi8uLi9kYXRhLW9wZXJhdGlvbnMvZGF0YS1jbG9uZS1zdHJhdGVneSc7XG5cbmV4cG9ydCBjbGFzcyBJZ3hCYXNlVHJhbnNhY3Rpb25TZXJ2aWNlPFQgZXh0ZW5kcyBUcmFuc2FjdGlvbiwgUyBleHRlbmRzIFN0YXRlPiBpbXBsZW1lbnRzIFRyYW5zYWN0aW9uU2VydmljZTxULCBTPiB7XG4gICAgLyoqXG4gICAgICogQGluaGVyaXRkb2NcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGNsb25lU3RyYXRlZ3koKTogSURhdGFDbG9uZVN0cmF0ZWd5IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Nsb25lU3RyYXRlZ3k7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBjbG9uZVN0cmF0ZWd5KHN0cmF0ZWd5OiBJRGF0YUNsb25lU3RyYXRlZ3kpIHtcbiAgICAgICAgaWYgKHN0cmF0ZWd5KSB7XG4gICAgICAgICAgICB0aGlzLl9jbG9uZVN0cmF0ZWd5ID0gc3RyYXRlZ3k7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaW5oZXJpdGRvY1xuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgY2FuUmVkbygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBpbmhlcml0ZG9jXG4gICAgICovXG4gICAgcHVibGljIGdldCBjYW5VbmRvKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGluaGVyaXRkb2NcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGVuYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc1BlbmRpbmc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGluaGVyaXRkb2NcbiAgICAgKi9cbiAgICBwdWJsaWMgb25TdGF0ZVVwZGF0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8U3RhdGVVcGRhdGVFdmVudD4oKTtcblxuICAgIHByb3RlY3RlZCBfaXNQZW5kaW5nID0gZmFsc2U7XG4gICAgcHJvdGVjdGVkIF9wZW5kaW5nVHJhbnNhY3Rpb25zOiBUW10gPSBbXTtcbiAgICBwcm90ZWN0ZWQgX3BlbmRpbmdTdGF0ZXM6IE1hcDxhbnksIFM+ID0gbmV3IE1hcCgpO1xuICAgIHByaXZhdGUgX2Nsb25lU3RyYXRlZ3k6IElEYXRhQ2xvbmVTdHJhdGVneSA9IG5ldyBEZWZhdWx0RGF0YUNsb25lU3RyYXRlZ3koKTtcblxuICAgIC8qKlxuICAgICAqIEBpbmhlcml0ZG9jXG4gICAgICovXG4gICAgcHVibGljIGFkZCh0cmFuc2FjdGlvbjogVCwgcmVjb3JkUmVmPzogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9pc1BlbmRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU3RhdGUodGhpcy5fcGVuZGluZ1N0YXRlcywgdHJhbnNhY3Rpb24sIHJlY29yZFJlZik7XG4gICAgICAgICAgICB0aGlzLl9wZW5kaW5nVHJhbnNhY3Rpb25zLnB1c2godHJhbnNhY3Rpb24pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGluaGVyaXRkb2NcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0VHJhbnNhY3Rpb25Mb2coX2lkPzogYW55KTogVFtdIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBpbmhlcml0ZG9jXG4gICAgICovXG4gICAgcHVibGljIHVuZG8oKTogdm9pZCB7IH1cblxuICAgIC8qKlxuICAgICAqIEBpbmhlcml0ZG9jXG4gICAgICovXG4gICAgcHVibGljIHJlZG8oKTogdm9pZCB7IH1cblxuICAgIC8qKlxuICAgICAqIEBpbmhlcml0ZG9jXG4gICAgICovXG4gICAgcHVibGljIGdldEFnZ3JlZ2F0ZWRDaGFuZ2VzKG1lcmdlQ2hhbmdlczogYm9vbGVhbik6IFRbXSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdDogVFtdID0gW107XG4gICAgICAgIHRoaXMuX3BlbmRpbmdTdGF0ZXMuZm9yRWFjaCgoc3RhdGU6IFMsIGtleTogYW55KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IG1lcmdlQ2hhbmdlcyA/IHRoaXMuZ2V0QWdncmVnYXRlZFZhbHVlKGtleSwgbWVyZ2VDaGFuZ2VzKSA6IHN0YXRlLnZhbHVlO1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goeyBpZDoga2V5LCBuZXdWYWx1ZTogdmFsdWUsIHR5cGU6IHN0YXRlLnR5cGUgfSBhcyBUKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGluaGVyaXRkb2NcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0U3RhdGUoaWQ6IGFueSk6IFMge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGVuZGluZ1N0YXRlcy5nZXQoaWQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBpbmhlcml0ZG9jXG4gICAgICovXG4gICAgcHVibGljIGdldEFnZ3JlZ2F0ZWRWYWx1ZShpZDogYW55LCBtZXJnZUNoYW5nZXM6IGJvb2xlYW4pOiBhbnkge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuX3BlbmRpbmdTdGF0ZXMuZ2V0KGlkKTtcbiAgICAgICAgaWYgKCFzdGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1lcmdlQ2hhbmdlcyAmJiBzdGF0ZS5yZWNvcmRSZWYpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZVZhbHVlKHN0YXRlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RhdGUudmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGluaGVyaXRkb2NcbiAgICAgKi9cbiAgICBwdWJsaWMgY29tbWl0KF9kYXRhOiBhbnlbXSwgX2lkPzogYW55KTogdm9pZCB7IH1cblxuICAgIC8qKlxuICAgICAqIEBpbmhlcml0ZG9jXG4gICAgICovXG4gICAgcHVibGljIGNsZWFyKF9pZD86IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLl9wZW5kaW5nU3RhdGVzLmNsZWFyKCk7XG4gICAgICAgIHRoaXMuX3BlbmRpbmdUcmFuc2FjdGlvbnMgPSBbXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaW5oZXJpdGRvY1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGFydFBlbmRpbmcoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2lzUGVuZGluZyA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGluaGVyaXRkb2NcbiAgICAgKi9cbiAgICBwdWJsaWMgZW5kUGVuZGluZyhfY29tbWl0OiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2lzUGVuZGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9wZW5kaW5nU3RhdGVzLmNsZWFyKCk7XG4gICAgICAgIHRoaXMuX3BlbmRpbmdUcmFuc2FjdGlvbnMgPSBbXTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIHByb3ZpZGVkIHN0YXRlcyBjb2xsZWN0aW9uIGFjY29yZGluZyB0byBwYXNzZWQgdHJhbnNhY3Rpb24gYW5kIHJlY29yZFJlZlxuICAgICAqXG4gICAgICogQHBhcmFtIHN0YXRlcyBTdGF0ZXMgY29sbGVjdGlvbiB0byBhcHBseSB0aGUgdXBkYXRlIHRvXG4gICAgICogQHBhcmFtIHRyYW5zYWN0aW9uIFRyYW5zYWN0aW9uIHRvIGFwcGx5IHRvIHRoZSBjdXJyZW50IHN0YXRlXG4gICAgICogQHBhcmFtIHJlY29yZFJlZiBSZWZlcmVuY2UgdG8gdGhlIHZhbHVlIG9mIHRoZSByZWNvcmQgaW4gZGF0YSBzb3VyY2UsIGlmIGFueSwgd2hlcmUgdHJhbnNhY3Rpb24gc2hvdWxkIGJlIGFwcGxpZWRcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgdXBkYXRlU3RhdGUoc3RhdGVzOiBNYXA8YW55LCBTPiwgdHJhbnNhY3Rpb246IFQsIHJlY29yZFJlZj86IGFueSk6IHZvaWQge1xuICAgICAgICBsZXQgc3RhdGUgPSBzdGF0ZXMuZ2V0KHRyYW5zYWN0aW9uLmlkKTtcbiAgICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgICAgICBpZiAoaXNPYmplY3Qoc3RhdGUudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgbWVyZ2VPYmplY3RzKHN0YXRlLnZhbHVlLCB0cmFuc2FjdGlvbi5uZXdWYWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0YXRlLnZhbHVlID0gdHJhbnNhY3Rpb24ubmV3VmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdGF0ZSA9IHsgdmFsdWU6IHRoaXMuY2xvbmVTdHJhdGVneS5jbG9uZSh0cmFuc2FjdGlvbi5uZXdWYWx1ZSksIHJlY29yZFJlZiwgdHlwZTogdHJhbnNhY3Rpb24udHlwZSB9IGFzIFM7XG4gICAgICAgICAgICBzdGF0ZXMuc2V0KHRyYW5zYWN0aW9uLmlkLCBzdGF0ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSByZWNvcmRSZWYgb2YgdGhlIHByb3ZpZGVkIHN0YXRlIHdpdGggYWxsIHRoZSBjaGFuZ2VzIGluIHRoZSBzdGF0ZS4gQWNjZXB0cyBwcmltaXRpdmUgYW5kIG9iamVjdCB2YWx1ZSB0eXBlc1xuICAgICAqXG4gICAgICogQHBhcmFtIHN0YXRlIFN0YXRlIHRvIHVwZGF0ZSB2YWx1ZSBmb3JcbiAgICAgKiBAcmV0dXJucyB1cGRhdGVkIHZhbHVlIGluY2x1ZGluZyBhbGwgdGhlIGNoYW5nZXMgaW4gcHJvdmlkZWQgc3RhdGVcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgdXBkYXRlVmFsdWUoc3RhdGU6IFMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWVyZ2VWYWx1ZXMoc3RhdGUucmVjb3JkUmVmLCBzdGF0ZS52YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWVyZ2VzIHNlY29uZCB2YWx1ZXMgaW4gZmlyc3QgdmFsdWUgYW5kIHRoZSByZXN1bHQgaW4gZW1wdHkgb2JqZWN0LiBJZiB2YWx1ZXMgYXJlIHByaW1pdGl2ZSB0eXBlXG4gICAgICogcmV0dXJucyBzZWNvbmQgdmFsdWUgaWYgZXhpc3RzLCBvciBmaXJzdCB2YWx1ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBmaXJzdCBWYWx1ZSB0byBtZXJnZSBpbnRvXG4gICAgICogQHBhcmFtIHNlY29uZCBWYWx1ZSB0byBtZXJnZVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBtZXJnZVZhbHVlczxVPihmaXJzdDogVSwgc2Vjb25kOiBVKTogVSB7XG4gICAgICAgIGlmIChpc09iamVjdChmaXJzdCkgfHwgaXNPYmplY3Qoc2Vjb25kKSkge1xuICAgICAgICAgICAgcmV0dXJuIG1lcmdlT2JqZWN0cyh0aGlzLmNsb25lU3RyYXRlZ3kuY2xvbmUoZmlyc3QpLCBzZWNvbmQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHNlY29uZCA/IHNlY29uZCA6IGZpcnN0O1xuICAgICAgICB9XG4gICAgfVxufVxuIl19
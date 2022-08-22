import { Transaction, State, StateUpdateEvent, Action } from './transaction';
import { IgxBaseTransactionService } from './base-transaction';
import { EventEmitter } from '@angular/core';
export declare class IgxTransactionService<T extends Transaction, S extends State> extends IgxBaseTransactionService<T, S> {
    /**
     * @inheritdoc
     */
    onStateUpdate: EventEmitter<StateUpdateEvent>;
    protected _transactions: T[];
    protected _redoStack: Action<T>[][];
    protected _undoStack: Action<T>[][];
    protected _states: Map<any, S>;
    /**
     * @inheritdoc
     */
    get canUndo(): boolean;
    /**
     * @inheritdoc
     */
    get canRedo(): boolean;
    /**
     * @inheritdoc
     */
    add(transaction: T, recordRef?: any): void;
    /**
     * @inheritdoc
     */
    getTransactionLog(id?: any): T[];
    /**
     * @inheritdoc
     */
    getAggregatedChanges(mergeChanges: boolean): T[];
    /**
     * @inheritdoc
     */
    getState(id: any, pending?: boolean): S;
    /**
     * @inheritdoc
     */
    get enabled(): boolean;
    /**
     * @inheritdoc
     */
    getAggregatedValue(id: any, mergeChanges: boolean): any;
    /**
     * @inheritdoc
     */
    endPending(commit: boolean): void;
    /**
     * @inheritdoc
     */
    commit(data: any[], id?: any): void;
    /**
     * @inheritdoc
     */
    clear(id?: any): void;
    /**
     * @inheritdoc
     */
    undo(): void;
    /**
     * @inheritdoc
     */
    redo(): void;
    protected addTransaction(transaction: T, states: Map<any, S>, recordRef?: any): void;
    /**
     * Verifies if the passed transaction is correct. If not throws an exception.
     *
     * @param transaction Transaction to be verified
     */
    protected verifyAddedTransaction(states: Map<any, S>, transaction: T, recordRef?: any): void;
    /**
     * Updates the provided states collection according to passed transaction and recordRef
     *
     * @param states States collection to apply the update to
     * @param transaction Transaction to apply to the current state
     * @param recordRef Reference to the value of the record in data source, if any, where transaction should be applied
     */
    protected updateState(states: Map<any, S>, transaction: T, recordRef?: any): void;
    /**
     * Compares the state with recordRef and clears all duplicated values. If any state ends as
     * empty object removes it from states.
     *
     * @param state State to clean
     */
    protected cleanState(id: any, states: Map<any, S>): void;
    /**
     * Updates state related record in the provided data
     *
     * @param data Data source to update
     * @param state State to update data from
     */
    protected updateRecord(data: any[], state: S): void;
}

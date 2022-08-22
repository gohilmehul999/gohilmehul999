import { HierarchicalTransaction, HierarchicalState } from './transaction';
import { IgxTransactionService } from './igx-transaction';
import { HierarchicalTransactionService } from './hierarchical-transaction';
/** @experimental @hidden */
export declare class IgxHierarchicalTransactionService<T extends HierarchicalTransaction, S extends HierarchicalState> extends IgxTransactionService<T, S> implements HierarchicalTransactionService<T, S> {
    getAggregatedChanges(mergeChanges: boolean): T[];
    commit(data: any[], primaryKeyOrId?: any, childDataKey?: any, id?: any): void;
    protected updateState(states: Map<any, S>, transaction: T, recordRef?: any): void;
    private clearArraysFromObject;
}

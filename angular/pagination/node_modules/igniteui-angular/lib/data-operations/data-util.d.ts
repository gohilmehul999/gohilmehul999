import { IGroupByResult } from './grouping-result.interface';
import { IPagingState } from './paging-state.interface';
import { IGroupByKey } from './groupby-expand-state.interface';
import { IGroupByRecord } from './groupby-record.interface';
import { IGroupingState } from './groupby-state.interface';
import { Transaction, HierarchicalTransaction } from '../services/transaction/transaction';
import { GridType } from '../grids/common/grid.interface';
import { ITreeGridRecord } from '../grids/tree-grid/tree-grid.interfaces';
import { ISortingExpression } from './sorting-strategy';
import { IGridSortingStrategy, IGridGroupingStrategy } from '../grids/common/strategy';
import { IDataCloneStrategy } from '../data-operations/data-clone-strategy';
/**
 * @hidden
 */
export declare const GridColumnDataType: {
    String: "string";
    Number: "number";
    Boolean: "boolean";
    Date: "date";
    DateTime: "dateTime";
    Time: "time";
    Currency: "currency";
    Percent: "percent";
};
export declare type GridColumnDataType = (typeof GridColumnDataType)[keyof typeof GridColumnDataType];
/**
 * @hidden
 */
export declare class DataUtil {
    static sort<T>(data: T[], expressions: ISortingExpression[], sorting?: IGridSortingStrategy, grid?: GridType): T[];
    static treeGridSort(hierarchicalData: ITreeGridRecord[], expressions: ISortingExpression[], sorting?: IGridSortingStrategy, parent?: ITreeGridRecord, grid?: GridType): ITreeGridRecord[];
    static cloneTreeGridRecord(hierarchicalRecord: ITreeGridRecord): ITreeGridRecord;
    static group<T>(data: T[], state: IGroupingState, grouping?: IGridGroupingStrategy, grid?: GridType, groupsRecords?: any[], fullResult?: IGroupByResult): IGroupByResult;
    static page<T>(data: T[], state: IPagingState, dataLength?: number): T[];
    static correctPagingState(state: IPagingState, length: number): void;
    static getHierarchy(gRow: IGroupByRecord): Array<IGroupByKey>;
    static isHierarchyMatch(h1: Array<IGroupByKey>, h2: Array<IGroupByKey>): boolean;
    /**
     * Merges all changes from provided transactions into provided data collection
     *
     * @param data Collection to merge
     * @param transactions Transactions to merge into data
     * @param primaryKey Primary key of the collection, if any
     * @param deleteRows Should delete rows with DELETE transaction type from data
     * @returns Provided data collections updated with all provided transactions
     */
    static mergeTransactions<T>(data: T[], transactions: Transaction[], primaryKey?: any, cloneStrategy?: IDataCloneStrategy, deleteRows?: boolean): T[];
    /**
     * Merges all changes from provided transactions into provided hierarchical data collection
     *
     * @param data Collection to merge
     * @param transactions Transactions to merge into data
     * @param childDataKey Data key of child collections
     * @param primaryKey Primary key of the collection, if any
     * @param deleteRows Should delete rows with DELETE transaction type from data
     * @returns Provided data collections updated with all provided transactions
     */
    static mergeHierarchicalTransactions(data: any[], transactions: HierarchicalTransaction[], childDataKey: any, primaryKey?: any, cloneStrategy?: IDataCloneStrategy, deleteRows?: boolean): any[];
    static parseValue(dataType: GridColumnDataType, value: any): any;
    private static findParentFromPath;
}

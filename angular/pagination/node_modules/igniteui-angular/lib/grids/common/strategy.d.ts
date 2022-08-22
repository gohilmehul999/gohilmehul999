import { IGroupByRecord } from '../../data-operations/groupby-record.interface';
import { IGroupingState } from '../../data-operations/groupby-state.interface';
import { IGroupByResult } from '../../data-operations/grouping-result.interface';
import { ISortingExpression } from '../../data-operations/sorting-strategy';
import { GridType } from './grid.interface';
export interface IGridSortingStrategy {
    sort(data: any[], expressions: ISortingExpression[], grid?: GridType): any[];
}
export interface IGridGroupingStrategy extends IGridSortingStrategy {
    groupBy(data: any[], state: IGroupingState, grid?: any, groupsRecords?: any[], fullResult?: IGroupByResult): IGroupByResult;
}
export declare class IgxSorting implements IGridSortingStrategy {
    sort(data: any[], expressions: ISortingExpression[], grid?: GridType): any[];
    protected groupDataRecursive(data: any[], state: IGroupingState, level: number, parent: IGroupByRecord, metadata: IGroupByRecord[], grid?: GridType, groupsRecords?: any[], fullResult?: IGroupByResult): any[];
    protected getFieldValue<T>(obj: T, key: string, isDate?: boolean, isTime?: boolean): any;
    private groupedRecordsByExpression;
    private sortDataRecursive;
}
export declare class IgxGrouping extends IgxSorting implements IGridGroupingStrategy {
    groupBy(data: any[], state: IGroupingState, grid?: any, groupsRecords?: any[], fullResult?: IGroupByResult): IGroupByResult;
}
export declare class NoopSortingStrategy implements IGridSortingStrategy {
    private static _instance;
    private constructor();
    static instance(): NoopSortingStrategy;
    sort(data: any[]): any[];
}
export declare class IgxDataRecordSorting extends IgxSorting {
    protected getFieldValue(obj: any, key: string, isDate?: boolean, isTime?: boolean): any;
}

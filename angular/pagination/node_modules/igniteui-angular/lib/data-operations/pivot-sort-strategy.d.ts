import { PivotGridType } from '../grids/common/grid.interface';
import { IPivotGridRecord } from '../grids/pivot-grid/pivot-grid.interface';
import { DefaultSortingStrategy, SortingDirection } from './sorting-strategy';
export declare class DefaultPivotGridRecordSortingStrategy extends DefaultSortingStrategy {
    protected static _instance: DefaultPivotGridRecordSortingStrategy;
    static instance(): DefaultPivotGridRecordSortingStrategy;
    sort(data: any[], fieldName: string, dir: SortingDirection, ignoreCase: boolean, valueResolver: (obj: any, key: string, isDate?: boolean) => any, isDate?: boolean, isTime?: boolean, grid?: PivotGridType): any[];
    protected getFieldValue(obj: IPivotGridRecord, key: string, isDate?: boolean, isTime?: boolean): any;
}
export declare class DefaultPivotSortingStrategy extends DefaultSortingStrategy {
    protected static _instance: DefaultPivotSortingStrategy;
    protected dimension: any;
    static instance(): DefaultPivotSortingStrategy;
    sort(data: any[], fieldName: string, dir: SortingDirection, ignoreCase: boolean, valueResolver: (obj: any, key: string, isDate?: boolean) => any, isDate?: boolean, isTime?: boolean, grid?: PivotGridType): any[];
    protected getFieldValue(obj: any, key: string, isDate?: boolean, isTime?: boolean): any;
}

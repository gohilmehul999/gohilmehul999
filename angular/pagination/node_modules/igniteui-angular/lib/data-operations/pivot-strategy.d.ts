import { ColumnType, PivotGridType } from '../grids/common/grid.interface';
import { IPivotDimension, IPivotDimensionStrategy, IPivotGridRecord, IPivotKeys, IPivotValue } from '../grids/pivot-grid/pivot-grid.interface';
import { FilteringStrategy, IgxFilterItem } from './filtering-strategy';
import { IFilteringExpressionsTree } from './filtering-expressions-tree';
export declare class NoopPivotDimensionsStrategy implements IPivotDimensionStrategy {
    private static _instance;
    static instance(): NoopPivotDimensionsStrategy;
    process(collection: any[], _: IPivotDimension[], __: IPivotValue[]): any[];
}
export declare class PivotRowDimensionsStrategy implements IPivotDimensionStrategy {
    private static _instance;
    static instance(): PivotRowDimensionsStrategy;
    process(collection: any, rows: IPivotDimension[], values?: IPivotValue[], pivotKeys?: IPivotKeys): IPivotGridRecord[];
}
export declare class PivotColumnDimensionsStrategy implements IPivotDimensionStrategy {
    private static _instance;
    static instance(): PivotRowDimensionsStrategy | PivotColumnDimensionsStrategy;
    process(collection: IPivotGridRecord[], columns: IPivotDimension[], values: IPivotValue[], pivotKeys?: IPivotKeys): any[];
    private processHierarchy;
    private groupColumns;
    private applyAggregates;
    private getLeafs;
}
export declare class DimensionValuesFilteringStrategy extends FilteringStrategy {
    private fields?;
    /**
     * Creates a new instance of FormattedValuesFilteringStrategy.
     *
     * @param fields An array of column field names that should be formatted.
     * If omitted the values of all columns which has formatter will be formatted.
     */
    constructor(fields?: string[]);
    protected getFieldValue(rec: any, fieldName: string, isDate?: boolean, isTime?: boolean, grid?: PivotGridType): any;
    getFilterItems(column: ColumnType, tree: IFilteringExpressionsTree): Promise<IgxFilterItem[]>;
    private _getFilterItems;
    private _getDimensionValueHierarchy;
}

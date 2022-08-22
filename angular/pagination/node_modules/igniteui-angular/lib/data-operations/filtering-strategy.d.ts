import { IFilteringExpression } from './filtering-expression.interface';
import { IFilteringExpressionsTree } from './filtering-expressions-tree';
import { ColumnType, GridType } from '../grids/common/grid.interface';
import { IFilteringState } from './filtering-state.interface';
export declare class FilterUtil {
    static filter<T>(data: T[], state: IFilteringState, grid?: GridType): T[];
}
export interface IFilteringStrategy {
    filter(data: any[], expressionsTree: IFilteringExpressionsTree, advancedExpressionsTree?: IFilteringExpressionsTree, grid?: GridType): any[];
    getFilterItems(column: ColumnType, tree: IFilteringExpressionsTree): Promise<IgxFilterItem[]>;
}
export interface IgxFilterItem {
    value: any;
    label?: string;
    children?: IgxFilterItem[];
}
export declare abstract class BaseFilteringStrategy implements IFilteringStrategy {
    findMatchByExpression(rec: any, expr: IFilteringExpression, isDate?: boolean, isTime?: boolean, grid?: GridType): boolean;
    matchRecord(rec: any, expressions: IFilteringExpressionsTree | IFilteringExpression, grid?: GridType): boolean;
    getFilterItems(column: ColumnType, tree: IFilteringExpressionsTree): Promise<IgxFilterItem[]>;
    protected getFilterItemLabel(column: ColumnType, value: any, applyFormatter: boolean, data: any): any;
    protected getUniqueFilterItems(column: ColumnType, filterItems: IgxFilterItem[]): any[];
    protected shouldFormatFilterValues(_column: ColumnType): boolean;
    abstract filter(data: any[], expressionsTree: IFilteringExpressionsTree, advancedExpressionsTree?: IFilteringExpressionsTree, grid?: GridType): any[];
    protected abstract getFieldValue(rec: any, fieldName: string, isDate?: boolean, isTime?: boolean, grid?: GridType): any;
}
export declare class NoopFilteringStrategy extends BaseFilteringStrategy {
    protected getFieldValue(rec: any, _fieldName: string): any;
    private static _instance;
    static instance(): NoopFilteringStrategy;
    filter(data: any[], _: IFilteringExpressionsTree, __?: IFilteringExpressionsTree): any[];
}
export declare class FilteringStrategy extends BaseFilteringStrategy {
    private static _instance;
    constructor();
    static instance(): FilteringStrategy;
    filter<T>(data: T[], expressionsTree: IFilteringExpressionsTree, advancedExpressionsTree: IFilteringExpressionsTree, grid: GridType): T[];
    protected getFieldValue(rec: any, fieldName: string, isDate?: boolean, isTime?: boolean, grid?: GridType): any;
}
export declare class FormattedValuesFilteringStrategy extends FilteringStrategy {
    private fields?;
    /**
     * Creates a new instance of FormattedValuesFilteringStrategy.
     *
     * @param fields An array of column field names that should be formatted.
     * If omitted the values of all columns which has formatter will be formatted.
     */
    constructor(fields?: string[]);
    protected shouldFormatFilterValues(column: ColumnType): boolean;
}

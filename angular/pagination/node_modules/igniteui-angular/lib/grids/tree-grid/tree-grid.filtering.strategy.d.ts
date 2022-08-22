import { IFilteringExpressionsTree } from '../../data-operations/filtering-expressions-tree';
import { BaseFilteringStrategy, IgxFilterItem } from '../../data-operations/filtering-strategy';
import { ColumnType, GridType } from '../common/grid.interface';
import { ITreeGridRecord } from './tree-grid.interfaces';
export declare class TreeGridFilteringStrategy extends BaseFilteringStrategy {
    hierarchicalFilterFields?: string[];
    constructor(hierarchicalFilterFields?: string[]);
    filter(data: ITreeGridRecord[], expressionsTree: IFilteringExpressionsTree, advancedExpressionsTree?: IFilteringExpressionsTree, grid?: GridType): ITreeGridRecord[];
    protected getFieldValue(rec: any, fieldName: string, isDate?: boolean, isTime?: boolean, grid?: GridType): any;
    private getHierarchicalFieldValue;
    private filterImpl;
    private isHierarchicalFilterField;
    getFilterItems(column: ColumnType, tree: IFilteringExpressionsTree): Promise<IgxFilterItem[]>;
    private getHierarchicalFilterItems;
}
export declare class TreeGridFormattedValuesFilteringStrategy extends TreeGridFilteringStrategy {
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
export declare class TreeGridMatchingRecordsOnlyFilteringStrategy extends TreeGridFilteringStrategy {
    filter(data: ITreeGridRecord[], expressionsTree: IFilteringExpressionsTree, advancedExpressionsTree?: IFilteringExpressionsTree, grid?: GridType): ITreeGridRecord[];
    private filterImplementation;
    private setCorrectLevelToFilteredRecords;
}

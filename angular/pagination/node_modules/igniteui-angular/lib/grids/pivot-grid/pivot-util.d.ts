import { FilteringExpressionsTree } from '../../data-operations/filtering-expressions-tree';
import { ISortingExpression } from '../../data-operations/sorting-strategy';
import { PivotGridType } from '../common/grid.interface';
import { IGridSortingStrategy } from '../common/strategy';
import { IPivotAggregator, IPivotConfiguration, IPivotDimension, IPivotGridRecord, IPivotKeys, IPivotValue, PivotDimensionType } from './pivot-grid.interface';
export declare class PivotUtil {
    static processGroups(recs: IPivotGridRecord[], dimension: IPivotDimension, pivotKeys: IPivotKeys): void;
    static flattenGroups(data: IPivotGridRecord[], dimension: IPivotDimension, expansionStates: any, defaultExpand: boolean, parent?: IPivotDimension, parentRec?: IPivotGridRecord): void;
    static assignLevels(dims: any): void;
    static getFieldsHierarchy(data: any[], dimensions: IPivotDimension[], dimensionType: PivotDimensionType, pivotKeys: IPivotKeys): Map<string, any>;
    static sort(data: IPivotGridRecord[], expressions: ISortingExpression[], sorting?: IGridSortingStrategy): any[];
    static extractValueFromDimension(dim: IPivotDimension, recData: any): any;
    static getDimensionDepth(dim: IPivotDimension): number;
    static extractValuesForRow(dims: IPivotDimension[], recData: any, pivotKeys: IPivotKeys): Map<string, any>;
    static extractValuesForColumn(dims: IPivotDimension[], recData: any, pivotKeys: IPivotKeys, path?: any[]): Map<string, any>;
    static flatten(arr: any, lvl?: number): any;
    static applyAggregations(rec: IPivotGridRecord, hierarchies: any, values: any, pivotKeys: IPivotKeys): void;
    protected static applyAggregationRecordData(aggregationData: any, groupName: string, rec: IPivotGridRecord, pivotKeys: IPivotKeys): void;
    static aggregate(records: any, values: IPivotValue[]): {};
    static processHierarchy(hierarchies: any, pivotKeys: any, level?: number, rootData?: boolean): IPivotGridRecord[];
    static getDirectLeafs(records: IPivotGridRecord[]): any[];
    static getRecordKey(rec: IPivotGridRecord, currentDim: IPivotDimension): string;
    static buildExpressionTree(config: IPivotConfiguration): FilteringExpressionsTree;
    private static collectRecords;
    private static applyHierarchyChildren;
    static getAggregateList(val: IPivotValue, grid: PivotGridType): IPivotAggregator[];
    static getAggregatorsForValue(value: IPivotValue, grid: PivotGridType): IPivotAggregator[];
}

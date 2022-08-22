import { IFilteringExpression, FilteringLogic } from './filtering-expression.interface';
import { IBaseEventArgs } from '../core/utils';
export declare enum FilteringExpressionsTreeType {
    Regular = 0,
    Advanced = 1
}
export declare interface IFilteringExpressionsTree extends IBaseEventArgs {
    filteringOperands: (IFilteringExpressionsTree | IFilteringExpression)[];
    operator: FilteringLogic;
    fieldName?: string;
    type?: FilteringExpressionsTreeType;
    find(fieldName: string): IFilteringExpressionsTree | IFilteringExpression;
    findIndex(fieldName: string): number;
}
export declare class FilteringExpressionsTree implements IFilteringExpressionsTree {
    /**
     * Sets/gets the filtering operands.
     * ```typescript
     * const gridExpressionsTree = new FilteringExpressionsTree(FilteringLogic.And);
     * const expression = [
     * {
     *   condition: IgxStringFilteringOperand.instance().condition('contains'),
     *   fieldName: 'Column Field',
     *   searchVal: 'Value',
     *   ignoreCase: false
     * }];
     * gridExpressionsTree.filteringOperands.push(expression);
     * this.grid.filteringExpressionsTree = gridExpressionsTree;
     * ```
     * ```typescript
     * let filteringOperands = gridExpressionsTree.filteringOperands;
     * ```
     *
     * @memberof FilteringExpressionsTree
     */
    filteringOperands: (IFilteringExpressionsTree | IFilteringExpression)[];
    /**
     * Sets/gets the operator.
     * ```typescript
     * gridExpressionsTree.operator = FilteringLogic.And;
     * ```
     * ```typescript
     * let operator = gridExpressionsTree.operator;
     * ```
     *
     * @memberof FilteringExpressionsTree
     */
    operator: FilteringLogic;
    /**
     * Sets/gets the field name of the column where the filtering expression is placed.
     * ```typescript
     *  gridExpressionTree.fieldName = 'Column Field';
     * ```
     * ```typescript
     * let columnField = expressionTree.fieldName;
     * ```
     *
     * @memberof FilteringExpressionsTree
     */
    fieldName?: string;
    /**
     * Sets/gets the type of the filtering expressions tree.
     * ```typescript
     *  gridExpressionTree.type = FilteringExpressionsTree.Advanced;
     * ```
     * ```typescript
     * let type = expressionTree.type;
     * ```
     *
     * @memberof FilteringExpressionsTree
     */
    type?: FilteringExpressionsTreeType;
    constructor(operator: FilteringLogic, fieldName?: string);
    /**
     * Checks if filtering expressions tree is empty.
     *
     * @param expressionTree filtering expressions tree.
     */
    static empty(expressionTree: IFilteringExpressionsTree): boolean;
    /**
     * Returns the filtering expression for a column with the provided fieldName.
     * ```typescript
     * let filteringExpression = gridExpressionTree.find('Column Field');
     * ```
     *
     * @memberof FilteringExpressionsTree
     */
    find(fieldName: string): IFilteringExpressionsTree | IFilteringExpression;
    /**
     * Returns the index of the filtering expression for a column with the provided fieldName.
     * ```typescript
     * let filteringExpressionIndex = gridExpressionTree.findIndex('Column Field');
     * ```
     *
     * @memberof FilteringExpressionsTree
     */
    findIndex(fieldName: string): number;
    protected isFilteringExpressionsTreeForColumn(expressionsTree: IFilteringExpressionsTree, fieldName: string): boolean;
}

import { FilteringLogic, IFilteringExpression } from '../../../data-operations/filtering-expression.interface';
import { IFilteringExpressionsTree } from '../../../data-operations/filtering-expressions-tree';
/**
 * @hidden @internal
 */
export declare class FilterListItem {
    value: any;
    label: any;
    isSelected: boolean;
    indeterminate: boolean;
    isFiltered: boolean;
    isSpecial: boolean;
    isBlanks: boolean;
    children?: Array<FilterListItem>;
    parent?: FilterListItem;
}
/**
 * @hidden
 */
export declare class ExpressionUI {
    expression: IFilteringExpression;
    beforeOperator: FilteringLogic;
    afterOperator: FilteringLogic;
    isSelected: boolean;
    isVisible: boolean;
}
export declare function generateExpressionsList(expressions: IFilteringExpressionsTree | IFilteringExpression, operator: FilteringLogic, expressionsUIs: ExpressionUI[]): void;

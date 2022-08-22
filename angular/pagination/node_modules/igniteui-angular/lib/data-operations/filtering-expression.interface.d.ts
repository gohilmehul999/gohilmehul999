import { IFilteringOperation } from './filtering-condition';
export declare enum FilteringLogic {
    And = 0,
    Or = 1
}
/**
 * Represents filtering expressions.
 */
export declare interface IFilteringExpression {
    fieldName: string;
    condition: IFilteringOperation;
    searchVal?: any;
    ignoreCase?: boolean;
}

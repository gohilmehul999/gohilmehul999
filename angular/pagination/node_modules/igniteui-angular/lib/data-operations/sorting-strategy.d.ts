import { IBaseEventArgs } from '../core/utils';
import { GridType } from '../grids/common/grid.interface';
export declare enum SortingDirection {
    None = 0,
    Asc = 1,
    Desc = 2
}
export interface ISortingExpression extends IBaseEventArgs {
    fieldName: string;
    dir: SortingDirection;
    ignoreCase?: boolean;
    strategy?: ISortingStrategy;
}
export interface ISortingStrategy {
    sort: (data: any[], fieldName: string, dir: SortingDirection, ignoreCase: boolean, valueResolver: (obj: any, key: string, isDate?: boolean) => any, isDate?: boolean, isTime?: boolean, grid?: GridType) => any[];
}
export declare class DefaultSortingStrategy implements ISortingStrategy {
    protected static _instance: DefaultSortingStrategy;
    protected constructor();
    static instance(): DefaultSortingStrategy;
    sort(data: any[], fieldName: string, dir: SortingDirection, ignoreCase: boolean, valueResolver: (obj: any, key: string, isDate?: boolean) => any, isDate?: boolean, isTime?: boolean): any[];
    compareValues(a: any, b: any): number;
    protected compareObjects(obj1: any, obj2: any, key: string, reverse: number, ignoreCase: boolean, valueResolver: (obj: any, key: string, isDate?: boolean, isTime?: boolean) => any, isDate: boolean, isTime: boolean): number;
    protected arraySort(data: any[], compareFn?: (arg0: any, arg1: any) => number): any[];
}

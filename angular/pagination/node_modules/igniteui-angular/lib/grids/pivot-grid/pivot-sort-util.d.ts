import { ISortingExpression } from '../../data-operations/sorting-strategy';
import { IPivotDimension } from './pivot-grid.interface';
export declare class PivotSortUtil {
    static generateDimensionSortingExpressions(dimensions: IPivotDimension[]): ISortingExpression[];
}

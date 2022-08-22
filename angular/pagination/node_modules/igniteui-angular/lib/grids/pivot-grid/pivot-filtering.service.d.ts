import { IFilteringOperation } from '../../data-operations/filtering-condition';
import { IFilteringExpressionsTree } from '../../data-operations/filtering-expressions-tree';
import { ColumnType } from '../common/grid.interface';
import { IgxFilteringService } from '../filtering/grid-filtering.service';
import * as i0 from "@angular/core";
export declare class IgxPivotFilteringService extends IgxFilteringService {
    private filtersESFId;
    clearFilter(field: string): void;
    clear_filter(fieldName: string): void;
    protected filter_internal(fieldName: string, term: any, conditionOrExpressionsTree: IFilteringOperation | IFilteringExpressionsTree, ignoreCase: boolean): void;
    toggleFiltersESF(dropdown: any, element: HTMLElement, column: ColumnType, shouldReattach: boolean): void;
    hideESF(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IgxPivotFilteringService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IgxPivotFilteringService>;
}

import { GridBaseAPIService } from '../api.service';
import { IGroupByRecord } from '../../data-operations/groupby-record.interface';
import { IGroupByExpandState } from '../../data-operations/groupby-expand-state.interface';
import { IGroupingExpression } from '../../data-operations/grouping-expression.interface';
import { GridServiceType, GridType } from '../common/grid.interface';
import * as i0 from "@angular/core";
export declare class IgxGridAPIService extends GridBaseAPIService<GridType> implements GridServiceType {
    groupBy(expression: IGroupingExpression): void;
    groupBy_multiple(expressions: IGroupingExpression[]): void;
    clear_groupby(name?: string | Array<string>): void;
    groupBy_get_expanded_for_group(groupRow: IGroupByRecord): IGroupByExpandState;
    groupBy_is_row_in_group(groupRow: IGroupByRecord, rowID: any): boolean;
    groupBy_toggle_group(groupRow: IGroupByRecord): void;
    set_grouprow_expansion_state(groupRow: IGroupByRecord, value: boolean): void;
    groupBy_fully_expand_group(groupRow: IGroupByRecord): void;
    groupBy_select_all_rows_in_group(groupRow: IGroupByRecord, clearPrevSelection: boolean): void;
    groupBy_deselect_all_rows_in_group(groupRow: IGroupByRecord): void;
    arrange_sorting_expressions(): void;
    get_groupBy_record_id(gRow: IGroupByRecord): string;
    remove_grouping_expression(fieldName: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IgxGridAPIService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IgxGridAPIService>;
}

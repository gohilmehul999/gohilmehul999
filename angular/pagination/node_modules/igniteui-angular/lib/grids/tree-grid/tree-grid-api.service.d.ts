import { GridBaseAPIService } from '../api.service';
import { ITreeGridRecord } from './tree-grid.interfaces';
import { IFilteringExpressionsTree } from '../../data-operations/filtering-expressions-tree';
import { ColumnType, GridType } from '../common/grid.interface';
import { ISortingExpression } from '../../data-operations/sorting-strategy';
import * as i0 from "@angular/core";
export declare class IgxTreeGridAPIService extends GridBaseAPIService<GridType> {
    get_all_data(transactions?: boolean): any[];
    get_summary_data(): any[];
    allow_expansion_state_change(rowID: any, expanded: any): boolean;
    expand_path_to_record(record: ITreeGridRecord): void;
    get_row_expansion_state(record: ITreeGridRecord): boolean;
    should_apply_number_style(column: ColumnType): boolean;
    deleteRowById(rowID: any): any;
    deleteRowFromData(rowID: any, index: number): void;
    get_selected_children(record: ITreeGridRecord, selectedRowIDs: any[]): void;
    row_deleted_transaction(rowID: any): boolean;
    get_rec_by_id(rowID: any): ITreeGridRecord;
    /**
     * Returns the index of the record in the data view by pk or -1 if not found or primaryKey is not set.
     *
     * @param pk
     * @param dataCollection
     */
    get_rec_index_by_id(pk: string | number, dataCollection?: any[]): number;
    addRowToData(data: any, parentRowID?: any): void;
    filterDataByExpressions(expressionsTree: IFilteringExpressionsTree): any[];
    sortDataByExpressions(data: ITreeGridRecord[], expressions: ISortingExpression[]): any[];
    filterTreeDataByExpressions(expressionsTree: IFilteringExpressionsTree): ITreeGridRecord[];
    protected update_row_in_array(value: any, rowID: any, index: number): void;
    /**
     * Updates related row of provided grid's data source with provided new row value
     *
     * @param grid Grid to update data for
     * @param rowID ID of the row to update
     * @param rowValueInDataSource Initial value of the row as it is in data source
     * @param rowCurrentValue Current value of the row as it is with applied previous transactions
     * @param rowNewValue New value of the row
     */
    protected updateData(grid: GridType, rowID: any, rowValueInDataSource: any, rowCurrentValue: any, rowNewValue: {
        [x: string]: any;
    }): void;
    private row_deleted_parent;
    private getFlatDataFromFilteredRecords;
    static ɵfac: i0.ɵɵFactoryDeclaration<IgxTreeGridAPIService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IgxTreeGridAPIService>;
}

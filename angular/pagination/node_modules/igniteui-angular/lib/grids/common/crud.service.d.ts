import { IGridEditDoneEventArgs, IGridEditEventArgs } from '../common/events';
import { GridType, RowType } from './grid.interface';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export declare class IgxEditRow {
    id: any;
    index: number;
    data: any;
    grid: GridType;
    transactionState: any;
    state: any;
    newData: any;
    constructor(id: any, index: number, data: any, grid: GridType);
    createEditEventArgs(includeNewValue?: boolean, event?: Event): IGridEditEventArgs;
    createDoneEditEventArgs(cachedRowData: any, event?: Event): IGridEditDoneEventArgs;
    getClassName(): string;
}
export declare class IgxAddRow extends IgxEditRow {
    id: any;
    index: number;
    data: any;
    recordRef: any;
    grid: GridType;
    isAddRow: boolean;
    constructor(id: any, index: number, data: any, recordRef: any, grid: GridType);
    createEditEventArgs(includeNewValue?: boolean, event?: Event): IGridEditEventArgs;
    createDoneEditEventArgs(cachedRowData: any, event?: Event): IGridEditDoneEventArgs;
}
export interface IgxAddRowParent {
    rowID: string;
    index: number;
    asChild: boolean;
    isPinned: boolean;
}
export declare class IgxCell {
    id: any;
    rowIndex: number;
    column: any;
    value: any;
    editValue: any;
    rowData: any;
    grid: GridType;
    primaryKey: any;
    state: any;
    constructor(id: any, rowIndex: number, column: any, value: any, editValue: any, rowData: any, grid: GridType);
    castToNumber(value: any): any;
    createEditEventArgs(includeNewValue?: boolean, event?: Event): IGridEditEventArgs;
    createDoneEditEventArgs(value: any, event?: Event): IGridEditDoneEventArgs;
}
export declare class IgxCellCrudState {
    grid: GridType;
    cell: IgxCell | null;
    row: IgxEditRow | null;
    isInCompositionMode: boolean;
    createCell(cell: any): IgxCell;
    createRow(cell: IgxCell): IgxEditRow;
    sameRow(rowID: any): boolean;
    sameCell(cell: IgxCell): boolean;
    get cellInEditMode(): boolean;
    beginCellEdit(event?: Event): void;
    cellEdit(event?: Event): IGridEditEventArgs;
    updateCell(exit: boolean, event?: Event): IGridEditEventArgs;
    cellEditDone(event: any, addRow: boolean): IGridEditDoneEventArgs;
    /** Exit cell edit mode */
    exitCellEdit(event?: Event): IGridEditDoneEventArgs;
    /** Clears cell editing state */
    endCellEdit(): void;
    /** Returns whether the targeted cell is in edit mode */
    targetInEdit(rowIndex: number, columnIndex: number): boolean;
}
export declare class IgxRowCrudState extends IgxCellCrudState {
    row: IgxEditRow | null;
    closeRowEditingOverlay: Subject<unknown>;
    private _rowEditingBlocked;
    get primaryKey(): any;
    get rowInEditMode(): RowType;
    get rowEditing(): boolean;
    get rowEditingBlocked(): boolean;
    set rowEditingBlocked(val: boolean);
    /** Enters row edit mode */
    beginRowEdit(event?: Event): boolean;
    rowEdit(event: Event): IGridEditEventArgs;
    updateRow(commit: boolean, event?: Event): IGridEditEventArgs;
    /**
     * @hidden @internal
     */
    endRowTransaction(commit: boolean, event?: Event): IGridEditEventArgs;
    rowEditDone(cachedRowData: any, event: Event): IGridEditDoneEventArgs;
    /** Exit row edit mode */
    exitRowEdit(cachedRowData: any, event?: Event): IGridEditDoneEventArgs;
    /** Clears row editing state */
    endRowEdit(): void;
    /** Clears cell and row editing state and closes row editing template if it is open */
    endEditMode(): void;
    updateRowEditData(row: IgxEditRow, value?: any): void;
    protected getParentRowId(): any;
}
export declare class IgxRowAddCrudState extends IgxRowCrudState {
    addRowParent: IgxAddRowParent;
    /**
     * @hidden @internal
     */
    createAddRow(parentRow: RowType, asChild?: boolean): IgxAddRow;
    /**
     * @hidden @internal
     */
    createAddRowParent(row: RowType, newRowAsChild?: boolean): void;
    /**
     * @hidden @internal
     */
    endRowTransaction(commit: boolean, event?: Event): IGridEditEventArgs;
    /**
     * @hidden @internal
     */
    endAddRow(): void;
    /**
     * @hidden
     * @internal
     * TODO: consider changing modifier
     */
    _findRecordIndexInView(rec: any): number;
    protected getParentRowId(): any;
}
export declare class IgxGridCRUDService extends IgxRowAddCrudState {
    enterEditMode(cell: any, event?: Event): boolean;
    /**
     * Enters add row mode by creating temporary dummy so the user can fill in new row cells.
     *
     * @param parentRow Parent row after which the Add Row UI will be rendered.
     *                  If `null` will show it at the bottom after all rows (or top if there are not rows).
     * @param asChild Specifies if the new row should be added as a child to a tree row.
     * @param event Base event that triggered the add row mode.
     */
    enterAddRowMode(parentRow: RowType, asChild?: boolean, event?: Event): void;
    /**
     * Finishes the row transactions on the current row.
     *
     * @remarks
     * If `commit === true`, passes them from the pending state to the data (or transaction service)
     * @example
     * ```html
     * <button igxButton (click)="grid.endEdit(true)">Commit Row</button>
     * ```
     * @param commit
     */
    endEdit(commit?: boolean, event?: Event): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<IgxGridCRUDService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IgxGridCRUDService>;
}

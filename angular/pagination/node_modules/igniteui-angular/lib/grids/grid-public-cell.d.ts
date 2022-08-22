import { CellType, ColumnType, GridType, RowType } from './common/grid.interface';
import { ISelectionNode } from './common/types';
export declare class IgxGridCell implements CellType {
    /**
     * Returns the grid containing the cell.
     *
     * @memberof IgxGridCell
     */
    grid: GridType;
    private _row;
    private _rowIndex;
    private _column;
    private _columnField;
    /**
     * @hidden
     */
    constructor(grid: GridType, row: number | RowType, column: string | ColumnType);
    /**
     * Returns the row containing the cell.
     * ```typescript
     * let row = this.cell.row;
     * ```
     *
     * @memberof IgxGridCell
     */
    get row(): RowType;
    /**
     * Returns the column of the cell.
     * ```typescript
     * let column = this.cell.column;
     * ```
     *
     * @memberof IgxGridCell
     */
    get column(): ColumnType;
    /**
     * Gets the current edit value while a cell is in edit mode.
     * ```typescript
     * let editValue = this.cell.editValue;
     * ```
     *
     * @memberof IgxGridCell
     */
    get editValue(): any;
    /**
     * Sets the current edit value while a cell is in edit mode.
     * Only for cell editing mode.
     * ```typescript
     * this.cell.editValue = value;
     * ```
     *
     * @memberof IgxGridCell
     */
    set editValue(value: any);
    /**
     * Returns whether the cell is editable..
     *
     * @memberof IgxGridCell
     */
    get editable(): boolean;
    /**
     * Gets the width of the cell.
     * ```typescript
     * let cellWidth = this.cell.width;
     * ```
     *
     * @memberof IgxGridCell
     */
    get width(): string;
    /**
     * Returns the cell value.
     *
     * @memberof IgxGridCell
     */
    get value(): any;
    /**
     * Updates the cell value.
     *
     * @memberof IgxGridCell
     */
    set value(val: any);
    /**
     * Gets the cell id.
     * A cell in the grid is identified by:
     * - rowID - primaryKey data value or the whole rowData, if the primaryKey is omitted.
     * - rowIndex - the row index
     * - columnID - column index
     *
     * ```typescript
     * let cellID = cell.id;
     * ```
     *
     * @memberof IgxGridCell
     */
    get id(): any;
    /**
     * Returns if the row is currently in edit mode.
     *
     * @memberof IgxGridCell
     */
    get editMode(): boolean;
    /**
     * Starts/ends edit mode for the cell.
     *
     * ```typescript
     * cell.editMode  = !cell.editMode;
     * ```
     *
     * @memberof IgxGridCell
     */
    set editMode(value: boolean);
    /**
     * Gets whether the cell is selected.
     * ```typescript
     * let isSelected = this.cell.selected;
     * ```
     *
     *
     * @memberof IgxGridCell
     */
    get selected(): boolean;
    /**
     * Selects/deselects the cell.
     * ```typescript
     * this.cell.selected = true.
     * ```
     *
     *
     * @memberof IgxGridCell
     */
    set selected(val: boolean);
    get active(): boolean;
    /**
     * Updates the cell value.
     *
     * ```typescript
     * cell.update(newValue);
     * ```
     *
     * @memberof IgxGridCell
     */
    update(val: any): void;
    protected get selectionNode(): ISelectionNode;
    private isCellInEditMode;
    private endEdit;
}

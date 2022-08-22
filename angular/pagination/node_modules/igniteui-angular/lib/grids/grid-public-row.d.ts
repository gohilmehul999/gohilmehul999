import { IGroupByRecord } from '../data-operations/groupby-record.interface';
import { GridInstanceType } from './common/enums';
import { IgxSummaryResult } from './summaries/grid-summary';
import { ITreeGridRecord } from './tree-grid/tree-grid.interfaces';
import { CellType, GridType, RowType } from './common/grid.interface';
declare abstract class BaseRow implements RowType {
    index: number;
    /**
     * The grid that contains the row.
     */
    grid: GridType;
    protected _data?: any;
    /**
     * Returns the view index calculated per the grid page.
     */
    get viewIndex(): number;
    /**
     * Gets the row key.
     * A row in the grid is identified either by:
     * - primaryKey data value,
     * - the whole rowData, if the primaryKey is omitted.
     *
     * ```typescript
     * let rowKey = row.key;
     * ```
     */
    get key(): any;
    /**
     * Gets if this represents add row UI
     *
     * ```typescript
     * let isAddRow = row.addRowUI;
     * ```
     */
    get addRowUI(): boolean;
    /**
     * The data record that populates the row.
     *
     * ```typescript
     * let rowData = row.data;
     * ```
     */
    get data(): any;
    /**
     * Returns if the row is currently in edit mode.
     */
    get inEditMode(): boolean;
    /**
     * Gets whether the row is pinned.
     * Default value is `false`.
     * ```typescript
     * const isPinned = row.pinned;
     * ```
     */
    get pinned(): boolean;
    /**
     * Sets whether the row is pinned.
     * Default value is `false`.
     * ```typescript
     * row.pinned = !row.pinned;
     * ```
     */
    set pinned(val: boolean);
    /**
     * Gets the row expanded/collapsed state.
     *
     * ```typescript
     * const isExpanded = row.expanded;
     * ```
     */
    get expanded(): boolean;
    /**
     * Expands/collapses the row.
     *
     * ```typescript
     * row.expanded = true;
     * ```
     */
    set expanded(val: boolean);
    /**
     * Gets whether the row is selected.
     * Default value is `false`.
     * ```typescript
     * row.selected = true;
     * ```
     */
    get selected(): boolean;
    /**
     * Sets whether the row is selected.
     * Default value is `false`.
     * ```typescript
     * row.selected = !row.selected;
     * ```
     */
    set selected(val: boolean);
    /**
     * Returns if the row is in delete state.
     */
    get deleted(): boolean;
    /**
     * Returns if the row has child rows. Always return false for IgxGridRow.
     */
    get hasChildren(): boolean;
    get disabled(): boolean;
    /**
     * Gets the rendered cells in the row component.
     */
    get cells(): CellType[];
    /**
     * Pins the specified row.
     * This method emits `onRowPinning` event.
     *
     * ```typescript
     * // pin the selected row from the grid
     * this.grid.selectedRows[0].pin();
     * ```
     */
    pin(): boolean;
    /**
     * Unpins the specified row.
     * This method emits `onRowPinning` event.
     *
     * ```typescript
     * // unpin the selected row from the grid
     * this.grid.selectedRows[0].unpin();
     * ```
     */
    unpin(): boolean;
    /**
     * Updates the specified row object and the data source record with the passed value.
     *
     * ```typescript
     * // update the second selected row's value
     * let newValue = "Apple";
     * this.grid.selectedRows[1].update(newValue);
     * ```
     */
    update(value: any): void;
    /**
     * Removes the specified row from the grid's data source.
     * This method emits `onRowDeleted` event.
     *
     * ```typescript
     * // delete the third selected row from the grid
     * this.grid.selectedRows[2].delete();
     * ```
     */
    delete(): void;
}
export declare class IgxGridRow extends BaseRow implements RowType {
    grid: GridType;
    index: number;
    /**
     * @hidden
     */
    constructor(grid: GridType, index: number, data?: any);
    /**
     * Returns the view index calculated per the grid page.
     */
    get viewIndex(): number;
    /**
     * Returns the parent row, if grid is grouped.
     */
    get parent(): RowType;
}
export declare class IgxTreeGridRow extends BaseRow implements RowType {
    grid: GridType;
    index: number;
    private _treeRow?;
    /**
     * @hidden
     */
    constructor(grid: GridType, index: number, data?: any, _treeRow?: ITreeGridRecord);
    /**
     * Returns the view index calculated per the grid page.
     */
    get viewIndex(): number;
    /**
     *  The data passed to the row component.
     *
     * ```typescript
     * let selectedRowData = this.grid.selectedRows[0].data;
     * ```
     */
    get data(): any;
    /**
     * Returns the child rows.
     */
    get children(): RowType[];
    /**
     * Returns the parent row.
     */
    get parent(): RowType;
    /**
     * Returns true if child rows exist. Always return false for IgxGridRow.
     */
    get hasChildren(): boolean;
    /**
     * The `ITreeGridRecord` with metadata about the row in the context of the tree grid.
     *
     * ```typescript
     * const rowParent = this.treeGrid.getRowByKey(1).treeRow.parent;
     * ```
     */
    get treeRow(): ITreeGridRecord;
    /**
     * Gets whether the row is pinned.
     *
     * ```typescript
     * let isPinned = row.pinned;
     * ```
     */
    get pinned(): boolean;
    /**
     * Sets whether the row is pinned.
     * Default value is `false`.
     * ```typescript
     * row.pinned = !row.pinned;
     * ```
     */
    set pinned(val: boolean);
    /**
     * Gets whether the row is expanded.
     *
     * ```typescript
     * let esExpanded = row.expanded;
     * ```
     */
    get expanded(): boolean;
    /**
     * Expands/collapses the row.
     *
     * ```typescript
     * row.expanded = true;
     * ```
     */
    set expanded(val: boolean);
    get disabled(): boolean;
    private getRootParent;
}
export declare class IgxHierarchicalGridRow extends BaseRow implements RowType {
    grid: GridType;
    index: number;
    /**
     * @hidden
     */
    constructor(grid: GridType, index: number, data?: any);
    /**
     * Returns true if row islands exist.
     */
    get hasChildren(): boolean;
    /**
     * Returns the view index calculated per the grid page.
     */
    get viewIndex(): number;
    /**
     * Gets the rendered cells in the row component.
     */
    get cells(): CellType[];
}
export declare class IgxGroupByRow implements RowType {
    private _groupRow?;
    /**
     * Returns the row index.
     */
    index: number;
    /**
     * The grid that contains the row.
     */
    grid: GridType;
    /**
     * Returns always true, because this is in instance of an IgxGroupByRow.
     */
    isGroupByRow: boolean;
    /**
     * The IGroupByRecord object, representing the group record, if the row is a GroupByRow.
     */
    get groupRow(): IGroupByRecord;
    /**
     * Returns the child rows.
     */
    get children(): RowType[];
    /**
     * Returns the view index calculated per the grid page.
     */
    get viewIndex(): number;
    /**
     * @hidden
     */
    constructor(grid: GridType, index: number, _groupRow?: IGroupByRecord);
    /**
     * Gets whether the row is selected.
     * Default value is `false`.
     * ```typescript
     * row.selected = true;
     * ```
     */
    get selected(): boolean;
    /**
     * Sets whether the row is selected.
     * Default value is `false`.
     * ```typescript
     * row.selected = !row.selected;
     * ```
     */
    set selected(val: boolean);
    /**
     * Gets/sets whether the group row is expanded.
     * ```typescript
     * const groupRowExpanded = groupRow.expanded;
     * ```
     */
    get expanded(): boolean;
    set expanded(value: boolean);
    isActive(): boolean;
    /**
     * Toggles the group row expanded/collapsed state.
     * ```typescript
     * groupRow.toggle()
     * ```
     */
    toggle(): void;
    private get gridAPI();
}
export declare class IgxSummaryRow implements RowType {
    private _summaries?;
    /**
     * Returns the row index.
     */
    index: number;
    /**
     * The grid that contains the row.
     */
    grid: GridType;
    /**
     * Returns always true, because this is in instance of an IgxGroupByRow.
     */
    isSummaryRow: boolean;
    /**
     * Returns the curent grid type
     */
    private gridType;
    /**
     * The IGroupByRecord object, representing the group record, if the row is a GroupByRow.
     */
    get summaries(): Map<string, IgxSummaryResult[]>;
    /**
     * Returns the view index calculated per the grid page.
     */
    get viewIndex(): number;
    /**
     * @hidden
     */
    constructor(grid: GridType, index: number, _summaries?: Map<string, IgxSummaryResult[]>, type?: GridInstanceType);
    private getRootParent;
}
export {};

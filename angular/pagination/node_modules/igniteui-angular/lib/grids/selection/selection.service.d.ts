import { EventEmitter, NgZone } from '@angular/core';
import { Subject } from 'rxjs';
import { PlatformUtil } from '../../core/utils';
import { GridType } from '../common/grid.interface';
import { GridSelectionRange, IColumnSelectionState, IMultiRowLayoutNode, ISelectionKeyboardState, ISelectionNode, ISelectionPointerState, SelectionState } from '../common/types';
import * as i0 from "@angular/core";
export declare class IgxGridSelectionService {
    private zone;
    protected platform: PlatformUtil;
    grid: GridType;
    dragMode: boolean;
    activeElement: ISelectionNode | null;
    keyboardState: ISelectionKeyboardState;
    pointerState: ISelectionPointerState;
    columnsState: IColumnSelectionState;
    selection: Map<number, Set<number>>;
    temp: Map<number, Set<number>>;
    rowSelection: Set<any>;
    indeterminateRows: Set<any>;
    columnSelection: Set<string>;
    /**
     * @hidden @internal
     */
    selectedRowsChange: Subject<unknown>;
    /**
     * Toggled when a pointerdown event is triggered inside the grid body (cells).
     * When `false` the drag select behavior is disabled.
     */
    private pointerEventInGridBody;
    private allRowsSelected;
    private _ranges;
    private _selectionRange;
    /**
     * Returns the current selected ranges in the grid from both
     * keyboard and pointer interactions
     */
    get ranges(): GridSelectionRange[];
    get primaryButton(): boolean;
    set primaryButton(value: boolean);
    constructor(zone: NgZone, platform: PlatformUtil);
    /**
     * Resets the keyboard state
     */
    initKeyboardState(): void;
    /**
     * Resets the pointer state
     */
    initPointerState(): void;
    /**
     * Resets the columns state
     */
    initColumnsState(): void;
    /**
     * Adds a single node.
     * Single clicks | Ctrl + single clicks on cells is the usual case.
     */
    add(node: ISelectionNode, addToRange?: boolean): void;
    /**
     * Adds the active keyboard range selection (if any) to the `ranges` meta.
     */
    addKeyboardRange(): void;
    remove(node: ISelectionNode): void;
    isInMap(node: ISelectionNode): boolean;
    selected(node: ISelectionNode): boolean;
    isActiveNode(node: ISelectionNode): boolean;
    isActiveLayout(current: IMultiRowLayoutNode, target: IMultiRowLayoutNode): boolean;
    addRangeMeta(node: ISelectionNode, state?: SelectionState): void;
    removeRangeMeta(node: ISelectionNode, state?: SelectionState): void;
    /**
     * Generates a new selection range from the given `node`.
     * If `state` is passed instead it will generate the range based on the passed `node`
     * and the start node of the `state`.
     */
    generateRange(node: ISelectionNode, state?: SelectionState): GridSelectionRange;
    /**
     *
     */
    keyboardStateOnKeydown(node: ISelectionNode, shift: boolean, shiftTab: boolean): void;
    keyboardStateOnFocus(node: ISelectionNode, emitter: EventEmitter<GridSelectionRange>, dom: any): void;
    pointerDown(node: ISelectionNode, shift: boolean, ctrl: boolean): void;
    pointerDownShiftKey(node: ISelectionNode): void;
    mergeMap(target: Map<number, Set<number>>, source: Map<number, Set<number>>): void;
    pointerEnter(node: ISelectionNode, event: PointerEvent): boolean;
    pointerUp(node: ISelectionNode, emitter: EventEmitter<GridSelectionRange>): boolean;
    selectRange(node: ISelectionNode, state: SelectionState, collection?: Map<number, Set<number>>): void;
    dragSelect(node: ISelectionNode, state: SelectionState): void;
    clear(clearAcriveEl?: boolean): void;
    clearTextSelection(): void;
    restoreTextSelection(): void;
    /** Returns array of the selected row id's. */
    getSelectedRows(): Array<any>;
    /** Returns array of the rows in indeterminate state. */
    getIndeterminateRows(): Array<any>;
    /** Clears row selection, if filtering is applied clears only selected rows from filtered data. */
    clearRowSelection(event?: any): void;
    /** Select all rows, if filtering is applied select only from filtered data. */
    selectAllRows(event?: any): void;
    /** Select the specified row and emit event. */
    selectRowById(rowID: any, clearPrevSelection?: any, event?: any): void;
    /** Deselect the specified row and emit event. */
    deselectRow(rowID: any, event?: any): void;
    /** Select the specified rows and emit event. */
    selectRows(keys: any[], clearPrevSelection?: boolean, event?: any): void;
    deselectRows(keys: any[], event?: any): void;
    /** Select specified rows. No event is emitted. */
    selectRowsWithNoEvent(rowIDs: any[], clearPrevSelection?: any): void;
    /** Deselect specified rows. No event is emitted. */
    deselectRowsWithNoEvent(rowIDs: any[]): void;
    isRowSelected(rowID: any): boolean;
    isPivotRowSelected(rowID: any): boolean;
    isRowInIndeterminateState(rowID: any): boolean;
    /** Select range from last selected row to the current specified row. */
    selectMultipleRows(rowID: any, rowData: any, event?: any): void;
    areAllRowSelected(): boolean;
    hasSomeRowSelected(): boolean;
    get filteredSelectedRowIds(): any[];
    emitRowSelectionEvent(newSelection: any, added: any, removed: any, event?: any): boolean;
    getRowDataById(rowID: any): any;
    getRowIDs(data: any): Array<any>;
    clearHeaderCBState(): void;
    /** Clear rowSelection and update checkbox state */
    clearAllSelectedRows(): void;
    /** Returns all data in the grid, with applied filtering and sorting and without deleted rows. */
    get allData(): Array<any>;
    /** Returns array of the selected columns fields. */
    getSelectedColumns(): Array<any>;
    isColumnSelected(field: string): boolean;
    /** Select the specified column and emit event. */
    selectColumn(field: string, clearPrevSelection?: any, selectColumnsRange?: any, event?: any): void;
    /** Select specified columns. And emit event. */
    selectColumns(fields: string[], clearPrevSelection?: any, selectColumnsRange?: any, event?: any): void;
    /** Select range from last clicked column to the current specified column. */
    selectColumnsRange(field: string, event: any): void;
    /** Select specified columns. No event is emitted. */
    selectColumnsWithNoEvent(fields: string[], clearPrevSelection?: any): void;
    /** Deselect the specified column and emit event. */
    deselectColumn(field: string, event?: any): void;
    /** Deselect specified columns. No event is emitted. */
    deselectColumnsWithNoEvent(fields: string[]): void;
    /** Deselect specified columns. And emit event. */
    deselectColumns(fields: string[], event?: any): void;
    emitColumnSelectionEvent(newSelection: any, added: any, removed: any, event?: any): boolean;
    /** Clear columnSelection */
    clearAllSelectedColumns(): void;
    protected areEqualCollections(first: any, second: any): boolean;
    /**
     * (╯°□°）╯︵ ┻━┻
     * Chrome and Chromium don't care about the active
     * range after keyboard navigation, thus this.
     */
    private _moveSelectionChrome;
    private isFilteringApplied;
    private isRowDeleted;
    private pointerOriginHandler;
    static ɵfac: i0.ɵɵFactoryDeclaration<IgxGridSelectionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IgxGridSelectionService>;
}

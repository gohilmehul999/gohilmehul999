import { NgZone } from '@angular/core';
import { ColumnType } from '../common/grid.interface';
import * as i0 from "@angular/core";
/**
 * @hidden
 * @internal
 */
export declare class IgxColumnResizingService {
    private zone;
    /**
     * @hidden
     */
    startResizePos: number;
    /**
     * Indicates that a column is currently being resized.
     */
    isColumnResizing: boolean;
    /**
     * @hidden
     */
    resizeCursor: string;
    /**
     * @hidden
     */
    showResizer: boolean;
    /**
     * The column being resized.
     */
    column: ColumnType;
    constructor(zone: NgZone);
    /**
     * @hidden
     */
    getColumnHeaderRenderedWidth(): any;
    /**
     * @hidden
     */
    get resizerHeight(): number;
    /**
     * Returns the minimal possible width to which the column can be resized.
     */
    get restrictResizeMin(): number;
    /**
     * Returns the maximal possible width to which the column can be resized.
     */
    get restrictResizeMax(): number;
    /**
     * Autosizes the column to the longest currently visible cell value, including the header cell.
     * If the column has a predifined maxWidth and the autosized column width will become bigger than it,
     * then the column is sized to its maxWidth.
     */
    autosizeColumnOnDblClick(): void;
    /**
     * Resizes the column regaridng to the column minWidth and maxWidth.
     */
    resizeColumn(event: MouseEvent): void;
    protected _handlePixelResize(diff: number, column: ColumnType): void;
    protected _handlePercentageResize(diff: number, column: ColumnType): void;
    protected getColMinWidth(column: ColumnType): number;
    protected resizeColumnLayoutFor(column: ColumnType, diff: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IgxColumnResizingService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IgxColumnResizingService>;
}

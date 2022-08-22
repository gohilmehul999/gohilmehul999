import { resolveNestedPath } from '../core/utils';
export class IgxGridCell {
    /**
     * @hidden
     */
    constructor(grid, row, column) {
        this.grid = grid;
        if (typeof row === 'number') {
            this._rowIndex = row;
        }
        else {
            this._row = row;
            this._rowIndex = row.index;
        }
        if (typeof column === 'string') {
            this._columnField = column;
        }
        else {
            this._column = column;
        }
    }
    /**
     * Returns the row containing the cell.
     * ```typescript
     * let row = this.cell.row;
     * ```
     *
     * @memberof IgxGridCell
     */
    get row() {
        return this._row || this.grid.createRow(this._rowIndex);
    }
    /**
     * Returns the column of the cell.
     * ```typescript
     * let column = this.cell.column;
     * ```
     *
     * @memberof IgxGridCell
     */
    get column() {
        return this._column || this.grid.getColumnByName(this._columnField);
    }
    /**
     * Gets the current edit value while a cell is in edit mode.
     * ```typescript
     * let editValue = this.cell.editValue;
     * ```
     *
     * @memberof IgxGridCell
     */
    get editValue() {
        if (this.isCellInEditMode()) {
            return this.grid.crudService.cell.editValue;
        }
    }
    /**
     * Sets the current edit value while a cell is in edit mode.
     * Only for cell editing mode.
     * ```typescript
     * this.cell.editValue = value;
     * ```
     *
     * @memberof IgxGridCell
     */
    set editValue(value) {
        if (this.isCellInEditMode()) {
            this.grid.crudService.cell.editValue = value;
        }
    }
    /**
     * Returns whether the cell is editable..
     *
     * @memberof IgxGridCell
     */
    get editable() {
        return this.column.editable && !this.row?.disabled;
    }
    /**
     * Gets the width of the cell.
     * ```typescript
     * let cellWidth = this.cell.width;
     * ```
     *
     * @memberof IgxGridCell
     */
    get width() {
        return this.column.width;
    }
    /**
     * Returns the cell value.
     *
     * @memberof IgxGridCell
     */
    get value() {
        // will return undefined for a column layout, because getCellByColumnVisibleIndex may return the column layout at that index.
        // getCellByColumnVisibleIndex is deprecated and will be removed in future version
        return this.column.field ?
            this.column.hasNestedPath ? resolveNestedPath(this.row?.data, this.column.field) : this.row?.data[this.column.field]
            : undefined;
    }
    /**
     * Updates the cell value.
     *
     * @memberof IgxGridCell
     */
    set value(val) {
        this.update(val);
    }
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
    get id() {
        const primaryKey = this.grid.primaryKey;
        const rowID = primaryKey ? this.row?.data[primaryKey] : this.row?.data;
        return { rowID, columnID: this.column.index, rowIndex: this._rowIndex || this.row?.index };
    }
    /**
     * Returns if the row is currently in edit mode.
     *
     * @memberof IgxGridCell
     */
    get editMode() {
        return this.isCellInEditMode();
    }
    /**
     * Starts/ends edit mode for the cell.
     *
     * ```typescript
     * cell.editMode  = !cell.editMode;
     * ```
     *
     * @memberof IgxGridCell
     */
    set editMode(value) {
        const isInEditMode = this.isCellInEditMode();
        if (!this.row || this.row?.deleted || isInEditMode === value) {
            return;
        }
        if (this.editable && value) {
            this.endEdit();
            // TODO possibly define similar method in gridAPI, which does not emit event
            this.grid.crudService.enterEditMode(this);
        }
        else {
            this.grid.crudService.endCellEdit();
        }
        this.grid.notifyChanges();
    }
    /**
     * Gets whether the cell is selected.
     * ```typescript
     * let isSelected = this.cell.selected;
     * ```
     *
     *
     * @memberof IgxGridCell
     */
    get selected() {
        return this.grid.selectionService.selected(this.selectionNode);
    }
    /**
     * Selects/deselects the cell.
     * ```typescript
     * this.cell.selected = true.
     * ```
     *
     *
     * @memberof IgxGridCell
     */
    set selected(val) {
        const node = this.selectionNode;
        if (val) {
            this.grid.selectionService.add(node);
        }
        else {
            this.grid.selectionService.remove(node);
        }
        this.grid.notifyChanges();
    }
    get active() {
        const node = this.grid.navigation.activeNode;
        return node ? node.row === this.row?.index && node.column === this.column.visibleIndex : false;
    }
    /**
     * Updates the cell value.
     *
     * ```typescript
     * cell.update(newValue);
     * ```
     *
     * @memberof IgxGridCell
     */
    update(val) {
        if (this.row?.deleted) {
            return;
        }
        this.endEdit();
        const cell = this.isCellInEditMode() ? this.grid.crudService.cell : this.grid.crudService.createCell(this);
        cell.editValue = val;
        this.grid.gridAPI.update_cell(cell);
        this.grid.crudService.endCellEdit();
        this.grid.notifyChanges();
    }
    get selectionNode() {
        return {
            row: this.row?.index,
            column: this.column.columnLayoutChild ? this.column.parent.visibleIndex : this.column.visibleIndex,
            layout: this.column.columnLayoutChild ? {
                rowStart: this.column.rowStart,
                colStart: this.column.colStart,
                rowEnd: this.column.rowEnd,
                colEnd: this.column.colEnd,
                columnVisibleIndex: this.column.visibleIndex
            } : null
        };
    }
    isCellInEditMode() {
        if (this.grid.crudService.cellInEditMode) {
            const cellInEditMode = this.grid.crudService.cell.id;
            const isCurrentCell = cellInEditMode.rowID === this.id.rowID &&
                cellInEditMode.rowIndex === this.id.rowIndex &&
                cellInEditMode.columnID === this.id.columnID;
            return isCurrentCell;
        }
        return false;
    }
    endEdit() {
        if (!this.isCellInEditMode()) {
            this.grid.gridAPI.update_cell(this.grid.crudService.cell);
            this.grid.crudService.endCellEdit();
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1wdWJsaWMtY2VsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2lnbml0ZXVpLWFuZ3VsYXIvc3JjL2xpYi9ncmlkcy9ncmlkLXB1YmxpYy1jZWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVsRCxNQUFNLE9BQU8sV0FBVztJQWFwQjs7T0FFRztJQUNILFlBQ0ksSUFBYyxFQUNkLEdBQXFCLEVBQ3JCLE1BQTJCO1FBQzNCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO1NBQ3hCO2FBQU07WUFDSCxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztZQUNoQixJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7U0FDOUI7UUFDRCxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtZQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQztTQUM5QjthQUFNO1lBQ0gsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7U0FDekI7SUFDTCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILElBQVcsR0FBRztRQUNWLE9BQU8sSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxJQUFXLE1BQU07UUFDYixPQUFPLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsSUFB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QyxLQUFLLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLO2dCQUN4RCxjQUFjLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUTtnQkFDNUMsY0FBYyxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQztZQUNqRCxPQUFPLGFBQWEsQ0FBQztTQUN4QjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFTyxPQUFPO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFO1lBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxRCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN2QztJQUNMLENBQUM7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENlbGxUeXBlLCBDb2x1bW5UeXBlLCBHcmlkVHlwZSwgUm93VHlwZSB9IGZyb20gJy4vY29tbW9uL2dyaWQuaW50ZXJmYWNlJztcbmltcG9ydCB7IElTZWxlY3Rpb25Ob2RlIH0gZnJvbSAnLi9jb21tb24vdHlwZXMnO1xuaW1wb3J0IHsgcmVzb2x2ZU5lc3RlZFBhdGggfSBmcm9tICcuLi9jb3JlL3V0aWxzJztcblxuZXhwb3J0IGNsYXNzIElneEdyaWRDZWxsIGltcGxlbWVudHMgQ2VsbFR5cGUge1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZ3JpZCBjb250YWluaW5nIHRoZSBjZWxsLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIElneEdyaWRDZWxsXG4gICAgICovXG4gICAgcHVibGljIGdyaWQ6IEdyaWRUeXBlO1xuICAgIHByaXZhdGUgX3JvdzogUm93VHlwZTtcbiAgICBwcml2YXRlIF9yb3dJbmRleDogbnVtYmVyO1xuICAgIHByaXZhdGUgX2NvbHVtbjogQ29sdW1uVHlwZTtcbiAgICBwcml2YXRlIF9jb2x1bW5GaWVsZDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQGhpZGRlblxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBncmlkOiBHcmlkVHlwZSxcbiAgICAgICAgcm93OiBudW1iZXIgfCBSb3dUeXBlLFxuICAgICAgICBjb2x1bW46IHN0cmluZyB8IENvbHVtblR5cGUpIHtcbiAgICAgICAgdGhpcy5ncmlkID0gZ3JpZDtcbiAgICAgICAgaWYgKHR5cGVvZiByb3cgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aGlzLl9yb3dJbmRleCA9IHJvdztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3JvdyA9IHJvdztcbiAgICAgICAgICAgIHRoaXMuX3Jvd0luZGV4ID0gcm93LmluZGV4O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgY29sdW1uID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy5fY29sdW1uRmllbGQgPSBjb2x1bW47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9jb2x1bW4gPSBjb2x1bW47XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSByb3cgY29udGFpbmluZyB0aGUgY2VsbC5cbiAgICAgKiBgYGB0eXBlc2NyaXB0XG4gICAgICogbGV0IHJvdyA9IHRoaXMuY2VsbC5yb3c7XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgSWd4R3JpZENlbGxcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHJvdygpOiBSb3dUeXBlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JvdyB8fCB0aGlzLmdyaWQuY3JlYXRlUm93KHRoaXMuX3Jvd0luZGV4KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBjb2x1bW4gb2YgdGhlIGNlbGwuXG4gICAgICogYGBgdHlwZXNjcmlwdFxuICAgICAqIGxldCBjb2x1bW4gPSB0aGlzLmNlbGwuY29sdW1uO1xuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIElneEdyaWRDZWxsXG4gICAgICovXG4gICAgcHVibGljIGdldCBjb2x1bW4oKTogQ29sdW1uVHlwZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb2x1bW4gfHwgdGhpcy5ncmlkLmdldENvbHVtbkJ5TmFtZSh0aGlzLl9jb2x1bW5GaWVsZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgY3VycmVudCBlZGl0IHZhbHVlIHdoaWxlIGEgY2VsbCBpcyBpbiBlZGl0IG1vZGUuXG4gICAgICogYGBgdHlwZXNjcmlwdFxuICAgICAqIGxldCBlZGl0VmFsdWUgPSB0aGlzLmNlbGwuZWRpdFZhbHVlO1xuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIElneEdyaWRDZWxsXG4gICAgICovXG4gICAgcHVibGljIGdldCBlZGl0VmFsdWUoKTogYW55IHtcbiAgICAgICAgaWYgKHRoaXMuaXNDZWxsSW5FZGl0TW9kZSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ncmlkLmNydWRTZXJ2aWNlLmNlbGwuZWRpdFZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgY3VycmVudCBlZGl0IHZhbHVlIHdoaWxlIGEgY2VsbCBpcyBpbiBlZGl0IG1vZGUuXG4gICAgICogT25seSBmb3IgY2VsbCBlZGl0aW5nIG1vZGUuXG4gICAgICogYGBgdHlwZXNjcmlwdFxuICAgICAqIHRoaXMuY2VsbC5lZGl0VmFsdWUgPSB2YWx1ZTtcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBJZ3hHcmlkQ2VsbFxuICAgICAqL1xuICAgIHB1YmxpYyBzZXQgZWRpdFZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNDZWxsSW5FZGl0TW9kZSgpKSB7XG4gICAgICAgICAgICB0aGlzLmdyaWQuY3J1ZFNlcnZpY2UuY2VsbC5lZGl0VmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgd2hldGhlciB0aGUgY2VsbCBpcyBlZGl0YWJsZS4uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgSWd4R3JpZENlbGxcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGVkaXRhYmxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jb2x1bW4uZWRpdGFibGUgJiYgIXRoaXMucm93Py5kaXNhYmxlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB3aWR0aCBvZiB0aGUgY2VsbC5cbiAgICAgKiBgYGB0eXBlc2NyaXB0XG4gICAgICogbGV0IGNlbGxXaWR0aCA9IHRoaXMuY2VsbC53aWR0aDtcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBJZ3hHcmlkQ2VsbFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgd2lkdGgoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sdW1uLndpZHRoO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGNlbGwgdmFsdWUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgSWd4R3JpZENlbGxcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgICAgIC8vIHdpbGwgcmV0dXJuIHVuZGVmaW5lZCBmb3IgYSBjb2x1bW4gbGF5b3V0LCBiZWNhdXNlIGdldENlbGxCeUNvbHVtblZpc2libGVJbmRleCBtYXkgcmV0dXJuIHRoZSBjb2x1bW4gbGF5b3V0IGF0IHRoYXQgaW5kZXguXG4gICAgICAgIC8vIGdldENlbGxCeUNvbHVtblZpc2libGVJbmRleCBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gZnV0dXJlIHZlcnNpb25cbiAgICAgICAgcmV0dXJuIHRoaXMuY29sdW1uLmZpZWxkID9cbiAgICAgICAgICAgIHRoaXMuY29sdW1uLmhhc05lc3RlZFBhdGggPyByZXNvbHZlTmVzdGVkUGF0aCh0aGlzLnJvdz8uZGF0YSwgdGhpcy5jb2x1bW4uZmllbGQpIDogdGhpcy5yb3c/LmRhdGFbdGhpcy5jb2x1bW4uZmllbGRdXG4gICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSBjZWxsIHZhbHVlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIElneEdyaWRDZWxsXG4gICAgICovXG4gICAgcHVibGljIHNldCB2YWx1ZSh2YWw6IGFueSkge1xuICAgICAgICB0aGlzLnVwZGF0ZSh2YWwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGNlbGwgaWQuXG4gICAgICogQSBjZWxsIGluIHRoZSBncmlkIGlzIGlkZW50aWZpZWQgYnk6XG4gICAgICogLSByb3dJRCAtIHByaW1hcnlLZXkgZGF0YSB2YWx1ZSBvciB0aGUgd2hvbGUgcm93RGF0YSwgaWYgdGhlIHByaW1hcnlLZXkgaXMgb21pdHRlZC5cbiAgICAgKiAtIHJvd0luZGV4IC0gdGhlIHJvdyBpbmRleFxuICAgICAqIC0gY29sdW1uSUQgLSBjb2x1bW4gaW5kZXhcbiAgICAgKlxuICAgICAqIGBgYHR5cGVzY3JpcHRcbiAgICAgKiBsZXQgY2VsbElEID0gY2VsbC5pZDtcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBJZ3hHcmlkQ2VsbFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgaWQoKTogYW55IHtcbiAgICAgICAgY29uc3QgcHJpbWFyeUtleSA9IHRoaXMuZ3JpZC5wcmltYXJ5S2V5O1xuICAgICAgICBjb25zdCByb3dJRCA9IHByaW1hcnlLZXkgPyB0aGlzLnJvdz8uZGF0YVtwcmltYXJ5S2V5XSA6IHRoaXMucm93Py5kYXRhO1xuICAgICAgICByZXR1cm4geyByb3dJRCwgY29sdW1uSUQ6IHRoaXMuY29sdW1uLmluZGV4LCByb3dJbmRleDogdGhpcy5fcm93SW5kZXggfHwgdGhpcy5yb3c/LmluZGV4IH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBpZiB0aGUgcm93IGlzIGN1cnJlbnRseSBpbiBlZGl0IG1vZGUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgSWd4R3JpZENlbGxcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGVkaXRNb2RlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0NlbGxJbkVkaXRNb2RlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RhcnRzL2VuZHMgZWRpdCBtb2RlIGZvciB0aGUgY2VsbC5cbiAgICAgKlxuICAgICAqIGBgYHR5cGVzY3JpcHRcbiAgICAgKiBjZWxsLmVkaXRNb2RlICA9ICFjZWxsLmVkaXRNb2RlO1xuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIElneEdyaWRDZWxsXG4gICAgICovXG4gICAgcHVibGljIHNldCBlZGl0TW9kZSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICBjb25zdCBpc0luRWRpdE1vZGUgPSB0aGlzLmlzQ2VsbEluRWRpdE1vZGUoKTtcbiAgICAgICAgaWYgKCF0aGlzLnJvdyB8fCB0aGlzLnJvdz8uZGVsZXRlZCB8fCBpc0luRWRpdE1vZGUgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZWRpdGFibGUgJiYgdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuZW5kRWRpdCgpO1xuICAgICAgICAgICAgLy8gVE9ETyBwb3NzaWJseSBkZWZpbmUgc2ltaWxhciBtZXRob2QgaW4gZ3JpZEFQSSwgd2hpY2ggZG9lcyBub3QgZW1pdCBldmVudFxuICAgICAgICAgICAgdGhpcy5ncmlkLmNydWRTZXJ2aWNlLmVudGVyRWRpdE1vZGUodGhpcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmdyaWQuY3J1ZFNlcnZpY2UuZW5kQ2VsbEVkaXQoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdyaWQubm90aWZ5Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgd2hldGhlciB0aGUgY2VsbCBpcyBzZWxlY3RlZC5cbiAgICAgKiBgYGB0eXBlc2NyaXB0XG4gICAgICogbGV0IGlzU2VsZWN0ZWQgPSB0aGlzLmNlbGwuc2VsZWN0ZWQ7XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBJZ3hHcmlkQ2VsbFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgc2VsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmdyaWQuc2VsZWN0aW9uU2VydmljZS5zZWxlY3RlZCh0aGlzLnNlbGVjdGlvbk5vZGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbGVjdHMvZGVzZWxlY3RzIHRoZSBjZWxsLlxuICAgICAqIGBgYHR5cGVzY3JpcHRcbiAgICAgKiB0aGlzLmNlbGwuc2VsZWN0ZWQgPSB0cnVlLlxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgSWd4R3JpZENlbGxcbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0IHNlbGVjdGVkKHZhbDogYm9vbGVhbikge1xuICAgICAgICBjb25zdCBub2RlID0gdGhpcy5zZWxlY3Rpb25Ob2RlO1xuICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICB0aGlzLmdyaWQuc2VsZWN0aW9uU2VydmljZS5hZGQobm9kZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmdyaWQuc2VsZWN0aW9uU2VydmljZS5yZW1vdmUobm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ncmlkLm5vdGlmeUNoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGFjdGl2ZSgpIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuZ3JpZC5uYXZpZ2F0aW9uLmFjdGl2ZU5vZGU7XG4gICAgICAgIHJldHVybiBub2RlID8gbm9kZS5yb3cgPT09IHRoaXMucm93Py5pbmRleCAmJiBub2RlLmNvbHVtbiA9PT0gdGhpcy5jb2x1bW4udmlzaWJsZUluZGV4IDogZmFsc2U7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSBjZWxsIHZhbHVlLlxuICAgICAqXG4gICAgICogYGBgdHlwZXNjcmlwdFxuICAgICAqIGNlbGwudXBkYXRlKG5ld1ZhbHVlKTtcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBJZ3hHcmlkQ2VsbFxuICAgICAqL1xuICAgIHB1YmxpYyB1cGRhdGUodmFsOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucm93Py5kZWxldGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVuZEVkaXQoKTtcblxuICAgICAgICBjb25zdCBjZWxsID0gdGhpcy5pc0NlbGxJbkVkaXRNb2RlKCkgPyB0aGlzLmdyaWQuY3J1ZFNlcnZpY2UuY2VsbCA6IHRoaXMuZ3JpZC5jcnVkU2VydmljZS5jcmVhdGVDZWxsKHRoaXMpO1xuICAgICAgICBjZWxsLmVkaXRWYWx1ZSA9IHZhbDtcbiAgICAgICAgdGhpcy5ncmlkLmdyaWRBUEkudXBkYXRlX2NlbGwoY2VsbCk7XG4gICAgICAgIHRoaXMuZ3JpZC5jcnVkU2VydmljZS5lbmRDZWxsRWRpdCgpO1xuICAgICAgICB0aGlzLmdyaWQubm90aWZ5Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgc2VsZWN0aW9uTm9kZSgpOiBJU2VsZWN0aW9uTm9kZSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByb3c6IHRoaXMucm93Py5pbmRleCxcbiAgICAgICAgICAgIGNvbHVtbjogdGhpcy5jb2x1bW4uY29sdW1uTGF5b3V0Q2hpbGQgPyB0aGlzLmNvbHVtbi5wYXJlbnQudmlzaWJsZUluZGV4IDogdGhpcy5jb2x1bW4udmlzaWJsZUluZGV4LFxuICAgICAgICAgICAgbGF5b3V0OiB0aGlzLmNvbHVtbi5jb2x1bW5MYXlvdXRDaGlsZCA/IHtcbiAgICAgICAgICAgICAgICByb3dTdGFydDogdGhpcy5jb2x1bW4ucm93U3RhcnQsXG4gICAgICAgICAgICAgICAgY29sU3RhcnQ6IHRoaXMuY29sdW1uLmNvbFN0YXJ0LFxuICAgICAgICAgICAgICAgIHJvd0VuZDogdGhpcy5jb2x1bW4ucm93RW5kLFxuICAgICAgICAgICAgICAgIGNvbEVuZDogdGhpcy5jb2x1bW4uY29sRW5kLFxuICAgICAgICAgICAgICAgIGNvbHVtblZpc2libGVJbmRleDogdGhpcy5jb2x1bW4udmlzaWJsZUluZGV4XG4gICAgICAgICAgICB9IDogbnVsbFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNDZWxsSW5FZGl0TW9kZSgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuZ3JpZC5jcnVkU2VydmljZS5jZWxsSW5FZGl0TW9kZSkge1xuICAgICAgICAgICAgY29uc3QgY2VsbEluRWRpdE1vZGUgPSB0aGlzLmdyaWQuY3J1ZFNlcnZpY2UuY2VsbC5pZDtcbiAgICAgICAgICAgIGNvbnN0IGlzQ3VycmVudENlbGwgPSBjZWxsSW5FZGl0TW9kZS5yb3dJRCA9PT0gdGhpcy5pZC5yb3dJRCAmJlxuICAgICAgICAgICAgICAgIGNlbGxJbkVkaXRNb2RlLnJvd0luZGV4ID09PSB0aGlzLmlkLnJvd0luZGV4ICYmXG4gICAgICAgICAgICAgICAgY2VsbEluRWRpdE1vZGUuY29sdW1uSUQgPT09IHRoaXMuaWQuY29sdW1uSUQ7XG4gICAgICAgICAgICByZXR1cm4gaXNDdXJyZW50Q2VsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBlbmRFZGl0KCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuaXNDZWxsSW5FZGl0TW9kZSgpKSB7XG4gICAgICAgICAgICB0aGlzLmdyaWQuZ3JpZEFQSS51cGRhdGVfY2VsbCh0aGlzLmdyaWQuY3J1ZFNlcnZpY2UuY2VsbCk7XG4gICAgICAgICAgICB0aGlzLmdyaWQuY3J1ZFNlcnZpY2UuZW5kQ2VsbEVkaXQoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==
import { IgxGridSelectionService } from '../selection/selection.service';
import * as i0 from "@angular/core";
export declare class IgxTreeGridSelectionService extends IgxGridSelectionService {
    private rowsToBeSelected;
    private rowsToBeIndeterminate;
    /** Select specified rows. No event is emitted. */
    selectRowsWithNoEvent(rowIDs: any[], clearPrevSelection?: any): void;
    /** Deselect specified rows. No event is emitted. */
    deselectRowsWithNoEvent(rowIDs: any[]): void;
    emitRowSelectionEvent(newSelection: any, added: any, removed: any, event?: any): boolean;
    updateCascadeSelectionOnFilterAndCRUD(parents: Set<any>, crudRowID?: any, visibleRowIDs?: Set<any>): void;
    private cascadeSelectRowsWithNoEvent;
    private cascadeDeselectRowsWithNoEvent;
    get selectionService(): IgxGridSelectionService;
    private emitCascadeRowSelectionEvent;
    /**
     * retrieve the rows which should be added/removed to/from the old selection
     */
    private handleAddedAndRemovedArgs;
    /**
     * adds to rowsToBeProcessed set all visible children of the rows which was initially within the rowsToBeProcessed set
     *
     * @param rowsToBeProcessed set of the rows (without their parents/children) to be selected/deselected
     * @param visibleRowIDs list of all visible rowIds
     * @returns a new set with all direct parents of the rows within rowsToBeProcessed set
     */
    private collectRowsChildrenAndDirectParents;
    /**
     * populates the rowsToBeSelected and rowsToBeIndeterminate sets
     * with the rows which will be eventually in selected/indeterminate state
     */
    private calculateRowsNewSelectionState;
    /**
     * recursively handle the selection state of the direct and indirect parents
     */
    private handleParentSelectionState;
    /**
     * Handle the selection state of a given row based the selection states of its direct children
     */
    private handleRowSelectionState;
    private get_all_children;
    private selectDeselectRow;
    static ɵfac: i0.ɵɵFactoryDeclaration<IgxTreeGridSelectionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IgxTreeGridSelectionService>;
}

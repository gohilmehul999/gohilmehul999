import { GridType, RowType } from '../common/grid.interface';
import { IgxGridNavigationService } from '../grid-navigation.service';
import * as i0 from "@angular/core";
export declare class IgxHierarchicalGridNavigationService extends IgxGridNavigationService {
    grid: GridType;
    protected _pendingNavigation: boolean;
    dispatchEvent(event: KeyboardEvent): void;
    navigateInBody(rowIndex: any, visibleColIndex: any, cb?: (arg: any) => void): void;
    shouldPerformVerticalScroll(index: any, visibleColumnIndex?: number, isNext?: any): boolean;
    focusTbody(event: any): void;
    protected nextSiblingIndex(isNext: any): number;
    /**
     * Handles scrolling in child grid and ensures target child row is in main grid view port.
     *
     * @param rowIndex The row index which should be in view.
     * @param isNext  Optional. Whether we are navigating to next. Used to determine scroll direction.
     * @param cb  Optional.Callback function called when operation is complete.
     */
    protected _handleScrollInChild(rowIndex: number, isNext?: boolean, cb?: () => void): void;
    /**
     *
     * @param rowIndex Row index that should come in view.
     * @param isNext  Whether we are navigating to next. Used to determine scroll direction.
     * @param cb  Optional.Callback function called when operation is complete.
     */
    protected positionInParent(rowIndex: any, isNext: any, cb?: () => void): void;
    /**
     * Moves navigation to child grid.
     *
     * @param parentRowIndex The parent row index, at which the child grid is rendered.
     * @param childLayoutIndex Optional. The index of the child row island to which the child grid belongs to. Uses first if not set.
     */
    protected _moveToChild(parentRowIndex: number, visibleColIndex: number, isNext: boolean, childLayoutIndex?: number, cb?: (arg: any) => void): void;
    /**
     * Moves navigation back to parent grid.
     *
     * @param rowIndex
     */
    protected _moveToParent(isNext: boolean, columnIndex: any, cb?: any): void;
    /**
     * Gets information on the row position relative to the root grid view port.
     * Returns whether the row is in view and its offset.
     *
     * @param rowObj
     * @param isNext
     */
    protected getPositionInfo(row: RowType, isNext: boolean): {
        inView: boolean;
        offset: number;
    };
    /**
     * Gets closest element by its tag name.
     *
     * @param sourceElem The element from which to start the search.
     * @param targetTag The target element tag name, for which to search.
     */
    protected getClosestElemByTag(sourceElem: any, targetTag: any): any;
    private clearActivation;
    private hasNextTarget;
    /**
     * Gets the max top view in the current grid hierarchy.
     *
     * @param grid
     */
    private _getMaxTop;
    /**
     * Gets the min bottom view in the current grid hierarchy.
     *
     * @param grid
     */
    private _getMinBottom;
    /**
     * Finds the next grid that allows scrolling down.
     *
     * @param grid The grid from which to begin the search.
     */
    private getNextScrollableDown;
    /**
     * Finds the next grid that allows scrolling up.
     *
     * @param grid The grid from which to begin the search.
     */
    private getNextScrollableUp;
    static ɵfac: i0.ɵɵFactoryDeclaration<IgxHierarchicalGridNavigationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IgxHierarchicalGridNavigationService>;
}

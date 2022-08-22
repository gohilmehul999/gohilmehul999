import { OnDestroy } from '@angular/core';
import { FilteringExpressionsTree, IFilteringExpressionsTree } from '../../data-operations/filtering-expressions-tree';
import { IFilteringExpression, FilteringLogic } from '../../data-operations/filtering-expression.interface';
import { Subject } from 'rxjs';
import { IFilteringOperation } from '../../data-operations/filtering-condition';
import { OverlaySettings } from '../../services/overlay/utilities';
import { IgxOverlayService } from '../../services/overlay/overlay';
import { IgxIconService } from '../../icon/icon.service';
import { ExpressionUI } from './excel-style/common';
import { ColumnType, GridType } from '../common/grid.interface';
import * as i0 from "@angular/core";
/**
 * @hidden
 */
export declare class IgxFilteringService implements OnDestroy {
    private iconService;
    protected _overlayService: IgxOverlayService;
    isFilterRowVisible: boolean;
    filteredColumn: ColumnType;
    selectedExpression: IFilteringExpression;
    columnToMoreIconHidden: Map<string, boolean>;
    activeFilterCell: number;
    grid: GridType;
    private columnsWithComplexFilter;
    private areEventsSubscribed;
    protected destroy$: Subject<boolean>;
    private isFiltering;
    private columnToExpressionsMap;
    private columnStartIndex;
    protected _filterMenuOverlaySettings: OverlaySettings;
    protected lastActiveNode: any;
    constructor(iconService: IgxIconService, _overlayService: IgxOverlayService);
    ngOnDestroy(): void;
    toggleFilterDropdown(element: HTMLElement, column: ColumnType): void;
    /**
     * Subscribe to grid's events.
     */
    subscribeToEvents(): void;
    /**
     * Close filtering row if a column is hidden.
     */
    hideFilteringRowOnColumnVisibilityChange(col: ColumnType): void;
    /**
     * Internal method to create expressionsTree and filter grid used in both filter modes.
     */
    filterInternal(field: string, expressions?: FilteringExpressionsTree | Array<ExpressionUI>): void;
    /**
     * Execute filtering on the grid.
     */
    filter(field: string, value: any, conditionOrExpressionTree?: IFilteringOperation | IFilteringExpressionsTree, ignoreCase?: boolean): void;
    filter_global(term: any, condition: any, ignoreCase: any): void;
    /**
     * Clears the filter of a given column if name is provided. Otherwise clears the filters of all columns.
     */
    clearFilter(field: string): void;
    clear_filter(fieldName: string): void;
    /**
     * Filters all the `IgxColumnComponent` in the `IgxGridComponent` with the same condition.
     */
    filterGlobal(value: any, condition: any, ignoreCase?: any): void;
    /**
     * Register filtering SVG icons in the icon service.
     */
    registerSVGIcons(): void;
    /**
     * Returns the ExpressionUI array for a given column.
     */
    getExpressions(columnId: string): ExpressionUI[];
    /**
     * Recreates all ExpressionUIs for all columns. Executed after filtering to refresh the cache.
     */
    refreshExpressions(): void;
    /**
     * Remove an ExpressionUI for a given column.
     */
    removeExpression(columnId: string, indexToRemove: number): void;
    /**
     * Generate filtering tree for a given column from existing ExpressionUIs.
     */
    createSimpleFilteringTree(columnId: string, expressionUIList?: any): FilteringExpressionsTree;
    /**
     * Returns whether a complex filter is applied to a given column.
     */
    isFilterComplex(columnId: string): boolean;
    /**
     * Returns the string representation of the FilteringLogic operator.
     */
    getOperatorAsString(operator: FilteringLogic): any;
    /**
     * Generate the label of a chip from a given filtering expression.
     */
    getChipLabel(expression: IFilteringExpression): any;
    /**
     * Updates the content of a filterCell.
     */
    updateFilteringCell(column: ColumnType): void;
    generateExpressionsList(expressions: IFilteringExpressionsTree | IFilteringExpression, operator: FilteringLogic, expressionsUIs: ExpressionUI[]): void;
    isFilteringExpressionsTreeEmpty(expressionTree: IFilteringExpressionsTree): boolean;
    protected filter_internal(fieldName: string, term: any, conditionOrExpressionsTree: IFilteringOperation | IFilteringExpressionsTree, ignoreCase: boolean): void;
    /** Modifies the filteringState object to contain the newly added filtering conditions/expressions.
     * If createNewTree is true, filteringState will not be modified (because it directly affects the grid.filteringExpressionsTree),
     * but a new object is created and returned.
     */
    protected prepare_filtering_expression(filteringState: IFilteringExpressionsTree, fieldName: string, searchVal: any, conditionOrExpressionsTree: IFilteringOperation | IFilteringExpressionsTree, ignoreCase: boolean, insertAtIndex?: number, createNewTree?: boolean): FilteringExpressionsTree;
    private isFilteringTreeComplex;
    private getChildAndOperatorsCount;
    static ɵfac: i0.ɵɵFactoryDeclaration<IgxFilteringService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IgxFilteringService>;
}

import { IgxForOfDirective } from '../directives/for-of/for_of.directive';
import { GridType } from './common/grid.interface';
import { PlatformUtil } from '../core/utils';
import { GridKeydownTargetType } from './common/enums';
import { IMultiRowLayoutNode } from './common/types';
import * as i0 from "@angular/core";
export interface ColumnGroupsCache {
    level: number;
    visibleIndex: number;
}
export interface IActiveNode {
    gridID?: string;
    row: number;
    column?: number;
    level?: number;
    mchCache?: ColumnGroupsCache;
    layout?: IMultiRowLayoutNode;
}
/** @hidden */
export declare class IgxGridNavigationService {
    protected platform: PlatformUtil;
    grid: GridType;
    _activeNode: IActiveNode;
    lastActiveNode: IActiveNode;
    protected pendingNavigation: boolean;
    get activeNode(): IActiveNode;
    set activeNode(value: IActiveNode);
    constructor(platform: PlatformUtil);
    handleNavigation(event: KeyboardEvent): void;
    dispatchEvent(event: KeyboardEvent): void;
    summaryNav(event: KeyboardEvent): void;
    headerNavigation(event: KeyboardEvent): void;
    focusTbody(event: any): void;
    focusFirstCell(header?: boolean): void;
    isColumnFullyVisible(columnIndex: number): boolean;
    shouldPerformHorizontalScroll(visibleColIndex: number, rowIndex?: number): boolean;
    shouldPerformVerticalScroll(targetRowIndex: number, visibleColIndex: number): boolean;
    performVerticalScrollToCell(rowIndex: number, visibleColIndex?: number, cb?: () => void): void;
    performHorizontalScrollToCell(visibleColumnIndex: number, cb?: () => void): void;
    isDataRow(rowIndex: number, includeSummary?: boolean): boolean;
    isGroupRow(rowIndex: number): boolean;
    setActiveNode(activeNode: IActiveNode): void;
    isActiveNodeChanged(activeNode: IActiveNode): boolean;
    protected getNextPosition(rowIndex: number, colIndex: number, key: string, shift: boolean, ctrl: boolean, event: KeyboardEvent): {
        rowIndex: number;
        colIndex: number;
    };
    protected horizontalNav(event: KeyboardEvent, key: string, rowIndex: number, tag: GridKeydownTargetType): void;
    get lastColumnIndex(): number;
    get displayContainerWidth(): number;
    get displayContainerScrollLeft(): number;
    get containerTopOffset(): number;
    protected getColumnUnpinnedIndex(visibleColumnIndex: number): number;
    protected forOfDir(): IgxForOfDirective<any>;
    protected handleAlt(key: string, event: KeyboardEvent): void;
    protected handleEditing(shift: boolean, event: KeyboardEvent): void;
    protected navigateInBody(rowIndex: any, visibleColIndex: any, cb?: (arg: any) => void): void;
    protected emitKeyDown(type: GridKeydownTargetType, rowIndex: any, event: any): true;
    protected isColumnPinned(columnIndex: number, forOfDir: IgxForOfDirective<any>): boolean;
    protected findFirstDataRowIndex(): number;
    protected findLastDataRowIndex(): number;
    protected getRowElementByIndex(index: any): any;
    protected isValidPosition(rowIndex: number, colIndex: number): boolean;
    protected performHeaderKeyCombination(column: any, key: any, shift: any, ctrl: any, alt: any, event: any): void;
    private firstVisibleNode;
    private handleMCHeaderNav;
    private handleMCHExpandCollapse;
    private handleColumnSelection;
    private getNextColumnMCH;
    private get currentActiveColumn();
    private isActiveNode;
    private isToggleKey;
    private isAddKey;
    static ɵfac: i0.ɵɵFactoryDeclaration<IgxGridNavigationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IgxGridNavigationService>;
}

import { IgxGridNavigationService } from './grid-navigation.service';
import { GridKeydownTargetType } from './common/enums';
import { GridType } from './common/grid.interface';
import * as i0 from "@angular/core";
/** @hidden */
export declare class IgxGridMRLNavigationService extends IgxGridNavigationService {
    grid: GridType;
    isValidPosition(rowIndex: number, colIndex: number): boolean;
    shouldPerformVerticalScroll(targetRowIndex: number, visibleColIndex: number): boolean;
    isColumnFullyVisible(visibleColIndex: number): boolean;
    getVerticalScrollPositions(rowIndex: number, visibleIndex: number): {
        topOffset: number;
        rowTop: any;
        rowBottom: any;
    };
    performHorizontalScrollToCell(visibleColumnIndex: number, cb?: () => void): void;
    performVerticalScrollToCell(rowIndex: number, visibleColIndex: number, cb?: () => void): void;
    getNextHorizontalCellPosition(previous?: boolean): {
        row: number;
        column: number;
    };
    getNextVerticalPosition(previous?: boolean): {
        row: number;
        column: any;
    };
    headerNavigation(event: KeyboardEvent): void;
    /**
     * @hidden
     * @internal
     */
    layout(visibleIndex: any): {
        colStart: number;
        rowStart: number;
        colEnd: number;
        rowEnd: number;
        columnVisibleIndex: number;
    };
    protected getNextPosition(rowIndex: number, colIndex: number, key: string, shift: boolean, ctrl: boolean, event: KeyboardEvent): {
        rowIndex: number;
        colIndex: number;
    };
    protected horizontalNav(event: KeyboardEvent, key: string, rowIndex: number, tag: GridKeydownTargetType): void;
    private isParentColumnFullyVisible;
    private getChildColumnScrollPositions;
    private getNextRowIndex;
    private getPreviousRowIndex;
    private get lastIndexPerRow();
    private get firstIndexPerRow();
    private get lastLayoutIndex();
    private get scrollTop();
    private lastColIndexPerMRLBlock;
    private lastRowStartPerBlock;
    private rowEnd;
    private parentByChildIndex;
    private hasNextHorizontalPosition;
    private hasNextVerticalPosition;
    static ɵfac: i0.ɵɵFactoryDeclaration<IgxGridMRLNavigationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IgxGridMRLNavigationService>;
}

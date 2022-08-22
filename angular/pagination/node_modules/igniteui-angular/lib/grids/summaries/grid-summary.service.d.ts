import { GridType } from '../common/grid.interface';
import * as i0 from "@angular/core";
/** @hidden */
export declare class IgxGridSummaryService {
    grid: GridType;
    rootSummaryID: string;
    summaryHeight: number;
    maxSummariesLenght: number;
    groupingExpressions: any[];
    retriggerRootPipe: number;
    deleteOperation: boolean;
    protected summaryCacheMap: Map<string, Map<string, any[]>>;
    recalculateSummaries(): void;
    clearSummaryCache(args?: any): void;
    removeSummaries(rowID: any, columnName?: any): void;
    removeSummariesCachePerColumn(columnName: any): void;
    calcMaxSummaryHeight(): number;
    calculateSummaries(rowID: any, data: any): Map<string, any[]>;
    resetSummaryHeight(): void;
    updateSummaryCache(groupingArgs: any): void;
    get hasSummarizedColumns(): boolean;
    private deleteSummaryCache;
    private getSummaryID;
    private removeAllTreeGridSummaries;
    private compareGroupingExpressions;
    private get isTreeGrid();
    private get isHierarchicalGrid();
    static ɵfac: i0.ɵɵFactoryDeclaration<IgxGridSummaryService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IgxGridSummaryService>;
}

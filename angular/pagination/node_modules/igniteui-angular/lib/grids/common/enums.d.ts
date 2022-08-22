export declare const FilterMode: {
    quickFilter: "quickFilter";
    excelStyleFilter: "excelStyleFilter";
};
export declare type FilterMode = (typeof FilterMode)[keyof typeof FilterMode];
export declare const GridSummaryPosition: {
    top: "top";
    bottom: "bottom";
};
export declare type GridSummaryPosition = (typeof GridSummaryPosition)[keyof typeof GridSummaryPosition];
export declare const GridSummaryCalculationMode: {
    rootLevelOnly: "rootLevelOnly";
    childLevelsOnly: "childLevelsOnly";
    rootAndChildLevels: "rootAndChildLevels";
};
export declare type GridSummaryCalculationMode = (typeof GridSummaryCalculationMode)[keyof typeof GridSummaryCalculationMode];
export declare type GridKeydownTargetType = 'dataCell' | 'summaryCell' | 'groupRow' | 'hierarchicalRow' | 'headerCell' | 'masterDetailRow';
export declare const GridSelectionMode: {
    none: "none";
    single: "single";
    multiple: "multiple";
    multipleCascade: "multipleCascade";
};
export declare type GridSelectionMode = (typeof GridSelectionMode)[keyof typeof GridSelectionMode];
export declare const ColumnDisplayOrder: {
    Alphabetical: "Alphabetical";
    DisplayOrder: "DisplayOrder";
};
export declare type ColumnDisplayOrder = (typeof ColumnDisplayOrder)[keyof typeof ColumnDisplayOrder];
export declare enum ColumnPinningPosition {
    Start = 0,
    End = 1
}
export declare enum RowPinningPosition {
    Top = 0,
    Bottom = 1
}
export declare enum GridPagingMode {
    Local = 0,
    Remote = 1
}
export declare enum GridInstanceType {
    Grid = 0,
    TreeGrid = 1
}

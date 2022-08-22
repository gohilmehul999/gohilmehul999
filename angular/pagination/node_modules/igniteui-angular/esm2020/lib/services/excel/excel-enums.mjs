/**
 * @hidden
 */
export var ExcelFolderTypes;
(function (ExcelFolderTypes) {
    ExcelFolderTypes[ExcelFolderTypes["RootExcelFolder"] = 0] = "RootExcelFolder";
    ExcelFolderTypes[ExcelFolderTypes["RootRelsExcelFolder"] = 1] = "RootRelsExcelFolder";
    ExcelFolderTypes[ExcelFolderTypes["DocPropsExcelFolder"] = 2] = "DocPropsExcelFolder";
    ExcelFolderTypes[ExcelFolderTypes["XLExcelFolder"] = 3] = "XLExcelFolder";
    ExcelFolderTypes[ExcelFolderTypes["XLRelsExcelFolder"] = 4] = "XLRelsExcelFolder";
    ExcelFolderTypes[ExcelFolderTypes["ThemeExcelFolder"] = 5] = "ThemeExcelFolder";
    ExcelFolderTypes[ExcelFolderTypes["WorksheetsExcelFolder"] = 6] = "WorksheetsExcelFolder";
    ExcelFolderTypes[ExcelFolderTypes["WorksheetsRelsExcelFolder"] = 7] = "WorksheetsRelsExcelFolder";
    ExcelFolderTypes[ExcelFolderTypes["TablesExcelFolder"] = 8] = "TablesExcelFolder";
})(ExcelFolderTypes || (ExcelFolderTypes = {}));
/**
 * @hidden
 */
export var ExcelFileTypes;
(function (ExcelFileTypes) {
    ExcelFileTypes[ExcelFileTypes["RootRelsFile"] = 0] = "RootRelsFile";
    ExcelFileTypes[ExcelFileTypes["AppFile"] = 1] = "AppFile";
    ExcelFileTypes[ExcelFileTypes["CoreFile"] = 2] = "CoreFile";
    ExcelFileTypes[ExcelFileTypes["WorkbookRelsFile"] = 3] = "WorkbookRelsFile";
    ExcelFileTypes[ExcelFileTypes["ThemeFile"] = 4] = "ThemeFile";
    ExcelFileTypes[ExcelFileTypes["WorksheetFile"] = 5] = "WorksheetFile";
    ExcelFileTypes[ExcelFileTypes["StyleFile"] = 6] = "StyleFile";
    ExcelFileTypes[ExcelFileTypes["WorkbookFile"] = 7] = "WorkbookFile";
    ExcelFileTypes[ExcelFileTypes["ContentTypesFile"] = 8] = "ContentTypesFile";
    ExcelFileTypes[ExcelFileTypes["SharedStringsFile"] = 9] = "SharedStringsFile";
    ExcelFileTypes[ExcelFileTypes["WorksheetRelsFile"] = 10] = "WorksheetRelsFile";
    ExcelFileTypes[ExcelFileTypes["TablesFile"] = 11] = "TablesFile";
})(ExcelFileTypes || (ExcelFileTypes = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhjZWwtZW51bXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9pZ25pdGV1aS1hbmd1bGFyL3NyYy9saWIvc2VydmljZXMvZXhjZWwvZXhjZWwtZW51bXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7QUFDSCxNQUFNLENBQU4sSUFBWSxnQkFVWDtBQVZELFdBQVksZ0JBQWdCO0lBQ3hCLDZFQUFlLENBQUE7SUFDZixxRkFBbUIsQ0FBQTtJQUNuQixxRkFBbUIsQ0FBQTtJQUNuQix5RUFBYSxDQUFBO0lBQ2IsaUZBQWlCLENBQUE7SUFDakIsK0VBQWdCLENBQUE7SUFDaEIseUZBQXFCLENBQUE7SUFDckIsaUdBQXlCLENBQUE7SUFDekIsaUZBQWlCLENBQUE7QUFDckIsQ0FBQyxFQVZXLGdCQUFnQixLQUFoQixnQkFBZ0IsUUFVM0I7QUFDRDs7R0FFRztBQUNILE1BQU0sQ0FBTixJQUFZLGNBYVg7QUFiRCxXQUFZLGNBQWM7SUFDdEIsbUVBQVksQ0FBQTtJQUNaLHlEQUFPLENBQUE7SUFDUCwyREFBUSxDQUFBO0lBQ1IsMkVBQWdCLENBQUE7SUFDaEIsNkRBQVMsQ0FBQTtJQUNULHFFQUFhLENBQUE7SUFDYiw2REFBUyxDQUFBO0lBQ1QsbUVBQVksQ0FBQTtJQUNaLDJFQUFnQixDQUFBO0lBQ2hCLDZFQUFpQixDQUFBO0lBQ2pCLDhFQUFpQixDQUFBO0lBQ2pCLGdFQUFVLENBQUE7QUFDZCxDQUFDLEVBYlcsY0FBYyxLQUFkLGNBQWMsUUFhekIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBoaWRkZW5cbiAqL1xuZXhwb3J0IGVudW0gRXhjZWxGb2xkZXJUeXBlcyB7XG4gICAgUm9vdEV4Y2VsRm9sZGVyLFxuICAgIFJvb3RSZWxzRXhjZWxGb2xkZXIsXG4gICAgRG9jUHJvcHNFeGNlbEZvbGRlcixcbiAgICBYTEV4Y2VsRm9sZGVyLFxuICAgIFhMUmVsc0V4Y2VsRm9sZGVyLFxuICAgIFRoZW1lRXhjZWxGb2xkZXIsXG4gICAgV29ya3NoZWV0c0V4Y2VsRm9sZGVyLFxuICAgIFdvcmtzaGVldHNSZWxzRXhjZWxGb2xkZXIsXG4gICAgVGFibGVzRXhjZWxGb2xkZXJcbn1cbi8qKlxuICogQGhpZGRlblxuICovXG5leHBvcnQgZW51bSBFeGNlbEZpbGVUeXBlcyB7XG4gICAgUm9vdFJlbHNGaWxlLFxuICAgIEFwcEZpbGUsXG4gICAgQ29yZUZpbGUsXG4gICAgV29ya2Jvb2tSZWxzRmlsZSxcbiAgICBUaGVtZUZpbGUsXG4gICAgV29ya3NoZWV0RmlsZSxcbiAgICBTdHlsZUZpbGUsXG4gICAgV29ya2Jvb2tGaWxlLFxuICAgIENvbnRlbnRUeXBlc0ZpbGUsXG4gICAgU2hhcmVkU3RyaW5nc0ZpbGUsXG4gICAgV29ya3NoZWV0UmVsc0ZpbGUsXG4gICAgVGFibGVzRmlsZVxufVxuIl19
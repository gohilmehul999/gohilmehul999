export declare abstract class IgxExporterOptionsBase {
    protected _fileExtension: string;
    /**
     * Specifies whether hidden columns should be exported.
     * ```typescript
     * let ignoreColumnsVisibility = this.exportOptions.ignoreColumnsVisibility;
     * this.exportOptions.ignoreColumnsVisibility = true;
     * ```
     *
     * @memberof IgxExporterOptionsBase
     */
    ignoreColumnsVisibility: boolean;
    /**
     * Specifies whether filtered out rows should be exported.
     * ```typescript
     * let ignoreFiltering = this.exportOptions.ignoreFiltering;
     * this.exportOptions.ignoreFiltering = true;
     * ```
     *
     * @memberof IgxExporterOptionsBase
     */
    ignoreFiltering: boolean;
    /**
     * Specifies if the exporter should ignore the current column order in the IgxGrid.
     * ```typescript
     * let ignoreColumnsOrder = this.exportOptions.ignoreColumnsOrder;
     * this.exportOptions.ignoreColumnsOrder = true;
     * ```
     *
     * @memberof IgxExporterOptionsBase
     */
    ignoreColumnsOrder: boolean;
    /**
     * Specifies whether the exported data should be sorted as in the provided IgxGrid.
     * When you export grouped data, setting ignoreSorting to true will cause
     * the grouping to fail because it relies on the sorting of the records.
     * ```typescript
     * let ignoreSorting = this.exportOptions.ignoreSorting;
     * this.exportOptions.ignoreSorting = true;
     * ```
     *
     * @memberof IgxExporterOptionsBase
     */
    ignoreSorting: boolean;
    /**
     * Specifies whether the exported data should be grouped as in the provided IgxGrid.
     * ```typescript
     * let ignoreGrouping = this.exportOptions.ignoreGrouping;
     * this.exportOptions.ignoreGrouping = true;
     * ```
     *
     * @memberof IgxExporterOptionsBase
     */
    ignoreGrouping: boolean;
    /**
     * Specifies whether the exported data should include multi column headers as in the provided IgxGrid.
     * ```typescript
     * let ignoreMultiColumnHeaders = this.exportOptions.ignoreMultiColumnHeaders;
     * this.exportOptions.ignoreMultiColumnHeaders = true;
     * ```
     *
     * @memberof IgxExporterOptionsBase
     */
    ignoreMultiColumnHeaders: boolean;
    /**
     * Specifies whether the exported data should have frozen headers.
     * ```typescript
     * let freezeHeaders = this.exportOptions.freezeHeaders;
     * this.exportOptions.freezeHeaders = true;
     * ```
     *
     * @memberof IgxExporterOptionsBase
     */
    freezeHeaders: boolean;
    /**
     * Specifies whether the headers should be exported if there is no data.
     * ```typescript
     * let alwaysExportHeaders = this.exportOptions.alwaysExportHeaders;
     * this.exportOptions.alwaysExportHeaders = false;
     * ```
     *
     * @memberof IgxExporterOptionsBase
     */
    alwaysExportHeaders: boolean;
    private _fileName;
    constructor(fileName: string, _fileExtension: string);
    private setFileName;
    /**
     * Gets the file name which will be used for the exporting operation.
     * ```typescript
     * let fileName = this.exportOptions.fileName;
     * ```
     *
     * @memberof IgxExporterOptionsBase
     */
    get fileName(): string;
    /**
     * Sets the file name which will be used for the exporting operation.
     * ```typescript
     * this.exportOptions.fileName = 'exportedData01';
     * ```
     *
     * @memberof IgxExporterOptionsBase
     */
    set fileName(value: string);
}

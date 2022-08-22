import { IgxExporterOptionsBase } from '../exporter-common/exporter-options-base';
/**
 * Objects of this class are used to configure the Excel exporting process.
 */
export declare class IgxExcelExporterOptions extends IgxExporterOptionsBase {
    /**
     * Specifies if column pinning should be ignored. If ignoreColumnsOrder is set to true,
     * this option will always be considered as set to true.
     * ```typescript
     * let ignorePinning = this.exportOptions.ignorePinning;
     * this.exportOptions.ignorePinning = true;
     * ```
     *
     * @memberof IgxExcelExporterOptions
     */
    ignorePinning: boolean;
    /**
     * Specifies whether the exported data should be formatted as Excel table. (True by default)
     * ```typescript
     * let exportAsTable = this.exportOptions.exportAsTable;
     * this.exportOptions.exportAsTable = false;
     * ```
     *
     * @memberof IgxExcelExporterOptions
     */
    exportAsTable: boolean;
    private _columnWidth;
    private _rowHeight;
    private _worksheetName;
    constructor(fileName: string);
    /**
     * Gets the width of the columns in the exported excel file.
     * ```typescript
     * let width = this.exportOptions.columnWidth;
     * ```
     *
     * @memberof IgxExcelExporterOptions
     */
    get columnWidth(): number;
    /**
     * Sets the width of the columns in the exported excel file. If left unspecified,
     * the width of the column or the default width of the excel columns will be used.
     * ```typescript
     * this.exportOptions.columnWidth = 55;
     * ```
     *
     * @memberof IgxExcelExporterOptions
     */
    set columnWidth(value: number);
    /**
     * Gets the height of the rows in the exported excel file.
     * ```typescript
     * let height = this.exportOptions.rowHeight;
     * ```
     *
     * @memberof IgxExcelExporterOptions
     */
    get rowHeight(): number;
    /**
     * Sets the height of the rows in the exported excel file. If left unspecified or 0,
     * the default height of the excel rows will be used.
     * ```typescript
     * this.exportOptions.rowHeight = 25;
     * ```
     *
     * @memberof IgxExcelExporterOptions
     */
    set rowHeight(value: number);
    /**
     * Gets the name of the worksheet in the exported excel file.
     * ```typescript
     * let worksheetName = this.exportOptions.worksheetName;
     * ```
     *
     * @memberof IgxExcelExporterOptions
     */
    get worksheetName(): string;
    /**
     * Sets the name of the worksheet in the exported excel file.
     * ```typescript
     * this.exportOptions.worksheetName = "Worksheet";
     * ```
     *
     * @memberof IgxExcelExporterOptions
     */
    set worksheetName(value: string);
}

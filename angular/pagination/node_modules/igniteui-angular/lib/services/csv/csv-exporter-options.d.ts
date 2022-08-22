import { IgxExporterOptionsBase } from '../exporter-common/exporter-options-base';
/**
 * Objects of this class are used to configure the CSV exporting process.
 */
export declare class IgxCsvExporterOptions extends IgxExporterOptionsBase {
    private _valueDelimiter;
    private _fileType;
    constructor(fileName: string, fileType: CsvFileTypes);
    private static getExtensionFromFileType;
    /**
     * Gets the value delimiter which will be used for the exporting operation.
     * ```typescript
     * let delimiter = this.exportOptions.valueDelimiter;
     * ```
     *
     * @memberof IgxCsvExporterOptions
     */
    get valueDelimiter(): any;
    /**
     * Sets a value delimiter which will overwrite the default delimiter of the selected export format.
     * ```typescript
     * this.exportOptions.valueDelimiter = '|';
     * ```
     *
     * @memberof IgxCsvExporterOptions
     */
    set valueDelimiter(value: any);
    /**
     * Gets the CSV export format.
     * ```typescript
     * let filetype = this.exportOptions.fileType;
     * ```
     *
     * @memberof IgxCsvExporterOptions
     */
    get fileType(): any;
    /**
     * Sets the CSV export format.
     * ```typescript
     * this.exportOptions.fileType = CsvFileTypes.TAB;
     * ```
     *
     * @memberof IgxCsvExporterOptions
     */
    set fileType(value: any);
    private setFileType;
    private setDelimiter;
}
/**
 * This enumeration is used to configure the default value separator
 * as well as the default file extension used when performing CSV exporting.
 */
export declare enum CsvFileTypes {
    /**
     * Character Separated Values, default separator is "comma", default file extension is .csv
     */
    CSV = 0,
    /**
     * Tab Separated Values, default separator is tab, default file extension is .tsv
     */
    TSV = 1,
    /**
     * Tab Separated Values, default separator is tab, default file extension is .tab
     */
    TAB = 2
}

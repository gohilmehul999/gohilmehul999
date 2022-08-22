import { EventEmitter } from '@angular/core';
import { IExportRecord, IgxBaseExporter } from '../exporter-common/base-export-service';
import { IgxCsvExporterOptions } from './csv-exporter-options';
import { IBaseEventArgs } from '../../core/utils';
import * as i0 from "@angular/core";
export interface ICsvExportEndedEventArgs extends IBaseEventArgs {
    csvData?: string;
}
/**
 * **Ignite UI for Angular CSV Exporter Service** -
 * [Documentation](https://www.infragistics.com/products/ignite-ui-angular/angular/components/exporter-csv)
 *
 * The Ignite UI for Angular CSV Exporter service can export data in a Character Separated Values format from
 * both raw data (array) or from an `IgxGrid`.
 *
 * Example:
 * ```typescript
 * public localData = [
 *   { Name: "Eric Ridley", Age: "26" },
 *   { Name: "Alanis Brook", Age: "22" },
 *   { Name: "Jonathan Morris", Age: "23" }
 * ];
 *
 * constructor(private csvExportService: IgxCsvExporterService) {
 * }
 *
 * const opt: IgxCsvExporterOptions = new IgxCsvExporterOptions("FileName", CsvFileTypes.CSV);
 * this.csvExportService.exportData(this.localData, opt);
 * ```
 */
export declare class IgxCsvExporterService extends IgxBaseExporter {
    /**
     * This event is emitted when the export process finishes.
     * ```typescript
     * this.exporterService.exportEnded.subscribe((args: ICsvExportEndedEventArgs) => {
     * // put event handler code here
     * });
     * ```
     *
     * @memberof IgxCsvExporterService
     */
    exportEnded: EventEmitter<ICsvExportEndedEventArgs>;
    private _stringData;
    protected exportDataImplementation(data: IExportRecord[], options: IgxCsvExporterOptions, done: () => void): void;
    private saveFile;
    private exportFile;
    static ɵfac: i0.ɵɵFactoryDeclaration<IgxCsvExporterService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IgxCsvExporterService>;
}

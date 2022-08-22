import * as JSZip from 'jszip';
import { EventEmitter } from '@angular/core';
import { IgxExcelExporterOptions } from './excel-exporter-options';
import { IExportRecord, IgxBaseExporter } from '../exporter-common/base-export-service';
import { IBaseEventArgs } from '../../core/utils';
import * as i0 from "@angular/core";
export interface IExcelExportEndedEventArgs extends IBaseEventArgs {
    xlsx?: JSZip;
}
/**
 * **Ignite UI for Angular Excel Exporter Service** -
 * [Documentation](https://www.infragistics.com/products/ignite-ui-angular/angular/components/exporter_excel.html)
 *
 * The Ignite UI for Angular Excel Exporter service can export data in Microsoft® Excel® format from both raw data
 * (array) or from an `IgxGrid`.
 *
 * Example:
 * ```typescript
 * public localData = [
 *   { Name: "Eric Ridley", Age: "26" },
 *   { Name: "Alanis Brook", Age: "22" },
 *   { Name: "Jonathan Morris", Age: "23" }
 * ];
 *
 * constructor(private excelExportService: IgxExcelExporterService) {
 * }
 *
 * this.excelExportService.exportData(this.localData, new IgxExcelExporterOptions("FileName"));
 * ```
 */
export declare class IgxExcelExporterService extends IgxBaseExporter {
    private static ZIP_OPTIONS;
    /**
     * This event is emitted when the export process finishes.
     * ```typescript
     * this.exporterService.exportEnded.subscribe((args: IExcelExportEndedEventArgs) => {
     * // put event handler code here
     * });
     * ```
     *
     * @memberof IgxExcelExporterService
     */
    exportEnded: EventEmitter<IExcelExportEndedEventArgs>;
    private _xlsx;
    private static populateFolderAsync;
    protected exportDataImplementation(data: IExportRecord[], options: IgxExcelExporterOptions, done: () => void): void;
    private saveFile;
    static ɵfac: i0.ɵɵFactoryDeclaration<IgxExcelExporterService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IgxExcelExporterService>;
}

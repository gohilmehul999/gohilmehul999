import { IColumnList, IExportRecord } from '../exporter-common/base-export-service';
import { IgxExcelExporterOptions } from './excel-exporter-options';
import { WorksheetDataDictionary } from './worksheet-data-dictionary';
/** @hidden */
export declare class WorksheetData {
    private _data;
    options: IgxExcelExporterOptions;
    sort: any;
    columnCount: number;
    rootKeys: string[];
    indexOfLastPinnedColumn: number;
    columnWidths: number[];
    owner: IColumnList;
    owners: Map<any, IColumnList>;
    private _rowCount;
    private _dataDictionary;
    private _isSpecialData;
    private _hasMultiColumnHeader;
    private _isHierarchical;
    constructor(_data: IExportRecord[], options: IgxExcelExporterOptions, sort: any, columnCount: number, rootKeys: string[], indexOfLastPinnedColumn: number, columnWidths: number[], owner: IColumnList, owners: Map<any, IColumnList>);
    get data(): IExportRecord[];
    get rowCount(): number;
    get isEmpty(): boolean;
    get isSpecialData(): boolean;
    get dataDictionary(): WorksheetDataDictionary;
    get hasMultiColumnHeader(): boolean;
    get isHierarchical(): boolean;
    private initializeData;
}

import { IExcelFile } from './excel-interfaces';
import { WorksheetData } from './worksheet-data';
import * as JSZip from 'jszip';
/**
 * @hidden
 */
export declare class RootRelsFile implements IExcelFile {
    writeElement(folder: JSZip): void;
}
/**
 * @hidden
 */
export declare class AppFile implements IExcelFile {
    writeElement(folder: JSZip, worksheetData: WorksheetData): void;
}
/**
 * @hidden
 */
export declare class CoreFile implements IExcelFile {
    writeElement(folder: JSZip): void;
}
/**
 * @hidden
 */
export declare class WorkbookRelsFile implements IExcelFile {
    writeElement(folder: JSZip, worksheetData: WorksheetData): void;
}
/**
 * @hidden
 */
export declare class ThemeFile implements IExcelFile {
    writeElement(folder: JSZip): void;
}
/**
 * @hidden
 */
export declare class WorksheetFile implements IExcelFile {
    private static MIN_WIDTH;
    private maxOutlineLevel;
    private dimension;
    private freezePane;
    private rowHeight;
    private mergeCellStr;
    private mergeCellsCounter;
    private rowIndex;
    writeElement(): void;
    writeElementAsync(folder: JSZip, worksheetData: WorksheetData): Promise<void>;
    private prepareDataAsync;
    private processDataRecordsAsync;
    private hGridPrintMultiColHeaders;
    private processRow;
    private getCellData;
}
/**
 * @hidden
 */
export declare class StyleFile implements IExcelFile {
    writeElement(folder: JSZip): void;
}
/**
 * @hidden
 */
export declare class WorkbookFile implements IExcelFile {
    writeElement(folder: JSZip, worksheetData: WorksheetData): void;
}
/**
 * @hidden
 */
export declare class ContentTypesFile implements IExcelFile {
    writeElement(folder: JSZip, worksheetData: WorksheetData): void;
}
/**
 * @hidden
 */
export declare class SharedStringsFile implements IExcelFile {
    writeElement(folder: JSZip, worksheetData: WorksheetData): void;
}
/**
 * @hidden
 */
export declare class TablesFile implements IExcelFile {
    writeElement(folder: JSZip, worksheetData: WorksheetData): void;
}
/**
 * @hidden
 */
export declare class WorksheetRelsFile implements IExcelFile {
    writeElement(folder: JSZip): void;
}

import { ExcelFileTypes, ExcelFolderTypes } from './excel-enums';
import { IExcelFolder } from './excel-interfaces';
import { WorksheetData } from './worksheet-data';
/** @hidden */
export declare class RootExcelFolder implements IExcelFolder {
    get folderName(): string;
    childFiles(): ExcelFileTypes[];
    childFolders(): ExcelFolderTypes[];
}
/** @hidden */
export declare class RootRelsExcelFolder implements IExcelFolder {
    get folderName(): string;
    childFiles(): ExcelFileTypes[];
    childFolders(): any[];
}
/** @hidden */
export declare class DocPropsExcelFolder implements IExcelFolder {
    get folderName(): string;
    childFiles(): ExcelFileTypes[];
    childFolders(): any[];
}
/** @hidden */
export declare class XLExcelFolder implements IExcelFolder {
    get folderName(): string;
    childFiles(data: WorksheetData): ExcelFileTypes[];
    childFolders(data: WorksheetData): ExcelFolderTypes[];
}
/** @hidden */
export declare class XLRelsExcelFolder implements IExcelFolder {
    get folderName(): string;
    childFiles(): ExcelFileTypes[];
    childFolders(): any[];
}
/** @hidden */
export declare class ThemeExcelFolder implements IExcelFolder {
    get folderName(): string;
    childFiles(): ExcelFileTypes[];
    childFolders(): any[];
}
/** @hidden */
export declare class WorksheetsExcelFolder implements IExcelFolder {
    get folderName(): string;
    childFiles(): ExcelFileTypes[];
    childFolders(data: WorksheetData): ExcelFolderTypes[];
}
/** @hidden */
export declare class TablesExcelFolder implements IExcelFolder {
    get folderName(): string;
    childFiles(): ExcelFileTypes[];
    childFolders(): any[];
}
/** @hidden */
export declare class WorksheetsRelsExcelFolder implements IExcelFolder {
    get folderName(): string;
    childFiles(): ExcelFileTypes[];
    childFolders(): any[];
}

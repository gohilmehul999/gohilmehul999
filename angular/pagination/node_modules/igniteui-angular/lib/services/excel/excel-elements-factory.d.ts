import { ExcelFileTypes, ExcelFolderTypes } from './excel-enums';
import { IExcelFile, IExcelFolder } from './excel-interfaces';
/** @hidden */
export declare class ExcelElementsFactory {
    static getExcelFolder(type: ExcelFolderTypes): IExcelFolder;
    static getExcelFile(type: ExcelFileTypes): IExcelFile;
}

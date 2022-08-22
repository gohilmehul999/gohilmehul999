import { IColumnInfo } from '../exporter-common/base-export-service';
/**
 * @hidden
 */
export declare class CharSeparatedValueData {
    private _data;
    private columns;
    private _headerRecord;
    private _dataRecords;
    private _eor;
    private _delimiter;
    private _escapeCharacters;
    private _delimiterLength;
    private _isSpecialData;
    constructor(_data: any[], valueDelimiter: string, columns?: IColumnInfo[]);
    prepareData(key?: any[]): string;
    prepareDataAsync(done: (result: string) => void): void;
    private processField;
    private processHeaderRecord;
    private processRecord;
    private processDataRecords;
    private processDataRecordsAsync;
    private setDelimiter;
}

/** @hidden */
export declare class WorksheetDataDictionary {
    private static DEFAULT_FONT;
    private static TEXT_PADDING;
    hasNumberValues: boolean;
    hasDateValues: boolean;
    stringsCount: number;
    private _dictionary;
    private _widthsDictionary;
    private _keys;
    private _keysAreValid;
    private _counter;
    private _columnWidths;
    private _context;
    constructor(columnCount: number, columnWidth: number, columnWidthsList: number[]);
    get columnWidths(): number[];
    saveValue(value: any, isHeader: boolean): number;
    getValue(value: string): number;
    getSanitizedValue(sanitizedValue: string): number;
    getKeys(): string[];
    private getTextWidth;
    private getContext;
    private sanitizeValue;
    private dirtyKeyCollections;
}

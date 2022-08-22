import { ExcelStrings } from './excel-strings';
import { yieldingLoop } from '../../core/utils';
import { HeaderType, ExportRecordType } from '../exporter-common/base-export-service';
/**
 * @hidden
 */
export class RootRelsFile {
    writeElement(folder) {
        folder.file('.rels', ExcelStrings.getRels());
    }
}
/**
 * @hidden
 */
export class AppFile {
    writeElement(folder, worksheetData) {
        folder.file('app.xml', ExcelStrings.getApp(worksheetData.options.worksheetName));
    }
}
/**
 * @hidden
 */
export class CoreFile {
    writeElement(folder) {
        folder.file('core.xml', ExcelStrings.getCore());
    }
}
/**
 * @hidden
 */
export class WorkbookRelsFile {
    writeElement(folder, worksheetData) {
        const hasSharedStrings = !worksheetData.isEmpty || worksheetData.options.alwaysExportHeaders;
        folder.file('workbook.xml.rels', ExcelStrings.getWorkbookRels(hasSharedStrings));
    }
}
/**
 * @hidden
 */
export class ThemeFile {
    writeElement(folder) {
        folder.file('theme1.xml', ExcelStrings.getTheme());
    }
}
/**
 * @hidden
 */
export class WorksheetFile {
    constructor() {
        this.maxOutlineLevel = 0;
        this.dimension = '';
        this.freezePane = '';
        this.rowHeight = '';
        this.mergeCellStr = '';
        this.mergeCellsCounter = 0;
        this.rowIndex = 0;
    }
    writeElement() { }
    async writeElementAsync(folder, worksheetData) {
        return new Promise(resolve => {
            this.prepareDataAsync(worksheetData, (cols, rows) => {
                const hasTable = (!worksheetData.isEmpty || worksheetData.options.alwaysExportHeaders)
                    && worksheetData.options.exportAsTable;
                folder.file('sheet1.xml', ExcelStrings.getSheetXML(this.dimension, this.freezePane, cols, rows, hasTable, this.maxOutlineLevel, worksheetData.isHierarchical));
                resolve();
            });
        });
    }
    prepareDataAsync(worksheetData, done) {
        let sheetData = '';
        let cols = '';
        const dictionary = worksheetData.dataDictionary;
        this.rowIndex = 0;
        if (worksheetData.isEmpty && (!worksheetData.options.alwaysExportHeaders || worksheetData.owner.columns.length === 0)) {
            sheetData += '<sheetData/>';
            this.dimension = 'A1';
            done('', sheetData);
        }
        else {
            const owner = worksheetData.owner;
            const isHierarchicalGrid = worksheetData.isHierarchical;
            const hasMultiColumnHeader = worksheetData.hasMultiColumnHeader;
            const hasUserSetIndex = owner.columns.some(col => col.exportIndex !== undefined);
            const height = worksheetData.options.rowHeight;
            const rowStyle = isHierarchicalGrid ? ' s="3"' : '';
            this.rowHeight = height ? ` ht="${height}" customHeight="1"` : '';
            sheetData += `<sheetData>`;
            for (let i = 0; i <= owner.maxLevel; i++) {
                this.rowIndex++;
                sheetData += `<row r="${this.rowIndex}"${this.rowHeight}>`;
                const headersForLevel = hasMultiColumnHeader ?
                    owner.columns
                        .filter(c => (c.level < i &&
                        c.headerType !== HeaderType.MultiColumnHeader || c.level === i) && c.columnSpan > 0 && !c.skip)
                        .sort((a, b) => a.startIndex - b.startIndex)
                        .sort((a, b) => a.pinnedIndex - b.pinnedIndex) :
                    hasUserSetIndex ?
                        owner.columns.filter(c => !c.skip) :
                        owner.columns.filter(c => !c.skip)
                            .sort((a, b) => a.startIndex - b.startIndex)
                            .sort((a, b) => a.pinnedIndex - b.pinnedIndex);
                let startValue = 0;
                for (const currentCol of headersForLevel) {
                    if (currentCol.level === i) {
                        let columnCoordinate;
                        columnCoordinate = ExcelStrings.getExcelColumn(startValue) + this.rowIndex;
                        const columnValue = dictionary.saveValue(currentCol.header, true);
                        sheetData += `<c r="${columnCoordinate}"${rowStyle} t="s"><v>${columnValue}</v></c>`;
                        if (i !== owner.maxLevel) {
                            this.mergeCellsCounter++;
                            this.mergeCellStr += ` <mergeCell ref="${columnCoordinate}:`;
                            if (currentCol.headerType === HeaderType.ColumnHeader) {
                                columnCoordinate = ExcelStrings.getExcelColumn(startValue) + (owner.maxLevel + 1);
                            }
                            else {
                                for (let k = 1; k < currentCol.columnSpan; k++) {
                                    columnCoordinate = ExcelStrings.getExcelColumn(startValue + k) + this.rowIndex;
                                    sheetData += `<c r="${columnCoordinate}"${rowStyle} />`;
                                }
                            }
                            this.mergeCellStr += `${columnCoordinate}" />`;
                        }
                    }
                    startValue += currentCol.columnSpan;
                }
                sheetData += `</row>`;
            }
            const multiColumnHeaderLevel = worksheetData.options.ignoreMultiColumnHeaders ? 0 : owner.maxLevel;
            const freezeHeaders = worksheetData.options.freezeHeaders ? 2 + multiColumnHeaderLevel : 1;
            if (!isHierarchicalGrid) {
                this.dimension =
                    'A1:' + ExcelStrings.getExcelColumn(worksheetData.columnCount - 1) + (worksheetData.rowCount + owner.maxLevel);
                cols += '<cols>';
                if (!hasMultiColumnHeader) {
                    for (let j = 0; j < worksheetData.columnCount; j++) {
                        const width = dictionary.columnWidths[j];
                        // Use the width provided in the options if it exists
                        let widthInTwips = worksheetData.options.columnWidth !== undefined ?
                            worksheetData.options.columnWidth :
                            Math.max(((width / 96) * 14.4), WorksheetFile.MIN_WIDTH);
                        if (!(widthInTwips > 0)) {
                            widthInTwips = WorksheetFile.MIN_WIDTH;
                        }
                        cols += `<col min="${(j + 1)}" max="${(j + 1)}" width="${widthInTwips}" customWidth="1"/>`;
                    }
                }
                else {
                    cols += `<col min="1" max="${worksheetData.columnCount}" width="15" customWidth="1"/>`;
                }
                cols += '</cols>';
                const indexOfLastPinnedColumn = worksheetData.indexOfLastPinnedColumn;
                const frozenColumnCount = indexOfLastPinnedColumn + 1;
                let firstCell = ExcelStrings.getExcelColumn(frozenColumnCount) + freezeHeaders;
                if (indexOfLastPinnedColumn !== undefined && indexOfLastPinnedColumn !== -1 &&
                    !worksheetData.options.ignorePinning &&
                    !worksheetData.options.ignoreColumnsOrder) {
                    this.freezePane =
                        `<pane xSplit="${frozenColumnCount}" ySplit="${freezeHeaders - 1}"
                         topLeftCell="${firstCell}" activePane="topRight" state="frozen"/>`;
                }
                else if (worksheetData.options.freezeHeaders) {
                    firstCell = ExcelStrings.getExcelColumn(0) + freezeHeaders;
                    this.freezePane =
                        `<pane xSplit="0" ySplit="${freezeHeaders - 1}"
                         topLeftCell="${firstCell}" activePane="topRight" state="frozen"/>`;
                }
            }
            else {
                const columnWidth = worksheetData.options.columnWidth ? worksheetData.options.columnWidth : 20;
                cols += `<cols><col min="1" max="${worksheetData.columnCount}" width="${columnWidth}" customWidth="1"/></cols>`;
                if (worksheetData.options.freezeHeaders) {
                    const firstCell = ExcelStrings.getExcelColumn(0) + freezeHeaders;
                    this.freezePane =
                        `<pane xSplit="0" ySplit="${freezeHeaders - 1}"
                         topLeftCell="${firstCell}" activePane="topRight" state="frozen"/>`;
                }
            }
            this.processDataRecordsAsync(worksheetData, (rows) => {
                sheetData += rows;
                sheetData += '</sheetData>';
                if (hasMultiColumnHeader && this.mergeCellsCounter > 0) {
                    sheetData += `<mergeCells count="${this.mergeCellsCounter}">${this.mergeCellStr}</mergeCells>`;
                }
                done(cols, sheetData);
            });
        }
    }
    processDataRecordsAsync(worksheetData, done) {
        const rowDataArr = [];
        const height = worksheetData.options.rowHeight;
        this.rowHeight = height ? ' ht="' + height + '" customHeight="1"' : '';
        const isHierarchicalGrid = worksheetData.isHierarchical;
        const hasUserSetIndex = worksheetData.owner.columns.some(c => c.exportIndex !== undefined);
        let recordHeaders = [];
        yieldingLoop(worksheetData.rowCount - 1, 1000, (i) => {
            if (!worksheetData.isEmpty) {
                if (!isHierarchicalGrid) {
                    if (hasUserSetIndex) {
                        recordHeaders = worksheetData.rootKeys;
                    }
                    else {
                        recordHeaders = worksheetData.owner.columns
                            .filter(c => c.headerType !== HeaderType.MultiColumnHeader && !c.skip)
                            .sort((a, b) => a.startIndex - b.startIndex)
                            .sort((a, b) => a.pinnedIndex - b.pinnedIndex)
                            .map(c => c.field);
                    }
                }
                else {
                    const record = worksheetData.data[i];
                    if (record.type === ExportRecordType.HeaderRecord) {
                        const recordOwner = worksheetData.owners.get(record.owner);
                        const hasMultiColumnHeaders = recordOwner.columns.some(c => !c.skip && c.headerType === HeaderType.MultiColumnHeader);
                        if (hasMultiColumnHeaders) {
                            this.hGridPrintMultiColHeaders(worksheetData, rowDataArr, record, recordOwner);
                        }
                    }
                    recordHeaders = Object.keys(worksheetData.data[i].data);
                }
                rowDataArr.push(this.processRow(worksheetData, i, recordHeaders, isHierarchicalGrid));
            }
        }, () => {
            done(rowDataArr.join(''));
        });
    }
    hGridPrintMultiColHeaders(worksheetData, rowDataArr, record, owner) {
        for (let j = 0; j < owner.maxLevel; j++) {
            const recordLevel = record.level;
            const outlineLevel = recordLevel > 0 ? ` outlineLevel="${recordLevel}"` : '';
            this.maxOutlineLevel = this.maxOutlineLevel < recordLevel ? recordLevel : this.maxOutlineLevel;
            const sHidden = record.hidden ? ` hidden="1"` : '';
            this.rowIndex++;
            let row = `<row r="${this.rowIndex}"${this.rowHeight}${outlineLevel}${sHidden}>`;
            const headersForLevel = owner.columns
                .filter(c => (c.level < j &&
                c.headerType !== HeaderType.MultiColumnHeader || c.level === j) && c.columnSpan > 0 && !c.skip)
                .sort((a, b) => a.startIndex - b.startIndex)
                .sort((a, b) => a.pinnedIndex - b.pinnedIndex);
            let startValue = 0 + record.level;
            for (const currentCol of headersForLevel) {
                if (currentCol.level === j) {
                    let columnCoordinate;
                    columnCoordinate =
                        ExcelStrings.getExcelColumn(startValue) + this.rowIndex;
                    const columnValue = worksheetData.dataDictionary.saveValue(currentCol.header, true);
                    row += `<c r="${columnCoordinate}" s="3" t="s"><v>${columnValue}</v></c>`;
                    if (j !== owner.maxLevel) {
                        this.mergeCellsCounter++;
                        this.mergeCellStr += ` <mergeCell ref="${columnCoordinate}:`;
                        if (currentCol.headerType === HeaderType.ColumnHeader) {
                            columnCoordinate = ExcelStrings.getExcelColumn(startValue) +
                                (this.rowIndex + owner.maxLevel - currentCol.level);
                        }
                        else {
                            for (let k = 1; k < currentCol.columnSpan; k++) {
                                columnCoordinate = ExcelStrings.getExcelColumn(startValue + k) + this.rowIndex;
                                row += `<c r="${columnCoordinate}" s="3" />`;
                            }
                        }
                        this.mergeCellStr += `${columnCoordinate}" />`;
                    }
                }
                startValue += currentCol.columnSpan;
            }
            row += `</row>`;
            rowDataArr.push(row);
        }
    }
    processRow(worksheetData, i, headersForLevel, isHierarchicalGrid) {
        const record = worksheetData.data[i];
        const rowData = new Array(worksheetData.columnCount + 2);
        const rowLevel = record.level;
        const outlineLevel = rowLevel > 0 ? ` outlineLevel="${rowLevel}"` : '';
        this.maxOutlineLevel = this.maxOutlineLevel < rowLevel ? rowLevel : this.maxOutlineLevel;
        const sHidden = record.hidden ? ` hidden="1"` : '';
        this.rowIndex++;
        rowData[0] =
            `<row r="${this.rowIndex}"${this.rowHeight}${outlineLevel}${sHidden}>`;
        const keys = worksheetData.isSpecialData ? [record.data] : headersForLevel;
        for (let j = 0; j < keys.length; j++) {
            const col = j + (isHierarchicalGrid ? rowLevel : 0);
            const cellData = this.getCellData(worksheetData, i, col, keys[j]);
            rowData[j + 1] = cellData;
        }
        rowData[keys.length + 1] = '</row>';
        return rowData.join('');
    }
    getCellData(worksheetData, row, column, key) {
        const dictionary = worksheetData.dataDictionary;
        const columnName = ExcelStrings.getExcelColumn(column) + (this.rowIndex);
        const fullRow = worksheetData.data[row];
        const isHeaderRecord = fullRow.type === ExportRecordType.HeaderRecord;
        const cellValue = worksheetData.isSpecialData ?
            fullRow.data :
            fullRow.data[key];
        if (cellValue === undefined || cellValue === null) {
            return `<c r="${columnName}" s="1"/>`;
        }
        else {
            const savedValue = dictionary.saveValue(cellValue, isHeaderRecord);
            const isSavedAsString = savedValue !== -1;
            const isSavedAsDate = !isSavedAsString && cellValue instanceof Date;
            let value = isSavedAsString ? savedValue : cellValue;
            if (isSavedAsDate) {
                const timeZoneOffset = value.getTimezoneOffset() * 60000;
                const isoString = (new Date(value - timeZoneOffset)).toISOString();
                value = isoString.substring(0, isoString.indexOf('.'));
            }
            const type = isSavedAsString ? ` t="s"` : isSavedAsDate ? ` t="d"` : '';
            const format = isHeaderRecord ? ` s="3"` : isSavedAsString ? '' : isSavedAsDate ? ` s="2"` : ` s="1"`;
            return `<c r="${columnName}"${type}${format}><v>${value}</v></c>`;
        }
    }
}
WorksheetFile.MIN_WIDTH = 8.43;
/**
 * @hidden
 */
export class StyleFile {
    writeElement(folder) {
        folder.file('styles.xml', ExcelStrings.getStyles());
    }
}
/**
 * @hidden
 */
export class WorkbookFile {
    writeElement(folder, worksheetData) {
        folder.file('workbook.xml', ExcelStrings.getWorkbook(worksheetData.options.worksheetName));
    }
}
/**
 * @hidden
 */
export class ContentTypesFile {
    writeElement(folder, worksheetData) {
        const hasSharedStrings = !worksheetData.isEmpty || worksheetData.options.alwaysExportHeaders;
        folder.file('[Content_Types].xml', ExcelStrings.getContentTypesXML(hasSharedStrings, worksheetData.options.exportAsTable));
    }
}
/**
 * @hidden
 */
export class SharedStringsFile {
    writeElement(folder, worksheetData) {
        const dict = worksheetData.dataDictionary;
        const sortedValues = dict.getKeys();
        const sharedStrings = new Array(sortedValues.length);
        for (const value of sortedValues) {
            sharedStrings[dict.getSanitizedValue(value)] = '<si><t>' + value + '</t></si>';
        }
        folder.file('sharedStrings.xml', ExcelStrings.getSharedStringXML(dict.stringsCount, sortedValues.length, sharedStrings.join('')));
    }
}
/**
 * @hidden
 */
export class TablesFile {
    writeElement(folder, worksheetData) {
        const columnCount = worksheetData.columnCount;
        const lastColumn = ExcelStrings.getExcelColumn(columnCount - 1) + worksheetData.rowCount;
        const autoFilterDimension = 'A1:' + lastColumn;
        const tableDimension = worksheetData.isEmpty
            ? 'A1:' + ExcelStrings.getExcelColumn(columnCount - 1) + (worksheetData.rowCount + 1)
            : autoFilterDimension;
        const hasUserSetIndex = worksheetData.owner.columns.some(c => c.exportIndex !== undefined);
        const values = hasUserSetIndex
            ? worksheetData.rootKeys
            : worksheetData.owner.columns
                .filter(c => !c.skip)
                .sort((a, b) => a.startIndex - b.startIndex)
                .sort((a, b) => a.pinnedIndex - b.pinnedIndex)
                .map(c => c.header);
        let sortString = '';
        let tableColumns = '<tableColumns count="' + columnCount + '">';
        for (let i = 0; i < columnCount; i++) {
            const value = values[i];
            tableColumns += '<tableColumn id="' + (i + 1) + '" name="' + value + '"/>';
        }
        tableColumns += '</tableColumns>';
        if (worksheetData.sort) {
            const sortingExpression = worksheetData.sort;
            const sc = ExcelStrings.getExcelColumn(values.indexOf(sortingExpression.fieldName));
            const dir = sortingExpression.dir - 1;
            sortString = `<sortState ref="A2:${lastColumn}"><sortCondition descending="${dir}" ref="${sc}1:${sc}15"/></sortState>`;
        }
        folder.file('table1.xml', ExcelStrings.getTablesXML(autoFilterDimension, tableDimension, tableColumns, sortString));
    }
}
/**
 * @hidden
 */
export class WorksheetRelsFile {
    writeElement(folder) {
        folder.file('sheet1.xml.rels', ExcelStrings.getWorksheetRels());
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhjZWwtZmlsZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9pZ25pdGV1aS1hbmd1bGFyL3NyYy9saWIvc2VydmljZXMvZXhjZWwvZXhjZWwtZmlsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBSS9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUE4QixNQUFNLHdDQUF3QyxDQUFDO0FBRWxIOztHQUVHO0FBQ0gsTUFBTSxPQUFPLFlBQVk7SUFDZCxZQUFZLENBQUMsTUFBYTtRQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUNqRCxDQUFDO0NBQ0o7QUFFRDs7R0FFRztBQUNILE1BQU0sT0FBTyxPQUFPO0lBQ1QsWUFBWSxDQUFDLE1BQWEsRUFBRSxhQUE0QjtRQUMzRCxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztJQUNyRixDQUFDO0NBQ0o7QUFFRDs7R0FFRztBQUNILE1BQU0sT0FBTyxRQUFRO0lBQ1YsWUFBWSxDQUFDLE1BQWE7UUFDN0IsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDcEQsQ0FBQztDQUNKO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLE9BQU8sZ0JBQWdCO0lBQ2xCLFlBQVksQ0FBQyxNQUFhLEVBQUUsYUFBNEI7UUFDM0QsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLGFBQWEsQ0FBQyxPQUFPLElBQUksYUFBYSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQztRQUM3RixNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLFlBQVksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO0lBQ3JGLENBQUM7Q0FDSjtBQUVEOztHQUVHO0FBQ0gsTUFBTSxPQUFPLFNBQVM7SUFDWCxZQUFZLENBQUMsTUFBYTtRQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUN2RCxDQUFDO0NBQ0o7QUFFRDs7R0FFRztBQUNILE1BQU0sT0FBTyxhQUFhO0lBQTFCO1FBRVksb0JBQWUsR0FBRyxDQUFDLENBQUM7UUFDcEIsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNmLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFDaEIsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUVmLGlCQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLHNCQUFpQixHQUFHLENBQUMsQ0FBQztRQUN0QixhQUFRLEdBQUcsQ0FBQyxDQUFDO0lBNlR6QixDQUFDO0lBM1RVLFlBQVksS0FBSSxDQUFDO0lBRWpCLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxNQUFhLEVBQUUsYUFBNEI7UUFDdEUsT0FBTyxJQUFJLE9BQU8sQ0FBTyxPQUFPLENBQUMsRUFBRTtZQUMvQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFO2dCQUNoRCxNQUFNLFFBQVEsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sSUFBSSxhQUFhLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDO3VCQUMvRSxhQUFhLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQztnQkFFM0MsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDLFdBQVcsQ0FDOUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hILE9BQU8sRUFBRSxDQUFDO1lBQ2QsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTyxnQkFBZ0IsQ0FBQyxhQUE0QixFQUFFLElBQStDO1FBQ2xHLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZCxNQUFNLFVBQVUsR0FBRyxhQUFhLENBQUMsY0FBYyxDQUFDO1FBQ2hELElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBRWxCLElBQUksYUFBYSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsSUFBSSxhQUFhLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDbkgsU0FBUyxJQUFJLGNBQWMsQ0FBQztZQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ3ZCO2FBQU07WUFDSCxNQUFNLEtBQUssR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDO1lBQ2xDLE1BQU0sa0JBQWtCLEdBQUcsYUFBYSxDQUFDLGNBQWMsQ0FBQztZQUN4RCxNQUFNLG9CQUFvQixHQUFHLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQztZQUVoRSxNQUFNLGVBQWUsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEtBQUssU0FBUyxDQUFDLENBQUM7WUFFakYsTUFBTSxNQUFNLEdBQUksYUFBYSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7WUFDaEQsTUFBTSxRQUFRLEdBQUcsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ3BELElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLE1BQU0sb0JBQW9CLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUVsRSxTQUFTLElBQUksYUFBYSxDQUFDO1lBRTNCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN0QyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ2hCLFNBQVMsSUFBSSxXQUFXLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDO2dCQUUzRCxNQUFNLGVBQWUsR0FBRyxvQkFBb0IsQ0FBQyxDQUFDO29CQUMxQyxLQUFLLENBQUMsT0FBTzt5QkFDUixNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQzt3QkFDckIsQ0FBQyxDQUFDLFVBQVUsS0FBSyxVQUFVLENBQUMsaUJBQWlCLElBQUksQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7eUJBQ2xHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQzt5QkFDM0MsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztvQkFDcEQsZUFBZSxDQUFDLENBQUM7d0JBQ2IsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUNwQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQzs2QkFDN0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDOzZCQUMzQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFFM0QsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDO2dCQUVuQixLQUFLLE1BQU0sVUFBVSxJQUFJLGVBQWUsRUFBRTtvQkFDdEMsSUFBSSxVQUFVLENBQUMsS0FBSyxLQUFLLENBQUMsRUFBRTt3QkFDeEIsSUFBSSxnQkFBZ0IsQ0FBQzt3QkFDckIsZ0JBQWdCLEdBQUcsWUFBWSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO3dCQUMzRSxNQUFNLFdBQVcsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7d0JBQ2xFLFNBQVMsSUFBSSxTQUFTLGdCQUFnQixJQUFJLFFBQVEsYUFBYSxXQUFXLFVBQVUsQ0FBQzt3QkFFckYsSUFBSSxDQUFDLEtBQUssS0FBSyxDQUFDLFFBQVEsRUFBRTs0QkFDdEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7NEJBQ3pCLElBQUksQ0FBQyxZQUFZLElBQUksb0JBQW9CLGdCQUFnQixHQUFHLENBQUM7NEJBRTdELElBQUksVUFBVSxDQUFDLFVBQVUsS0FBSyxVQUFVLENBQUMsWUFBWSxFQUFFO2dDQUNuRCxnQkFBZ0IsR0FBRyxZQUFZLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQzs2QkFDckY7aUNBQU07Z0NBQ0gsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0NBQzVDLGdCQUFnQixHQUFHLFlBQVksQ0FBQyxjQUFjLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7b0NBQy9FLFNBQVMsSUFBSSxTQUFTLGdCQUFnQixJQUFJLFFBQVEsS0FBSyxDQUFDO2lDQUMzRDs2QkFDSjs0QkFFRCxJQUFJLENBQUMsWUFBWSxJQUFJLEdBQUcsZ0JBQWdCLE1BQU0sQ0FBQzt5QkFDbEQ7cUJBQ0o7b0JBRUQsVUFBVSxJQUFJLFVBQVUsQ0FBQyxVQUFVLENBQUM7aUJBQ3ZDO2dCQUVELFNBQVMsSUFBSSxRQUFRLENBQUM7YUFDekI7WUFFRCxNQUFNLHNCQUFzQixHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztZQUNuRyxNQUFNLGFBQWEsR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFM0YsSUFBSSxDQUFDLGtCQUFrQixFQUFFO2dCQUNyQixJQUFJLENBQUMsU0FBUztvQkFDVixLQUFLLEdBQUcsWUFBWSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBRW5ILElBQUksSUFBSSxRQUFRLENBQUM7Z0JBRWpCLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtvQkFDdkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLEVBQUU7d0JBQ2hELE1BQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3pDLHFEQUFxRDt3QkFDckQsSUFBSSxZQUFZLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEtBQUssU0FBUyxDQUFDLENBQUM7NEJBQzVDLGFBQWEsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7NEJBQ25DLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQ2pGLElBQUksQ0FBQyxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsRUFBRTs0QkFDckIsWUFBWSxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUM7eUJBQzFDO3dCQUVELElBQUksSUFBSSxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxZQUFZLFlBQVkscUJBQXFCLENBQUM7cUJBQzlGO2lCQUNKO3FCQUFNO29CQUNILElBQUksSUFBSSxxQkFBcUIsYUFBYSxDQUFDLFdBQVcsZ0NBQWdDLENBQUM7aUJBQzFGO2dCQUVELElBQUksSUFBSSxTQUFTLENBQUM7Z0JBRWxCLE1BQU0sdUJBQXVCLEdBQUcsYUFBYSxDQUFDLHVCQUF1QixDQUFDO2dCQUN0RSxNQUFNLGlCQUFpQixHQUFHLHVCQUF1QixHQUFHLENBQUMsQ0FBQztnQkFDdEQsSUFBSSxTQUFTLEdBQUcsWUFBWSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLGFBQWEsQ0FBQztnQkFDL0UsSUFBSSx1QkFBdUIsS0FBSyxTQUFTLElBQUksdUJBQXVCLEtBQUssQ0FBQyxDQUFDO29CQUN2RSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsYUFBYTtvQkFDcEMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLGtCQUFrQixFQUFFO29CQUMzQyxJQUFJLENBQUMsVUFBVTt3QkFDWCxpQkFBaUIsaUJBQWlCLGFBQWEsYUFBYSxHQUFHLENBQUM7d0NBQ2hELFNBQVMsMENBQTBDLENBQUM7aUJBQzNFO3FCQUFNLElBQUksYUFBYSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUU7b0JBQzVDLFNBQVMsR0FBRyxZQUFZLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxHQUFHLGFBQWEsQ0FBQztvQkFDM0QsSUFBSSxDQUFDLFVBQVU7d0JBQ1gsNEJBQTRCLGFBQWEsR0FBRyxDQUFDO3dDQUM3QixTQUFTLDBDQUEwQyxDQUFDO2lCQUMzRTthQUNKO2lCQUFNO2dCQUNILE1BQU0sV0FBVyxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUMvRixJQUFJLElBQUksMkJBQTJCLGFBQWEsQ0FBQyxXQUFXLFlBQVksV0FBVyw0QkFBNEIsQ0FBQztnQkFDaEgsSUFBSSxhQUFhLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRTtvQkFDckMsTUFBTSxTQUFTLEdBQUcsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsR0FBRyxhQUFhLENBQUM7b0JBQ2pFLElBQUksQ0FBQyxVQUFVO3dCQUNYLDRCQUE0QixhQUFhLEdBQUcsQ0FBQzt3Q0FDN0IsU0FBUywwQ0FBMEMsQ0FBQztpQkFDM0U7YUFDSjtZQUVELElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDakQsU0FBUyxJQUFJLElBQUksQ0FBQztnQkFDbEIsU0FBUyxJQUFJLGNBQWMsQ0FBQztnQkFFNUIsSUFBSSxvQkFBb0IsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxFQUFFO29CQUNwRCxTQUFTLElBQUksc0JBQXNCLElBQUksQ0FBQyxpQkFBaUIsS0FBSyxJQUFJLENBQUMsWUFBWSxlQUFlLENBQUM7aUJBQ2xHO2dCQUVELElBQUksQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDMUIsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUFFTyx1QkFBdUIsQ0FBQyxhQUE0QixFQUFFLElBQTRCO1FBQ3RGLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUN0QixNQUFNLE1BQU0sR0FBSSxhQUFhLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztRQUNoRCxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBRXZFLE1BQU0sa0JBQWtCLEdBQUcsYUFBYSxDQUFDLGNBQWMsQ0FBQztRQUN4RCxNQUFNLGVBQWUsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxLQUFLLFNBQVMsQ0FBQyxDQUFDO1FBRTNGLElBQUksYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUV2QixZQUFZLENBQUMsYUFBYSxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUN6QyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ0YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtvQkFDckIsSUFBSSxlQUFlLEVBQUU7d0JBQ2pCLGFBQWEsR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDO3FCQUMxQzt5QkFBTTt3QkFDSCxhQUFhLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxPQUFPOzZCQUN0QyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxLQUFLLFVBQVUsQ0FBQyxpQkFBaUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7NkJBQ3JFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQzs2QkFDekMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsR0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDOzZCQUMzQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQzFCO2lCQUNKO3FCQUFNO29CQUNILE1BQU0sTUFBTSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRXJDLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUU7d0JBQy9DLE1BQU0sV0FBVyxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDM0QsTUFBTSxxQkFBcUIsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsVUFBVSxLQUFLLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO3dCQUV0SCxJQUFJLHFCQUFxQixFQUFFOzRCQUN2QixJQUFJLENBQUMseUJBQXlCLENBQUMsYUFBYSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7eUJBQ2xGO3FCQUNKO29CQUVELGFBQWEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzNEO2dCQUVELFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLGFBQWEsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7YUFDekY7UUFDTCxDQUFDLEVBQ0QsR0FBRyxFQUFFO1lBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTyx5QkFBeUIsQ0FBQyxhQUE0QixFQUFFLFVBQWlCLEVBQUUsTUFBcUIsRUFDcEcsS0FBa0I7UUFDbEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDckMsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNqQyxNQUFNLFlBQVksR0FBRyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsV0FBVyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUM3RSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7WUFDL0YsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFFbkQsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hCLElBQUksR0FBRyxHQUFHLFdBQVcsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLFlBQVksR0FBRyxPQUFPLEdBQUcsQ0FBQztZQUVqRixNQUFNLGVBQWUsR0FBRyxLQUFLLENBQUMsT0FBTztpQkFDaEMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUM7Z0JBQ3JCLENBQUMsQ0FBQyxVQUFVLEtBQUssVUFBVSxDQUFDLGlCQUFpQixJQUFJLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2lCQUNsRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUM7aUJBQzNDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRW5ELElBQUksVUFBVSxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1lBRWxDLEtBQUssTUFBTSxVQUFVLElBQUksZUFBZSxFQUFFO2dCQUN0QyxJQUFJLFVBQVUsQ0FBQyxLQUFLLEtBQUssQ0FBQyxFQUFFO29CQUN4QixJQUFJLGdCQUFnQixDQUFDO29CQUNyQixnQkFBZ0I7d0JBQ1osWUFBWSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO29CQUU1RCxNQUFNLFdBQVcsR0FBRyxhQUFhLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUNwRixHQUFHLElBQUksU0FBUyxnQkFBZ0Isb0JBQW9CLFdBQVcsVUFBVSxDQUFDO29CQUUxRSxJQUFJLENBQUMsS0FBSyxLQUFLLENBQUMsUUFBUSxFQUFFO3dCQUN0QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzt3QkFDekIsSUFBSSxDQUFDLFlBQVksSUFBSSxvQkFBb0IsZ0JBQWdCLEdBQUcsQ0FBQzt3QkFFN0QsSUFBSSxVQUFVLENBQUMsVUFBVSxLQUFLLFVBQVUsQ0FBQyxZQUFZLEVBQUU7NEJBQ25ELGdCQUFnQixHQUFHLFlBQVksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDO2dDQUN0RCxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7eUJBQzNEOzZCQUFNOzRCQUNILEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFO2dDQUM1QyxnQkFBZ0IsR0FBRyxZQUFZLENBQUMsY0FBYyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO2dDQUMvRSxHQUFHLElBQUksU0FBUyxnQkFBZ0IsWUFBWSxDQUFDOzZCQUNoRDt5QkFDSjt3QkFFRCxJQUFJLENBQUMsWUFBWSxJQUFJLEdBQUcsZ0JBQWdCLE1BQU0sQ0FBQztxQkFDbEQ7aUJBQ0o7Z0JBRUQsVUFBVSxJQUFJLFVBQVUsQ0FBQyxVQUFVLENBQUM7YUFDdkM7WUFDRCxHQUFHLElBQUksUUFBUSxDQUFDO1lBQ2hCLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBRU8sVUFBVSxDQUFDLGFBQTRCLEVBQUUsQ0FBUyxFQUFFLGVBQXNCLEVBQUUsa0JBQTJCO1FBQzNHLE1BQU0sTUFBTSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFckMsTUFBTSxPQUFPLEdBQUcsSUFBSSxLQUFLLENBQUMsYUFBYSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUV6RCxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQzlCLE1BQU0sWUFBWSxHQUFHLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUV6RixNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUVuRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNOLFdBQVcsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLFlBQVksR0FBRyxPQUFPLEdBQUcsQ0FBQztRQUUzRSxNQUFNLElBQUksR0FBRyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDO1FBRTNFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2xDLE1BQU0sR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXBELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFbEUsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUM7U0FDN0I7UUFFRCxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUM7UUFFcEMsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFTyxXQUFXLENBQUMsYUFBNEIsRUFBRSxHQUFXLEVBQUUsTUFBYyxFQUFFLEdBQVc7UUFDdEYsTUFBTSxVQUFVLEdBQUcsYUFBYSxDQUFDLGNBQWMsQ0FBQztRQUNoRCxNQUFNLFVBQVUsR0FBRyxZQUFZLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pFLE1BQU0sT0FBTyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEMsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLElBQUksS0FBSyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7UUFFdEUsTUFBTSxTQUFTLEdBQUcsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzNDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNkLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFdEIsSUFBSSxTQUFTLEtBQUssU0FBUyxJQUFJLFNBQVMsS0FBSyxJQUFJLEVBQUU7WUFDL0MsT0FBTyxTQUFTLFVBQVUsV0FBVyxDQUFDO1NBQ3pDO2FBQU07WUFDSCxNQUFNLFVBQVUsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxjQUFjLENBQUMsQ0FBQztZQUNuRSxNQUFNLGVBQWUsR0FBRyxVQUFVLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFFMUMsTUFBTSxhQUFhLEdBQUcsQ0FBQyxlQUFlLElBQUksU0FBUyxZQUFZLElBQUksQ0FBQztZQUVwRSxJQUFJLEtBQUssR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBRXJELElBQUksYUFBYSxFQUFFO2dCQUNmLE1BQU0sY0FBYyxHQUFHLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLEtBQUssQ0FBQztnQkFDekQsTUFBTSxTQUFTLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDbkUsS0FBSyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUMxRDtZQUVELE1BQU0sSUFBSSxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBRXhFLE1BQU0sTUFBTSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztZQUV0RyxPQUFPLFNBQVMsVUFBVSxJQUFJLElBQUksR0FBRyxNQUFNLE9BQU8sS0FBSyxVQUFVLENBQUM7U0FDckU7SUFDTCxDQUFDOztBQXBVYyx1QkFBUyxHQUFHLElBQUksQ0FBQztBQXVVcEM7O0dBRUc7QUFDSCxNQUFNLE9BQU8sU0FBUztJQUNYLFlBQVksQ0FBQyxNQUFhO1FBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQ3hELENBQUM7Q0FDSjtBQUVEOztHQUVHO0FBQ0gsTUFBTSxPQUFPLFlBQVk7SUFDZCxZQUFZLENBQUMsTUFBYSxFQUFFLGFBQTRCO1FBQzNELE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLFlBQVksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0lBQy9GLENBQUM7Q0FDSjtBQUVEOztHQUVHO0FBQ0gsTUFBTSxPQUFPLGdCQUFnQjtJQUNsQixZQUFZLENBQUMsTUFBYSxFQUFFLGFBQTRCO1FBQzNELE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxhQUFhLENBQUMsT0FBTyxJQUFJLGFBQWEsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUM7UUFDN0YsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxZQUFZLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLEVBQUUsYUFBYSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0lBQy9ILENBQUM7Q0FDSjtBQUVEOztHQUVHO0FBQ0gsTUFBTSxPQUFPLGlCQUFpQjtJQUNuQixZQUFZLENBQUMsTUFBYSxFQUFFLGFBQTRCO1FBQzNELE1BQU0sSUFBSSxHQUFHLGFBQWEsQ0FBQyxjQUFjLENBQUM7UUFDMUMsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3BDLE1BQU0sYUFBYSxHQUFHLElBQUksS0FBSyxDQUFTLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU3RCxLQUFLLE1BQU0sS0FBSyxJQUFJLFlBQVksRUFBRTtZQUM5QixhQUFhLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsU0FBUyxHQUFHLEtBQUssR0FBRyxXQUFXLENBQUM7U0FDbEY7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLFlBQVksQ0FBQyxrQkFBa0IsQ0FDaEQsSUFBSSxDQUFDLFlBQVksRUFDakIsWUFBWSxDQUFDLE1BQU0sRUFDbkIsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUMxQixDQUFDO0lBQ2xCLENBQUM7Q0FDSjtBQUVEOztHQUVHO0FBQ0gsTUFBTSxPQUFPLFVBQVU7SUFDWixZQUFZLENBQUMsTUFBYSxFQUFFLGFBQTRCO1FBQzNELE1BQU0sV0FBVyxHQUFHLGFBQWEsQ0FBQyxXQUFXLENBQUM7UUFDOUMsTUFBTSxVQUFVLEdBQUcsWUFBWSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQztRQUN6RixNQUFNLG1CQUFtQixHQUFHLEtBQUssR0FBRyxVQUFVLENBQUM7UUFDL0MsTUFBTSxjQUFjLEdBQUcsYUFBYSxDQUFDLE9BQU87WUFDeEMsQ0FBQyxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUMsY0FBYyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1lBQ3JGLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQztRQUMxQixNQUFNLGVBQWUsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxLQUFLLFNBQVMsQ0FBQyxDQUFDO1FBQzNGLE1BQU0sTUFBTSxHQUFHLGVBQWU7WUFDMUIsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxRQUFRO1lBQ3hCLENBQUMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLE9BQU87aUJBQ3hCLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztpQkFDcEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDO2lCQUMzQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUM7aUJBQzdDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU1QixJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFFcEIsSUFBSSxZQUFZLEdBQUcsdUJBQXVCLEdBQUcsV0FBVyxHQUFHLElBQUksQ0FBQztRQUNoRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2xDLE1BQU0sS0FBSyxHQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixZQUFZLElBQUksbUJBQW1CLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsVUFBVSxHQUFHLEtBQUssR0FBRyxLQUFLLENBQUM7U0FDOUU7UUFFRCxZQUFZLElBQUksaUJBQWlCLENBQUM7UUFFbEMsSUFBSSxhQUFhLENBQUMsSUFBSSxFQUFFO1lBQ3BCLE1BQU0saUJBQWlCLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQztZQUM3QyxNQUFNLEVBQUUsR0FBRyxZQUFZLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNwRixNQUFNLEdBQUcsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ3RDLFVBQVUsR0FBRyxzQkFBc0IsVUFBVSxnQ0FBZ0MsR0FBRyxVQUFVLEVBQUUsS0FBSyxFQUFFLG1CQUFtQixDQUFDO1NBQzFIO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDeEgsQ0FBQztDQUNKO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLE9BQU8saUJBQWlCO0lBQ25CLFlBQVksQ0FBQyxNQUFhO1FBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsWUFBWSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQztJQUNwRSxDQUFDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJRXhjZWxGaWxlIH0gZnJvbSAnLi9leGNlbC1pbnRlcmZhY2VzJztcbmltcG9ydCB7IEV4Y2VsU3RyaW5ncyB9IGZyb20gJy4vZXhjZWwtc3RyaW5ncyc7XG5pbXBvcnQgeyBXb3Jrc2hlZXREYXRhIH0gZnJvbSAnLi93b3Jrc2hlZXQtZGF0YSc7XG5cbmltcG9ydCAqIGFzIEpTWmlwIGZyb20gJ2pzemlwJztcbmltcG9ydCB7IHlpZWxkaW5nTG9vcCB9IGZyb20gJy4uLy4uL2NvcmUvdXRpbHMnO1xuaW1wb3J0IHsgSGVhZGVyVHlwZSwgRXhwb3J0UmVjb3JkVHlwZSwgSUV4cG9ydFJlY29yZCwgSUNvbHVtbkxpc3QgfSBmcm9tICcuLi9leHBvcnRlci1jb21tb24vYmFzZS1leHBvcnQtc2VydmljZSc7XG5cbi8qKlxuICogQGhpZGRlblxuICovXG5leHBvcnQgY2xhc3MgUm9vdFJlbHNGaWxlIGltcGxlbWVudHMgSUV4Y2VsRmlsZSB7XG4gICAgcHVibGljIHdyaXRlRWxlbWVudChmb2xkZXI6IEpTWmlwKSB7XG4gICAgICAgIGZvbGRlci5maWxlKCcucmVscycsIEV4Y2VsU3RyaW5ncy5nZXRSZWxzKCkpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBAaGlkZGVuXG4gKi9cbmV4cG9ydCBjbGFzcyBBcHBGaWxlIGltcGxlbWVudHMgSUV4Y2VsRmlsZSB7XG4gICAgcHVibGljIHdyaXRlRWxlbWVudChmb2xkZXI6IEpTWmlwLCB3b3Jrc2hlZXREYXRhOiBXb3Jrc2hlZXREYXRhKSB7XG4gICAgICAgIGZvbGRlci5maWxlKCdhcHAueG1sJywgRXhjZWxTdHJpbmdzLmdldEFwcCh3b3Jrc2hlZXREYXRhLm9wdGlvbnMud29ya3NoZWV0TmFtZSkpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBAaGlkZGVuXG4gKi9cbmV4cG9ydCBjbGFzcyBDb3JlRmlsZSBpbXBsZW1lbnRzIElFeGNlbEZpbGUge1xuICAgIHB1YmxpYyB3cml0ZUVsZW1lbnQoZm9sZGVyOiBKU1ppcCkge1xuICAgICAgICBmb2xkZXIuZmlsZSgnY29yZS54bWwnLCBFeGNlbFN0cmluZ3MuZ2V0Q29yZSgpKTtcbiAgICB9XG59XG5cbi8qKlxuICogQGhpZGRlblxuICovXG5leHBvcnQgY2xhc3MgV29ya2Jvb2tSZWxzRmlsZSBpbXBsZW1lbnRzIElFeGNlbEZpbGUge1xuICAgIHB1YmxpYyB3cml0ZUVsZW1lbnQoZm9sZGVyOiBKU1ppcCwgd29ya3NoZWV0RGF0YTogV29ya3NoZWV0RGF0YSkge1xuICAgICAgICBjb25zdCBoYXNTaGFyZWRTdHJpbmdzID0gIXdvcmtzaGVldERhdGEuaXNFbXB0eSB8fCB3b3Jrc2hlZXREYXRhLm9wdGlvbnMuYWx3YXlzRXhwb3J0SGVhZGVycztcbiAgICAgICAgZm9sZGVyLmZpbGUoJ3dvcmtib29rLnhtbC5yZWxzJywgRXhjZWxTdHJpbmdzLmdldFdvcmtib29rUmVscyhoYXNTaGFyZWRTdHJpbmdzKSk7XG4gICAgfVxufVxuXG4vKipcbiAqIEBoaWRkZW5cbiAqL1xuZXhwb3J0IGNsYXNzIFRoZW1lRmlsZSBpbXBsZW1lbnRzIElFeGNlbEZpbGUge1xuICAgIHB1YmxpYyB3cml0ZUVsZW1lbnQoZm9sZGVyOiBKU1ppcCkge1xuICAgICAgICBmb2xkZXIuZmlsZSgndGhlbWUxLnhtbCcsIEV4Y2VsU3RyaW5ncy5nZXRUaGVtZSgpKTtcbiAgICB9XG59XG5cbi8qKlxuICogQGhpZGRlblxuICovXG5leHBvcnQgY2xhc3MgV29ya3NoZWV0RmlsZSBpbXBsZW1lbnRzIElFeGNlbEZpbGUge1xuICAgIHByaXZhdGUgc3RhdGljIE1JTl9XSURUSCA9IDguNDM7XG4gICAgcHJpdmF0ZSBtYXhPdXRsaW5lTGV2ZWwgPSAwO1xuICAgIHByaXZhdGUgZGltZW5zaW9uID0gJyc7XG4gICAgcHJpdmF0ZSBmcmVlemVQYW5lID0gJyc7XG4gICAgcHJpdmF0ZSByb3dIZWlnaHQgPSAnJztcblxuICAgIHByaXZhdGUgbWVyZ2VDZWxsU3RyID0gJyc7XG4gICAgcHJpdmF0ZSBtZXJnZUNlbGxzQ291bnRlciA9IDA7XG4gICAgcHJpdmF0ZSByb3dJbmRleCA9IDA7XG5cbiAgICBwdWJsaWMgd3JpdGVFbGVtZW50KCkge31cblxuICAgIHB1YmxpYyBhc3luYyB3cml0ZUVsZW1lbnRBc3luYyhmb2xkZXI6IEpTWmlwLCB3b3Jrc2hlZXREYXRhOiBXb3Jrc2hlZXREYXRhKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPihyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIHRoaXMucHJlcGFyZURhdGFBc3luYyh3b3Jrc2hlZXREYXRhLCAoY29scywgcm93cykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGhhc1RhYmxlID0gKCF3b3Jrc2hlZXREYXRhLmlzRW1wdHkgfHwgd29ya3NoZWV0RGF0YS5vcHRpb25zLmFsd2F5c0V4cG9ydEhlYWRlcnMpXG4gICAgICAgICAgICAgICAgICAgICYmIHdvcmtzaGVldERhdGEub3B0aW9ucy5leHBvcnRBc1RhYmxlO1xuXG4gICAgICAgICAgICAgICAgZm9sZGVyLmZpbGUoJ3NoZWV0MS54bWwnLCBFeGNlbFN0cmluZ3MuZ2V0U2hlZXRYTUwoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGltZW5zaW9uLCB0aGlzLmZyZWV6ZVBhbmUsIGNvbHMsIHJvd3MsIGhhc1RhYmxlLCB0aGlzLm1heE91dGxpbmVMZXZlbCwgd29ya3NoZWV0RGF0YS5pc0hpZXJhcmNoaWNhbCkpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByZXBhcmVEYXRhQXN5bmMod29ya3NoZWV0RGF0YTogV29ya3NoZWV0RGF0YSwgZG9uZTogKGNvbHM6IHN0cmluZywgc2hlZXREYXRhOiBzdHJpbmcpID0+IHZvaWQpIHtcbiAgICAgICAgbGV0IHNoZWV0RGF0YSA9ICcnO1xuICAgICAgICBsZXQgY29scyA9ICcnO1xuICAgICAgICBjb25zdCBkaWN0aW9uYXJ5ID0gd29ya3NoZWV0RGF0YS5kYXRhRGljdGlvbmFyeTtcbiAgICAgICAgdGhpcy5yb3dJbmRleCA9IDA7XG5cbiAgICAgICAgaWYgKHdvcmtzaGVldERhdGEuaXNFbXB0eSAmJiAoIXdvcmtzaGVldERhdGEub3B0aW9ucy5hbHdheXNFeHBvcnRIZWFkZXJzIHx8IHdvcmtzaGVldERhdGEub3duZXIuY29sdW1ucy5sZW5ndGggPT09IDApKSB7XG4gICAgICAgICAgICBzaGVldERhdGEgKz0gJzxzaGVldERhdGEvPic7XG4gICAgICAgICAgICB0aGlzLmRpbWVuc2lvbiA9ICdBMSc7XG4gICAgICAgICAgICBkb25lKCcnLCBzaGVldERhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3Qgb3duZXIgPSB3b3Jrc2hlZXREYXRhLm93bmVyO1xuICAgICAgICAgICAgY29uc3QgaXNIaWVyYXJjaGljYWxHcmlkID0gd29ya3NoZWV0RGF0YS5pc0hpZXJhcmNoaWNhbDtcbiAgICAgICAgICAgIGNvbnN0IGhhc011bHRpQ29sdW1uSGVhZGVyID0gd29ya3NoZWV0RGF0YS5oYXNNdWx0aUNvbHVtbkhlYWRlcjtcblxuICAgICAgICAgICAgY29uc3QgaGFzVXNlclNldEluZGV4ID0gb3duZXIuY29sdW1ucy5zb21lKGNvbCA9PiBjb2wuZXhwb3J0SW5kZXggIT09IHVuZGVmaW5lZCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9ICB3b3Jrc2hlZXREYXRhLm9wdGlvbnMucm93SGVpZ2h0O1xuICAgICAgICAgICAgY29uc3Qgcm93U3R5bGUgPSBpc0hpZXJhcmNoaWNhbEdyaWQgPyAnIHM9XCIzXCInIDogJyc7XG4gICAgICAgICAgICB0aGlzLnJvd0hlaWdodCA9IGhlaWdodCA/IGAgaHQ9XCIke2hlaWdodH1cIiBjdXN0b21IZWlnaHQ9XCIxXCJgIDogJyc7XG5cbiAgICAgICAgICAgIHNoZWV0RGF0YSArPSBgPHNoZWV0RGF0YT5gO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBvd25lci5tYXhMZXZlbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3dJbmRleCsrO1xuICAgICAgICAgICAgICAgIHNoZWV0RGF0YSArPSBgPHJvdyByPVwiJHt0aGlzLnJvd0luZGV4fVwiJHt0aGlzLnJvd0hlaWdodH0+YDtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlcnNGb3JMZXZlbCA9IGhhc011bHRpQ29sdW1uSGVhZGVyID9cbiAgICAgICAgICAgICAgICAgICAgb3duZXIuY29sdW1uc1xuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihjID0+IChjLmxldmVsIDwgaSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMuaGVhZGVyVHlwZSAhPT0gSGVhZGVyVHlwZS5NdWx0aUNvbHVtbkhlYWRlciB8fCBjLmxldmVsID09PSBpKSAmJiBjLmNvbHVtblNwYW4gPiAwICYmICFjLnNraXApXG4gICAgICAgICAgICAgICAgICAgICAgICAuc29ydCgoYSwgYikgPT4gYS5zdGFydEluZGV4IC0gYi5zdGFydEluZGV4KVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNvcnQoKGEsIGIpID0+IGEucGlubmVkSW5kZXggLSBiLnBpbm5lZEluZGV4KSA6XG4gICAgICAgICAgICAgICAgICAgIGhhc1VzZXJTZXRJbmRleCA/XG4gICAgICAgICAgICAgICAgICAgICAgICBvd25lci5jb2x1bW5zLmZpbHRlcihjID0+ICFjLnNraXApIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIG93bmVyLmNvbHVtbnMuZmlsdGVyKGMgPT4gIWMuc2tpcClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc29ydCgoYSwgYikgPT4gYS5zdGFydEluZGV4IC0gYi5zdGFydEluZGV4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zb3J0KChhLCBiKSA9PiBhLnBpbm5lZEluZGV4IC0gYi5waW5uZWRJbmRleCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgc3RhcnRWYWx1ZSA9IDA7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGN1cnJlbnRDb2wgb2YgaGVhZGVyc0ZvckxldmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Q29sLmxldmVsID09PSBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29sdW1uQ29vcmRpbmF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbkNvb3JkaW5hdGUgPSBFeGNlbFN0cmluZ3MuZ2V0RXhjZWxDb2x1bW4oc3RhcnRWYWx1ZSkgKyB0aGlzLnJvd0luZGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29sdW1uVmFsdWUgPSBkaWN0aW9uYXJ5LnNhdmVWYWx1ZShjdXJyZW50Q29sLmhlYWRlciwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaGVldERhdGEgKz0gYDxjIHI9XCIke2NvbHVtbkNvb3JkaW5hdGV9XCIke3Jvd1N0eWxlfSB0PVwic1wiPjx2PiR7Y29sdW1uVmFsdWV9PC92PjwvYz5gO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSAhPT0gb3duZXIubWF4TGV2ZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1lcmdlQ2VsbHNDb3VudGVyKys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXJnZUNlbGxTdHIgKz0gYCA8bWVyZ2VDZWxsIHJlZj1cIiR7Y29sdW1uQ29vcmRpbmF0ZX06YDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Q29sLmhlYWRlclR5cGUgPT09IEhlYWRlclR5cGUuQ29sdW1uSGVhZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbkNvb3JkaW5hdGUgPSBFeGNlbFN0cmluZ3MuZ2V0RXhjZWxDb2x1bW4oc3RhcnRWYWx1ZSkgKyAob3duZXIubWF4TGV2ZWwgKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMTsgayA8IGN1cnJlbnRDb2wuY29sdW1uU3BhbjsgaysrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5Db29yZGluYXRlID0gRXhjZWxTdHJpbmdzLmdldEV4Y2VsQ29sdW1uKHN0YXJ0VmFsdWUgKyBrKSArIHRoaXMucm93SW5kZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGVldERhdGEgKz0gYDxjIHI9XCIke2NvbHVtbkNvb3JkaW5hdGV9XCIke3Jvd1N0eWxlfSAvPmA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1lcmdlQ2VsbFN0ciArPSBgJHtjb2x1bW5Db29yZGluYXRlfVwiIC8+YDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0VmFsdWUgKz0gY3VycmVudENvbC5jb2x1bW5TcGFuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHNoZWV0RGF0YSArPSBgPC9yb3c+YDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbXVsdGlDb2x1bW5IZWFkZXJMZXZlbCA9IHdvcmtzaGVldERhdGEub3B0aW9ucy5pZ25vcmVNdWx0aUNvbHVtbkhlYWRlcnMgPyAwIDogb3duZXIubWF4TGV2ZWw7XG4gICAgICAgICAgICBjb25zdCBmcmVlemVIZWFkZXJzID0gd29ya3NoZWV0RGF0YS5vcHRpb25zLmZyZWV6ZUhlYWRlcnMgPyAyICsgbXVsdGlDb2x1bW5IZWFkZXJMZXZlbCA6IDE7XG5cbiAgICAgICAgICAgIGlmICghaXNIaWVyYXJjaGljYWxHcmlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaW1lbnNpb24gPVxuICAgICAgICAgICAgICAgICAgICAnQTE6JyArIEV4Y2VsU3RyaW5ncy5nZXRFeGNlbENvbHVtbih3b3Jrc2hlZXREYXRhLmNvbHVtbkNvdW50IC0gMSkgKyAod29ya3NoZWV0RGF0YS5yb3dDb3VudCArIG93bmVyLm1heExldmVsKTtcblxuICAgICAgICAgICAgICAgIGNvbHMgKz0gJzxjb2xzPic7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWhhc011bHRpQ29sdW1uSGVhZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgd29ya3NoZWV0RGF0YS5jb2x1bW5Db3VudDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB3aWR0aCA9IGRpY3Rpb25hcnkuY29sdW1uV2lkdGhzW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVXNlIHRoZSB3aWR0aCBwcm92aWRlZCBpbiB0aGUgb3B0aW9ucyBpZiBpdCBleGlzdHNcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB3aWR0aEluVHdpcHMgPSB3b3Jrc2hlZXREYXRhLm9wdGlvbnMuY29sdW1uV2lkdGggIT09IHVuZGVmaW5lZCA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3b3Jrc2hlZXREYXRhLm9wdGlvbnMuY29sdW1uV2lkdGggOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5tYXgoKCh3aWR0aCAvIDk2KSAqIDE0LjQpLCBXb3Jrc2hlZXRGaWxlLk1JTl9XSURUSCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISh3aWR0aEluVHdpcHMgPiAwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoSW5Ud2lwcyA9IFdvcmtzaGVldEZpbGUuTUlOX1dJRFRIO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xzICs9IGA8Y29sIG1pbj1cIiR7KGogKyAxKX1cIiBtYXg9XCIkeyhqICsgMSl9XCIgd2lkdGg9XCIke3dpZHRoSW5Ud2lwc31cIiBjdXN0b21XaWR0aD1cIjFcIi8+YDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbHMgKz0gYDxjb2wgbWluPVwiMVwiIG1heD1cIiR7d29ya3NoZWV0RGF0YS5jb2x1bW5Db3VudH1cIiB3aWR0aD1cIjE1XCIgY3VzdG9tV2lkdGg9XCIxXCIvPmA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29scyArPSAnPC9jb2xzPic7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleE9mTGFzdFBpbm5lZENvbHVtbiA9IHdvcmtzaGVldERhdGEuaW5kZXhPZkxhc3RQaW5uZWRDb2x1bW47XG4gICAgICAgICAgICAgICAgY29uc3QgZnJvemVuQ29sdW1uQ291bnQgPSBpbmRleE9mTGFzdFBpbm5lZENvbHVtbiArIDE7XG4gICAgICAgICAgICAgICAgbGV0IGZpcnN0Q2VsbCA9IEV4Y2VsU3RyaW5ncy5nZXRFeGNlbENvbHVtbihmcm96ZW5Db2x1bW5Db3VudCkgKyBmcmVlemVIZWFkZXJzO1xuICAgICAgICAgICAgICAgIGlmIChpbmRleE9mTGFzdFBpbm5lZENvbHVtbiAhPT0gdW5kZWZpbmVkICYmIGluZGV4T2ZMYXN0UGlubmVkQ29sdW1uICE9PSAtMSAmJlxuICAgICAgICAgICAgICAgICAgICAhd29ya3NoZWV0RGF0YS5vcHRpb25zLmlnbm9yZVBpbm5pbmcgJiZcbiAgICAgICAgICAgICAgICAgICAgIXdvcmtzaGVldERhdGEub3B0aW9ucy5pZ25vcmVDb2x1bW5zT3JkZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmVlemVQYW5lID1cbiAgICAgICAgICAgICAgICAgICAgICAgIGA8cGFuZSB4U3BsaXQ9XCIke2Zyb3plbkNvbHVtbkNvdW50fVwiIHlTcGxpdD1cIiR7ZnJlZXplSGVhZGVycyAtIDF9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICB0b3BMZWZ0Q2VsbD1cIiR7Zmlyc3RDZWxsfVwiIGFjdGl2ZVBhbmU9XCJ0b3BSaWdodFwiIHN0YXRlPVwiZnJvemVuXCIvPmA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh3b3Jrc2hlZXREYXRhLm9wdGlvbnMuZnJlZXplSGVhZGVycykge1xuICAgICAgICAgICAgICAgICAgICBmaXJzdENlbGwgPSBFeGNlbFN0cmluZ3MuZ2V0RXhjZWxDb2x1bW4oMCkgKyBmcmVlemVIZWFkZXJzO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZyZWV6ZVBhbmUgPVxuICAgICAgICAgICAgICAgICAgICAgICAgYDxwYW5lIHhTcGxpdD1cIjBcIiB5U3BsaXQ9XCIke2ZyZWV6ZUhlYWRlcnMgLSAxfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgdG9wTGVmdENlbGw9XCIke2ZpcnN0Q2VsbH1cIiBhY3RpdmVQYW5lPVwidG9wUmlnaHRcIiBzdGF0ZT1cImZyb3plblwiLz5gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sdW1uV2lkdGggPSB3b3Jrc2hlZXREYXRhLm9wdGlvbnMuY29sdW1uV2lkdGggPyB3b3Jrc2hlZXREYXRhLm9wdGlvbnMuY29sdW1uV2lkdGggOiAyMDtcbiAgICAgICAgICAgICAgICBjb2xzICs9IGA8Y29scz48Y29sIG1pbj1cIjFcIiBtYXg9XCIke3dvcmtzaGVldERhdGEuY29sdW1uQ291bnR9XCIgd2lkdGg9XCIke2NvbHVtbldpZHRofVwiIGN1c3RvbVdpZHRoPVwiMVwiLz48L2NvbHM+YDtcbiAgICAgICAgICAgICAgICBpZiAod29ya3NoZWV0RGF0YS5vcHRpb25zLmZyZWV6ZUhlYWRlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlyc3RDZWxsID0gRXhjZWxTdHJpbmdzLmdldEV4Y2VsQ29sdW1uKDApICsgZnJlZXplSGVhZGVycztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmVlemVQYW5lID1cbiAgICAgICAgICAgICAgICAgICAgICAgIGA8cGFuZSB4U3BsaXQ9XCIwXCIgeVNwbGl0PVwiJHtmcmVlemVIZWFkZXJzIC0gMX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgIHRvcExlZnRDZWxsPVwiJHtmaXJzdENlbGx9XCIgYWN0aXZlUGFuZT1cInRvcFJpZ2h0XCIgc3RhdGU9XCJmcm96ZW5cIi8+YDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc0RhdGFSZWNvcmRzQXN5bmMod29ya3NoZWV0RGF0YSwgKHJvd3MpID0+IHtcbiAgICAgICAgICAgICAgICBzaGVldERhdGEgKz0gcm93cztcbiAgICAgICAgICAgICAgICBzaGVldERhdGEgKz0gJzwvc2hlZXREYXRhPic7XG5cbiAgICAgICAgICAgICAgICBpZiAoaGFzTXVsdGlDb2x1bW5IZWFkZXIgJiYgdGhpcy5tZXJnZUNlbGxzQ291bnRlciA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgc2hlZXREYXRhICs9IGA8bWVyZ2VDZWxscyBjb3VudD1cIiR7dGhpcy5tZXJnZUNlbGxzQ291bnRlcn1cIj4ke3RoaXMubWVyZ2VDZWxsU3RyfTwvbWVyZ2VDZWxscz5gO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGRvbmUoY29scywgc2hlZXREYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcm9jZXNzRGF0YVJlY29yZHNBc3luYyh3b3Jrc2hlZXREYXRhOiBXb3Jrc2hlZXREYXRhLCBkb25lOiAocm93czogc3RyaW5nKSA9PiB2b2lkKSB7XG4gICAgICAgIGNvbnN0IHJvd0RhdGFBcnIgPSBbXTtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gIHdvcmtzaGVldERhdGEub3B0aW9ucy5yb3dIZWlnaHQ7XG4gICAgICAgIHRoaXMucm93SGVpZ2h0ID0gaGVpZ2h0ID8gJyBodD1cIicgKyBoZWlnaHQgKyAnXCIgY3VzdG9tSGVpZ2h0PVwiMVwiJyA6ICcnO1xuXG4gICAgICAgIGNvbnN0IGlzSGllcmFyY2hpY2FsR3JpZCA9IHdvcmtzaGVldERhdGEuaXNIaWVyYXJjaGljYWw7XG4gICAgICAgIGNvbnN0IGhhc1VzZXJTZXRJbmRleCA9IHdvcmtzaGVldERhdGEub3duZXIuY29sdW1ucy5zb21lKGMgPT4gYy5leHBvcnRJbmRleCAhPT0gdW5kZWZpbmVkKTtcblxuICAgICAgICBsZXQgcmVjb3JkSGVhZGVycyA9IFtdO1xuXG4gICAgICAgIHlpZWxkaW5nTG9vcCh3b3Jrc2hlZXREYXRhLnJvd0NvdW50IC0gMSwgMTAwMCxcbiAgICAgICAgICAgIChpKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF3b3Jrc2hlZXREYXRhLmlzRW1wdHkpe1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzSGllcmFyY2hpY2FsR3JpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhhc1VzZXJTZXRJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY29yZEhlYWRlcnMgPSB3b3Jrc2hlZXREYXRhLnJvb3RLZXlzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNvcmRIZWFkZXJzID0gd29ya3NoZWV0RGF0YS5vd25lci5jb2x1bW5zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoYyA9PiBjLmhlYWRlclR5cGUgIT09IEhlYWRlclR5cGUuTXVsdGlDb2x1bW5IZWFkZXIgJiYgIWMuc2tpcClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNvcnQoKGEsIGIpID0+IGEuc3RhcnRJbmRleC1iLnN0YXJ0SW5kZXgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zb3J0KChhLCBiKSA9PiBhLnBpbm5lZEluZGV4LWIucGlubmVkSW5kZXgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoYyA9PiBjLmZpZWxkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlY29yZCA9IHdvcmtzaGVldERhdGEuZGF0YVtpXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBFeHBvcnRSZWNvcmRUeXBlLkhlYWRlclJlY29yZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlY29yZE93bmVyID0gd29ya3NoZWV0RGF0YS5vd25lcnMuZ2V0KHJlY29yZC5vd25lcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFzTXVsdGlDb2x1bW5IZWFkZXJzID0gcmVjb3JkT3duZXIuY29sdW1ucy5zb21lKGMgPT4gIWMuc2tpcCAmJiBjLmhlYWRlclR5cGUgPT09IEhlYWRlclR5cGUuTXVsdGlDb2x1bW5IZWFkZXIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhhc011bHRpQ29sdW1uSGVhZGVycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhHcmlkUHJpbnRNdWx0aUNvbEhlYWRlcnMod29ya3NoZWV0RGF0YSwgcm93RGF0YUFyciwgcmVjb3JkLCByZWNvcmRPd25lcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZWNvcmRIZWFkZXJzID0gT2JqZWN0LmtleXMod29ya3NoZWV0RGF0YS5kYXRhW2ldLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcm93RGF0YUFyci5wdXNoKHRoaXMucHJvY2Vzc1Jvdyh3b3Jrc2hlZXREYXRhLCBpLCByZWNvcmRIZWFkZXJzLCBpc0hpZXJhcmNoaWNhbEdyaWQpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGRvbmUocm93RGF0YUFyci5qb2luKCcnKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgaEdyaWRQcmludE11bHRpQ29sSGVhZGVycyh3b3Jrc2hlZXREYXRhOiBXb3Jrc2hlZXREYXRhLCByb3dEYXRhQXJyOiBhbnlbXSwgcmVjb3JkOiBJRXhwb3J0UmVjb3JkLFxuICAgICAgICBvd25lcjogSUNvbHVtbkxpc3QpIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBvd25lci5tYXhMZXZlbDsgaisrKSB7XG4gICAgICAgICAgICBjb25zdCByZWNvcmRMZXZlbCA9IHJlY29yZC5sZXZlbDtcbiAgICAgICAgICAgIGNvbnN0IG91dGxpbmVMZXZlbCA9IHJlY29yZExldmVsID4gMCA/IGAgb3V0bGluZUxldmVsPVwiJHtyZWNvcmRMZXZlbH1cImAgOiAnJztcbiAgICAgICAgICAgIHRoaXMubWF4T3V0bGluZUxldmVsID0gdGhpcy5tYXhPdXRsaW5lTGV2ZWwgPCByZWNvcmRMZXZlbCA/IHJlY29yZExldmVsIDogdGhpcy5tYXhPdXRsaW5lTGV2ZWw7XG4gICAgICAgICAgICBjb25zdCBzSGlkZGVuID0gcmVjb3JkLmhpZGRlbiA/IGAgaGlkZGVuPVwiMVwiYCA6ICcnO1xuXG4gICAgICAgICAgICB0aGlzLnJvd0luZGV4Kys7XG4gICAgICAgICAgICBsZXQgcm93ID0gYDxyb3cgcj1cIiR7dGhpcy5yb3dJbmRleH1cIiR7dGhpcy5yb3dIZWlnaHR9JHtvdXRsaW5lTGV2ZWx9JHtzSGlkZGVufT5gO1xuXG4gICAgICAgICAgICBjb25zdCBoZWFkZXJzRm9yTGV2ZWwgPSBvd25lci5jb2x1bW5zXG4gICAgICAgICAgICAgICAgLmZpbHRlcihjID0+IChjLmxldmVsIDwgaiAmJlxuICAgICAgICAgICAgICAgICAgICBjLmhlYWRlclR5cGUgIT09IEhlYWRlclR5cGUuTXVsdGlDb2x1bW5IZWFkZXIgfHwgYy5sZXZlbCA9PT0gaikgJiYgYy5jb2x1bW5TcGFuID4gMCAmJiAhYy5za2lwKVxuICAgICAgICAgICAgICAgIC5zb3J0KChhLCBiKSA9PiBhLnN0YXJ0SW5kZXggLSBiLnN0YXJ0SW5kZXgpXG4gICAgICAgICAgICAgICAgLnNvcnQoKGEsIGIpID0+IGEucGlubmVkSW5kZXggLSBiLnBpbm5lZEluZGV4KTtcblxuICAgICAgICAgICAgbGV0IHN0YXJ0VmFsdWUgPSAwICsgcmVjb3JkLmxldmVsO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGN1cnJlbnRDb2wgb2YgaGVhZGVyc0ZvckxldmVsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRDb2wubGV2ZWwgPT09IGopIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbHVtbkNvb3JkaW5hdGU7XG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbkNvb3JkaW5hdGUgPVxuICAgICAgICAgICAgICAgICAgICAgICAgRXhjZWxTdHJpbmdzLmdldEV4Y2VsQ29sdW1uKHN0YXJ0VmFsdWUpICsgdGhpcy5yb3dJbmRleDtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb2x1bW5WYWx1ZSA9IHdvcmtzaGVldERhdGEuZGF0YURpY3Rpb25hcnkuc2F2ZVZhbHVlKGN1cnJlbnRDb2wuaGVhZGVyLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgcm93ICs9IGA8YyByPVwiJHtjb2x1bW5Db29yZGluYXRlfVwiIHM9XCIzXCIgdD1cInNcIj48dj4ke2NvbHVtblZhbHVlfTwvdj48L2M+YDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaiAhPT0gb3duZXIubWF4TGV2ZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWVyZ2VDZWxsc0NvdW50ZXIrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWVyZ2VDZWxsU3RyICs9IGAgPG1lcmdlQ2VsbCByZWY9XCIke2NvbHVtbkNvb3JkaW5hdGV9OmA7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Q29sLmhlYWRlclR5cGUgPT09IEhlYWRlclR5cGUuQ29sdW1uSGVhZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uQ29vcmRpbmF0ZSA9IEV4Y2VsU3RyaW5ncy5nZXRFeGNlbENvbHVtbihzdGFydFZhbHVlKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzLnJvd0luZGV4ICsgb3duZXIubWF4TGV2ZWwgLSBjdXJyZW50Q29sLmxldmVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDE7IGsgPCBjdXJyZW50Q29sLmNvbHVtblNwYW47IGsrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5Db29yZGluYXRlID0gRXhjZWxTdHJpbmdzLmdldEV4Y2VsQ29sdW1uKHN0YXJ0VmFsdWUgKyBrKSArIHRoaXMucm93SW5kZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdyArPSBgPGMgcj1cIiR7Y29sdW1uQ29vcmRpbmF0ZX1cIiBzPVwiM1wiIC8+YDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWVyZ2VDZWxsU3RyICs9IGAke2NvbHVtbkNvb3JkaW5hdGV9XCIgLz5gO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc3RhcnRWYWx1ZSArPSBjdXJyZW50Q29sLmNvbHVtblNwYW47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByb3cgKz0gYDwvcm93PmA7XG4gICAgICAgICAgICByb3dEYXRhQXJyLnB1c2gocm93KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcHJvY2Vzc1Jvdyh3b3Jrc2hlZXREYXRhOiBXb3Jrc2hlZXREYXRhLCBpOiBudW1iZXIsIGhlYWRlcnNGb3JMZXZlbDogYW55W10sIGlzSGllcmFyY2hpY2FsR3JpZDogYm9vbGVhbikge1xuICAgICAgICBjb25zdCByZWNvcmQgPSB3b3Jrc2hlZXREYXRhLmRhdGFbaV07XG5cbiAgICAgICAgY29uc3Qgcm93RGF0YSA9IG5ldyBBcnJheSh3b3Jrc2hlZXREYXRhLmNvbHVtbkNvdW50ICsgMik7XG5cbiAgICAgICAgY29uc3Qgcm93TGV2ZWwgPSByZWNvcmQubGV2ZWw7XG4gICAgICAgIGNvbnN0IG91dGxpbmVMZXZlbCA9IHJvd0xldmVsID4gMCA/IGAgb3V0bGluZUxldmVsPVwiJHtyb3dMZXZlbH1cImAgOiAnJztcbiAgICAgICAgdGhpcy5tYXhPdXRsaW5lTGV2ZWwgPSB0aGlzLm1heE91dGxpbmVMZXZlbCA8IHJvd0xldmVsID8gcm93TGV2ZWwgOiB0aGlzLm1heE91dGxpbmVMZXZlbDtcblxuICAgICAgICBjb25zdCBzSGlkZGVuID0gcmVjb3JkLmhpZGRlbiA/IGAgaGlkZGVuPVwiMVwiYCA6ICcnO1xuXG4gICAgICAgIHRoaXMucm93SW5kZXgrKztcbiAgICAgICAgcm93RGF0YVswXSA9XG4gICAgICAgICAgICBgPHJvdyByPVwiJHt0aGlzLnJvd0luZGV4fVwiJHt0aGlzLnJvd0hlaWdodH0ke291dGxpbmVMZXZlbH0ke3NIaWRkZW59PmA7XG5cbiAgICAgICAgY29uc3Qga2V5cyA9IHdvcmtzaGVldERhdGEuaXNTcGVjaWFsRGF0YSA/IFtyZWNvcmQuZGF0YV0gOiBoZWFkZXJzRm9yTGV2ZWw7XG5cbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBrZXlzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBjb25zdCBjb2wgPSBqICsgKGlzSGllcmFyY2hpY2FsR3JpZCA/IHJvd0xldmVsIDogMCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGNlbGxEYXRhID0gdGhpcy5nZXRDZWxsRGF0YSh3b3Jrc2hlZXREYXRhLCBpLCBjb2wsIGtleXNbal0pO1xuXG4gICAgICAgICAgICByb3dEYXRhW2ogKyAxXSA9IGNlbGxEYXRhO1xuICAgICAgICB9XG5cbiAgICAgICAgcm93RGF0YVtrZXlzLmxlbmd0aCArIDFdID0gJzwvcm93Pic7XG5cbiAgICAgICAgcmV0dXJuIHJvd0RhdGEuam9pbignJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRDZWxsRGF0YSh3b3Jrc2hlZXREYXRhOiBXb3Jrc2hlZXREYXRhLCByb3c6IG51bWJlciwgY29sdW1uOiBudW1iZXIsIGtleTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgZGljdGlvbmFyeSA9IHdvcmtzaGVldERhdGEuZGF0YURpY3Rpb25hcnk7XG4gICAgICAgIGNvbnN0IGNvbHVtbk5hbWUgPSBFeGNlbFN0cmluZ3MuZ2V0RXhjZWxDb2x1bW4oY29sdW1uKSArICh0aGlzLnJvd0luZGV4KTtcbiAgICAgICAgY29uc3QgZnVsbFJvdyA9IHdvcmtzaGVldERhdGEuZGF0YVtyb3ddO1xuICAgICAgICBjb25zdCBpc0hlYWRlclJlY29yZCA9IGZ1bGxSb3cudHlwZSA9PT0gRXhwb3J0UmVjb3JkVHlwZS5IZWFkZXJSZWNvcmQ7XG5cbiAgICAgICAgY29uc3QgY2VsbFZhbHVlID0gd29ya3NoZWV0RGF0YS5pc1NwZWNpYWxEYXRhID9cbiAgICAgICAgICAgIGZ1bGxSb3cuZGF0YSA6XG4gICAgICAgICAgICBmdWxsUm93LmRhdGFba2V5XTtcblxuICAgICAgICBpZiAoY2VsbFZhbHVlID09PSB1bmRlZmluZWQgfHwgY2VsbFZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gYDxjIHI9XCIke2NvbHVtbk5hbWV9XCIgcz1cIjFcIi8+YDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHNhdmVkVmFsdWUgPSBkaWN0aW9uYXJ5LnNhdmVWYWx1ZShjZWxsVmFsdWUsIGlzSGVhZGVyUmVjb3JkKTtcbiAgICAgICAgICAgIGNvbnN0IGlzU2F2ZWRBc1N0cmluZyA9IHNhdmVkVmFsdWUgIT09IC0xO1xuXG4gICAgICAgICAgICBjb25zdCBpc1NhdmVkQXNEYXRlID0gIWlzU2F2ZWRBc1N0cmluZyAmJiBjZWxsVmFsdWUgaW5zdGFuY2VvZiBEYXRlO1xuXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBpc1NhdmVkQXNTdHJpbmcgPyBzYXZlZFZhbHVlIDogY2VsbFZhbHVlO1xuXG4gICAgICAgICAgICBpZiAoaXNTYXZlZEFzRGF0ZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRpbWVab25lT2Zmc2V0ID0gdmFsdWUuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwMDAwO1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzb1N0cmluZyA9IChuZXcgRGF0ZSh2YWx1ZSAtIHRpbWVab25lT2Zmc2V0KSkudG9JU09TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGlzb1N0cmluZy5zdWJzdHJpbmcoMCwgaXNvU3RyaW5nLmluZGV4T2YoJy4nKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBpc1NhdmVkQXNTdHJpbmcgPyBgIHQ9XCJzXCJgIDogaXNTYXZlZEFzRGF0ZSA/IGAgdD1cImRcImAgOiAnJztcblxuICAgICAgICAgICAgY29uc3QgZm9ybWF0ID0gaXNIZWFkZXJSZWNvcmQgPyBgIHM9XCIzXCJgIDogaXNTYXZlZEFzU3RyaW5nID8gJycgOiBpc1NhdmVkQXNEYXRlID8gYCBzPVwiMlwiYCA6IGAgcz1cIjFcImA7XG5cbiAgICAgICAgICAgIHJldHVybiBgPGMgcj1cIiR7Y29sdW1uTmFtZX1cIiR7dHlwZX0ke2Zvcm1hdH0+PHY+JHt2YWx1ZX08L3Y+PC9jPmA7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogQGhpZGRlblxuICovXG5leHBvcnQgY2xhc3MgU3R5bGVGaWxlIGltcGxlbWVudHMgSUV4Y2VsRmlsZSB7XG4gICAgcHVibGljIHdyaXRlRWxlbWVudChmb2xkZXI6IEpTWmlwKSB7XG4gICAgICAgIGZvbGRlci5maWxlKCdzdHlsZXMueG1sJywgRXhjZWxTdHJpbmdzLmdldFN0eWxlcygpKTtcbiAgICB9XG59XG5cbi8qKlxuICogQGhpZGRlblxuICovXG5leHBvcnQgY2xhc3MgV29ya2Jvb2tGaWxlIGltcGxlbWVudHMgSUV4Y2VsRmlsZSB7XG4gICAgcHVibGljIHdyaXRlRWxlbWVudChmb2xkZXI6IEpTWmlwLCB3b3Jrc2hlZXREYXRhOiBXb3Jrc2hlZXREYXRhKSB7XG4gICAgICAgIGZvbGRlci5maWxlKCd3b3JrYm9vay54bWwnLCBFeGNlbFN0cmluZ3MuZ2V0V29ya2Jvb2sod29ya3NoZWV0RGF0YS5vcHRpb25zLndvcmtzaGVldE5hbWUpKTtcbiAgICB9XG59XG5cbi8qKlxuICogQGhpZGRlblxuICovXG5leHBvcnQgY2xhc3MgQ29udGVudFR5cGVzRmlsZSBpbXBsZW1lbnRzIElFeGNlbEZpbGUge1xuICAgIHB1YmxpYyB3cml0ZUVsZW1lbnQoZm9sZGVyOiBKU1ppcCwgd29ya3NoZWV0RGF0YTogV29ya3NoZWV0RGF0YSkge1xuICAgICAgICBjb25zdCBoYXNTaGFyZWRTdHJpbmdzID0gIXdvcmtzaGVldERhdGEuaXNFbXB0eSB8fCB3b3Jrc2hlZXREYXRhLm9wdGlvbnMuYWx3YXlzRXhwb3J0SGVhZGVycztcbiAgICAgICAgZm9sZGVyLmZpbGUoJ1tDb250ZW50X1R5cGVzXS54bWwnLCBFeGNlbFN0cmluZ3MuZ2V0Q29udGVudFR5cGVzWE1MKGhhc1NoYXJlZFN0cmluZ3MsIHdvcmtzaGVldERhdGEub3B0aW9ucy5leHBvcnRBc1RhYmxlKSk7XG4gICAgfVxufVxuXG4vKipcbiAqIEBoaWRkZW5cbiAqL1xuZXhwb3J0IGNsYXNzIFNoYXJlZFN0cmluZ3NGaWxlIGltcGxlbWVudHMgSUV4Y2VsRmlsZSB7XG4gICAgcHVibGljIHdyaXRlRWxlbWVudChmb2xkZXI6IEpTWmlwLCB3b3Jrc2hlZXREYXRhOiBXb3Jrc2hlZXREYXRhKSB7XG4gICAgICAgIGNvbnN0IGRpY3QgPSB3b3Jrc2hlZXREYXRhLmRhdGFEaWN0aW9uYXJ5O1xuICAgICAgICBjb25zdCBzb3J0ZWRWYWx1ZXMgPSBkaWN0LmdldEtleXMoKTtcbiAgICAgICAgY29uc3Qgc2hhcmVkU3RyaW5ncyA9IG5ldyBBcnJheTxzdHJpbmc+KHNvcnRlZFZhbHVlcy5sZW5ndGgpO1xuXG4gICAgICAgIGZvciAoY29uc3QgdmFsdWUgb2Ygc29ydGVkVmFsdWVzKSB7XG4gICAgICAgICAgICBzaGFyZWRTdHJpbmdzW2RpY3QuZ2V0U2FuaXRpemVkVmFsdWUodmFsdWUpXSA9ICc8c2k+PHQ+JyArIHZhbHVlICsgJzwvdD48L3NpPic7XG4gICAgICAgIH1cblxuICAgICAgICBmb2xkZXIuZmlsZSgnc2hhcmVkU3RyaW5ncy54bWwnLCBFeGNlbFN0cmluZ3MuZ2V0U2hhcmVkU3RyaW5nWE1MKFxuICAgICAgICAgICAgICAgICAgICAgICAgZGljdC5zdHJpbmdzQ291bnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0ZWRWYWx1ZXMubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hhcmVkU3RyaW5ncy5qb2luKCcnKSlcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICB9XG59XG5cbi8qKlxuICogQGhpZGRlblxuICovXG5leHBvcnQgY2xhc3MgVGFibGVzRmlsZSBpbXBsZW1lbnRzIElFeGNlbEZpbGUge1xuICAgIHB1YmxpYyB3cml0ZUVsZW1lbnQoZm9sZGVyOiBKU1ppcCwgd29ya3NoZWV0RGF0YTogV29ya3NoZWV0RGF0YSkge1xuICAgICAgICBjb25zdCBjb2x1bW5Db3VudCA9IHdvcmtzaGVldERhdGEuY29sdW1uQ291bnQ7XG4gICAgICAgIGNvbnN0IGxhc3RDb2x1bW4gPSBFeGNlbFN0cmluZ3MuZ2V0RXhjZWxDb2x1bW4oY29sdW1uQ291bnQgLSAxKSArIHdvcmtzaGVldERhdGEucm93Q291bnQ7XG4gICAgICAgIGNvbnN0IGF1dG9GaWx0ZXJEaW1lbnNpb24gPSAnQTE6JyArIGxhc3RDb2x1bW47XG4gICAgICAgIGNvbnN0IHRhYmxlRGltZW5zaW9uID0gd29ya3NoZWV0RGF0YS5pc0VtcHR5XG4gICAgICAgICAgICA/ICdBMTonICsgRXhjZWxTdHJpbmdzLmdldEV4Y2VsQ29sdW1uKGNvbHVtbkNvdW50IC0gMSkgKyAod29ya3NoZWV0RGF0YS5yb3dDb3VudCArIDEpXG4gICAgICAgICAgICA6IGF1dG9GaWx0ZXJEaW1lbnNpb247XG4gICAgICAgIGNvbnN0IGhhc1VzZXJTZXRJbmRleCA9IHdvcmtzaGVldERhdGEub3duZXIuY29sdW1ucy5zb21lKGMgPT4gYy5leHBvcnRJbmRleCAhPT0gdW5kZWZpbmVkKTtcbiAgICAgICAgY29uc3QgdmFsdWVzID0gaGFzVXNlclNldEluZGV4XG4gICAgICAgICAgICA/IHdvcmtzaGVldERhdGEucm9vdEtleXNcbiAgICAgICAgICAgIDogd29ya3NoZWV0RGF0YS5vd25lci5jb2x1bW5zXG4gICAgICAgICAgICAgICAgLmZpbHRlcihjID0+ICFjLnNraXApXG4gICAgICAgICAgICAgICAgLnNvcnQoKGEsIGIpID0+IGEuc3RhcnRJbmRleCAtIGIuc3RhcnRJbmRleClcbiAgICAgICAgICAgICAgICAuc29ydCgoYSwgYikgPT4gYS5waW5uZWRJbmRleCAtIGIucGlubmVkSW5kZXgpXG4gICAgICAgICAgICAgICAgLm1hcChjID0+IGMuaGVhZGVyKTtcblxuICAgICAgICBsZXQgc29ydFN0cmluZyA9ICcnO1xuXG4gICAgICAgIGxldCB0YWJsZUNvbHVtbnMgPSAnPHRhYmxlQ29sdW1ucyBjb3VudD1cIicgKyBjb2x1bW5Db3VudCArICdcIj4nO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbHVtbkNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gIHZhbHVlc1tpXTtcbiAgICAgICAgICAgIHRhYmxlQ29sdW1ucyArPSAnPHRhYmxlQ29sdW1uIGlkPVwiJyArIChpICsgMSkgKyAnXCIgbmFtZT1cIicgKyB2YWx1ZSArICdcIi8+JztcbiAgICAgICAgfVxuXG4gICAgICAgIHRhYmxlQ29sdW1ucyArPSAnPC90YWJsZUNvbHVtbnM+JztcblxuICAgICAgICBpZiAod29ya3NoZWV0RGF0YS5zb3J0KSB7XG4gICAgICAgICAgICBjb25zdCBzb3J0aW5nRXhwcmVzc2lvbiA9IHdvcmtzaGVldERhdGEuc29ydDtcbiAgICAgICAgICAgIGNvbnN0IHNjID0gRXhjZWxTdHJpbmdzLmdldEV4Y2VsQ29sdW1uKHZhbHVlcy5pbmRleE9mKHNvcnRpbmdFeHByZXNzaW9uLmZpZWxkTmFtZSkpO1xuICAgICAgICAgICAgY29uc3QgZGlyID0gc29ydGluZ0V4cHJlc3Npb24uZGlyIC0gMTtcbiAgICAgICAgICAgIHNvcnRTdHJpbmcgPSBgPHNvcnRTdGF0ZSByZWY9XCJBMjoke2xhc3RDb2x1bW59XCI+PHNvcnRDb25kaXRpb24gZGVzY2VuZGluZz1cIiR7ZGlyfVwiIHJlZj1cIiR7c2N9MToke3NjfTE1XCIvPjwvc29ydFN0YXRlPmA7XG4gICAgICAgIH1cblxuICAgICAgICBmb2xkZXIuZmlsZSgndGFibGUxLnhtbCcsIEV4Y2VsU3RyaW5ncy5nZXRUYWJsZXNYTUwoYXV0b0ZpbHRlckRpbWVuc2lvbiwgdGFibGVEaW1lbnNpb24sIHRhYmxlQ29sdW1ucywgc29ydFN0cmluZykpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBAaGlkZGVuXG4gKi9cbmV4cG9ydCBjbGFzcyBXb3Jrc2hlZXRSZWxzRmlsZSBpbXBsZW1lbnRzIElFeGNlbEZpbGUge1xuICAgIHB1YmxpYyB3cml0ZUVsZW1lbnQoZm9sZGVyOiBKU1ppcCkge1xuICAgICAgICBmb2xkZXIuZmlsZSgnc2hlZXQxLnhtbC5yZWxzJywgRXhjZWxTdHJpbmdzLmdldFdvcmtzaGVldFJlbHMoKSk7XG4gICAgfVxufVxuIl19
import { IgxExporterOptionsBase } from '../exporter-common/exporter-options-base';
/**
 * Objects of this class are used to configure the CSV exporting process.
 */
export class IgxCsvExporterOptions extends IgxExporterOptionsBase {
    constructor(fileName, fileType) {
        super(fileName, IgxCsvExporterOptions.getExtensionFromFileType(fileType));
        this.setFileType(fileType);
        this.setDelimiter();
    }
    static getExtensionFromFileType(fType) {
        let extension = '';
        switch (fType) {
            case CsvFileTypes.CSV:
                extension = '.csv';
                break;
            case CsvFileTypes.TSV:
                extension = '.tsv';
                break;
            case CsvFileTypes.TAB:
                extension = '.tab';
                break;
            default:
                throw Error('Unsupported CSV file type!');
        }
        return extension;
    }
    /**
     * Gets the value delimiter which will be used for the exporting operation.
     * ```typescript
     * let delimiter = this.exportOptions.valueDelimiter;
     * ```
     *
     * @memberof IgxCsvExporterOptions
     */
    get valueDelimiter() {
        return this._valueDelimiter;
    }
    /**
     * Sets a value delimiter which will overwrite the default delimiter of the selected export format.
     * ```typescript
     * this.exportOptions.valueDelimiter = '|';
     * ```
     *
     * @memberof IgxCsvExporterOptions
     */
    set valueDelimiter(value) {
        this.setDelimiter(value);
    }
    /**
     * Gets the CSV export format.
     * ```typescript
     * let filetype = this.exportOptions.fileType;
     * ```
     *
     * @memberof IgxCsvExporterOptions
     */
    get fileType() {
        return this._fileType;
    }
    /**
     * Sets the CSV export format.
     * ```typescript
     * this.exportOptions.fileType = CsvFileTypes.TAB;
     * ```
     *
     * @memberof IgxCsvExporterOptions
     */
    set fileType(value) {
        this.setFileType(value);
    }
    setFileType(value) {
        if (value !== undefined && value !== null && value !== this._fileType) {
            this._fileType = value;
            const extension = IgxCsvExporterOptions.getExtensionFromFileType(value);
            if (!this.fileName.endsWith(extension)) {
                const oldExt = '.' + this.fileName.split('.').pop();
                const newName = this.fileName.replace(oldExt, extension);
                this._fileExtension = extension;
                this.fileName = newName;
            }
        }
    }
    setDelimiter(value) {
        if (value !== undefined && value !== '' && value !== null) {
            this._valueDelimiter = value;
        }
        else {
            switch (this.fileType) {
                case CsvFileTypes.CSV:
                    this._valueDelimiter = ',';
                    break;
                case CsvFileTypes.TSV:
                case CsvFileTypes.TAB:
                    this._valueDelimiter = '\t';
                    break;
            }
        }
    }
}
/**
 * This enumeration is used to configure the default value separator
 * as well as the default file extension used when performing CSV exporting.
 */
export var CsvFileTypes;
(function (CsvFileTypes) {
    /**
     * Character Separated Values, default separator is "comma", default file extension is .csv
     */
    CsvFileTypes[CsvFileTypes["CSV"] = 0] = "CSV";
    /**
     * Tab Separated Values, default separator is tab, default file extension is .tsv
     */
    CsvFileTypes[CsvFileTypes["TSV"] = 1] = "TSV";
    /**
     * Tab Separated Values, default separator is tab, default file extension is .tab
     */
    CsvFileTypes[CsvFileTypes["TAB"] = 2] = "TAB";
})(CsvFileTypes || (CsvFileTypes = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3N2LWV4cG9ydGVyLW9wdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9pZ25pdGV1aS1hbmd1bGFyL3NyYy9saWIvc2VydmljZXMvY3N2L2Nzdi1leHBvcnRlci1vcHRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBRWxGOztHQUVHO0FBQ0gsTUFBTSxPQUFPLHFCQUFzQixTQUFRLHNCQUFzQjtJQUs3RCxZQUFZLFFBQWdCLEVBQUUsUUFBc0I7UUFDaEQsS0FBSyxDQUFDLFFBQVEsRUFBRSxxQkFBcUIsQ0FBQyx3QkFBd0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFTyxNQUFNLENBQUMsd0JBQXdCLENBQUMsS0FBbUI7UUFDdkQsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ25CLFFBQVEsS0FBSyxFQUFFO1lBQ1gsS0FBSyxZQUFZLENBQUMsR0FBRztnQkFDakIsU0FBUyxHQUFHLE1BQU0sQ0FBQztnQkFDbkIsTUFBTTtZQUNWLEtBQUssWUFBWSxDQUFDLEdBQUc7Z0JBQ2pCLFNBQVMsR0FBRyxNQUFNLENBQUM7Z0JBQ25CLE1BQU07WUFDVixLQUFLLFlBQVksQ0FBQyxHQUFHO2dCQUNqQixTQUFTLEdBQUcsTUFBTSxDQUFDO2dCQUNuQixNQUFNO1lBQ1Y7Z0JBQ0ksTUFBTSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztTQUNqRDtRQUNELE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsSUFBVyxjQUFjO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUNoQyxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILElBQVcsY0FBYyxDQUFDLEtBQUs7UUFDM0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILElBQVcsUUFBUTtRQUNmLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILElBQVcsUUFBUSxDQUFDLEtBQUs7UUFDckIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRU8sV0FBVyxDQUFDLEtBQUs7UUFDckIsSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbkUsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdkIsTUFBTSxTQUFTLEdBQUcscUJBQXFCLENBQUMsd0JBQXdCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUNwQyxNQUFNLE1BQU0sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQ3BELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztnQkFDekQsSUFBSSxDQUFDLGNBQWMsR0FBRyxTQUFTLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO2FBQzNCO1NBQ0o7SUFDTCxDQUFDO0lBRU8sWUFBWSxDQUFDLEtBQU07UUFDdkIsSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxFQUFFLElBQUksS0FBSyxLQUFLLElBQUksRUFBRTtZQUN2RCxJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztTQUNoQzthQUFNO1lBQ0gsUUFBUSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNuQixLQUFLLFlBQVksQ0FBQyxHQUFHO29CQUNqQixJQUFJLENBQUMsZUFBZSxHQUFHLEdBQUcsQ0FBQztvQkFDM0IsTUFBTTtnQkFDVixLQUFLLFlBQVksQ0FBQyxHQUFHLENBQUM7Z0JBQ3RCLEtBQUssWUFBWSxDQUFDLEdBQUc7b0JBQ2pCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO29CQUM1QixNQUFNO2FBQ2I7U0FDSjtJQUNMLENBQUM7Q0FDSjtBQUVEOzs7R0FHRztBQUNILE1BQU0sQ0FBTixJQUFZLFlBYVg7QUFiRCxXQUFZLFlBQVk7SUFDcEI7O09BRUc7SUFDSCw2Q0FBRyxDQUFBO0lBQ0g7O09BRUc7SUFDSCw2Q0FBRyxDQUFBO0lBQ0g7O09BRUc7SUFDSCw2Q0FBRyxDQUFBO0FBQ1AsQ0FBQyxFQWJXLFlBQVksS0FBWixZQUFZLFFBYXZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSWd4RXhwb3J0ZXJPcHRpb25zQmFzZSB9IGZyb20gJy4uL2V4cG9ydGVyLWNvbW1vbi9leHBvcnRlci1vcHRpb25zLWJhc2UnO1xuXG4vKipcbiAqIE9iamVjdHMgb2YgdGhpcyBjbGFzcyBhcmUgdXNlZCB0byBjb25maWd1cmUgdGhlIENTViBleHBvcnRpbmcgcHJvY2Vzcy5cbiAqL1xuZXhwb3J0IGNsYXNzIElneENzdkV4cG9ydGVyT3B0aW9ucyBleHRlbmRzIElneEV4cG9ydGVyT3B0aW9uc0Jhc2Uge1xuXG4gICAgcHJpdmF0ZSBfdmFsdWVEZWxpbWl0ZXI7XG4gICAgcHJpdmF0ZSBfZmlsZVR5cGU7XG5cbiAgICBjb25zdHJ1Y3RvcihmaWxlTmFtZTogc3RyaW5nLCBmaWxlVHlwZTogQ3N2RmlsZVR5cGVzKSB7XG4gICAgICAgIHN1cGVyKGZpbGVOYW1lLCBJZ3hDc3ZFeHBvcnRlck9wdGlvbnMuZ2V0RXh0ZW5zaW9uRnJvbUZpbGVUeXBlKGZpbGVUeXBlKSk7XG4gICAgICAgIHRoaXMuc2V0RmlsZVR5cGUoZmlsZVR5cGUpO1xuICAgICAgICB0aGlzLnNldERlbGltaXRlcigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGdldEV4dGVuc2lvbkZyb21GaWxlVHlwZShmVHlwZTogQ3N2RmlsZVR5cGVzKSB7XG4gICAgICAgIGxldCBleHRlbnNpb24gPSAnJztcbiAgICAgICAgc3dpdGNoIChmVHlwZSkge1xuICAgICAgICAgICAgY2FzZSBDc3ZGaWxlVHlwZXMuQ1NWOlxuICAgICAgICAgICAgICAgIGV4dGVuc2lvbiA9ICcuY3N2JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQ3N2RmlsZVR5cGVzLlRTVjpcbiAgICAgICAgICAgICAgICBleHRlbnNpb24gPSAnLnRzdic7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIENzdkZpbGVUeXBlcy5UQUI6XG4gICAgICAgICAgICAgICAgZXh0ZW5zaW9uID0gJy50YWInO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcignVW5zdXBwb3J0ZWQgQ1NWIGZpbGUgdHlwZSEnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXh0ZW5zaW9uO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHZhbHVlIGRlbGltaXRlciB3aGljaCB3aWxsIGJlIHVzZWQgZm9yIHRoZSBleHBvcnRpbmcgb3BlcmF0aW9uLlxuICAgICAqIGBgYHR5cGVzY3JpcHRcbiAgICAgKiBsZXQgZGVsaW1pdGVyID0gdGhpcy5leHBvcnRPcHRpb25zLnZhbHVlRGVsaW1pdGVyO1xuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIElneENzdkV4cG9ydGVyT3B0aW9uc1xuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgdmFsdWVEZWxpbWl0ZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZURlbGltaXRlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIGEgdmFsdWUgZGVsaW1pdGVyIHdoaWNoIHdpbGwgb3ZlcndyaXRlIHRoZSBkZWZhdWx0IGRlbGltaXRlciBvZiB0aGUgc2VsZWN0ZWQgZXhwb3J0IGZvcm1hdC5cbiAgICAgKiBgYGB0eXBlc2NyaXB0XG4gICAgICogdGhpcy5leHBvcnRPcHRpb25zLnZhbHVlRGVsaW1pdGVyID0gJ3wnO1xuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIElneENzdkV4cG9ydGVyT3B0aW9uc1xuICAgICAqL1xuICAgIHB1YmxpYyBzZXQgdmFsdWVEZWxpbWl0ZXIodmFsdWUpIHtcbiAgICAgICAgdGhpcy5zZXREZWxpbWl0ZXIodmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIENTViBleHBvcnQgZm9ybWF0LlxuICAgICAqIGBgYHR5cGVzY3JpcHRcbiAgICAgKiBsZXQgZmlsZXR5cGUgPSB0aGlzLmV4cG9ydE9wdGlvbnMuZmlsZVR5cGU7XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgSWd4Q3N2RXhwb3J0ZXJPcHRpb25zXG4gICAgICovXG4gICAgcHVibGljIGdldCBmaWxlVHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbGVUeXBlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIENTViBleHBvcnQgZm9ybWF0LlxuICAgICAqIGBgYHR5cGVzY3JpcHRcbiAgICAgKiB0aGlzLmV4cG9ydE9wdGlvbnMuZmlsZVR5cGUgPSBDc3ZGaWxlVHlwZXMuVEFCO1xuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIElneENzdkV4cG9ydGVyT3B0aW9uc1xuICAgICAqL1xuICAgIHB1YmxpYyBzZXQgZmlsZVR5cGUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5zZXRGaWxlVHlwZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRGaWxlVHlwZSh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdGhpcy5fZmlsZVR5cGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpbGVUeXBlID0gdmFsdWU7XG4gICAgICAgICAgICBjb25zdCBleHRlbnNpb24gPSBJZ3hDc3ZFeHBvcnRlck9wdGlvbnMuZ2V0RXh0ZW5zaW9uRnJvbUZpbGVUeXBlKHZhbHVlKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5maWxlTmFtZS5lbmRzV2l0aChleHRlbnNpb24pKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2xkRXh0ID0gJy4nICsgdGhpcy5maWxlTmFtZS5zcGxpdCgnLicpLnBvcCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld05hbWUgPSB0aGlzLmZpbGVOYW1lLnJlcGxhY2Uob2xkRXh0LCBleHRlbnNpb24pO1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZpbGVFeHRlbnNpb24gPSBleHRlbnNpb247XG4gICAgICAgICAgICAgICAgdGhpcy5maWxlTmFtZSA9IG5ld05hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNldERlbGltaXRlcih2YWx1ZT8pIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09ICcnICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZURlbGltaXRlciA9IHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLmZpbGVUeXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBDc3ZGaWxlVHlwZXMuQ1NWOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZURlbGltaXRlciA9ICcsJztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBDc3ZGaWxlVHlwZXMuVFNWOlxuICAgICAgICAgICAgICAgIGNhc2UgQ3N2RmlsZVR5cGVzLlRBQjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVEZWxpbWl0ZXIgPSAnXFx0JztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogVGhpcyBlbnVtZXJhdGlvbiBpcyB1c2VkIHRvIGNvbmZpZ3VyZSB0aGUgZGVmYXVsdCB2YWx1ZSBzZXBhcmF0b3JcbiAqIGFzIHdlbGwgYXMgdGhlIGRlZmF1bHQgZmlsZSBleHRlbnNpb24gdXNlZCB3aGVuIHBlcmZvcm1pbmcgQ1NWIGV4cG9ydGluZy5cbiAqL1xuZXhwb3J0IGVudW0gQ3N2RmlsZVR5cGVzIHtcbiAgICAvKipcbiAgICAgKiBDaGFyYWN0ZXIgU2VwYXJhdGVkIFZhbHVlcywgZGVmYXVsdCBzZXBhcmF0b3IgaXMgXCJjb21tYVwiLCBkZWZhdWx0IGZpbGUgZXh0ZW5zaW9uIGlzIC5jc3ZcbiAgICAgKi9cbiAgICBDU1YsXG4gICAgLyoqXG4gICAgICogVGFiIFNlcGFyYXRlZCBWYWx1ZXMsIGRlZmF1bHQgc2VwYXJhdG9yIGlzIHRhYiwgZGVmYXVsdCBmaWxlIGV4dGVuc2lvbiBpcyAudHN2XG4gICAgICovXG4gICAgVFNWLFxuICAgIC8qKlxuICAgICAqIFRhYiBTZXBhcmF0ZWQgVmFsdWVzLCBkZWZhdWx0IHNlcGFyYXRvciBpcyB0YWIsIGRlZmF1bHQgZmlsZSBleHRlbnNpb24gaXMgLnRhYlxuICAgICAqL1xuICAgIFRBQlxufVxuIl19
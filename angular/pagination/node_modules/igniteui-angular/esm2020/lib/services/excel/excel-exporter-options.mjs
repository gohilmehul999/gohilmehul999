import { IgxExporterOptionsBase } from '../exporter-common/exporter-options-base';
/**
 * Objects of this class are used to configure the Excel exporting process.
 */
export class IgxExcelExporterOptions extends IgxExporterOptionsBase {
    constructor(fileName) {
        super(fileName, '.xlsx');
        /**
         * Specifies if column pinning should be ignored. If ignoreColumnsOrder is set to true,
         * this option will always be considered as set to true.
         * ```typescript
         * let ignorePinning = this.exportOptions.ignorePinning;
         * this.exportOptions.ignorePinning = true;
         * ```
         *
         * @memberof IgxExcelExporterOptions
         */
        this.ignorePinning = false;
        /**
         * Specifies whether the exported data should be formatted as Excel table. (True by default)
         * ```typescript
         * let exportAsTable = this.exportOptions.exportAsTable;
         * this.exportOptions.exportAsTable = false;
         * ```
         *
         * @memberof IgxExcelExporterOptions
         */
        this.exportAsTable = true;
    }
    /**
     * Gets the width of the columns in the exported excel file.
     * ```typescript
     * let width = this.exportOptions.columnWidth;
     * ```
     *
     * @memberof IgxExcelExporterOptions
     */
    get columnWidth() {
        return this._columnWidth;
    }
    /**
     * Sets the width of the columns in the exported excel file. If left unspecified,
     * the width of the column or the default width of the excel columns will be used.
     * ```typescript
     * this.exportOptions.columnWidth = 55;
     * ```
     *
     * @memberof IgxExcelExporterOptions
     */
    set columnWidth(value) {
        if (value < 0) {
            throw Error('Invalid value for column width!');
        }
        this._columnWidth = value;
    }
    /**
     * Gets the height of the rows in the exported excel file.
     * ```typescript
     * let height = this.exportOptions.rowHeight;
     * ```
     *
     * @memberof IgxExcelExporterOptions
     */
    get rowHeight() {
        return this._rowHeight;
    }
    /**
     * Sets the height of the rows in the exported excel file. If left unspecified or 0,
     * the default height of the excel rows will be used.
     * ```typescript
     * this.exportOptions.rowHeight = 25;
     * ```
     *
     * @memberof IgxExcelExporterOptions
     */
    set rowHeight(value) {
        if (value < 0) {
            throw Error('Invalid value for row height!');
        }
        this._rowHeight = value;
    }
    /**
     * Gets the name of the worksheet in the exported excel file.
     * ```typescript
     * let worksheetName = this.exportOptions.worksheetName;
     * ```
     *
     * @memberof IgxExcelExporterOptions
     */
    get worksheetName() {
        if (this._worksheetName === undefined || this._worksheetName === null) {
            return 'Sheet1';
        }
        return this._worksheetName;
    }
    /**
     * Sets the name of the worksheet in the exported excel file.
     * ```typescript
     * this.exportOptions.worksheetName = "Worksheet";
     * ```
     *
     * @memberof IgxExcelExporterOptions
     */
    set worksheetName(value) {
        this._worksheetName = value;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhjZWwtZXhwb3J0ZXItb3B0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2lnbml0ZXVpLWFuZ3VsYXIvc3JjL2xpYi9zZXJ2aWNlcy9leGNlbC9leGNlbC1leHBvcnRlci1vcHRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBRWxGOztHQUVHO0FBQ0gsTUFBTSxPQUFPLHVCQUF3QixTQUFRLHNCQUFzQjtJQTRCL0QsWUFBWSxRQUFnQjtRQUN4QixLQUFLLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBNUI3Qjs7Ozs7Ozs7O1dBU0c7UUFDSSxrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUU3Qjs7Ozs7Ozs7V0FRRztRQUNJLGtCQUFhLEdBQUcsSUFBSSxDQUFDO0lBUTVCLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsSUFBVyxXQUFXO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxJQUFXLFdBQVcsQ0FBQyxLQUFhO1FBQ2hDLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtZQUNYLE1BQU0sS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7U0FDbEQ7UUFFRCxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztJQUM5QixDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILElBQVcsU0FBUztRQUNoQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsSUFBVyxTQUFTLENBQUMsS0FBYTtRQUM5QixJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7WUFDWCxNQUFNLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1NBQ2hEO1FBRUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7SUFDNUIsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxJQUFXLGFBQWE7UUFDcEIsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLElBQUksRUFBRTtZQUNuRSxPQUFPLFFBQVEsQ0FBQztTQUNuQjtRQUVELE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUMvQixDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILElBQVcsYUFBYSxDQUFDLEtBQWE7UUFDbEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7SUFDaEMsQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSWd4RXhwb3J0ZXJPcHRpb25zQmFzZSB9IGZyb20gJy4uL2V4cG9ydGVyLWNvbW1vbi9leHBvcnRlci1vcHRpb25zLWJhc2UnO1xuXG4vKipcbiAqIE9iamVjdHMgb2YgdGhpcyBjbGFzcyBhcmUgdXNlZCB0byBjb25maWd1cmUgdGhlIEV4Y2VsIGV4cG9ydGluZyBwcm9jZXNzLlxuICovXG5leHBvcnQgY2xhc3MgSWd4RXhjZWxFeHBvcnRlck9wdGlvbnMgZXh0ZW5kcyBJZ3hFeHBvcnRlck9wdGlvbnNCYXNlIHtcbiAgICAvKipcbiAgICAgKiBTcGVjaWZpZXMgaWYgY29sdW1uIHBpbm5pbmcgc2hvdWxkIGJlIGlnbm9yZWQuIElmIGlnbm9yZUNvbHVtbnNPcmRlciBpcyBzZXQgdG8gdHJ1ZSxcbiAgICAgKiB0aGlzIG9wdGlvbiB3aWxsIGFsd2F5cyBiZSBjb25zaWRlcmVkIGFzIHNldCB0byB0cnVlLlxuICAgICAqIGBgYHR5cGVzY3JpcHRcbiAgICAgKiBsZXQgaWdub3JlUGlubmluZyA9IHRoaXMuZXhwb3J0T3B0aW9ucy5pZ25vcmVQaW5uaW5nO1xuICAgICAqIHRoaXMuZXhwb3J0T3B0aW9ucy5pZ25vcmVQaW5uaW5nID0gdHJ1ZTtcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBJZ3hFeGNlbEV4cG9ydGVyT3B0aW9uc1xuICAgICAqL1xuICAgIHB1YmxpYyBpZ25vcmVQaW5uaW5nID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZpZXMgd2hldGhlciB0aGUgZXhwb3J0ZWQgZGF0YSBzaG91bGQgYmUgZm9ybWF0dGVkIGFzIEV4Y2VsIHRhYmxlLiAoVHJ1ZSBieSBkZWZhdWx0KVxuICAgICAqIGBgYHR5cGVzY3JpcHRcbiAgICAgKiBsZXQgZXhwb3J0QXNUYWJsZSA9IHRoaXMuZXhwb3J0T3B0aW9ucy5leHBvcnRBc1RhYmxlO1xuICAgICAqIHRoaXMuZXhwb3J0T3B0aW9ucy5leHBvcnRBc1RhYmxlID0gZmFsc2U7XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgSWd4RXhjZWxFeHBvcnRlck9wdGlvbnNcbiAgICAgKi9cbiAgICBwdWJsaWMgZXhwb3J0QXNUYWJsZSA9IHRydWU7XG5cbiAgICBwcml2YXRlIF9jb2x1bW5XaWR0aDogbnVtYmVyO1xuICAgIHByaXZhdGUgX3Jvd0hlaWdodDogbnVtYmVyO1xuICAgIHByaXZhdGUgX3dvcmtzaGVldE5hbWU6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKGZpbGVOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIoZmlsZU5hbWUsICcueGxzeCcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHdpZHRoIG9mIHRoZSBjb2x1bW5zIGluIHRoZSBleHBvcnRlZCBleGNlbCBmaWxlLlxuICAgICAqIGBgYHR5cGVzY3JpcHRcbiAgICAgKiBsZXQgd2lkdGggPSB0aGlzLmV4cG9ydE9wdGlvbnMuY29sdW1uV2lkdGg7XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgSWd4RXhjZWxFeHBvcnRlck9wdGlvbnNcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGNvbHVtbldpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb2x1bW5XaWR0aDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSB3aWR0aCBvZiB0aGUgY29sdW1ucyBpbiB0aGUgZXhwb3J0ZWQgZXhjZWwgZmlsZS4gSWYgbGVmdCB1bnNwZWNpZmllZCxcbiAgICAgKiB0aGUgd2lkdGggb2YgdGhlIGNvbHVtbiBvciB0aGUgZGVmYXVsdCB3aWR0aCBvZiB0aGUgZXhjZWwgY29sdW1ucyB3aWxsIGJlIHVzZWQuXG4gICAgICogYGBgdHlwZXNjcmlwdFxuICAgICAqIHRoaXMuZXhwb3J0T3B0aW9ucy5jb2x1bW5XaWR0aCA9IDU1O1xuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIElneEV4Y2VsRXhwb3J0ZXJPcHRpb25zXG4gICAgICovXG4gICAgcHVibGljIHNldCBjb2x1bW5XaWR0aCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIGlmICh2YWx1ZSA8IDApIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdJbnZhbGlkIHZhbHVlIGZvciBjb2x1bW4gd2lkdGghJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jb2x1bW5XaWR0aCA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGhlaWdodCBvZiB0aGUgcm93cyBpbiB0aGUgZXhwb3J0ZWQgZXhjZWwgZmlsZS5cbiAgICAgKiBgYGB0eXBlc2NyaXB0XG4gICAgICogbGV0IGhlaWdodCA9IHRoaXMuZXhwb3J0T3B0aW9ucy5yb3dIZWlnaHQ7XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgSWd4RXhjZWxFeHBvcnRlck9wdGlvbnNcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHJvd0hlaWdodCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fcm93SGVpZ2h0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGhlaWdodCBvZiB0aGUgcm93cyBpbiB0aGUgZXhwb3J0ZWQgZXhjZWwgZmlsZS4gSWYgbGVmdCB1bnNwZWNpZmllZCBvciAwLFxuICAgICAqIHRoZSBkZWZhdWx0IGhlaWdodCBvZiB0aGUgZXhjZWwgcm93cyB3aWxsIGJlIHVzZWQuXG4gICAgICogYGBgdHlwZXNjcmlwdFxuICAgICAqIHRoaXMuZXhwb3J0T3B0aW9ucy5yb3dIZWlnaHQgPSAyNTtcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBJZ3hFeGNlbEV4cG9ydGVyT3B0aW9uc1xuICAgICAqL1xuICAgIHB1YmxpYyBzZXQgcm93SGVpZ2h0KHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHZhbHVlIDwgMCkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0ludmFsaWQgdmFsdWUgZm9yIHJvdyBoZWlnaHQhJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9yb3dIZWlnaHQgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBuYW1lIG9mIHRoZSB3b3Jrc2hlZXQgaW4gdGhlIGV4cG9ydGVkIGV4Y2VsIGZpbGUuXG4gICAgICogYGBgdHlwZXNjcmlwdFxuICAgICAqIGxldCB3b3Jrc2hlZXROYW1lID0gdGhpcy5leHBvcnRPcHRpb25zLndvcmtzaGVldE5hbWU7XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgSWd4RXhjZWxFeHBvcnRlck9wdGlvbnNcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHdvcmtzaGVldE5hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMuX3dvcmtzaGVldE5hbWUgPT09IHVuZGVmaW5lZCB8fCB0aGlzLl93b3Jrc2hlZXROYW1lID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gJ1NoZWV0MSc7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fd29ya3NoZWV0TmFtZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBuYW1lIG9mIHRoZSB3b3Jrc2hlZXQgaW4gdGhlIGV4cG9ydGVkIGV4Y2VsIGZpbGUuXG4gICAgICogYGBgdHlwZXNjcmlwdFxuICAgICAqIHRoaXMuZXhwb3J0T3B0aW9ucy53b3Jrc2hlZXROYW1lID0gXCJXb3Jrc2hlZXRcIjtcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBJZ3hFeGNlbEV4cG9ydGVyT3B0aW9uc1xuICAgICAqL1xuICAgIHB1YmxpYyBzZXQgd29ya3NoZWV0TmFtZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX3dvcmtzaGVldE5hbWUgPSB2YWx1ZTtcbiAgICB9XG59XG4iXX0=
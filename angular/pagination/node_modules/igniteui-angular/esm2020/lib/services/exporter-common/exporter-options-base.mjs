export class IgxExporterOptionsBase {
    constructor(fileName, _fileExtension) {
        this._fileExtension = _fileExtension;
        /**
         * Specifies whether hidden columns should be exported.
         * ```typescript
         * let ignoreColumnsVisibility = this.exportOptions.ignoreColumnsVisibility;
         * this.exportOptions.ignoreColumnsVisibility = true;
         * ```
         *
         * @memberof IgxExporterOptionsBase
         */
        this.ignoreColumnsVisibility = false;
        /**
         * Specifies whether filtered out rows should be exported.
         * ```typescript
         * let ignoreFiltering = this.exportOptions.ignoreFiltering;
         * this.exportOptions.ignoreFiltering = true;
         * ```
         *
         * @memberof IgxExporterOptionsBase
         */
        this.ignoreFiltering = false;
        /**
         * Specifies if the exporter should ignore the current column order in the IgxGrid.
         * ```typescript
         * let ignoreColumnsOrder = this.exportOptions.ignoreColumnsOrder;
         * this.exportOptions.ignoreColumnsOrder = true;
         * ```
         *
         * @memberof IgxExporterOptionsBase
         */
        this.ignoreColumnsOrder = false;
        /**
         * Specifies whether the exported data should be sorted as in the provided IgxGrid.
         * When you export grouped data, setting ignoreSorting to true will cause
         * the grouping to fail because it relies on the sorting of the records.
         * ```typescript
         * let ignoreSorting = this.exportOptions.ignoreSorting;
         * this.exportOptions.ignoreSorting = true;
         * ```
         *
         * @memberof IgxExporterOptionsBase
         */
        this.ignoreSorting = false;
        /**
         * Specifies whether the exported data should be grouped as in the provided IgxGrid.
         * ```typescript
         * let ignoreGrouping = this.exportOptions.ignoreGrouping;
         * this.exportOptions.ignoreGrouping = true;
         * ```
         *
         * @memberof IgxExporterOptionsBase
         */
        this.ignoreGrouping = false;
        /**
         * Specifies whether the exported data should include multi column headers as in the provided IgxGrid.
         * ```typescript
         * let ignoreMultiColumnHeaders = this.exportOptions.ignoreMultiColumnHeaders;
         * this.exportOptions.ignoreMultiColumnHeaders = true;
         * ```
         *
         * @memberof IgxExporterOptionsBase
         */
        this.ignoreMultiColumnHeaders = false;
        /**
         * Specifies whether the exported data should have frozen headers.
         * ```typescript
         * let freezeHeaders = this.exportOptions.freezeHeaders;
         * this.exportOptions.freezeHeaders = true;
         * ```
         *
         * @memberof IgxExporterOptionsBase
         */
        this.freezeHeaders = false;
        /**
         * Specifies whether the headers should be exported if there is no data.
         * ```typescript
         * let alwaysExportHeaders = this.exportOptions.alwaysExportHeaders;
         * this.exportOptions.alwaysExportHeaders = false;
         * ```
         *
         * @memberof IgxExporterOptionsBase
         */
        this.alwaysExportHeaders = true;
        this.setFileName(fileName);
    }
    setFileName(fileName) {
        this._fileName = fileName + (fileName.endsWith(this._fileExtension) === false ? this._fileExtension : '');
    }
    /**
     * Gets the file name which will be used for the exporting operation.
     * ```typescript
     * let fileName = this.exportOptions.fileName;
     * ```
     *
     * @memberof IgxExporterOptionsBase
     */
    get fileName() {
        return this._fileName;
    }
    /**
     * Sets the file name which will be used for the exporting operation.
     * ```typescript
     * this.exportOptions.fileName = 'exportedData01';
     * ```
     *
     * @memberof IgxExporterOptionsBase
     */
    set fileName(value) {
        this.setFileName(value);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0ZXItb3B0aW9ucy1iYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaWduaXRldWktYW5ndWxhci9zcmMvbGliL3NlcnZpY2VzL2V4cG9ydGVyLWNvbW1vbi9leHBvcnRlci1vcHRpb25zLWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxPQUFnQixzQkFBc0I7SUE2RnhDLFlBQVksUUFBZ0IsRUFBWSxjQUFzQjtRQUF0QixtQkFBYyxHQUFkLGNBQWMsQ0FBUTtRQTVGOUQ7Ozs7Ozs7O1dBUUc7UUFDSSw0QkFBdUIsR0FBRyxLQUFLLENBQUM7UUFFdkM7Ozs7Ozs7O1dBUUc7UUFDSSxvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUUvQjs7Ozs7Ozs7V0FRRztRQUNJLHVCQUFrQixHQUFHLEtBQUssQ0FBQztRQUVsQzs7Ozs7Ozs7OztXQVVHO1FBQ0ksa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFFN0I7Ozs7Ozs7O1dBUUc7UUFDSSxtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUU5Qjs7Ozs7Ozs7V0FRRztRQUNLLDZCQUF3QixHQUFHLEtBQUssQ0FBQztRQUV6Qzs7Ozs7Ozs7V0FRRztRQUNLLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBRTlCOzs7Ozs7OztXQVFHO1FBQ0ssd0JBQW1CLEdBQUcsSUFBSSxDQUFDO1FBSy9CLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVPLFdBQVcsQ0FBQyxRQUFnQjtRQUNoQyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDOUcsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxJQUFXLFFBQVE7UUFDZixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxJQUFXLFFBQVEsQ0FBQyxLQUFLO1FBQ3JCLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQztDQUVKIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGFic3RyYWN0IGNsYXNzIElneEV4cG9ydGVyT3B0aW9uc0Jhc2Uge1xuICAgIC8qKlxuICAgICAqIFNwZWNpZmllcyB3aGV0aGVyIGhpZGRlbiBjb2x1bW5zIHNob3VsZCBiZSBleHBvcnRlZC5cbiAgICAgKiBgYGB0eXBlc2NyaXB0XG4gICAgICogbGV0IGlnbm9yZUNvbHVtbnNWaXNpYmlsaXR5ID0gdGhpcy5leHBvcnRPcHRpb25zLmlnbm9yZUNvbHVtbnNWaXNpYmlsaXR5O1xuICAgICAqIHRoaXMuZXhwb3J0T3B0aW9ucy5pZ25vcmVDb2x1bW5zVmlzaWJpbGl0eSA9IHRydWU7XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgSWd4RXhwb3J0ZXJPcHRpb25zQmFzZVxuICAgICAqL1xuICAgIHB1YmxpYyBpZ25vcmVDb2x1bW5zVmlzaWJpbGl0eSA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogU3BlY2lmaWVzIHdoZXRoZXIgZmlsdGVyZWQgb3V0IHJvd3Mgc2hvdWxkIGJlIGV4cG9ydGVkLlxuICAgICAqIGBgYHR5cGVzY3JpcHRcbiAgICAgKiBsZXQgaWdub3JlRmlsdGVyaW5nID0gdGhpcy5leHBvcnRPcHRpb25zLmlnbm9yZUZpbHRlcmluZztcbiAgICAgKiB0aGlzLmV4cG9ydE9wdGlvbnMuaWdub3JlRmlsdGVyaW5nID0gdHJ1ZTtcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBJZ3hFeHBvcnRlck9wdGlvbnNCYXNlXG4gICAgICovXG4gICAgcHVibGljIGlnbm9yZUZpbHRlcmluZyA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogU3BlY2lmaWVzIGlmIHRoZSBleHBvcnRlciBzaG91bGQgaWdub3JlIHRoZSBjdXJyZW50IGNvbHVtbiBvcmRlciBpbiB0aGUgSWd4R3JpZC5cbiAgICAgKiBgYGB0eXBlc2NyaXB0XG4gICAgICogbGV0IGlnbm9yZUNvbHVtbnNPcmRlciA9IHRoaXMuZXhwb3J0T3B0aW9ucy5pZ25vcmVDb2x1bW5zT3JkZXI7XG4gICAgICogdGhpcy5leHBvcnRPcHRpb25zLmlnbm9yZUNvbHVtbnNPcmRlciA9IHRydWU7XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgSWd4RXhwb3J0ZXJPcHRpb25zQmFzZVxuICAgICAqL1xuICAgIHB1YmxpYyBpZ25vcmVDb2x1bW5zT3JkZXIgPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIFNwZWNpZmllcyB3aGV0aGVyIHRoZSBleHBvcnRlZCBkYXRhIHNob3VsZCBiZSBzb3J0ZWQgYXMgaW4gdGhlIHByb3ZpZGVkIElneEdyaWQuXG4gICAgICogV2hlbiB5b3UgZXhwb3J0IGdyb3VwZWQgZGF0YSwgc2V0dGluZyBpZ25vcmVTb3J0aW5nIHRvIHRydWUgd2lsbCBjYXVzZVxuICAgICAqIHRoZSBncm91cGluZyB0byBmYWlsIGJlY2F1c2UgaXQgcmVsaWVzIG9uIHRoZSBzb3J0aW5nIG9mIHRoZSByZWNvcmRzLlxuICAgICAqIGBgYHR5cGVzY3JpcHRcbiAgICAgKiBsZXQgaWdub3JlU29ydGluZyA9IHRoaXMuZXhwb3J0T3B0aW9ucy5pZ25vcmVTb3J0aW5nO1xuICAgICAqIHRoaXMuZXhwb3J0T3B0aW9ucy5pZ25vcmVTb3J0aW5nID0gdHJ1ZTtcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBJZ3hFeHBvcnRlck9wdGlvbnNCYXNlXG4gICAgICovXG4gICAgcHVibGljIGlnbm9yZVNvcnRpbmcgPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIFNwZWNpZmllcyB3aGV0aGVyIHRoZSBleHBvcnRlZCBkYXRhIHNob3VsZCBiZSBncm91cGVkIGFzIGluIHRoZSBwcm92aWRlZCBJZ3hHcmlkLlxuICAgICAqIGBgYHR5cGVzY3JpcHRcbiAgICAgKiBsZXQgaWdub3JlR3JvdXBpbmcgPSB0aGlzLmV4cG9ydE9wdGlvbnMuaWdub3JlR3JvdXBpbmc7XG4gICAgICogdGhpcy5leHBvcnRPcHRpb25zLmlnbm9yZUdyb3VwaW5nID0gdHJ1ZTtcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBJZ3hFeHBvcnRlck9wdGlvbnNCYXNlXG4gICAgICovXG4gICAgcHVibGljIGlnbm9yZUdyb3VwaW5nID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZpZXMgd2hldGhlciB0aGUgZXhwb3J0ZWQgZGF0YSBzaG91bGQgaW5jbHVkZSBtdWx0aSBjb2x1bW4gaGVhZGVycyBhcyBpbiB0aGUgcHJvdmlkZWQgSWd4R3JpZC5cbiAgICAgKiBgYGB0eXBlc2NyaXB0XG4gICAgICogbGV0IGlnbm9yZU11bHRpQ29sdW1uSGVhZGVycyA9IHRoaXMuZXhwb3J0T3B0aW9ucy5pZ25vcmVNdWx0aUNvbHVtbkhlYWRlcnM7XG4gICAgICogdGhpcy5leHBvcnRPcHRpb25zLmlnbm9yZU11bHRpQ29sdW1uSGVhZGVycyA9IHRydWU7XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgSWd4RXhwb3J0ZXJPcHRpb25zQmFzZVxuICAgICAqL1xuICAgICBwdWJsaWMgaWdub3JlTXVsdGlDb2x1bW5IZWFkZXJzID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZpZXMgd2hldGhlciB0aGUgZXhwb3J0ZWQgZGF0YSBzaG91bGQgaGF2ZSBmcm96ZW4gaGVhZGVycy5cbiAgICAgKiBgYGB0eXBlc2NyaXB0XG4gICAgICogbGV0IGZyZWV6ZUhlYWRlcnMgPSB0aGlzLmV4cG9ydE9wdGlvbnMuZnJlZXplSGVhZGVycztcbiAgICAgKiB0aGlzLmV4cG9ydE9wdGlvbnMuZnJlZXplSGVhZGVycyA9IHRydWU7XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgSWd4RXhwb3J0ZXJPcHRpb25zQmFzZVxuICAgICAqL1xuICAgICBwdWJsaWMgZnJlZXplSGVhZGVycyA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogU3BlY2lmaWVzIHdoZXRoZXIgdGhlIGhlYWRlcnMgc2hvdWxkIGJlIGV4cG9ydGVkIGlmIHRoZXJlIGlzIG5vIGRhdGEuXG4gICAgICogYGBgdHlwZXNjcmlwdFxuICAgICAqIGxldCBhbHdheXNFeHBvcnRIZWFkZXJzID0gdGhpcy5leHBvcnRPcHRpb25zLmFsd2F5c0V4cG9ydEhlYWRlcnM7XG4gICAgICogdGhpcy5leHBvcnRPcHRpb25zLmFsd2F5c0V4cG9ydEhlYWRlcnMgPSBmYWxzZTtcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBJZ3hFeHBvcnRlck9wdGlvbnNCYXNlXG4gICAgICovXG4gICAgIHB1YmxpYyBhbHdheXNFeHBvcnRIZWFkZXJzID0gdHJ1ZTtcblxuICAgIHByaXZhdGUgX2ZpbGVOYW1lOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihmaWxlTmFtZTogc3RyaW5nLCBwcm90ZWN0ZWQgX2ZpbGVFeHRlbnNpb246IHN0cmluZykge1xuICAgICAgICB0aGlzLnNldEZpbGVOYW1lKGZpbGVOYW1lKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldEZpbGVOYW1lKGZpbGVOYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZmlsZU5hbWUgPSBmaWxlTmFtZSArIChmaWxlTmFtZS5lbmRzV2l0aCh0aGlzLl9maWxlRXh0ZW5zaW9uKSA9PT0gZmFsc2UgPyB0aGlzLl9maWxlRXh0ZW5zaW9uIDogJycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGZpbGUgbmFtZSB3aGljaCB3aWxsIGJlIHVzZWQgZm9yIHRoZSBleHBvcnRpbmcgb3BlcmF0aW9uLlxuICAgICAqIGBgYHR5cGVzY3JpcHRcbiAgICAgKiBsZXQgZmlsZU5hbWUgPSB0aGlzLmV4cG9ydE9wdGlvbnMuZmlsZU5hbWU7XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgSWd4RXhwb3J0ZXJPcHRpb25zQmFzZVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgZmlsZU5hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maWxlTmFtZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBmaWxlIG5hbWUgd2hpY2ggd2lsbCBiZSB1c2VkIGZvciB0aGUgZXhwb3J0aW5nIG9wZXJhdGlvbi5cbiAgICAgKiBgYGB0eXBlc2NyaXB0XG4gICAgICogdGhpcy5leHBvcnRPcHRpb25zLmZpbGVOYW1lID0gJ2V4cG9ydGVkRGF0YTAxJztcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBJZ3hFeHBvcnRlck9wdGlvbnNCYXNlXG4gICAgICovXG4gICAgcHVibGljIHNldCBmaWxlTmFtZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLnNldEZpbGVOYW1lKHZhbHVlKTtcbiAgICB9XG5cbn1cbiJdfQ==
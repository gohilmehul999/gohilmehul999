const clear = (el) => el === 0 || Boolean(el);
const first = (arr) => arr[0];
const last = (arr) => arr[arr.length - 1];
export class IgxSummaryOperand {
    /**
     * Counts all the records in the data source.
     * If filtering is applied, counts only the filtered records.
     * ```typescript
     * IgxSummaryOperand.count(dataSource);
     * ```
     *
     * @memberof IgxSummaryOperand
     */
    static count(data) {
        return data.length;
    }
    /**
     * Executes the static `count` method and returns `IgxSummaryResult[]`.
     * ```typescript
     * interface IgxSummaryResult {
     *   key: string;
     *   label: string;
     *   summaryResult: any;
     * }
     * ```
     * Can be overridden in the inherited classes to provide customization for the `summary`.
     * ```typescript
     * class CustomSummary extends IgxSummaryOperand {
     *   constructor() {
     *     super();
     *   }
     *   public operate(data: any[], allData: any[], fieldName: string): IgxSummaryResult[] {
     *     const result = [];
     *     result.push({
     *       key: "test",
     *       label: "Test",
     *       summaryResult: IgxSummaryOperand.count(data)
     *     });
     *     return result;
     *   }
     * }
     * this.grid.getColumnByName('ColumnName').summaries = CustomSummary;
     * ```
     *
     * @memberof IgxSummaryOperand
     */
    operate(data = [], allData = [], fieldName) {
        return [{
                key: 'count',
                label: 'Count',
                defaultFormatting: false,
                summaryResult: IgxSummaryOperand.count(data)
            }];
    }
}
// @dynamic
export class IgxNumberSummaryOperand extends IgxSummaryOperand {
    /**
     * Returns the minimum numeric value in the provided data records.
     * If filtering is applied, returns the minimum value in the filtered data records.
     * ```typescript
     * IgxNumberSummaryOperand.min(data);
     * ```
     *
     * @memberof IgxNumberSummaryOperand
     */
    static min(data) {
        return data.length && data.filter(clear).length ? data.filter(clear).reduce((a, b) => Math.min(a, b)) : 0;
    }
    /**
     * Returns the maximum numeric value in the provided data records.
     * If filtering is applied, returns the maximum value in the filtered data records.
     * ```typescript
     * IgxNumberSummaryOperand.max(data);
     * ```
     *
     * @memberof IgxNumberSummaryOperand
     */
    static max(data) {
        return data.length && data.filter(clear).length ? data.filter(clear).reduce((a, b) => Math.max(a, b)) : 0;
    }
    /**
     * Returns the sum of the numeric values in the provided data records.
     * If filtering is applied, returns the sum of the numeric values in the data records.
     * ```typescript
     * IgxNumberSummaryOperand.sum(data);
     * ```
     *
     * @memberof IgxNumberSummaryOperand
     */
    static sum(data) {
        return data.length && data.filter(clear).length ? data.filter(clear).reduce((a, b) => +a + +b) : 0;
    }
    /**
     * Returns the average numeric value in the data provided data records.
     * If filtering is applied, returns the average numeric value in the filtered data records.
     * ```typescript
     * IgxSummaryOperand.average(data);
     * ```
     *
     * @memberof IgxNumberSummaryOperand
     */
    static average(data) {
        return data.length && data.filter(clear).length ? this.sum(data) / this.count(data) : 0;
    }
    /**
     * Executes the static methods and returns `IgxSummaryResult[]`.
     * ```typescript
     * interface IgxSummaryResult {
     *   key: string;
     *   label: string;
     *   summaryResult: any;
     * }
     * ```
     * Can be overridden in the inherited classes to provide customization for the `summary`.
     * ```typescript
     * class CustomNumberSummary extends IgxNumberSummaryOperand {
     *   constructor() {
     *     super();
     *   }
     *   public operate(data: any[], allData: any[], fieldName: string): IgxSummaryResult[] {
     *     const result = super.operate(data, allData, fieldName);
     *     result.push({
     *       key: "avg",
     *       label: "Avg",
     *       summaryResult: IgxNumberSummaryOperand.average(data)
     *     });
     *     result.push({
     *       key: 'mdn',
     *       label: 'Median',
     *       summaryResult: this.findMedian(data)
     *     });
     *     return result;
     *   }
     * }
     * this.grid.getColumnByName('ColumnName').summaries = CustomNumberSummary;
     * ```
     *
     * @memberof IgxNumberSummaryOperand
     */
    operate(data = [], allData = [], fieldName) {
        const result = super.operate(data, allData, fieldName);
        result.push({
            key: 'min',
            label: 'Min',
            defaultFormatting: true,
            summaryResult: IgxNumberSummaryOperand.min(data)
        });
        result.push({
            key: 'max',
            label: 'Max',
            defaultFormatting: true,
            summaryResult: IgxNumberSummaryOperand.max(data)
        });
        result.push({
            key: 'sum',
            label: 'Sum',
            defaultFormatting: true,
            summaryResult: IgxNumberSummaryOperand.sum(data)
        });
        result.push({
            key: 'average',
            label: 'Avg',
            defaultFormatting: true,
            summaryResult: IgxNumberSummaryOperand.average(data)
        });
        return result;
    }
}
// @dynamic
export class IgxDateSummaryOperand extends IgxSummaryOperand {
    /**
     * Returns the latest date value in the data records.
     * If filtering is applied, returns the latest date value in the filtered data records.
     * ```typescript
     * IgxDateSummaryOperand.latest(data);
     * ```
     *
     * @memberof IgxDateSummaryOperand
     */
    static latest(data) {
        return data.length && data.filter(clear).length ?
            first(data.filter(clear).sort((a, b) => new Date(b).valueOf() - new Date(a).valueOf())) : undefined;
    }
    /**
     * Returns the earliest date value in the data records.
     * If filtering is applied, returns the latest date value in the filtered data records.
     * ```typescript
     * IgxDateSummaryOperand.earliest(data);
     * ```
     *
     * @memberof IgxDateSummaryOperand
     */
    static earliest(data) {
        return data.length && data.filter(clear).length ?
            last(data.filter(clear).sort((a, b) => new Date(b).valueOf() - new Date(a).valueOf())) : undefined;
    }
    /**
     * Executes the static methods and returns `IgxSummaryResult[]`.
     * ```typescript
     * interface IgxSummaryResult {
     *   key: string;
     *   label: string;
     *   summaryResult: any;
     * }
     * ```
     * Can be overridden in the inherited classes to provide customization for the `summary`.
     * ```typescript
     * class CustomDateSummary extends IgxDateSummaryOperand {
     *   constructor() {
     *     super();
     *   }
     *   public operate(data: any[], allData: any[], fieldName: string): IgxSummaryResult[] {
     *     const result = super.operate(data, allData, fieldName);
     *     result.push({
     *       key: "deadline",
     *       label: "Deadline Date",
     *       summaryResult: this.calculateDeadline(data);
     *     });
     *     return result;
     *   }
     * }
     * this.grid.getColumnByName('ColumnName').summaries = CustomDateSummary;
     * ```
     *
     * @memberof IgxDateSummaryOperand
     */
    operate(data = [], allData = [], fieldName) {
        const result = super.operate(data, allData, fieldName);
        result.push({
            key: 'earliest',
            label: 'Earliest',
            defaultFormatting: true,
            summaryResult: IgxDateSummaryOperand.earliest(data)
        });
        result.push({
            key: 'latest',
            label: 'Latest',
            defaultFormatting: true,
            summaryResult: IgxDateSummaryOperand.latest(data)
        });
        return result;
    }
}
// @dynamic
export class IgxTimeSummaryOperand extends IgxSummaryOperand {
    /**
     * Returns the latest time value in the data records. Compare only the time part of the date.
     * If filtering is applied, returns the latest time value in the filtered data records.
     * ```typescript
     * IgxTimeSummaryOperand.latestTime(data);
     * ```
     *
     * @memberof IgxTimeSummaryOperand
     */
    static latestTime(data) {
        return data.length && data.filter(clear).length ?
            first(data.filter(clear).map(v => new Date(v)).sort((a, b) => new Date().setHours(b.getHours(), b.getMinutes(), b.getSeconds()) -
                new Date().setHours(a.getHours(), a.getMinutes(), a.getSeconds()))) : undefined;
    }
    /**
     * Returns the earliest time value in the data records. Compare only the time part of the date.
     * If filtering is applied, returns the earliest time value in the filtered data records.
     * ```typescript
     * IgxTimeSummaryOperand.earliestTime(data);
     * ```
     *
     * @memberof IgxTimeSummaryOperand
     */
    static earliestTime(data) {
        return data.length && data.filter(clear).length ?
            last(data.filter(clear).map(v => new Date(v)).sort((a, b) => new Date().setHours(b.getHours(), b.getMinutes(), b.getSeconds()) -
                new Date().setHours(a.getHours(), a.getMinutes(), a.getSeconds()))) : undefined;
    }
    /**
     * @memberof IgxTimeSummaryOperand
     */
    operate(data = [], allData = [], fieldName) {
        const result = super.operate(data, allData, fieldName);
        result.push({
            key: 'earliest',
            label: 'Earliest',
            defaultFormatting: true,
            summaryResult: IgxTimeSummaryOperand.earliestTime(data)
        });
        result.push({
            key: 'latest',
            label: 'Latest',
            defaultFormatting: true,
            summaryResult: IgxTimeSummaryOperand.latestTime(data)
        });
        return result;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1zdW1tYXJ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaWduaXRldWktYW5ndWxhci9zcmMvbGliL2dyaWRzL3N1bW1hcmllcy9ncmlkLXN1bW1hcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNkJBLE1BQU0sS0FBSyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxJQUFJLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUM5QyxNQUFNLEtBQUssR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzlCLE1BQU0sSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztBQUUxQyxNQUFNLE9BQU8saUJBQWlCO0lBQzFCOzs7Ozs7OztPQVFHO0lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFXO1FBQzNCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BNkJHO0lBQ0ksT0FBTyxDQUFDLE9BQWMsRUFBRSxFQUFFLFVBQWlCLEVBQUUsRUFBRSxTQUFrQjtRQUNwRSxPQUFPLENBQUM7Z0JBQ0osR0FBRyxFQUFFLE9BQU87Z0JBQ1osS0FBSyxFQUFFLE9BQU87Z0JBQ2QsaUJBQWlCLEVBQUUsS0FBSztnQkFDeEIsYUFBYSxFQUFFLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7YUFDL0MsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBRUQsV0FBVztBQUNYLE1BQU0sT0FBTyx1QkFBd0IsU0FBUSxpQkFBaUI7SUFDMUQ7Ozs7Ozs7O09BUUc7SUFDSSxNQUFNLENBQUMsR0FBRyxDQUFDLElBQVc7UUFDekIsT0FBTyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5RyxDQUFDO0lBQ0Q7Ozs7Ozs7O09BUUc7SUFDSSxNQUFNLENBQUMsR0FBRyxDQUFDLElBQVc7UUFDekIsT0FBTyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5RyxDQUFDO0lBQ0Q7Ozs7Ozs7O09BUUc7SUFDSSxNQUFNLENBQUMsR0FBRyxDQUFDLElBQVc7UUFDekIsT0FBTyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2RyxDQUFDO0lBQ0Q7Ozs7Ozs7O09BUUc7SUFDSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQVc7UUFDN0IsT0FBTyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENB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QWEsRUFBRSxxQkFBcUIsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO1NBQzFELENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDUixHQUFHLEVBQUUsUUFBUTtZQUNiLEtBQUssRUFBRSxRQUFRO1lBQ2YsaUJBQWlCLEVBQUUsSUFBSTtZQUN2QixhQUFhLEVBQUUscUJBQXFCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztTQUN4RCxDQUFDLENBQUM7UUFDSCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgaW50ZXJmYWNlIElTdW1tYXJ5RXhwcmVzc2lvbiB7XG4gICAgZmllbGROYW1lOiBzdHJpbmc7XG4gICAgY3VzdG9tU3VtbWFyeT86IGFueTtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSWd4U3VtbWFyeVJlc3VsdCB7XG4gICAga2V5OiBzdHJpbmc7XG4gICAgbGFiZWw6IHN0cmluZztcbiAgICBzdW1tYXJ5UmVzdWx0OiBhbnk7XG4gICAgLyoqXG4gICAgICogQXBwbHkgZGVmYXVsdCBmb3JtYXR0aW5nIGJhc2VkIG9uIHRoZSBncmlkIGNvbHVtbiB0eXBlLlxuICAgICAqIGBgYHR5cGVzY3JpcHRcbiAgICAgKiBjb25zdCByZXN1bHQ6IElneFN1bW1hcnlSZXN1bHQgPSB7XG4gICAgICogICBrZXk6ICdrZXknLFxuICAgICAqICAgbGFiZWw6ICdsYWJlbCcsXG4gICAgICogICBkZWZhdWx0Rm9ybWF0dGluZzogdHJ1ZVxuICAgICAqIH1cbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBJZ3hTdW1tYXJ5UmVzdWx0XG4gICAgICovXG4gICAgZGVmYXVsdEZvcm1hdHRpbmc/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElTdW1tYXJ5UmVjb3JkIHtcbiAgICBzdW1tYXJpZXM6IE1hcDxzdHJpbmcsIElneFN1bW1hcnlSZXN1bHRbXT47XG4gICAgbWF4PzogbnVtYmVyO1xuICAgIGNlbGxJbmRlbnRhdGlvbj86IG51bWJlcjtcbn1cblxuY29uc3QgY2xlYXIgPSAoZWwpID0+IGVsID09PSAwIHx8IEJvb2xlYW4oZWwpO1xuY29uc3QgZmlyc3QgPSAoYXJyKSA9PiBhcnJbMF07XG5jb25zdCBsYXN0ID0gKGFycikgPT4gYXJyW2Fyci5sZW5ndGggLSAxXTtcblxuZXhwb3J0IGNsYXNzIElneFN1bW1hcnlPcGVyYW5kIHtcbiAgICAvKipcbiAgICAgKiBDb3VudHMgYWxsIHRoZSByZWNvcmRzIGluIHRoZSBkYXRhIHNvdXJjZS5cbiAgICAgKiBJZiBmaWx0ZXJpbmcgaXMgYXBwbGllZCwgY291bnRzIG9ubHkgdGhlIGZpbHRlcmVkIHJlY29yZHMuXG4gICAgICogYGBgdHlwZXNjcmlwdFxuICAgICAqIElneFN1bW1hcnlPcGVyYW5kLmNvdW50KGRhdGFTb3VyY2UpO1xuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIElneFN1bW1hcnlPcGVyYW5kXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBjb3VudChkYXRhOiBhbnlbXSk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBkYXRhLmxlbmd0aDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRXhlY3V0ZXMgdGhlIHN0YXRpYyBgY291bnRgIG1ldGhvZCBhbmQgcmV0dXJucyBgSWd4U3VtbWFyeVJlc3VsdFtdYC5cbiAgICAgKiBgYGB0eXBlc2NyaXB0XG4gICAgICogaW50ZXJmYWNlIElneFN1bW1hcnlSZXN1bHQge1xuICAgICAqICAga2V5OiBzdHJpbmc7XG4gICAgICogICBsYWJlbDogc3RyaW5nO1xuICAgICAqICAgc3VtbWFyeVJlc3VsdDogYW55O1xuICAgICAqIH1cbiAgICAgKiBgYGBcbiAgICAgKiBDYW4gYmUgb3ZlcnJpZGRlbiBpbiB0aGUgaW5oZXJpdGVkIGNsYXNzZXMgdG8gcHJvdmlkZSBjdXN0b21pemF0aW9uIGZvciB0aGUgYHN1bW1hcnlgLlxuICAgICAqIGBgYHR5cGVzY3JpcHRcbiAgICAgKiBjbGFzcyBDdXN0b21TdW1tYXJ5IGV4dGVuZHMgSWd4U3VtbWFyeU9wZXJhbmQge1xuICAgICAqICAgY29uc3RydWN0b3IoKSB7XG4gICAgICogICAgIHN1cGVyKCk7XG4gICAgICogICB9XG4gICAgICogICBwdWJsaWMgb3BlcmF0ZShkYXRhOiBhbnlbXSwgYWxsRGF0YTogYW55W10sIGZpZWxkTmFtZTogc3RyaW5nKTogSWd4U3VtbWFyeVJlc3VsdFtdIHtcbiAgICAgKiAgICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgICogICAgIHJlc3VsdC5wdXNoKHtcbiAgICAgKiAgICAgICBrZXk6IFwidGVzdFwiLFxuICAgICAqICAgICAgIGxhYmVsOiBcIlRlc3RcIixcbiAgICAgKiAgICAgICBzdW1tYXJ5UmVzdWx0OiBJZ3hTdW1tYXJ5T3BlcmFuZC5jb3VudChkYXRhKVxuICAgICAqICAgICB9KTtcbiAgICAgKiAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgKiAgIH1cbiAgICAgKiB9XG4gICAgICogdGhpcy5ncmlkLmdldENvbHVtbkJ5TmFtZSgnQ29sdW1uTmFtZScpLnN1bW1hcmllcyA9IEN1c3RvbVN1bW1hcnk7XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgSWd4U3VtbWFyeU9wZXJhbmRcbiAgICAgKi9cbiAgICBwdWJsaWMgb3BlcmF0ZShkYXRhOiBhbnlbXSA9IFtdLCBhbGxEYXRhOiBhbnlbXSA9IFtdLCBmaWVsZE5hbWU/OiBzdHJpbmcpOiBJZ3hTdW1tYXJ5UmVzdWx0W10ge1xuICAgICAgICByZXR1cm4gW3tcbiAgICAgICAgICAgIGtleTogJ2NvdW50JyxcbiAgICAgICAgICAgIGxhYmVsOiAnQ291bnQnLFxuICAgICAgICAgICAgZGVmYXVsdEZvcm1hdHRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgc3VtbWFyeVJlc3VsdDogSWd4U3VtbWFyeU9wZXJhbmQuY291bnQoZGF0YSlcbiAgICAgICAgfV07XG4gICAgfVxufVxuXG4vLyBAZHluYW1pY1xuZXhwb3J0IGNsYXNzIElneE51bWJlclN1bW1hcnlPcGVyYW5kIGV4dGVuZHMgSWd4U3VtbWFyeU9wZXJhbmQge1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG1pbmltdW0gbnVtZXJpYyB2YWx1ZSBpbiB0aGUgcHJvdmlkZWQgZGF0YSByZWNvcmRzLlxuICAgICAqIElmIGZpbHRlcmluZyBpcyBhcHBsaWVkLCByZXR1cm5zIHRoZSBtaW5pbXVtIHZhbHVlIGluIHRoZSBmaWx0ZXJlZCBkYXRhIHJlY29yZHMuXG4gICAgICogYGBgdHlwZXNjcmlwdFxuICAgICAqIElneE51bWJlclN1bW1hcnlPcGVyYW5kLm1pbihkYXRhKTtcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBJZ3hOdW1iZXJTdW1tYXJ5T3BlcmFuZFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgbWluKGRhdGE6IGFueVtdKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGRhdGEubGVuZ3RoICYmIGRhdGEuZmlsdGVyKGNsZWFyKS5sZW5ndGggPyBkYXRhLmZpbHRlcihjbGVhcikucmVkdWNlKChhLCBiKSA9PiBNYXRoLm1pbihhLCBiKSkgOiAwO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBtYXhpbXVtIG51bWVyaWMgdmFsdWUgaW4gdGhlIHByb3ZpZGVkIGRhdGEgcmVjb3Jkcy5cbiAgICAgKiBJZiBmaWx0ZXJpbmcgaXMgYXBwbGllZCwgcmV0dXJucyB0aGUgbWF4aW11bSB2YWx1ZSBpbiB0aGUgZmlsdGVyZWQgZGF0YSByZWNvcmRzLlxuICAgICAqIGBgYHR5cGVzY3JpcHRcbiAgICAgKiBJZ3hOdW1iZXJTdW1tYXJ5T3BlcmFuZC5tYXgoZGF0YSk7XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgSWd4TnVtYmVyU3VtbWFyeU9wZXJhbmRcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIG1heChkYXRhOiBhbnlbXSk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBkYXRhLmxlbmd0aCAmJiBkYXRhLmZpbHRlcihjbGVhcikubGVuZ3RoID8gZGF0YS5maWx0ZXIoY2xlYXIpLnJlZHVjZSgoYSwgYikgPT4gTWF0aC5tYXgoYSwgYikpIDogMDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgc3VtIG9mIHRoZSBudW1lcmljIHZhbHVlcyBpbiB0aGUgcHJvdmlkZWQgZGF0YSByZWNvcmRzLlxuICAgICAqIElmIGZpbHRlcmluZyBpcyBhcHBsaWVkLCByZXR1cm5zIHRoZSBzdW0gb2YgdGhlIG51bWVyaWMgdmFsdWVzIGluIHRoZSBkYXRhIHJlY29yZHMuXG4gICAgICogYGBgdHlwZXNjcmlwdFxuICAgICAqIElneE51bWJlclN1bW1hcnlPcGVyYW5kLnN1bShkYXRhKTtcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBJZ3hOdW1iZXJTdW1tYXJ5T3BlcmFuZFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgc3VtKGRhdGE6IGFueVtdKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGRhdGEubGVuZ3RoICYmIGRhdGEuZmlsdGVyKGNsZWFyKS5sZW5ndGggPyBkYXRhLmZpbHRlcihjbGVhcikucmVkdWNlKChhLCBiKSA9PiArYSArICtiKSA6IDA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGF2ZXJhZ2UgbnVtZXJpYyB2YWx1ZSBpbiB0aGUgZGF0YSBwcm92aWRlZCBkYXRhIHJlY29yZHMuXG4gICAgICogSWYgZmlsdGVyaW5nIGlzIGFwcGxpZWQsIHJldHVybnMgdGhlIGF2ZXJhZ2UgbnVtZXJpYyB2YWx1ZSBpbiB0aGUgZmlsdGVyZWQgZGF0YSByZWNvcmRzLlxuICAgICAqIGBgYHR5cGVzY3JpcHRcbiAgICAgKiBJZ3hTdW1tYXJ5T3BlcmFuZC5hdmVyYWdlKGRhdGEpO1xuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIElneE51bWJlclN1bW1hcnlPcGVyYW5kXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBhdmVyYWdlKGRhdGE6IGFueVtdKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGRhdGEubGVuZ3RoICYmIGRhdGEuZmlsdGVyKGNsZWFyKS5sZW5ndGggPyB0aGlzLnN1bShkYXRhKSAvIHRoaXMuY291bnQoZGF0YSkgOiAwO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFeGVjdXRlcyB0aGUgc3RhdGljIG1ldGhvZHMgYW5kIHJldHVybnMgYElneFN1bW1hcnlSZXN1bHRbXWAuXG4gICAgICogYGBgdHlwZXNjcmlwdFxuICAgICAqIGludGVyZmFjZSBJZ3hTdW1tYXJ5UmVzdWx0IHtcbiAgICAgKiAgIGtleTogc3RyaW5nO1xuICAgICAqICAgbGFiZWw6IHN0cmluZztcbiAgICAgKiAgIHN1bW1hcnlSZXN1bHQ6IGFueTtcbiAgICAgKiB9XG4gICAgICogYGBgXG4gICAgICogQ2FuIGJlIG92ZXJyaWRkZW4gaW4gdGhlIGluaGVyaXRlZCBjbGFzc2VzIHRvIHByb3ZpZGUgY3VzdG9taXphdGlvbiBmb3IgdGhlIGBzdW1tYXJ5YC5cbiAgICAgKiBgYGB0eXBlc2NyaXB0XG4gICAgICogY2xhc3MgQ3VzdG9tTnVtYmVyU3VtbWFyeSBleHRlbmRzIElneE51bWJlclN1bW1hcnlPcGVyYW5kIHtcbiAgICAgKiAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAqICAgICBzdXBlcigpO1xuICAgICAqICAgfVxuICAgICAqICAgcHVibGljIG9wZXJhdGUoZGF0YTogYW55W10sIGFsbERhdGE6IGFueVtdLCBmaWVsZE5hbWU6IHN0cmluZyk6IElneFN1bW1hcnlSZXN1bHRbXSB7XG4gICAgICogICAgIGNvbnN0IHJlc3VsdCA9IHN1cGVyLm9wZXJhdGUoZGF0YSwgYWxsRGF0YSwgZmllbGROYW1lKTtcbiAgICAgKiAgICAgcmVzdWx0LnB1c2goe1xuICAgICAqICAgICAgIGtleTogXCJhdmdcIixcbiAgICAgKiAgICAgICBsYWJlbDogXCJBdmdcIixcbiAgICAgKiAgICAgICBzdW1tYXJ5UmVzdWx0OiBJZ3hOdW1iZXJTdW1tYXJ5T3BlcmFuZC5hdmVyYWdlKGRhdGEpXG4gICAgICogICAgIH0pO1xuICAgICAqICAgICByZXN1bHQucHVzaCh7XG4gICAgICogICAgICAga2V5OiAnbWRuJyxcbiAgICAgKiAgICAgICBsYWJlbDogJ01lZGlhbicsXG4gICAgICogICAgICAgc3VtbWFyeVJlc3VsdDogdGhpcy5maW5kTWVkaWFuKGRhdGEpXG4gICAgICogICAgIH0pO1xuICAgICAqICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAqICAgfVxuICAgICAqIH1cbiAgICAgKiB0aGlzLmdyaWQuZ2V0Q29sdW1uQnlOYW1lKCdDb2x1bW5OYW1lJykuc3VtbWFyaWVzID0gQ3VzdG9tTnVtYmVyU3VtbWFyeTtcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBJZ3hOdW1iZXJTdW1tYXJ5T3BlcmFuZFxuICAgICAqL1xuICAgIHB1YmxpYyBvcGVyYXRlKGRhdGE6IGFueVtdID0gW10sIGFsbERhdGE6IGFueVtdID0gW10sIGZpZWxkTmFtZT86IHN0cmluZyk6IElneFN1bW1hcnlSZXN1bHRbXSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHN1cGVyLm9wZXJhdGUoZGF0YSwgYWxsRGF0YSwgZmllbGROYW1lKTtcbiAgICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICAgICAga2V5OiAnbWluJyxcbiAgICAgICAgICAgIGxhYmVsOiAnTWluJyxcbiAgICAgICAgICAgIGRlZmF1bHRGb3JtYXR0aW5nOiB0cnVlLFxuICAgICAgICAgICAgc3VtbWFyeVJlc3VsdDogSWd4TnVtYmVyU3VtbWFyeU9wZXJhbmQubWluKGRhdGEpXG4gICAgICAgIH0pO1xuICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgICBrZXk6ICdtYXgnLFxuICAgICAgICAgICAgbGFiZWw6ICdNYXgnLFxuICAgICAgICAgICAgZGVmYXVsdEZvcm1hdHRpbmc6IHRydWUsXG4gICAgICAgICAgICBzdW1tYXJ5UmVzdWx0OiBJZ3hOdW1iZXJTdW1tYXJ5T3BlcmFuZC5tYXgoZGF0YSlcbiAgICAgICAgfSk7XG4gICAgICAgIHJlc3VsdC5wdXNoKHtcbiAgICAgICAgICAgIGtleTogJ3N1bScsXG4gICAgICAgICAgICBsYWJlbDogJ1N1bScsXG4gICAgICAgICAgICBkZWZhdWx0Rm9ybWF0dGluZzogdHJ1ZSxcbiAgICAgICAgICAgIHN1bW1hcnlSZXN1bHQ6IElneE51bWJlclN1bW1hcnlPcGVyYW5kLnN1bShkYXRhKVxuICAgICAgICB9KTtcbiAgICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICAgICAga2V5OiAnYXZlcmFnZScsXG4gICAgICAgICAgICBsYWJlbDogJ0F2ZycsXG4gICAgICAgICAgICBkZWZhdWx0Rm9ybWF0dGluZzogdHJ1ZSxcbiAgICAgICAgICAgIHN1bW1hcnlSZXN1bHQ6IElneE51bWJlclN1bW1hcnlPcGVyYW5kLmF2ZXJhZ2UoZGF0YSlcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuXG4vLyBAZHluYW1pY1xuZXhwb3J0IGNsYXNzIElneERhdGVTdW1tYXJ5T3BlcmFuZCBleHRlbmRzIElneFN1bW1hcnlPcGVyYW5kIHtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBsYXRlc3QgZGF0ZSB2YWx1ZSBpbiB0aGUgZGF0YSByZWNvcmRzLlxuICAgICAqIElmIGZpbHRlcmluZyBpcyBhcHBsaWVkLCByZXR1cm5zIHRoZSBsYXRlc3QgZGF0ZSB2YWx1ZSBpbiB0aGUgZmlsdGVyZWQgZGF0YSByZWNvcmRzLlxuICAgICAqIGBgYHR5cGVzY3JpcHRcbiAgICAgKiBJZ3hEYXRlU3VtbWFyeU9wZXJhbmQubGF0ZXN0KGRhdGEpO1xuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIElneERhdGVTdW1tYXJ5T3BlcmFuZFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgbGF0ZXN0KGRhdGE6IGFueVtdKSB7XG4gICAgICAgIHJldHVybiBkYXRhLmxlbmd0aCAmJiBkYXRhLmZpbHRlcihjbGVhcikubGVuZ3RoID9cbiAgICAgICAgICAgIGZpcnN0KGRhdGEuZmlsdGVyKGNsZWFyKS5zb3J0KChhLCBiKSA9PiBuZXcgRGF0ZShiKS52YWx1ZU9mKCkgLSBuZXcgRGF0ZShhKS52YWx1ZU9mKCkpKSA6IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZWFybGllc3QgZGF0ZSB2YWx1ZSBpbiB0aGUgZGF0YSByZWNvcmRzLlxuICAgICAqIElmIGZpbHRlcmluZyBpcyBhcHBsaWVkLCByZXR1cm5zIHRoZSBsYXRlc3QgZGF0ZSB2YWx1ZSBpbiB0aGUgZmlsdGVyZWQgZGF0YSByZWNvcmRzLlxuICAgICAqIGBgYHR5cGVzY3JpcHRcbiAgICAgKiBJZ3hEYXRlU3VtbWFyeU9wZXJhbmQuZWFybGllc3QoZGF0YSk7XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgSWd4RGF0ZVN1bW1hcnlPcGVyYW5kXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBlYXJsaWVzdChkYXRhOiBhbnlbXSkge1xuICAgICAgICByZXR1cm4gZGF0YS5sZW5ndGggJiYgZGF0YS5maWx0ZXIoY2xlYXIpLmxlbmd0aCA/XG4gICAgICAgICAgICBsYXN0KGRhdGEuZmlsdGVyKGNsZWFyKS5zb3J0KChhLCBiKSA9PiBuZXcgRGF0ZShiKS52YWx1ZU9mKCkgLSBuZXcgRGF0ZShhKS52YWx1ZU9mKCkpKSA6IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRXhlY3V0ZXMgdGhlIHN0YXRpYyBtZXRob2RzIGFuZCByZXR1cm5zIGBJZ3hTdW1tYXJ5UmVzdWx0W11gLlxuICAgICAqIGBgYHR5cGVzY3JpcHRcbiAgICAgKiBpbnRlcmZhY2UgSWd4U3VtbWFyeVJlc3VsdCB7XG4gICAgICogICBrZXk6IHN0cmluZztcbiAgICAgKiAgIGxhYmVsOiBzdHJpbmc7XG4gICAgICogICBzdW1tYXJ5UmVzdWx0OiBhbnk7XG4gICAgICogfVxuICAgICAqIGBgYFxuICAgICAqIENhbiBiZSBvdmVycmlkZGVuIGluIHRoZSBpbmhlcml0ZWQgY2xhc3NlcyB0byBwcm92aWRlIGN1c3RvbWl6YXRpb24gZm9yIHRoZSBgc3VtbWFyeWAuXG4gICAgICogYGBgdHlwZXNjcmlwdFxuICAgICAqIGNsYXNzIEN1c3RvbURhdGVTdW1tYXJ5IGV4dGVuZHMgSWd4RGF0ZVN1bW1hcnlPcGVyYW5kIHtcbiAgICAgKiAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAqICAgICBzdXBlcigpO1xuICAgICAqICAgfVxuICAgICAqICAgcHVibGljIG9wZXJhdGUoZGF0YTogYW55W10sIGFsbERhdGE6IGFueVtdLCBmaWVsZE5hbWU6IHN0cmluZyk6IElneFN1bW1hcnlSZXN1bHRbXSB7XG4gICAgICogICAgIGNvbnN0IHJlc3VsdCA9IHN1cGVyLm9wZXJhdGUoZGF0YSwgYWxsRGF0YSwgZmllbGROYW1lKTtcbiAgICAgKiAgICAgcmVzdWx0LnB1c2goe1xuICAgICAqICAgICAgIGtleTogXCJkZWFkbGluZVwiLFxuICAgICAqICAgICAgIGxhYmVsOiBcIkRlYWRsaW5lIERhdGVcIixcbiAgICAgKiAgICAgICBzdW1tYXJ5UmVzdWx0OiB0aGlzLmNhbGN1bGF0ZURlYWRsaW5lKGRhdGEpO1xuICAgICAqICAgICB9KTtcbiAgICAgKiAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgKiAgIH1cbiAgICAgKiB9XG4gICAgICogdGhpcy5ncmlkLmdldENvbHVtbkJ5TmFtZSgnQ29sdW1uTmFtZScpLnN1bW1hcmllcyA9IEN1c3RvbURhdGVTdW1tYXJ5O1xuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIElneERhdGVTdW1tYXJ5T3BlcmFuZFxuICAgICAqL1xuICAgIHB1YmxpYyBvcGVyYXRlKGRhdGE6IGFueVtdID0gW10sIGFsbERhdGE6IGFueVtdID0gW10sICBmaWVsZE5hbWU/OiBzdHJpbmcpOiBJZ3hTdW1tYXJ5UmVzdWx0W10ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBzdXBlci5vcGVyYXRlKGRhdGEsIGFsbERhdGEsIGZpZWxkTmFtZSk7XG4gICAgICAgIHJlc3VsdC5wdXNoKHtcbiAgICAgICAgICAgIGtleTogJ2VhcmxpZXN0JyxcbiAgICAgICAgICAgIGxhYmVsOiAnRWFybGllc3QnLFxuICAgICAgICAgICAgZGVmYXVsdEZvcm1hdHRpbmc6IHRydWUsXG4gICAgICAgICAgICBzdW1tYXJ5UmVzdWx0OiBJZ3hEYXRlU3VtbWFyeU9wZXJhbmQuZWFybGllc3QoZGF0YSlcbiAgICAgICAgfSk7XG4gICAgICAgIHJlc3VsdC5wdXNoKHtcbiAgICAgICAgICAgIGtleTogJ2xhdGVzdCcsXG4gICAgICAgICAgICBsYWJlbDogJ0xhdGVzdCcsXG4gICAgICAgICAgICBkZWZhdWx0Rm9ybWF0dGluZzogdHJ1ZSxcbiAgICAgICAgICAgIHN1bW1hcnlSZXN1bHQ6IElneERhdGVTdW1tYXJ5T3BlcmFuZC5sYXRlc3QoZGF0YSlcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuXG4vLyBAZHluYW1pY1xuZXhwb3J0IGNsYXNzIElneFRpbWVTdW1tYXJ5T3BlcmFuZCBleHRlbmRzIElneFN1bW1hcnlPcGVyYW5kIHtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBsYXRlc3QgdGltZSB2YWx1ZSBpbiB0aGUgZGF0YSByZWNvcmRzLiBDb21wYXJlIG9ubHkgdGhlIHRpbWUgcGFydCBvZiB0aGUgZGF0ZS5cbiAgICAgKiBJZiBmaWx0ZXJpbmcgaXMgYXBwbGllZCwgcmV0dXJucyB0aGUgbGF0ZXN0IHRpbWUgdmFsdWUgaW4gdGhlIGZpbHRlcmVkIGRhdGEgcmVjb3Jkcy5cbiAgICAgKiBgYGB0eXBlc2NyaXB0XG4gICAgICogSWd4VGltZVN1bW1hcnlPcGVyYW5kLmxhdGVzdFRpbWUoZGF0YSk7XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgSWd4VGltZVN1bW1hcnlPcGVyYW5kXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBsYXRlc3RUaW1lKGRhdGE6IGFueVtdKSB7XG4gICAgICAgIHJldHVybiBkYXRhLmxlbmd0aCAmJiBkYXRhLmZpbHRlcihjbGVhcikubGVuZ3RoID9cbiAgICAgICAgICAgIGZpcnN0KGRhdGEuZmlsdGVyKGNsZWFyKS5tYXAodiA9PiBuZXcgRGF0ZSh2KSkuc29ydCgoYSwgYikgPT5cbiAgICAgICAgICAgICAgICBuZXcgRGF0ZSgpLnNldEhvdXJzKGIuZ2V0SG91cnMoKSwgYi5nZXRNaW51dGVzKCksIGIuZ2V0U2Vjb25kcygpKSAtXG4gICAgICAgICAgICAgICAgbmV3IERhdGUoKS5zZXRIb3VycyhhLmdldEhvdXJzKCksIGEuZ2V0TWludXRlcygpLCBhLmdldFNlY29uZHMoKSkpKSA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBlYXJsaWVzdCB0aW1lIHZhbHVlIGluIHRoZSBkYXRhIHJlY29yZHMuIENvbXBhcmUgb25seSB0aGUgdGltZSBwYXJ0IG9mIHRoZSBkYXRlLlxuICAgICAqIElmIGZpbHRlcmluZyBpcyBhcHBsaWVkLCByZXR1cm5zIHRoZSBlYXJsaWVzdCB0aW1lIHZhbHVlIGluIHRoZSBmaWx0ZXJlZCBkYXRhIHJlY29yZHMuXG4gICAgICogYGBgdHlwZXNjcmlwdFxuICAgICAqIElneFRpbWVTdW1tYXJ5T3BlcmFuZC5lYXJsaWVzdFRpbWUoZGF0YSk7XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgSWd4VGltZVN1bW1hcnlPcGVyYW5kXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBlYXJsaWVzdFRpbWUoZGF0YTogYW55W10pIHtcbiAgICAgICAgcmV0dXJuIGRhdGEubGVuZ3RoICYmIGRhdGEuZmlsdGVyKGNsZWFyKS5sZW5ndGggP1xuICAgICAgICAgICAgbGFzdChkYXRhLmZpbHRlcihjbGVhcikubWFwKHYgPT4gbmV3IERhdGUodikpLnNvcnQoKGEsIGIpID0+IG5ldyBEYXRlKCkuc2V0SG91cnMoYi5nZXRIb3VycygpLCBiLmdldE1pbnV0ZXMoKSwgYi5nZXRTZWNvbmRzKCkpIC1cbiAgICAgICAgICAgIG5ldyBEYXRlKCkuc2V0SG91cnMoYS5nZXRIb3VycygpLCBhLmdldE1pbnV0ZXMoKSwgYS5nZXRTZWNvbmRzKCkpKSkgOiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBtZW1iZXJvZiBJZ3hUaW1lU3VtbWFyeU9wZXJhbmRcbiAgICAgKi9cbiAgICBwdWJsaWMgb3BlcmF0ZShkYXRhOiBhbnlbXSA9IFtdLCBhbGxEYXRhOiBhbnlbXSA9IFtdLCAgZmllbGROYW1lPzogc3RyaW5nKTogSWd4U3VtbWFyeVJlc3VsdFtdIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gc3VwZXIub3BlcmF0ZShkYXRhLCBhbGxEYXRhLCBmaWVsZE5hbWUpO1xuICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgICBrZXk6ICdlYXJsaWVzdCcsXG4gICAgICAgICAgICBsYWJlbDogJ0VhcmxpZXN0JyxcbiAgICAgICAgICAgIGRlZmF1bHRGb3JtYXR0aW5nOiB0cnVlLFxuICAgICAgICAgICAgc3VtbWFyeVJlc3VsdDogSWd4VGltZVN1bW1hcnlPcGVyYW5kLmVhcmxpZXN0VGltZShkYXRhKVxuICAgICAgICB9KTtcbiAgICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICAgICAga2V5OiAnbGF0ZXN0JyxcbiAgICAgICAgICAgIGxhYmVsOiAnTGF0ZXN0JyxcbiAgICAgICAgICAgIGRlZmF1bHRGb3JtYXR0aW5nOiB0cnVlLFxuICAgICAgICAgICAgc3VtbWFyeVJlc3VsdDogSWd4VGltZVN1bW1hcnlPcGVyYW5kLmxhdGVzdFRpbWUoZGF0YSlcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuIl19
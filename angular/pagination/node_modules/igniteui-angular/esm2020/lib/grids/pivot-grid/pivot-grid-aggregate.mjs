import { CurrentResourceStrings } from '../../core/i18n/resources';
import { IgxDateSummaryOperand, IgxNumberSummaryOperand, IgxTimeSummaryOperand } from '../summaries/grid-summary';
export class IgxPivotAggregate {
    /**
     * Gets/Sets the resource strings.
     *
     * @remarks
     * By default it uses EN resources.
     */
    static set resourceStrings(value) {
        this._resourceStrings = Object.assign({}, this._resourceStrings, value);
    }
    static get resourceStrings() {
        return this._resourceStrings;
    }
    /**
     * Gets array with default aggregator function for base aggregation.
     * ```typescript
     * IgxPivotAggregate.aggregators();
     * ```
     *
     * @memberof IgxPivotAggregate
     */
    static aggregators() {
        return [{
                key: 'COUNT',
                label: this.resourceStrings.igx_grid_pivot_aggregate_count,
                aggregator: IgxPivotAggregate.count
            }];
    }
    /**
     * Counts all the records in the data source.
     * If filtering is applied, counts only the filtered records.
     * ```typescript
     * IgxSummaryOperand.count(dataSource);
     * ```
     *
     * @memberof IgxPivotAggregate
     */
    static count(members) {
        return members.length;
    }
}
IgxPivotAggregate._resourceStrings = CurrentResourceStrings.GridResStrings;
export class IgxPivotNumericAggregate extends IgxPivotAggregate {
    /**
     * Gets array with default aggregator function for numeric aggregation.
     * ```typescript
     * IgxPivotAggregate.aggregators();
     * ```
     *
     * @memberof IgxPivotAggregate
     */
    static aggregators() {
        let result = [];
        result = result.concat(super.aggregators());
        result.push({
            key: 'MIN',
            label: this.resourceStrings.igx_grid_pivot_aggregate_min,
            aggregator: IgxPivotNumericAggregate.min
        });
        result.push({
            key: 'MAX',
            label: this.resourceStrings.igx_grid_pivot_aggregate_max,
            aggregator: IgxPivotNumericAggregate.max
        });
        result.push({
            key: 'SUM',
            label: this.resourceStrings.igx_grid_pivot_aggregate_sum,
            aggregator: IgxPivotNumericAggregate.sum
        });
        result.push({
            key: 'AVG',
            label: this.resourceStrings.igx_grid_pivot_aggregate_avg,
            aggregator: IgxPivotNumericAggregate.average
        });
        return result;
    }
    /**
     * Returns the minimum numeric value in the provided data records.
     * If filtering is applied, returns the minimum value in the filtered data records.
     * ```typescript
     * IgxPivotNumericAggregate.min(members, data);
     * ```
     *
     * @memberof IgxPivotNumericAggregate
     */
    static min(members) {
        return IgxNumberSummaryOperand.min(members);
    }
    /**
     * Returns the maximum numeric value in the provided data records.
     * If filtering is applied, returns the maximum value in the filtered data records.
     * ```typescript
     * IgxPivotNumericAggregate.max(data);
     * ```
     *
     * @memberof IgxPivotNumericAggregate
     */
    static max(members) {
        return IgxNumberSummaryOperand.max(members);
    }
    /**
     * Returns the sum of the numeric values in the provided data records.
     * If filtering is applied, returns the sum of the numeric values in the data records.
     * ```typescript
     * IgxPivotNumericAggregate.sum(data);
     * ```
     *
     * @memberof IgxPivotNumericAggregate
     */
    static sum(members) {
        return IgxNumberSummaryOperand.sum(members);
    }
    /**
     * Returns the average numeric value in the data provided data records.
     * If filtering is applied, returns the average numeric value in the filtered data records.
     * ```typescript
     * IgxPivotNumericAggregate.average(data);
     * ```
     *
     * @memberof IgxPivotNumericAggregate
     */
    static average(members) {
        return IgxNumberSummaryOperand.average(members);
    }
}
export class IgxPivotDateAggregate extends IgxPivotAggregate {
    /**
     * Gets array with default aggregator function for date aggregation.
     * ```typescript
     * IgxPivotDateAggregate.aggregators();
     * ```
     *
     * @memberof IgxPivotAggregate
     */
    static aggregators() {
        let result = [];
        result = result.concat(super.aggregators());
        result.push({
            key: 'LATEST',
            label: this.resourceStrings.igx_grid_pivot_aggregate_date_latest,
            aggregator: IgxPivotDateAggregate.latest
        });
        result.push({
            key: 'EARLIEST',
            label: this.resourceStrings.igx_grid_pivot_aggregate_date_earliest,
            aggregator: IgxPivotDateAggregate.earliest
        });
        return result;
    }
    /**
     * Returns the latest date value in the data records.
     * If filtering is applied, returns the latest date value in the filtered data records.
     * ```typescript
     * IgxPivotDateAggregate.latest(data);
     * ```
     *
     * @memberof IgxPivotDateAggregate
     */
    static latest(members) {
        return IgxDateSummaryOperand.latest(members);
    }
    /**
     * Returns the earliest date value in the data records.
     * If filtering is applied, returns the latest date value in the filtered data records.
     * ```typescript
     * IgxPivotDateAggregate.earliest(data);
     * ```
     *
     * @memberof IgxPivotDateAggregate
     */
    static earliest(members) {
        return IgxDateSummaryOperand.earliest(members);
    }
}
export class IgxPivotTimeAggregate extends IgxPivotAggregate {
    /**
     * Gets array with default aggregator function for time aggregation.
     * ```typescript
     * IgxPivotTimeAggregate.aggregators();
     * ```
     *
     * @memberof IgxPivotAggregate
     */
    static aggregators() {
        let result = [];
        result = result.concat(super.aggregators());
        result.push({
            key: 'LATEST',
            label: this.resourceStrings.igx_grid_pivot_aggregate_time_latest,
            aggregator: IgxPivotTimeAggregate.latestTime
        });
        result.push({
            key: 'EARLIEST',
            label: this.resourceStrings.igx_grid_pivot_aggregate_time_earliest,
            aggregator: IgxPivotTimeAggregate.earliestTime
        });
        return result;
    }
    /**
     * Returns the latest time value in the data records. Compare only the time part of the date.
     * If filtering is applied, returns the latest time value in the filtered data records.
     * ```typescript
     * IgxPivotTimeAggregate.latestTime(data);
     * ```
     *
     * @memberof IgxPivotTimeAggregate
     */
    static latestTime(members) {
        return IgxTimeSummaryOperand.latestTime(members);
    }
    /**
     * Returns the earliest time value in the data records. Compare only the time part of the date.
     * If filtering is applied, returns the earliest time value in the filtered data records.
     * ```typescript
     * IgxPivotTimeAggregate.earliestTime(data);
     * ```
     *
     * @memberof IgxPivotTimeAggregate
     */
    static earliestTime(members) {
        return IgxTimeSummaryOperand.earliestTime(members);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGl2b3QtZ3JpZC1hZ2dyZWdhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9pZ25pdGV1aS1hbmd1bGFyL3NyYy9saWIvZ3JpZHMvcGl2b3QtZ3JpZC9waXZvdC1ncmlkLWFnZ3JlZ2F0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNuRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsdUJBQXVCLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUlsSCxNQUFNLE9BQU8saUJBQWlCO0lBRTFCOzs7OztPQUtHO0lBQ0ssTUFBTSxLQUFLLGVBQWUsQ0FBQyxLQUEyQjtRQUMxRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFFTSxNQUFNLEtBQUssZUFBZTtRQUM3QixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNJLE1BQU0sQ0FBQyxXQUFXO1FBQ3JCLE9BQU8sQ0FBQztnQkFDSixHQUFHLEVBQUUsT0FBTztnQkFDWixLQUFLLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyw4QkFBOEI7Z0JBQzFELFVBQVUsRUFBRSxpQkFBaUIsQ0FBQyxLQUFLO2FBQ3RDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRDs7Ozs7Ozs7T0FRRztJQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBaUI7UUFDakMsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDO0lBQzFCLENBQUM7O0FBekNjLGtDQUFnQixHQUFHLHNCQUFzQixDQUFDLGNBQWMsQ0FBQztBQTRDNUUsTUFBTSxPQUFPLHdCQUF5QixTQUFRLGlCQUFpQjtJQUUzRDs7Ozs7OztP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Q0FBQztJQUNuRCxDQUFDO0NBQ0o7QUFFRCxNQUFNLE9BQU8scUJBQXNCLFNBQVEsaUJBQWlCO0lBQ3hEOzs7Ozs7O09BT0c7SUFDSSxNQUFNLENBQUMsV0FBVztRQUNyQixJQUFJLE1BQU0sR0FBdUIsRUFBRSxDQUFDO1FBQ3BDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDUixHQUFHLEVBQUUsUUFBUTtZQUNiLEtBQUssRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLG9DQUFvQztZQUNoRSxVQUFVLEVBQUUscUJBQXFCLENBQUMsVUFBVTtTQUMvQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ1IsR0FBRyxFQUFFLFVBQVU7WUFDZixLQUFLLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxzQ0FBc0M7WUFDbEUsVUFBVSxFQUFFLHFCQUFxQixDQUFDLFlBQVk7U0FDakQsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0ksTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFjO1FBQ25DLE9BQU8scUJBQXFCLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNJLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBYztRQUNyQyxPQUFPLHFCQUFxQixDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2RCxDQUFDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJR3JpZFJlc291cmNlU3RyaW5ncyB9IGZyb20gJy4uLy4uL2NvcmUvaTE4bi9ncmlkLXJlc291cmNlcyc7XG5pbXBvcnQgeyBDdXJyZW50UmVzb3VyY2VTdHJpbmdzIH0gZnJvbSAnLi4vLi4vY29yZS9pMThuL3Jlc291cmNlcyc7XG5pbXBvcnQgeyBJZ3hEYXRlU3VtbWFyeU9wZXJhbmQsIElneE51bWJlclN1bW1hcnlPcGVyYW5kLCBJZ3hUaW1lU3VtbWFyeU9wZXJhbmQgfSBmcm9tICcuLi9zdW1tYXJpZXMvZ3JpZC1zdW1tYXJ5JztcbmltcG9ydCB7IElQaXZvdEFnZ3JlZ2F0b3IgfSBmcm9tICcuL3Bpdm90LWdyaWQuaW50ZXJmYWNlJztcblxuXG5leHBvcnQgY2xhc3MgSWd4UGl2b3RBZ2dyZWdhdGUge1xuICAgIHByaXZhdGUgc3RhdGljIF9yZXNvdXJjZVN0cmluZ3MgPSBDdXJyZW50UmVzb3VyY2VTdHJpbmdzLkdyaWRSZXNTdHJpbmdzO1xuICAgIC8qKlxuICAgICAqIEdldHMvU2V0cyB0aGUgcmVzb3VyY2Ugc3RyaW5ncy5cbiAgICAgKlxuICAgICAqIEByZW1hcmtzXG4gICAgICogQnkgZGVmYXVsdCBpdCB1c2VzIEVOIHJlc291cmNlcy5cbiAgICAgKi9cbiAgICAgcHVibGljIHN0YXRpYyBzZXQgcmVzb3VyY2VTdHJpbmdzKHZhbHVlOiBJR3JpZFJlc291cmNlU3RyaW5ncykge1xuICAgICAgICB0aGlzLl9yZXNvdXJjZVN0cmluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLl9yZXNvdXJjZVN0cmluZ3MsIHZhbHVlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldCByZXNvdXJjZVN0cmluZ3MoKTogSUdyaWRSZXNvdXJjZVN0cmluZ3Mge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVzb3VyY2VTdHJpbmdzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYXJyYXkgd2l0aCBkZWZhdWx0IGFnZ3JlZ2F0b3IgZnVuY3Rpb24gZm9yIGJhc2UgYWdncmVnYXRpb24uXG4gICAgICogYGBgdHlwZXNjcmlwdFxuICAgICAqIElneFBpdm90QWdncmVnYXRlLmFnZ3JlZ2F0b3JzKCk7XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgSWd4UGl2b3RBZ2dyZWdhdGVcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGFnZ3JlZ2F0b3JzKCkge1xuICAgICAgICByZXR1cm4gW3tcbiAgICAgICAgICAgIGtleTogJ0NPVU5UJyxcbiAgICAgICAgICAgIGxhYmVsOiB0aGlzLnJlc291cmNlU3RyaW5ncy5pZ3hfZ3JpZF9waXZvdF9hZ2dyZWdhdGVfY291bnQsXG4gICAgICAgICAgICBhZ2dyZWdhdG9yOiBJZ3hQaXZvdEFnZ3JlZ2F0ZS5jb3VudFxuICAgICAgICB9XTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ291bnRzIGFsbCB0aGUgcmVjb3JkcyBpbiB0aGUgZGF0YSBzb3VyY2UuXG4gICAgICogSWYgZmlsdGVyaW5nIGlzIGFwcGxpZWQsIGNvdW50cyBvbmx5IHRoZSBmaWx0ZXJlZCByZWNvcmRzLlxuICAgICAqIGBgYHR5cGVzY3JpcHRcbiAgICAgKiBJZ3hTdW1tYXJ5T3BlcmFuZC5jb3VudChkYXRhU291cmNlKTtcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBJZ3hQaXZvdEFnZ3JlZ2F0ZVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY291bnQobWVtYmVyczogbnVtYmVyW10pOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gbWVtYmVycy5sZW5ndGg7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgSWd4UGl2b3ROdW1lcmljQWdncmVnYXRlIGV4dGVuZHMgSWd4UGl2b3RBZ2dyZWdhdGUge1xuXG4gICAgLyoqXG4gICAgICogR2V0cyBhcnJheSB3aXRoIGRlZmF1bHQgYWdncmVnYXRvciBmdW5jdGlvbiBmb3IgbnVtZXJpYyBhZ2dyZWdhdGlvbi5cbiAgICAgKiBgYGB0eXBlc2NyaXB0XG4gICAgICogSWd4UGl2b3RBZ2dyZWdhdGUuYWdncmVnYXRvcnMoKTtcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBJZ3hQaXZvdEFnZ3JlZ2F0ZVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgYWdncmVnYXRvcnMoKSB7XG4gICAgICAgIGxldCByZXN1bHQ6IElQaXZvdEFnZ3JlZ2F0b3JbXSA9IFtdO1xuICAgICAgICByZXN1bHQgPSByZXN1bHQuY29uY2F0KHN1cGVyLmFnZ3JlZ2F0b3JzKCkpO1xuICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgICBrZXk6ICdNSU4nLFxuICAgICAgICAgICAgbGFiZWw6IHRoaXMucmVzb3VyY2VTdHJpbmdzLmlneF9ncmlkX3Bpdm90X2FnZ3JlZ2F0ZV9taW4sXG4gICAgICAgICAgICBhZ2dyZWdhdG9yOiBJZ3hQaXZvdE51bWVyaWNBZ2dyZWdhdGUubWluXG4gICAgICAgIH0pO1xuICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgICBrZXk6ICdNQVgnLFxuICAgICAgICAgICAgbGFiZWw6IHRoaXMucmVzb3VyY2VTdHJpbmdzLmlneF9ncmlkX3Bpdm90X2FnZ3JlZ2F0ZV9tYXgsXG4gICAgICAgICAgICBhZ2dyZWdhdG9yOiBJZ3hQaXZvdE51bWVyaWNBZ2dyZWdhdGUubWF4XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJlc3VsdC5wdXNoKHtcbiAgICAgICAgICAgIGtleTogJ1NVTScsXG4gICAgICAgICAgICBsYWJlbDogdGhpcy5yZXNvdXJjZVN0cmluZ3MuaWd4X2dyaWRfcGl2b3RfYWdncmVnYXRlX3N1bSxcbiAgICAgICAgICAgIGFnZ3JlZ2F0b3I6IElneFBpdm90TnVtZXJpY0FnZ3JlZ2F0ZS5zdW1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICAgICAga2V5OiAnQVZHJyxcbiAgICAgICAgICAgIGxhYmVsOiB0aGlzLnJlc291cmNlU3RyaW5ncy5pZ3hfZ3JpZF9waXZvdF9hZ2dyZWdhdGVfYXZnLFxuICAgICAgICAgICAgYWdncmVnYXRvcjogSWd4UGl2b3ROdW1lcmljQWdncmVnYXRlLmF2ZXJhZ2VcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbWluaW11bSBudW1lcmljIHZhbHVlIGluIHRoZSBwcm92aWRlZCBkYXRhIHJlY29yZHMuXG4gICAgICogSWYgZmlsdGVyaW5nIGlzIGFwcGxpZWQsIHJldHVybnMgdGhlIG1pbmltdW0gdmFsdWUgaW4gdGhlIGZpbHRlcmVkIGRhdGEgcmVjb3Jkcy5cbiAgICAgKiBgYGB0eXBlc2NyaXB0XG4gICAgICogSWd4UGl2b3ROdW1lcmljQWdncmVnYXRlLm1pbihtZW1iZXJzLCBkYXRhKTtcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBJZ3hQaXZvdE51bWVyaWNBZ2dyZWdhdGVcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIG1pbihtZW1iZXJzOiBudW1iZXJbXSk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBJZ3hOdW1iZXJTdW1tYXJ5T3BlcmFuZC5taW4obWVtYmVycyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbWF4aW11bSBudW1lcmljIHZhbHVlIGluIHRoZSBwcm92aWRlZCBkYXRhIHJlY29yZHMuXG4gICAgICogSWYgZmlsdGVyaW5nIGlzIGFwcGxpZWQsIHJldHVybnMgdGhlIG1heGltdW0gdmFsdWUgaW4gdGhlIGZpbHRlcmVkIGRhdGEgcmVjb3Jkcy5cbiAgICAgKiBgYGB0eXBlc2NyaXB0XG4gICAgICogSWd4UGl2b3ROdW1lcmljQWdncmVnYXRlLm1heChkYXRhKTtcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBJZ3hQaXZvdE51bWVyaWNBZ2dyZWdhdGVcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIG1heChtZW1iZXJzOiBudW1iZXJbXSk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBJZ3hOdW1iZXJTdW1tYXJ5T3BlcmFuZC5tYXgobWVtYmVycyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgc3VtIG9mIHRoZSBudW1lcmljIHZhbHVlcyBpbiB0aGUgcHJvdmlkZWQgZGF0YSByZWNvcmRzLlxuICAgICAqIElmIGZpbHRlcmluZyBpcyBhcHBsaWVkLCByZXR1cm5zIHRoZSBzdW0gb2YgdGhlIG51bWVyaWMgdmFsdWVzIGluIHRoZSBkYXRhIHJlY29yZHMuXG4gICAgICogYGBgdHlwZXNjcmlwdFxuICAgICAqIElneFBpdm90TnVtZXJpY0FnZ3JlZ2F0ZS5zdW0oZGF0YSk7XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgSWd4UGl2b3ROdW1lcmljQWdncmVnYXRlXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBzdW0obWVtYmVyczogbnVtYmVyW10pOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gSWd4TnVtYmVyU3VtbWFyeU9wZXJhbmQuc3VtKG1lbWJlcnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGF2ZXJhZ2UgbnVtZXJpYyB2YWx1ZSBpbiB0aGUgZGF0YSBwcm92aWRlZCBkYXRhIHJlY29yZHMuXG4gICAgICogSWYgZmlsdGVyaW5nIGlzIGFwcGxpZWQsIHJldHVybnMgdGhlIGF2ZXJhZ2UgbnVtZXJpYyB2YWx1ZSBpbiB0aGUgZmlsdGVyZWQgZGF0YSByZWNvcmRzLlxuICAgICAqIGBgYHR5cGVzY3JpcHRcbiAgICAgKiBJZ3hQaXZvdE51bWVyaWNBZ2dyZWdhdGUuYXZlcmFnZShkYXRhKTtcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBJZ3hQaXZvdE51bWVyaWNBZ2dyZWdhdGVcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGF2ZXJhZ2UobWVtYmVyczogbnVtYmVyW10pOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gSWd4TnVtYmVyU3VtbWFyeU9wZXJhbmQuYXZlcmFnZShtZW1iZXJzKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBJZ3hQaXZvdERhdGVBZ2dyZWdhdGUgZXh0ZW5kcyBJZ3hQaXZvdEFnZ3JlZ2F0ZSB7XG4gICAgLyoqXG4gICAgICogR2V0cyBhcnJheSB3aXRoIGRlZmF1bHQgYWdncmVnYXRvciBmdW5jdGlvbiBmb3IgZGF0ZSBhZ2dyZWdhdGlvbi5cbiAgICAgKiBgYGB0eXBlc2NyaXB0XG4gICAgICogSWd4UGl2b3REYXRlQWdncmVnYXRlLmFnZ3JlZ2F0b3JzKCk7XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgSWd4UGl2b3RBZ2dyZWdhdGVcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGFnZ3JlZ2F0b3JzKCkge1xuICAgICAgICBsZXQgcmVzdWx0OiBJUGl2b3RBZ2dyZWdhdG9yW10gPSBbXTtcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmNvbmNhdChzdXBlci5hZ2dyZWdhdG9ycygpKTtcbiAgICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICAgICAga2V5OiAnTEFURVNUJyxcbiAgICAgICAgICAgIGxhYmVsOiB0aGlzLnJlc291cmNlU3RyaW5ncy5pZ3hfZ3JpZF9waXZvdF9hZ2dyZWdhdGVfZGF0ZV9sYXRlc3QsXG4gICAgICAgICAgICBhZ2dyZWdhdG9yOiBJZ3hQaXZvdERhdGVBZ2dyZWdhdGUubGF0ZXN0XG4gICAgICAgIH0pO1xuICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgICBrZXk6ICdFQVJMSUVTVCcsXG4gICAgICAgICAgICBsYWJlbDogdGhpcy5yZXNvdXJjZVN0cmluZ3MuaWd4X2dyaWRfcGl2b3RfYWdncmVnYXRlX2RhdGVfZWFybGllc3QsXG4gICAgICAgICAgICBhZ2dyZWdhdG9yOiBJZ3hQaXZvdERhdGVBZ2dyZWdhdGUuZWFybGllc3RcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGxhdGVzdCBkYXRlIHZhbHVlIGluIHRoZSBkYXRhIHJlY29yZHMuXG4gICAgICogSWYgZmlsdGVyaW5nIGlzIGFwcGxpZWQsIHJldHVybnMgdGhlIGxhdGVzdCBkYXRlIHZhbHVlIGluIHRoZSBmaWx0ZXJlZCBkYXRhIHJlY29yZHMuXG4gICAgICogYGBgdHlwZXNjcmlwdFxuICAgICAqIElneFBpdm90RGF0ZUFnZ3JlZ2F0ZS5sYXRlc3QoZGF0YSk7XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgSWd4UGl2b3REYXRlQWdncmVnYXRlXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBsYXRlc3QobWVtYmVyczogYW55W10pIHtcbiAgICAgICAgcmV0dXJuIElneERhdGVTdW1tYXJ5T3BlcmFuZC5sYXRlc3QobWVtYmVycyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZWFybGllc3QgZGF0ZSB2YWx1ZSBpbiB0aGUgZGF0YSByZWNvcmRzLlxuICAgICAqIElmIGZpbHRlcmluZyBpcyBhcHBsaWVkLCByZXR1cm5zIHRoZSBsYXRlc3QgZGF0ZSB2YWx1ZSBpbiB0aGUgZmlsdGVyZWQgZGF0YSByZWNvcmRzLlxuICAgICAqIGBgYHR5cGVzY3JpcHRcbiAgICAgKiBJZ3hQaXZvdERhdGVBZ2dyZWdhdGUuZWFybGllc3QoZGF0YSk7XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgSWd4UGl2b3REYXRlQWdncmVnYXRlXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBlYXJsaWVzdChtZW1iZXJzOiBhbnlbXSkge1xuICAgICAgICByZXR1cm4gSWd4RGF0ZVN1bW1hcnlPcGVyYW5kLmVhcmxpZXN0KG1lbWJlcnMpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIElneFBpdm90VGltZUFnZ3JlZ2F0ZSBleHRlbmRzIElneFBpdm90QWdncmVnYXRlIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIGFycmF5IHdpdGggZGVmYXVsdCBhZ2dyZWdhdG9yIGZ1bmN0aW9uIGZvciB0aW1lIGFnZ3JlZ2F0aW9uLlxuICAgICAqIGBgYHR5cGVzY3JpcHRcbiAgICAgKiBJZ3hQaXZvdFRpbWVBZ2dyZWdhdGUuYWdncmVnYXRvcnMoKTtcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBJZ3hQaXZvdEFnZ3JlZ2F0ZVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgYWdncmVnYXRvcnMoKSB7XG4gICAgICAgIGxldCByZXN1bHQ6IElQaXZvdEFnZ3JlZ2F0b3JbXSA9IFtdO1xuICAgICAgICByZXN1bHQgPSByZXN1bHQuY29uY2F0KHN1cGVyLmFnZ3JlZ2F0b3JzKCkpO1xuICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgICBrZXk6ICdMQVRFU1QnLFxuICAgICAgICAgICAgbGFiZWw6IHRoaXMucmVzb3VyY2VTdHJpbmdzLmlneF9ncmlkX3Bpdm90X2FnZ3JlZ2F0ZV90aW1lX2xhdGVzdCxcbiAgICAgICAgICAgIGFnZ3JlZ2F0b3I6IElneFBpdm90VGltZUFnZ3JlZ2F0ZS5sYXRlc3RUaW1lXG4gICAgICAgIH0pO1xuICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgICBrZXk6ICdFQVJMSUVTVCcsXG4gICAgICAgICAgICBsYWJlbDogdGhpcy5yZXNvdXJjZVN0cmluZ3MuaWd4X2dyaWRfcGl2b3RfYWdncmVnYXRlX3RpbWVfZWFybGllc3QsXG4gICAgICAgICAgICBhZ2dyZWdhdG9yOiBJZ3hQaXZvdFRpbWVBZ2dyZWdhdGUuZWFybGllc3RUaW1lXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGxhdGVzdCB0aW1lIHZhbHVlIGluIHRoZSBkYXRhIHJlY29yZHMuIENvbXBhcmUgb25seSB0aGUgdGltZSBwYXJ0IG9mIHRoZSBkYXRlLlxuICAgICAqIElmIGZpbHRlcmluZyBpcyBhcHBsaWVkLCByZXR1cm5zIHRoZSBsYXRlc3QgdGltZSB2YWx1ZSBpbiB0aGUgZmlsdGVyZWQgZGF0YSByZWNvcmRzLlxuICAgICAqIGBgYHR5cGVzY3JpcHRcbiAgICAgKiBJZ3hQaXZvdFRpbWVBZ2dyZWdhdGUubGF0ZXN0VGltZShkYXRhKTtcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBJZ3hQaXZvdFRpbWVBZ2dyZWdhdGVcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGxhdGVzdFRpbWUobWVtYmVyczogYW55W10pIHtcbiAgICAgICAgcmV0dXJuIElneFRpbWVTdW1tYXJ5T3BlcmFuZC5sYXRlc3RUaW1lKG1lbWJlcnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGVhcmxpZXN0IHRpbWUgdmFsdWUgaW4gdGhlIGRhdGEgcmVjb3Jkcy4gQ29tcGFyZSBvbmx5IHRoZSB0aW1lIHBhcnQgb2YgdGhlIGRhdGUuXG4gICAgICogSWYgZmlsdGVyaW5nIGlzIGFwcGxpZWQsIHJldHVybnMgdGhlIGVhcmxpZXN0IHRpbWUgdmFsdWUgaW4gdGhlIGZpbHRlcmVkIGRhdGEgcmVjb3Jkcy5cbiAgICAgKiBgYGB0eXBlc2NyaXB0XG4gICAgICogSWd4UGl2b3RUaW1lQWdncmVnYXRlLmVhcmxpZXN0VGltZShkYXRhKTtcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBJZ3hQaXZvdFRpbWVBZ2dyZWdhdGVcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGVhcmxpZXN0VGltZShtZW1iZXJzOiBhbnlbXSkge1xuICAgICAgICByZXR1cm4gSWd4VGltZVN1bW1hcnlPcGVyYW5kLmVhcmxpZXN0VGltZShtZW1iZXJzKTtcbiAgICB9XG59XG4iXX0=
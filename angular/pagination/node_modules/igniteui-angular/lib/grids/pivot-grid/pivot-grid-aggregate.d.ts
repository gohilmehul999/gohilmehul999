import { IGridResourceStrings } from '../../core/i18n/grid-resources';
import { IPivotAggregator } from './pivot-grid.interface';
export declare class IgxPivotAggregate {
    private static _resourceStrings;
    /**
     * Gets/Sets the resource strings.
     *
     * @remarks
     * By default it uses EN resources.
     */
    static set resourceStrings(value: IGridResourceStrings);
    static get resourceStrings(): IGridResourceStrings;
    /**
     * Gets array with default aggregator function for base aggregation.
     * ```typescript
     * IgxPivotAggregate.aggregators();
     * ```
     *
     * @memberof IgxPivotAggregate
     */
    static aggregators(): {
        key: string;
        label: string;
        aggregator: typeof IgxPivotAggregate.count;
    }[];
    /**
     * Counts all the records in the data source.
     * If filtering is applied, counts only the filtered records.
     * ```typescript
     * IgxSummaryOperand.count(dataSource);
     * ```
     *
     * @memberof IgxPivotAggregate
     */
    static count(members: number[]): number;
}
export declare class IgxPivotNumericAggregate extends IgxPivotAggregate {
    /**
     * Gets array with default aggregator function for numeric aggregation.
     * ```typescript
     * IgxPivotAggregate.aggregators();
     * ```
     *
     * @memberof IgxPivotAggregate
     */
    static aggregators(): IPivotAggregator[];
    /**
     * Returns the minimum numeric value in the provided data records.
     * If filtering is applied, returns the minimum value in the filtered data records.
     * ```typescript
     * IgxPivotNumericAggregate.min(members, data);
     * ```
     *
     * @memberof IgxPivotNumericAggregate
     */
    static min(members: number[]): number;
    /**
     * Returns the maximum numeric value in the provided data records.
     * If filtering is applied, returns the maximum value in the filtered data records.
     * ```typescript
     * IgxPivotNumericAggregate.max(data);
     * ```
     *
     * @memberof IgxPivotNumericAggregate
     */
    static max(members: number[]): number;
    /**
     * Returns the sum of the numeric values in the provided data records.
     * If filtering is applied, returns the sum of the numeric values in the data records.
     * ```typescript
     * IgxPivotNumericAggregate.sum(data);
     * ```
     *
     * @memberof IgxPivotNumericAggregate
     */
    static sum(members: number[]): number;
    /**
     * Returns the average numeric value in the data provided data records.
     * If filtering is applied, returns the average numeric value in the filtered data records.
     * ```typescript
     * IgxPivotNumericAggregate.average(data);
     * ```
     *
     * @memberof IgxPivotNumericAggregate
     */
    static average(members: number[]): number;
}
export declare class IgxPivotDateAggregate extends IgxPivotAggregate {
    /**
     * Gets array with default aggregator function for date aggregation.
     * ```typescript
     * IgxPivotDateAggregate.aggregators();
     * ```
     *
     * @memberof IgxPivotAggregate
     */
    static aggregators(): IPivotAggregator[];
    /**
     * Returns the latest date value in the data records.
     * If filtering is applied, returns the latest date value in the filtered data records.
     * ```typescript
     * IgxPivotDateAggregate.latest(data);
     * ```
     *
     * @memberof IgxPivotDateAggregate
     */
    static latest(members: any[]): any;
    /**
     * Returns the earliest date value in the data records.
     * If filtering is applied, returns the latest date value in the filtered data records.
     * ```typescript
     * IgxPivotDateAggregate.earliest(data);
     * ```
     *
     * @memberof IgxPivotDateAggregate
     */
    static earliest(members: any[]): any;
}
export declare class IgxPivotTimeAggregate extends IgxPivotAggregate {
    /**
     * Gets array with default aggregator function for time aggregation.
     * ```typescript
     * IgxPivotTimeAggregate.aggregators();
     * ```
     *
     * @memberof IgxPivotAggregate
     */
    static aggregators(): IPivotAggregator[];
    /**
     * Returns the latest time value in the data records. Compare only the time part of the date.
     * If filtering is applied, returns the latest time value in the filtered data records.
     * ```typescript
     * IgxPivotTimeAggregate.latestTime(data);
     * ```
     *
     * @memberof IgxPivotTimeAggregate
     */
    static latestTime(members: any[]): any;
    /**
     * Returns the earliest time value in the data records. Compare only the time part of the date.
     * If filtering is applied, returns the earliest time value in the filtered data records.
     * ```typescript
     * IgxPivotTimeAggregate.earliestTime(data);
     * ```
     *
     * @memberof IgxPivotTimeAggregate
     */
    static earliestTime(members: any[]): any;
}

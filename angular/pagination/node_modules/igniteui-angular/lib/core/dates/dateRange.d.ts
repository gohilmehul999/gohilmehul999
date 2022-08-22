export interface DateRangeDescriptor {
    type: DateRangeType;
    dateRange?: Date[];
}
export declare enum DateRangeType {
    After = 0,
    Before = 1,
    Between = 2,
    Specific = 3,
    Weekdays = 4,
    Weekends = 5
}

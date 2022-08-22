/**
 * Provides base filtering operations
 * Implementations should be Singleton
 *
 * @export
 */
export declare class IgxFilteringOperand {
    protected static _instance: IgxFilteringOperand;
    operations: IFilteringOperation[];
    constructor();
    static instance(): IgxFilteringOperand;
    /**
     * Returns an array of names of the conditions which are visible in the UI
     */
    conditionList(): string[];
    /**
     * Returns an instance of the condition with the specified name.
     *
     * @param name The name of the condition.
     */
    condition(name: string): IFilteringOperation;
    /**
     * Adds a new condition to the filtering operations.
     *
     * @param operation The filtering operation.
     */
    append(operation: IFilteringOperation): void;
    /**
     * @hidden
     */
    protected findValueInSet(target: any, searchVal: Set<any>): boolean;
}
/**
 * Provides filtering operations for booleans
 *
 * @export
 */
export declare class IgxBooleanFilteringOperand extends IgxFilteringOperand {
    protected constructor();
}
/**
 * @internal
 * @hidden
 */
declare class IgxBaseDateTimeFilteringOperand extends IgxFilteringOperand {
    protected constructor();
    /**
     * Splits a Date object into parts
     *
     * @memberof IgxDateFilteringOperand
     */
    static getDateParts(date: Date, dateFormat?: string): IDateParts;
    protected findValueInSet(target: any, searchVal: Set<any>): boolean;
    protected validateInputData(target: Date): void;
}
/**
 * Provides filtering operations for Dates
 *
 * @export
 */
export declare class IgxDateFilteringOperand extends IgxBaseDateTimeFilteringOperand {
    protected constructor();
}
export declare class IgxDateTimeFilteringOperand extends IgxBaseDateTimeFilteringOperand {
    protected constructor();
}
export declare class IgxTimeFilteringOperand extends IgxBaseDateTimeFilteringOperand {
    protected constructor();
    protected findValueInSet(target: any, searchVal: Set<any>): boolean;
}
/**
 * Provides filtering operations for numbers
 *
 * @export
 */
export declare class IgxNumberFilteringOperand extends IgxFilteringOperand {
    protected constructor();
}
/**
 * Provides filtering operations for strings
 *
 * @export
 */
export declare class IgxStringFilteringOperand extends IgxFilteringOperand {
    protected constructor();
    /**
     * Applies case sensitivity on strings if provided
     *
     * @memberof IgxStringFilteringOperand
     */
    static applyIgnoreCase(a: string, ignoreCase: boolean): string;
}
/**
 * Interface describing filtering operations
 *
 * @export
 */
export interface IFilteringOperation {
    name: string;
    isUnary: boolean;
    iconName: string;
    hidden?: boolean;
    logic: (value: any, searchVal?: any, ignoreCase?: boolean) => boolean;
}
/**
 * Interface describing Date object in parts
 *
 * @export
 */
export interface IDateParts {
    year: number;
    month: number;
    day: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
}
export {};

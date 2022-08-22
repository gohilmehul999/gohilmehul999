import { DatePartInfo } from '../../directives/date-time-editor/date-time-editor.common';
import { ValidationErrors } from '@angular/forms';
/** @hidden */
export declare abstract class DateTimeUtil {
    static readonly DEFAULT_INPUT_FORMAT = "MM/dd/yyyy";
    static readonly DEFAULT_TIME_INPUT_FORMAT = "hh:mm tt";
    private static readonly SEPARATOR;
    private static readonly DEFAULT_LOCALE;
    /**
     * Parse a Date value from masked string input based on determined date parts
     *
     * @param inputData masked value to parse
     * @param dateTimeParts Date parts array for the mask
     */
    static parseValueFromMask(inputData: string, dateTimeParts: DatePartInfo[], promptChar?: string): Date | null;
    /** Parse the mask into date/time and literal parts */
    static parseDateTimeFormat(mask: string, locale?: string): DatePartInfo[];
    static getPartValue(value: Date, datePartInfo: DatePartInfo, partLength: number): string;
    /** Builds a date-time editor's default input format based on provided locale settings. */
    static getDefaultInputFormat(locale: string): string;
    /** Tries to format a date using Angular's DatePipe. Fallbacks to `Intl` if no locale settings have been loaded. */
    static formatDate(value: number | Date, format: string, locale: string, timezone?: string): string;
    /**
     * Returns the date format based on a provided locale.
     * Supports Angular's DatePipe format options such as `shortDate`, `longDate`.
     */
    static getLocaleDateFormat(locale: string, displayFormat?: string): string;
    /** Determines if a given character is `d/M/y` or `h/m/s`. */
    static isDateOrTimeChar(char: string): boolean;
    /** Spins the date portion in a date-time editor. */
    static spinDate(delta: number, newDate: Date, spinLoop: boolean): void;
    /** Spins the month portion in a date-time editor. */
    static spinMonth(delta: number, newDate: Date, spinLoop: boolean): void;
    /** Spins the year portion in a date-time editor. */
    static spinYear(delta: number, newDate: Date): void;
    /** Spins the hours portion in a date-time editor. */
    static spinHours(delta: number, newDate: Date, spinLoop: boolean): void;
    /** Spins the minutes portion in a date-time editor. */
    static spinMinutes(delta: number, newDate: Date, spinLoop: boolean): void;
    /** Spins the seconds portion in a date-time editor. */
    static spinSeconds(delta: number, newDate: Date, spinLoop: boolean): void;
    /** Spins the AM/PM portion in a date-time editor. */
    static spinAmPm(newDate: Date, currentDate: Date, amPmFromMask: string): Date;
    /**
     * Determines whether the provided value is greater than the provided max value.
     *
     * @param includeTime set to false if you want to exclude time portion of the two dates
     * @param includeDate set to false if you want to exclude the date portion of the two dates
     * @returns true if provided value is greater than provided maxValue
     */
    static greaterThanMaxValue(value: Date, maxValue: Date, includeTime?: boolean, includeDate?: boolean): boolean;
    /**
     * Determines whether the provided value is less than the provided min value.
     *
     * @param includeTime set to false if you want to exclude time portion of the two dates
     * @param includeDate set to false if you want to exclude the date portion of the two dates
     * @returns true if provided value is less than provided minValue
     */
    static lessThanMinValue(value: Date, minValue: Date, includeTime?: boolean, includeDate?: boolean): boolean;
    /**
     * Validates a value within a given min and max value range.
     *
     * @param value The value to validate
     * @param minValue The lowest possible value that `value` can take
     * @param maxValue The largest possible value that `value` can take
     */
    static validateMinMax(value: Date, minValue: Date | string, maxValue: Date | string, includeTime?: boolean, includeDate?: boolean): ValidationErrors;
    /** Parse an ISO string to a Date */
    static parseIsoDate(value: string): Date | null;
    /**
     * Returns whether the input is valid date
     *
     * @param value input to check
     * @returns true if provided input is a valid date
     */
    static isValidDate(value: any): value is Date;
    private static addCurrentPart;
    private static daysInMonth;
    private static trimEmptyPlaceholders;
    private static getMask;
    private static logMissingLocaleSettings;
    private static prependValue;
    private static toTwelveHourFormat;
    private static ensureLeadingZero;
    private static getCleanVal;
    private static determineDatePart;
    private static getDefaultLocaleMask;
    private static fillDatePartsPositions;
}

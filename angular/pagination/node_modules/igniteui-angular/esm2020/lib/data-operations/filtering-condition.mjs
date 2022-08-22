/**
 * Provides base filtering operations
 * Implementations should be Singleton
 *
 * @export
 */
export class IgxFilteringOperand {
    constructor() {
        this.operations = [{
                name: 'null',
                isUnary: true,
                iconName: 'is-null',
                logic: (target) => target === null
            }, {
                name: 'notNull',
                isUnary: true,
                iconName: 'is-not-null',
                logic: (target) => target !== null
            }, {
                name: 'in',
                isUnary: false,
                iconName: 'is-in',
                hidden: true,
                logic: (target, searchVal) => this.findValueInSet(target, searchVal)
            }];
    }
    static instance() {
        return this._instance || (this._instance = new this());
    }
    /**
     * Returns an array of names of the conditions which are visible in the UI
     */
    conditionList() {
        return this.operations.filter(f => !f.hidden).map((element) => element.name);
    }
    /**
     * Returns an instance of the condition with the specified name.
     *
     * @param name The name of the condition.
     */
    condition(name) {
        return this.operations.find((element) => element.name === name);
    }
    /**
     * Adds a new condition to the filtering operations.
     *
     * @param operation The filtering operation.
     */
    append(operation) {
        this.operations.push(operation);
    }
    /**
     * @hidden
     */
    findValueInSet(target, searchVal) {
        return searchVal.has(target);
    }
}
IgxFilteringOperand._instance = null;
/**
 * Provides filtering operations for booleans
 *
 * @export
 */
export class IgxBooleanFilteringOperand extends IgxFilteringOperand {
    constructor() {
        super();
        this.operations = [{
                name: 'all',
                isUnary: true,
                iconName: 'select-all',
                logic: (target) => true
            }, {
                name: 'true',
                isUnary: true,
                iconName: 'is-true',
                logic: (target) => !!(target && target !== null && target !== undefined)
            }, {
                name: 'false',
                isUnary: true,
                iconName: 'is-false',
                logic: (target) => !target && target !== null && target !== undefined
            }, {
                name: 'empty',
                isUnary: true,
                iconName: 'is-empty',
                logic: (target) => target === null || target === undefined
            }, {
                name: 'notEmpty',
                isUnary: true,
                iconName: 'not-empty',
                logic: (target) => target !== null && target !== undefined
            }].concat(this.operations);
    }
}
/**
 * @internal
 * @hidden
 */
class IgxBaseDateTimeFilteringOperand extends IgxFilteringOperand {
    constructor() {
        super();
        this.operations = [{
                name: 'empty',
                isUnary: true,
                iconName: 'is-empty',
                logic: (target) => target === null || target === undefined
            }, {
                name: 'notEmpty',
                isUnary: true,
                iconName: 'not-empty',
                logic: (target) => target !== null && target !== undefined
            }].concat(this.operations);
    }
    /**
     * Splits a Date object into parts
     *
     * @memberof IgxDateFilteringOperand
     */
    static getDateParts(date, dateFormat) {
        const res = {
            day: null,
            hours: null,
            milliseconds: null,
            minutes: null,
            month: null,
            seconds: null,
            year: null
        };
        if (!date || !dateFormat) {
            return res;
        }
        if (dateFormat.indexOf('y') >= 0) {
            res.year = date.getFullYear();
        }
        if (dateFormat.indexOf('M') >= 0) {
            res.month = date.getMonth();
        }
        if (dateFormat.indexOf('d') >= 0) {
            res.day = date.getDate();
        }
        if (dateFormat.indexOf('h') >= 0) {
            res.hours = date.getHours();
        }
        if (dateFormat.indexOf('m') >= 0) {
            res.minutes = date.getMinutes();
        }
        if (dateFormat.indexOf('s') >= 0) {
            res.seconds = date.getSeconds();
        }
        if (dateFormat.indexOf('f') >= 0) {
            res.milliseconds = date.getMilliseconds();
        }
        return res;
    }
    findValueInSet(target, searchVal) {
        if (!target) {
            return false;
        }
        return searchVal.has((target instanceof Date) ? target.toISOString() : target);
    }
    validateInputData(target) {
        if (!(target instanceof Date)) {
            throw new Error('Could not perform filtering on \'date\' column because the datasource object type is not \'Date\'.');
        }
    }
}
/**
 * Provides filtering operations for Dates
 *
 * @export
 */
export class IgxDateFilteringOperand extends IgxBaseDateTimeFilteringOperand {
    constructor() {
        super();
        this.operations = [{
                name: 'equals',
                isUnary: false,
                iconName: 'equals',
                logic: (target, searchVal) => {
                    if (!target) {
                        return false;
                    }
                    this.validateInputData(target);
                    const targetp = IgxDateFilteringOperand.getDateParts(target, 'yMd');
                    const searchp = IgxDateFilteringOperand.getDateParts(searchVal, 'yMd');
                    return targetp.year === searchp.year &&
                        targetp.month === searchp.month &&
                        targetp.day === searchp.day;
                }
            }, {
                name: 'doesNotEqual',
                isUnary: false,
                iconName: 'not-equal',
                logic: (target, searchVal) => {
                    if (!target) {
                        return true;
                    }
                    this.validateInputData(target);
                    const targetp = IgxDateFilteringOperand.getDateParts(target, 'yMd');
                    const searchp = IgxDateFilteringOperand.getDateParts(searchVal, 'yMd');
                    return targetp.year !== searchp.year ||
                        targetp.month !== searchp.month ||
                        targetp.day !== searchp.day;
                }
            }, {
                name: 'before',
                isUnary: false,
                iconName: 'is-before',
                logic: (target, searchVal) => {
                    if (!target) {
                        return false;
                    }
                    this.validateInputData(target);
                    return target < searchVal;
                }
            }, {
                name: 'after',
                isUnary: false,
                iconName: 'is-after',
                logic: (target, searchVal) => {
                    if (!target) {
                        return false;
                    }
                    this.validateInputData(target);
                    return target > searchVal;
                }
            }, {
                name: 'today',
                isUnary: true,
                iconName: 'today',
                logic: (target) => {
                    if (!target) {
                        return false;
                    }
                    this.validateInputData(target);
                    const d = IgxDateFilteringOperand.getDateParts(target, 'yMd');
                    const now = IgxDateFilteringOperand.getDateParts(new Date(), 'yMd');
                    return d.year === now.year &&
                        d.month === now.month &&
                        d.day === now.day;
                }
            }, {
                name: 'yesterday',
                isUnary: true,
                iconName: 'yesterday',
                logic: (target) => {
                    if (!target) {
                        return false;
                    }
                    this.validateInputData(target);
                    const td = IgxDateFilteringOperand.getDateParts(target, 'yMd');
                    const y = ((d) => new Date(d.setDate(d.getDate() - 1)))(new Date());
                    const yesterday = IgxDateFilteringOperand.getDateParts(y, 'yMd');
                    return td.year === yesterday.year &&
                        td.month === yesterday.month &&
                        td.day === yesterday.day;
                }
            }, {
                name: 'thisMonth',
                isUnary: true,
                iconName: 'this-month',
                logic: (target) => {
                    if (!target) {
                        return false;
                    }
                    this.validateInputData(target);
                    const d = IgxDateFilteringOperand.getDateParts(target, 'yM');
                    const now = IgxDateFilteringOperand.getDateParts(new Date(), 'yM');
                    return d.year === now.year &&
                        d.month === now.month;
                }
            }, {
                name: 'lastMonth',
                isUnary: true,
                iconName: 'last-month',
                logic: (target) => {
                    if (!target) {
                        return false;
                    }
                    this.validateInputData(target);
                    const d = IgxDateFilteringOperand.getDateParts(target, 'yM');
                    const now = IgxDateFilteringOperand.getDateParts(new Date(), 'yM');
                    if (!now.month) {
                        now.month = 11;
                        now.year -= 1;
                    }
                    else {
                        now.month--;
                    }
                    return d.year === now.year &&
                        d.month === now.month;
                }
            }, {
                name: 'nextMonth',
                isUnary: true,
                iconName: 'next-month',
                logic: (target) => {
                    if (!target) {
                        return false;
                    }
                    this.validateInputData(target);
                    const d = IgxDateFilteringOperand.getDateParts(target, 'yM');
                    const now = IgxDateFilteringOperand.getDateParts(new Date(), 'yM');
                    if (now.month === 11) {
                        now.month = 0;
                        now.year += 1;
                    }
                    else {
                        now.month++;
                    }
                    return d.year === now.year &&
                        d.month === now.month;
                }
            }, {
                name: 'thisYear',
                isUnary: true,
                iconName: 'this-year',
                logic: (target) => {
                    if (!target) {
                        return false;
                    }
                    this.validateInputData(target);
                    const d = IgxDateFilteringOperand.getDateParts(target, 'y');
                    const now = IgxDateFilteringOperand.getDateParts(new Date(), 'y');
                    return d.year === now.year;
                }
            }, {
                name: 'lastYear',
                isUnary: true,
                iconName: 'last-year',
                logic: (target) => {
                    if (!target) {
                        return false;
                    }
                    this.validateInputData(target);
                    const d = IgxDateFilteringOperand.getDateParts(target, 'y');
                    const now = IgxDateFilteringOperand.getDateParts(new Date(), 'y');
                    return d.year === now.year - 1;
                }
            }, {
                name: 'nextYear',
                isUnary: true,
                iconName: 'next-year',
                logic: (target) => {
                    if (!target) {
                        return false;
                    }
                    this.validateInputData(target);
                    const d = IgxDateFilteringOperand.getDateParts(target, 'y');
                    const now = IgxDateFilteringOperand.getDateParts(new Date(), 'y');
                    return d.year === now.year + 1;
                }
            }].concat(this.operations);
    }
}
export class IgxDateTimeFilteringOperand extends IgxBaseDateTimeFilteringOperand {
    constructor() {
        super();
        this.operations = [{
                name: 'equals',
                isUnary: false,
                iconName: 'equals',
                logic: (target, searchVal) => {
                    if (!target) {
                        return false;
                    }
                    this.validateInputData(target);
                    const targetp = IgxDateTimeFilteringOperand.getDateParts(target, 'yMdhms');
                    const searchp = IgxDateTimeFilteringOperand.getDateParts(searchVal, 'yMdhms');
                    return targetp.year === searchp.year &&
                        targetp.month === searchp.month &&
                        targetp.day === searchp.day &&
                        targetp.hours === searchp.hours &&
                        targetp.minutes === searchp.minutes &&
                        targetp.seconds === searchp.seconds;
                }
            }, {
                name: 'doesNotEqual',
                isUnary: false,
                iconName: 'not-equal',
                logic: (target, searchVal) => {
                    if (!target) {
                        return true;
                    }
                    this.validateInputData(target);
                    const targetp = IgxDateTimeFilteringOperand.getDateParts(target, 'yMdhms');
                    const searchp = IgxDateTimeFilteringOperand.getDateParts(searchVal, 'yMdhms');
                    return targetp.year !== searchp.year ||
                        targetp.month !== searchp.month ||
                        targetp.day !== searchp.day ||
                        targetp.hours !== searchp.hours ||
                        targetp.minutes !== searchp.minutes ||
                        targetp.seconds !== searchp.seconds;
                }
            }, {
                name: 'before',
                isUnary: false,
                iconName: 'is-before',
                logic: (target, searchVal) => {
                    if (!target) {
                        return false;
                    }
                    this.validateInputData(target);
                    return target < searchVal;
                }
            }, {
                name: 'after',
                isUnary: false,
                iconName: 'is-after',
                logic: (target, searchVal) => {
                    if (!target) {
                        return false;
                    }
                    this.validateInputData(target);
                    return target > searchVal;
                }
            }, {
                name: 'today',
                isUnary: true,
                iconName: 'today',
                logic: (target) => {
                    if (!target) {
                        return false;
                    }
                    this.validateInputData(target);
                    const d = IgxDateTimeFilteringOperand.getDateParts(target, 'yMd');
                    const now = IgxDateTimeFilteringOperand.getDateParts(new Date(), 'yMd');
                    return d.year === now.year &&
                        d.month === now.month &&
                        d.day === now.day;
                }
            }, {
                name: 'yesterday',
                isUnary: true,
                iconName: 'yesterday',
                logic: (target) => {
                    if (!target) {
                        return false;
                    }
                    this.validateInputData(target);
                    const td = IgxDateTimeFilteringOperand.getDateParts(target, 'yMd');
                    const y = ((d) => new Date(d.setDate(d.getDate() - 1)))(new Date());
                    const yesterday = IgxDateTimeFilteringOperand.getDateParts(y, 'yMd');
                    return td.year === yesterday.year &&
                        td.month === yesterday.month &&
                        td.day === yesterday.day;
                }
            }, {
                name: 'thisMonth',
                isUnary: true,
                iconName: 'this-month',
                logic: (target) => {
                    if (!target) {
                        return false;
                    }
                    this.validateInputData(target);
                    const d = IgxDateTimeFilteringOperand.getDateParts(target, 'yM');
                    const now = IgxDateTimeFilteringOperand.getDateParts(new Date(), 'yM');
                    return d.year === now.year &&
                        d.month === now.month;
                }
            }, {
                name: 'lastMonth',
                isUnary: true,
                iconName: 'last-month',
                logic: (target) => {
                    if (!target) {
                        return false;
                    }
                    this.validateInputData(target);
                    const d = IgxDateTimeFilteringOperand.getDateParts(target, 'yM');
                    const now = IgxDateTimeFilteringOperand.getDateParts(new Date(), 'yM');
                    if (!now.month) {
                        now.month = 11;
                        now.year -= 1;
                    }
                    else {
                        now.month--;
                    }
                    return d.year === now.year &&
                        d.month === now.month;
                }
            }, {
                name: 'nextMonth',
                isUnary: true,
                iconName: 'next-month',
                logic: (target) => {
                    if (!target) {
                        return false;
                    }
                    this.validateInputData(target);
                    const d = IgxDateTimeFilteringOperand.getDateParts(target, 'yM');
                    const now = IgxDateTimeFilteringOperand.getDateParts(new Date(), 'yM');
                    if (now.month === 11) {
                        now.month = 0;
                        now.year += 1;
                    }
                    else {
                        now.month++;
                    }
                    return d.year === now.year &&
                        d.month === now.month;
                }
            }, {
                name: 'thisYear',
                isUnary: true,
                iconName: 'this-year',
                logic: (target) => {
                    if (!target) {
                        return false;
                    }
                    this.validateInputData(target);
                    const d = IgxDateTimeFilteringOperand.getDateParts(target, 'y');
                    const now = IgxDateTimeFilteringOperand.getDateParts(new Date(), 'y');
                    return d.year === now.year;
                }
            }, {
                name: 'lastYear',
                isUnary: true,
                iconName: 'last-year',
                logic: (target) => {
                    if (!target) {
                        return false;
                    }
                    this.validateInputData(target);
                    const d = IgxDateTimeFilteringOperand.getDateParts(target, 'y');
                    const now = IgxDateTimeFilteringOperand.getDateParts(new Date(), 'y');
                    return d.year === now.year - 1;
                }
            }, {
                name: 'nextYear',
                isUnary: true,
                iconName: 'next-year',
                logic: (target) => {
                    if (!target) {
                        return false;
                    }
                    this.validateInputData(target);
                    const d = IgxDateTimeFilteringOperand.getDateParts(target, 'y');
                    const now = IgxDateTimeFilteringOperand.getDateParts(new Date(), 'y');
                    return d.year === now.year + 1;
                }
            }].concat(this.operations);
    }
}
export class IgxTimeFilteringOperand extends IgxBaseDateTimeFilteringOperand {
    constructor() {
        super();
        this.operations = [{
                name: 'at',
                isUnary: false,
                iconName: 'equals',
                logic: (target, searchVal) => {
                    if (!target) {
                        return false;
                    }
                    this.validateInputData(target);
                    const targetp = IgxTimeFilteringOperand.getDateParts(target, 'hms');
                    const searchp = IgxTimeFilteringOperand.getDateParts(searchVal, 'hms');
                    return targetp.hours === searchp.hours &&
                        targetp.minutes === searchp.minutes &&
                        targetp.seconds === searchp.seconds;
                }
            }, {
                name: 'not_at',
                isUnary: false,
                iconName: 'not-equal',
                logic: (target, searchVal) => {
                    if (!target) {
                        return true;
                    }
                    this.validateInputData(target);
                    const targetp = IgxTimeFilteringOperand.getDateParts(target, 'hms');
                    const searchp = IgxTimeFilteringOperand.getDateParts(searchVal, 'hms');
                    return targetp.hours !== searchp.hours ||
                        targetp.minutes !== searchp.minutes ||
                        targetp.seconds !== searchp.seconds;
                }
            }, {
                name: 'before',
                isUnary: false,
                iconName: 'is-before',
                logic: (target, searchVal) => {
                    if (!target) {
                        return false;
                    }
                    this.validateInputData(target);
                    const targetn = IgxTimeFilteringOperand.getDateParts(target, 'hms');
                    const search = IgxTimeFilteringOperand.getDateParts(searchVal, 'hms');
                    return targetn.hours < search.hours ? true : targetn.hours === search.hours && targetn.minutes < search.minutes ?
                        true : targetn.hours === search.hours && targetn.minutes === search.minutes && targetn.seconds < search.seconds;
                }
            }, {
                name: 'after',
                isUnary: false,
                iconName: 'is-after',
                logic: (target, searchVal) => {
                    if (!target) {
                        return false;
                    }
                    this.validateInputData(target);
                    const targetn = IgxTimeFilteringOperand.getDateParts(target, 'hms');
                    const search = IgxTimeFilteringOperand.getDateParts(searchVal, 'hms');
                    return targetn.hours > search.hours ? true : targetn.hours === search.hours && targetn.minutes > search.minutes ?
                        true : targetn.hours === search.hours && targetn.minutes === search.minutes && targetn.seconds > search.seconds;
                }
            }, {
                name: 'at_before',
                isUnary: false,
                iconName: 'is-before',
                logic: (target, searchVal) => {
                    if (!target) {
                        return false;
                    }
                    this.validateInputData(target);
                    const targetn = IgxTimeFilteringOperand.getDateParts(target, 'hms');
                    const search = IgxTimeFilteringOperand.getDateParts(searchVal, 'hms');
                    return (targetn.hours === search.hours && targetn.minutes === search.minutes && targetn.seconds === search.seconds) ||
                        targetn.hours < search.hours ? true : targetn.hours === search.hours && targetn.minutes < search.minutes ?
                        true : targetn.hours === search.hours && targetn.minutes === search.minutes && targetn.seconds < search.seconds;
                }
            }, {
                name: 'at_after',
                isUnary: false,
                iconName: 'is-after',
                logic: (target, searchVal) => {
                    if (!target) {
                        return false;
                    }
                    this.validateInputData(target);
                    const targetn = IgxTimeFilteringOperand.getDateParts(target, 'hms');
                    const search = IgxTimeFilteringOperand.getDateParts(searchVal, 'hms');
                    return (targetn.hours === search.hours && targetn.minutes === search.minutes && targetn.seconds === search.seconds) ||
                        targetn.hours > search.hours ? true : targetn.hours === search.hours && targetn.minutes > search.minutes ?
                        true : targetn.hours === search.hours && targetn.minutes === search.minutes && targetn.seconds > search.seconds;
                }
            }].concat(this.operations);
    }
    findValueInSet(target, searchVal) {
        if (!target) {
            return false;
        }
        return searchVal.has(target.toLocaleTimeString());
    }
}
/**
 * Provides filtering operations for numbers
 *
 * @export
 */
export class IgxNumberFilteringOperand extends IgxFilteringOperand {
    constructor() {
        super();
        this.operations = [{
                name: 'equals',
                isUnary: false,
                iconName: 'equals',
                logic: (target, searchVal) => target === searchVal
            }, {
                name: 'doesNotEqual',
                isUnary: false,
                iconName: 'not-equal',
                logic: (target, searchVal) => target !== searchVal
            }, {
                name: 'greaterThan',
                isUnary: false,
                iconName: 'greater-than',
                logic: (target, searchVal) => target > searchVal
            }, {
                name: 'lessThan',
                isUnary: false,
                iconName: 'less-than',
                logic: (target, searchVal) => target < searchVal
            }, {
                name: 'greaterThanOrEqualTo',
                isUnary: false,
                iconName: 'greater-than-or-equal',
                logic: (target, searchVal) => target >= searchVal
            }, {
                name: 'lessThanOrEqualTo',
                isUnary: false,
                iconName: 'less-than-or-equal',
                logic: (target, searchVal) => target <= searchVal
            }, {
                name: 'empty',
                isUnary: true,
                iconName: 'is-empty',
                logic: (target) => target === null || target === undefined || isNaN(target)
            }, {
                name: 'notEmpty',
                isUnary: true,
                iconName: 'not-empty',
                logic: (target) => target !== null && target !== undefined && !isNaN(target)
            }].concat(this.operations);
    }
}
/**
 * Provides filtering operations for strings
 *
 * @export
 */
export class IgxStringFilteringOperand extends IgxFilteringOperand {
    constructor() {
        super();
        this.operations = [{
                name: 'contains',
                isUnary: false,
                iconName: 'contains',
                logic: (target, searchVal, ignoreCase) => {
                    const search = IgxStringFilteringOperand.applyIgnoreCase(searchVal, ignoreCase);
                    target = IgxStringFilteringOperand.applyIgnoreCase(target, ignoreCase);
                    return target.indexOf(search) !== -1;
                }
            }, {
                name: 'doesNotContain',
                isUnary: false,
                iconName: 'does-not-contain',
                logic: (target, searchVal, ignoreCase) => {
                    const search = IgxStringFilteringOperand.applyIgnoreCase(searchVal, ignoreCase);
                    target = IgxStringFilteringOperand.applyIgnoreCase(target, ignoreCase);
                    return target.indexOf(search) === -1;
                }
            }, {
                name: 'startsWith',
                isUnary: false,
                iconName: 'starts-with',
                logic: (target, searchVal, ignoreCase) => {
                    const search = IgxStringFilteringOperand.applyIgnoreCase(searchVal, ignoreCase);
                    target = IgxStringFilteringOperand.applyIgnoreCase(target, ignoreCase);
                    return target.startsWith(search);
                }
            }, {
                name: 'endsWith',
                isUnary: false,
                iconName: 'ends-with',
                logic: (target, searchVal, ignoreCase) => {
                    const search = IgxStringFilteringOperand.applyIgnoreCase(searchVal, ignoreCase);
                    target = IgxStringFilteringOperand.applyIgnoreCase(target, ignoreCase);
                    return target.endsWith(search);
                }
            }, {
                name: 'equals',
                isUnary: false,
                iconName: 'equals',
                logic: (target, searchVal, ignoreCase) => {
                    const search = IgxStringFilteringOperand.applyIgnoreCase(searchVal, ignoreCase);
                    target = IgxStringFilteringOperand.applyIgnoreCase(target, ignoreCase);
                    return target === search;
                }
            }, {
                name: 'doesNotEqual',
                isUnary: false,
                iconName: 'not-equal',
                logic: (target, searchVal, ignoreCase) => {
                    const search = IgxStringFilteringOperand.applyIgnoreCase(searchVal, ignoreCase);
                    target = IgxStringFilteringOperand.applyIgnoreCase(target, ignoreCase);
                    return target !== search;
                }
            }, {
                name: 'empty',
                isUnary: true,
                iconName: 'is-empty',
                logic: (target) => target === null || target === undefined || target.length === 0
            }, {
                name: 'notEmpty',
                isUnary: true,
                iconName: 'not-empty',
                logic: (target) => target !== null && target !== undefined && target.length > 0
            }].concat(this.operations);
    }
    /**
     * Applies case sensitivity on strings if provided
     *
     * @memberof IgxStringFilteringOperand
     */
    static applyIgnoreCase(a, ignoreCase) {
        a = a ?? '';
        // bulletproof
        return ignoreCase ? ('' + a).toLowerCase() : a;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyaW5nLWNvbmRpdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2lnbml0ZXVpLWFuZ3VsYXIvc3JjL2xpYi9kYXRhLW9wZXJhdGlvbnMvZmlsdGVyaW5nLWNvbmRpdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7R0FLRztBQUNILE1BQU0sT0FBTyxtQkFBbUI7SUFJNUI7UUFDSSxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUM7Z0JBQ2YsSUFBSSxFQUFFLE1BQU07Z0JBQ1osT0FBTyxFQUFFLElBQUk7Z0JBQ2IsUUFBUSxFQUFFLFNBQVM7Z0JBQ25CLEtBQUssRUFBRSxDQUFDLE1BQVcsRUFBRSxFQUFFLENBQUMsTUFBTSxLQUFLLElBQUk7YUFDMUMsRUFBRTtnQkFDQyxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsSUFBSTtnQkFDYixRQUFRLEVBQUUsYUFBYTtnQkFDdkIsS0FBSyxFQUFFLENBQUMsTUFBVyxFQUFFLEVBQUUsQ0FBQyxNQUFNLEtBQUssSUFBSTthQUMxQyxFQUFFO2dCQUNDLElBQUksRUFBRSxJQUFJO2dCQUNWLE9BQU8sRUFBRSxLQUFLO2dCQUNkLFFBQVEsRUFBRSxPQUFPO2dCQUNqQixNQUFNLEVBQUUsSUFBSTtnQkFDWixLQUFLLEVBQUUsQ0FBQyxNQUFXLEVBQUUsU0FBbUIsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDO2FBQ3RGLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSxNQUFNLENBQUMsUUFBUTtRQUNsQixPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxhQUFhO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FB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Qy9CLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFTLEVBQUUsVUFBbUI7UUFDeEQsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixjQUFjO1FBQ2QsT0FBTyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkQsQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBQcm92aWRlcyBiYXNlIGZpbHRlcmluZyBvcGVyYXRpb25zXG4gKiBJbXBsZW1lbnRhdGlvbnMgc2hvdWxkIGJlIFNpbmdsZXRvblxuICpcbiAqIEBleHBvcnRcbiAqL1xuZXhwb3J0IGNsYXNzIElneEZpbHRlcmluZ09wZXJhbmQge1xuICAgIHByb3RlY3RlZCBzdGF0aWMgX2luc3RhbmNlOiBJZ3hGaWx0ZXJpbmdPcGVyYW5kID0gbnVsbDtcbiAgICBwdWJsaWMgb3BlcmF0aW9uczogSUZpbHRlcmluZ09wZXJhdGlvbltdO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMub3BlcmF0aW9ucyA9IFt7XG4gICAgICAgICAgICBuYW1lOiAnbnVsbCcsXG4gICAgICAgICAgICBpc1VuYXJ5OiB0cnVlLFxuICAgICAgICAgICAgaWNvbk5hbWU6ICdpcy1udWxsJyxcbiAgICAgICAgICAgIGxvZ2ljOiAodGFyZ2V0OiBhbnkpID0+IHRhcmdldCA9PT0gbnVsbFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiAnbm90TnVsbCcsXG4gICAgICAgICAgICBpc1VuYXJ5OiB0cnVlLFxuICAgICAgICAgICAgaWNvbk5hbWU6ICdpcy1ub3QtbnVsbCcsXG4gICAgICAgICAgICBsb2dpYzogKHRhcmdldDogYW55KSA9PiB0YXJnZXQgIT09IG51bGxcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgbmFtZTogJ2luJyxcbiAgICAgICAgICAgIGlzVW5hcnk6IGZhbHNlLFxuICAgICAgICAgICAgaWNvbk5hbWU6ICdpcy1pbicsXG4gICAgICAgICAgICBoaWRkZW46IHRydWUsXG4gICAgICAgICAgICBsb2dpYzogKHRhcmdldDogYW55LCBzZWFyY2hWYWw6IFNldDxhbnk+KSA9PiB0aGlzLmZpbmRWYWx1ZUluU2V0KHRhcmdldCwgc2VhcmNoVmFsKVxuICAgICAgICB9XTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGluc3RhbmNlKCk6IElneEZpbHRlcmluZ09wZXJhbmQge1xuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2UgfHwgKHRoaXMuX2luc3RhbmNlID0gbmV3IHRoaXMoKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBhcnJheSBvZiBuYW1lcyBvZiB0aGUgY29uZGl0aW9ucyB3aGljaCBhcmUgdmlzaWJsZSBpbiB0aGUgVUlcbiAgICAgKi9cbiAgICBwdWJsaWMgY29uZGl0aW9uTGlzdCgpOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wZXJhdGlvbnMuZmlsdGVyKGYgPT4gIWYuaGlkZGVuKS5tYXAoKGVsZW1lbnQpID0+IGVsZW1lbnQubmFtZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBpbnN0YW5jZSBvZiB0aGUgY29uZGl0aW9uIHdpdGggdGhlIHNwZWNpZmllZCBuYW1lLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIGNvbmRpdGlvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgY29uZGl0aW9uKG5hbWU6IHN0cmluZyk6IElGaWx0ZXJpbmdPcGVyYXRpb24ge1xuICAgICAgICByZXR1cm4gdGhpcy5vcGVyYXRpb25zLmZpbmQoKGVsZW1lbnQpID0+IGVsZW1lbnQubmFtZSA9PT0gbmFtZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIG5ldyBjb25kaXRpb24gdG8gdGhlIGZpbHRlcmluZyBvcGVyYXRpb25zLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wZXJhdGlvbiBUaGUgZmlsdGVyaW5nIG9wZXJhdGlvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgYXBwZW5kKG9wZXJhdGlvbjogSUZpbHRlcmluZ09wZXJhdGlvbikge1xuICAgICAgICB0aGlzLm9wZXJhdGlvbnMucHVzaChvcGVyYXRpb24pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBoaWRkZW5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgZmluZFZhbHVlSW5TZXQodGFyZ2V0OiBhbnksIHNlYXJjaFZhbDogU2V0PGFueT4pIHtcbiAgICAgICAgcmV0dXJuIHNlYXJjaFZhbC5oYXModGFyZ2V0KTtcbiAgICB9XG59XG5cbi8qKlxuICogUHJvdmlkZXMgZmlsdGVyaW5nIG9wZXJhdGlvbnMgZm9yIGJvb2xlYW5zXG4gKlxuICogQGV4cG9ydFxuICovXG5leHBvcnQgY2xhc3MgSWd4Qm9vbGVhbkZpbHRlcmluZ09wZXJhbmQgZXh0ZW5kcyBJZ3hGaWx0ZXJpbmdPcGVyYW5kIHtcbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMub3BlcmF0aW9ucyA9IFt7XG4gICAgICAgICAgICBuYW1lOiAnYWxsJyxcbiAgICAgICAgICAgIGlzVW5hcnk6IHRydWUsXG4gICAgICAgICAgICBpY29uTmFtZTogJ3NlbGVjdC1hbGwnLFxuICAgICAgICAgICAgbG9naWM6ICh0YXJnZXQ6IGJvb2xlYW4pID0+IHRydWVcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgbmFtZTogJ3RydWUnLFxuICAgICAgICAgICAgaXNVbmFyeTogdHJ1ZSxcbiAgICAgICAgICAgIGljb25OYW1lOiAnaXMtdHJ1ZScsXG4gICAgICAgICAgICBsb2dpYzogKHRhcmdldDogYm9vbGVhbikgPT4gISEodGFyZ2V0ICYmIHRhcmdldCAhPT0gbnVsbCAmJiB0YXJnZXQgIT09IHVuZGVmaW5lZClcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgbmFtZTogJ2ZhbHNlJyxcbiAgICAgICAgICAgIGlzVW5hcnk6IHRydWUsXG4gICAgICAgICAgICBpY29uTmFtZTogJ2lzLWZhbHNlJyxcbiAgICAgICAgICAgIGxvZ2ljOiAodGFyZ2V0OiBib29sZWFuKSA9PiAhdGFyZ2V0ICYmIHRhcmdldCAhPT0gbnVsbCAmJiB0YXJnZXQgIT09IHVuZGVmaW5lZFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiAnZW1wdHknLFxuICAgICAgICAgICAgaXNVbmFyeTogdHJ1ZSxcbiAgICAgICAgICAgIGljb25OYW1lOiAnaXMtZW1wdHknLFxuICAgICAgICAgICAgbG9naWM6ICh0YXJnZXQ6IGJvb2xlYW4pID0+IHRhcmdldCA9PT0gbnVsbCB8fCB0YXJnZXQgPT09IHVuZGVmaW5lZFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiAnbm90RW1wdHknLFxuICAgICAgICAgICAgaXNVbmFyeTogdHJ1ZSxcbiAgICAgICAgICAgIGljb25OYW1lOiAnbm90LWVtcHR5JyxcbiAgICAgICAgICAgIGxvZ2ljOiAodGFyZ2V0OiBib29sZWFuKSA9PiB0YXJnZXQgIT09IG51bGwgJiYgdGFyZ2V0ICE9PSB1bmRlZmluZWRcbiAgICAgICAgfV0uY29uY2F0KHRoaXMub3BlcmF0aW9ucyk7XG4gICAgfVxufVxuXG4vKipcbiAqIEBpbnRlcm5hbFxuICogQGhpZGRlblxuICovXG5jbGFzcyBJZ3hCYXNlRGF0ZVRpbWVGaWx0ZXJpbmdPcGVyYW5kIGV4dGVuZHMgSWd4RmlsdGVyaW5nT3BlcmFuZCB7XG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLm9wZXJhdGlvbnMgPSBbe1xuICAgICAgICAgICAgbmFtZTogJ2VtcHR5JyxcbiAgICAgICAgICAgIGlzVW5hcnk6IHRydWUsXG4gICAgICAgICAgICBpY29uTmFtZTogJ2lzLWVtcHR5JyxcbiAgICAgICAgICAgIGxvZ2ljOiAodGFyZ2V0OiBEYXRlKSA9PiB0YXJnZXQgPT09IG51bGwgfHwgdGFyZ2V0ID09PSB1bmRlZmluZWRcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgbmFtZTogJ25vdEVtcHR5JyxcbiAgICAgICAgICAgIGlzVW5hcnk6IHRydWUsXG4gICAgICAgICAgICBpY29uTmFtZTogJ25vdC1lbXB0eScsXG4gICAgICAgICAgICBsb2dpYzogKHRhcmdldDogRGF0ZSkgPT4gdGFyZ2V0ICE9PSBudWxsICYmIHRhcmdldCAhPT0gdW5kZWZpbmVkXG4gICAgICAgIH1dLmNvbmNhdCh0aGlzLm9wZXJhdGlvbnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNwbGl0cyBhIERhdGUgb2JqZWN0IGludG8gcGFydHNcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBJZ3hEYXRlRmlsdGVyaW5nT3BlcmFuZFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0RGF0ZVBhcnRzKGRhdGU6IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBJRGF0ZVBhcnRzIHtcbiAgICAgICAgY29uc3QgcmVzID0ge1xuICAgICAgICAgICAgZGF5OiBudWxsLFxuICAgICAgICAgICAgaG91cnM6IG51bGwsXG4gICAgICAgICAgICBtaWxsaXNlY29uZHM6IG51bGwsXG4gICAgICAgICAgICBtaW51dGVzOiBudWxsLFxuICAgICAgICAgICAgbW9udGg6IG51bGwsXG4gICAgICAgICAgICBzZWNvbmRzOiBudWxsLFxuICAgICAgICAgICAgeWVhcjogbnVsbFxuICAgICAgICB9O1xuICAgICAgICBpZiAoIWRhdGUgfHwgIWRhdGVGb3JtYXQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGVGb3JtYXQuaW5kZXhPZigneScpID49IDApIHtcbiAgICAgICAgICAgIHJlcy55ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRlRm9ybWF0LmluZGV4T2YoJ00nKSA+PSAwKSB7XG4gICAgICAgICAgICByZXMubW9udGggPSBkYXRlLmdldE1vbnRoKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGVGb3JtYXQuaW5kZXhPZignZCcpID49IDApIHtcbiAgICAgICAgICAgIHJlcy5kYXkgPSBkYXRlLmdldERhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0ZUZvcm1hdC5pbmRleE9mKCdoJykgPj0gMCkge1xuICAgICAgICAgICAgcmVzLmhvdXJzID0gZGF0ZS5nZXRIb3VycygpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRlRm9ybWF0LmluZGV4T2YoJ20nKSA+PSAwKSB7XG4gICAgICAgICAgICByZXMubWludXRlcyA9IGRhdGUuZ2V0TWludXRlcygpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRlRm9ybWF0LmluZGV4T2YoJ3MnKSA+PSAwKSB7XG4gICAgICAgICAgICByZXMuc2Vjb25kcyA9IGRhdGUuZ2V0U2Vjb25kcygpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRlRm9ybWF0LmluZGV4T2YoJ2YnKSA+PSAwKSB7XG4gICAgICAgICAgICByZXMubWlsbGlzZWNvbmRzID0gZGF0ZS5nZXRNaWxsaXNlY29uZHMoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBmaW5kVmFsdWVJblNldCh0YXJnZXQ6IGFueSwgc2VhcmNoVmFsOiBTZXQ8YW55Pikge1xuICAgICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZWFyY2hWYWwuaGFzKCh0YXJnZXQgaW5zdGFuY2VvZiBEYXRlKSA/IHRhcmdldC50b0lTT1N0cmluZygpIDogdGFyZ2V0KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdmFsaWRhdGVJbnB1dERhdGEodGFyZ2V0OiBEYXRlKSB7XG4gICAgICAgIGlmICghKHRhcmdldCBpbnN0YW5jZW9mIERhdGUpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBwZXJmb3JtIGZpbHRlcmluZyBvbiBcXCdkYXRlXFwnIGNvbHVtbiBiZWNhdXNlIHRoZSBkYXRhc291cmNlIG9iamVjdCB0eXBlIGlzIG5vdCBcXCdEYXRlXFwnLicpO1xuICAgICAgICB9XG4gICAgfVxufVxuLyoqXG4gKiBQcm92aWRlcyBmaWx0ZXJpbmcgb3BlcmF0aW9ucyBmb3IgRGF0ZXNcbiAqXG4gKiBAZXhwb3J0XG4gKi9cbmV4cG9ydCBjbGFzcyBJZ3hEYXRlRmlsdGVyaW5nT3BlcmFuZCBleHRlbmRzIElneEJhc2VEYXRlVGltZUZpbHRlcmluZ09wZXJhbmQge1xuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5vcGVyYXRpb25zID0gW3tcbiAgICAgICAgICAgIG5hbWU6ICdlcXVhbHMnLFxuICAgICAgICAgICAgaXNVbmFyeTogZmFsc2UsXG4gICAgICAgICAgICBpY29uTmFtZTogJ2VxdWFscycsXG4gICAgICAgICAgICBsb2dpYzogKHRhcmdldDogRGF0ZSwgc2VhcmNoVmFsOiBEYXRlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMudmFsaWRhdGVJbnB1dERhdGEodGFyZ2V0KTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldHAgPSBJZ3hEYXRlRmlsdGVyaW5nT3BlcmFuZC5nZXREYXRlUGFydHModGFyZ2V0LCAneU1kJyk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VhcmNocCA9IElneERhdGVGaWx0ZXJpbmdPcGVyYW5kLmdldERhdGVQYXJ0cyhzZWFyY2hWYWwsICd5TWQnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0cC55ZWFyID09PSBzZWFyY2hwLnllYXIgJiZcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0cC5tb250aCA9PT0gc2VhcmNocC5tb250aCAmJlxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRwLmRheSA9PT0gc2VhcmNocC5kYXk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIG5hbWU6ICdkb2VzTm90RXF1YWwnLFxuICAgICAgICAgICAgaXNVbmFyeTogZmFsc2UsXG4gICAgICAgICAgICBpY29uTmFtZTogJ25vdC1lcXVhbCcsXG4gICAgICAgICAgICBsb2dpYzogKHRhcmdldDogRGF0ZSwgc2VhcmNoVmFsOiBEYXRlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZUlucHV0RGF0YSh0YXJnZXQpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0cCA9IElneERhdGVGaWx0ZXJpbmdPcGVyYW5kLmdldERhdGVQYXJ0cyh0YXJnZXQsICd5TWQnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWFyY2hwID0gSWd4RGF0ZUZpbHRlcmluZ09wZXJhbmQuZ2V0RGF0ZVBhcnRzKHNlYXJjaFZhbCwgJ3lNZCcpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXRwLnllYXIgIT09IHNlYXJjaHAueWVhciB8fFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRwLm1vbnRoICE9PSBzZWFyY2hwLm1vbnRoIHx8XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldHAuZGF5ICE9PSBzZWFyY2hwLmRheTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgbmFtZTogJ2JlZm9yZScsXG4gICAgICAgICAgICBpc1VuYXJ5OiBmYWxzZSxcbiAgICAgICAgICAgIGljb25OYW1lOiAnaXMtYmVmb3JlJyxcbiAgICAgICAgICAgIGxvZ2ljOiAodGFyZ2V0OiBEYXRlLCBzZWFyY2hWYWw6IERhdGUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZUlucHV0RGF0YSh0YXJnZXQpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldCA8IHNlYXJjaFZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgbmFtZTogJ2FmdGVyJyxcbiAgICAgICAgICAgIGlzVW5hcnk6IGZhbHNlLFxuICAgICAgICAgICAgaWNvbk5hbWU6ICdpcy1hZnRlcicsXG4gICAgICAgICAgICBsb2dpYzogKHRhcmdldDogRGF0ZSwgc2VhcmNoVmFsOiBEYXRlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMudmFsaWRhdGVJbnB1dERhdGEodGFyZ2V0KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQgPiBzZWFyY2hWYWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIG5hbWU6ICd0b2RheScsXG4gICAgICAgICAgICBpc1VuYXJ5OiB0cnVlLFxuICAgICAgICAgICAgaWNvbk5hbWU6ICd0b2RheScsXG4gICAgICAgICAgICBsb2dpYzogKHRhcmdldDogRGF0ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlSW5wdXREYXRhKHRhcmdldCk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBkID0gSWd4RGF0ZUZpbHRlcmluZ09wZXJhbmQuZ2V0RGF0ZVBhcnRzKHRhcmdldCwgJ3lNZCcpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5vdyA9IElneERhdGVGaWx0ZXJpbmdPcGVyYW5kLmdldERhdGVQYXJ0cyhuZXcgRGF0ZSgpLCAneU1kJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQueWVhciA9PT0gbm93LnllYXIgJiZcbiAgICAgICAgICAgICAgICAgICAgZC5tb250aCA9PT0gbm93Lm1vbnRoICYmXG4gICAgICAgICAgICAgICAgICAgIGQuZGF5ID09PSBub3cuZGF5O1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiAneWVzdGVyZGF5JyxcbiAgICAgICAgICAgIGlzVW5hcnk6IHRydWUsXG4gICAgICAgICAgICBpY29uTmFtZTogJ3llc3RlcmRheScsXG4gICAgICAgICAgICBsb2dpYzogKHRhcmdldDogRGF0ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlSW5wdXREYXRhKHRhcmdldCk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0ZCA9IElneERhdGVGaWx0ZXJpbmdPcGVyYW5kLmdldERhdGVQYXJ0cyh0YXJnZXQsICd5TWQnKTtcbiAgICAgICAgICAgICAgICBjb25zdCB5ID0gKChkKSA9PiBuZXcgRGF0ZShkLnNldERhdGUoZC5nZXREYXRlKCkgLSAxKSkpKG5ldyBEYXRlKCkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHllc3RlcmRheSA9IElneERhdGVGaWx0ZXJpbmdPcGVyYW5kLmdldERhdGVQYXJ0cyh5LCAneU1kJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRkLnllYXIgPT09IHllc3RlcmRheS55ZWFyICYmXG4gICAgICAgICAgICAgICAgICAgIHRkLm1vbnRoID09PSB5ZXN0ZXJkYXkubW9udGggJiZcbiAgICAgICAgICAgICAgICAgICAgdGQuZGF5ID09PSB5ZXN0ZXJkYXkuZGF5O1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiAndGhpc01vbnRoJyxcbiAgICAgICAgICAgIGlzVW5hcnk6IHRydWUsXG4gICAgICAgICAgICBpY29uTmFtZTogJ3RoaXMtbW9udGgnLFxuICAgICAgICAgICAgbG9naWM6ICh0YXJnZXQ6IERhdGUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZUlucHV0RGF0YSh0YXJnZXQpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZCA9IElneERhdGVGaWx0ZXJpbmdPcGVyYW5kLmdldERhdGVQYXJ0cyh0YXJnZXQsICd5TScpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5vdyA9IElneERhdGVGaWx0ZXJpbmdPcGVyYW5kLmdldERhdGVQYXJ0cyhuZXcgRGF0ZSgpLCAneU0nKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC55ZWFyID09PSBub3cueWVhciAmJlxuICAgICAgICAgICAgICAgICAgICBkLm1vbnRoID09PSBub3cubW9udGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIG5hbWU6ICdsYXN0TW9udGgnLFxuICAgICAgICAgICAgaXNVbmFyeTogdHJ1ZSxcbiAgICAgICAgICAgIGljb25OYW1lOiAnbGFzdC1tb250aCcsXG4gICAgICAgICAgICBsb2dpYzogKHRhcmdldDogRGF0ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlSW5wdXREYXRhKHRhcmdldCk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBkID0gSWd4RGF0ZUZpbHRlcmluZ09wZXJhbmQuZ2V0RGF0ZVBhcnRzKHRhcmdldCwgJ3lNJyk7XG4gICAgICAgICAgICAgICAgY29uc3Qgbm93ID0gSWd4RGF0ZUZpbHRlcmluZ09wZXJhbmQuZ2V0RGF0ZVBhcnRzKG5ldyBEYXRlKCksICd5TScpO1xuICAgICAgICAgICAgICAgIGlmICghbm93Lm1vbnRoKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vdy5tb250aCA9IDExO1xuICAgICAgICAgICAgICAgICAgICBub3cueWVhciAtPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG5vdy5tb250aC0tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZC55ZWFyID09PSBub3cueWVhciAmJlxuICAgICAgICAgICAgICAgICAgICBkLm1vbnRoID09PSBub3cubW9udGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIG5hbWU6ICduZXh0TW9udGgnLFxuICAgICAgICAgICAgaXNVbmFyeTogdHJ1ZSxcbiAgICAgICAgICAgIGljb25OYW1lOiAnbmV4dC1tb250aCcsXG4gICAgICAgICAgICBsb2dpYzogKHRhcmdldDogRGF0ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlSW5wdXREYXRhKHRhcmdldCk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBkID0gSWd4RGF0ZUZpbHRlcmluZ09wZXJhbmQuZ2V0RGF0ZVBhcnRzKHRhcmdldCwgJ3lNJyk7XG4gICAgICAgICAgICAgICAgY29uc3Qgbm93ID0gSWd4RGF0ZUZpbHRlcmluZ09wZXJhbmQuZ2V0RGF0ZVBhcnRzKG5ldyBEYXRlKCksICd5TScpO1xuICAgICAgICAgICAgICAgIGlmIChub3cubW9udGggPT09IDExKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vdy5tb250aCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIG5vdy55ZWFyICs9IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbm93Lm1vbnRoKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBkLnllYXIgPT09IG5vdy55ZWFyICYmXG4gICAgICAgICAgICAgICAgICAgIGQubW9udGggPT09IG5vdy5tb250aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgbmFtZTogJ3RoaXNZZWFyJyxcbiAgICAgICAgICAgIGlzVW5hcnk6IHRydWUsXG4gICAgICAgICAgICBpY29uTmFtZTogJ3RoaXMteWVhcicsXG4gICAgICAgICAgICBsb2dpYzogKHRhcmdldDogRGF0ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlSW5wdXREYXRhKHRhcmdldCk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBkID0gSWd4RGF0ZUZpbHRlcmluZ09wZXJhbmQuZ2V0RGF0ZVBhcnRzKHRhcmdldCwgJ3knKTtcbiAgICAgICAgICAgICAgICBjb25zdCBub3cgPSBJZ3hEYXRlRmlsdGVyaW5nT3BlcmFuZC5nZXREYXRlUGFydHMobmV3IERhdGUoKSwgJ3knKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC55ZWFyID09PSBub3cueWVhcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgbmFtZTogJ2xhc3RZZWFyJyxcbiAgICAgICAgICAgIGlzVW5hcnk6IHRydWUsXG4gICAgICAgICAgICBpY29uTmFtZTogJ2xhc3QteWVhcicsXG4gICAgICAgICAgICBsb2dpYzogKHRhcmdldDogRGF0ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlSW5wdXREYXRhKHRhcmdldCk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBkID0gSWd4RGF0ZUZpbHRlcmluZ09wZXJhbmQuZ2V0RGF0ZVBhcnRzKHRhcmdldCwgJ3knKTtcbiAgICAgICAgICAgICAgICBjb25zdCBub3cgPSBJZ3hEYXRlRmlsdGVyaW5nT3BlcmFuZC5nZXREYXRlUGFydHMobmV3IERhdGUoKSwgJ3knKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC55ZWFyID09PSBub3cueWVhciAtIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIG5hbWU6ICduZXh0WWVhcicsXG4gICAgICAgICAgICBpc1VuYXJ5OiB0cnVlLFxuICAgICAgICAgICAgaWNvbk5hbWU6ICduZXh0LXllYXInLFxuICAgICAgICAgICAgbG9naWM6ICh0YXJnZXQ6IERhdGUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZUlucHV0RGF0YSh0YXJnZXQpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZCA9IElneERhdGVGaWx0ZXJpbmdPcGVyYW5kLmdldERhdGVQYXJ0cyh0YXJnZXQsICd5Jyk7XG4gICAgICAgICAgICAgICAgY29uc3Qgbm93ID0gSWd4RGF0ZUZpbHRlcmluZ09wZXJhbmQuZ2V0RGF0ZVBhcnRzKG5ldyBEYXRlKCksICd5Jyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQueWVhciA9PT0gbm93LnllYXIgKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XS5jb25jYXQodGhpcy5vcGVyYXRpb25zKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBJZ3hEYXRlVGltZUZpbHRlcmluZ09wZXJhbmQgZXh0ZW5kcyBJZ3hCYXNlRGF0ZVRpbWVGaWx0ZXJpbmdPcGVyYW5kIHtcbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMub3BlcmF0aW9ucyA9IFt7XG4gICAgICAgICAgICBuYW1lOiAnZXF1YWxzJyxcbiAgICAgICAgICAgIGlzVW5hcnk6IGZhbHNlLFxuICAgICAgICAgICAgaWNvbk5hbWU6ICdlcXVhbHMnLFxuICAgICAgICAgICAgbG9naWM6ICh0YXJnZXQ6IERhdGUsIHNlYXJjaFZhbDogRGF0ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZUlucHV0RGF0YSh0YXJnZXQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldHAgPSBJZ3hEYXRlVGltZUZpbHRlcmluZ09wZXJhbmQuZ2V0RGF0ZVBhcnRzKHRhcmdldCwgJ3lNZGhtcycpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlYXJjaHAgPSBJZ3hEYXRlVGltZUZpbHRlcmluZ09wZXJhbmQuZ2V0RGF0ZVBhcnRzKHNlYXJjaFZhbCwgJ3lNZGhtcycpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXRwLnllYXIgPT09IHNlYXJjaHAueWVhciAmJlxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRwLm1vbnRoID09PSBzZWFyY2hwLm1vbnRoICYmXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldHAuZGF5ID09PSBzZWFyY2hwLmRheSAmJlxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRwLmhvdXJzID09PSBzZWFyY2hwLmhvdXJzICYmXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldHAubWludXRlcyA9PT0gc2VhcmNocC5taW51dGVzICYmXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldHAuc2Vjb25kcyA9PT0gc2VhcmNocC5zZWNvbmRzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiAnZG9lc05vdEVxdWFsJyxcbiAgICAgICAgICAgIGlzVW5hcnk6IGZhbHNlLFxuICAgICAgICAgICAgaWNvbk5hbWU6ICdub3QtZXF1YWwnLFxuICAgICAgICAgICAgbG9naWM6ICh0YXJnZXQ6IERhdGUsIHNlYXJjaFZhbDogRGF0ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlSW5wdXREYXRhKHRhcmdldCk7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0cCA9IElneERhdGVUaW1lRmlsdGVyaW5nT3BlcmFuZC5nZXREYXRlUGFydHModGFyZ2V0LCAneU1kaG1zJyk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VhcmNocCA9IElneERhdGVUaW1lRmlsdGVyaW5nT3BlcmFuZC5nZXREYXRlUGFydHMoc2VhcmNoVmFsLCAneU1kaG1zJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldHAueWVhciAhPT0gc2VhcmNocC55ZWFyIHx8XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldHAubW9udGggIT09IHNlYXJjaHAubW9udGggfHxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0cC5kYXkgIT09IHNlYXJjaHAuZGF5IHx8XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldHAuaG91cnMgIT09IHNlYXJjaHAuaG91cnMgfHxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0cC5taW51dGVzICE9PSBzZWFyY2hwLm1pbnV0ZXMgfHxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0cC5zZWNvbmRzICE9PSBzZWFyY2hwLnNlY29uZHM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIG5hbWU6ICdiZWZvcmUnLFxuICAgICAgICAgICAgaXNVbmFyeTogZmFsc2UsXG4gICAgICAgICAgICBpY29uTmFtZTogJ2lzLWJlZm9yZScsXG4gICAgICAgICAgICBsb2dpYzogKHRhcmdldDogRGF0ZSwgc2VhcmNoVmFsOiBEYXRlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMudmFsaWRhdGVJbnB1dERhdGEodGFyZ2V0KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQgPCBzZWFyY2hWYWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIG5hbWU6ICdhZnRlcicsXG4gICAgICAgICAgICBpc1VuYXJ5OiBmYWxzZSxcbiAgICAgICAgICAgIGljb25OYW1lOiAnaXMtYWZ0ZXInLFxuICAgICAgICAgICAgbG9naWM6ICh0YXJnZXQ6IERhdGUsIHNlYXJjaFZhbDogRGF0ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlSW5wdXREYXRhKHRhcmdldCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0ID4gc2VhcmNoVmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiAndG9kYXknLFxuICAgICAgICAgICAgaXNVbmFyeTogdHJ1ZSxcbiAgICAgICAgICAgIGljb25OYW1lOiAndG9kYXknLFxuICAgICAgICAgICAgbG9naWM6ICh0YXJnZXQ6IERhdGUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZUlucHV0RGF0YSh0YXJnZXQpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZCA9IElneERhdGVUaW1lRmlsdGVyaW5nT3BlcmFuZC5nZXREYXRlUGFydHModGFyZ2V0LCAneU1kJyk7XG4gICAgICAgICAgICAgICAgY29uc3Qgbm93ID0gSWd4RGF0ZVRpbWVGaWx0ZXJpbmdPcGVyYW5kLmdldERhdGVQYXJ0cyhuZXcgRGF0ZSgpLCAneU1kJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQueWVhciA9PT0gbm93LnllYXIgJiZcbiAgICAgICAgICAgICAgICAgICAgZC5tb250aCA9PT0gbm93Lm1vbnRoICYmXG4gICAgICAgICAgICAgICAgICAgIGQuZGF5ID09PSBub3cuZGF5O1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiAneWVzdGVyZGF5JyxcbiAgICAgICAgICAgIGlzVW5hcnk6IHRydWUsXG4gICAgICAgICAgICBpY29uTmFtZTogJ3llc3RlcmRheScsXG4gICAgICAgICAgICBsb2dpYzogKHRhcmdldDogRGF0ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlSW5wdXREYXRhKHRhcmdldCk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0ZCA9IElneERhdGVUaW1lRmlsdGVyaW5nT3BlcmFuZC5nZXREYXRlUGFydHModGFyZ2V0LCAneU1kJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgeSA9ICgoZCkgPT4gbmV3IERhdGUoZC5zZXREYXRlKGQuZ2V0RGF0ZSgpIC0gMSkpKShuZXcgRGF0ZSgpKTtcbiAgICAgICAgICAgICAgICBjb25zdCB5ZXN0ZXJkYXkgPSBJZ3hEYXRlVGltZUZpbHRlcmluZ09wZXJhbmQuZ2V0RGF0ZVBhcnRzKHksICd5TWQnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGQueWVhciA9PT0geWVzdGVyZGF5LnllYXIgJiZcbiAgICAgICAgICAgICAgICAgICAgdGQubW9udGggPT09IHllc3RlcmRheS5tb250aCAmJlxuICAgICAgICAgICAgICAgICAgICB0ZC5kYXkgPT09IHllc3RlcmRheS5kYXk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIG5hbWU6ICd0aGlzTW9udGgnLFxuICAgICAgICAgICAgaXNVbmFyeTogdHJ1ZSxcbiAgICAgICAgICAgIGljb25OYW1lOiAndGhpcy1tb250aCcsXG4gICAgICAgICAgICBsb2dpYzogKHRhcmdldDogRGF0ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlSW5wdXREYXRhKHRhcmdldCk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBkID0gSWd4RGF0ZVRpbWVGaWx0ZXJpbmdPcGVyYW5kLmdldERhdGVQYXJ0cyh0YXJnZXQsICd5TScpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5vdyA9IElneERhdGVUaW1lRmlsdGVyaW5nT3BlcmFuZC5nZXREYXRlUGFydHMobmV3IERhdGUoKSwgJ3lNJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQueWVhciA9PT0gbm93LnllYXIgJiZcbiAgICAgICAgICAgICAgICAgICAgZC5tb250aCA9PT0gbm93Lm1vbnRoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiAnbGFzdE1vbnRoJyxcbiAgICAgICAgICAgIGlzVW5hcnk6IHRydWUsXG4gICAgICAgICAgICBpY29uTmFtZTogJ2xhc3QtbW9udGgnLFxuICAgICAgICAgICAgbG9naWM6ICh0YXJnZXQ6IERhdGUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZUlucHV0RGF0YSh0YXJnZXQpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZCA9IElneERhdGVUaW1lRmlsdGVyaW5nT3BlcmFuZC5nZXREYXRlUGFydHModGFyZ2V0LCAneU0nKTtcbiAgICAgICAgICAgICAgICBjb25zdCBub3cgPSBJZ3hEYXRlVGltZUZpbHRlcmluZ09wZXJhbmQuZ2V0RGF0ZVBhcnRzKG5ldyBEYXRlKCksICd5TScpO1xuICAgICAgICAgICAgICAgIGlmICghbm93Lm1vbnRoKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vdy5tb250aCA9IDExO1xuICAgICAgICAgICAgICAgICAgICBub3cueWVhciAtPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG5vdy5tb250aC0tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZC55ZWFyID09PSBub3cueWVhciAmJlxuICAgICAgICAgICAgICAgICAgICBkLm1vbnRoID09PSBub3cubW9udGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIG5hbWU6ICduZXh0TW9udGgnLFxuICAgICAgICAgICAgaXNVbmFyeTogdHJ1ZSxcbiAgICAgICAgICAgIGljb25OYW1lOiAnbmV4dC1tb250aCcsXG4gICAgICAgICAgICBsb2dpYzogKHRhcmdldDogRGF0ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlSW5wdXREYXRhKHRhcmdldCk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBkID0gSWd4RGF0ZVRpbWVGaWx0ZXJpbmdPcGVyYW5kLmdldERhdGVQYXJ0cyh0YXJnZXQsICd5TScpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5vdyA9IElneERhdGVUaW1lRmlsdGVyaW5nT3BlcmFuZC5nZXREYXRlUGFydHMobmV3IERhdGUoKSwgJ3lNJyk7XG4gICAgICAgICAgICAgICAgaWYgKG5vdy5tb250aCA9PT0gMTEpIHtcbiAgICAgICAgICAgICAgICAgICAgbm93Lm1vbnRoID0gMDtcbiAgICAgICAgICAgICAgICAgICAgbm93LnllYXIgKz0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBub3cubW9udGgrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQueWVhciA9PT0gbm93LnllYXIgJiZcbiAgICAgICAgICAgICAgICAgICAgZC5tb250aCA9PT0gbm93Lm1vbnRoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiAndGhpc1llYXInLFxuICAgICAgICAgICAgaXNVbmFyeTogdHJ1ZSxcbiAgICAgICAgICAgIGljb25OYW1lOiAndGhpcy15ZWFyJyxcbiAgICAgICAgICAgIGxvZ2ljOiAodGFyZ2V0OiBEYXRlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMudmFsaWRhdGVJbnB1dERhdGEodGFyZ2V0KTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGQgPSBJZ3hEYXRlVGltZUZpbHRlcmluZ09wZXJhbmQuZ2V0RGF0ZVBhcnRzKHRhcmdldCwgJ3knKTtcbiAgICAgICAgICAgICAgICBjb25zdCBub3cgPSBJZ3hEYXRlVGltZUZpbHRlcmluZ09wZXJhbmQuZ2V0RGF0ZVBhcnRzKG5ldyBEYXRlKCksICd5Jyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQueWVhciA9PT0gbm93LnllYXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIG5hbWU6ICdsYXN0WWVhcicsXG4gICAgICAgICAgICBpc1VuYXJ5OiB0cnVlLFxuICAgICAgICAgICAgaWNvbk5hbWU6ICdsYXN0LXllYXInLFxuICAgICAgICAgICAgbG9naWM6ICh0YXJnZXQ6IERhdGUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZUlucHV0RGF0YSh0YXJnZXQpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZCA9IElneERhdGVUaW1lRmlsdGVyaW5nT3BlcmFuZC5nZXREYXRlUGFydHModGFyZ2V0LCAneScpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5vdyA9IElneERhdGVUaW1lRmlsdGVyaW5nT3BlcmFuZC5nZXREYXRlUGFydHMobmV3IERhdGUoKSwgJ3knKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC55ZWFyID09PSBub3cueWVhciAtIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIG5hbWU6ICduZXh0WWVhcicsXG4gICAgICAgICAgICBpc1VuYXJ5OiB0cnVlLFxuICAgICAgICAgICAgaWNvbk5hbWU6ICduZXh0LXllYXInLFxuICAgICAgICAgICAgbG9naWM6ICh0YXJnZXQ6IERhdGUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZUlucHV0RGF0YSh0YXJnZXQpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZCA9IElneERhdGVUaW1lRmlsdGVyaW5nT3BlcmFuZC5nZXREYXRlUGFydHModGFyZ2V0LCAneScpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5vdyA9IElneERhdGVUaW1lRmlsdGVyaW5nT3BlcmFuZC5nZXREYXRlUGFydHMobmV3IERhdGUoKSwgJ3knKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC55ZWFyID09PSBub3cueWVhciArIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1dLmNvbmNhdCh0aGlzLm9wZXJhdGlvbnMpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIElneFRpbWVGaWx0ZXJpbmdPcGVyYW5kIGV4dGVuZHMgSWd4QmFzZURhdGVUaW1lRmlsdGVyaW5nT3BlcmFuZCB7XG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLm9wZXJhdGlvbnMgPSBbe1xuICAgICAgICAgICAgbmFtZTogJ2F0JyxcbiAgICAgICAgICAgIGlzVW5hcnk6IGZhbHNlLFxuICAgICAgICAgICAgaWNvbk5hbWU6ICdlcXVhbHMnLFxuICAgICAgICAgICAgbG9naWM6ICh0YXJnZXQ6IERhdGUsIHNlYXJjaFZhbDogRGF0ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZUlucHV0RGF0YSh0YXJnZXQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldHAgPSBJZ3hUaW1lRmlsdGVyaW5nT3BlcmFuZC5nZXREYXRlUGFydHModGFyZ2V0LCAnaG1zJyk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VhcmNocCA9IElneFRpbWVGaWx0ZXJpbmdPcGVyYW5kLmdldERhdGVQYXJ0cyhzZWFyY2hWYWwsICdobXMnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0cC5ob3VycyA9PT0gc2VhcmNocC5ob3VycyAmJlxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRwLm1pbnV0ZXMgPT09IHNlYXJjaHAubWludXRlcyAmJlxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRwLnNlY29uZHMgPT09IHNlYXJjaHAuc2Vjb25kcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgbmFtZTogJ25vdF9hdCcsXG4gICAgICAgICAgICBpc1VuYXJ5OiBmYWxzZSxcbiAgICAgICAgICAgIGljb25OYW1lOiAnbm90LWVxdWFsJyxcbiAgICAgICAgICAgIGxvZ2ljOiAodGFyZ2V0OiBEYXRlLCBzZWFyY2hWYWw6IERhdGUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZUlucHV0RGF0YSh0YXJnZXQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldHAgPSBJZ3hUaW1lRmlsdGVyaW5nT3BlcmFuZC5nZXREYXRlUGFydHModGFyZ2V0LCAnaG1zJyk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VhcmNocCA9IElneFRpbWVGaWx0ZXJpbmdPcGVyYW5kLmdldERhdGVQYXJ0cyhzZWFyY2hWYWwsICdobXMnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0cC5ob3VycyAhPT0gc2VhcmNocC5ob3VycyB8fFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRwLm1pbnV0ZXMgIT09IHNlYXJjaHAubWludXRlcyB8fFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRwLnNlY29uZHMgIT09IHNlYXJjaHAuc2Vjb25kcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgbmFtZTogJ2JlZm9yZScsXG4gICAgICAgICAgICBpc1VuYXJ5OiBmYWxzZSxcbiAgICAgICAgICAgIGljb25OYW1lOiAnaXMtYmVmb3JlJyxcbiAgICAgICAgICAgIGxvZ2ljOiAodGFyZ2V0OiBEYXRlLCBzZWFyY2hWYWw6IERhdGUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZUlucHV0RGF0YSh0YXJnZXQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldG4gPSBJZ3hUaW1lRmlsdGVyaW5nT3BlcmFuZC5nZXREYXRlUGFydHModGFyZ2V0LCAnaG1zJyk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VhcmNoID0gSWd4VGltZUZpbHRlcmluZ09wZXJhbmQuZ2V0RGF0ZVBhcnRzKHNlYXJjaFZhbCwgJ2htcycpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldG4uaG91cnMgPCBzZWFyY2guaG91cnMgPyB0cnVlIDogdGFyZ2V0bi5ob3VycyA9PT0gc2VhcmNoLmhvdXJzICYmIHRhcmdldG4ubWludXRlcyA8IHNlYXJjaC5taW51dGVzID9cbiAgICAgICAgICAgICAgICAgICAgdHJ1ZSA6IHRhcmdldG4uaG91cnMgPT09IHNlYXJjaC5ob3VycyAmJiB0YXJnZXRuLm1pbnV0ZXMgPT09IHNlYXJjaC5taW51dGVzICYmIHRhcmdldG4uc2Vjb25kcyA8IHNlYXJjaC5zZWNvbmRzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiAnYWZ0ZXInLFxuICAgICAgICAgICAgaXNVbmFyeTogZmFsc2UsXG4gICAgICAgICAgICBpY29uTmFtZTogJ2lzLWFmdGVyJyxcbiAgICAgICAgICAgIGxvZ2ljOiAodGFyZ2V0OiBEYXRlLCBzZWFyY2hWYWw6IERhdGUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZUlucHV0RGF0YSh0YXJnZXQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldG4gPSBJZ3hUaW1lRmlsdGVyaW5nT3BlcmFuZC5nZXREYXRlUGFydHModGFyZ2V0LCAnaG1zJyk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VhcmNoID0gSWd4VGltZUZpbHRlcmluZ09wZXJhbmQuZ2V0RGF0ZVBhcnRzKHNlYXJjaFZhbCwgJ2htcycpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldG4uaG91cnMgPiBzZWFyY2guaG91cnMgPyB0cnVlIDogdGFyZ2V0bi5ob3VycyA9PT0gc2VhcmNoLmhvdXJzICYmIHRhcmdldG4ubWludXRlcyA+IHNlYXJjaC5taW51dGVzID9cbiAgICAgICAgICAgICAgICAgICAgdHJ1ZSA6IHRhcmdldG4uaG91cnMgPT09IHNlYXJjaC5ob3VycyAmJiB0YXJnZXRuLm1pbnV0ZXMgPT09IHNlYXJjaC5taW51dGVzICYmIHRhcmdldG4uc2Vjb25kcyA+IHNlYXJjaC5zZWNvbmRzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiAnYXRfYmVmb3JlJyxcbiAgICAgICAgICAgIGlzVW5hcnk6IGZhbHNlLFxuICAgICAgICAgICAgaWNvbk5hbWU6ICdpcy1iZWZvcmUnLFxuICAgICAgICAgICAgbG9naWM6ICh0YXJnZXQ6IERhdGUsIHNlYXJjaFZhbDogRGF0ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlSW5wdXREYXRhKHRhcmdldCk7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0biA9IElneFRpbWVGaWx0ZXJpbmdPcGVyYW5kLmdldERhdGVQYXJ0cyh0YXJnZXQsICdobXMnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWFyY2ggPSBJZ3hUaW1lRmlsdGVyaW5nT3BlcmFuZC5nZXREYXRlUGFydHMoc2VhcmNoVmFsLCAnaG1zJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0YXJnZXRuLmhvdXJzID09PSBzZWFyY2guaG91cnMgJiYgdGFyZ2V0bi5taW51dGVzID09PSBzZWFyY2gubWludXRlcyAmJiB0YXJnZXRuLnNlY29uZHMgPT09IHNlYXJjaC5zZWNvbmRzKSB8fFxuICAgICAgICAgICAgICAgIHRhcmdldG4uaG91cnMgPCBzZWFyY2guaG91cnMgPyB0cnVlIDogdGFyZ2V0bi5ob3VycyA9PT0gc2VhcmNoLmhvdXJzICYmIHRhcmdldG4ubWludXRlcyA8IHNlYXJjaC5taW51dGVzID9cbiAgICAgICAgICAgICAgICAgICAgdHJ1ZSA6IHRhcmdldG4uaG91cnMgPT09IHNlYXJjaC5ob3VycyAmJiB0YXJnZXRuLm1pbnV0ZXMgPT09IHNlYXJjaC5taW51dGVzICYmIHRhcmdldG4uc2Vjb25kcyA8IHNlYXJjaC5zZWNvbmRzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiAnYXRfYWZ0ZXInLFxuICAgICAgICAgICAgaXNVbmFyeTogZmFsc2UsXG4gICAgICAgICAgICBpY29uTmFtZTogJ2lzLWFmdGVyJyxcbiAgICAgICAgICAgIGxvZ2ljOiAodGFyZ2V0OiBEYXRlLCBzZWFyY2hWYWw6IERhdGUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZUlucHV0RGF0YSh0YXJnZXQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldG4gPSBJZ3hUaW1lRmlsdGVyaW5nT3BlcmFuZC5nZXREYXRlUGFydHModGFyZ2V0LCAnaG1zJyk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VhcmNoID0gSWd4VGltZUZpbHRlcmluZ09wZXJhbmQuZ2V0RGF0ZVBhcnRzKHNlYXJjaFZhbCwgJ2htcycpO1xuICAgICAgICAgICAgICAgIHJldHVybiAodGFyZ2V0bi5ob3VycyA9PT0gc2VhcmNoLmhvdXJzICYmIHRhcmdldG4ubWludXRlcyA9PT0gc2VhcmNoLm1pbnV0ZXMgJiYgdGFyZ2V0bi5zZWNvbmRzID09PSBzZWFyY2guc2Vjb25kcykgfHxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0bi5ob3VycyA+IHNlYXJjaC5ob3VycyA/IHRydWUgOiB0YXJnZXRuLmhvdXJzID09PSBzZWFyY2guaG91cnMgJiYgdGFyZ2V0bi5taW51dGVzID4gc2VhcmNoLm1pbnV0ZXMgP1xuICAgICAgICAgICAgICAgICAgICB0cnVlIDogdGFyZ2V0bi5ob3VycyA9PT0gc2VhcmNoLmhvdXJzICYmIHRhcmdldG4ubWludXRlcyA9PT0gc2VhcmNoLm1pbnV0ZXMgJiYgdGFyZ2V0bi5zZWNvbmRzID4gc2VhcmNoLnNlY29uZHM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1dLmNvbmNhdCh0aGlzLm9wZXJhdGlvbnMpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBmaW5kVmFsdWVJblNldCh0YXJnZXQ6IGFueSwgc2VhcmNoVmFsOiBTZXQ8YW55Pikge1xuICAgICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZWFyY2hWYWwuaGFzKHRhcmdldC50b0xvY2FsZVRpbWVTdHJpbmcoKSk7XG4gICAgfVxufVxuXG4vKipcbiAqIFByb3ZpZGVzIGZpbHRlcmluZyBvcGVyYXRpb25zIGZvciBudW1iZXJzXG4gKlxuICogQGV4cG9ydFxuICovXG5leHBvcnQgY2xhc3MgSWd4TnVtYmVyRmlsdGVyaW5nT3BlcmFuZCBleHRlbmRzIElneEZpbHRlcmluZ09wZXJhbmQge1xuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5vcGVyYXRpb25zID0gW3tcbiAgICAgICAgICAgIG5hbWU6ICdlcXVhbHMnLFxuICAgICAgICAgICAgaXNVbmFyeTogZmFsc2UsXG4gICAgICAgICAgICBpY29uTmFtZTogJ2VxdWFscycsXG4gICAgICAgICAgICBsb2dpYzogKHRhcmdldDogbnVtYmVyLCBzZWFyY2hWYWw6IG51bWJlcikgPT4gdGFyZ2V0ID09PSBzZWFyY2hWYWxcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgbmFtZTogJ2RvZXNOb3RFcXVhbCcsXG4gICAgICAgICAgICBpc1VuYXJ5OiBmYWxzZSxcbiAgICAgICAgICAgIGljb25OYW1lOiAnbm90LWVxdWFsJyxcbiAgICAgICAgICAgIGxvZ2ljOiAodGFyZ2V0OiBudW1iZXIsIHNlYXJjaFZhbDogbnVtYmVyKSA9PiB0YXJnZXQgIT09IHNlYXJjaFZhbFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiAnZ3JlYXRlclRoYW4nLFxuICAgICAgICAgICAgaXNVbmFyeTogZmFsc2UsXG4gICAgICAgICAgICBpY29uTmFtZTogJ2dyZWF0ZXItdGhhbicsXG4gICAgICAgICAgICBsb2dpYzogKHRhcmdldDogbnVtYmVyLCBzZWFyY2hWYWw6IG51bWJlcikgPT4gdGFyZ2V0ID4gc2VhcmNoVmFsXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIG5hbWU6ICdsZXNzVGhhbicsXG4gICAgICAgICAgICBpc1VuYXJ5OiBmYWxzZSxcbiAgICAgICAgICAgIGljb25OYW1lOiAnbGVzcy10aGFuJyxcbiAgICAgICAgICAgIGxvZ2ljOiAodGFyZ2V0OiBudW1iZXIsIHNlYXJjaFZhbDogbnVtYmVyKSA9PiB0YXJnZXQgPCBzZWFyY2hWYWxcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgbmFtZTogJ2dyZWF0ZXJUaGFuT3JFcXVhbFRvJyxcbiAgICAgICAgICAgIGlzVW5hcnk6IGZhbHNlLFxuICAgICAgICAgICAgaWNvbk5hbWU6ICdncmVhdGVyLXRoYW4tb3ItZXF1YWwnLFxuICAgICAgICAgICAgbG9naWM6ICh0YXJnZXQ6IG51bWJlciwgc2VhcmNoVmFsOiBudW1iZXIpID0+IHRhcmdldCA+PSBzZWFyY2hWYWxcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgbmFtZTogJ2xlc3NUaGFuT3JFcXVhbFRvJyxcbiAgICAgICAgICAgIGlzVW5hcnk6IGZhbHNlLFxuICAgICAgICAgICAgaWNvbk5hbWU6ICdsZXNzLXRoYW4tb3ItZXF1YWwnLFxuICAgICAgICAgICAgbG9naWM6ICh0YXJnZXQ6IG51bWJlciwgc2VhcmNoVmFsOiBudW1iZXIpID0+IHRhcmdldCA8PSBzZWFyY2hWYWxcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgbmFtZTogJ2VtcHR5JyxcbiAgICAgICAgICAgIGlzVW5hcnk6IHRydWUsXG4gICAgICAgICAgICBpY29uTmFtZTogJ2lzLWVtcHR5JyxcbiAgICAgICAgICAgIGxvZ2ljOiAodGFyZ2V0OiBudW1iZXIpID0+IHRhcmdldCA9PT0gbnVsbCB8fCB0YXJnZXQgPT09IHVuZGVmaW5lZCB8fCBpc05hTih0YXJnZXQpXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIG5hbWU6ICdub3RFbXB0eScsXG4gICAgICAgICAgICBpc1VuYXJ5OiB0cnVlLFxuICAgICAgICAgICAgaWNvbk5hbWU6ICdub3QtZW1wdHknLFxuICAgICAgICAgICAgbG9naWM6ICh0YXJnZXQ6IG51bWJlcikgPT4gdGFyZ2V0ICE9PSBudWxsICYmIHRhcmdldCAhPT0gdW5kZWZpbmVkICYmICFpc05hTih0YXJnZXQpXG4gICAgICAgIH1dLmNvbmNhdCh0aGlzLm9wZXJhdGlvbnMpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBQcm92aWRlcyBmaWx0ZXJpbmcgb3BlcmF0aW9ucyBmb3Igc3RyaW5nc1xuICpcbiAqIEBleHBvcnRcbiAqL1xuZXhwb3J0IGNsYXNzIElneFN0cmluZ0ZpbHRlcmluZ09wZXJhbmQgZXh0ZW5kcyBJZ3hGaWx0ZXJpbmdPcGVyYW5kIHtcbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMub3BlcmF0aW9ucyA9IFt7XG4gICAgICAgICAgICBuYW1lOiAnY29udGFpbnMnLFxuICAgICAgICAgICAgaXNVbmFyeTogZmFsc2UsXG4gICAgICAgICAgICBpY29uTmFtZTogJ2NvbnRhaW5zJyxcbiAgICAgICAgICAgIGxvZ2ljOiAodGFyZ2V0OiBzdHJpbmcsIHNlYXJjaFZhbDogc3RyaW5nLCBpZ25vcmVDYXNlPzogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlYXJjaCA9IElneFN0cmluZ0ZpbHRlcmluZ09wZXJhbmQuYXBwbHlJZ25vcmVDYXNlKHNlYXJjaFZhbCwgaWdub3JlQ2FzZSk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0ID0gSWd4U3RyaW5nRmlsdGVyaW5nT3BlcmFuZC5hcHBseUlnbm9yZUNhc2UodGFyZ2V0LCBpZ25vcmVDYXNlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0LmluZGV4T2Yoc2VhcmNoKSAhPT0gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIG5hbWU6ICdkb2VzTm90Q29udGFpbicsXG4gICAgICAgICAgICBpc1VuYXJ5OiBmYWxzZSxcbiAgICAgICAgICAgIGljb25OYW1lOiAnZG9lcy1ub3QtY29udGFpbicsXG4gICAgICAgICAgICBsb2dpYzogKHRhcmdldDogc3RyaW5nLCBzZWFyY2hWYWw6IHN0cmluZywgaWdub3JlQ2FzZT86IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWFyY2ggPSBJZ3hTdHJpbmdGaWx0ZXJpbmdPcGVyYW5kLmFwcGx5SWdub3JlQ2FzZShzZWFyY2hWYWwsIGlnbm9yZUNhc2UpO1xuICAgICAgICAgICAgICAgIHRhcmdldCA9IElneFN0cmluZ0ZpbHRlcmluZ09wZXJhbmQuYXBwbHlJZ25vcmVDYXNlKHRhcmdldCwgaWdub3JlQ2FzZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldC5pbmRleE9mKHNlYXJjaCkgPT09IC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiAnc3RhcnRzV2l0aCcsXG4gICAgICAgICAgICBpc1VuYXJ5OiBmYWxzZSxcbiAgICAgICAgICAgIGljb25OYW1lOiAnc3RhcnRzLXdpdGgnLFxuICAgICAgICAgICAgbG9naWM6ICh0YXJnZXQ6IHN0cmluZywgc2VhcmNoVmFsOiBzdHJpbmcsIGlnbm9yZUNhc2U/OiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VhcmNoID0gSWd4U3RyaW5nRmlsdGVyaW5nT3BlcmFuZC5hcHBseUlnbm9yZUNhc2Uoc2VhcmNoVmFsLCBpZ25vcmVDYXNlKTtcbiAgICAgICAgICAgICAgICB0YXJnZXQgPSBJZ3hTdHJpbmdGaWx0ZXJpbmdPcGVyYW5kLmFwcGx5SWdub3JlQ2FzZSh0YXJnZXQsIGlnbm9yZUNhc2UpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQuc3RhcnRzV2l0aChzZWFyY2gpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiAnZW5kc1dpdGgnLFxuICAgICAgICAgICAgaXNVbmFyeTogZmFsc2UsXG4gICAgICAgICAgICBpY29uTmFtZTogJ2VuZHMtd2l0aCcsXG4gICAgICAgICAgICBsb2dpYzogKHRhcmdldDogc3RyaW5nLCBzZWFyY2hWYWw6IHN0cmluZywgaWdub3JlQ2FzZT86IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWFyY2ggPSBJZ3hTdHJpbmdGaWx0ZXJpbmdPcGVyYW5kLmFwcGx5SWdub3JlQ2FzZShzZWFyY2hWYWwsIGlnbm9yZUNhc2UpO1xuICAgICAgICAgICAgICAgIHRhcmdldCA9IElneFN0cmluZ0ZpbHRlcmluZ09wZXJhbmQuYXBwbHlJZ25vcmVDYXNlKHRhcmdldCwgaWdub3JlQ2FzZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldC5lbmRzV2l0aChzZWFyY2gpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiAnZXF1YWxzJyxcbiAgICAgICAgICAgIGlzVW5hcnk6IGZhbHNlLFxuICAgICAgICAgICAgaWNvbk5hbWU6ICdlcXVhbHMnLFxuICAgICAgICAgICAgbG9naWM6ICh0YXJnZXQ6IHN0cmluZywgc2VhcmNoVmFsOiBzdHJpbmcsIGlnbm9yZUNhc2U/OiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VhcmNoID0gSWd4U3RyaW5nRmlsdGVyaW5nT3BlcmFuZC5hcHBseUlnbm9yZUNhc2Uoc2VhcmNoVmFsLCBpZ25vcmVDYXNlKTtcbiAgICAgICAgICAgICAgICB0YXJnZXQgPSBJZ3hTdHJpbmdGaWx0ZXJpbmdPcGVyYW5kLmFwcGx5SWdub3JlQ2FzZSh0YXJnZXQsIGlnbm9yZUNhc2UpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQgPT09IHNlYXJjaDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgbmFtZTogJ2RvZXNOb3RFcXVhbCcsXG4gICAgICAgICAgICBpc1VuYXJ5OiBmYWxzZSxcbiAgICAgICAgICAgIGljb25OYW1lOiAnbm90LWVxdWFsJyxcbiAgICAgICAgICAgIGxvZ2ljOiAodGFyZ2V0OiBzdHJpbmcsIHNlYXJjaFZhbDogc3RyaW5nLCBpZ25vcmVDYXNlPzogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlYXJjaCA9IElneFN0cmluZ0ZpbHRlcmluZ09wZXJhbmQuYXBwbHlJZ25vcmVDYXNlKHNlYXJjaFZhbCwgaWdub3JlQ2FzZSk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0ID0gSWd4U3RyaW5nRmlsdGVyaW5nT3BlcmFuZC5hcHBseUlnbm9yZUNhc2UodGFyZ2V0LCBpZ25vcmVDYXNlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0ICE9PSBzZWFyY2g7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIG5hbWU6ICdlbXB0eScsXG4gICAgICAgICAgICBpc1VuYXJ5OiB0cnVlLFxuICAgICAgICAgICAgaWNvbk5hbWU6ICdpcy1lbXB0eScsXG4gICAgICAgICAgICBsb2dpYzogKHRhcmdldDogc3RyaW5nKSA9PiB0YXJnZXQgPT09IG51bGwgfHwgdGFyZ2V0ID09PSB1bmRlZmluZWQgfHwgdGFyZ2V0Lmxlbmd0aCA9PT0gMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiAnbm90RW1wdHknLFxuICAgICAgICAgICAgaXNVbmFyeTogdHJ1ZSxcbiAgICAgICAgICAgIGljb25OYW1lOiAnbm90LWVtcHR5JyxcbiAgICAgICAgICAgIGxvZ2ljOiAodGFyZ2V0OiBzdHJpbmcpID0+IHRhcmdldCAhPT0gbnVsbCAmJiB0YXJnZXQgIT09IHVuZGVmaW5lZCAmJiB0YXJnZXQubGVuZ3RoID4gMFxuICAgICAgICB9XS5jb25jYXQodGhpcy5vcGVyYXRpb25zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBcHBsaWVzIGNhc2Ugc2Vuc2l0aXZpdHkgb24gc3RyaW5ncyBpZiBwcm92aWRlZFxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIElneFN0cmluZ0ZpbHRlcmluZ09wZXJhbmRcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGFwcGx5SWdub3JlQ2FzZShhOiBzdHJpbmcsIGlnbm9yZUNhc2U6IGJvb2xlYW4pOiBzdHJpbmcge1xuICAgICAgICBhID0gYSA/PyAnJztcbiAgICAgICAgLy8gYnVsbGV0cHJvb2ZcbiAgICAgICAgcmV0dXJuIGlnbm9yZUNhc2UgPyAoJycgKyBhKS50b0xvd2VyQ2FzZSgpIDogYTtcbiAgICB9XG59XG5cbi8qKlxuICogSW50ZXJmYWNlIGRlc2NyaWJpbmcgZmlsdGVyaW5nIG9wZXJhdGlvbnNcbiAqXG4gKiBAZXhwb3J0XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSUZpbHRlcmluZ09wZXJhdGlvbiB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGlzVW5hcnk6IGJvb2xlYW47XG4gICAgaWNvbk5hbWU6IHN0cmluZztcbiAgICBoaWRkZW4/OiBib29sZWFuO1xuICAgIGxvZ2ljOiAodmFsdWU6IGFueSwgc2VhcmNoVmFsPzogYW55LCBpZ25vcmVDYXNlPzogYm9vbGVhbikgPT4gYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBJbnRlcmZhY2UgZGVzY3JpYmluZyBEYXRlIG9iamVjdCBpbiBwYXJ0c1xuICpcbiAqIEBleHBvcnRcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJRGF0ZVBhcnRzIHtcbiAgICB5ZWFyOiBudW1iZXI7XG4gICAgbW9udGg6IG51bWJlcjtcbiAgICBkYXk6IG51bWJlcjtcbiAgICBob3VyczogbnVtYmVyO1xuICAgIG1pbnV0ZXM6IG51bWJlcjtcbiAgICBzZWNvbmRzOiBudW1iZXI7XG4gICAgbWlsbGlzZWNvbmRzOiBudW1iZXI7XG59XG4iXX0=
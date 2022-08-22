import { IDatePickerResourceStrings } from './date-picker-resources';
import { IDateRangePickerResourceStrings } from './date-range-picker-resources';
import { IGridResourceStrings } from './grid-resources';
import { ITimePickerResourceStrings } from './time-picker-resources';
import { IPaginatorResourceStrings } from './paginator-resources';
import { ICarouselResourceStrings } from './carousel-resources';
import { IChipResourceStrings } from './chip-resources';
import { IListResourceStrings } from './list-resources';
import { ICalendarResourceStrings } from './calendar-resources';
import { IInputResourceStrings } from './input-resources';
import { ITreeResourceStrings } from './tree-resources';
import { IActionStripResourceStrings } from './action-strip-resources';
export interface IResourceStrings extends IGridResourceStrings, ITimePickerResourceStrings, ICalendarResourceStrings, ICarouselResourceStrings, IChipResourceStrings, IInputResourceStrings, IDatePickerResourceStrings, IDateRangePickerResourceStrings, IListResourceStrings, IPaginatorResourceStrings, ITreeResourceStrings, IActionStripResourceStrings {
}
/**
 * @hidden
 * IF YOU EDIT THIS OBJECT, DO NOT FORGET TO UPDATE
 * projects/igniteui-angular-i18n as well (create the appropriately named files,
 * containing the new/updated component string keys and EN strings for values + create a separate issue + pending-localization label)
 *
 * TODO Add automation tests:
 * 1) each of the folders/languages under \projects\igniteui-angular-i18n\src\ contain resources.ts file with matching components count.
 *    \projects\igniteui-angular-i18n\src\BG\resources.ts contains IgxResourceStringsBG.count matching this.CurrentResourceStrings.count
 * 2) \igniteui-angular\projects\igniteui-angular\src\public_api.ts --> Check if the new interface is added
 *    to IInputResourceStrings (just a proxy as it is later on imported in the angular-i18n package)
 */
export declare const CurrentResourceStrings: {
    GridResStrings: any;
    PaginatorResStrings: any;
    TimePickerResStrings: any;
    CalendarResStrings: any;
    ChipResStrings: any;
    DatePickerResourceStrings: any;
    DateRangePickerResStrings: any;
    CarouselResStrings: any;
    ListResStrings: any;
    InputResStrings: any;
    TreeResStrings: any;
    ActionStripResourceStrings: any;
};
/**
 * Changes the resource strings for all components in the application
 * ```
 * @param resourceStrings to be applied
 */
export declare const changei18n: (resourceStrings: IResourceStrings) => void;
/**
 * Returns current resource strings for all components
 */
export declare const getCurrentResourceStrings: () => IResourceStrings;

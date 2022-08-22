import { IgxDaysViewComponent } from './days-view.component';
import * as i0 from "@angular/core";
/** @hidden */
export declare class IgxDaysViewNavigationService {
    monthView: IgxDaysViewComponent;
    /**
     * Implements kb navigation in all MoveDirections. nextDate and nextMonthView naming convention is used for both previous/next
     *
     * @hidden
     */
    focusNextDate(target: HTMLElement, key: string, nextView?: boolean): void;
    /**
     * Focuses first focusable day in the month. Will go to next visible month, if no day in the first month is focusable
     *
     * @hidden
     */
    focusHomeDate(): void;
    /**
     * Focuses last focusable day in the month. Will go to previous visible month, if no day in the first month is focusable
     *
     * @hidden
     */
    focusEndDate(): void;
    private timedelta;
    private focusFirstDay;
    private focusLastDay;
    static ɵfac: i0.ɵɵFactoryDeclaration<IgxDaysViewNavigationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IgxDaysViewNavigationService>;
}

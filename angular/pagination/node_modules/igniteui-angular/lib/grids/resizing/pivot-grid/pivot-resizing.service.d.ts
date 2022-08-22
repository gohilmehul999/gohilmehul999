import { ColumnType } from '../../common/grid.interface';
import { PivotRowHeaderGroupType } from '../../pivot-grid/pivot-grid.interface';
import { IgxColumnResizingService } from '../resizing.service';
import * as i0 from "@angular/core";
/**
 * @hidden
 * @internal
 */
export declare class IgxPivotColumnResizingService extends IgxColumnResizingService {
    /**
     * @hidden
     */
    rowHeaderGroup: PivotRowHeaderGroupType;
    /**
     * @hidden
     */
    getColumnHeaderRenderedWidth(): any;
    protected _handlePixelResize(diff: number, column: ColumnType): void;
    protected _handlePercentageResize(diff: number, column: ColumnType): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IgxPivotColumnResizingService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IgxPivotColumnResizingService>;
}

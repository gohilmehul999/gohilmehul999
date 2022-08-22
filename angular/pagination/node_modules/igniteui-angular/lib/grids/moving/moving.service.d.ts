import { ColumnType } from '../common/grid.interface';
import * as i0 from "@angular/core";
/**
 * This enumeration is used to configure whether the drop position is set before or after
 * the target.
 */
export declare enum DropPosition {
    BeforeDropTarget = 0,
    AfterDropTarget = 1
}
/**
 * @hidden
 * @internal
 */
export declare class IgxColumnMovingService {
    cancelDrop: boolean;
    icon: HTMLElement;
    column: ColumnType;
    static ɵfac: i0.ɵɵFactoryDeclaration<IgxColumnMovingService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IgxColumnMovingService>;
}

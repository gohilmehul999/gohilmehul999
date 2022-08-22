import { IgxComboBase } from './combo.common';
import * as i0 from "@angular/core";
/**
 * @hidden
 */
export declare class IgxComboAPIService {
    disableTransitions: boolean;
    protected combo: IgxComboBase;
    get valueKey(): string;
    get item_focusable(): boolean;
    get isRemote(): boolean;
    get comboID(): string;
    register(combo: IgxComboBase): void;
    clear(): void;
    add_custom_item(): void;
    set_selected_item(itemID: any, event?: Event): void;
    is_item_selected(itemID: any): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<IgxComboAPIService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IgxComboAPIService>;
}

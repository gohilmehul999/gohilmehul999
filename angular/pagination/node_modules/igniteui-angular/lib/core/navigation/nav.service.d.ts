import { IToggleView } from './IToggleView';
import * as i0 from "@angular/core";
/**
 * Common service to be injected between components where those implementing common
 * ToggleView interface can register and toggle directives can call their methods.
 * TODO: Track currently active? Events?
 */
export declare class IgxNavigationService {
    private navs;
    constructor();
    add(id: string, navItem: IToggleView): void;
    remove(id: string): void;
    get(id: string): IToggleView;
    toggle(id: string, ...args: any[]): any;
    open(id: string, ...args: any[]): any;
    close(id: string, ...args: any[]): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<IgxNavigationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IgxNavigationService>;
}

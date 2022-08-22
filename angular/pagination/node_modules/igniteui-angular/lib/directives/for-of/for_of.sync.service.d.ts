import { IgxGridForOfDirective } from './for_of.directive';
import { VirtualHelperBaseDirective } from './base.helper.component';
import * as i0 from "@angular/core";
export declare class IgxForOfSyncService {
    private _master;
    /**
     * @hidden
     */
    isMaster(directive: IgxGridForOfDirective<any>): boolean;
    /**
     * @hidden
     */
    setMaster(directive: IgxGridForOfDirective<any>, forced?: boolean): void;
    /**
     * @hidden
     */
    resetMaster(): void;
    /**
     * @hidden
     */
    sizesCache(dir: string): number[];
    /**
     * @hidden
     */
    chunkSize(dir: string): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<IgxForOfSyncService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IgxForOfSyncService>;
}
export declare class IgxForOfScrollSyncService {
    private _masterScroll;
    setScrollMaster(dir: string, scroll: VirtualHelperBaseDirective): void;
    getScrollMaster(dir: string): VirtualHelperBaseDirective;
    static ɵfac: i0.ɵɵFactoryDeclaration<IgxForOfScrollSyncService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IgxForOfScrollSyncService>;
}

import { IgxGridNavigationService } from '../grid-navigation.service';
import { IgxPivotGridComponent } from './pivot-grid.component';
import * as i0 from "@angular/core";
export declare class IgxPivotGridNavigationService extends IgxGridNavigationService {
    grid: IgxPivotGridComponent;
    isRowHeaderActive: boolean;
    get lastRowDimensionsIndex(): number;
    focusOutRowHeader(): void;
    handleNavigation(event: KeyboardEvent): void;
    focusTbody(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IgxPivotGridNavigationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IgxPivotGridNavigationService>;
}

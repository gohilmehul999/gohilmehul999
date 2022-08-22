import * as i0 from "@angular/core";
import * as i1 from "./grid-header.component";
import * as i2 from "./grid-header-group.component";
import * as i3 from "./grid-header-row.component";
import * as i4 from "./pipes";
import * as i5 from "../common/shared.module";
import * as i6 from "../filtering/base/filtering.module";
import * as i7 from "../moving/moving.module";
import * as i8 from "../resizing/resize.module";
import * as i9 from "../common/grid-pipes.module";
export * from './grid-header-group.component';
export * from './grid-header.component';
export * from './pipes';
export { IgxGridHeaderComponent } from './grid-header.component';
export { IgxGridHeaderGroupComponent } from './grid-header-group.component';
export { IgxGridHeaderRowComponent } from './grid-header-row.component';
export declare class IgxGridHeadersModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<IgxGridHeadersModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<IgxGridHeadersModule, [typeof i1.IgxGridHeaderComponent, typeof i2.IgxGridHeaderGroupComponent, typeof i3.IgxGridHeaderRowComponent, typeof i4.SortingIndexPipe, typeof i4.IgxHeaderGroupWidthPipe, typeof i4.IgxHeaderGroupStylePipe], [typeof i5.IgxGridSharedModules, typeof i6.IgxGridFilteringModule, typeof i7.IgxColumnMovingModule, typeof i8.IgxGridResizingModule, typeof i9.IgxGridPipesModule], [typeof i1.IgxGridHeaderComponent, typeof i2.IgxGridHeaderGroupComponent, typeof i3.IgxGridHeaderRowComponent, typeof i4.IgxHeaderGroupWidthPipe, typeof i4.SortingIndexPipe, typeof i4.IgxHeaderGroupStylePipe]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<IgxGridHeadersModule>;
}

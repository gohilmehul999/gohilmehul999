import { IgxRowIslandComponent } from './row-island.component';
import { GridType, IPathSegment } from '../common/grid.interface';
import { GridBaseAPIService } from '../api.service';
import * as i0 from "@angular/core";
export declare class IgxHierarchicalGridAPIService extends GridBaseAPIService<GridType> {
    protected childRowIslands: Map<string, IgxRowIslandComponent>;
    protected childGrids: Map<string, Map<any, GridType>>;
    registerChildRowIsland(rowIsland: IgxRowIslandComponent): void;
    unsetChildRowIsland(rowIsland: IgxRowIslandComponent): void;
    getChildRowIsland(key: string): IgxRowIslandComponent;
    getChildGrid(path: Array<IPathSegment>): any;
    getChildGrids(inDepth?: boolean): any[];
    getParentRowId(childGrid: GridType): any;
    registerChildGrid(parentRowID: any, rowIslandKey: string, grid: GridType): void;
    getChildGridsForRowIsland(rowIslandKey: string): GridType[];
    getChildGridByID(rowIslandKey: any, rowID: any): GridType;
    get_row_expansion_state(record: any): boolean;
    allow_expansion_state_change(rowID: any, expanded: any): boolean;
    get_rec_by_id(rowID: any): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<IgxHierarchicalGridAPIService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IgxHierarchicalGridAPIService>;
}

import { IgxHierarchicalGridComponent } from './hierarchical-grid.component';
import { IgxRowIslandComponent } from './row-island.component';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export declare class IgxRowIslandAPIService {
    rowIsland: IgxRowIslandComponent;
    change: Subject<any>;
    protected state: Map<string, IgxRowIslandComponent>;
    protected destroyMap: Map<string, Subject<boolean>>;
    protected childRowIslands: Map<string, IgxRowIslandComponent>;
    protected childGrids: Map<any, IgxHierarchicalGridComponent>;
    register(rowIsland: IgxRowIslandComponent): void;
    unsubscribe(rowIsland: IgxRowIslandComponent): void;
    get(id: string): IgxRowIslandComponent;
    unset(id: string): void;
    reset(oldId: string, newId: string): void;
    registerChildRowIsland(rowIsland: IgxRowIslandComponent): void;
    unsetChildRowIsland(rowIsland: IgxRowIslandComponent): void;
    getChildRowIsland(rowIslandKey: string): IgxRowIslandComponent;
    registerChildGrid(parentRowID: any, grid: IgxHierarchicalGridComponent): void;
    getChildGrids(inDepth?: boolean): any[];
    getChildGridByID(rowID: any): IgxHierarchicalGridComponent;
    static ɵfac: i0.ɵɵFactoryDeclaration<IgxRowIslandAPIService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IgxRowIslandAPIService>;
}

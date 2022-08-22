import { QueryList, TemplateRef } from '@angular/core';
/** @hidden */
export declare abstract class IgxTabsBase {
    items: QueryList<IgxTabItemBase>;
    selectedIndex: number;
    abstract selectTab(tab: IgxTabItemBase, selected: boolean): any;
}
/** @hidden */
export declare abstract class IgxTabItemBase {
    disabled: boolean;
    selected: boolean;
    headerTemplate: TemplateRef<any>;
    panelTemplate: TemplateRef<any>;
    headerComponent: IgxTabHeaderBase;
    panelComponent: IgxTabContentBase;
}
/** @hidden */
export declare abstract class IgxTabHeaderBase {
    nativeElement: HTMLElement;
}
/** @hidden */
export declare abstract class IgxTabContentBase {
    nativeElement: HTMLElement;
}

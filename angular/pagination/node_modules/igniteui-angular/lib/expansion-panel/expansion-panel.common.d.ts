import { EventEmitter, InjectionToken } from '@angular/core';
import { AnimationReferenceMetadata } from '@angular/animations';
import { CancelableEventArgs, IBaseEventArgs } from '../core/utils';
export interface IgxExpansionPanelBase {
    id: string;
    cssClass: string;
    /** @hidden @internal */
    headerId: string;
    collapsed: boolean;
    animationSettings: {
        openAnimation: AnimationReferenceMetadata;
        closeAnimation: AnimationReferenceMetadata;
    };
    contentCollapsed: EventEmitter<any>;
    contentCollapsing: EventEmitter<any>;
    contentExpanded: EventEmitter<any>;
    contentExpanding: EventEmitter<any>;
    collapse(evt?: Event): any;
    expand(evt?: Event): any;
    toggle(evt?: Event): any;
}
/** @hidden */
export declare const IGX_EXPANSION_PANEL_COMPONENT: InjectionToken<IgxExpansionPanelBase>;
export interface IExpansionPanelEventArgs extends IBaseEventArgs {
    event: Event;
}
export interface IExpansionPanelCancelableEventArgs extends IExpansionPanelEventArgs, CancelableEventArgs {
}

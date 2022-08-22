import { Renderer2 } from '@angular/core';
import { IgxDragDirective, IgxDropDirective } from './drag-drop.directive';
export interface IDropStrategy {
    dropAction: (drag: IgxDragDirective, drop: IgxDropDirective, atIndex: number) => void;
}
export declare class IgxDefaultDropStrategy implements IDropStrategy {
    dropAction(_drag: IgxDragDirective, _drop: IgxDropDirective, _atIndex: number): void;
}
export declare class IgxAppendDropStrategy implements IDropStrategy {
    private _renderer;
    constructor(_renderer: Renderer2);
    dropAction(drag: IgxDragDirective, drop: IgxDropDirective, _atIndex: number): void;
}
export declare class IgxPrependDropStrategy implements IDropStrategy {
    private _renderer;
    constructor(_renderer: Renderer2);
    dropAction(drag: IgxDragDirective, drop: IgxDropDirective, _atIndex: number): void;
}
export declare class IgxInsertDropStrategy implements IDropStrategy {
    private _renderer;
    constructor(_renderer: Renderer2);
    dropAction(drag: IgxDragDirective, drop: IgxDropDirective, atIndex: number): void;
}

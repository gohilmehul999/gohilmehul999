import { IgxOverlayService } from '../overlay';
import { ScrollStrategy } from './scroll-strategy';
/**
 * On scroll reposition the overlay content.
 */
export declare class AbsoluteScrollStrategy extends ScrollStrategy {
    private _initialized;
    private _document;
    private _overlayService;
    private _id;
    private _scrollContainer;
    private _zone;
    constructor(scrollContainer?: HTMLElement);
    /** @inheritdoc */
    initialize(document: Document, overlayService: IgxOverlayService, id: string): void;
    /** @inheritdoc */
    attach(): void;
    /** @inheritdoc */
    detach(): void;
    private addScrollEventListener;
    private onScroll;
}

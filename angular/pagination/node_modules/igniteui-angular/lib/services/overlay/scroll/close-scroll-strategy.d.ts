import { IgxOverlayService } from '../overlay';
import { ScrollStrategy } from './scroll-strategy';
/**
 * Uses a tolerance and closes the shown component upon scrolling if the tolerance is exceeded
 */
export declare class CloseScrollStrategy extends ScrollStrategy {
    private _document;
    private _overlayService;
    private _id;
    private initialScrollTop;
    private initialScrollLeft;
    private _threshold;
    private _initialized;
    private _sourceElement;
    private _scrollContainer;
    private _overlayInfo;
    constructor(scrollContainer?: HTMLElement);
    /** @inheritdoc */
    initialize(document: Document, overlayService: IgxOverlayService, id: string): void;
    /** @inheritdoc */
    attach(): void;
    /** @inheritdoc */
    detach(): void;
    private onScroll;
}

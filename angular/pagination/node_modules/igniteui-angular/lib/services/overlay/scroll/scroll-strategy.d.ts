import { IScrollStrategy } from './IScrollStrategy';
import { IgxOverlayService } from '../overlay';
export declare abstract class ScrollStrategy implements IScrollStrategy {
    constructor();
    /** @inheritdoc */
    abstract initialize(document: Document, overlayService: IgxOverlayService, id: string): any;
    /** @inheritdoc */
    abstract attach(): void;
    /** @inheritdoc */
    abstract detach(): void;
}

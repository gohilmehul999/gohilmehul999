import { PositionSettings, Size, ConnectedFit, Point } from '../services/overlay/utilities';
import { IPositionStrategy } from '../services/overlay/position';
import { IgxSelectBase } from './select.common';
import { BaseFitPositionStrategy } from '../services/overlay/position/base-fit-position-strategy';
import { PlatformUtil } from '../core/utils';
/** @hidden @internal */
export declare class SelectPositioningStrategy extends BaseFitPositionStrategy implements IPositionStrategy {
    select: IgxSelectBase;
    protected platform?: PlatformUtil;
    /** @inheritdoc */
    settings: PositionSettings;
    private _selectDefaultSettings;
    private global_yOffset;
    private global_xOffset;
    private global_styles;
    constructor(select: IgxSelectBase, settings?: PositionSettings, platform?: PlatformUtil);
    /** @inheritdoc */
    position(contentElement: HTMLElement, size: Size, document?: Document, initialCall?: boolean, target?: Point | HTMLElement): void;
    /**
     * Obtain the selected item if there is such one or otherwise use the first one
     */
    getInteractionItemElement(): HTMLElement;
    /**
     * Position the items outer container so selected item text is positioned over input text and if header
     * And/OR footer - both header/footer are visible
     *
     * @param selectFit selectFit to use for computation.
     */
    protected fitInViewport(contentElement: HTMLElement, selectFit: SelectFit): void;
    /**
     * Sets element's style which effectively positions the provided element
     *
     * @param element Element to position
     * @param selectFit selectFit to use for computation.
     * @param initialCall should be true if this is the initial call to the position method calling setStyles
     */
    protected setStyles(contentElement: HTMLElement, selectFit: SelectFit): void;
    /**
     * Calculate selected item scroll position.
     */
    private calculateScrollAmount;
    /**
     * Calculate the necessary input and selected item styles to be used for positioning item text over input text.
     * Calculate & Set default items container width.
     *
     * @param selectFit selectFit to use for computation.
     */
    private calculateStyles;
    /**
     * Calculate how much to offset the overlay container for Y-axis.
     */
    private calculateYoffset;
    /**
     * Calculate how much to offset the overlay container for X-axis.
     */
    private calculateXoffset;
}
/** @hidden */
export interface SelectFit extends ConnectedFit {
    itemElement?: HTMLElement;
    scrollContainer: HTMLElement;
    scrollContainerRect: ClientRect;
    itemRect?: ClientRect;
    styles?: SelectStyles;
    scrollAmount?: number;
}
/** @hidden */
export interface SelectStyles {
    itemTextPadding?: number;
    itemTextIndent?: number;
    itemTextToInputTextDiff?: number;
    contentElementNewWidth?: number;
    numericLeftPadding?: number;
}

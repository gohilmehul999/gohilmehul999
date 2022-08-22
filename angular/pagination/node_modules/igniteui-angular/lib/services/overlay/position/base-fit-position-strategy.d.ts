import { ConnectedFit, HorizontalAlignment, Point, PositionSettings, Size, VerticalAlignment } from '../utilities';
import { ConnectedPositioningStrategy } from './connected-positioning-strategy';
export declare abstract class BaseFitPositionStrategy extends ConnectedPositioningStrategy {
    protected _initialSize: Size;
    protected _initialSettings: PositionSettings;
    /** @inheritdoc */
    position(contentElement: HTMLElement, size: Size, document?: Document, initialCall?: boolean, target?: Point | HTMLElement): void;
    /**
     * Checks if element can fit in viewport and updates provided connectedFit
     * with the result
     *
     * @param connectedFit connectedFit to update
     */
    protected updateViewPortFit(connectedFit: ConnectedFit): void;
    /**
     * Calculates the position of the left border of the element if it gets positioned
     * with provided start point and direction
     *
     * @param targetRect Rectangle of the target where element is attached
     * @param elementRect Rectangle of the element
     * @param startPoint Start point of the target
     * @param direction Direction in which to show the element
     */
    protected calculateLeft(targetRect: Partial<DOMRect>, elementRect: Partial<DOMRect>, startPoint: HorizontalAlignment, direction: HorizontalAlignment, offset?: number): number;
    /**
     * Calculates the position of the top border of the element if it gets positioned
     * with provided position settings related to the target
     *
     * @param targetRect Rectangle of the target where element is attached
     * @param elementRect Rectangle of the element
     * @param startPoint Start point of the target
     * @param direction Direction in which to show the element
     */
    protected calculateTop(targetRect: Partial<DOMRect>, elementRect: Partial<DOMRect>, startPoint: VerticalAlignment, direction: VerticalAlignment, offset?: number): number;
    /**
     * Returns whether the element should fit in viewport
     *
     * @param connectedFit connectedFit object containing all necessary parameters
     */
    protected shouldFitInViewPort(connectedFit: ConnectedFit): boolean;
    /**
     * Fits the element into viewport according to the position settings
     *
     * @param element element to fit in viewport
     * @param connectedFit connectedFit object containing all necessary parameters
     */
    protected abstract fitInViewport(element: HTMLElement, connectedFit: ConnectedFit): any;
}

import { ConnectedFit } from '../utilities';
import { Point, PositionSettings, Size } from './../utilities';
import { IPositionStrategy } from './IPositionStrategy';
/**
 * Positions the element based on the directions and start point passed in trough PositionSettings.
 * It is possible to either pass a start point or an HTMLElement as a positioning base.
 */
export declare class ConnectedPositioningStrategy implements IPositionStrategy {
    /** @inheritdoc */
    settings: PositionSettings;
    private _defaultSettings;
    constructor(settings?: PositionSettings);
    /** @inheritdoc */
    position(contentElement: HTMLElement, size: Size, document?: Document, initialCall?: boolean, target?: Point | HTMLElement): void;
    /**
     * @inheritdoc
     * Creates clone of this position strategy
     * @returns clone of this position strategy
     */
    clone(): IPositionStrategy;
    /**
     * Obtains the DomRect objects for the required elements - target and element to position
     *
     * @returns target and element DomRect objects
     */
    protected calculateElementRectangles(contentElement: any, target: Point | HTMLElement): {
        targetRect: Partial<DOMRect>;
        elementRect: Partial<DOMRect>;
    };
    /**
     * Sets element's style which effectively positions provided element according
     * to provided position settings
     *
     * @param element Element to position
     * @param targetRect Bounding rectangle of strategy target
     * @param elementRect Bounding rectangle of the element
     */
    protected setStyle(element: HTMLElement, targetRect: Partial<DOMRect>, elementRect: Partial<DOMRect>, connectedFit: ConnectedFit): void;
}

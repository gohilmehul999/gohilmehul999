import { ConnectedFit } from '../utilities';
import { BaseFitPositionStrategy } from './base-fit-position-strategy';
/**
 * Positions the element as in **Connected** positioning strategy and resize the element
 * to fit in the view port in case the element is partially getting out of view
 */
export declare class ElasticPositionStrategy extends BaseFitPositionStrategy {
    /** @inheritdoc */
    protected fitInViewport(element: HTMLElement, connectedFit: ConnectedFit): void;
}

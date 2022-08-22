import { PositionSettings } from '../utilities';
import { GlobalPositionStrategy } from './global-position-strategy';
/**
 * Positions the element inside the containing outlet based on the directions passed in trough PositionSettings.
 * These are Top/Middle/Bottom for verticalDirection and Left/Center/Right for horizontalDirection
 */
export declare class ContainerPositionStrategy extends GlobalPositionStrategy {
    constructor(settings?: PositionSettings);
    /** @inheritdoc */
    position(contentElement: HTMLElement): void;
}

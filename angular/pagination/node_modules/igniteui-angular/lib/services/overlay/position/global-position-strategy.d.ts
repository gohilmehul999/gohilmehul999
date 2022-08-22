import { PositionSettings } from './../utilities';
import { IPositionStrategy } from './IPositionStrategy';
/**
 * Positions the element based on the directions passed in trough PositionSettings.
 * These are Top/Middle/Bottom for verticalDirection and Left/Center/Right for horizontalDirection
 */
export declare class GlobalPositionStrategy implements IPositionStrategy {
    /** @inheritdoc */
    settings: PositionSettings;
    protected _defaultSettings: PositionSettings;
    constructor(settings?: PositionSettings);
    /** @inheritdoc */
    position(contentElement: HTMLElement): void;
    /** @inheritdoc */
    clone(): IPositionStrategy;
    protected setPosition(contentElement: HTMLElement): void;
}

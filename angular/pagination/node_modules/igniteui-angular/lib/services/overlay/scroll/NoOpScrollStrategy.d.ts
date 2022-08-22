import { ScrollStrategy } from './scroll-strategy';
/**
 * Empty scroll strategy. Does nothing.
 */
export declare class NoOpScrollStrategy extends ScrollStrategy {
    constructor();
    /** @inheritdoc */
    initialize(): void;
    /** @inheritdoc */
    attach(): void;
    /** @inheritdoc */
    detach(): void;
}

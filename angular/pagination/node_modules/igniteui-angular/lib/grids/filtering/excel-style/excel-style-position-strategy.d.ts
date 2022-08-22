import { AutoPositionStrategy } from '../../../services/overlay/position/auto-position-strategy';
import { ConnectedFit } from '../../../services/overlay/utilities';
/** @hidden */
export declare class ExcelStylePositionStrategy extends AutoPositionStrategy {
    protected shouldFitInViewPort(): boolean;
    protected fitInViewport(element: HTMLElement, connectedFit: ConnectedFit): void;
}

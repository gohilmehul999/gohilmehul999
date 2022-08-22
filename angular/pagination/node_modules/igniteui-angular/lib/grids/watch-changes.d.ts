/**
 * @hidden
 */
export declare function WatchChanges(): PropertyDecorator;
export declare function WatchColumnChanges(): PropertyDecorator;
export declare function notifyChanges(repaint?: boolean): (_: any, key: string, propDesc?: PropertyDescriptor) => any;

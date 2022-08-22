export interface IDataCloneStrategy {
    clone(data: any): any;
}
export declare class DefaultDataCloneStrategy implements IDataCloneStrategy {
    clone(data: any): any;
}

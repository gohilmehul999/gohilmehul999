import { IGroupByKey } from './groupby-expand-state.interface';
import { IGroupByRecord } from './groupby-record.interface';
export declare const isHierarchyMatch: (h1: Array<IGroupByKey>, h2: Array<IGroupByKey>) => boolean;
export declare const getHierarchy: (gRow: IGroupByRecord) => Array<IGroupByKey>;

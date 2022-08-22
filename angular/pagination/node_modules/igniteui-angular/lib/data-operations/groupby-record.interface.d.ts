import { ColumnType } from '../grids/common/grid.interface';
import { ISortingExpression } from './sorting-strategy';
/**
 * @hidden
 */
export declare class GroupedRecords extends Array<any> {
}
export interface IGroupByRecord {
    expression: ISortingExpression;
    level: number;
    records: GroupedRecords;
    value: any;
    groupParent: IGroupByRecord;
    groups?: IGroupByRecord[];
    height: number;
    column?: ColumnType;
}

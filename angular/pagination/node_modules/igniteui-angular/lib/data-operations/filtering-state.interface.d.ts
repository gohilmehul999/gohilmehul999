import { IFilteringExpressionsTree } from './filtering-expressions-tree';
import { FilteringStrategy, IFilteringStrategy } from './filtering-strategy';
export declare const filteringStateDefaults: {
    strategy: FilteringStrategy;
};
export declare interface IFilteringState {
    expressionsTree: IFilteringExpressionsTree;
    advancedExpressionsTree?: IFilteringExpressionsTree;
    strategy?: IFilteringStrategy;
}

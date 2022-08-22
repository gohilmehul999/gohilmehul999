import { InjectionToken } from '@angular/core';
declare const IgxInputGroupEnum: {
    Line: "line";
    Box: "box";
    Border: "border";
    Search: "search";
};
/**
 * Defines the InputGroupType DI token.
 */
export declare const IGX_INPUT_GROUP_TYPE: InjectionToken<IgxInputGroupType>;
/**
 * Determines the InputGroupType.
 */
export declare type IgxInputGroupType = (typeof IgxInputGroupEnum)[keyof typeof IgxInputGroupEnum];
export {};

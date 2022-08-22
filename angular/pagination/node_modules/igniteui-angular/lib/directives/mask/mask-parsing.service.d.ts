import * as i0 from "@angular/core";
/** @hidden */
export declare const MASK_FLAGS: string[];
/** @hidden */
export interface MaskOptions {
    format: string;
    promptChar: string;
}
/** @hidden */
export interface Replaced {
    value: string;
    end: number;
}
/** @hidden */
export declare class MaskParsingService {
    applyMask(inputVal: string, maskOptions: MaskOptions): string;
    parseValueFromMask(maskedValue: string, maskOptions: MaskOptions): string;
    replaceInMask(maskedValue: string, value: string, maskOptions: MaskOptions, start: number, end: number): Replaced;
    replaceCharAt(strValue: string, index: number, char: string): string;
    getMaskLiterals(mask: string): Map<number, string>;
    /** Validates only non literal positions. */
    private validateCharOnPosition;
    private getNonLiteralIndices;
    private getNonLiteralValues;
    private replaceIMENumbers;
    static ɵfac: i0.ɵɵFactoryDeclaration<MaskParsingService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MaskParsingService>;
}

import { InjectionToken } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * @hidden
 */
export declare type Direction = 'ltr' | 'rtl';
/**
 * @hidden
 */
export declare function DIR_DOCUMENT_FACTORY(): Document;
/**
 * Injection token is used to inject the document into Directionality
 * which factory could be faked for testing purposes.
 *
 * We can't provide and mock the DOCUMENT token from platform-browser because configureTestingModule
 * allows override of the default providers, directive, pipes, modules of the test injector
 * which causes errors.
 *
 * @hidden
 */
export declare const DIR_DOCUMENT: InjectionToken<Document>;
/**
 * @hidden
 *
 * Bidirectional service that extracts the value of the direction attribute on the body or html elements.
 *
 * The dir attribute over the body element takes precedence.
 */
export declare class IgxDirectionality {
    private _dir;
    private _document;
    get value(): Direction;
    get document(): Document;
    get rtl(): boolean;
    constructor(document: any);
    static ɵfac: i0.ɵɵFactoryDeclaration<IgxDirectionality, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IgxDirectionality>;
}

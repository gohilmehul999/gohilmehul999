import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlatformUtil } from '../core/utils';
import * as i0 from "@angular/core";
/**
 * Event emitted when a SVG icon is loaded through
 * a HTTP request.
 */
export interface IgxIconLoadedEvent {
    /** Name of the icon */
    name: string;
    /** The actual SVG text */
    value: string;
    /** The font-family for the icon. Defaults to material. */
    family: string;
}
/**
 * **Ignite UI for Angular Icon Service** -
 *
 * The Ignite UI Icon Service makes it easy for developers to include custom SVG images and use them with IgxIconComponent.
 * In addition it could be used to associate a custom class to be applied on IgxIconComponent according to given font-family.
 *
 * Example:
 * ```typescript
 * this.iconService.registerFamilyAlias('material', 'material-icons');
 * this.iconService.addSvgIcon('aruba', '/assets/svg/country_flags/aruba.svg', 'svg-flags');
 * ```
 */
export declare class IgxIconService {
    private _sanitizer;
    private _httpClient;
    private _platformUtil;
    private _document;
    /**
     * Observable that emits when an icon is successfully loaded
     * through a HTTP request.
     *
     * @example
     * ```typescript
     * this.service.iconLoaded.subscribe((ev: IgxIconLoadedEvent) => ...);
     * ```
     */
    iconLoaded: Observable<IgxIconLoadedEvent>;
    private _family;
    private _familyAliases;
    private _cachedSvgIcons;
    private _iconLoaded;
    private _domParser;
    constructor(_sanitizer: DomSanitizer, _httpClient: HttpClient, _platformUtil: PlatformUtil, _document: any);
    /**
     *  Returns the default font-family.
     * ```typescript
     *   const defaultFamily = this.iconService.defaultFamily;
     * ```
     */
    get defaultFamily(): string;
    /**
     *  Sets the default font-family.
     * ```typescript
     *   this.iconService.defaultFamily = 'svg-flags';
     * ```
     */
    set defaultFamily(className: string);
    /**
     *  Registers a custom class to be applied to IgxIconComponent for a given font-family.
     * ```typescript
     *   this.iconService.registerFamilyAlias('material', 'material-icons');
     * ```
     */
    registerFamilyAlias(alias: string, className?: string): this;
    /**
     *  Returns the custom class, if any, associated to a given font-family.
     * ```typescript
     *   const familyClass = this.iconService.familyClassName('material');
     * ```
     */
    familyClassName(alias: string): string;
    /**
     *  Adds an SVG image to the cache. SVG source is an url.
     * ```typescript
     *   this.iconService.addSvgIcon('aruba', '/assets/svg/country_flags/aruba.svg', 'svg-flags');
     * ```
     */
    addSvgIcon(name: string, url: string, family?: string, stripMeta?: boolean): void;
    /**
     *  Adds an SVG image to the cache. SVG source is its text.
     * ```typescript
     *   this.iconService.addSvgIconFromText('simple', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
     *   <path d="M74 74h54v54H74" /></svg>', 'svg-flags');
     * ```
     */
    addSvgIconFromText(name: string, iconText: string, family?: string, stripMeta?: boolean): void;
    /**
     *  Returns whether a given SVG image is present in the cache.
     * ```typescript
     *   const isSvgCached = this.iconService.isSvgIconCached('aruba', 'svg-flags');
     * ```
     */
    isSvgIconCached(name: string, family?: string): boolean;
    /**
     *  Returns the cached SVG image as string.
     * ```typescript
     *   const svgIcon = this.iconService.getSvgIcon('aruba', 'svg-flags');
     * ```
     */
    getSvgIcon(name: string, family?: string): SafeHtml;
    /**
     * @hidden
     */
    private fetchSvg;
    /**
     * @hidden
     */
    private cacheSvgIcon;
    static ɵfac: i0.ɵɵFactoryDeclaration<IgxIconService, [{ optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IgxIconService>;
}

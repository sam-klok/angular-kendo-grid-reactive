/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { SimpleChanges, ElementRef, EventEmitter, Renderer2, OnDestroy, NgZone, AfterViewInit } from '@angular/core';
import { KendoButtonService } from './button.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { ButtonFillMode, ButtonRounded, ButtonSize, ButtonThemeColor } from '../common/models';
import * as i0 from "@angular/core";
/**
 * Represents the Kendo UI Button component for Angular.
 */
export declare class ButtonDirective implements OnDestroy, AfterViewInit {
    renderer: Renderer2;
    private service;
    private ngZone;
    /**
     * Provides visual styling that indicates if the Button is active.
     * By default, `toggleable` is set to `false`.
     */
    toggleable: boolean;
    /**
     * Backwards-compatible alias
     *
     * @hidden
     */
    get togglable(): boolean;
    /**
     * @hidden
     */
    set togglable(value: boolean);
    /**
     * Sets the selected state of the Button.
     */
    get selected(): boolean;
    set selected(value: boolean);
    /**
     * @hidden
     */
    set tabIndex(index: number);
    get tabIndex(): number;
    /**
     * Defines the name for an existing icon in a Kendo UI theme.
     * The icon is rendered inside the Button by a `span.k-icon` element.
     */
    set icon(icon: string);
    /**
     * Defines a CSS class&mdash;or multiple classes separated by spaces&mdash;
     * which are applied to a `span` element inside the Button. Allows the usage of custom icons.
     */
    set iconClass(iconClassName: string);
    /**
     * Defines a URL which is used for an `img` element inside the Button.
     * The URL can be relative or absolute. If relative, it is evaluated with relation to the web page URL.
     */
    set imageUrl(imageUrl: string);
    /**
     * If set to `true`, it disables the Button.
     */
    set disabled(disabled: boolean);
    get disabled(): boolean;
    /**
     * The size property specifies the padding of the Button
     * ([see example]({% slug appearance_button %}#toc-size)).
     *
     * The possible values are:
     * * `small`
     * * `medium` (default)
     * * `large`
     * * `none`
     */
    set size(size: ButtonSize);
    get size(): ButtonSize;
    /**
     * The rounded property specifies the border radius of the Button
     * ([see example]({% slug appearance_button %}#toc-rounded)).
     *
     * The possible values are:
     * * `small`
     * * `medium` (default)
     * * `large`
     * * `full`
     * * `none`
     */
    set rounded(rounded: ButtonRounded);
    get rounded(): ButtonRounded;
    /**
     * The fillMode property specifies the background and border styles of the Button
     * ([see example]({% slug appearance_button %}#toc-fillMode)).
     *
     * The possible values are:
     * * `flat`
     * * `solid` (default)
     * * `outline`
     * * `clear`
     * * `link`
     * * `none`
     */
    set fillMode(fillMode: ButtonFillMode);
    get fillMode(): ButtonFillMode;
    /**
     * The Button allows you to specify predefined theme colors.
     * The theme color will be applied as a background and border color while also amending the text color accordingly
     * ([see example]({% slug appearance_button %}#toc-themeColor)).
     *
     * The possible values are:
     * * `base` (default)
     * * `primary`
     * * `secondary`
     * * `tertiary`
     * * `info`
     * * `success`
     * * `warning`
     * * `error`
     * * `dark`
     * * `light`
     * * `inverse`
     * * `none`
     */
    set themeColor(themeColor: ButtonThemeColor);
    get themeColor(): ButtonThemeColor;
    /**
     * @hidden
     */
    role: string;
    /**
     * Fires each time the selected state of a toggleable button is changed.
     *
     * The event argument is the new selected state (boolean).
     */
    selectedChange: EventEmitter<any>;
    /**
     * Fires each time the user clicks the button.
     */
    click: EventEmitter<any>;
    element: HTMLElement;
    isDisabled: boolean;
    isIcon: boolean;
    isIconClass: boolean;
    imageNode: HTMLImageElement;
    iconNode: HTMLElement;
    iconSpanNode: HTMLElement;
    private _size;
    private _rounded;
    private _fillMode;
    private _themeColor;
    private _focused;
    private direction;
    private _selected;
    private deferTimeout;
    private subs;
    set isFocused(isFocused: boolean);
    get isFocused(): boolean;
    get classButton(): boolean;
    get isToggleable(): boolean;
    get roleSetter(): string;
    get classDisabled(): boolean;
    get classActive(): boolean;
    get getDirection(): string;
    /**
     * @hidden
     */
    onFocus(): void;
    /**
     * @hidden
     */
    onBlur(): void;
    /**
     * @hidden
     */
    set primary(value: boolean);
    /**
     * @hidden
     */
    set look(value: 'flat' | 'outline' | 'clear' | 'default');
    constructor(element: ElementRef, renderer: Renderer2, service: KendoButtonService, localization: LocalizationService, ngZone: NgZone);
    ngOnInit(): void;
    ngOnChanges(change: SimpleChanges): void;
    ngAfterViewInit(): void;
    ngAfterViewChecked(): void;
    ngOnDestroy(): void;
    /**
     * Focuses the Button component.
     */
    focus(): void;
    /**
     * Blurs the Button component.
     */
    blur(): void;
    /**
     * @hidden
     */
    setAttribute(attribute: string, value: string): void;
    /**
     * @hidden
     */
    removeAttribute(attribute: string): void;
    /**
     * @hidden
     *
     * Internal setter that triggers selectedChange
     */
    setSelected(value: boolean): void;
    private toggleAriaPressed;
    private hasText;
    private addImgIcon;
    private addIcon;
    private addTextSpan;
    private prependChild;
    private defer;
    private iconSetter;
    private removeImageNode;
    private removeIconNode;
    private updateIconNode;
    private setIconTextClasses;
    private toggleClass;
    private _onButtonClick;
    private handleClasses;
    private handleThemeColor;
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonDirective, [null, null, { optional: true; }, null, null]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ButtonDirective, "button[kendoButton], span[kendoButton]", ["kendoButton"], { "toggleable": "toggleable"; "togglable": "togglable"; "selected": "selected"; "tabIndex": "tabIndex"; "icon": "icon"; "iconClass": "iconClass"; "imageUrl": "imageUrl"; "disabled": "disabled"; "size": "size"; "rounded": "rounded"; "fillMode": "fillMode"; "themeColor": "themeColor"; "role": "role"; "primary": "primary"; "look": "look"; }, { "selectedChange": "selectedChange"; "click": "click"; }, never>;
}

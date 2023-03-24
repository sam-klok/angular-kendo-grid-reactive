/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, EventEmitter, HostBinding, HostListener, Input, Output, Optional } from '@angular/core';
import { isDocumentAvailable, isChanged, hasObservers, Keys } from '@progress/kendo-angular-common';
import { LocalizationService, L10N_PREFIX } from '@progress/kendo-angular-l10n';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { validatePackage } from '@progress/kendo-licensing';
import { packageMetadata } from '../package-metadata';
import { getStylingClasses, getThemeColorClasses, isFirefox } from '../util';
import * as i0 from "@angular/core";
import * as i1 from "./button.service";
import * as i2 from "@progress/kendo-angular-l10n";
const SPAN_TAG_NAME = 'SPAN';
const DEFAULT_ROUNDED = 'medium';
const DEFAULT_SIZE = 'medium';
const DEFAULT_THEME_COLOR = 'base';
const DEFAULT_FILL_MODE = 'solid';
/**
 * Represents the Kendo UI Button component for Angular.
 */
export class ButtonDirective {
    constructor(element, renderer, service, localization, ngZone) {
        this.renderer = renderer;
        this.service = service;
        this.ngZone = ngZone;
        /**
         * Provides visual styling that indicates if the Button is active.
         * By default, `toggleable` is set to `false`.
         */
        this.toggleable = false;
        /**
         * @hidden
         */
        this.role = 'button';
        /**
         * Fires each time the selected state of a toggleable button is changed.
         *
         * The event argument is the new selected state (boolean).
         */
        this.selectedChange = new EventEmitter();
        /**
         * Fires each time the user clicks the button.
         */
        this.click = new EventEmitter();
        this.isDisabled = false;
        this.isIcon = false;
        this.isIconClass = false;
        this._size = DEFAULT_SIZE;
        this._rounded = DEFAULT_ROUNDED;
        this._fillMode = DEFAULT_FILL_MODE;
        this._themeColor = DEFAULT_THEME_COLOR;
        this._focused = false;
        this.subs = new Subscription();
        validatePackage(packageMetadata);
        this.direction = localization.rtl ? 'rtl' : 'ltr';
        this.subs.add(localization.changes.subscribe(({ rtl }) => (this.direction = rtl ? 'rtl' : 'ltr')));
        this.element = element.nativeElement;
    }
    /**
     * Backwards-compatible alias
     *
     * @hidden
     */
    get togglable() {
        return this.toggleable;
    }
    /**
     * @hidden
     */
    set togglable(value) {
        this.toggleable = value;
    }
    /**
     * Sets the selected state of the Button.
     */
    get selected() {
        return this._selected || false;
    }
    set selected(value) {
        this._selected = value;
    }
    /**
     * @hidden
     */
    set tabIndex(index) {
        this.element.tabIndex = index;
    }
    get tabIndex() {
        return this.element.tabIndex;
    }
    /**
     * Defines the name for an existing icon in a Kendo UI theme.
     * The icon is rendered inside the Button by a `span.k-icon` element.
     */
    set icon(icon) {
        if (icon) {
            this.iconSetter(icon, () => {
                this.isIcon = true;
                const classes = 'k-button-icon k-icon k-i-' + icon;
                this.addIcon(classes);
            });
        }
        else {
            this.isIcon = false;
            this.updateIconNode();
        }
    }
    /**
     * Defines a CSS class&mdash;or multiple classes separated by spaces&mdash;
     * which are applied to a `span` element inside the Button. Allows the usage of custom icons.
     */
    set iconClass(iconClassName) {
        if (iconClassName) {
            this.iconSetter(iconClassName, () => {
                this.isIconClass = true;
                const classes = 'k-button-icon ' + iconClassName;
                this.addIcon(classes);
            });
        }
        else {
            this.isIconClass = false;
            this.updateIconNode();
        }
    }
    /**
     * Defines a URL which is used for an `img` element inside the Button.
     * The URL can be relative or absolute. If relative, it is evaluated with relation to the web page URL.
     */
    set imageUrl(imageUrl) {
        if (imageUrl) {
            this.iconSetter(imageUrl, this.addImgIcon.bind(this));
        }
        else {
            this.removeImageNode();
        }
    }
    /**
     * If set to `true`, it disables the Button.
     */
    set disabled(disabled) {
        //Required, because in FF focused buttons are not blurred on disabled
        if (disabled && isDocumentAvailable() && isFirefox(navigator.userAgent)) {
            this.blur();
        }
        this.isDisabled = disabled;
        this.renderer.setProperty(this.element, 'disabled', disabled);
    }
    get disabled() {
        return this.isDisabled;
    }
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
    set size(size) {
        const newSize = size ? size : DEFAULT_SIZE;
        this.handleClasses(newSize, 'size');
        this._size = newSize;
    }
    get size() {
        return this._size;
    }
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
    set rounded(rounded) {
        const newRounded = rounded ? rounded : DEFAULT_ROUNDED;
        this.handleClasses(newRounded, 'rounded');
        this._rounded = newRounded;
    }
    get rounded() {
        return this._rounded;
    }
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
    set fillMode(fillMode) {
        const newFillMode = fillMode ? fillMode : DEFAULT_FILL_MODE;
        this.handleClasses(newFillMode, 'fillMode');
        this._fillMode = newFillMode;
    }
    get fillMode() {
        return this._fillMode;
    }
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
    set themeColor(themeColor) {
        const newThemeColor = themeColor ? themeColor : DEFAULT_THEME_COLOR;
        this.handleThemeColor(newThemeColor);
        this._themeColor = newThemeColor;
    }
    get themeColor() {
        return this._themeColor;
    }
    set isFocused(isFocused) {
        this.toggleClass('k-focus', isFocused);
        this._focused = isFocused;
    }
    get isFocused() {
        return this._focused;
    }
    get classButton() {
        return true;
    }
    get isToggleable() {
        return this.toggleable;
    }
    get roleSetter() {
        return this.role;
    }
    get classDisabled() {
        return this.isDisabled;
    }
    get classActive() {
        return this.selected;
    }
    get getDirection() {
        return this.direction;
    }
    /**
     * @hidden
     */
    onFocus() {
        this.isFocused = true;
    }
    /**
     * @hidden
     */
    onBlur() {
        this.isFocused = false;
    }
    /**
     * @hidden
     */
    set primary(value) {
        this.themeColor = value ? 'primary' : 'base';
    }
    /**
     * @hidden
     */
    set look(value) {
        switch (value) {
            case 'default':
                this.fillMode = 'solid';
                break;
            default:
                this.fillMode = value;
                break;
        }
    }
    ngOnInit() {
        const isSpan = this.element.tagName === SPAN_TAG_NAME;
        this.addTextSpan();
        if (!this.element.hasAttribute('role') && this.togglable) {
            this.toggleAriaPressed(this.toggleable);
        }
        if (this.role) {
            this.setAttribute('role', this.role);
        }
        this.ngZone.runOutsideAngular(() => {
            this.subs.add(this.renderer.listen(this.element, 'click', this._onButtonClick.bind(this)));
            this.subs.add(this.renderer.listen(this.element, 'keydown', (event) => {
                const isSpaceOrEnter = event.keyCode === Keys.Space || event.keyCode === Keys.Enter;
                if (isSpan && isSpaceOrEnter) {
                    this.click.emit(event);
                    this._onButtonClick();
                }
            }));
        });
    }
    ngOnChanges(change) {
        if (isChanged('togglable', change) || isChanged('toggleable', change)) {
            this.toggleAriaPressed(this.toggleable);
        }
    }
    ngAfterViewInit() {
        const stylingOptions = ['size', 'rounded', 'fillMode'];
        stylingOptions.forEach(input => {
            this.handleClasses(this[input], input);
        });
    }
    ngAfterViewChecked() {
        this.setIconTextClasses();
    }
    ngOnDestroy() {
        this.imageNode = null;
        this.iconNode = null;
        this.iconSpanNode = null;
        this.subs.unsubscribe();
        clearTimeout(this.deferTimeout);
    }
    /**
     * Focuses the Button component.
     */
    focus() {
        if (isDocumentAvailable()) {
            this.element.focus();
            this.isFocused = true;
        }
    }
    /**
     * Blurs the Button component.
     */
    blur() {
        if (isDocumentAvailable()) {
            this.element.blur();
            this.isFocused = false;
        }
    }
    /**
     * @hidden
     */
    setAttribute(attribute, value) {
        this.renderer.setAttribute(this.element, attribute, value);
    }
    /**
     * @hidden
     */
    removeAttribute(attribute) {
        this.renderer.removeAttribute(this.element, attribute);
    }
    /**
     * @hidden
     *
     * Internal setter that triggers selectedChange
     */
    setSelected(value) {
        const changed = this.selected !== value;
        this.selected = value;
        this.setAttribute('aria-pressed', this.selected.toString());
        this.toggleClass('k-selected', this.selected);
        if (changed && hasObservers(this.selectedChange)) {
            this.ngZone.run(() => {
                this.selectedChange.emit(value);
            });
        }
    }
    toggleAriaPressed(shouldSet) {
        if (!isDocumentAvailable()) {
            return;
        }
        if (shouldSet) {
            this.setAttribute('aria-pressed', this.selected.toString());
        }
        else {
            this.removeAttribute('aria-pressed');
        }
    }
    hasText() {
        return isDocumentAvailable() && this.element.textContent.trim().length > 0;
    }
    addImgIcon(imageUrl) {
        let renderer = this.renderer;
        if (!this.iconSpanNode) {
            this.iconSpanNode = renderer.createElement('span');
            renderer.setProperty(this.iconSpanNode, 'className', 'k-button-icon k-icon');
        }
        if (this.imageNode) {
            renderer.setProperty(this.imageNode, 'src', imageUrl);
        }
        else if (isDocumentAvailable()) {
            this.imageNode = renderer.createElement('img');
            renderer.setProperty(this.imageNode, 'src', imageUrl);
            renderer.setProperty(this.imageNode, 'className', 'k-image');
            renderer.setAttribute(this.imageNode, 'role', 'presentation');
        }
        this.iconSpanNode.appendChild(this.imageNode);
        this.prependChild(this.iconSpanNode);
    }
    addIcon(classNames) {
        let renderer = this.renderer;
        if (this.iconNode) {
            renderer.setProperty(this.iconNode, 'className', classNames);
        }
        else if (isDocumentAvailable()) {
            this.iconNode = renderer.createElement('span');
            renderer.setProperty(this.iconNode, 'className', classNames);
            renderer.setAttribute(this.iconNode, 'role', 'presentation');
            this.prependChild(this.iconNode);
        }
    }
    addTextSpan() {
        this.ngZone.onStable.pipe(take(1)).subscribe(() => {
            if (isDocumentAvailable() && this.hasText()) {
                const span = this.renderer.createElement('span');
                this.renderer.addClass(span, 'k-button-text');
                const buttonContentNodes = Array.from(this.element.childNodes);
                buttonContentNodes.forEach(node => this.renderer.appendChild(span, node));
                this.renderer.appendChild(this.element, span);
            }
        });
    }
    prependChild(node) {
        this.defer(() => {
            if (this.renderer && node !== this.element.firstChild) {
                this.renderer.insertBefore(this.element, node, this.element.firstChild);
            }
        });
    }
    defer(callback) {
        this.ngZone.runOutsideAngular(() => {
            this.deferTimeout = setTimeout(callback, 0);
        });
    }
    iconSetter(icon, insertIcon) {
        if (icon) {
            insertIcon(icon);
        }
        this.setIconTextClasses();
    }
    removeImageNode() {
        if (this.imageNode && this.renderer.parentNode(this.imageNode)) {
            this.renderer.removeChild(this.element, this.imageNode);
            this.renderer.removeChild(this.element, this.iconSpanNode);
            this.imageNode = null;
            this.iconSpanNode = null;
        }
    }
    removeIconNode() {
        if (this.iconNode && this.renderer.parentNode(this.iconNode)) {
            this.renderer.removeChild(this.element, this.iconNode);
            this.iconNode = null;
        }
        if (this.iconSpanNode) {
            this.renderer.removeChild(this.element, this.iconSpanNode);
            this.iconSpanNode = null;
        }
    }
    updateIconNode() {
        if (!this.isIcon && !this.isIconClass) {
            this.removeIconNode();
        }
    }
    setIconTextClasses() {
        const hasIcon = this.isIcon || this.isIconClass || this.imageNode;
        this.toggleClass('k-icon-button', hasIcon && !this.hasText());
    }
    toggleClass(className, add) {
        if (add) {
            this.renderer.addClass(this.element, className);
        }
        else {
            this.renderer.removeClass(this.element, className);
        }
    }
    _onButtonClick() {
        if (!this.disabled && this.service) {
            this.ngZone.run(() => {
                this.service.click(this);
            });
        }
        if (this.togglable && !this.service) {
            this.setSelected(!this.selected);
        }
    }
    handleClasses(value, input) {
        const elem = this.element;
        const classes = getStylingClasses('button', input, this[input], value);
        if (input === 'fillMode') {
            this.handleThemeColor(this.themeColor, this[input], value);
        }
        if (classes.toRemove) {
            this.renderer.removeClass(elem, classes.toRemove);
        }
        if (classes.toAdd) {
            this.renderer.addClass(elem, classes.toAdd);
        }
    }
    handleThemeColor(value, prevFillMode, fillMode) {
        const elem = this.element;
        const removeFillMode = prevFillMode ? prevFillMode : this.fillMode;
        const addFillMode = fillMode ? fillMode : this.fillMode;
        const themeColorClass = getThemeColorClasses('button', removeFillMode, addFillMode, this.themeColor, value);
        this.renderer.removeClass(elem, themeColorClass.toRemove);
        if (addFillMode !== 'none' && fillMode !== 'none') {
            if (themeColorClass.toAdd) {
                this.renderer.addClass(elem, themeColorClass.toAdd);
            }
        }
    }
}
ButtonDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ButtonDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.KendoButtonService, optional: true }, { token: i2.LocalizationService }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive });
ButtonDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.16", type: ButtonDirective, selector: "button[kendoButton], span[kendoButton]", inputs: { toggleable: "toggleable", togglable: "togglable", selected: "selected", tabIndex: "tabIndex", icon: "icon", iconClass: "iconClass", imageUrl: "imageUrl", disabled: "disabled", size: "size", rounded: "rounded", fillMode: "fillMode", themeColor: "themeColor", role: "role", primary: "primary", look: "look" }, outputs: { selectedChange: "selectedChange", click: "click" }, host: { listeners: { "focus": "onFocus()", "blur": "onBlur()" }, properties: { "class.k-button": "this.classButton", "class.k-toggle-button": "this.isToggleable", "attr.role": "this.roleSetter", "attr.aria-disabled": "this.classDisabled", "class.k-disabled": "this.classDisabled", "class.k-selected": "this.classActive", "attr.dir": "this.getDirection" } }, providers: [
        LocalizationService,
        {
            provide: L10N_PREFIX,
            useValue: 'kendo.button'
        }
    ], exportAs: ["kendoButton"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ButtonDirective, decorators: [{
            type: Directive,
            args: [{
                    exportAs: 'kendoButton',
                    providers: [
                        LocalizationService,
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.button'
                        }
                    ],
                    selector: 'button[kendoButton], span[kendoButton]' // eslint-disable-line
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.KendoButtonService, decorators: [{
                    type: Optional
                }] }, { type: i2.LocalizationService }, { type: i0.NgZone }]; }, propDecorators: { toggleable: [{
                type: Input
            }], togglable: [{
                type: Input
            }], selected: [{
                type: Input
            }], tabIndex: [{
                type: Input
            }], icon: [{
                type: Input
            }], iconClass: [{
                type: Input
            }], imageUrl: [{
                type: Input
            }], disabled: [{
                type: Input
            }], size: [{
                type: Input
            }], rounded: [{
                type: Input
            }], fillMode: [{
                type: Input
            }], themeColor: [{
                type: Input
            }], role: [{
                type: Input
            }], selectedChange: [{
                type: Output
            }], click: [{
                type: Output
            }], classButton: [{
                type: HostBinding,
                args: ['class.k-button']
            }], isToggleable: [{
                type: HostBinding,
                args: ['class.k-toggle-button']
            }], roleSetter: [{
                type: HostBinding,
                args: ['attr.role']
            }], classDisabled: [{
                type: HostBinding,
                args: ['attr.aria-disabled']
            }, {
                type: HostBinding,
                args: ['class.k-disabled']
            }], classActive: [{
                type: HostBinding,
                args: ['class.k-selected']
            }], getDirection: [{
                type: HostBinding,
                args: ['attr.dir']
            }], onFocus: [{
                type: HostListener,
                args: ['focus']
            }], onBlur: [{
                type: HostListener,
                args: ['blur']
            }], primary: [{
                type: Input
            }], look: [{
                type: Input
            }] } });

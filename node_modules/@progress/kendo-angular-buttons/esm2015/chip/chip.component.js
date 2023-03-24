/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, HostBinding, Input, Output, EventEmitter, isDevMode } from '@angular/core';
import { Subscription } from 'rxjs';
import { isDocumentAvailable, Keys } from '@progress/kendo-angular-common';
import { LocalizationService, L10N_PREFIX } from '@progress/kendo-angular-l10n';
import { validatePackage } from '@progress/kendo-licensing';
import { packageMetadata } from '../package-metadata';
import { closest, getStylingClasses, getThemeColorClasses, isPresent } from '../util';
import * as i0 from "@angular/core";
import * as i1 from "@progress/kendo-angular-l10n";
import * as i2 from "@angular/common";
/**
 * Displays a Chip that represents an input, attribute or an action.
 */
export class ChipComponent {
    constructor(element, renderer, ngZone, localizationService) {
        this.element = element;
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.localizationService = localizationService;
        /**
         * Specifies the selected state of the Chip.
         * @default false
         */
        this.selected = false;
        /**
         * Specifies if the Chip will be removable or not.
         * If the property is set to `true`, the Chip renders a remove icon.
         * @default false
         */
        this.removable = false;
        /**
         * If set to `true`, the Chip will be disabled.
         * @default false
         */
        this.disabled = false;
        /**
         * Fires each time the user clicks the remove icon of the Chip.
         */
        this.remove = new EventEmitter();
        /**
         * Fires each time the user clicks the content of the Chip.
         */
        this.contentClick = new EventEmitter();
        this.tabIndex = 0;
        this.hostClass = true;
        this._size = 'medium';
        this._rounded = 'medium';
        this._fillMode = 'solid';
        this._themeColor = 'base';
        this.focused = false;
        this.subs = new Subscription();
        validatePackage(packageMetadata);
        this.direction = localizationService.rtl ? 'rtl' : 'ltr';
    }
    /**
     * The size property specifies the padding of the Chip
     * ([see example]({% slug appearance_chip %}#toc-size)).
     *
     * The possible values are:
     * * `small`
     * * `medium` (default)
     * * `large`
     * * `none`
     */
    set size(size) {
        if (isPresent(size)) {
            this._size = size;
        }
        this.handleClasses(this._size, 'size');
    }
    get size() {
        return this._size;
    }
    /**
     * The rounded property specifies the border radius of the Chip
     * ([see example]({% slug appearance_chip %}#toc-rounded)).
     *
     * The possible values are:
     * * `small`
     * * `medium` (default)
     * * `large`
     * * `full`
     * * `none`
     */
    set rounded(rounded) {
        if (isPresent(rounded)) {
            this._rounded = rounded;
        }
        this.handleClasses(this._rounded, 'rounded');
    }
    get rounded() {
        return this._rounded;
    }
    /**
     * The fillMode property specifies the background and border styles of the Chip
     * ([see example]({% slug appearance_chip %}#toc-fillMode)).
     *
     * The possible values are:
     * * `solid` (default)
     * * `outline`
     * * `none`
     */
    set fillMode(fillMode) {
        if (isPresent(fillMode)) {
            this._fillMode = fillMode;
        }
        this.handleClasses(this._fillMode, 'fillMode');
    }
    get fillMode() {
        return this._fillMode;
    }
    /**
     * The Chip allows you to specify predefined theme colors.
     * The theme color will be applied as a background and border color while also amending the text color accordingly
     * ([see example]({% slug appearance_chip %}#toc-themeColor)).
     *
     * The possible values are:
     * * `base` (default)
     * * `info`
     * * `success`
     * * `warning`
     * * `error`
     * * `none`
     */
    set themeColor(themeColor) {
        if (isPresent(themeColor)) {
            this._themeColor = themeColor;
        }
        this.handleThemeColor(this._themeColor);
    }
    get themeColor() {
        return this._themeColor;
    }
    get hasIconClass() {
        return this.icon || this.iconClass || this.avatarClass ? true : false;
    }
    get disabledClass() {
        return this.disabled;
    }
    get selectedClass() {
        return this.selected;
    }
    get focusedClass() {
        return this.focused;
    }
    ngOnInit() {
        this.subs.add(this.localizationService.changes
            .subscribe(({ rtl }) => this.direction = rtl ? 'rtl' : 'ltr'));
        this.renderer.setAttribute(this.element.nativeElement, 'role', 'button');
    }
    ngOnDestroy() {
        this.subs.unsubscribe();
    }
    ngOnChanges(changes) {
        if (changes && changes['selected']) {
            const hasAriaSelected = this.element.nativeElement.hasAttribute('aria-selected');
            if (!hasAriaSelected) {
                this.renderer.setAttribute(this.element.nativeElement, 'aria-pressed', `${this.selected}`);
            }
        }
    }
    ngAfterViewInit() {
        const chip = this.element.nativeElement;
        const stylingOptions = ['size', 'rounded', 'fillMode'];
        stylingOptions.forEach(input => {
            this.handleClasses(this[input], input);
        });
        this.attachElementEventHandlers(chip);
    }
    /**
     * @hidden
     */
    get kendoIconClass() {
        this.verifyIconSettings([this.iconClass, this.avatarClass]);
        return `k-i-${this.icon}`;
    }
    /**
     * @hidden
     */
    get customIconClass() {
        this.verifyIconSettings([this.icon, this.avatarClass]);
        return `${this.iconClass}`;
    }
    /**
     * @hidden
     */
    get chipAvatarClass() {
        this.verifyIconSettings([this.icon, this.iconClass]);
        return `${this.avatarClass}`;
    }
    /**
     * @hidden
     */
    get removeIconClass() {
        if (this.removeIcon) {
            return `${this.removeIcon}`;
        }
        return `k-i-x-circle`;
    }
    /**
     * Focuses the Chip component.
     */
    focus() {
        if (isDocumentAvailable()) {
            this.element.nativeElement.focus();
        }
    }
    /**
     * Blurs the Chip component.
     */
    blur() {
        if (isDocumentAvailable()) {
            this.element.nativeElement.blur();
        }
    }
    /**
     * @hidden
     */
    onRemoveClick(e) {
        if (this.removable) {
            this.remove.emit({ sender: this, originalEvent: e });
        }
    }
    attachElementEventHandlers(chip) {
        this.ngZone.runOutsideAngular(() => {
            this.subs.add(this.renderer.listen(chip, 'focus', () => {
                this.renderer.addClass(chip, 'k-focus');
            }));
            this.subs.add(this.renderer.listen(chip, 'blur', () => {
                this.renderer.removeClass(chip, 'k-focus');
            }));
            this.subs.add(this.renderer.listen(chip, 'click', (e) => {
                const isRemoveClicked = closest(e.target, '.k-chip-remove-action');
                if (!isRemoveClicked) {
                    this.ngZone.run(() => {
                        this.contentClick.emit({ sender: this, originalEvent: e });
                    });
                }
            }));
            this.subs.add(this.renderer.listen(chip, 'keydown', this.keyDownHandler.bind(this)));
        });
    }
    /**
     * @hidden
     */
    verifyIconSettings(iconsToCheck) {
        if (isDevMode()) {
            if (iconsToCheck.filter(icon => icon !== null && icon !== undefined).length > 0) {
                this.renderer.removeClass(this.element.nativeElement, 'k-chip-has-icon');
                throw new Error('Invalid configuration: Having multiple icons is not supported. Only a single icon on a chip can be displayed.');
            }
        }
    }
    handleClasses(value, input) {
        const elem = this.element.nativeElement;
        const classes = getStylingClasses('chip', input, this[input], value);
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
        const elem = this.element.nativeElement;
        const removeFillMode = prevFillMode ? prevFillMode : this.fillMode;
        const addFillMode = fillMode ? fillMode : this.fillMode;
        const themeColorClass = getThemeColorClasses('chip', removeFillMode, addFillMode, this.themeColor, value);
        this.renderer.removeClass(elem, themeColorClass.toRemove);
        if (addFillMode !== 'none' && fillMode !== 'none') {
            if (themeColorClass.toAdd) {
                this.renderer.addClass(elem, themeColorClass.toAdd);
            }
        }
    }
    keyDownHandler(e) {
        const isEnterOrSpace = e.keyCode === Keys.Enter || e.keyCode === Keys.Space;
        const isDeleteOrBackspace = e.keyCode === Keys.Delete || e.keyCode === Keys.Backspace;
        if (this.disabled) {
            return;
        }
        if (isEnterOrSpace) {
            this.ngZone.run(() => {
                this.contentClick.emit({ sender: this, originalEvent: e });
            });
        }
        else if (isDeleteOrBackspace && this.removable) {
            this.ngZone.run(() => {
                this.remove.emit({ sender: this, originalEvent: e });
            });
        }
    }
}
ChipComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ChipComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.NgZone }, { token: i1.LocalizationService }], target: i0.ɵɵFactoryTarget.Component });
ChipComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: ChipComponent, selector: "kendo-chip", inputs: { label: "label", icon: "icon", iconClass: "iconClass", avatarClass: "avatarClass", selected: "selected", removable: "removable", removeIcon: "removeIcon", disabled: "disabled", size: "size", rounded: "rounded", fillMode: "fillMode", themeColor: "themeColor" }, outputs: { remove: "remove", contentClick: "contentClick" }, host: { properties: { "attr.tabindex": "this.tabIndex", "class.k-chip": "this.hostClass", "class.k-chip-has-icon": "this.hasIconClass", "attr.aria-disabled": "this.disabledClass", "class.k-disabled": "this.disabledClass", "class.k-selected": "this.selectedClass", "class.k-focus": "this.focusedClass", "attr.dir": "this.direction" } }, providers: [
        LocalizationService,
        {
            provide: L10N_PREFIX,
            useValue: 'kendo.chip'
        }
    ], usesOnChanges: true, ngImport: i0, template: `
        <span
            *ngIf="icon"
            class="k-chip-icon k-icon"
            [ngClass]="kendoIconClass"
        >
        </span>

        <span
            *ngIf="iconClass"
            class="k-chip-icon"
            [ngClass]="customIconClass"
        >
        </span>

        <span
            *ngIf="avatarClass"
            class="k-chip-avatar k-avatar k-rounded-full"
        >
            <span class="k-avatar-image" [ngClass]="chipAvatarClass"></span>
        </span>

        <span class="k-chip-content">
            <span class="k-chip-label" *ngIf="label">
                {{ label }}
            </span>
            <ng-content *ngIf="!label"></ng-content>
        </span>

        <span class="k-chip-actions">
            <span class="k-chip-action k-chip-remove-action"
                *ngIf="removable"
                (click)="onRemoveClick($event)"
                >
                <span
                    class="k-icon"
                    [ngClass]="removeIconClass"
                >
                </span>
            </span>
        </span>
    `, isInline: true, directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ChipComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'kendo-chip',
                    template: `
        <span
            *ngIf="icon"
            class="k-chip-icon k-icon"
            [ngClass]="kendoIconClass"
        >
        </span>

        <span
            *ngIf="iconClass"
            class="k-chip-icon"
            [ngClass]="customIconClass"
        >
        </span>

        <span
            *ngIf="avatarClass"
            class="k-chip-avatar k-avatar k-rounded-full"
        >
            <span class="k-avatar-image" [ngClass]="chipAvatarClass"></span>
        </span>

        <span class="k-chip-content">
            <span class="k-chip-label" *ngIf="label">
                {{ label }}
            </span>
            <ng-content *ngIf="!label"></ng-content>
        </span>

        <span class="k-chip-actions">
            <span class="k-chip-action k-chip-remove-action"
                *ngIf="removable"
                (click)="onRemoveClick($event)"
                >
                <span
                    class="k-icon"
                    [ngClass]="removeIconClass"
                >
                </span>
            </span>
        </span>
    `,
                    providers: [
                        LocalizationService,
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.chip'
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.NgZone }, { type: i1.LocalizationService }]; }, propDecorators: { label: [{
                type: Input
            }], icon: [{
                type: Input
            }], iconClass: [{
                type: Input
            }], avatarClass: [{
                type: Input
            }], selected: [{
                type: Input
            }], removable: [{
                type: Input
            }], removeIcon: [{
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
            }], remove: [{
                type: Output
            }], contentClick: [{
                type: Output
            }], tabIndex: [{
                type: HostBinding,
                args: ['attr.tabindex']
            }], hostClass: [{
                type: HostBinding,
                args: ['class.k-chip']
            }], hasIconClass: [{
                type: HostBinding,
                args: ['class.k-chip-has-icon']
            }], disabledClass: [{
                type: HostBinding,
                args: ['attr.aria-disabled']
            }, {
                type: HostBinding,
                args: ['class.k-disabled']
            }], selectedClass: [{
                type: HostBinding,
                args: ['class.k-selected']
            }], focusedClass: [{
                type: HostBinding,
                args: ['class.k-focus']
            }], direction: [{
                type: HostBinding,
                args: ['attr.dir']
            }] } });

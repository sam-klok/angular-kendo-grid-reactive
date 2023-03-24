/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, Output, EventEmitter, HostBinding, ViewChild } from '@angular/core';
import { getRGBA, parseColor, getColorFromRGBA } from './utils';
import { isPresent } from '../common/utils';
import { guid, isDocumentAvailable } from '@progress/kendo-angular-common';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@progress/kendo-angular-l10n";
import * as i2 from "../numerictextbox/numerictextbox.component";
import * as i3 from "@angular/common";
import * as i4 from "./color-gradient-numeric-label.directive";
/**
 * @hidden
 */
export class ColorInputComponent {
    constructor(host, renderer, localizationService) {
        this.host = host;
        this.renderer = renderer;
        this.localizationService = localizationService;
        /**
         * The id of the hex input.
         */
        this.focusableId = `k-${guid()}`;
        /**
         * The inputs tabindex.
         */
        this.tabindex = -1;
        /**
         * Sets whether the alpha slider will be shown.
         */
        this.opacity = true;
        /**
         * Sets the disabled state of the ColorInput.
         */
        this.disabled = false;
        /**
         * Sets the read-only state of the ColorInput.
         */
        this.readonly = false;
        /**
         * Emits a parsed rgba string color.
         */
        this.valueChange = new EventEmitter();
        /**
         * Emits when the user tabs out of the last focusable input.
         */
        this.tabOut = new EventEmitter();
        this.colorInputClass = true;
        /**
         * The rgba inputs values.
         */
        this.rgba = {};
        this.subscriptions = new Subscription();
    }
    /**
     * Indicates whether any of the inputs are focused.
     */
    get isFocused() {
        if (!(isDocumentAvailable() && isPresent(this.host))) {
            return false;
        }
        const activeElement = document.activeElement;
        return this.host.nativeElement.contains(activeElement);
    }
    /**
     * Indicates whether any of the rgba inputs have value.
     */
    get rgbaInputValid() {
        return Object.keys(this.rgba).every(key => isPresent(this.rgba[key]));
    }
    ngAfterViewInit() {
        this.initDomEvents();
    }
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    }
    ngOnChanges(changes) {
        if (isPresent(changes.value) && !this.isFocused) {
            this.hex = parseColor(this.value, 'hex', this.opacity);
            this.rgba = getRGBA(this.value);
            this.rgba.a = parseColor(this.value, 'rgba', this.opacity) ? this.rgba.a : 1;
        }
    }
    get formatButtonTitle() {
        return this.localizationService.get('formatButton');
    }
    handleRgbaValueChange() {
        const color = getColorFromRGBA(this.rgba);
        if (!this.rgbaInputValid || color === this.value) {
            return;
        }
        this.value = color;
        this.rgba = getRGBA(this.value);
        this.hex = parseColor(color, 'hex', this.opacity);
        this.valueChange.emit(color);
    }
    handleHexValueChange(hex) {
        this.hex = hex;
        const color = parseColor(hex, 'rgba', this.opacity);
        if (!isPresent(color) || color === this.value) {
            return;
        }
        this.value = color;
        this.rgba = getRGBA(color);
        this.valueChange.emit(color);
    }
    handleRgbaInputBlur() {
        if (!this.rgbaInputValid) {
            this.rgba = getRGBA(this.value);
        }
    }
    handleHexInputBlur() {
        this.hex = parseColor(this.value, 'hex', this.opacity);
    }
    focusLast() {
        this.lastInput().focus();
    }
    onTab() {
        if (this.opacity) {
            return;
        }
    }
    toggleFormatView() {
        this.formatView = this.formatView === 'hex' ? 'rgba' : 'hex';
    }
    initDomEvents() {
        if (!this.host) {
            return;
        }
        this.subscriptions.add(this.renderer.listen(this.toggleFormatButton.nativeElement, 'click', () => this.toggleFormatView()));
    }
    lastInput() {
        var _a;
        return ((_a = this.hexInput) === null || _a === void 0 ? void 0 : _a.nativeElement) || this.opacityInput || this.blueInput;
    }
}
ColorInputComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ColorInputComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.LocalizationService }], target: i0.ɵɵFactoryTarget.Component });
ColorInputComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: ColorInputComponent, selector: "kendo-colorinput", inputs: { focusableId: "focusableId", formatView: "formatView", tabindex: "tabindex", value: "value", opacity: "opacity", disabled: "disabled", readonly: "readonly" }, outputs: { valueChange: "valueChange", tabOut: "tabOut" }, host: { properties: { "class.k-colorgradient-inputs": "this.colorInputClass", "class.k-hstack": "this.colorInputClass" } }, viewQueries: [{ propertyName: "opacityInput", first: true, predicate: ["opacityInput"], descendants: true }, { propertyName: "hexInput", first: true, predicate: ["hexInput"], descendants: true }, { propertyName: "blueInput", first: true, predicate: ["blueInput"], descendants: true }, { propertyName: "toggleFormatButton", first: true, predicate: ["toggleFormatButton"], descendants: true }], usesOnChanges: true, ngImport: i0, template: `
        <div class="k-vstack">
            <button #toggleFormatButton
                class="k-colorgradient-toggle-mode k-button k-button-md k-button-flat k-button-flat-base k-icon-button"
                [attr.aria-label]="formatButtonTitle"
                [attr.title]="formatButtonTitle"
                [disabled]="disabled"
                [tabindex]="tabindex.toString()"
                type="button"
            >
                <span class="k-button-icon k-icon k-i-caret-alt-expand"></span>
            </button>
        </div>
        <div *ngIf="formatView === 'hex'" class="k-vstack">
            <input
                #hexInput
                [id]="focusableId"
                class="k-input k-textbox k-input-solid k-input-md k-rounded-md k-hex-value"
                [disabled]="disabled"
                [readonly]="readonly"
                [value]="hex || ''"
                (blur)="handleHexInputBlur()"
                (input)="handleHexValueChange(hexInput.value)"
                [tabindex]="tabindex.toString()"
                (keydown.tab)="$event.preventDefault(); tabOut.emit();"
            />
            <label [for]="focusableId" class="k-colorgradient-input-label">HEX</label>
        </div>
        <ng-container *ngIf="formatView === 'rgba'">
            <div class="k-vstack">
                <kendo-numerictextbox
                    #red
                    kendoAdditionalNumericLabel="red"
                    [localizationService]="localizationService"
                    [disabled]="disabled"
                    [readonly]="readonly"
                    [tabindex]="tabindex"
                    [min]="0"
                    [max]="255"
                    [(value)]="rgba.r"
                    [autoCorrect]="true"
                    [spinners]="false"
                    [format]="'n'"
                    [decimals]="0"
                    (blur)="handleRgbaInputBlur()"
                    (valueChange)="handleRgbaValueChange()">
                </kendo-numerictextbox>
                <label [for]="red.focusableId" class="k-colorgradient-input-label">R</label>
            </div>
            <div class="k-vstack">
                <kendo-numerictextbox
                    #green
                    kendoAdditionalNumericLabel="green"
                    [localizationService]="localizationService"
                    [disabled]="disabled"
                    [readonly]="readonly"
                    [tabindex]="tabindex"
                    [min]="0"
                    [max]="255"
                    [(value)]="rgba.g"
                    [autoCorrect]="true"
                    [spinners]="false"
                    [format]="'n'"
                    [decimals]="0"
                    (blur)="handleRgbaInputBlur()"
                    (valueChange)="handleRgbaValueChange()">
                </kendo-numerictextbox>
                <label [for]="green.focusableId" class="k-colorgradient-input-label">G</label>
            </div>
            <div class="k-vstack">
                <kendo-numerictextbox
                    #blue
                    kendoAdditionalNumericLabel="blue"
                    [localizationService]="localizationService"
                    [disabled]="disabled"
                    [readonly]="readonly"
                    [tabindex]="tabindex"
                    [min]="0"
                    [max]="255"
                    [(value)]="rgba.b"
                    [autoCorrect]="true"
                    [spinners]="false"
                    [format]="'n'"
                    [decimals]="0"
                    (blur)="handleRgbaInputBlur()"
                    (valueChange)="handleRgbaValueChange()"
                    (keydown.tab)="onTab()">
                </kendo-numerictextbox>
                <label [for]="blue.focusableId" class="k-colorgradient-input-label">B</label>
            </div>
            <div class="k-vstack" *ngIf="opacity">
                <kendo-numerictextbox  #opacityInput
                    #alpha
                    kendoAdditionalNumericLabel="alpha"
                    [localizationService]="localizationService"
                    [disabled]="disabled"
                    [readonly]="readonly"
                    [tabindex]="tabindex"
                    [min]="0"
                    [max]="1"
                    [(value)]="rgba.a"
                    [autoCorrect]="true"
                    [spinners]="false"
                    [step]="0.01"
                    [format]="'n2'"
                    [decimals]="2"
                    (blur)="handleRgbaInputBlur()"
                    (valueChange)="handleRgbaValueChange()"
                    (keydown.tab)="$event.preventDefault(); tabOut.emit();">
                </kendo-numerictextbox>
                <label [for]="alpha.focusableId" class="k-colorgradient-input-label">A</label>
            </div>
        </ng-container>
    `, isInline: true, components: [{ type: i2.NumericTextBoxComponent, selector: "kendo-numerictextbox", inputs: ["focusableId", "disabled", "readonly", "title", "autoCorrect", "format", "max", "min", "decimals", "placeholder", "step", "spinners", "rangeValidation", "tabindex", "tabIndex", "changeValueOnScroll", "selectOnFocus", "value", "maxlength", "size", "rounded", "fillMode"], outputs: ["valueChange", "focus", "blur"], exportAs: ["kendoNumericTextBox"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NumericLabelDirective, selector: "[kendoAdditionalNumericLabel]", inputs: ["kendoAdditionalNumericLabel", "localizationService"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ColorInputComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'kendo-colorinput',
                    template: `
        <div class="k-vstack">
            <button #toggleFormatButton
                class="k-colorgradient-toggle-mode k-button k-button-md k-button-flat k-button-flat-base k-icon-button"
                [attr.aria-label]="formatButtonTitle"
                [attr.title]="formatButtonTitle"
                [disabled]="disabled"
                [tabindex]="tabindex.toString()"
                type="button"
            >
                <span class="k-button-icon k-icon k-i-caret-alt-expand"></span>
            </button>
        </div>
        <div *ngIf="formatView === 'hex'" class="k-vstack">
            <input
                #hexInput
                [id]="focusableId"
                class="k-input k-textbox k-input-solid k-input-md k-rounded-md k-hex-value"
                [disabled]="disabled"
                [readonly]="readonly"
                [value]="hex || ''"
                (blur)="handleHexInputBlur()"
                (input)="handleHexValueChange(hexInput.value)"
                [tabindex]="tabindex.toString()"
                (keydown.tab)="$event.preventDefault(); tabOut.emit();"
            />
            <label [for]="focusableId" class="k-colorgradient-input-label">HEX</label>
        </div>
        <ng-container *ngIf="formatView === 'rgba'">
            <div class="k-vstack">
                <kendo-numerictextbox
                    #red
                    kendoAdditionalNumericLabel="red"
                    [localizationService]="localizationService"
                    [disabled]="disabled"
                    [readonly]="readonly"
                    [tabindex]="tabindex"
                    [min]="0"
                    [max]="255"
                    [(value)]="rgba.r"
                    [autoCorrect]="true"
                    [spinners]="false"
                    [format]="'n'"
                    [decimals]="0"
                    (blur)="handleRgbaInputBlur()"
                    (valueChange)="handleRgbaValueChange()">
                </kendo-numerictextbox>
                <label [for]="red.focusableId" class="k-colorgradient-input-label">R</label>
            </div>
            <div class="k-vstack">
                <kendo-numerictextbox
                    #green
                    kendoAdditionalNumericLabel="green"
                    [localizationService]="localizationService"
                    [disabled]="disabled"
                    [readonly]="readonly"
                    [tabindex]="tabindex"
                    [min]="0"
                    [max]="255"
                    [(value)]="rgba.g"
                    [autoCorrect]="true"
                    [spinners]="false"
                    [format]="'n'"
                    [decimals]="0"
                    (blur)="handleRgbaInputBlur()"
                    (valueChange)="handleRgbaValueChange()">
                </kendo-numerictextbox>
                <label [for]="green.focusableId" class="k-colorgradient-input-label">G</label>
            </div>
            <div class="k-vstack">
                <kendo-numerictextbox
                    #blue
                    kendoAdditionalNumericLabel="blue"
                    [localizationService]="localizationService"
                    [disabled]="disabled"
                    [readonly]="readonly"
                    [tabindex]="tabindex"
                    [min]="0"
                    [max]="255"
                    [(value)]="rgba.b"
                    [autoCorrect]="true"
                    [spinners]="false"
                    [format]="'n'"
                    [decimals]="0"
                    (blur)="handleRgbaInputBlur()"
                    (valueChange)="handleRgbaValueChange()"
                    (keydown.tab)="onTab()">
                </kendo-numerictextbox>
                <label [for]="blue.focusableId" class="k-colorgradient-input-label">B</label>
            </div>
            <div class="k-vstack" *ngIf="opacity">
                <kendo-numerictextbox  #opacityInput
                    #alpha
                    kendoAdditionalNumericLabel="alpha"
                    [localizationService]="localizationService"
                    [disabled]="disabled"
                    [readonly]="readonly"
                    [tabindex]="tabindex"
                    [min]="0"
                    [max]="1"
                    [(value)]="rgba.a"
                    [autoCorrect]="true"
                    [spinners]="false"
                    [step]="0.01"
                    [format]="'n2'"
                    [decimals]="2"
                    (blur)="handleRgbaInputBlur()"
                    (valueChange)="handleRgbaValueChange()"
                    (keydown.tab)="$event.preventDefault(); tabOut.emit();">
                </kendo-numerictextbox>
                <label [for]="alpha.focusableId" class="k-colorgradient-input-label">A</label>
            </div>
        </ng-container>
    `
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.LocalizationService }]; }, propDecorators: { focusableId: [{
                type: Input
            }], formatView: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], value: [{
                type: Input
            }], opacity: [{
                type: Input
            }], disabled: [{
                type: Input
            }], readonly: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], tabOut: [{
                type: Output
            }], colorInputClass: [{
                type: HostBinding,
                args: ['class.k-colorgradient-inputs']
            }, {
                type: HostBinding,
                args: ['class.k-hstack']
            }], opacityInput: [{
                type: ViewChild,
                args: ['opacityInput']
            }], hexInput: [{
                type: ViewChild,
                args: ['hexInput']
            }], blueInput: [{
                type: ViewChild,
                args: ['blueInput']
            }], toggleFormatButton: [{
                type: ViewChild,
                args: ['toggleFormatButton', { static: false }]
            }] } });

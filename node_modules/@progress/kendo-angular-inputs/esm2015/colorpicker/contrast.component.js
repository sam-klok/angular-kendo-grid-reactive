/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input } from '@angular/core';
import { getContrastFromTwoRGBAs, getRGBA } from './utils';
import { AA_RATIO, AAA_RATIO } from './constants';
import * as i0 from "@angular/core";
import * as i1 from "@progress/kendo-angular-l10n";
import * as i2 from "./contrast-validation.component";
import * as i3 from "@angular/common";
/**
 * @hidden
 */
export class ContrastComponent {
    constructor(localization) {
        this.localization = localization;
    }
    get formatedRatio() {
        return this.contrastRatio.toFixed(2);
    }
    get contrastRatioText() {
        return `${this.localization.get('contrastRatio')}: ${this.value ? this.formatedRatio : 'n/a'}`;
    }
    get satisfiesAACondition() {
        return this.contrastRatio >= AA_RATIO;
    }
    get satisfiesAAACondition() {
        return this.contrastRatio >= AAA_RATIO;
    }
    get contrastRatio() {
        let contrast = getContrastFromTwoRGBAs(getRGBA(this.value), getRGBA(this.ratio));
        return contrast;
    }
}
ContrastComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ContrastComponent, deps: [{ token: i1.LocalizationService }], target: i0.ɵɵFactoryTarget.Component });
ContrastComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: ContrastComponent, selector: "[kendoContrastTool]", inputs: { value: "value", ratio: "ratio" }, ngImport: i0, template: `
        <div class="k-contrast-ratio">
            <span class="k-contrast-ratio-text">{{contrastRatioText}}</span>
            <ng-container *ngIf="value">
                <span class="k-contrast-validation k-text-success" *ngIf="satisfiesAACondition">
                    <span class="k-icon k-i-check"></span>
                    <span class="k-icon k-i-check" *ngIf="satisfiesAAACondition"></span>
                </span>
                <span class="k-contrast-validation k-text-error" *ngIf="!satisfiesAACondition">
                    <span class="k-icon k-i-x"></span>
                </span>
            </ng-container>
        </div>
        <div kendoContrastValidation
            type="AA"
            [value]="value"
            [pass]="satisfiesAACondition">
        </div>
        <div kendoContrastValidation
            type="AAA"
            [value]="value"
            [pass]="satisfiesAAACondition">
        </div>
    `, isInline: true, components: [{ type: i2.ContrastValidationComponent, selector: "[kendoContrastValidation]", inputs: ["type", "pass", "value"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ContrastComponent, decorators: [{
            type: Component,
            args: [{
                    // eslint-disable-next-line @angular-eslint/component-selector
                    selector: '[kendoContrastTool]',
                    template: `
        <div class="k-contrast-ratio">
            <span class="k-contrast-ratio-text">{{contrastRatioText}}</span>
            <ng-container *ngIf="value">
                <span class="k-contrast-validation k-text-success" *ngIf="satisfiesAACondition">
                    <span class="k-icon k-i-check"></span>
                    <span class="k-icon k-i-check" *ngIf="satisfiesAAACondition"></span>
                </span>
                <span class="k-contrast-validation k-text-error" *ngIf="!satisfiesAACondition">
                    <span class="k-icon k-i-x"></span>
                </span>
            </ng-container>
        </div>
        <div kendoContrastValidation
            type="AA"
            [value]="value"
            [pass]="satisfiesAACondition">
        </div>
        <div kendoContrastValidation
            type="AAA"
            [value]="value"
            [pass]="satisfiesAAACondition">
        </div>
    `
                }]
        }], ctorParameters: function () { return [{ type: i1.LocalizationService }]; }, propDecorators: { value: [{
                type: Input
            }], ratio: [{
                type: Input
            }] } });

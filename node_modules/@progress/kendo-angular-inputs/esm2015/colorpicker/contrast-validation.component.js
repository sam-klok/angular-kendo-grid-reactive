/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { AA_RATIO, AAA_RATIO } from './constants';
import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@progress/kendo-angular-l10n";
import * as i2 from "@angular/common";
/**
 * @hidden
 */
export class ContrastValidationComponent {
    constructor(localization) {
        this.localization = localization;
    }
    get passMessage() {
        return this.localization.get('passContrast');
    }
    get failMessage() {
        return this.localization.get('failContrast');
    }
    get contrastText() {
        let ratio = this.type === 'AA' ? AA_RATIO : AAA_RATIO;
        return `${this.type}: ${ratio.toFixed(1)}`;
    }
}
ContrastValidationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ContrastValidationComponent, deps: [{ token: i1.LocalizationService }], target: i0.ɵɵFactoryTarget.Component });
ContrastValidationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: ContrastValidationComponent, selector: "[kendoContrastValidation]", inputs: { type: "type", pass: "pass", value: "value" }, ngImport: i0, template: `
        <span>{{contrastText}}</span>
        <ng-container *ngIf="value">
            <span class="k-contrast-validation k-text-success" *ngIf="pass">
                {{passMessage}}
                <span class="k-icon k-i-check"></span>
            </span>
            <span class="k-contrast-validation k-text-error" *ngIf="!pass">
                {{failMessage}}
                <span class="k-icon k-i-x"></span>
            </span>
        </ng-container>
    `, isInline: true, directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ContrastValidationComponent, decorators: [{
            type: Component,
            args: [{
                    // eslint-disable-next-line @angular-eslint/component-selector
                    selector: '[kendoContrastValidation]',
                    template: `
        <span>{{contrastText}}</span>
        <ng-container *ngIf="value">
            <span class="k-contrast-validation k-text-success" *ngIf="pass">
                {{passMessage}}
                <span class="k-icon k-i-check"></span>
            </span>
            <span class="k-contrast-validation k-text-error" *ngIf="!pass">
                {{failMessage}}
                <span class="k-icon k-i-x"></span>
            </span>
        </ng-container>
    `
                }]
        }], ctorParameters: function () { return [{ type: i1.LocalizationService }]; }, propDecorators: { type: [{
                type: Input
            }], pass: [{
                type: Input
            }], value: [{
                type: Input
            }] } });

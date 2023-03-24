/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, HostBinding, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@progress/kendo-angular-l10n";
import * as i2 from "@angular/common";
/**
 * @hidden
 */
export class LoadingComponent {
    constructor(localization) {
        this.localization = localization;
        this.hostClass = true;
    }
    get loadingText() {
        return this.localization.get('loading');
    }
}
LoadingComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: LoadingComponent, deps: [{ token: i1.LocalizationService }], target: i0.ɵɵFactoryTarget.Component });
LoadingComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: LoadingComponent, selector: "[kendoGridLoading]", inputs: { loadingTemplate: "loadingTemplate" }, host: { properties: { "class.k-loading-mask": "this.hostClass" } }, ngImport: i0, template: `
        <ng-container *ngIf="!loadingTemplate">
            <span class="k-loading-text">{{ loadingText }}</span>
            <div class="k-loading-image"></div>
            <div class="k-loading-color"></div>
        </ng-container>
        <ng-template *ngIf="loadingTemplate" [ngTemplateOutlet]="loadingTemplate?.templateRef">
        </ng-template>
    `, isInline: true, directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: LoadingComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[kendoGridLoading]',
                    template: `
        <ng-container *ngIf="!loadingTemplate">
            <span class="k-loading-text">{{ loadingText }}</span>
            <div class="k-loading-image"></div>
            <div class="k-loading-color"></div>
        </ng-container>
        <ng-template *ngIf="loadingTemplate" [ngTemplateOutlet]="loadingTemplate?.templateRef">
        </ng-template>
    `
                }]
        }], ctorParameters: function () { return [{ type: i1.LocalizationService }]; }, propDecorators: { hostClass: [{
                type: HostBinding,
                args: ['class.k-loading-mask']
            }], loadingTemplate: [{
                type: Input
            }] } });

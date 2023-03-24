/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./../../common/provider.service";
import * as i2 from "@angular/common";
/**
 * @hidden
 */
export class ToolbarComponent {
    constructor(ctx) {
        this.ctx = ctx;
        this.context = {};
    }
    set position(value) {
        this.context.position = value;
    }
    get toolbarTemplateRef() {
        return this.ctx.grid.toolbarTemplate ? this.ctx.grid.toolbarTemplate.templateRef : undefined;
    }
}
ToolbarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ToolbarComponent, deps: [{ token: i1.ContextService }], target: i0.ɵɵFactoryTarget.Component });
ToolbarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: ToolbarComponent, selector: "kendo-grid-toolbar", inputs: { position: "position" }, ngImport: i0, template: `
        <ng-template
            *ngIf="toolbarTemplateRef"
            [ngTemplateOutlet]="toolbarTemplateRef"
            [ngTemplateOutletContext]="context"
            >
        </ng-template>
    `, isInline: true, directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ToolbarComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'kendo-grid-toolbar',
                    template: `
        <ng-template
            *ngIf="toolbarTemplateRef"
            [ngTemplateOutlet]="toolbarTemplateRef"
            [ngTemplateOutletContext]="context"
            >
        </ng-template>
    `
                }]
        }], ctorParameters: function () { return [{ type: i1.ContextService }]; }, propDecorators: { position: [{
                type: Input
            }] } });

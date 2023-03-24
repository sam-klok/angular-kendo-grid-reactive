/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, HostBinding, ChangeDetectionStrategy } from "@angular/core";
import { DropAction } from '../models';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * @hidden
 */
export class DragClueComponent {
    constructor(cdr) {
        this.cdr = cdr;
        this.hostClasses = true;
        this.posistionStyle = 'fixed';
    }
    get statusIconClass() {
        switch (this.action) {
            case DropAction.Add: return 'k-i-plus';
            case DropAction.InsertTop: return 'k-i-insert-top';
            case DropAction.InsertBottom: return 'k-i-insert-bottom';
            case DropAction.InsertMiddle: return 'k-i-insert-middle';
            case DropAction.Invalid:
            default: return 'k-i-cancel';
        }
    }
    // exposed as a public method that can be called from outside as the component uses `OnPush` strategy
    detectChanges() {
        this.cdr.detectChanges();
    }
}
DragClueComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: DragClueComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
DragClueComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: DragClueComponent, selector: "kendo-treeview-drag-clue", host: { properties: { "class.k-header": "this.hostClasses", "class.k-drag-clue": "this.hostClasses", "style.position": "this.posistionStyle" } }, ngImport: i0, template: `
        <ng-container *ngIf="!template">
            <span class="k-icon {{statusIconClass}} k-drag-status"></span>
            <span>{{text}}</span>
        </ng-container>

        <ng-template
            *ngIf="template"
            [ngTemplateOutlet]="template"
            [ngTemplateOutletContext]="{
                text: text,
                action: action,
                sourceItem: sourceItem,
                destinationItem: destinationItem
            }"
        >
        </ng-template>
    `, isInline: true, directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: DragClueComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-treeview-drag-clue',
                    template: `
        <ng-container *ngIf="!template">
            <span class="k-icon {{statusIconClass}} k-drag-status"></span>
            <span>{{text}}</span>
        </ng-container>

        <ng-template
            *ngIf="template"
            [ngTemplateOutlet]="template"
            [ngTemplateOutletContext]="{
                text: text,
                action: action,
                sourceItem: sourceItem,
                destinationItem: destinationItem
            }"
        >
        </ng-template>
    `
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { hostClasses: [{
                type: HostBinding,
                args: ['class.k-header']
            }, {
                type: HostBinding,
                args: ['class.k-drag-clue']
            }], posistionStyle: [{
                type: HostBinding,
                args: ['style.position']
            }] } });

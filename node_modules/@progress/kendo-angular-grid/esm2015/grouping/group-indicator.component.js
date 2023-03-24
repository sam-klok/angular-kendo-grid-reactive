/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, HostBinding, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * @hidden
 */
export class GroupIndicatorComponent {
    constructor() {
        this.directionChange = new EventEmitter();
        this.remove = new EventEmitter();
    }
    get groupIndicatorClass() {
        return true;
    }
    get dir() {
        return this.group.dir ? this.group.dir : "asc";
    }
    toggleDirection() {
        this.directionChange.emit({
            dir: this.dir === "asc" ? "desc" : "asc",
            field: this.group.field
        });
        return false;
    }
    removeDescriptor() {
        this.remove.emit({
            dir: this.group.dir,
            field: this.group.field
        });
        return false;
    }
}
GroupIndicatorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: GroupIndicatorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
GroupIndicatorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: GroupIndicatorComponent, selector: "[kendoGroupIndicator]", inputs: { group: "group", groupTitle: "groupTitle" }, outputs: { directionChange: "directionChange", remove: "remove" }, host: { properties: { "class.k-group-indicator": "this.groupIndicatorClass" } }, ngImport: i0, template: `
        <a href="#" class="k-link" tabindex="-1" (click)="toggleDirection()">
            <span class="k-icon"
                [class.k-i-sort-asc-small]="dir === 'asc'"
                [class.k-i-sort-desc-small]="dir === 'desc'"></span>
            {{groupTitle}}</a>
        <a class="k-button k-button-flat-base k-button-flat k-icon-button k-button-md k-rounded-md k-button-rectangle k-icon-button" tabindex="-1" (click)="removeDescriptor()">
            <span class="k-button-icon k-icon k-i-x"></span>
        </a>
    `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: GroupIndicatorComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: '[kendoGroupIndicator]',
                    template: `
        <a href="#" class="k-link" tabindex="-1" (click)="toggleDirection()">
            <span class="k-icon"
                [class.k-i-sort-asc-small]="dir === 'asc'"
                [class.k-i-sort-desc-small]="dir === 'desc'"></span>
            {{groupTitle}}</a>
        <a class="k-button k-button-flat-base k-button-flat k-icon-button k-button-md k-rounded-md k-button-rectangle k-icon-button" tabindex="-1" (click)="removeDescriptor()">
            <span class="k-button-icon k-icon k-i-x"></span>
        </a>
    `
                }]
        }], propDecorators: { directionChange: [{
                type: Output
            }], remove: [{
                type: Output
            }], group: [{
                type: Input
            }], groupTitle: [{
                type: Input
            }], groupIndicatorClass: [{
                type: HostBinding,
                args: ["class.k-group-indicator"]
            }] } });

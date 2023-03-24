/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ColumnMenuItemDirective } from './column-menu-item.directive';
import { Component, ContentChildren } from '@angular/core';
import { take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./column-menu.service";
/**
 * @hidden
 */
export class ColumnMenuContainerComponent {
    constructor(service, ngZone) {
        this.service = service;
        this.ngZone = ngZone;
    }
    ngAfterContentInit() {
        if (!this.columnMenuItems.length) {
            return;
        }
        this.columnMenuItems.first.isFirst = true;
        this.columnMenuItems.last.isLast = true;
        this.ngZone.onStable.pipe(take(1)).subscribe(() => this.service.menuTabbingService.firstFocusable.focus());
    }
}
ColumnMenuContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ColumnMenuContainerComponent, deps: [{ token: i1.ColumnMenuService }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
ColumnMenuContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: ColumnMenuContainerComponent, selector: "kendo-grid-columnmenu-container", queries: [{ propertyName: "columnMenuItems", predicate: ColumnMenuItemDirective, descendants: true }], ngImport: i0, template: `
        <ng-content></ng-content>
    `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ColumnMenuContainerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'kendo-grid-columnmenu-container',
                    template: `
        <ng-content></ng-content>
    `
                }]
        }], ctorParameters: function () { return [{ type: i1.ColumnMenuService }, { type: i0.NgZone }]; }, propDecorators: { columnMenuItems: [{
                type: ContentChildren,
                args: [ColumnMenuItemDirective, { descendants: true }]
            }] } });

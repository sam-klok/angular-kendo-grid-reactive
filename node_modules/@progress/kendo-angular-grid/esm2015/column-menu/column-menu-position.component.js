/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ColumnMenuItemBase } from './column-menu-item-base';
import * as i0 from "@angular/core";
import * as i1 from "@progress/kendo-angular-l10n";
import * as i2 from "./column-menu-item.component";
import * as i3 from "./column-menu-lock.component";
import * as i4 from "./column-menu-stick.component";
import * as i5 from "./column-menu-item-content-template.directive";
import * as i6 from "@angular/common";
/**
 * Represents the component for editing column filters in the Grid that can be placed
 * inside a [ColumnMenuTemplate]({% slug api_grid_columnmenutemplatedirective %}) directive.
 *
 * > You have to set the [ColumnMenuService]({% slug api_grid_columnmenuservice %}) that is passed by
 * > the template to the service input of the `kendo-grid-columnmenu-filter` component.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *       <kendo-grid [kendoGridBinding]="data" [columnMenu]="true">
 *          <ng-template kendoGridColumnMenuTemplate let-service="service">
 *              <kendo-grid-columnmenu-filter [service]="service">
 *              </kendo-grid-columnmenu-filter>
 *          </ng-template>
 *          <kendo-grid-column field="Field1"></kendo-grid-column>
 *          <kendo-grid-column field="Field2"></kendo-grid-column>
 *       </kendo-grid>
 *     `
 * })
 *
 * class AppComponent {
 *   public data: any[] = [{ Field1: 'Foo', Field2: 'Bar' }];
 * }
 *
 * ```
 */
export class ColumnMenuPositionComponent extends ColumnMenuItemBase {
    constructor(localization, hostElement) {
        super();
        this.localization = localization;
        this.hostElement = hostElement;
        /**
         * Fires when the content is expanded.
         */
        this.expand = new EventEmitter();
        /**
         * Fires when the content is collapsed.
         */
        this.collapse = new EventEmitter();
        /**
         * Specifies if the content is expanded.
         */
        this.expanded = false;
        /**
         * @hidden
         */
        this.actionsClass = 'k-columnmenu-actions';
        this._isLast = false;
    }
    /**
     * @hidden
     */
    set isLast(value) {
        this.service.menuTabbingService.lastFocusable = this.getLastFocusableItem();
        this._isLast = value;
    }
    /**
     * @hidden
     */
    get isLast() {
        return this._isLast;
    }
    /**
     * @hidden
     */
    onTab(e, isLastItem) {
        if (this.isLast && isLastItem) {
            e.preventDefault();
            e.stopImmediatePropagation();
            if (this.service) {
                this.service.menuTabbingService.firstFocusable.focus();
            }
        }
    }
    /**
     * @hidden
     */
    onCollapse() {
        this.expanded = false;
        if (this.isLast) {
            this.service.menuTabbingService.lastFocusable = this.getLastFocusableItem();
        }
        this.collapse.emit();
    }
    /**
     * @hidden
     */
    onExpand() {
        this.expanded = true;
        if (this.isLast) {
            this.service.menuTabbingService.lastFocusable = this.getLastFocusableItem();
        }
        this.expand.emit();
    }
    getLastFocusableItem() {
        const menuItems = this.hostElement.nativeElement.querySelectorAll('.k-columnmenu-item');
        const lastFocusableIndex = this.expanded ? menuItems.length - 1 : 0;
        return menuItems[lastFocusableIndex];
    }
}
ColumnMenuPositionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ColumnMenuPositionComponent, deps: [{ token: i1.LocalizationService }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
ColumnMenuPositionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: ColumnMenuPositionComponent, selector: "kendo-grid-columnmenu-position", inputs: { expanded: "expanded", showLock: "showLock", showStick: "showStick", isLast: "isLast" }, outputs: { expand: "expand", collapse: "collapse" }, usesInheritance: true, ngImport: i0, template: `
        <kendo-grid-columnmenu-item
            [text]="localization.get('setColumnPosition')"
            icon="set-column-position"
            [expanded]="expanded"
            (keydown.tab)="onTab($event, !expanded)"
            (collapse)="onCollapse()"
            (expand)="onExpand()">
            <ng-template kendoGridColumnMenuItemContentTemplate>
                <kendo-grid-columnmenu-lock
                    *ngIf="showLock"
                    (keydown.tab)="onTab($event, !showStick)"
                    [service]="service">
                </kendo-grid-columnmenu-lock>
                <kendo-grid-columnmenu-stick
                    *ngIf="showStick"
                    (keydown.tab)="onTab($event, true)"
                    [service]="service">
                </kendo-grid-columnmenu-stick>
            </ng-template>
        </kendo-grid-columnmenu-item>
    `, isInline: true, components: [{ type: i2.ColumnMenuItemComponent, selector: "kendo-grid-columnmenu-item", inputs: ["icon", "text", "selected", "disabled", "expanded"], outputs: ["itemClick", "expand", "collapse"] }, { type: i3.ColumnMenuLockComponent, selector: "kendo-grid-columnmenu-lock" }, { type: i4.ColumnMenuStickComponent, selector: "kendo-grid-columnmenu-stick" }], directives: [{ type: i5.ColumnMenuItemContentTemplateDirective, selector: "[kendoGridColumnMenuItemContentTemplate]" }, { type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ColumnMenuPositionComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'kendo-grid-columnmenu-position',
                    template: `
        <kendo-grid-columnmenu-item
            [text]="localization.get('setColumnPosition')"
            icon="set-column-position"
            [expanded]="expanded"
            (keydown.tab)="onTab($event, !expanded)"
            (collapse)="onCollapse()"
            (expand)="onExpand()">
            <ng-template kendoGridColumnMenuItemContentTemplate>
                <kendo-grid-columnmenu-lock
                    *ngIf="showLock"
                    (keydown.tab)="onTab($event, !showStick)"
                    [service]="service">
                </kendo-grid-columnmenu-lock>
                <kendo-grid-columnmenu-stick
                    *ngIf="showStick"
                    (keydown.tab)="onTab($event, true)"
                    [service]="service">
                </kendo-grid-columnmenu-stick>
            </ng-template>
        </kendo-grid-columnmenu-item>
    `
                }]
        }], ctorParameters: function () { return [{ type: i1.LocalizationService }, { type: i0.ElementRef }]; }, propDecorators: { expand: [{
                type: Output
            }], collapse: [{
                type: Output
            }], expanded: [{
                type: Input
            }], showLock: [{
                type: Input
            }], showStick: [{
                type: Input
            }], isLast: [{
                type: Input
            }] } });

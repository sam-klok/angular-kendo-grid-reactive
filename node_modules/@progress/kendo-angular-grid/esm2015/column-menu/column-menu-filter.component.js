/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ColumnMenuItemBase } from './column-menu-item-base';
import * as i0 from "@angular/core";
import * as i1 from "@progress/kendo-angular-l10n";
import * as i2 from "./column-menu-item.component";
import * as i3 from "../filtering/menu/filter-menu-container.component";
import * as i4 from "./column-menu-item-content-template.directive";
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
export class ColumnMenuFilterComponent extends ColumnMenuItemBase {
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
        this.isLast = false;
        /**
         * @hidden
         */
        this.actionsClass = 'k-columnmenu-actions';
    }
    /**
     * @hidden
     */
    onCollapse() {
        this.expanded = false;
        if (this.isLast) {
            this.service.menuTabbingService.lastFocusable = this.hostElement.nativeElement.querySelector('.k-columnmenu-item');
        }
        this.collapse.emit();
    }
    /**
     * @hidden
     */
    onExpand() {
        this.expanded = true;
        this.expand.emit();
    }
}
ColumnMenuFilterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ColumnMenuFilterComponent, deps: [{ token: i1.LocalizationService }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
ColumnMenuFilterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: ColumnMenuFilterComponent, selector: "kendo-grid-columnmenu-filter", inputs: { expanded: "expanded", isLast: "isLast" }, outputs: { expand: "expand", collapse: "collapse" }, usesInheritance: true, ngImport: i0, template: `
        <kendo-grid-columnmenu-item
            [text]="localization.get('filter')"
            icon="filter"
            [expanded]="expanded"
            (collapse)="onCollapse()"
            (expand)="onExpand()">
            <ng-template kendoGridColumnMenuItemContentTemplate>
                <kendo-grid-filter-menu-container
                    [column]="service.column"
                    [menuTabbingService]="service.menuTabbingService"
                    [filter]="service.filter"
                    [actionsClass]="actionsClass"
                    [isLast]="isLast"
                    [isExpanded]="expanded"
                    (keydown.shift.tab)="$event.stopImmediatePropagation()"
                    (close)="close()">
                </kendo-grid-filter-menu-container>
            </ng-template>
        </kendo-grid-columnmenu-item>
    `, isInline: true, components: [{ type: i2.ColumnMenuItemComponent, selector: "kendo-grid-columnmenu-item", inputs: ["icon", "text", "selected", "disabled", "expanded"], outputs: ["itemClick", "expand", "collapse"] }, { type: i3.FilterMenuContainerComponent, selector: "kendo-grid-filter-menu-container", inputs: ["column", "isLast", "isExpanded", "menuTabbingService", "filter", "actionsClass"], outputs: ["close"] }], directives: [{ type: i4.ColumnMenuItemContentTemplateDirective, selector: "[kendoGridColumnMenuItemContentTemplate]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ColumnMenuFilterComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'kendo-grid-columnmenu-filter',
                    template: `
        <kendo-grid-columnmenu-item
            [text]="localization.get('filter')"
            icon="filter"
            [expanded]="expanded"
            (collapse)="onCollapse()"
            (expand)="onExpand()">
            <ng-template kendoGridColumnMenuItemContentTemplate>
                <kendo-grid-filter-menu-container
                    [column]="service.column"
                    [menuTabbingService]="service.menuTabbingService"
                    [filter]="service.filter"
                    [actionsClass]="actionsClass"
                    [isLast]="isLast"
                    [isExpanded]="expanded"
                    (keydown.shift.tab)="$event.stopImmediatePropagation()"
                    (close)="close()">
                </kendo-grid-filter-menu-container>
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
            }], isLast: [{
                type: Input
            }] } });

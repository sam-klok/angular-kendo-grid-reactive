/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ColumnMenuItemBase } from './column-menu-item-base';
import * as i0 from "@angular/core";
import * as i1 from "@progress/kendo-angular-l10n";
import * as i2 from "../common/column-info.service";
import * as i3 from "./column-menu-item.component";
import * as i4 from "./column-list.component";
import * as i5 from "./column-menu-item-content-template.directive";
/**
 * Represents the component for selecting columns in the Grid that can be placed
 * inside a [ColumnMenuTemplate]({% slug api_grid_columnmenutemplatedirective %}) directive.
 *
 * > You have to set the [ColumnMenuService]({% slug api_grid_columnmenuservice %}) that is passed by
 * > the template to the service input of the `kendo-grid-columnmenu-chooser` component.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *       <kendo-grid [data]="data" [columnMenu]="true">
 *          <ng-template kendoGridColumnMenuTemplate let-service="service">
 *              <kendo-grid-columnmenu-chooser [service]="service">
 *              </kendo-grid-columnmenu-chooser>
 *          </ng-template>
 *          <kendo-grid-column field="Field1"></kendo-grid-column>
 *          <kendo-grid-column field="Field2" [hidden]="true"></kendo-grid-column>
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
export class ColumnMenuChooserComponent extends ColumnMenuItemBase {
    constructor(localization, columnInfoService, changeDetector, hostElement) {
        super();
        this.localization = localization;
        this.columnInfoService = columnInfoService;
        this.changeDetector = changeDetector;
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
    get columns() {
        return this.columnInfoService.leafNamedColumns;
    }
    /**
     * @hidden
     */
    onApply(changed) {
        this.close();
        if (changed.length) {
            this.changeDetector.markForCheck();
            this.columnInfoService.changeVisibility(changed);
        }
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
ColumnMenuChooserComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ColumnMenuChooserComponent, deps: [{ token: i1.LocalizationService }, { token: i2.ColumnInfoService }, { token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
ColumnMenuChooserComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: ColumnMenuChooserComponent, selector: "kendo-grid-columnmenu-chooser", inputs: { expanded: "expanded", isLast: "isLast" }, outputs: { expand: "expand", collapse: "collapse" }, usesInheritance: true, ngImport: i0, template: `
        <kendo-grid-columnmenu-item
            [text]="localization.get('columns')"
            icon="columns"
            [expanded]="expanded"
            (collapse)="onCollapse()"
            (expand)="onExpand()">
            <ng-template kendoGridColumnMenuItemContentTemplate>
                <kendo-grid-columnlist
                    [applyText]="localization.get('columnsApply')"
                    [resetText]="localization.get('columnsReset')"
                    [columns]="columns"
                    [autoSync]="false"
                    [allowHideAll]="false"
                    [actionsClass]="actionsClass"
                    [isLast]="isLast"
                    [isExpanded]="expanded"
                    [service]="service"
                    (apply)="onApply($event)">
                </kendo-grid-columnlist>
            </ng-template>
        </kendo-grid-columnmenu-item>
    `, isInline: true, components: [{ type: i3.ColumnMenuItemComponent, selector: "kendo-grid-columnmenu-item", inputs: ["icon", "text", "selected", "disabled", "expanded"], outputs: ["itemClick", "expand", "collapse"] }, { type: i4.ColumnListComponent, selector: "kendo-grid-columnlist", inputs: ["columns", "autoSync", "allowHideAll", "applyText", "resetText", "actionsClass", "isLast", "isExpanded", "service"], outputs: ["reset", "apply", "columnChange"] }], directives: [{ type: i5.ColumnMenuItemContentTemplateDirective, selector: "[kendoGridColumnMenuItemContentTemplate]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ColumnMenuChooserComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'kendo-grid-columnmenu-chooser',
                    template: `
        <kendo-grid-columnmenu-item
            [text]="localization.get('columns')"
            icon="columns"
            [expanded]="expanded"
            (collapse)="onCollapse()"
            (expand)="onExpand()">
            <ng-template kendoGridColumnMenuItemContentTemplate>
                <kendo-grid-columnlist
                    [applyText]="localization.get('columnsApply')"
                    [resetText]="localization.get('columnsReset')"
                    [columns]="columns"
                    [autoSync]="false"
                    [allowHideAll]="false"
                    [actionsClass]="actionsClass"
                    [isLast]="isLast"
                    [isExpanded]="expanded"
                    [service]="service"
                    (apply)="onApply($event)">
                </kendo-grid-columnlist>
            </ng-template>
        </kendo-grid-columnmenu-item>
    `
                }]
        }], ctorParameters: function () { return [{ type: i1.LocalizationService }, { type: i2.ColumnInfoService }, { type: i0.ChangeDetectorRef }, { type: i0.ElementRef }]; }, propDecorators: { expand: [{
                type: Output
            }], collapse: [{
                type: Output
            }], expanded: [{
                type: Input
            }], isLast: [{
                type: Input
            }] } });

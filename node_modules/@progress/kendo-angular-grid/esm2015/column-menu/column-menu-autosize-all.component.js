/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, isDevMode } from '@angular/core';
import { ColunnMenuErrorMessages } from '../common/error-messages';
import { ColumnMenuItemBase } from './column-menu-item-base';
import { autoSizeColumn } from './utils';
import * as i0 from "@angular/core";
import * as i1 from "@progress/kendo-angular-l10n";
import * as i2 from "../common/provider.service";
import * as i3 from "./column-menu-item.component";
import * as i4 from "@angular/common";
/**
 * Represents the component for resizing all columns to the minimum possible width so that they fit the widest header or cell content without wrapping.
 * The component can be placed inside a [ColumnMenuTemplate]({% slug api_grid_columnmenutemplatedirective %}) directive.
 *
 * > To enable the autosize-all-columns option, set the [`resizable`]({% slug api_grid_gridcomponent %}#toc-resizable)
 * > property of the Grid to `true`.
 *
 * > You have to set the [ColumnMenuService]({% slug api_grid_columnmenuservice %}) that is passed by
 * > the template to the `service` input of the `kendo-grid-columnmenu-autosize-all-columns` component.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *       <kendo-grid [data]="data" [columnMenu]="true">
 *          <ng-template kendoGridColumnMenuTemplate let-service="service">
 *              <kendo-grid-columnmenu-autosize-all-columns [service]="service">
 *              </kendo-grid-columnmenu-autosize-all-columns>
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
export class ColumnMenuAutoSizeAllColumnsComponent extends ColumnMenuItemBase {
    constructor(localization, ctx) {
        super();
        this.localization = localization;
        this.ctx = ctx;
    }
    ngOnInit() {
        const isVirtualColumns = this.ctx.grid.columnMenuTemplate && this.ctx.grid.virtualColumns;
        if (isVirtualColumns && isDevMode()) {
            console.warn(ColunnMenuErrorMessages.autoSizeAllColumns);
        }
    }
    autoSizeAllColumns() {
        autoSizeColumn(this.ctx.grid, this.service);
    }
}
ColumnMenuAutoSizeAllColumnsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ColumnMenuAutoSizeAllColumnsComponent, deps: [{ token: i1.LocalizationService }, { token: i2.ContextService }], target: i0.ɵɵFactoryTarget.Component });
ColumnMenuAutoSizeAllColumnsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: ColumnMenuAutoSizeAllColumnsComponent, selector: "kendo-grid-columnmenu-autosize-all-columns", usesInheritance: true, ngImport: i0, template: `
        <kendo-grid-columnmenu-item
            *ngIf="!this.ctx.grid.virtualColumns"
            [text]="localization.get('autosizeAllColumns')"
            icon="display-inline-block"
            (itemClick)="autoSizeAllColumns()"
        >
        </kendo-grid-columnmenu-item>
    `, isInline: true, components: [{ type: i3.ColumnMenuItemComponent, selector: "kendo-grid-columnmenu-item", inputs: ["icon", "text", "selected", "disabled", "expanded"], outputs: ["itemClick", "expand", "collapse"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ColumnMenuAutoSizeAllColumnsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'kendo-grid-columnmenu-autosize-all-columns',
                    template: `
        <kendo-grid-columnmenu-item
            *ngIf="!this.ctx.grid.virtualColumns"
            [text]="localization.get('autosizeAllColumns')"
            icon="display-inline-block"
            (itemClick)="autoSizeAllColumns()"
        >
        </kendo-grid-columnmenu-item>
    `
                }]
        }], ctorParameters: function () { return [{ type: i1.LocalizationService }, { type: i2.ContextService }]; } });

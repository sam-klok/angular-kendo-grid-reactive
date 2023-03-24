/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { OnInit } from '@angular/core';
import { LocalizationService } from "@progress/kendo-angular-l10n";
import { ContextService } from '../common/provider.service';
import { ColumnMenuItemBase } from './column-menu-item-base';
import * as i0 from "@angular/core";
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
export declare class ColumnMenuAutoSizeAllColumnsComponent extends ColumnMenuItemBase implements OnInit {
    localization: LocalizationService;
    ctx: ContextService;
    constructor(localization: LocalizationService, ctx: ContextService);
    ngOnInit(): void;
    autoSizeAllColumns(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ColumnMenuAutoSizeAllColumnsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ColumnMenuAutoSizeAllColumnsComponent, "kendo-grid-columnmenu-autosize-all-columns", never, {}, {}, never, never>;
}

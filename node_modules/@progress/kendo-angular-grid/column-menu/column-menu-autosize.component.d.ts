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
 * Represents the component for resizing the specified column to the minimum possible width so that it fits the header or cell content without wrapping.
 * The component can be placed inside a [ColumnMenuTemplate]({% slug api_grid_columnmenutemplatedirective %}) directive.
 *
 * > To enable the autosize-column option, set the [`resizable`]({% slug api_grid_gridcomponent %}#toc-resizable)
 * > property of the Grid to `true`.
 *
 * > You have to set the [ColumnMenuService]({% slug api_grid_columnmenuservice %}) and `column` that are passed by
 * > the template to the `service` and `column` input of the `kendo-grid-columnmenu-autosize-column` component.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *       <kendo-grid [data]="data" [columnMenu]="true">
 *          <ng-template kendoGridColumnMenuTemplate let-service="service" let-column="column">
 *              <kendo-grid-columnmenu-autosize-column [column]="column" [service]="service">
 *              </kendo-grid-columnmenu-autosize-column>
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
export declare class ColumnMenuAutoSizeColumnComponent extends ColumnMenuItemBase implements OnInit {
    localization: LocalizationService;
    ctx: ContextService;
    /**
     * The Grid column instance which will be resized through the auto size column option.
     */
    column: any;
    constructor(localization: LocalizationService, ctx: ContextService);
    ngOnInit(): void;
    autoSizeColumn(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ColumnMenuAutoSizeColumnComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ColumnMenuAutoSizeColumnComponent, "kendo-grid-columnmenu-autosize-column", never, { "column": "column"; }, {}, never, never>;
}

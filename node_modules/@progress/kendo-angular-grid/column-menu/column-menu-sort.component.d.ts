/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Renderer2 } from '@angular/core';
import { LocalizationService } from "@progress/kendo-angular-l10n";
import { SortService } from '../common/sort.service';
import { ColumnMenuItemBase } from './column-menu-item-base';
import * as i0 from "@angular/core";
/**
 * Represents a column-menu item for sorting Grid columns that can be placed inside a
 * [ColumnMenuTemplate]({% slug api_grid_columnmenutemplatedirective %}) directive.
 * Allows the user to sort the column.
 *
 * > You have to set the [ColumnMenuService]({% slug api_grid_columnmenuservice %}) that is passed by
 * > the template to the service input of the `kendo-grid-columnmenu-sort` component.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *       <kendo-grid [kendoGridBinding]="data" [sortable]="true" [columnMenu]="true">
 *          <ng-template kendoGridColumnMenuTemplate let-service="service">
 *              <kendo-grid-columnmenu-sort [service]="service">
 *              </kendo-grid-columnmenu-sort>
 *          </ng-template>
 *          <kendo-grid-column field="Field1" [width]="100"></kendo-grid-column>
 *          <kendo-grid-column field="Field2" [width]="100"></kendo-grid-column>
 *       </kendo-grid>
 *     `
 * })
 *
 * class AppComponent {
 *   public data: any[] = [{ Field1: 'Foo', Field2: 'Bar' }, { Field1: 'Foo1', Field2: 'Bar1' }];
 * }
 *
 * ```
 */
export declare class ColumnMenuSortComponent extends ColumnMenuItemBase {
    localization: LocalizationService;
    protected sortService: SortService;
    protected renderer: Renderer2;
    constructor(localization: LocalizationService, sortService: SortService, renderer: Renderer2);
    get sortedAsc(): boolean;
    get sortedDesc(): boolean;
    /**
     * @hidden
     */
    toggleSort(dir: string): void;
    private get descriptor();
    static ɵfac: i0.ɵɵFactoryDeclaration<ColumnMenuSortComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ColumnMenuSortComponent, "kendo-grid-columnmenu-sort", never, {}, {}, never, never>;
}

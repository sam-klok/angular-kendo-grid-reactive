/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { MenuTabbingService } from './../filtering/menu/menu-tabbing.service';
import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Represents the service that is passed to the
 * [ColumnMenuTemplate]({% slug api_grid_columnmenutemplatedirective %}) directive.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *       <kendo-grid [data]="data" [columnMenu]="true">
 *          <ng-template kendoGridColumnMenuTemplate let-service="service">
 *              <span class="k-icon k-i-x" (click)="service.close()"
 *                  style="position: absolute; right: 5px; top: 5px;cursor: pointer;"></span>
 *              <kendo-grid-columnmenu-sort [service]="service">
 *              </kendo-grid-columnmenu-sort>
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
export declare class ColumnMenuService {
    /**
     * @hidden
     */
    menuTabbingService: MenuTabbingService;
    /**
     * @hidden
     */
    closeMenu: EventEmitter<any>;
    /**
     * @hidden
     */
    column: any;
    /**
     * @hidden
     */
    sort: any;
    /**
     * @hidden
     */
    filter: any;
    /**
     * @hidden
     */
    sortable: any;
    /**
     * Closes the column menu.
     */
    close(): void;
    /**
     * @hidden
     */
    constructor(menuTabbingService?: MenuTabbingService);
    static ɵfac: i0.ɵɵFactoryDeclaration<ColumnMenuService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ColumnMenuService>;
}

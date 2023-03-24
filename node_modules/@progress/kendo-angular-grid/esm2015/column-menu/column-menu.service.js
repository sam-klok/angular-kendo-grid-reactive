/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./../filtering/menu/menu-tabbing.service";
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
export class ColumnMenuService {
    /**
     * @hidden
     */
    constructor(menuTabbingService) {
        /**
         * @hidden
         */
        this.closeMenu = new EventEmitter();
        this.menuTabbingService = menuTabbingService;
    }
    /**
     * Closes the column menu.
     */
    close() {
        this.closeMenu.emit();
    }
}
ColumnMenuService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ColumnMenuService, deps: [{ token: i1.MenuTabbingService }], target: i0.ɵɵFactoryTarget.Injectable });
ColumnMenuService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ColumnMenuService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ColumnMenuService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.MenuTabbingService }]; } });

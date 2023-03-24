/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component } from '@angular/core';
import { ColumnMenuItemBase } from './column-menu-item-base';
import * as i0 from "@angular/core";
import * as i1 from "@progress/kendo-angular-l10n";
import * as i2 from "../common/column-info.service";
import * as i3 from "./column-menu-item.component";
/**
 * Represents a column-menu item that can be placed inside a
 * [ColumnMenuTemplate]({% slug api_grid_columnmenutemplatedirective %}) directive.
 * Allows the user to stick or unstick the columns.
 *
 * > You have to set the [ColumnMenuService]({% slug api_grid_columnmenuservice %}) that is passed by
 * > the template to the service input of the `kendo-grid-columnmenu-stick` component.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *       <kendo-grid [data]="data" [columnMenu]="true">
 *          <ng-template kendoGridColumnMenuTemplate let-service="service">
 *              <kendo-grid-columnmenu-stick [service]="service">
 *              </kendo-grid-columnmenu-stick>
 *          </ng-template>
 *          <kendo-grid-column field="Field1" [width]="100"></kendo-grid-column>
 *          <kendo-grid-column field="Field2" [width]="100"></kendo-grid-column>
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
export class ColumnMenuStickComponent extends ColumnMenuItemBase {
    constructor(localization, columnInfoService, changeDetector) {
        super();
        this.localization = localization;
        this.columnInfoService = columnInfoService;
        this.changeDetector = changeDetector;
    }
    get text() {
        return this.localization.get(this.sticky ? 'unstick' : 'stick');
    }
    get icon() {
        return this.sticky ? 'unstick' : 'stick';
    }
    get disabled() {
        return !this.sticky && this.columnInfoService.unlockedRootCount < 2;
    }
    /**
     * @hidden
     */
    toggleColumn() {
        this.toggleHierarchy(!this.sticky);
        this.close();
        this.changeDetector.markForCheck();
    }
    toggleHierarchy(sticky) {
        let root = this.service.column;
        while (root.parent) {
            root = root.parent;
        }
        const columns = [root];
        const allChanged = [];
        while (columns.length) {
            const column = columns.shift();
            column.sticky = sticky;
            allChanged.push(column);
            if (column.hasChildren) {
                columns.push(...column.childrenArray);
            }
        }
        this.columnInfoService.changeStuck(allChanged);
    }
    get sticky() {
        return this.service.column.sticky;
    }
}
ColumnMenuStickComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ColumnMenuStickComponent, deps: [{ token: i1.LocalizationService }, { token: i2.ColumnInfoService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
ColumnMenuStickComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: ColumnMenuStickComponent, selector: "kendo-grid-columnmenu-stick", usesInheritance: true, ngImport: i0, template: `
       <kendo-grid-columnmenu-item [text]="text" [icon]="icon" (itemClick)="toggleColumn()" [disabled]="disabled">
       </kendo-grid-columnmenu-item>
    `, isInline: true, components: [{ type: i3.ColumnMenuItemComponent, selector: "kendo-grid-columnmenu-item", inputs: ["icon", "text", "selected", "disabled", "expanded"], outputs: ["itemClick", "expand", "collapse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ColumnMenuStickComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'kendo-grid-columnmenu-stick',
                    template: `
       <kendo-grid-columnmenu-item [text]="text" [icon]="icon" (itemClick)="toggleColumn()" [disabled]="disabled">
       </kendo-grid-columnmenu-item>
    `
                }]
        }], ctorParameters: function () { return [{ type: i1.LocalizationService }, { type: i2.ColumnInfoService }, { type: i0.ChangeDetectorRef }]; } });

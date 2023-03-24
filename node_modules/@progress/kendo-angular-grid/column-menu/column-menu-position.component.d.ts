/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter, ElementRef } from '@angular/core';
import { LocalizationService } from "@progress/kendo-angular-l10n";
import { ColumnMenuItemBase } from './column-menu-item-base';
import * as i0 from "@angular/core";
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
export declare class ColumnMenuPositionComponent extends ColumnMenuItemBase {
    localization: LocalizationService;
    private hostElement;
    /**
     * Fires when the content is expanded.
     */
    expand: EventEmitter<any>;
    /**
     * Fires when the content is collapsed.
     */
    collapse: EventEmitter<any>;
    /**
     * Specifies if the content is expanded.
     */
    expanded: boolean;
    /**
     * Specifies if the lock column item is displayed.
     */
    showLock: boolean;
    /**
     * Specifies if the stick column item is displayed.
     */
    showStick: boolean;
    /**
     * @hidden
     */
    actionsClass: string;
    /**
     * @hidden
     */
    set isLast(value: boolean);
    /**
     * @hidden
     */
    get isLast(): boolean;
    private _isLast;
    constructor(localization: LocalizationService, hostElement: ElementRef);
    /**
     * @hidden
     */
    onTab(e: Event, isLastItem: boolean): void;
    /**
     * @hidden
     */
    onCollapse(): void;
    /**
     * @hidden
     */
    onExpand(): void;
    private getLastFocusableItem;
    static ɵfac: i0.ɵɵFactoryDeclaration<ColumnMenuPositionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ColumnMenuPositionComponent, "kendo-grid-columnmenu-position", never, { "expanded": "expanded"; "showLock": "showLock"; "showStick": "showStick"; "isLast": "isLast"; }, { "expand": "expand"; "collapse": "collapse"; }, never, never>;
}

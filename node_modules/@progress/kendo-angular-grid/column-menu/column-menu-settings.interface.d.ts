/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ExpandableColumnMenuItem } from "./column-menu-expandable-item.interface";
/**
 * The settings of the column menu in the Grid component.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *       <kendo-grid [data]="data" [filterable]="true" [columnMenu]="{ lock: true, filter: false }">
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
export interface ColumnMenuSettings {
    /**
     * Specifies if the columns can be sorted in the column menu.
     * If [sorting]({% slug api_grid_gridcomponent %}#toc-sortable) is enabled, defaults to `true`.
     * @default true
     */
    sort?: boolean;
    /**
     * Specifies if the columns can be filtered in the column menu.
     * If [filtering]({% slug api_grid_gridcomponent %}#toc-filterable) is enabled, defaults to `true`.
     * @default true
     */
    filter?: boolean | ExpandableColumnMenuItem;
    /**
     * Specifies if the item for column selection will be displayed in the column menu.
     * @default true
     */
    columnChooser?: boolean | ExpandableColumnMenuItem;
    /**
     * Specifies if the columns can be locked and unlocked from the column menu.
     * This option follows the prerequisites and limitations of the [locked columns]({% slug locked_columns_grid %}).
     * @default false
     */
    lock?: boolean;
    /**
     * Specifies if the columns can be stuck and unstuck from the column menu.
     * This option follows the prerequisites and limitations of the [sticky columns]({% slug sticky_columns_grid %}).
     * @default false
     */
    stick?: boolean;
    /**
     * Specifies whether the stick and lock items will be displayed in an expandable sub-menu or as standalone root-level menu items.
     * @default false
     */
    setColumnPosition?: boolean | ExpandableColumnMenuItem;
    /**
     * Applies the minimum possible width for the specified column, so that the whole text fits without wrapping.
     * @default false
     */
    autoSizeColumn?: boolean;
    /**
     * Adjusts the width of all columns to fit their entire content, including headers, without wrapping.
     * @default false
     */
    autoSizeAllColumns?: boolean;
}

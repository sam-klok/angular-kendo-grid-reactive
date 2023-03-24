/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { TemplateRef, QueryList } from '@angular/core';
import { HeaderTemplateDirective } from '../rendering/header/header-template.directive';
import { FooterTemplateDirective } from '../rendering/footer/footer-template.directive';
import { ColumnMenuTemplateDirective } from '../column-menu/column-menu-template.directive';
import { IdService } from '../common/id.service';
import * as i0 from "@angular/core";
/**
 * @hidden
 */
export declare const isSpanColumn: (column: any) => any;
/**
 * @hidden
 */
export declare const isCheckboxColumn: (column: any) => any;
/**
 * The base class for the column components of the Grid.
 */
export declare class ColumnBase {
    parent?: ColumnBase;
    /**
     * @hidden
     */
    matchesMedia: boolean;
    /**
     * The column index after reordering.
     *
     * > `orderIndex` is a read-only property. Setting this field does not affect column order.
     */
    orderIndex: number;
    /**
     * @hidden
     */
    set leafIndex(value: number);
    /**
     * @hidden
     */
    get leafIndex(): number;
    protected _leafIndex: number;
    /**
     * @hidden
     */
    isColumnGroup: boolean;
    /**
     * @hidden
     */
    isSpanColumn: boolean;
    /**
     * Indicates whether the column is resizable.
     * @default true
     */
    resizable: boolean;
    /**
     * Indicates whether the column is reorderable.
     * @default true
     */
    reorderable: boolean;
    /**
     * The width (in pixels) below which the user is not able to resize the column by using the UI ([see example]({% slug resizing_columns_grid %}#toc-limiting-the-resizing)).
     * @default 10
     */
    minResizableWidth: number;
    /**
     * The width (in pixels) above which the user is not able to resize the column by using the UI ([see example]({% slug resizing_columns_grid %}#toc-limiting-the-resizing)).
     * By default, the maximum width is not restricted.
     */
    maxResizableWidth: number;
    /**
     * The title of the column.
     */
    title: string;
    /**
     * The width of the column (in pixels).
     */
    set width(value: number);
    get width(): number;
    /**
     * Indicates whether the column will be resized during initialization so that it fits its header and row content.
     */
    autoSize: boolean;
    /**
     * Toggles the locked (frozen) state of the columns ([more information and example]({% slug locked_columns_grid %})).
     *
     * @default false
     *
     * @example
     * ```ts
     * _@Component({
     *    selector: 'my-app',
     *    template: `
     *        <kendo-grid [data]="gridData" [scrollable]="scrollable" style="height: 200px">
     *          <kendo-grid-column field="ProductID" title="Product ID" [width]="120" [locked]="true">
     *          </kendo-grid-column>
     *          <kendo-grid-column field="ProductName" title="Product Name" [width]="200">
     *          </kendo-grid-column>
     *          <kendo-grid-column field="UnitPrice" title="Unit Price" [width]="230">
     *          </kendo-grid-column>
     *        </kendo-grid>
     *    `
     * })
     *
     * class AppComponent {
     *    public gridData: any[];
     *
     *    constructor() {
     *        this.gridData = products;
     *    }
     * }
     *
     * const products = [{
     *    "ProductID": 1,
     *    "ProductName": "Chai",
     *    "UnitPrice": 18.0000,
     *    "Discontinued": true
     *  }, {
     *    "ProductID": 2,
     *    "ProductName": "Chang",
     *    "UnitPrice": 19.0000,
     *    "Discontinued": false
     *  }
     * ];
     *
     * ```
     */
    set locked(value: boolean);
    get locked(): boolean;
    protected _locked: boolean;
    /**
     * Determines whether the column will be always visible when scrolling the Grid horizontally.
     *
     * @default false
     */
    sticky: boolean;
    /**
     * Sets the visibility of the column ([see example]({% slug hidden_columns_grid %}#toc-using-built-in-options)).
     *
     * @default false
     */
    hidden: boolean;
    /**
     * Sets the condition that needs to be satisfied for a column to remain visible ([see example]({% slug styling_responsive_grid %}#toc-columns)).
     * If you set the `hidden` property, the behavior of `media` is overridden.
     *
     * @example
     * ```html
     * <kendo-grid>
     *    <kendo-grid-column field="UnitPrice" media="(min-width: 320px)">
     *    </kendo-grid-column>
     * </kendo-grid>
     * ```
     *
     * Accepts the device identifiers that are [available in Bootstrap 4](https://v4-alpha.getbootstrap.com/layout/grid/#grid-options)
     * ([see example]({% slug styling_responsive_grid %}#toc-bootstrap-4-compatibility)):
     * * `"xs"`&mdash;Equivalent to `"(max-width: 576px)"`.
     * * `"sm"`&mdash;Equivalent to `"(min-width: 576px)"`.
     * * `"md"`&mdash;Equivalent to `"(min-width: 768px)"`.
     * * `"lg"`&mdash;Equivalent to `"(min-width: 992px)"`.
     * * `"xl"`&mdash;Equivalent to `"(min-width: 1200px)"`.
     *
     * @example
     * ```html
     * <kendo-grid>
     *    <kendo-grid-column field="UnitPrice" media="md">
     *    </kendo-grid-column>
     * </kendo-grid>
     * ```
     */
    media: string;
    /**
     * Specifies if the column can be locked or unlocked from the column menu or by reordering the columns.
     */
    lockable: boolean;
    /**
     * Specifies if the column can be stuck or unstuck from the column menu.
     */
    stickable: boolean;
    /**
     * Specifies if the column menu will be shown for the column.
     */
    columnMenu: boolean;
    /**
     * Specifies if the column will be included in the column-chooser list.
     */
    includeInChooser: boolean;
    /**
     * Sets the custom styles for the table cells (excluding the footer and header ones) of the column. Under the hood,
     * to apply the property, the `style` option uses the
     * [NgStyle](link:site.data.urls.angular['ngstyleapi']) directive.
     *
     * @example
     * ```ts
     * _@Component({
     *    selector: 'my-app',
     *    template: `
     *        <kendo-grid [data]="gridData" style="height: 200px">
     *          <kendo-grid-column field="ProductName" title="Product Name" [width]="200" [style]="{'text-align': 'right'}">
     *          </kendo-grid-column>
     *          <kendo-grid-column field="UnitPrice" title="Unit Price" [width]="230">
     *          </kendo-grid-column>
     *        </kendo-grid>
     *    `
     * })
     *
     * class AppComponent {
     *    public gridData: any[];
     *
     *    constructor() {
     *        this.gridData = [{
     *            "ProductID": 1,
     *            "ProductName": "Chai",
     *            "UnitPrice": 18.0000,
     *            "Discontinued": true
     *          }, {
     *            "ProductID": 2,
     *            "ProductName": "Chang",
     *            "UnitPrice": 19.0000,
     *            "Discontinued": false
     *          }];
     *    }
     * }
     *
     * ```
     */
    style: {
        [key: string]: string;
    };
    /**
     * Sets the custom styles for the header cell of the column. Under the hood, to apply the property,
     * the `headerStyle` option uses the
     * [NgStyle](link:site.data.urls.angular['ngstyleapi']) directive.
     *
     * @example
     * ```ts
     * _@Component({
     *    selector: 'my-app',
     *    template: `
     *        <kendo-grid [data]="gridData" style="height: 200px">
     *          <kendo-grid-column field="ProductName" title="Product Name" [width]="200" [headerStyle]="{'text-align': 'right'}">
     *          </kendo-grid-column>
     *          <kendo-grid-column field="UnitPrice" title="Unit Price" [width]="230">
     *          </kendo-grid-column>
     *        </kendo-grid>
     *    `
     * })
     *
     * class AppComponent {
     *    public gridData: any[];
     *
     *    constructor() {
     *        this.gridData = [{
     *            "ProductID": 1,
     *            "ProductName": "Chai",
     *            "UnitPrice": 18.0000,
     *            "Discontinued": true
     *          }, {
     *            "ProductID": 2,
     *            "ProductName": "Chang",
     *            "UnitPrice": 19.0000,
     *            "Discontinued": false
     *          }];
     *    }
     * }
     *
     * ```
     */
    headerStyle: {
        [key: string]: string;
    };
    /**
     * Sets the custom styles for the filter row cell. Under the hood, to apply the property,
     * the `filterStyle` option uses the
     * [NgStyle](link:site.data.urls.angular['ngstyleapi']) directive.
     *
     * @example
     * ```ts
     * _@Component({
     *    selector: 'my-app',
     *    template: `
     *        <kendo-grid [data]="gridData" style="height: 180px" [filterable]="true">
     *          <kendo-grid-column field="ProductName" title="Product Name" [width]="200" [filterStyle]="{'padding': '25px'}">
     *          </kendo-grid-column>
     *          <kendo-grid-column field="UnitPrice" title="Unit Price" [width]="200">
     *          </kendo-grid-column>
     *        </kendo-grid>
     *    `
     * })
     *
     * export class AppComponent {
     *    public gridData: any[];
     *
     *    constructor() {
     *        this.gridData = [{
     *            "ProductID": 1,
     *            "ProductName": "Chai",
     *            "UnitPrice": 18.0000,
     *            "Discontinued": true
     *          }, {
     *            "ProductID": 2,
     *            "ProductName": "Chang",
     *            "UnitPrice": 19.0000,
     *            "Discontinued": false
     *          }];
     *    }
     * }
     *
     * ```
     */
    filterStyle: {
        [key: string]: string;
    };
    /**
     * Sets the custom styles for the footer cell of the column. Under the hood, to apply the property,
     * the `footerStyle` option uses the
     * [NgStyle](link:site.data.urls.angular['ngstyleapi']) directive.
     *
     * @example
     * ```ts
     * _@Component({
     *    selector: 'my-app',
     *    template: `
     *        <kendo-grid [data]="gridData" style="height: 200px">
     *          <kendo-grid-column field="ProductName" title="Product Name" [width]="200" [footerStyle]="{'text-align': 'right'}">
     *              <ng-template kendoGridFooterTemplate>
     *                  footer text
     *              </ng-template>
     *          </kendo-grid-column>
     *          <kendo-grid-column field="UnitPrice" title="Unit Price" [width]="230">
     *          </kendo-grid-column>
     *        </kendo-grid>
     *    `
     * })
     *
     * class AppComponent {
     *    public gridData: any[];
     *
     *    constructor() {
     *        this.gridData = [{
     *            "ProductID": 1,
     *            "ProductName": "Chai",
     *            "UnitPrice": 18.0000,
     *            "Discontinued": true
     *          }, {
     *            "ProductID": 2,
     *            "ProductName": "Chang",
     *            "UnitPrice": 19.0000,
     *            "Discontinued": false
     *          }];
     *    }
     * }
     *
     * ```
     */
    footerStyle: {
        [key: string]: string;
    };
    /**
     * Sets the custom CSS classes to the column cells. Under the hood, to apply the property, the `class` option uses the
     * [NgClass](link:site.data.urls.angular['ngclassapi']) directive.
     * To customize header and footer column cells, use the [headerClass]({% slug api_grid_columncomponent %}#toc-headerclass)
     * and [footerClass]({% slug api_grid_columncomponent %}#toc-footerclass) inputs.
     *
     * @example
     * ```ts
     * import { Component, ViewEncapsulation } from '@angular/core';
     *
     * _@Component({
     *    selector: 'my-app',
     *    encapsulation: ViewEncapsulation.None,
     *    styles: [`
     *        tr .myClass {
     *            text-align: right
     *       }
     *    `],
     *    template: `
     *        <kendo-grid [data]="gridData" style="height: 200px">
     *          <kendo-grid-column field="ProductName" title="Product Name" [width]="200" [class]="{'myClass': true}">
     *          </kendo-grid-column>
     *          <kendo-grid-column field="UnitPrice" title="Unit Price" [width]="230">
     *          </kendo-grid-column>
     *        </kendo-grid>
     *    `
     * })
     *
     * class AppComponent {
     *    public gridData: any[];
     *
     *    constructor() {
     *        this.gridData = [{
     *            "ProductID": 1,
     *            "ProductName": "Chai",
     *            "UnitPrice": 18.0000,
     *            "Discontinued": true
     *          }, {
     *            "ProductID": 2,
     *            "ProductName": "Chang",
     *            "UnitPrice": 19.0000,
     *            "Discontinued": false
     *          }];
     *    }
     * }
     *
     * ```
     */
    cssClass: string | string[] | Set<string> | {
        [key: string]: any;
    };
    /**
     * Sets the custom CSS classes to the column header cell. Under the hood, to apply the property,
     * the `headerClass` option uses the
     * [NgClass](link:site.data.urls.angular['ngclassapi']) directive.
     *
     * @example
     * ```ts
     * import { Component, ViewEncapsulation } from '@angular/core';
     *
     * _@Component({
     *    selector: 'my-app',
     *    encapsulation: ViewEncapsulation.None,
     *    styles: [`
     *        tr .myClass {
     *            text-align: right
     *       }
     *    `],
     *    template: `
     *        <kendo-grid [data]="gridData" style="height: 200px">
     *          <kendo-grid-column field="ProductName" title="Product Name" [width]="200" [headerClass]="{'myClass': true}">
     *          </kendo-grid-column>
     *          <kendo-grid-column field="UnitPrice" title="Unit Price" [width]="230">
     *          </kendo-grid-column>
     *        </kendo-grid>
     *    `
     * })
     *
     * class AppComponent {
     *    public gridData: any[];
     *
     *    constructor() {
     *        this.gridData = [{
     *            "ProductID": 1,
     *            "ProductName": "Chai",
     *            "UnitPrice": 18.0000,
     *            "Discontinued": true
     *          }, {
     *            "ProductID": 2,
     *            "ProductName": "Chang",
     *            "UnitPrice": 19.0000,
     *            "Discontinued": false
     *          }];
     *    }
     * }
     *
     * ```
     */
    headerClass: string | string[] | Set<string> | {
        [key: string]: any;
    };
    /**
     * Sets the custom CSS classes to the filter row cell. Under the hood, to apply the property,
     * the `filterClass` option uses the
     * [NgClass](link:site.data.urls.angular['ngclassapi']) directive.
     *
     * @example
     * ```ts
     * import { Component, ViewEncapsulation } from '@angular/core';
     *
     * _@Component({
     *    selector: 'my-app',
     *    encapsulation: ViewEncapsulation.None,
     *    styles: [`
     *        .k-grid-header .myClass { background-color: #ffff00; }
     *    `],
     *    template: `
     *        <kendo-grid [data]="gridData" style="height: 155px" [filterable]="true">
     *          <kendo-grid-column field="ProductName" title="Product Name" [width]="200" [filterClass]="{'myClass': true}">
     *          </kendo-grid-column>
     *          <kendo-grid-column field="UnitPrice" title="Unit Price" [width]="200">
     *          </kendo-grid-column>
     *        </kendo-grid>
     *    `
     * })
     *
     * export class AppComponent {
     *    public gridData: any[];
     *
     *    constructor() {
     *        this.gridData = [{
     *            "ProductID": 1,
     *            "ProductName": "Chai",
     *            "UnitPrice": 18.0000,
     *            "Discontinued": true
     *          }, {
     *            "ProductID": 2,
     *            "ProductName": "Chang",
     *            "UnitPrice": 19.0000,
     *            "Discontinued": false
     *          }];
     *    }
     * }
     *
     * ```
     */
    filterClass: string | string[] | Set<string> | {
        [key: string]: any;
    };
    /**
     * Sets the custom CSS classes to the column footer cell. Under the hood, to apply the property,
     * the `footerClass` option uses the
     * [NgClass](link:site.data.urls.angular['ngclassapi']) directive.
     *
     * @example
     * ```ts
     * import { Component, ViewEncapsulation } from '@angular/core';
     *
     * _@Component({
     *    selector: 'my-app',
     *    encapsulation: ViewEncapsulation.None,
     *    styles: [`
     *        tr .myClass {
     *            text-align: right
     *       }
     *    `],
     *    template: `
     *        <kendo-grid [data]="gridData" style="height: 200px">
     *          <kendo-grid-column field="ProductName" title="Product Name" [width]="200" [footerClass]="{'myClass': true}">
     *              <ng-template kendoGridFooterTemplate>
     *                  footer text
     *              </ng-template>
     *          </kendo-grid-column>
     *          <kendo-grid-column field="UnitPrice" title="Unit Price" [width]="230">
     *          </kendo-grid-column>
     *        </kendo-grid>
     *    `
     * })
     *
     * class AppComponent {
     *    public gridData: any[];
     *
     *    constructor() {
     *        this.gridData = [{
     *            "ProductID": 1,
     *            "ProductName": "Chai",
     *            "UnitPrice": 18.0000,
     *            "Discontinued": true
     *          }, {
     *            "ProductID": 2,
     *            "ProductName": "Chang",
     *            "UnitPrice": 19.0000,
     *            "Discontinued": false
     *          }];
     *    }
     * }
     *
     * ```
     */
    footerClass: string | string[] | Set<string> | {
        [key: string]: any;
    };
    /**
     * @hidden
     */
    headerTemplates: QueryList<HeaderTemplateDirective>;
    /**
     * @hidden
     */
    footerTemplate: FooterTemplateDirective;
    /**
     * @hidden
     */
    columnMenuTemplates: QueryList<ColumnMenuTemplateDirective>;
    /**
     * @hidden
     */
    resizeStartWidth: number;
    /**
     * @hidden
     */
    idService: IdService;
    /**
     * @hidden
     */
    implicitWidth: number;
    /**
     * @hidden
     */
    get level(): number;
    /**
     * @hidden
     */
    get isLocked(): boolean;
    protected _width: number;
    /**
     * @hidden
     */
    get colspan(): number;
    /**
     * @hidden
     */
    rowspan(totalColumnLevels: number): number;
    /**
     * @hidden
     */
    get headerTemplateRef(): TemplateRef<any>;
    /**
     * @hidden
     */
    get footerTemplateRef(): TemplateRef<any>;
    /**
     * @hidden
     */
    get columnMenuTemplateRef(): TemplateRef<any>;
    /**
     * @hidden
     */
    get displayTitle(): string;
    /**
     * @hidden
     */
    get isVisible(): boolean;
    /**
     * @hidden
     */
    constructor(parent?: ColumnBase, idService?: IdService);
    static ɵfac: i0.ɵɵFactoryDeclaration<ColumnBase, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ColumnBase, "kendo-grid-column-base", never, { "resizable": "resizable"; "reorderable": "reorderable"; "minResizableWidth": "minResizableWidth"; "maxResizableWidth": "maxResizableWidth"; "title": "title"; "width": "width"; "autoSize": "autoSize"; "locked": "locked"; "sticky": "sticky"; "hidden": "hidden"; "media": "media"; "lockable": "lockable"; "stickable": "stickable"; "columnMenu": "columnMenu"; "includeInChooser": "includeInChooser"; "style": "style"; "headerStyle": "headerStyle"; "filterStyle": "filterStyle"; "footerStyle": "footerStyle"; "cssClass": "class"; "headerClass": "headerClass"; "filterClass": "filterClass"; "footerClass": "footerClass"; }, {}, ["footerTemplate", "headerTemplates", "columnMenuTemplates"], never>;
}

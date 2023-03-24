/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, forwardRef, SkipSelf, Host, Optional, ContentChildren } from '@angular/core';
import { ColumnBase } from './column-base';
import { columnsSpan } from './column-common';
import * as i0 from "@angular/core";
import * as i1 from "./column-base";
import * as i2 from "../common/id.service";
/**
 * @hidden
 */
export function isColumnGroupComponent(column) {
    return column.isColumnGroup;
}
/**
 * Represents the column group header of the Grid
 * ([more information and examples]({% slug multicolumnheaders_columns_grid %})).
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *     <kendo-grid [data]="gridData">
 *       <kendo-grid-column-group title="Product Info">
 *         <ng-template kendoGridHeaderTemplate let-columnIndex="columnIndex" let-column="column">
 *               Column index: {{columnIndex}} / column title: {{column.title}}
 *         </ng-template>
 *         <kendo-grid-column field="ProductID" title="Product ID" [width]="120">
 *         </kendo-grid-column>
 *         <kendo-grid-column field="ProductName" title="Product Name">
 *         </kendo-grid-column>
 *       </kendo-grid-column-group>
 *       <kendo-grid-column field="UnitPrice" title="Unit Price" [width]="230">
 *       </kendo-grid-column>
 *       <kendo-grid-column field="Discontinued" [width]="120">
 *           <ng-template kendoGridCellTemplate let-dataItem>
 *               <input type="checkbox" [checked]="dataItem.Discontinued" disabled/>
 *           </ng-template>
 *       </kendo-grid-column>
 *     </kendo-grid>
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
export class ColumnGroupComponent extends ColumnBase {
    constructor(parent, idService) {
        super(parent, idService);
        this.parent = parent;
        /**
         * @hidden
         */
        this.includeInChooser = false;
        /**
         * @hidden
         */
        this.isColumnGroup = true;
        /**
         * @hidden
         */
        this.minResizableWidth = 10;
        if (parent && parent.isSpanColumn) {
            throw new Error('ColumnGroupComponent cannot be nested inside SpanColumnComponent');
        }
    }
    /**
     * @hidden
     */
    rowspan() {
        return 1;
    }
    /**
     * @hidden
     */
    get colspan() {
        if (!this.children || this.children.length === 1) {
            return 1;
        }
        return columnsSpan(this.children
            .filter(child => child !== this && child.isVisible));
    }
    /**
     * @hidden
     */
    get leafIndex() {
        return this.children ? (this.firstChild || {}).leafIndex : -1;
    }
    get childrenArray() {
        return this.children.filter(c => c !== this);
    }
    get hasChildren() {
        return Boolean(this.firstChild);
    }
    get firstChild() {
        return this.children.find(column => column !== this);
    }
}
ColumnGroupComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ColumnGroupComponent, deps: [{ token: i1.ColumnBase, host: true, optional: true, skipSelf: true }, { token: i2.IdService, optional: true }], target: i0.ɵɵFactoryTarget.Component });
ColumnGroupComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: ColumnGroupComponent, selector: "kendo-grid-column-group", providers: [
        {
            provide: ColumnBase,
            useExisting: forwardRef(() => ColumnGroupComponent)
        }
    ], queries: [{ propertyName: "children", predicate: ColumnBase }], usesInheritance: true, ngImport: i0, template: ``, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ColumnGroupComponent, decorators: [{
            type: Component,
            args: [{
                    providers: [
                        {
                            provide: ColumnBase,
                            useExisting: forwardRef(() => ColumnGroupComponent)
                        }
                    ],
                    selector: 'kendo-grid-column-group',
                    template: ``
                }]
        }], ctorParameters: function () { return [{ type: i1.ColumnBase, decorators: [{
                    type: SkipSelf
                }, {
                    type: Host
                }, {
                    type: Optional
                }] }, { type: i2.IdService, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { children: [{
                type: ContentChildren,
                args: [ColumnBase]
            }] } });

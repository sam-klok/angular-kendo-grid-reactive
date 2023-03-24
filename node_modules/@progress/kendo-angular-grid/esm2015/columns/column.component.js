/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { forwardRef, Component, Input, ContentChild, SkipSelf, Host, Optional } from '@angular/core';
import { CellTemplateDirective } from '../rendering/cell-template.directive';
import { GroupHeaderTemplateDirective } from '../grouping/group-header-template.directive';
import { GroupHeaderColumnTemplateDirective } from '../grouping/group-header-column-template.directive';
import { EditTemplateDirective } from '../editing/edit-template.directive';
import { GroupFooterTemplateDirective } from '../grouping/group-footer-template.directive';
import { ColumnBase } from './column-base';
import { isPresent } from '../utils';
import { FilterCellTemplateDirective } from '../filtering/cell/filter-cell-template.directive';
import { FilterMenuTemplateDirective } from '../filtering/menu/filter-menu-template.directive';
import * as i0 from "@angular/core";
import * as i1 from "./column-base";
import * as i2 from "../common/id.service";
/**
 * @hidden
 */
export function isColumnComponent(column) {
    return isPresent(column.field);
}
/**
 * Represents the columns of the [Angular Data Grid]({% slug overview_grid %}).
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *        <kendo-grid [data]="gridData">
 *          <kendo-grid-column field="ProductID" title="Product ID" [width]="120">
 *          </kendo-grid-column>
 *          <kendo-grid-column field="ProductName" title="Product Name">
 *          </kendo-grid-column>
 *          <kendo-grid-column field="UnitPrice" title="Unit Price" [width]="230">
 *          </kendo-grid-column>
 *          <kendo-grid-column field="Discontinued" [width]="120">
 *              <ng-template kendoGridCellTemplate let-dataItem>
 *                  <input type="checkbox" [checked]="dataItem.Discontinued" disabled/>
 *              </ng-template>
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
export class ColumnComponent extends ColumnBase {
    constructor(parent, idService) {
        super(parent, idService);
        /**
         * Allows the column headers to be clicked and the `sortChange` event emitted.
         * You have to handle the `sortChange` event yourself and sort the data.
         */
        this.sortable = true;
        /**
         * Determines if the column can be dragged to the group panel. The default value is `true`.
         * If set to `false`, you can group the columns by the column field by using the API of the Grid.
         */
        this.groupable = true;
        /**
         * Defines the editor type ([see example]({% slug inline_editing_grid %}#toc-using-reactive-forms)).
         * Used when the column enters the edit mode. The default value is `text`.
         *
         * @example
         * ```html-no-run
         * <kendo-grid>
         *    <kendo-grid-column field="UnitPrice" editor="numeric">
         *    </kendo-grid-column>
         * </kendo-grid>
         * ```
         */
        this.editor = 'text';
        /**
         * Defines the filter type that is displayed inside the filter row. The default value is `text`.
         *
         * @example
         * ```html-no-run
         * <kendo-grid>
         *    <kendo-grid-column field="UnitPrice" filter="numeric">
         *    </kendo-grid-column>
         * </kendo-grid>
         * ```
         */
        this.filter = 'text';
        /**
         * Defines if a filter UI will be displayed for this column. The default value is `true`.
         *
         * @example
         * ```html-no-run
         * <kendo-grid>
         *    <kendo-grid-column field="UnitPrice" [filterable]="false">
         *    </kendo-grid-column>
         * </kendo-grid>
         * ```
         */
        this.filterable = true;
        /**
         * Defines whether the column is editable. The default value is `true`.
         *
         * @example
         * ```html-no-run
         * <kendo-grid>
         *    <kendo-grid-column field="UnitPrice" [editable]="false">
         *    </kendo-grid-column>
         * </kendo-grid>
         * ```
         */
        this.editable = true;
    }
    get templateRef() {
        return this.template ? this.template.templateRef : undefined;
    }
    get groupHeaderTemplateRef() {
        return this.groupHeaderTemplate ? this.groupHeaderTemplate.templateRef : undefined;
    }
    get groupHeaderColumnTemplateRef() {
        return this.groupHeaderColumnTemplate ? this.groupHeaderColumnTemplate.templateRef : undefined;
    }
    get groupFooterTemplateRef() {
        return this.groupFooterTemplate ? this.groupFooterTemplate.templateRef : undefined;
    }
    get editTemplateRef() {
        return this.editTemplate ? this.editTemplate.templateRef : undefined;
    }
    get filterCellTemplateRef() {
        return this.filterCellTemplate ? this.filterCellTemplate.templateRef : undefined;
    }
    get filterMenuTemplateRef() {
        return this.filterMenuTemplate ? this.filterMenuTemplate.templateRef : undefined;
    }
    get displayTitle() {
        return this.title === undefined ? this.field : this.title;
    }
}
ColumnComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ColumnComponent, deps: [{ token: i1.ColumnBase, host: true, optional: true, skipSelf: true }, { token: i2.IdService, optional: true }], target: i0.ɵɵFactoryTarget.Component });
ColumnComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: ColumnComponent, selector: "kendo-grid-column", inputs: { field: "field", format: "format", sortable: "sortable", groupable: "groupable", editor: "editor", filter: "filter", filterable: "filterable", editable: "editable" }, providers: [
        {
            provide: ColumnBase,
            useExisting: forwardRef(() => ColumnComponent)
        }
    ], queries: [{ propertyName: "template", first: true, predicate: CellTemplateDirective, descendants: true }, { propertyName: "groupHeaderTemplate", first: true, predicate: GroupHeaderTemplateDirective, descendants: true }, { propertyName: "groupHeaderColumnTemplate", first: true, predicate: GroupHeaderColumnTemplateDirective, descendants: true }, { propertyName: "groupFooterTemplate", first: true, predicate: GroupFooterTemplateDirective, descendants: true }, { propertyName: "editTemplate", first: true, predicate: EditTemplateDirective, descendants: true }, { propertyName: "filterCellTemplate", first: true, predicate: FilterCellTemplateDirective, descendants: true }, { propertyName: "filterMenuTemplate", first: true, predicate: FilterMenuTemplateDirective, descendants: true }], usesInheritance: true, ngImport: i0, template: ``, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ColumnComponent, decorators: [{
            type: Component,
            args: [{
                    providers: [
                        {
                            provide: ColumnBase,
                            useExisting: forwardRef(() => ColumnComponent)
                        }
                    ],
                    selector: 'kendo-grid-column',
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
                }] }]; }, propDecorators: { field: [{
                type: Input
            }], format: [{
                type: Input
            }], sortable: [{
                type: Input
            }], groupable: [{
                type: Input
            }], editor: [{
                type: Input
            }], filter: [{
                type: Input
            }], filterable: [{
                type: Input
            }], editable: [{
                type: Input
            }], template: [{
                type: ContentChild,
                args: [CellTemplateDirective, { static: false }]
            }], groupHeaderTemplate: [{
                type: ContentChild,
                args: [GroupHeaderTemplateDirective, { static: false }]
            }], groupHeaderColumnTemplate: [{
                type: ContentChild,
                args: [GroupHeaderColumnTemplateDirective, { static: false }]
            }], groupFooterTemplate: [{
                type: ContentChild,
                args: [GroupFooterTemplateDirective, { static: false }]
            }], editTemplate: [{
                type: ContentChild,
                args: [EditTemplateDirective, { static: false }]
            }], filterCellTemplate: [{
                type: ContentChild,
                args: [FilterCellTemplateDirective, { static: false }]
            }], filterMenuTemplate: [{
                type: ContentChild,
                args: [FilterMenuTemplateDirective, { static: false }]
            }] } });

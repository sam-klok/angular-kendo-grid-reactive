/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, Optional } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Represents the pager template which helps to customize the pager appearance in the Grid. To define a pager
 * template, nest an `<ng-template>` tag with the `kendoPagerTemplate` directive inside `<kendo-grid>`.
 *
 * The template context provides the following fields:
 * * `currentPage`&mdash;The index of the displayed page.
 * * `pageSize`&mdash;The value of the current `pageSize`.
 * * `skip`&mdash;The current skip value.
 * * `total`&mdash;The total number of records.
 * * `totalPages`&mdash;The total number of available pages.
 * *  Needs to be provided as an input to inner pager components used within the template when the Grid is navigable.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *      <kendo-grid
 *        [kendoGridBinding]="gridData"
 *        [pageSize]="1"
 *        [pageable]="true"
 *      >
 *       <kendo-grid-column field="ProductID" title="ID" [width]="40">
 *       </kendo-grid-column>
 *       <kendo-grid-column field="ProductName" title="Name" [width]="250">
 *       </kendo-grid-column>
 *       <kendo-grid-column field="UnitPrice" title="Price" [width]="80" format="{0:c}">
 *       </kendo-grid-column>
 *
 *       <ng-template kendoPagerTemplate let-totalPages="totalPages" let-currentPage="currentPage">
 *          <kendo-pager-prev-buttons></kendo-pager-prev-buttons>
 *          <kendo-pager-numeric-buttons [buttonCount]="10"></kendo-pager-numeric-buttons>
 *          <kendo-pager-next-buttons></kendo-pager-next-buttons>
 *          <kendo-pager-info></kendo-pager-info>
 *          Current page: {{currentPage}}
 *       </ng-template>
 *
 *    </kendo-grid>
 *     `
 * })
 *
 * class AppComponent {
 *     public gridData = [{
 *         "ProductID": 1,
 *         "ProductName": "Chai",
 *         "UnitPrice": 18.0000,
 *         "Discontinued": false
 *       }, {
 *         "ProductID": 2,
 *         "ProductName": "Chang",
 *         "UnitPrice": 19.0000,
 *         "Discontinued": true
 *       }
 *     ];
 * }
 *
 * ```
 */
export class PagerTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
PagerTemplateDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: PagerTemplateDirective, deps: [{ token: i0.TemplateRef, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
PagerTemplateDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.16", type: PagerTemplateDirective, selector: "[kendoPagerTemplate]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: PagerTemplateDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[kendoPagerTemplate]'
                }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef, decorators: [{
                    type: Optional
                }] }]; } });

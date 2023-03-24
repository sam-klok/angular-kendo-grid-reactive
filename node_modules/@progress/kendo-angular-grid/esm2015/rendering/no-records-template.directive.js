/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, Optional } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Represents the no-records template of the Grid. Provides an option to customize the
 * appearance of the item that is displayed when no data is present. To define the no-records template,
 * nest an `<ng-template>` tag with the `kendoGridNoRecordsTemplate` directive inside `<kendo-grid>`.
 *
 * > When the locked columns of the Grid are in use, the template is displayed in the non-locked part of the content.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *   selector: 'my-app',
 *   template: `
 *       <kendo-grid [data]="data">
 *         <kendo-grid-column field="ProductID"></kendo-grid-column>
 *         <kendo-grid-column field="ProductName"></kendo-grid-column>
 *         <kendo-grid-column field="UnitPrice"></kendo-grid-column>
 *         <ng-template kendoGridNoRecordsTemplate>
 *            There are not products. <a href="#" (click)="refresh()">Click here to refresh</a>.
 *         </ng-template>
 *       </kendo-grid>
 *   `
 * })
 *
 * class AppComponent {
 *     public data = [];
 *     public refresh() {
 *       this.data = [{
 *            "ProductID": 1,
 *            "ProductName": "Chai",
 *            "UnitPrice": 18.0000,
 *            "Discontinued": false,
 *            "Category": {
 *                "CategoryID": 1,
 *                "CategoryName": "Beverages",
 *                "Description": "Soft drinks, coffees, teas, beers, and ales"
 *            }
 *          }, {
 *            "ProductID": 2,
 *            "ProductName": "Chang",
 *            "UnitPrice": 19.0000,
 *            "Discontinued": false,
 *            "Category": {
 *                "CategoryID": 1,
 *                "CategoryName": "Beverages",
 *                "Description": "Soft drinks, coffees, teas, beers, and ales"
 *            }
 *          }, {
 *            "ProductID": 3,
 *            "ProductName": "Aniseed Syrup",
 *            "UnitPrice": 10.0000,
 *            "Discontinued": false,
 *            "Category": {
 *                "CategoryID": 2,
 *                "CategoryName": "Condiments",
 *                "Description": "Sweet and savory sauces, relishes, spreads, and seasonings"
 *            }
 *        }];
 *
 *     }
 * }
 *
 * ```
 */
export class NoRecordsTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NoRecordsTemplateDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: NoRecordsTemplateDirective, deps: [{ token: i0.TemplateRef, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
NoRecordsTemplateDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.16", type: NoRecordsTemplateDirective, selector: "[kendoGridNoRecordsTemplate]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: NoRecordsTemplateDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[kendoGridNoRecordsTemplate]'
                }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef, decorators: [{
                    type: Optional
                }] }]; } });

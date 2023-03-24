/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, ChangeDetectionStrategy, HostBinding, Input } from '@angular/core';
import { PagerElementComponent } from './pager-element.component';
import * as i0 from "@angular/core";
import * as i1 from "@progress/kendo-angular-l10n";
import * as i2 from "./pager-context.service";
import * as i3 from "./../navigation/navigation.service";
import * as i4 from "@progress/kendo-angular-dropdowns";
import * as i5 from "@progress/kendo-angular-label";
import * as i6 from "./pager-dropdown.directive";
import * as i7 from "../navigation/focusable.directive";
/**
 * Displays a drop-down list for the page size selection ([see example]({% slug paging_grid %}#toc-pager-templates)).
 */
export class PagerPageSizesComponent extends PagerElementComponent {
    constructor(localization, cd, pagerContext, navigationService) {
        super(localization, pagerContext, cd);
        this.pagerContext = pagerContext;
        this.navigationService = navigationService;
        this._pageSizes = [];
    }
    /**
     * The page sizes collection. Can be an Array of numbers and/or PageSizeItem objects.
     *
     * @example
     * ```ts-preview
     * _@Component({
     *    selector: 'my-app',
     *    template: `
     *        <kendo-grid [kendoGridBinding]="gridData" [height]="200"
     *           [pageable]="true"
     *            [pageSize]="pageSize">
     *            <ng-template kendoPagerTemplate let-totalPages="totalPages" let-currentPage="currentPage">
     *                <kendo-pager-page-sizes [pageSizes]="pagesizes"></kendo-pager-page-sizes>
     *            </ng-template>
     *        </kendo-grid>
     *    `
     * })
     * class AppComponent {
     *    public gridData: any[] = products;
     *    public pageSize = 2;
     *    public pagesizes = [{text: 'One', value: 1}, {text: 'Two', value: 2}, {text: 'All', value : 'all'}];
     * }
     *
     * const products = [{
     *   'ProductID' : 1,
     *   'ProductName' : "Chai",
     *   'SupplierID' : 1,
     *   'CategoryID' : 1,
     *   'QuantityPerUnit' : "10 boxes x 20 bags",
     *   'UnitPrice' : 18.0000,
     *   'UnitsInStock' : 39,
     *   'UnitsOnOrder' : 0,
     *   'ReorderLevel' : 10,
     *   'Discontinued' : false
     *
     * }, {
     *   'ProductID' : 2,
     *   'ProductName' : "Chang",
     *   'SupplierID' : 1,
     *   'CategoryID' : 1,
     *   'QuantityPerUnit' : "24 - 12 oz bottles",
     *   'UnitPrice' : 19.0000,
     *   'UnitsInStock' : 17,
     *   'UnitsOnOrder' : 40,
     *   'ReorderLevel' : 25,
     *   'Discontinued' : false
     * }, {
     *   'ProductID' : 3,
     *   'ProductName' : "Aniseed Syrup",
     *   'SupplierID' : 1,
     *   'CategoryID' : 2,
     *   'QuantityPerUnit' : "12 - 550 ml bottles",
     *   'UnitPrice' : 10.0000,
     *   'UnitsInStock' : 13,
     *   'UnitsOnOrder' : 70,
     *   'ReorderLevel' : 25,
     *   'Discontinued' : false
     * }, {
     *   'ProductID' : 4,
     *   'ProductName' : "Chef Anton\'s Cajun Seasoning",
     *   'SupplierID' : 2,
     *  'CategoryID' : 2,
     *   'QuantityPerUnit' : "48 - 6 oz jars",
     *   'UnitPrice' : 22.0000,
     *   'UnitsInStock' : 53,
     *   'UnitsOnOrder' : 0,
     *   'ReorderLevel' : 0,
     *   'Discontinued' : false
     * }, {
     *   'ProductID' : 5,
     *   'ProductName' : "Chef Anton\'s Gumbo Mix",
     *   'SupplierID' : 2,
     *   'CategoryID' : 2,
     *   'QuantityPerUnit' : "36 boxes",
     *   'UnitPrice' : 21.3500,
     *   'UnitsInStock' : 0,
     *   'UnitsOnOrder' : 0,
     *   'ReorderLevel' : 0,
     *   'Discontinued' : true
     * }, {
     *   'ProductID' : 6,
     *   'ProductName' : "Grandma\'s Boysenberry Spread",
     *   'SupplierID' : 3,
     *   'CategoryID' : 2,
     *   'QuantityPerUnit' : "12 - 8 oz jars",
     *   'UnitPrice' : 25.0000,
     *   'UnitsInStock' : 120,
     *   'UnitsOnOrder' : 0,
     *   'ReorderLevel' : 25,
     *   'Discontinued' : false
     * }];
     * ```
     */
    set pageSizes(pageSizes) {
        let normalizedItems = [];
        pageSizes.forEach(item => {
            if (typeof item === 'number') {
                normalizedItems.push({
                    text: item.toString(),
                    value: item
                });
            }
            else {
                normalizedItems.push(item);
            }
        });
        if (this.pageSize && !normalizedItems.some(item => item.value === this.pageSize)) {
            normalizedItems = [{ text: this.pageSize.toString(), value: this.pageSize }, ...normalizedItems];
        }
        this._pageSizes = normalizedItems;
    }
    get pageSizes() {
        return this._pageSizes;
    }
    /**
     * @hidden
     *
     * @readonly
     */
    get classes() {
        return true;
    }
    /**
     * @hidden
     *
     * @readonly
     */
    get showInitialPageSize() {
        return this.pageSizes
            .filter(item => {
            if (typeof item.value === 'number') {
                return item.value === Number(this.pageSize);
            }
            return this.total === Number(this.pageSize);
        })
            .length === 0;
    }
    /**
     * @hidden
     */
    pageSizeChange(value) {
        this.pageSize = typeof value === 'number' ? value : this.total;
        this.pagerContext.changePageSize(this.pageSize);
    }
    /**
     * @hidden
     */
    getValue(page) {
        return typeof page.value === 'number' ? page.value : this.total;
    }
    onChanges({ total, skip, pageSize }) {
        this.total = total;
        this.skip = skip;
        this.pageSize = typeof pageSize === 'number' ? pageSize : this.total;
        this.cd.markForCheck();
    }
}
PagerPageSizesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: PagerPageSizesComponent, deps: [{ token: i1.LocalizationService }, { token: i0.ChangeDetectorRef }, { token: i2.PagerContextService }, { token: i3.NavigationService }], target: i0.ɵɵFactoryTarget.Component });
PagerPageSizesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: PagerPageSizesComponent, selector: "kendo-pager-page-sizes", inputs: { pageSizes: "pageSizes" }, host: { properties: { "class.k-pager-sizes": "this.classes", "class.k-label": "this.classes" } }, usesInheritance: true, ngImport: i0, template: `
        <kendo-dropdownlist
            #dropdownlist
            kendoGridPagerDropDown
            [tabindex]="0"
            kendoGridFocusable
            [data]="pageSizes"
            textField="text"
            valueField="value"
            [valuePrimitive]="true"
            [value]="pageSize"
            (valueChange)="pageSizeChange($event)"></kendo-dropdownlist>
        <kendo-label [for]="dropdownlist" [text]="textFor('pagerItemsPerPage')"></kendo-label>
    `, isInline: true, components: [{ type: i4.DropDownListComponent, selector: "kendo-dropdownlist", inputs: ["iconClass", "loading", "data", "value", "textField", "valueField", "popupSettings", "listHeight", "defaultItem", "disabled", "itemDisabled", "readonly", "filterable", "virtual", "ignoreCase", "delay", "valuePrimitive", "tabindex", "tabIndex", "size", "rounded", "fillMode", "id"], outputs: ["valueChange", "filterChange", "selectionChange", "open", "opened", "close", "closed", "focus", "blur"], exportAs: ["kendoDropDownList"] }, { type: i5.LabelComponent, selector: "kendo-label", inputs: ["text", "for", "optional"], exportAs: ["kendoLabel"] }], directives: [{ type: i6.PagerDropDownListDirective, selector: "[kendoGridPagerDropDown]" }, { type: i7.FocusableDirective, selector: "[kendoGridFocusable],\n        [kendoGridEditCommand],\n        [kendoGridRemoveCommand],\n        [kendoGridSaveCommand],\n        [kendoGridCancelCommand],\n        [kendoGridSelectionCheckbox]\n    ", inputs: ["kendoGridFocusable"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: PagerPageSizesComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-pager-page-sizes',
                    template: `
        <kendo-dropdownlist
            #dropdownlist
            kendoGridPagerDropDown
            [tabindex]="0"
            kendoGridFocusable
            [data]="pageSizes"
            textField="text"
            valueField="value"
            [valuePrimitive]="true"
            [value]="pageSize"
            (valueChange)="pageSizeChange($event)"></kendo-dropdownlist>
        <kendo-label [for]="dropdownlist" [text]="textFor('pagerItemsPerPage')"></kendo-label>
    `
                }]
        }], ctorParameters: function () { return [{ type: i1.LocalizationService }, { type: i0.ChangeDetectorRef }, { type: i2.PagerContextService }, { type: i3.NavigationService }]; }, propDecorators: { pageSizes: [{
                type: Input
            }], classes: [{
                type: HostBinding,
                args: ['class.k-pager-sizes']
            }, {
                type: HostBinding,
                args: ['class.k-label']
            }] } });

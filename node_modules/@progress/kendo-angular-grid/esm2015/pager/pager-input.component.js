/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NumericTextBoxComponent } from '@progress/kendo-angular-inputs';
import { Component, ViewChild } from '@angular/core';
import { PagerElementComponent } from './pager-element.component';
import { Keys } from '@progress/kendo-angular-common';
import * as i0 from "@angular/core";
import * as i1 from "@progress/kendo-angular-l10n";
import * as i2 from "./pager-context.service";
import * as i3 from "./../navigation/navigation.service";
import * as i4 from "@progress/kendo-angular-inputs";
import * as i5 from "@angular/common";
import * as i6 from "./pager-input.directive";
import * as i7 from "../navigation/focusable.directive";
import * as i8 from "@progress/kendo-angular-common";
/**
 * Displays an input element which allows the typing and rendering of page numbers.
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
 *          <kendo-pager-input></kendo-pager-input>
 *          <kendo-pager-info></kendo-pager-info>
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
export class PagerInputComponent extends PagerElementComponent {
    constructor(localization, pagerContext, zone, navigationService, cd) {
        super(localization, pagerContext, cd);
        this.pagerContext = pagerContext;
        this.zone = zone;
        this.navigationService = navigationService;
        /**
         * @hidden
         *
         * @param {string} value
         *
         * @memberOf PagerInputComponent
         */
        this.handleKeyDown = (event) => {
            let incomingValue = this.numericInput.value || this.current;
            if (event.keyCode === Keys.Enter) {
                event.preventDefault();
                if (incomingValue !== this.current) {
                    this.zone.run(() => {
                        this.changePage(incomingValue - 1);
                    });
                }
            }
        };
        /**
         * @hidden
         *
         * @param {string} value
         *
         * @memberOf PagerInputComponent
         */
        this.handleBlur = () => {
            const inputValue = this.numericInput.value;
            if (!inputValue) {
                this.numericInput.writeValue(this.current);
                return;
            }
            if (inputValue !== this.current) {
                this.zone.run(() => {
                    this.changePage(inputValue - 1);
                });
            }
        };
    }
    /**
     * @hidden
     */
    get current() {
        return this.hasPages ? this.currentPage : 0;
    }
    get hasPages() {
        return this.totalPages !== 0;
    }
    onChanges({ total, skip, pageSize }) {
        this.total = total;
        this.skip = skip;
        this.pageSize = pageSize;
        this.cd.markForCheck();
    }
}
PagerInputComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: PagerInputComponent, deps: [{ token: i1.LocalizationService }, { token: i2.PagerContextService }, { token: i0.NgZone }, { token: i3.NavigationService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
PagerInputComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: PagerInputComponent, selector: "kendo-pager-input", viewQueries: [{ propertyName: "numericInput", first: true, predicate: NumericTextBoxComponent, descendants: true }], usesInheritance: true, ngImport: i0, template: `
     <span [ngClass]="{'k-pager-input': true, 'k-label': true}">
        {{textFor('pagerPage')}}
        <kendo-numerictextbox
            kendoGridPagerInput
            [kendoGridFocusable]="hasPages"
            [tabindex]="0"
            [spinners]="false"
            [decimals]="0"
            format="n0"
            [disabled]="!hasPages"
            [value]="current"
            [min]="hasPages ? 1 : 0"
            [max]="totalPages"
            [autoCorrect]="true"
            [title]="textFor('pagerPageNumberInputTitle')"
            [kendoEventsOutsideAngular]="{
                keydown: handleKeyDown,
                focusout: handleBlur
            }"
        >
        </kendo-numerictextbox>
        {{textFor('pagerOf')}} {{totalPages}}
     </span>
    `, isInline: true, components: [{ type: i4.NumericTextBoxComponent, selector: "kendo-numerictextbox", inputs: ["focusableId", "disabled", "readonly", "title", "autoCorrect", "format", "max", "min", "decimals", "placeholder", "step", "spinners", "rangeValidation", "tabindex", "tabIndex", "changeValueOnScroll", "selectOnFocus", "value", "maxlength", "size", "rounded", "fillMode"], outputs: ["valueChange", "focus", "blur"], exportAs: ["kendoNumericTextBox"] }], directives: [{ type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i6.PagerInputDirective, selector: "[kendoGridPagerInput]" }, { type: i7.FocusableDirective, selector: "[kendoGridFocusable],\n        [kendoGridEditCommand],\n        [kendoGridRemoveCommand],\n        [kendoGridSaveCommand],\n        [kendoGridCancelCommand],\n        [kendoGridSelectionCheckbox]\n    ", inputs: ["kendoGridFocusable"] }, { type: i8.EventsOutsideAngularDirective, selector: "[kendoEventsOutsideAngular]", inputs: ["kendoEventsOutsideAngular", "scope"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: PagerInputComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'kendo-pager-input',
                    template: `
     <span [ngClass]="{'k-pager-input': true, 'k-label': true}">
        {{textFor('pagerPage')}}
        <kendo-numerictextbox
            kendoGridPagerInput
            [kendoGridFocusable]="hasPages"
            [tabindex]="0"
            [spinners]="false"
            [decimals]="0"
            format="n0"
            [disabled]="!hasPages"
            [value]="current"
            [min]="hasPages ? 1 : 0"
            [max]="totalPages"
            [autoCorrect]="true"
            [title]="textFor('pagerPageNumberInputTitle')"
            [kendoEventsOutsideAngular]="{
                keydown: handleKeyDown,
                focusout: handleBlur
            }"
        >
        </kendo-numerictextbox>
        {{textFor('pagerOf')}} {{totalPages}}
     </span>
    `
                }]
        }], ctorParameters: function () { return [{ type: i1.LocalizationService }, { type: i2.PagerContextService }, { type: i0.NgZone }, { type: i3.NavigationService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { numericInput: [{
                type: ViewChild,
                args: [NumericTextBoxComponent, { static: false }]
            }] } });

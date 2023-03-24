/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input } from '@angular/core';
import { NumericFilterComponent } from '../numeric-filter.component';
import { replaceMessagePlaceholder } from '../../utils';
import * as i0 from "@angular/core";
import * as i1 from "../filter.service";
import * as i2 from "@progress/kendo-angular-l10n";
import * as i3 from "./filter-cell-wrapper.component";
import * as i4 from "@progress/kendo-angular-inputs";
import * as i5 from "../../navigation/focusable.directive";
import * as i6 from "../filter-input.directive";
/**
 * Represents a numeric filter cell.
 *
 * @example
 *  ```html-no-run
 *      <kendo-grid-column field="ProductName" title="Product Name">
 *          <ng-template kendoGridFilterCellTemplate let-filter let-column="column">
 *          <kendo-grid-numeric-filter-cell
 *              [column]="column"
 *              [filter]="filter">
 *          </kendo-grid-numeric-filter-cell>
 *          </ng-template>
 *      </kendo-grid-column>
 *   ```
 */
export class NumericFilterCellComponent extends NumericFilterComponent {
    constructor(filterService, localization) {
        super(filterService, localization);
        this.localization = localization;
        /**
         * Determines the delay time (in milliseconds) before the filter value is submitted.
         * A value of `0` indicates no delay. The default value is `500`.
         * @type {boolean}
         */
        this.filterDelay = 500;
        /**
         * Determines if the drop-down filter operators will be displayed.
         * The default value is `true`.
         * @type {boolean}
         */
        this.showOperators = true;
    }
    /**
     * @hidden
     */
    messageFor(key) {
        return this.localization.get(key);
    }
    /**
     * @hidden
     */
    get columnLabel() {
        const localizationMsg = this.localization.get('filterInputLabel') || '';
        const columnName = this.column.title || this.column.field;
        return replaceMessagePlaceholder(localizationMsg, 'columnName', columnName);
    }
}
NumericFilterCellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: NumericFilterCellComponent, deps: [{ token: i1.FilterService }, { token: i2.LocalizationService }], target: i0.ɵɵFactoryTarget.Component });
NumericFilterCellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: NumericFilterCellComponent, selector: "kendo-grid-numeric-filter-cell", inputs: { filterDelay: "filterDelay", showOperators: "showOperators" }, usesInheritance: true, ngImport: i0, template: `
        <kendo-grid-filter-wrapper-cell
            [column]="column"
            [filter]="filter"
            [operators]="operators"
            [defaultOperator]="operator"
            [showOperators]="showOperators"
        >
            <kendo-numerictextbox
                kendoGridFocusable
                kendoFilterInput
                [columnLabel]="columnLabel"
                [filterDelay]="filterDelay"
                [autoCorrect]="true"
                [value]="currentFilter?.value"
                [format]="format"
                [decimals]="decimals"
                [spinners]="spinners"
                [min]="min"
                [max]="max"
                [step]="step"
            >
                <kendo-numerictextbox-messages
                    [increment]="messageFor('filterNumericIncrement')"
                    [decrement]="messageFor('filterNumericDecrement')"
                >
                </kendo-numerictextbox-messages>
            </kendo-numerictextbox>
        </kendo-grid-filter-wrapper-cell>
    `, isInline: true, components: [{ type: i3.FilterCellWrapperComponent, selector: "kendo-grid-filter-wrapper-cell", inputs: ["showOperators"] }, { type: i4.NumericTextBoxComponent, selector: "kendo-numerictextbox", inputs: ["focusableId", "disabled", "readonly", "title", "autoCorrect", "format", "max", "min", "decimals", "placeholder", "step", "spinners", "rangeValidation", "tabindex", "tabIndex", "changeValueOnScroll", "selectOnFocus", "value", "maxlength", "size", "rounded", "fillMode"], outputs: ["valueChange", "focus", "blur"], exportAs: ["kendoNumericTextBox"] }, { type: i4.NumericTextBoxCustomMessagesComponent, selector: "kendo-numerictextbox-messages" }], directives: [{ type: i5.FocusableDirective, selector: "[kendoGridFocusable],\n        [kendoGridEditCommand],\n        [kendoGridRemoveCommand],\n        [kendoGridSaveCommand],\n        [kendoGridCancelCommand],\n        [kendoGridSelectionCheckbox]\n    ", inputs: ["kendoGridFocusable"] }, { type: i6.FilterInputDirective, selector: "[kendoFilterInput]", inputs: ["filterDelay", "columnLabel", "value"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: NumericFilterCellComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'kendo-grid-numeric-filter-cell',
                    template: `
        <kendo-grid-filter-wrapper-cell
            [column]="column"
            [filter]="filter"
            [operators]="operators"
            [defaultOperator]="operator"
            [showOperators]="showOperators"
        >
            <kendo-numerictextbox
                kendoGridFocusable
                kendoFilterInput
                [columnLabel]="columnLabel"
                [filterDelay]="filterDelay"
                [autoCorrect]="true"
                [value]="currentFilter?.value"
                [format]="format"
                [decimals]="decimals"
                [spinners]="spinners"
                [min]="min"
                [max]="max"
                [step]="step"
            >
                <kendo-numerictextbox-messages
                    [increment]="messageFor('filterNumericIncrement')"
                    [decrement]="messageFor('filterNumericDecrement')"
                >
                </kendo-numerictextbox-messages>
            </kendo-numerictextbox>
        </kendo-grid-filter-wrapper-cell>
    `
                }]
        }], ctorParameters: function () { return [{ type: i1.FilterService }, { type: i2.LocalizationService }]; }, propDecorators: { filterDelay: [{
                type: Input
            }], showOperators: [{
                type: Input
            }] } });

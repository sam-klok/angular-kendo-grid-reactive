/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input } from '@angular/core';
import { StringFilterComponent } from "../string-filter.component";
import { replaceMessagePlaceholder } from '../../utils';
import * as i0 from "@angular/core";
import * as i1 from "../filter.service";
import * as i2 from "@progress/kendo-angular-l10n";
import * as i3 from "./filter-cell-wrapper.component";
import * as i4 from "@progress/kendo-angular-inputs";
import * as i5 from "@angular/forms";
import * as i6 from "../../navigation/focusable.directive";
import * as i7 from "../filter-input.directive";
/**
 * Represents a string-filter cell component
 * ([see example]({% slug filter_row %}#toc-hiding-filter-operators)).
 *
 * @example
 *
 *  ```html-no-run
 *      <kendo-grid-column field="ProductName" title="Product Name">
 *          <ng-template kendoGridFilterCellTemplate let-filter let-column="column">
 *          <kendo-grid-string-filter-cell
 *              [showOperators]="false"
 *              [column]="column"
 *              [filter]="filter">
 *          </kendo-grid-string-filter-cell>
 *          </ng-template>
 *      </kendo-grid-column>
 *   ```
 */
export class StringFilterCellComponent extends StringFilterComponent {
    constructor(filterService, localization) {
        super(filterService, localization);
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
    get columnLabel() {
        const localizationMsg = this.localization.get('filterInputLabel') || '';
        const columnName = this.column.title || this.column.field;
        return replaceMessagePlaceholder(localizationMsg, 'columnName', columnName);
    }
}
StringFilterCellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: StringFilterCellComponent, deps: [{ token: i1.FilterService }, { token: i2.LocalizationService }], target: i0.ɵɵFactoryTarget.Component });
StringFilterCellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: StringFilterCellComponent, selector: "kendo-grid-string-filter-cell", inputs: { filterDelay: "filterDelay", showOperators: "showOperators" }, usesInheritance: true, ngImport: i0, template: `
        <kendo-grid-filter-wrapper-cell
            [column]="column"
            [filter]="filter"
            [operators]="operators"
            [defaultOperator]="operator"
            [showOperators]="showOperators">
            <input
                kendoTextBox
                kendoGridFocusable
                kendoFilterInput
                [columnLabel]="columnLabel"
                [filterDelay]="filterDelay"
                [ngModel]="currentFilter?.value" />
        </kendo-grid-filter-wrapper-cell>
    `, isInline: true, components: [{ type: i3.FilterCellWrapperComponent, selector: "kendo-grid-filter-wrapper-cell", inputs: ["showOperators"] }], directives: [{ type: i4.TextBoxDirective, selector: "input[kendoTextBox]", inputs: ["value"] }, { type: i5.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i6.FocusableDirective, selector: "[kendoGridFocusable],\n        [kendoGridEditCommand],\n        [kendoGridRemoveCommand],\n        [kendoGridSaveCommand],\n        [kendoGridCancelCommand],\n        [kendoGridSelectionCheckbox]\n    ", inputs: ["kendoGridFocusable"] }, { type: i7.FilterInputDirective, selector: "[kendoFilterInput]", inputs: ["filterDelay", "columnLabel", "value"] }, { type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: StringFilterCellComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'kendo-grid-string-filter-cell',
                    template: `
        <kendo-grid-filter-wrapper-cell
            [column]="column"
            [filter]="filter"
            [operators]="operators"
            [defaultOperator]="operator"
            [showOperators]="showOperators">
            <input
                kendoTextBox
                kendoGridFocusable
                kendoFilterInput
                [columnLabel]="columnLabel"
                [filterDelay]="filterDelay"
                [ngModel]="currentFilter?.value" />
        </kendo-grid-filter-wrapper-cell>
    `
                }]
        }], ctorParameters: function () { return [{ type: i1.FilterService }, { type: i2.LocalizationService }]; }, propDecorators: { filterDelay: [{
                type: Input
            }], showOperators: [{
                type: Input
            }] } });

/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
// eslint-disable no-access-missing-member
import { Component, Input } from '@angular/core';
import { BaseFilterCellComponent, localizeOperators } from '../base-filter-cell.component';
import * as i0 from "@angular/core";
import * as i1 from "../filter.service";
import * as i2 from "../../columns/column.component";
import * as i3 from "@progress/kendo-angular-l10n";
import * as i4 from "./filter-cell-wrapper.component";
import * as i5 from "@progress/kendo-angular-dropdowns";
import * as i6 from "../filter-input.directive";
const stringOperators = localizeOperators({
    "filterContainsOperator": "contains",
    "filterNotContainsOperator": "doesnotcontain",
    "filterEqOperator": "eq",
    "filterNotEqOperator": "neq",
    "filterStartsWithOperator": "startswith",
    "filterEndsWithOperator": "endswith",
    "filterIsNullOperator": "isnull",
    "filterIsNotNullOperator": "isnotnull",
    "filterIsEmptyOperator": "isempty",
    "filterIsNotEmptyOperator": "isnotempty"
});
/**
 * @hidden
 */
export class AutoCompleteFilterCellComponent extends BaseFilterCellComponent {
    constructor(filterService, column, localization) {
        super(filterService);
        this.localization = localization;
        this.showOperators = true;
        this.defaultOperators = stringOperators(this.localization);
        this.column = column;
    }
    set valueField(value) {
        this._valueField = value;
    }
    get valueField() {
        return this._valueField ? this._valueField : this.column.field;
    }
    get currentFilter() {
        return this.filterByField(this.column.field);
    }
    get currentOperator() {
        return this.currentFilter ? this.currentFilter.operator : "contains";
    }
}
AutoCompleteFilterCellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: AutoCompleteFilterCellComponent, deps: [{ token: i1.FilterService }, { token: i2.ColumnComponent }, { token: i3.LocalizationService }], target: i0.ɵɵFactoryTarget.Component });
AutoCompleteFilterCellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: AutoCompleteFilterCellComponent, selector: "kendo-grid-autocomplete-filter-cell", inputs: { showOperators: "showOperators", column: "column", filter: "filter", data: "data", valueField: "valueField" }, usesInheritance: true, ngImport: i0, template: `
        <kendo-grid-filter-wrapper-cell
            [column]="column"
            [filter]="filter"
            [operators]="operators"
            [showOperators]="showOperators">
            <kendo-autocomplete
                kendoFilterInput
                [data]="data"
                [valueField]="valueField"
                [value]="currentFilter?.value">
            </kendo-autocomplete>
        </kendo-grid-filter-wrapper-cell>
    `, isInline: true, components: [{ type: i4.FilterCellWrapperComponent, selector: "kendo-grid-filter-wrapper-cell", inputs: ["showOperators"] }, { type: i5.AutoCompleteComponent, selector: "kendo-autocomplete", inputs: ["highlightFirst", "focusableId", "data", "value", "valueField", "placeholder", "popupSettings", "listHeight", "loading", "clearButton", "suggest", "disabled", "itemDisabled", "readonly", "tabindex", "tabIndex", "filterable", "virtual", "size", "rounded", "fillMode"], outputs: ["valueChange", "filterChange", "open", "opened", "close", "closed", "focus", "blur"], exportAs: ["kendoAutoComplete"] }], directives: [{ type: i6.FilterInputDirective, selector: "[kendoFilterInput]", inputs: ["filterDelay", "columnLabel", "value"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: AutoCompleteFilterCellComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'kendo-grid-autocomplete-filter-cell',
                    template: `
        <kendo-grid-filter-wrapper-cell
            [column]="column"
            [filter]="filter"
            [operators]="operators"
            [showOperators]="showOperators">
            <kendo-autocomplete
                kendoFilterInput
                [data]="data"
                [valueField]="valueField"
                [value]="currentFilter?.value">
            </kendo-autocomplete>
        </kendo-grid-filter-wrapper-cell>
    `
                }]
        }], ctorParameters: function () { return [{ type: i1.FilterService }, { type: i2.ColumnComponent }, { type: i3.LocalizationService }]; }, propDecorators: { showOperators: [{
                type: Input
            }], column: [{
                type: Input
            }], filter: [{
                type: Input
            }], data: [{
                type: Input
            }], valueField: [{
                type: Input
            }] } });

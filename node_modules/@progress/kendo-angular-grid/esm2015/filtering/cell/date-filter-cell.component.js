/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input } from '@angular/core';
import { DateFilterComponent } from '../date-filter.component';
import { replaceMessagePlaceholder } from '../../utils';
import * as i0 from "@angular/core";
import * as i1 from "../filter.service";
import * as i2 from "@progress/kendo-angular-l10n";
import * as i3 from "./filter-cell-wrapper.component";
import * as i4 from "@progress/kendo-angular-dateinputs";
import * as i5 from "../filter-input.directive";
import * as i6 from "../../navigation/focusable.directive";
/**
 * Represents a date-filter cell component.
 *
 * @example
 *
 *  ```html-no-run
 *      <kendo-grid-column field="OrderDate" title="Order Date">
 *          <ng-template kendoGridFilterCellTemplate let-filter let-column="column">
 *          <kendo-grid-date-filter-cell
 *              [showOperators]="false"
 *              [column]="column"
 *              [filter]="filter">
 *          </kendo-grid-date-filter-cell>
 *          </ng-template>
 *      </kendo-grid-column>
 *   ```
 */
export class DateFilterCellComponent extends DateFilterComponent {
    constructor(filterService, localization) {
        super(filterService, localization);
        this.localization = localization;
        /**
         * Determines if the drop-down filter operators will be displayed. The default value is `true`.
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
DateFilterCellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: DateFilterCellComponent, deps: [{ token: i1.FilterService }, { token: i2.LocalizationService }], target: i0.ɵɵFactoryTarget.Component });
DateFilterCellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: DateFilterCellComponent, selector: "kendo-grid-date-filter-cell", inputs: { showOperators: "showOperators" }, usesInheritance: true, ngImport: i0, template: `
        <kendo-grid-filter-wrapper-cell
            [column]="column"
            [filter]="filter"
            [operators]="operators"
            [defaultOperator]="operator"
            [showOperators]="showOperators"
        >
            <kendo-datepicker
                kendoFilterInput
                kendoGridFocusable
                [columnLabel]="columnLabel"
                [value]="currentFilter?.value"
                [format]="format"
                [formatPlaceholder]="formatPlaceholder"
                [placeholder]="placeholder"
                [activeView]="activeView"
                [bottomView]="bottomView"
                [topView]="topView"
                [min]="min"
                [max]="max"
                [weekNumber]="weekNumber"
            >
                <kendo-datepicker-messages
                    [toggle]="messageFor('filterDateToggle')"
                    [today]="messageFor('filterDateToday')"
                >
                </kendo-datepicker-messages>
            </kendo-datepicker>
        </kendo-grid-filter-wrapper-cell>
    `, isInline: true, components: [{ type: i3.FilterCellWrapperComponent, selector: "kendo-grid-filter-wrapper-cell", inputs: ["showOperators"] }, { type: i4.DatePickerComponent, selector: "kendo-datepicker", inputs: ["cellTemplate", "monthCellTemplate", "yearCellTemplate", "decadeCellTemplate", "centuryCellTemplate", "weekNumberTemplate", "headerTitleTemplate", "navigationItemTemplate", "activeView", "bottomView", "topView", "calendarType", "animateCalendarNavigation", "disabled", "readonly", "readOnlyInput", "popupSettings", "navigation", "min", "max", "incompleteDateValidation", "focusedDate", "value", "format", "twoDigitYearMax", "formatPlaceholder", "placeholder", "tabindex", "tabIndex", "disabledDates", "title", "rangeValidation", "disabledDatesValidation", "weekNumber", "size", "rounded", "fillMode"], outputs: ["valueChange", "focus", "blur", "open", "close"], exportAs: ["kendo-datepicker"] }, { type: i4.DatePickerCustomMessagesComponent, selector: "kendo-datepicker-messages" }], directives: [{ type: i5.FilterInputDirective, selector: "[kendoFilterInput]", inputs: ["filterDelay", "columnLabel", "value"] }, { type: i6.FocusableDirective, selector: "[kendoGridFocusable],\n        [kendoGridEditCommand],\n        [kendoGridRemoveCommand],\n        [kendoGridSaveCommand],\n        [kendoGridCancelCommand],\n        [kendoGridSelectionCheckbox]\n    ", inputs: ["kendoGridFocusable"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: DateFilterCellComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'kendo-grid-date-filter-cell',
                    template: `
        <kendo-grid-filter-wrapper-cell
            [column]="column"
            [filter]="filter"
            [operators]="operators"
            [defaultOperator]="operator"
            [showOperators]="showOperators"
        >
            <kendo-datepicker
                kendoFilterInput
                kendoGridFocusable
                [columnLabel]="columnLabel"
                [value]="currentFilter?.value"
                [format]="format"
                [formatPlaceholder]="formatPlaceholder"
                [placeholder]="placeholder"
                [activeView]="activeView"
                [bottomView]="bottomView"
                [topView]="topView"
                [min]="min"
                [max]="max"
                [weekNumber]="weekNumber"
            >
                <kendo-datepicker-messages
                    [toggle]="messageFor('filterDateToggle')"
                    [today]="messageFor('filterDateToday')"
                >
                </kendo-datepicker-messages>
            </kendo-datepicker>
        </kendo-grid-filter-wrapper-cell>
    `
                }]
        }], ctorParameters: function () { return [{ type: i1.FilterService }, { type: i2.LocalizationService }]; }, propDecorators: { showOperators: [{
                type: Input
            }] } });

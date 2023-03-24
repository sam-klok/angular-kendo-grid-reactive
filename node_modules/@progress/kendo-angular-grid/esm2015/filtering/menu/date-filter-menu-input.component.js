/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input } from '@angular/core';
import { filter } from 'rxjs/operators';
import { replaceMessagePlaceholder } from '../../utils';
import * as i0 from "@angular/core";
import * as i1 from "../../common/single-popup.service";
import * as i2 from "@progress/kendo-angular-l10n";
import * as i3 from "./filter-menu-input-wrapper.component";
import * as i4 from "@progress/kendo-angular-dateinputs";
import * as i5 from "../filter-input.directive";
/**
 * @hidden
 */
export class DateFilterMenuInputComponent {
    constructor(popupService, localizationService) {
        this.popupService = popupService;
        this.localizationService = localizationService;
        this.operators = [];
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    open(picker) {
        this.subscription = this.popupService.onClose
            .pipe(filter(() => picker.isActive))
            .subscribe(e => e.preventDefault());
    }
    messageFor(key) {
        return this.localizationService.get(key);
    }
    get columnLabel() {
        const localizationMsg = this.localizationService.get('filterInputLabel') || '';
        const columnName = this.column ? this.column.title || this.column.field : '';
        return replaceMessagePlaceholder(localizationMsg, 'columnName', columnName);
    }
}
DateFilterMenuInputComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: DateFilterMenuInputComponent, deps: [{ token: i1.SinglePopupService }, { token: i2.LocalizationService }], target: i0.ɵɵFactoryTarget.Component });
DateFilterMenuInputComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: DateFilterMenuInputComponent, selector: "kendo-grid-date-filter-menu-input", inputs: { operators: "operators", column: "column", filter: "filter", operator: "operator", currentFilter: "currentFilter", filterService: "filterService", menuTabbingService: "menuTabbingService", format: "format", formatPlaceholder: "formatPlaceholder", placeholder: "placeholder", min: "min", max: "max", activeView: "activeView", bottomView: "bottomView", topView: "topView", weekNumber: "weekNumber", isFirstDropDown: "isFirstDropDown" }, ngImport: i0, template: `
        <kendo-grid-filter-menu-input-wrapper
            [column]="column"
            [filter]="filter"
            [operators]="operators"
            [defaultOperator]="operator"
            [currentFilter]="currentFilter"
            [filterService]="filterService"
            [isFirstDropDown]="isFirstDropDown"
            [menuTabbingService]="menuTabbingService"
        >
            <kendo-datepicker
                #picker
                kendoFilterInput
                [columnLabel]="columnLabel"
                [filterDelay]="0"
                (open)="open(picker)"
                [value]="currentFilter?.value"
                [placeholder]="placeholder"
                [formatPlaceholder]="formatPlaceholder"
                [format]="format"
                [min]="min"
                [max]="max"
                [activeView]="activeView"
                [bottomView]="bottomView"
                [topView]="topView"
                [weekNumber]="weekNumber"
            >
                <kendo-datepicker-messages
                    [toggle]="messageFor('filterDateToggle')"
                    [today]="messageFor('filterDateToday')"
                >
                </kendo-datepicker-messages>
            </kendo-datepicker>
        </kendo-grid-filter-menu-input-wrapper>
    `, isInline: true, components: [{ type: i3.FilterMenuInputWrapperComponent, selector: "kendo-grid-filter-menu-input-wrapper", inputs: ["filterService", "isFirstDropDown", "menuTabbingService", "currentFilter"] }, { type: i4.DatePickerComponent, selector: "kendo-datepicker", inputs: ["cellTemplate", "monthCellTemplate", "yearCellTemplate", "decadeCellTemplate", "centuryCellTemplate", "weekNumberTemplate", "headerTitleTemplate", "navigationItemTemplate", "activeView", "bottomView", "topView", "calendarType", "animateCalendarNavigation", "disabled", "readonly", "readOnlyInput", "popupSettings", "navigation", "min", "max", "incompleteDateValidation", "focusedDate", "value", "format", "twoDigitYearMax", "formatPlaceholder", "placeholder", "tabindex", "tabIndex", "disabledDates", "title", "rangeValidation", "disabledDatesValidation", "weekNumber", "size", "rounded", "fillMode"], outputs: ["valueChange", "focus", "blur", "open", "close"], exportAs: ["kendo-datepicker"] }, { type: i4.DatePickerCustomMessagesComponent, selector: "kendo-datepicker-messages" }], directives: [{ type: i5.FilterInputDirective, selector: "[kendoFilterInput]", inputs: ["filterDelay", "columnLabel", "value"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: DateFilterMenuInputComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'kendo-grid-date-filter-menu-input',
                    template: `
        <kendo-grid-filter-menu-input-wrapper
            [column]="column"
            [filter]="filter"
            [operators]="operators"
            [defaultOperator]="operator"
            [currentFilter]="currentFilter"
            [filterService]="filterService"
            [isFirstDropDown]="isFirstDropDown"
            [menuTabbingService]="menuTabbingService"
        >
            <kendo-datepicker
                #picker
                kendoFilterInput
                [columnLabel]="columnLabel"
                [filterDelay]="0"
                (open)="open(picker)"
                [value]="currentFilter?.value"
                [placeholder]="placeholder"
                [formatPlaceholder]="formatPlaceholder"
                [format]="format"
                [min]="min"
                [max]="max"
                [activeView]="activeView"
                [bottomView]="bottomView"
                [topView]="topView"
                [weekNumber]="weekNumber"
            >
                <kendo-datepicker-messages
                    [toggle]="messageFor('filterDateToggle')"
                    [today]="messageFor('filterDateToday')"
                >
                </kendo-datepicker-messages>
            </kendo-datepicker>
        </kendo-grid-filter-menu-input-wrapper>
    `
                }]
        }], ctorParameters: function () { return [{ type: i1.SinglePopupService }, { type: i2.LocalizationService }]; }, propDecorators: { operators: [{
                type: Input
            }], column: [{
                type: Input
            }], filter: [{
                type: Input
            }], operator: [{
                type: Input
            }], currentFilter: [{
                type: Input
            }], filterService: [{
                type: Input
            }], menuTabbingService: [{
                type: Input
            }], format: [{
                type: Input
            }], formatPlaceholder: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }], activeView: [{
                type: Input
            }], bottomView: [{
                type: Input
            }], topView: [{
                type: Input
            }], weekNumber: [{
                type: Input
            }], isFirstDropDown: [{
                type: Input
            }] } });

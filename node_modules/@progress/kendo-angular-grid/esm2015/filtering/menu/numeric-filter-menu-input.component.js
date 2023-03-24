/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input } from '@angular/core';
import { replaceMessagePlaceholder } from '../../utils';
import * as i0 from "@angular/core";
import * as i1 from "@progress/kendo-angular-l10n";
import * as i2 from "./filter-menu-input-wrapper.component";
import * as i3 from "@progress/kendo-angular-inputs";
import * as i4 from "../filter-input.directive";
/**
 * @hidden
 */
export class NumericFilterMenuInputComponent {
    constructor(localization) {
        this.localization = localization;
        this.operators = [];
        /**
         * Specifies the value which is used to increment or decrement the component value.
         * @type {numeric}
         */
        this.step = 1;
        /**
         * Specifies whether the **Up** and **Down** spin buttons will be rendered.
         * @type {boolean}
         */
        this.spinners = true;
    }
    messageFor(key) {
        return this.localization.get(key);
    }
    /**
     * @hidden
     */
    get columnLabel() {
        const localizationMsg = this.localization.get('filterInputLabel') || '';
        const columnName = this.column ? this.column.title || this.column.field : '';
        return replaceMessagePlaceholder(localizationMsg, 'columnName', columnName);
    }
}
NumericFilterMenuInputComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: NumericFilterMenuInputComponent, deps: [{ token: i1.LocalizationService }], target: i0.ɵɵFactoryTarget.Component });
NumericFilterMenuInputComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: NumericFilterMenuInputComponent, selector: "kendo-grid-numeric-filter-menu-input", inputs: { operators: "operators", column: "column", filter: "filter", operator: "operator", currentFilter: "currentFilter", filterService: "filterService", filterDelay: "filterDelay", isFirstDropDown: "isFirstDropDown", menuTabbingService: "menuTabbingService", step: "step", min: "min", max: "max", spinners: "spinners", decimals: "decimals", format: "format" }, ngImport: i0, template: `
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
            <kendo-numerictextbox
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
        </kendo-grid-filter-menu-input-wrapper>
    `, isInline: true, components: [{ type: i2.FilterMenuInputWrapperComponent, selector: "kendo-grid-filter-menu-input-wrapper", inputs: ["filterService", "isFirstDropDown", "menuTabbingService", "currentFilter"] }, { type: i3.NumericTextBoxComponent, selector: "kendo-numerictextbox", inputs: ["focusableId", "disabled", "readonly", "title", "autoCorrect", "format", "max", "min", "decimals", "placeholder", "step", "spinners", "rangeValidation", "tabindex", "tabIndex", "changeValueOnScroll", "selectOnFocus", "value", "maxlength", "size", "rounded", "fillMode"], outputs: ["valueChange", "focus", "blur"], exportAs: ["kendoNumericTextBox"] }, { type: i3.NumericTextBoxCustomMessagesComponent, selector: "kendo-numerictextbox-messages" }], directives: [{ type: i4.FilterInputDirective, selector: "[kendoFilterInput]", inputs: ["filterDelay", "columnLabel", "value"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: NumericFilterMenuInputComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'kendo-grid-numeric-filter-menu-input',
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
            <kendo-numerictextbox
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
        </kendo-grid-filter-menu-input-wrapper>
    `
                }]
        }], ctorParameters: function () { return [{ type: i1.LocalizationService }]; }, propDecorators: { operators: [{
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
            }], filterDelay: [{
                type: Input
            }], isFirstDropDown: [{
                type: Input
            }], menuTabbingService: [{
                type: Input
            }], step: [{
                type: Input
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }], spinners: [{
                type: Input
            }], decimals: [{
                type: Input
            }], format: [{
                type: Input
            }] } });

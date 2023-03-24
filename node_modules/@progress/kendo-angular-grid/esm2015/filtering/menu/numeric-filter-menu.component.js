/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, HostBinding } from '@angular/core';
import { NumericFilterComponent } from '../numeric-filter.component';
import { setFilter, logicOperators } from '../base-filter-cell.component';
import { replaceMessagePlaceholder } from '../../utils';
import * as i0 from "@angular/core";
import * as i1 from "@progress/kendo-angular-l10n";
import * as i2 from "./numeric-filter-menu-input.component";
import * as i3 from "@progress/kendo-angular-dropdowns";
import * as i4 from "@angular/common";
import * as i5 from "./filter-menu-dropdownlist.directive";
/**
 * Represents a numeric-filter menu component.
 *
 * @example
 *  ```html-no-run
 *      <kendo-grid-column field="UnitPrice" title="Unit Price">
 *          <ng-template kendoGridFilterMenuTemplate let-filter let-column="column" let-filterService="filterService">
 *          <kendo-grid-numeric-filter-menu
 *              [column]="column"
 *              [filter]="filter"
 *              [filterService]="filterService"
 *              >
 *          </kendo-grid-numeric-filter-menu>
 *          </ng-template>
 *      </kendo-grid-column>
 *   ```
 */
export class NumericFilterMenuComponent extends NumericFilterComponent {
    constructor(localization) {
        super(null, localization);
        this.logicOperators = logicOperators(this.localization);
        /**
         * The current menu filter.
         * @type {CompositeFilterDescriptor}
         */
        this.filter = { filters: [], logic: "and" };
        /**
         * Determines if the inputs of second criteria will displayed.
         */
        this.extra = true;
        /**
         * Determines the delay (in milliseconds) before creating a filter descriptor based on the value. A value of 0 indicates no delay. The default value is 500.
         *
         * @default 500
         */
        this.filterDelay = 500;
    }
    /**
     * @hidden
     */
    get hostClasses() {
        return false;
    }
    get firstFilter() {
        return setFilter(0, this.filter, (this.column || {}).field, this.operator);
    }
    get secondFilter() {
        return setFilter(1, this.filter, (this.column || {}).field, this.operator);
    }
    logicChange(value) {
        this.filter.logic = value;
    }
    get filterMenuDropDownLabel() {
        const localizationMsg = this.localization.get('filterMenuLogicDropDownLabel') || '';
        const columnName = this.column ? this.column.title || this.column.field : '';
        return replaceMessagePlaceholder(localizationMsg, 'columnName', columnName);
    }
    localizationChange() {
        this.logicOperators = logicOperators(this.localization);
        super.localizationChange();
    }
}
NumericFilterMenuComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: NumericFilterMenuComponent, deps: [{ token: i1.LocalizationService }], target: i0.ɵɵFactoryTarget.Component });
NumericFilterMenuComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: NumericFilterMenuComponent, selector: "kendo-grid-numeric-filter-menu", inputs: { column: "column", filter: "filter", extra: "extra", filterService: "filterService", filterDelay: "filterDelay", menuTabbingService: "menuTabbingService" }, host: { properties: { "class.k-filtercell": "this.hostClasses" } }, usesInheritance: true, ngImport: i0, template: `
        <kendo-grid-numeric-filter-menu-input
            [currentFilter]="firstFilter"
            [operators]="operators"
            [filterService]="filterService"
            [column]="column"
            [filter]="filter"
            [filterDelay]="filterDelay"
            [format]="format"
            [decimals]="decimals"
            [spinners]="spinners"
            [min]="min"
            [max]="max"
            [step]="step"
            [menuTabbingService]="menuTabbingService"
            [isFirstDropDown]="true"
            >
        </kendo-grid-numeric-filter-menu-input>
        <kendo-dropdownlist
            *ngIf="extra"
            kendoFilterMenuDropDown
            [filterMenuDropDownLabel]="filterMenuDropDownLabel"
            class="k-filter-and"
            [data]="logicOperators"
            [valuePrimitive]="true"
            (valueChange)="logicChange($event)"
            [value]="filter?.logic"
            textField="text"
            valueField="value">
        </kendo-dropdownlist>
        <kendo-grid-numeric-filter-menu-input
            *ngIf="extra"
            [operators]="operators"
            [currentFilter]="secondFilter"
            [filterService]="filterService"
            [column]="column"
            [filter]="filter"
            [format]="format"
            [decimals]="decimals"
            [spinners]="spinners"
            [min]="min"
            [max]="max"
            [step]="step"
            [menuTabbingService]="menuTabbingService"
            >
        </kendo-grid-numeric-filter-menu-input>
    `, isInline: true, components: [{ type: i2.NumericFilterMenuInputComponent, selector: "kendo-grid-numeric-filter-menu-input", inputs: ["operators", "column", "filter", "operator", "currentFilter", "filterService", "filterDelay", "isFirstDropDown", "menuTabbingService", "step", "min", "max", "spinners", "decimals", "format"] }, { type: i3.DropDownListComponent, selector: "kendo-dropdownlist", inputs: ["iconClass", "loading", "data", "value", "textField", "valueField", "popupSettings", "listHeight", "defaultItem", "disabled", "itemDisabled", "readonly", "filterable", "virtual", "ignoreCase", "delay", "valuePrimitive", "tabindex", "tabIndex", "size", "rounded", "fillMode", "id"], outputs: ["valueChange", "filterChange", "selectionChange", "open", "opened", "close", "closed", "focus", "blur"], exportAs: ["kendoDropDownList"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.FilterMenuDropDownListDirective, selector: "[kendoFilterMenuDropDown]", inputs: ["filterMenuDropDownLabel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: NumericFilterMenuComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'kendo-grid-numeric-filter-menu',
                    template: `
        <kendo-grid-numeric-filter-menu-input
            [currentFilter]="firstFilter"
            [operators]="operators"
            [filterService]="filterService"
            [column]="column"
            [filter]="filter"
            [filterDelay]="filterDelay"
            [format]="format"
            [decimals]="decimals"
            [spinners]="spinners"
            [min]="min"
            [max]="max"
            [step]="step"
            [menuTabbingService]="menuTabbingService"
            [isFirstDropDown]="true"
            >
        </kendo-grid-numeric-filter-menu-input>
        <kendo-dropdownlist
            *ngIf="extra"
            kendoFilterMenuDropDown
            [filterMenuDropDownLabel]="filterMenuDropDownLabel"
            class="k-filter-and"
            [data]="logicOperators"
            [valuePrimitive]="true"
            (valueChange)="logicChange($event)"
            [value]="filter?.logic"
            textField="text"
            valueField="value">
        </kendo-dropdownlist>
        <kendo-grid-numeric-filter-menu-input
            *ngIf="extra"
            [operators]="operators"
            [currentFilter]="secondFilter"
            [filterService]="filterService"
            [column]="column"
            [filter]="filter"
            [format]="format"
            [decimals]="decimals"
            [spinners]="spinners"
            [min]="min"
            [max]="max"
            [step]="step"
            [menuTabbingService]="menuTabbingService"
            >
        </kendo-grid-numeric-filter-menu-input>
    `
                }]
        }], ctorParameters: function () { return [{ type: i1.LocalizationService }]; }, propDecorators: { hostClasses: [{
                type: HostBinding,
                args: ['class.k-filtercell']
            }], column: [{
                type: Input
            }], filter: [{
                type: Input
            }], extra: [{
                type: Input
            }], filterService: [{
                type: Input
            }], filterDelay: [{
                type: Input
            }], menuTabbingService: [{
                type: Input
            }] } });

/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, ViewChild } from '@angular/core';
import { DropDownListComponent } from '@progress/kendo-angular-dropdowns';
import { FilterInputWrapperComponent } from "../filter-input-wrapper.component";
import { replaceMessagePlaceholder } from '../../utils';
import * as i0 from "@angular/core";
import * as i1 from "@progress/kendo-angular-l10n";
import * as i2 from "@progress/kendo-angular-dropdowns";
import * as i3 from "./filter-menu-dropdownlist.directive";
/**
 * @hidden
 */
export class FilterMenuInputWrapperComponent extends FilterInputWrapperComponent {
    constructor(localizationService) {
        super(null);
        this.localizationService = localizationService;
    }
    /**
     * @hidden
     */
    get hostClasses() {
        return false;
    }
    ngAfterViewInit() {
        if (this.isFirstDropDown && this.filterService && this.filterService.menuTabbingService) {
            this.filterService.menuTabbingService.firstFocusable = this.firstOperatorDropDown;
            this.firstOperatorDropDown.focus();
        }
    }
    operatorChange(dataItem) {
        this.currentOperator = dataItem;
    }
    filterChange(filter) {
        this.applyFilter(filter);
    }
    /**
     * The current filter for the associated column field.
     * @readonly
     * @type {FilterDescriptor}
     */
    get currentFilter() {
        return this._currentFilter;
    }
    /**
     * The current filter for the associated column field.
     * @readonly
     * @type {FilterDescriptor}
     */
    set currentFilter(value) {
        this._currentFilter = value;
    }
    updateFilter(filter) {
        Object.assign(this.currentFilter, filter);
        return this.filter;
    }
    onChange(value) {
        this.filterChange(this.updateFilter({
            field: this.column.field,
            operator: this.currentOperator,
            value: value
        }));
    }
    onShiftTab(e) {
        e.stopImmediatePropagation();
        if ((!this.menuTabbingService || !this.menuTabbingService.isColumnMenu) && this.isFirstDropDown && this.filterService.menuTabbingService.lastFocusable) {
            e.preventDefault();
            this.filterService.menuTabbingService.lastFocusable.focus();
        }
    }
    get filterMenuDropDownLabel() {
        const localizationMsg = this.localizationService.get('filterMenuOperatorsDropDownLabel') || '';
        const columnName = this.column ? this.column.title || this.column.field : '';
        return replaceMessagePlaceholder(localizationMsg, 'columnName', columnName);
    }
}
FilterMenuInputWrapperComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: FilterMenuInputWrapperComponent, deps: [{ token: i1.LocalizationService }], target: i0.ɵɵFactoryTarget.Component });
FilterMenuInputWrapperComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: FilterMenuInputWrapperComponent, selector: "kendo-grid-filter-menu-input-wrapper", inputs: { filterService: "filterService", isFirstDropDown: "isFirstDropDown", menuTabbingService: "menuTabbingService", currentFilter: "currentFilter" }, viewQueries: [{ propertyName: "firstOperatorDropDown", first: true, predicate: DropDownListComponent, descendants: true }], usesInheritance: true, ngImport: i0, template: `
        <kendo-dropdownlist
            kendoFilterMenuDropDown
            [filterMenuDropDownLabel]="filterMenuDropDownLabel"
            [data]="operators"
            (valueChange)="operatorChange($event)"
            [value]="currentOperator"
            [valuePrimitive]="true"
            textField="text"
            valueField="value"
            (keydown.shift.tab)="onShiftTab($event)">
        </kendo-dropdownlist>
        <ng-content></ng-content>
    `, isInline: true, components: [{ type: i2.DropDownListComponent, selector: "kendo-dropdownlist", inputs: ["iconClass", "loading", "data", "value", "textField", "valueField", "popupSettings", "listHeight", "defaultItem", "disabled", "itemDisabled", "readonly", "filterable", "virtual", "ignoreCase", "delay", "valuePrimitive", "tabindex", "tabIndex", "size", "rounded", "fillMode", "id"], outputs: ["valueChange", "filterChange", "selectionChange", "open", "opened", "close", "closed", "focus", "blur"], exportAs: ["kendoDropDownList"] }], directives: [{ type: i3.FilterMenuDropDownListDirective, selector: "[kendoFilterMenuDropDown]", inputs: ["filterMenuDropDownLabel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: FilterMenuInputWrapperComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'kendo-grid-filter-menu-input-wrapper',
                    template: `
        <kendo-dropdownlist
            kendoFilterMenuDropDown
            [filterMenuDropDownLabel]="filterMenuDropDownLabel"
            [data]="operators"
            (valueChange)="operatorChange($event)"
            [value]="currentOperator"
            [valuePrimitive]="true"
            textField="text"
            valueField="value"
            (keydown.shift.tab)="onShiftTab($event)">
        </kendo-dropdownlist>
        <ng-content></ng-content>
    `
                }]
        }], ctorParameters: function () { return [{ type: i1.LocalizationService }]; }, propDecorators: { filterService: [{
                type: Input
            }], isFirstDropDown: [{
                type: Input
            }], menuTabbingService: [{
                type: Input
            }], firstOperatorDropDown: [{
                type: ViewChild,
                args: [DropDownListComponent, { static: false }]
            }], currentFilter: [{
                type: Input
            }] } });

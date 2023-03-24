/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, Output, EventEmitter, HostBinding, ViewChild } from '@angular/core';
import { Keys } from '@progress/kendo-angular-common';
import * as i0 from "@angular/core";
import * as i1 from "@progress/kendo-angular-l10n";
import * as i2 from "@progress/kendo-angular-dropdowns";
import * as i3 from "@angular/common";
import * as i4 from "../../navigation/focusable.directive";
/**
 * Represents a component which accommodates the filter operators.
 */
export class FilterCellOperatorsComponent {
    constructor(localization) {
        this.localization = localization;
        this.clearText = 'Clear';
        /**
         * The filter operators that will be displayed.
         */
        this.operators = [];
        /**
         * Determines if the list of operators will be displayed.
         * @type {boolean}
         */
        this.showOperators = true;
        /**
         * Fires when the operator is selected.
         * @type {EventEmitter<string>}
         */
        this.valueChange = new EventEmitter();
        /**
         * Fires when the **Clear** button is clicked.
         * @type {EventEmitter<{}>}
         */
        this.clear = new EventEmitter();
    }
    /**
     * @hidden
     */
    get hostClasses() {
        return true;
    }
    /**
     * @hidden
     */
    onChange(dataItem) {
        this.valueChange.emit(dataItem);
    }
    /**
     * @hidden
     */
    clearClick() {
        this.clear.emit();
        return false;
    }
    /**
     * @hidden
     */
    clearKeydown(args) {
        if (args.keyCode === Keys.Enter || args.keyCode === Keys.Space) {
            this.clear.emit();
        }
    }
    /**
     * @hidden
     */
    dropdownKeydown(args) {
        if (args.defaultPrevented) {
            return;
        }
        if (args.keyCode === Keys.Enter && !this.dropdown.isOpen) {
            this.dropdown.toggle(true);
            args.preventDefault();
        }
    }
    ngOnInit() {
        this.subscription = this.localization.changes.subscribe(() => this.clearText = this.localization.get("filterClearButton"));
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
FilterCellOperatorsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: FilterCellOperatorsComponent, deps: [{ token: i1.LocalizationService }], target: i0.ɵɵFactoryTarget.Component });
FilterCellOperatorsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: FilterCellOperatorsComponent, selector: "kendo-grid-filter-cell-operators", inputs: { operators: "operators", showButton: "showButton", showOperators: "showOperators", value: "value" }, outputs: { valueChange: "valueChange", clear: "clear" }, host: { properties: { "class.k-filtercell-operator": "this.hostClasses" } }, viewQueries: [{ propertyName: "dropdown", first: true, predicate: ["dropdown"], descendants: true }], ngImport: i0, template: `
        <kendo-dropdownlist
            #dropdown
            *ngIf="showOperators"
            kendoGridFocusable
            [data]="operators"
            class="k-dropdown-operator"
            (valueChange)="onChange($event)"
            [value]="value"
            iconClass="k-i-filter"
            [valuePrimitive]="true"
            textField="text"
            [popupSettings]="{ width: 'auto' }"
            valueField="value"
            (keydown)="dropdownKeydown($event)">
        </kendo-dropdownlist>
        <button type="button"
            kendoGridFocusable
            *ngIf="showButton"
            class="k-button k-button-solid-base k-button-solid k-button-md k-rounded-md k-button-rectangle k-icon-button"
            [title]="clearText"
            (click)="clearClick()"
            (keydown)="clearKeydown($event)">
                <span class="k-icon k-button-icon k-i-filter-clear"></span>
        </button>
    `, isInline: true, components: [{ type: i2.DropDownListComponent, selector: "kendo-dropdownlist", inputs: ["iconClass", "loading", "data", "value", "textField", "valueField", "popupSettings", "listHeight", "defaultItem", "disabled", "itemDisabled", "readonly", "filterable", "virtual", "ignoreCase", "delay", "valuePrimitive", "tabindex", "tabIndex", "size", "rounded", "fillMode", "id"], outputs: ["valueChange", "filterChange", "selectionChange", "open", "opened", "close", "closed", "focus", "blur"], exportAs: ["kendoDropDownList"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.FocusableDirective, selector: "[kendoGridFocusable],\n        [kendoGridEditCommand],\n        [kendoGridRemoveCommand],\n        [kendoGridSaveCommand],\n        [kendoGridCancelCommand],\n        [kendoGridSelectionCheckbox]\n    ", inputs: ["kendoGridFocusable"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: FilterCellOperatorsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'kendo-grid-filter-cell-operators',
                    template: `
        <kendo-dropdownlist
            #dropdown
            *ngIf="showOperators"
            kendoGridFocusable
            [data]="operators"
            class="k-dropdown-operator"
            (valueChange)="onChange($event)"
            [value]="value"
            iconClass="k-i-filter"
            [valuePrimitive]="true"
            textField="text"
            [popupSettings]="{ width: 'auto' }"
            valueField="value"
            (keydown)="dropdownKeydown($event)">
        </kendo-dropdownlist>
        <button type="button"
            kendoGridFocusable
            *ngIf="showButton"
            class="k-button k-button-solid-base k-button-solid k-button-md k-rounded-md k-button-rectangle k-icon-button"
            [title]="clearText"
            (click)="clearClick()"
            (keydown)="clearKeydown($event)">
                <span class="k-icon k-button-icon k-i-filter-clear"></span>
        </button>
    `
                }]
        }], ctorParameters: function () { return [{ type: i1.LocalizationService }]; }, propDecorators: { hostClasses: [{
                type: HostBinding,
                args: ['class.k-filtercell-operator']
            }], dropdown: [{
                type: ViewChild,
                args: ['dropdown', { static: false }]
            }], operators: [{
                type: Input
            }], showButton: [{
                type: Input
            }], showOperators: [{
                type: Input
            }], value: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], clear: [{
                type: Output
            }] } });

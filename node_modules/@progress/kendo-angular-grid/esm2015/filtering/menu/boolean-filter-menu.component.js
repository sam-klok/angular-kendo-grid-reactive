/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, HostBinding, ViewChildren } from '@angular/core';
import { BooleanFilterComponent } from '../boolean-filter.component';
import { guid } from '@progress/kendo-angular-common';
import { BooleanFilterRadioButtonDirective } from './filter-radio-button.directive';
import { replaceMessagePlaceholder } from '../../utils';
import * as i0 from "@angular/core";
import * as i1 from "@progress/kendo-angular-l10n";
import * as i2 from "@angular/common";
import * as i3 from "@progress/kendo-angular-inputs";
import * as i4 from "./filter-radio-button.directive";
/**
 * Represents a Boolean-filter menu component.
 *
 * @example
 *  ```html-no-run
 *      <kendo-grid-column field="Discontinued" title="Discontinued">
 *          <ng-template kendoGridFilterMenuTemplate let-filter let-column="column" let-filterService="filterService">
 *            <kendo-grid-boolean-filter-menu
 *                [column]="column"
 *                [filter]="filter"
 *                [filterService]="filterService"
 *                >
 *            </kendo-grid-boolean-filter-menu>
 *          </ng-template>
 *      </kendo-grid-column>
 *   ```
 */
export class BooleanFilterMenuComponent extends BooleanFilterComponent {
    constructor(localization) {
        super(null, localization);
        /**
         * The current menu filter.
         * @type {CompositeFilterDescriptor}
         */
        this.filter = { filters: [], logic: "and" };
        this.idPrefix = guid();
    }
    /**
     * @hidden
     */
    get hostClasses() {
        return false;
    }
    ngAfterViewInit() {
        this.filterService.menuTabbingService.firstFocusable = this.radioButtons.first.radioButtonEl;
        this.radioButtons.first.radioButtonEl.focus();
    }
    /**
     * @hidden
     */
    radioId(value) {
        return `${this.idPrefix}_${value}`;
    }
    /**
     * @hidden
     */
    onChange(value, input) {
        this.applyFilter(this.updateFilter({
            field: this.column.field,
            operator: "eq",
            value: value
        }));
        this.filterService.menuTabbingService.firstFocusable = input;
    }
    /**
     * @hidden
     */
    isSelected(radioValue) {
        return this.filtersByField(this.column.field).some(({ value }) => value === radioValue);
    }
    /**
     * @hidden
     */
    onShiftTab(e) {
        if ((!this.menuTabbingService || !this.menuTabbingService.isColumnMenu) && this.filterService.menuTabbingService.lastFocusable) {
            e.preventDefault();
            this.filterService.menuTabbingService.lastFocusable.focus();
        }
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
BooleanFilterMenuComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: BooleanFilterMenuComponent, deps: [{ token: i1.LocalizationService }], target: i0.ɵɵFactoryTarget.Component });
BooleanFilterMenuComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: BooleanFilterMenuComponent, selector: "kendo-grid-boolean-filter-menu", inputs: { filter: "filter", filterService: "filterService", menuTabbingService: "menuTabbingService" }, host: { properties: { "class.k-filtercell": "this.hostClasses" } }, viewQueries: [{ propertyName: "radioButtons", predicate: BooleanFilterRadioButtonDirective, descendants: true }], usesInheritance: true, ngImport: i0, template: `
        <ul class="k-radio-list k-reset">
            <li *ngFor="let item of items">
                <input type="radio"
                    kendoFilterMenuRadioButton
                    [columnLabel]="columnLabel"
                    #input
                    [name]="idPrefix"
                    kendoRadioButton
                    [checked]="isSelected(item.value)"
                    [attr.id]="radioId(item.value)"
                    (change)="onChange(item.value, input)"
                    (keydown.shift.tab)="onShiftTab($event)"
                />
                <label class="k-radio-label" [attr.for]="radioId(item.value)">{{item.text}}</label>
            </li>
        </ul>
    `, isInline: true, directives: [{ type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.RadioButtonDirective, selector: "input[kendoRadioButton]", inputs: ["size"] }, { type: i4.BooleanFilterRadioButtonDirective, selector: "[kendoFilterMenuRadioButton]", inputs: ["columnLabel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: BooleanFilterMenuComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'kendo-grid-boolean-filter-menu',
                    template: `
        <ul class="k-radio-list k-reset">
            <li *ngFor="let item of items">
                <input type="radio"
                    kendoFilterMenuRadioButton
                    [columnLabel]="columnLabel"
                    #input
                    [name]="idPrefix"
                    kendoRadioButton
                    [checked]="isSelected(item.value)"
                    [attr.id]="radioId(item.value)"
                    (change)="onChange(item.value, input)"
                    (keydown.shift.tab)="onShiftTab($event)"
                />
                <label class="k-radio-label" [attr.for]="radioId(item.value)">{{item.text}}</label>
            </li>
        </ul>
    `
                }]
        }], ctorParameters: function () { return [{ type: i1.LocalizationService }]; }, propDecorators: { hostClasses: [{
                type: HostBinding,
                args: ['class.k-filtercell']
            }], filter: [{
                type: Input
            }], filterService: [{
                type: Input
            }], menuTabbingService: [{
                type: Input
            }], radioButtons: [{
                type: ViewChildren,
                args: [BooleanFilterRadioButtonDirective]
            }] } });

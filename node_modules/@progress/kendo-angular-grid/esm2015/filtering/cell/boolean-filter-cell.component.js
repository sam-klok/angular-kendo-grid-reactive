/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component } from '@angular/core';
import { BooleanFilterComponent } from '../boolean-filter.component';
import { replaceMessagePlaceholder } from '../../utils';
import * as i0 from "@angular/core";
import * as i1 from "../filter.service";
import * as i2 from "@progress/kendo-angular-l10n";
import * as i3 from "./filter-cell-wrapper.component";
import * as i4 from "@progress/kendo-angular-dropdowns";
import * as i5 from "../filter-input.directive";
import * as i6 from "../../navigation/focusable.directive";
/**
 * Represents a Boolean filter-cell component.
 *
 * @example
 *
 *  ```html-no-run
 *      <kendo-grid-column field="ProductName" title="Product Name">
 *          <ng-template kendoGridFilterCellTemplate let-filter let-column="column">
 *          <kendo-grid-boolean-filter-cell
 *              [column]="column"
 *              [filter]="filter">
 *          </kendo-grid-boolean-filter-cell>
 *          </ng-template>
 *      </kendo-grid-column>
 *   ```
 */
export class BooleanFilterCellComponent extends BooleanFilterComponent {
    constructor(filterService, localization, cd) {
        super(filterService, localization);
        this.cd = cd;
    }
    localizationChange() {
        super.localizationChange();
        this.cd.markForCheck();
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
BooleanFilterCellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: BooleanFilterCellComponent, deps: [{ token: i1.FilterService }, { token: i2.LocalizationService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
BooleanFilterCellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: BooleanFilterCellComponent, selector: "kendo-grid-boolean-filter-cell", usesInheritance: true, ngImport: i0, template: `
        <kendo-grid-filter-wrapper-cell
            [column]="column"
            [filter]="filter"
            [showOperators]="false"
            [defaultOperator]="operator">
            <kendo-dropdownlist
                kendoFilterInput
                kendoGridFocusable
                [columnLabel]="columnLabel"
                [defaultItem]="defaultItem"
                [data]="items"
                textField="text"
                valueField="value"
                [popupSettings]="{ width: 'auto' }"
                [valuePrimitive]="true"
                [value]="currentFilter?.value">
            </kendo-dropdownlist>
        </kendo-grid-filter-wrapper-cell>
    `, isInline: true, components: [{ type: i3.FilterCellWrapperComponent, selector: "kendo-grid-filter-wrapper-cell", inputs: ["showOperators"] }, { type: i4.DropDownListComponent, selector: "kendo-dropdownlist", inputs: ["iconClass", "loading", "data", "value", "textField", "valueField", "popupSettings", "listHeight", "defaultItem", "disabled", "itemDisabled", "readonly", "filterable", "virtual", "ignoreCase", "delay", "valuePrimitive", "tabindex", "tabIndex", "size", "rounded", "fillMode", "id"], outputs: ["valueChange", "filterChange", "selectionChange", "open", "opened", "close", "closed", "focus", "blur"], exportAs: ["kendoDropDownList"] }], directives: [{ type: i5.FilterInputDirective, selector: "[kendoFilterInput]", inputs: ["filterDelay", "columnLabel", "value"] }, { type: i6.FocusableDirective, selector: "[kendoGridFocusable],\n        [kendoGridEditCommand],\n        [kendoGridRemoveCommand],\n        [kendoGridSaveCommand],\n        [kendoGridCancelCommand],\n        [kendoGridSelectionCheckbox]\n    ", inputs: ["kendoGridFocusable"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: BooleanFilterCellComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'kendo-grid-boolean-filter-cell',
                    template: `
        <kendo-grid-filter-wrapper-cell
            [column]="column"
            [filter]="filter"
            [showOperators]="false"
            [defaultOperator]="operator">
            <kendo-dropdownlist
                kendoFilterInput
                kendoGridFocusable
                [columnLabel]="columnLabel"
                [defaultItem]="defaultItem"
                [data]="items"
                textField="text"
                valueField="value"
                [popupSettings]="{ width: 'auto' }"
                [valuePrimitive]="true"
                [value]="currentFilter?.value">
            </kendo-dropdownlist>
        </kendo-grid-filter-wrapper-cell>
    `
                }]
        }], ctorParameters: function () { return [{ type: i1.FilterService }, { type: i2.LocalizationService }, { type: i0.ChangeDetectorRef }]; } });

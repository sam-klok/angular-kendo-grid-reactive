/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
// eslint-disable no-access-missing-member
import { Directive, Input } from '@angular/core';
import { BaseFilterCellComponent, localizeOperators } from './base-filter-cell.component';
import { isNullOrEmptyString, extractFormat } from '../utils';
import { toJSON } from './operators/filter-operator.base';
import * as i0 from "@angular/core";
import * as i1 from "./filter.service";
import * as i2 from "@progress/kendo-angular-l10n";
const numericOperators = localizeOperators({
    "filterEqOperator": "eq",
    "filterNotEqOperator": "neq",
    "filterGteOperator": "gte",
    "filterGtOperator": "gt",
    "filterLteOperator": "lte",
    "filterLtOperator": "lt",
    "filterIsNullOperator": "isnull",
    "filterIsNotNullOperator": "isnotnull"
});
/**
 * Represents a base numeric filter component.
 */
export class NumericFilterComponent extends BaseFilterCellComponent {
    constructor(filterService, localization) {
        super(filterService);
        this.localization = localization;
        /**
         * The default filter operator. Defaults to `eq`.
         * @type {string}
         */
        this.operator = "eq";
        /**
         * Specifies the value that is used to increment or decrement the component value.
         * @type {numeric}
         */
        this.step = 1;
        /**
         * Specifies whether the **Up** and **Down** spin buttons will be rendered.
         * @type {boolean}
         */
        this.spinners = true;
        this.defaultOperators = numericOperators(this.localization);
    }
    /**
     * Specifies the number format used when the component is not focused.
     * By default, the `column.format` value is used (if set).
     */
    set format(value) {
        this._format = value;
    }
    /**
     * @readonly
     * @type {string}
     */
    get format() {
        return !isNullOrEmptyString(this._format) ? this._format : this.columnFormat;
    }
    /**
     * The current filter for the associated column field.
     * @readonly
     * @type {FilterDescriptor}
     */
    get currentFilter() {
        return this.filterByField(this.column.field);
    }
    /**
     * The current filter operator for the associated column field.
     * @readonly
     * @type {string}
     */
    get currentOperator() {
        return this.currentFilter ? this.currentFilter.operator : this.operator;
    }
    get columnFormat() {
        return this.column && !isNullOrEmptyString(this.column.format) ?
            extractFormat(this.column.format) : "n2";
    }
    ngOnInit() {
        this.subscription = this.localization.changes.subscribe(this.localizationChange.bind(this));
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        super.ngOnDestroy();
    }
    localizationChange() {
        this.defaultOperators = numericOperators(this.localization);
        if (this.operatorList.length) {
            this.operators = toJSON(this.operatorList.toArray());
        }
    }
}
NumericFilterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: NumericFilterComponent, deps: [{ token: i1.FilterService }, { token: i2.LocalizationService }], target: i0.ɵɵFactoryTarget.Directive });
NumericFilterComponent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.16", type: NumericFilterComponent, inputs: { column: "column", filter: "filter", operator: "operator", step: "step", min: "min", max: "max", spinners: "spinners", decimals: "decimals", format: "format" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: NumericFilterComponent, decorators: [{
            type: Directive,
            args: [{}]
        }], ctorParameters: function () { return [{ type: i1.FilterService }, { type: i2.LocalizationService }]; }, propDecorators: { column: [{
                type: Input
            }], filter: [{
                type: Input
            }], operator: [{
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

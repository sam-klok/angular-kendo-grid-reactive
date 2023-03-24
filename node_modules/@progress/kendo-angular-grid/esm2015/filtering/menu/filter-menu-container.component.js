/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { MenuTabbingService } from './menu-tabbing.service';
import { Component, Input, SkipSelf, Output, EventEmitter, ViewChild } from '@angular/core';
import { FilterService } from "../filter.service";
import { removeFilter, filtersByField } from "../base-filter-cell.component";
import { isPresent, isNullOrEmptyString } from "../../utils";
import { cloneFilters } from '../../common/filter-descriptor-differ';
import * as i0 from "@angular/core";
import * as i1 from "../filter.service";
import * as i2 from "@progress/kendo-angular-l10n";
import * as i3 from "./menu-tabbing.service";
import * as i4 from "@angular/forms";
import * as i5 from "@angular/common";
import * as i6 from "./filter-menu-host.directive";
const isNoValueOperator = operator => (operator === "isnull"
    || operator === "isnotnull"
    || operator === "isempty"
    || operator === "isnotempty");
const validFilters = ({ value, operator }) => !isNullOrEmptyString(value) || isNoValueOperator(operator);
const trimFilters = filter => {
    filter.filters = filter.filters.filter(validFilters);
    return filter;
};
const findParent = (filters, field, parent) => {
    return filters.reduce((acc, filter) => {
        if (acc) {
            return acc;
        }
        if (filter.filters) {
            return findParent(filter.filters, field, filter);
        }
        else if (filter.field === field) {
            return parent;
        }
        return acc;
    }, undefined);
};
const parentLogicOfDefault = (filter, field, def = "and") => {
    const parent = findParent(((filter || {}).filters || []), field);
    return isPresent(parent) ? parent.logic : def;
};
/**
 * @hidden
 */
export class FilterMenuContainerComponent {
    constructor(parentService, childService, localization, cd, menuTabbingService) {
        this.parentService = parentService;
        this.childService = childService;
        this.localization = localization;
        this.cd = cd;
        this.close = new EventEmitter();
        /**
         * @hidden
         */
        this.actionsClass = 'k-action-buttons';
        this._templateContext = {};
        this.menuTabbingService = menuTabbingService;
    }
    get filter() {
        return this._filter;
    }
    /**
     * The current root filter.
     * @type {CompositeFilterDescriptor}
     */
    set filter(value) {
        this._filter = cloneFilters(value);
    }
    get childFilter() {
        if (!isPresent(this._childFilter)) {
            this._childFilter = {
                filters: filtersByField(this.filter, (this.column || {}).field),
                logic: parentLogicOfDefault(this.filter, (this.column || {}).field)
            };
        }
        return this._childFilter;
    }
    ngOnInit() {
        this.subscription = this.childService.changes.subscribe(filter => this._childFilter = filter);
        this.subscription.add(this.localization.changes.subscribe(() => this.cd.markForCheck()));
    }
    ngAfterViewChecked() {
        if (!this.menuTabbingService.isColumnMenu || (this.isLast && this.isExpanded)) {
            this.menuTabbingService.lastFocusable = this.disabled ?
                this.resetButton.nativeElement : this.filterButton.nativeElement;
        }
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.menuTabbingService.lastFocusable = undefined;
    }
    get disabled() {
        return !this.childFilter.filters.some(validFilters);
    }
    get templateContext() {
        this._templateContext.column = this.column;
        this._templateContext.filter = this.childFilter;
        this._templateContext.filterService = this.childService;
        this._templateContext["$implicit"] = this.childFilter;
        return this._templateContext;
    }
    get hasTemplate() {
        return isPresent(this.column) && isPresent(this.column.filterMenuTemplateRef);
    }
    submit() {
        const filter = trimFilters(this.childFilter);
        if (filter.filters.length) {
            const root = this.filter || {
                filters: [],
                logic: "and"
            };
            removeFilter(root, this.column.field);
            root.filters.push(filter);
            this.parentService.filter(root);
        }
        this.close.emit();
        return false;
    }
    reset() {
        const root = this.filter || {
            filters: [],
            logic: "and"
        };
        removeFilter(root, this.column.field);
        this.parentService.filter(root);
        this.close.emit();
    }
    onTab(e, buttonType) {
        if (this.menuTabbingService.firstFocusable && (!this.menuTabbingService.isColumnMenu || this.isLast)) {
            e.preventDefault();
            if (buttonType === 'reset') {
                // eslint-disable-next-line no-unused-expressions
                this.disabled ? this.menuTabbingService.firstFocusable.focus() : this.filterButton.nativeElement.focus();
            }
            else {
                this.menuTabbingService.firstFocusable.focus();
            }
        }
    }
    get clearText() {
        return this.localization.get("filterClearButton");
    }
    get filterText() {
        return this.localization.get("filterFilterButton");
    }
}
FilterMenuContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: FilterMenuContainerComponent, deps: [{ token: i1.FilterService, skipSelf: true }, { token: i1.FilterService }, { token: i2.LocalizationService }, { token: i0.ChangeDetectorRef }, { token: i3.MenuTabbingService }], target: i0.ɵɵFactoryTarget.Component });
FilterMenuContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: FilterMenuContainerComponent, selector: "kendo-grid-filter-menu-container", inputs: { column: "column", isLast: "isLast", isExpanded: "isExpanded", menuTabbingService: "menuTabbingService", filter: "filter", actionsClass: "actionsClass" }, outputs: { close: "close" }, providers: [
        FilterService,
        MenuTabbingService
    ], viewQueries: [{ propertyName: "resetButton", first: true, predicate: ["resetButton"], descendants: true }, { propertyName: "filterButton", first: true, predicate: ["filterButton"], descendants: true }], ngImport: i0, template: `
        <form (submit)="submit()" (reset)="reset()"
            class="k-filter-menu k-group k-reset k-state-border-up">
            <div class="k-filter-menu-container">
                <ng-container [ngSwitch]="hasTemplate">
                    <ng-container *ngSwitchCase="false">
                        <ng-container
                            kendoFilterMenuHost
                            [filterService]="childService"
                            [column]="column"
                            [filter]="childFilter"
                            [menuTabbingService]="menuTabbingService">
                        </ng-container>
                    </ng-container>
                    <ng-container *ngSwitchCase="true">
                        <ng-template
                            *ngIf="column.filterMenuTemplateRef"
                            [ngTemplateOutlet]="column.filterMenuTemplateRef"
                            [ngTemplateOutletContext]="templateContext"
                            >
                        </ng-template>
                    </ng-container>
                </ng-container>
                <div [ngClass]="actionsClass">
                    <button
                        #resetButton
                        type="reset"
                        class="k-button k-button-solid-base k-button-solid k-button-md k-rounded-md k-button-rectangle"
                        (keydown.tab)="onTab($event, 'reset')">{{clearText}}</button>
                    <button #filterButton
                        type="submit"
                        class="k-button k-button-solid-primary k-button-solid k-button-md k-rounded-md k-button-rectangle"
                        [disabled]="disabled"
                        (keydown.tab)="onTab($event, 'filter')">{{filterText}}</button>
                </div>
            </div>
        </form>
    `, isInline: true, directives: [{ type: i4.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i4.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i4.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i5.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i5.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i6.FilterMenuHostDirective, selector: "[kendoFilterMenuHost]", inputs: ["filterService", "menuTabbingService"] }, { type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: FilterMenuContainerComponent, decorators: [{
            type: Component,
            args: [{
                    providers: [
                        FilterService,
                        MenuTabbingService
                    ],
                    selector: 'kendo-grid-filter-menu-container',
                    template: `
        <form (submit)="submit()" (reset)="reset()"
            class="k-filter-menu k-group k-reset k-state-border-up">
            <div class="k-filter-menu-container">
                <ng-container [ngSwitch]="hasTemplate">
                    <ng-container *ngSwitchCase="false">
                        <ng-container
                            kendoFilterMenuHost
                            [filterService]="childService"
                            [column]="column"
                            [filter]="childFilter"
                            [menuTabbingService]="menuTabbingService">
                        </ng-container>
                    </ng-container>
                    <ng-container *ngSwitchCase="true">
                        <ng-template
                            *ngIf="column.filterMenuTemplateRef"
                            [ngTemplateOutlet]="column.filterMenuTemplateRef"
                            [ngTemplateOutletContext]="templateContext"
                            >
                        </ng-template>
                    </ng-container>
                </ng-container>
                <div [ngClass]="actionsClass">
                    <button
                        #resetButton
                        type="reset"
                        class="k-button k-button-solid-base k-button-solid k-button-md k-rounded-md k-button-rectangle"
                        (keydown.tab)="onTab($event, 'reset')">{{clearText}}</button>
                    <button #filterButton
                        type="submit"
                        class="k-button k-button-solid-primary k-button-solid k-button-md k-rounded-md k-button-rectangle"
                        [disabled]="disabled"
                        (keydown.tab)="onTab($event, 'filter')">{{filterText}}</button>
                </div>
            </div>
        </form>
    `
                }]
        }], ctorParameters: function () { return [{ type: i1.FilterService, decorators: [{
                    type: SkipSelf
                }] }, { type: i1.FilterService }, { type: i2.LocalizationService }, { type: i0.ChangeDetectorRef }, { type: i3.MenuTabbingService }]; }, propDecorators: { close: [{
                type: Output
            }], column: [{
                type: Input
            }], isLast: [{
                type: Input
            }], isExpanded: [{
                type: Input
            }], menuTabbingService: [{
                type: Input
            }], filter: [{
                type: Input
            }], actionsClass: [{
                type: Input
            }], resetButton: [{
                type: ViewChild,
                args: ['resetButton', { static: false }]
            }], filterButton: [{
                type: ViewChild,
                args: ['filterButton', { static: false }]
            }] } });

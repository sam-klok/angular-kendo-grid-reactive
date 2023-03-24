/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, HostBinding, Input, Inject, Optional } from '@angular/core';
import { isSpanColumn, isCheckboxColumn } from '../columns/column-base';
import { CommandColumnComponent } from '../columns/command-column.component';
import { isColumnComponent } from '../columns/column.component';
import { columnsToRender } from "../columns/column-common";
import { isPresent, isNullOrEmptyString, extractFormat } from '../utils';
import { CELL_CONTEXT } from './common/cell-context';
import * as i0 from "@angular/core";
import * as i1 from "../editing/edit.service";
import * as i2 from "../common/id.service";
import * as i3 from "@progress/kendo-angular-l10n";
import * as i4 from "@progress/kendo-angular-inputs";
import * as i5 from "@progress/kendo-angular-dateinputs";
import * as i6 from "@angular/common";
import * as i7 from "../navigation/focusable.directive";
import * as i8 from "../selection/selection-checkbox.directive";
import * as i9 from "@angular/forms";
import * as i10 from "./common/field-accessor.pipe";
/**
 * @hidden
 */
export class CellComponent {
    constructor(editService, idService, localizationService, cellContext) {
        this.editService = editService;
        this.idService = idService;
        this.localizationService = localizationService;
        this.cellContext = cellContext;
        this.isNew = false;
        this.isLoading = false;
        this.isVirtual = false;
        this._templateContext = {};
        this._editTemplateContext = {};
    }
    get commandCellClass() {
        return this.isCommand(this.column);
    }
    set rowIndex(index) {
        this._rowIndex = index;
        this.updateCellContext();
    }
    get rowIndex() {
        return this._rowIndex;
    }
    get isEdited() {
        if (!(this.editService.isEditing() || this.isNew) || !this.isColumnEditable) {
            return false;
        }
        const editContext = this.editService.columnContext(this.rowIndex, this.column);
        return this.isFieldEditable(editContext, this.column);
    }
    get showLoading() {
        return this.isVirtual && this.isLoading;
    }
    get formGroup() {
        return this.editService.context(this.rowIndex).group;
    }
    get templateContext() {
        return this._templateContext;
    }
    get editTemplateContext() {
        this._editTemplateContext.$implicit = this.formGroup;
        this._editTemplateContext.isNew = this.isNew;
        this._editTemplateContext.column = this.column;
        this._editTemplateContext.dataItem = this.dataItem;
        this._editTemplateContext.formGroup = this.formGroup;
        this._editTemplateContext.rowIndex = this.rowIndex;
        return this._editTemplateContext;
    }
    get format() {
        if (isColumnComponent(this.column) && !isNullOrEmptyString(this.column.format)) {
            return extractFormat(this.column.format);
        }
        return undefined;
    }
    get isBoundColumn() {
        return this.column.field && !this.column.templateRef;
    }
    get isCheckboxColumn() {
        return isCheckboxColumn(this.column) && !this.column.templateRef;
    }
    get selectionCheckboxId() {
        return this.idService.selectionCheckboxId(this.rowIndex);
    }
    get selectionCheckboxLabel() {
        return this.localizationService.get('selectionCheckboxLabel');
    }
    get isSpanColumn() {
        return isSpanColumn(this.column) && !this.column.templateRef;
    }
    get childColumns() {
        return columnsToRender([this.column]);
    }
    get isColumnEditable() {
        if (!this.column || this.isCommand(this.column)) {
            return false;
        }
        return this.column.editable !== false;
    }
    ngDoCheck() {
        this.updateCellContext();
    }
    ngOnChanges(_changes) {
        this.updateTemplateContext();
    }
    ngAfterContentChecked() {
        this.updateTemplateContext();
    }
    isCommand(column) {
        return column instanceof CommandColumnComponent;
    }
    isFieldEditable(editContext, column) {
        if (!isPresent(editContext)) {
            return false;
        }
        if (isPresent(column.editTemplate)) {
            return true;
        }
        return isPresent(editContext.group) && isPresent(editContext.group.get(column.field));
    }
    updateCellContext() {
        if (this.cellContext) {
            this.cellContext.rowIndex = this._rowIndex;
        }
    }
    updateTemplateContext() {
        if (!this.column.templateRef) {
            return;
        }
        const context = this._templateContext;
        context.isNew = this.isNew;
        context.column = this.column;
        context.dataItem = this.dataItem;
        context.rowIndex = this.rowIndex;
        context.columnIndex = this.columnIndex;
        context.$implicit = this.dataItem;
    }
}
CellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: CellComponent, deps: [{ token: i1.EditService }, { token: i2.IdService }, { token: i3.LocalizationService }, { token: CELL_CONTEXT, optional: true }], target: i0.ɵɵFactoryTarget.Component });
CellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: CellComponent, selector: "[kendoGridCell]", inputs: { column: "column", columnIndex: "columnIndex", isNew: "isNew", isLoading: "isLoading", isVirtual: "isVirtual", loadingTemplate: "loadingTemplate", rowIndex: "rowIndex", dataItem: "dataItem" }, host: { properties: { "class.k-command-cell": "this.commandCellClass" } }, usesOnChanges: true, ngImport: i0, template: `
        <ng-container [ngSwitch]="isEdited">
            <ng-container *ngSwitchCase="false">
                <ng-container *ngIf="!showLoading; else loading">
                    <ng-template *ngIf="column.templateRef"
                        [ngTemplateOutlet]="column.templateRef"
                        [ngTemplateOutletContext]="templateContext">
                    </ng-template>
                    <ng-container *ngIf="isSpanColumn">
                        <ng-container *ngFor="let childColumn of childColumns">
                            {{ dataItem | valueOf: childColumn.field: childColumn.format}}
                        </ng-container>
                    </ng-container>
                    <ng-container *ngIf="isBoundColumn">{{ dataItem | valueOf: column.field: column.format}}</ng-container>
                    <ng-container *ngIf="isCheckboxColumn && !isNew">
                        <input
                            class="k-checkbox k-checkbox-md k-rounded-md"
                            [kendoGridSelectionCheckbox]="rowIndex"
                            [attr.id]="selectionCheckboxId"
                            [attr.aria-label]="selectionCheckboxLabel" />
                    </ng-container>
                </ng-container>
                <ng-template #loading>
                    <ng-template
                        *ngIf="loadingTemplate"
                        [ngTemplateOutlet]="loadingTemplate"
                        [ngTemplateOutletContext]="{$implicit: column}">
                    </ng-template>
                    <div *ngIf="!loadingTemplate" class="k-skeleton-text k-skeleton"></div>
                </ng-template>
            </ng-container>
            <ng-container *ngSwitchCase="true">
                <ng-template
                    *ngIf="column.editTemplateRef"
                    [ngTemplateOutlet]="column.editTemplateRef"
                    [ngTemplateOutletContext]="editTemplateContext">
                </ng-template>
                <ng-container [ngSwitch]="column.editor" *ngIf="!column.editTemplateRef">
                    <kendo-numerictextbox
                        *ngSwitchCase="'numeric'"
                        [format]="format"
                        [formControl]="$any(formGroup.get(column.field))"
                        kendoGridFocusable
                    ></kendo-numerictextbox>

                    <kendo-datepicker
                        *ngSwitchCase="'date'"
                        [format]="format"
                        [formControl]="$any(formGroup.get(column.field))"
                        kendoGridFocusable
                    ></kendo-datepicker>

                    <input
                        *ngSwitchCase="'boolean'"
                        type="checkbox"
                        class="k-checkbox k-checkbox-md k-rounded-md"
                        [formControl]="$any(formGroup.get(column.field))"
                        kendoGridFocusable
                    />

                    <input
                        *ngSwitchDefault
                        type="text"
                        class="k-textbox k-input k-rounded-md"
                        [formControl]="$any(formGroup.get(column.field))"
                        kendoGridFocusable
                    />
                </ng-container>
            </ng-container>
        </ng-container>
    `, isInline: true, components: [{ type: i4.NumericTextBoxComponent, selector: "kendo-numerictextbox", inputs: ["focusableId", "disabled", "readonly", "title", "autoCorrect", "format", "max", "min", "decimals", "placeholder", "step", "spinners", "rangeValidation", "tabindex", "tabIndex", "changeValueOnScroll", "selectOnFocus", "value", "maxlength", "size", "rounded", "fillMode"], outputs: ["valueChange", "focus", "blur"], exportAs: ["kendoNumericTextBox"] }, { type: i5.DatePickerComponent, selector: "kendo-datepicker", inputs: ["cellTemplate", "monthCellTemplate", "yearCellTemplate", "decadeCellTemplate", "centuryCellTemplate", "weekNumberTemplate", "headerTitleTemplate", "navigationItemTemplate", "activeView", "bottomView", "topView", "calendarType", "animateCalendarNavigation", "disabled", "readonly", "readOnlyInput", "popupSettings", "navigation", "min", "max", "incompleteDateValidation", "focusedDate", "value", "format", "twoDigitYearMax", "formatPlaceholder", "placeholder", "tabindex", "tabIndex", "disabledDates", "title", "rangeValidation", "disabledDatesValidation", "weekNumber", "size", "rounded", "fillMode"], outputs: ["valueChange", "focus", "blur", "open", "close"], exportAs: ["kendo-datepicker"] }], directives: [{ type: i6.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i6.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i7.FocusableDirective, selector: "[kendoGridFocusable],\n        [kendoGridEditCommand],\n        [kendoGridRemoveCommand],\n        [kendoGridSaveCommand],\n        [kendoGridCancelCommand],\n        [kendoGridSelectionCheckbox]\n    ", inputs: ["kendoGridFocusable"] }, { type: i8.SelectionCheckboxDirective, selector: "[kendoGridSelectionCheckbox]", inputs: ["kendoGridSelectionCheckbox"] }, { type: i9.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i9.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i9.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { type: i6.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { type: i9.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }], pipes: { "valueOf": i10.FieldAccessorPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: CellComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[kendoGridCell]',
                    template: `
        <ng-container [ngSwitch]="isEdited">
            <ng-container *ngSwitchCase="false">
                <ng-container *ngIf="!showLoading; else loading">
                    <ng-template *ngIf="column.templateRef"
                        [ngTemplateOutlet]="column.templateRef"
                        [ngTemplateOutletContext]="templateContext">
                    </ng-template>
                    <ng-container *ngIf="isSpanColumn">
                        <ng-container *ngFor="let childColumn of childColumns">
                            {{ dataItem | valueOf: childColumn.field: childColumn.format}}
                        </ng-container>
                    </ng-container>
                    <ng-container *ngIf="isBoundColumn">{{ dataItem | valueOf: column.field: column.format}}</ng-container>
                    <ng-container *ngIf="isCheckboxColumn && !isNew">
                        <input
                            class="k-checkbox k-checkbox-md k-rounded-md"
                            [kendoGridSelectionCheckbox]="rowIndex"
                            [attr.id]="selectionCheckboxId"
                            [attr.aria-label]="selectionCheckboxLabel" />
                    </ng-container>
                </ng-container>
                <ng-template #loading>
                    <ng-template
                        *ngIf="loadingTemplate"
                        [ngTemplateOutlet]="loadingTemplate"
                        [ngTemplateOutletContext]="{$implicit: column}">
                    </ng-template>
                    <div *ngIf="!loadingTemplate" class="k-skeleton-text k-skeleton"></div>
                </ng-template>
            </ng-container>
            <ng-container *ngSwitchCase="true">
                <ng-template
                    *ngIf="column.editTemplateRef"
                    [ngTemplateOutlet]="column.editTemplateRef"
                    [ngTemplateOutletContext]="editTemplateContext">
                </ng-template>
                <ng-container [ngSwitch]="column.editor" *ngIf="!column.editTemplateRef">
                    <kendo-numerictextbox
                        *ngSwitchCase="'numeric'"
                        [format]="format"
                        [formControl]="$any(formGroup.get(column.field))"
                        kendoGridFocusable
                    ></kendo-numerictextbox>

                    <kendo-datepicker
                        *ngSwitchCase="'date'"
                        [format]="format"
                        [formControl]="$any(formGroup.get(column.field))"
                        kendoGridFocusable
                    ></kendo-datepicker>

                    <input
                        *ngSwitchCase="'boolean'"
                        type="checkbox"
                        class="k-checkbox k-checkbox-md k-rounded-md"
                        [formControl]="$any(formGroup.get(column.field))"
                        kendoGridFocusable
                    />

                    <input
                        *ngSwitchDefault
                        type="text"
                        class="k-textbox k-input k-rounded-md"
                        [formControl]="$any(formGroup.get(column.field))"
                        kendoGridFocusable
                    />
                </ng-container>
            </ng-container>
        </ng-container>
    `
                }]
        }], ctorParameters: function () { return [{ type: i1.EditService }, { type: i2.IdService }, { type: i3.LocalizationService }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [CELL_CONTEXT]
                }] }]; }, propDecorators: { commandCellClass: [{
                type: HostBinding,
                args: ['class.k-command-cell']
            }], column: [{
                type: Input
            }], columnIndex: [{
                type: Input
            }], isNew: [{
                type: Input
            }], isLoading: [{
                type: Input
            }], isVirtual: [{
                type: Input
            }], loadingTemplate: [{
                type: Input
            }], rowIndex: [{
                type: Input
            }], dataItem: [{
                type: Input
            }] } });

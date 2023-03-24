/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, HostBinding, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { hasClasses } from '../rendering/common/dom-queries';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * @hidden
 */
export class ColumnListComponent {
    constructor(element, ngZone, renderer) {
        this.element = element;
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.reset = new EventEmitter();
        this.apply = new EventEmitter();
        this.columnChange = new EventEmitter();
        this.autoSync = true;
        this.allowHideAll = false;
        this.actionsClass = 'k-action-buttons';
        this.unlockedCount = 0;
    }
    get className() {
        return true;
    }
    set columns(value) {
        this._columns = value.filter(column => column.includeInChooser !== false);
        this.allColumns = value;
        this.updateColumnState();
    }
    get columns() {
        return this._columns;
    }
    isDisabled(column) {
        return !(this.allowHideAll || this.hasFiltered || column.hidden || this.columns.find(current => current !== column && !current.hidden)) ||
            (this.hasVisibleLocked && !this.hasUnlockedFiltered && this.unlockedCount === 1 && !column.locked && !column.hidden);
    }
    ngOnInit() {
        if (!this.element) {
            return;
        }
        this.ngZone.runOutsideAngular(() => {
            this.domSubscriptions = this.renderer.listen(this.element.nativeElement, 'click', (e) => {
                if (hasClasses(e.target, 'k-checkbox')) {
                    if (this.autoSync) {
                        const index = parseInt(e.target.getAttribute('data-index'), 10);
                        const column = this.columns[index];
                        const hidden = !e.target.checked;
                        if (Boolean(column.hidden) !== hidden) {
                            this.ngZone.run(() => {
                                column.hidden = hidden;
                                this.columnChange.emit([column]);
                            });
                        }
                    }
                    else {
                        this.updateDisabled();
                    }
                }
            });
        });
    }
    ngOnChanges(changes) {
        if (!this.service) {
            return;
        }
        if (changes.isLast && this.isLast) {
            this.service.menuTabbingService.lastFocusable = this.applyButton.nativeElement;
        }
        if (changes.isExpanded && this.isExpanded && this.isLast && this.applyButton) {
            this.service.menuTabbingService.lastFocusable = this.applyButton.nativeElement;
        }
    }
    ngOnDestroy() {
        if (this.domSubscriptions) {
            this.domSubscriptions();
        }
    }
    cancelChanges() {
        this.forEachCheckBox((element, index) => {
            element.checked = !this.columns[index].hidden;
        });
        this.updateDisabled();
        this.reset.emit();
    }
    applyChanges() {
        const changed = [];
        this.forEachCheckBox((element, index) => {
            const column = this.columns[index];
            const hidden = !element.checked;
            if (Boolean(column.hidden) !== hidden) {
                column.hidden = hidden;
                changed.push(column);
            }
        });
        this.updateDisabled();
        this.apply.emit(changed);
    }
    onTab(e) {
        if (this.isLast) {
            e.preventDefault();
            if (this.service) {
                this.service.menuTabbingService.firstFocusable.focus();
            }
        }
    }
    forEachCheckBox(callback) {
        const checkboxes = this.element.nativeElement.getElementsByClassName('k-checkbox');
        const length = checkboxes.length;
        for (let idx = 0; idx < length; idx++) {
            callback(checkboxes[idx], idx);
        }
    }
    updateDisabled() {
        if (this.allowHideAll && !this.hasLocked) {
            return;
        }
        const checkedItems = [];
        this.forEachCheckBox((checkbox, index) => {
            if (checkbox.checked) {
                checkedItems.push({ checkbox, index });
            }
            checkbox.disabled = false;
        });
        if (!this.allowHideAll && checkedItems.length === 1 && !this.hasFiltered) {
            checkedItems[0].checkbox.disabled = true;
        }
        else if (this.hasLocked && !this.hasUnlockedFiltered) {
            const columns = this.columns;
            const checkedUnlocked = checkedItems.filter(item => !columns[item.index].locked);
            if (checkedUnlocked.length === 1) {
                checkedUnlocked[0].checkbox.disabled = true;
            }
        }
    }
    updateColumnState() {
        this.hasLocked = this.allColumns.filter(column => column.locked && (!column.hidden || column.includeInChooser !== false)).length > 0;
        this.hasVisibleLocked = this.allColumns.filter(column => column.locked && !column.hidden).length > 0;
        this.unlockedCount = this.columns.filter(column => !column.locked && !column.hidden).length;
        const filteredColumns = this.allColumns.filter(column => column.includeInChooser === false && !column.hidden);
        if (filteredColumns.length) {
            this.hasFiltered = filteredColumns.length > 0;
            this.hasUnlockedFiltered = filteredColumns.filter(column => !column.locked).length > 0;
        }
        else {
            this.hasFiltered = false;
            this.hasUnlockedFiltered = false;
        }
    }
}
ColumnListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ColumnListComponent, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
ColumnListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: ColumnListComponent, selector: "kendo-grid-columnlist", inputs: { columns: "columns", autoSync: "autoSync", allowHideAll: "allowHideAll", applyText: "applyText", resetText: "resetText", actionsClass: "actionsClass", isLast: "isLast", isExpanded: "isExpanded", service: "service" }, outputs: { reset: "reset", apply: "apply", columnChange: "columnChange" }, host: { properties: { "class.k-column-list-wrapper": "this.className" } }, viewQueries: [{ propertyName: "applyButton", first: true, predicate: ["applyButton"], descendants: true }], usesOnChanges: true, ngImport: i0, template: `
        <div class="k-column-list">
            <label *ngFor="let column of columns; let index = index;" class='k-column-list-item'>
                <input class="k-checkbox k-checkbox-md k-rounded-md" type="checkbox" [attr.data-index]="index" [checked]="!column.hidden" [disabled]="isDisabled(column)" /><span class="k-checkbox-label">{{ column.displayTitle }}</span>
            </label>
        </div>
        <div [ngClass]="actionsClass" *ngIf="!autoSync">
            <button type="button" class="k-button k-button-solid-base k-button-solid k-button-md k-rounded-md k-button-rectangle" (click)="cancelChanges()">{{ resetText }}</button>
            <button #applyButton type="button" (keydown.tab)="onTab($event)" class="k-button k-button-solid-primary k-button-solid k-button-md k-rounded-md k-button-rectangle" (click)="applyChanges()">{{ applyText }}</button>
        </div>
    `, isInline: true, directives: [{ type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ColumnListComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'kendo-grid-columnlist',
                    template: `
        <div class="k-column-list">
            <label *ngFor="let column of columns; let index = index;" class='k-column-list-item'>
                <input class="k-checkbox k-checkbox-md k-rounded-md" type="checkbox" [attr.data-index]="index" [checked]="!column.hidden" [disabled]="isDisabled(column)" /><span class="k-checkbox-label">{{ column.displayTitle }}</span>
            </label>
        </div>
        <div [ngClass]="actionsClass" *ngIf="!autoSync">
            <button type="button" class="k-button k-button-solid-base k-button-solid k-button-md k-rounded-md k-button-rectangle" (click)="cancelChanges()">{{ resetText }}</button>
            <button #applyButton type="button" (keydown.tab)="onTab($event)" class="k-button k-button-solid-primary k-button-solid k-button-md k-rounded-md k-button-rectangle" (click)="applyChanges()">{{ applyText }}</button>
        </div>
    `
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.NgZone }, { type: i0.Renderer2 }]; }, propDecorators: { className: [{
                type: HostBinding,
                args: ["class.k-column-list-wrapper"]
            }], reset: [{
                type: Output
            }], apply: [{
                type: Output
            }], columnChange: [{
                type: Output
            }], columns: [{
                type: Input
            }], autoSync: [{
                type: Input
            }], allowHideAll: [{
                type: Input
            }], applyText: [{
                type: Input
            }], resetText: [{
                type: Input
            }], actionsClass: [{
                type: Input
            }], isLast: [{
                type: Input
            }], isExpanded: [{
                type: Input
            }], service: [{
                type: Input
            }], applyButton: [{
                type: ViewChild,
                args: ['applyButton', { static: false }]
            }] } });

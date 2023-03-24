/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { PagerElementComponent } from './pager-element.component';
import * as i0 from "@angular/core";
import * as i1 from "@progress/kendo-angular-l10n";
import * as i2 from "./pager-context.service";
import * as i3 from "../navigation/focusable.directive";
import * as i4 from "@angular/common";
/**
 * Displays numeric buttons to enable navigation between the pages.
 */
export class PagerNumericButtonsComponent extends PagerElementComponent {
    constructor(localization, cd, pagerContext) {
        super(localization, pagerContext, cd);
        this.pagerContext = pagerContext;
        this.numbersWrapClass = true;
    }
    /**
     * @hidden
     *
     * @readonly
     * @type {number[]}
     * @memberOf PagerNumericButtonsComponent
     */
    get buttons() {
        let result = [];
        for (let idx = this.start; idx <= this.end; idx++) {
            result.push(idx);
        }
        return result;
    }
    /**
     * @hidden
     */
    get end() {
        return Math.min((this.start + this.buttonCount) - 1, this.totalPages);
    }
    /**
     * @hidden
     */
    get start() {
        const page = this.currentPage;
        const buttonCount = this.buttonCount;
        if (page > buttonCount) {
            const reminder = (page % buttonCount);
            return (reminder === 0) ? (page - buttonCount) + 1 : (page - reminder) + 1;
        }
        return 1;
    }
    /**
     * @hidden
     */
    pageLabel(num) {
        const pageText = this.textFor('pagerPage');
        if (pageText) {
            return pageText + ' ' + num;
        }
        return num.toString();
    }
    /**
     * @hidden
     */
    onSelectChange(e) {
        const target = e.target;
        const valueAsNumber = Number(target.value);
        if (!Number.isNaN(valueAsNumber)) {
            this.changePage(valueAsNumber - 1);
        }
        else {
            if (target.value === 'previousButtons') {
                this.changePage(this.start - 2);
            }
            else {
                this.changePage(this.end);
            }
        }
    }
    onChanges({ total, skip, pageSize }) {
        this.total = total;
        this.skip = skip;
        this.pageSize = pageSize;
        this.cd.markForCheck();
    }
}
PagerNumericButtonsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: PagerNumericButtonsComponent, deps: [{ token: i1.LocalizationService }, { token: i0.ChangeDetectorRef }, { token: i2.PagerContextService }], target: i0.ɵɵFactoryTarget.Component });
PagerNumericButtonsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: PagerNumericButtonsComponent, selector: "kendo-pager-numeric-buttons", inputs: { buttonCount: "buttonCount" }, host: { properties: { "class.k-pager-numbers-wrap": "this.numbersWrapClass" } }, usesInheritance: true, ngImport: i0, template: `
        <select
            class="k-dropdownlist k-pager-nav"
            kendoGridFocusable
            tabindex="0"
            (change)="onSelectChange($event)">
            <option *ngIf="start > 1"
                class="k-link"
                value="previousButtons"
                [selected]="false"
                [attr.aria-label]="pageLabel(start - 1)">...
            </option>
            <option *ngFor="let num of buttons"
                [value]="num.toString()"
                [selected]="num === currentPage"
                [attr.aria-label]="pageLabel(num)"
                [attr.aria-current]="currentPage === num ? 'page' : undefined"
                [ngClass]="{'k-link': true, 'k-selected':currentPage === num}">
                {{num}}
            </option>
            <option *ngIf="end < totalPages"
                value="nextButtons"
                [selected]="false"
                class="k-link"
                [attr.aria-label]="pageLabel(end + 1)">...
            </option>
        </select>
        <ul [ngClass]="{'k-pager-numbers': true, 'k-reset': true}">
            <li *ngIf="start > 1">
                <span
                    kendoGridFocusable
                    tabindex="0"
                    class="k-link k-pager-nav"
                    role="button"
                    [attr.aria-label]="pageLabel(start - 1)"
                    (click)="changePage(start - 2)"
                    (keydown.enter)="changePage(start - 2)">...</span>
            </li>
            <li *ngFor="let num of buttons">
                <span
                    kendoGridFocusable
                    tabindex="0"
                    role="button"
                    [attr.aria-label]="pageLabel(num)"
                    [ngClass]="{'k-link': true, 'k-selected':currentPage === num, 'k-pager-nav': true}"
                    (click)="changePage(num - 1)"
                    (keydown.enter)="changePage(num - 1)">
                    {{num}}
                </span>
            </li>
            <li *ngIf="end < totalPages">
                <span
                    kendoGridFocusable
                    tabindex="0"
                    class="k-link k-pager-nav"
                    role="button"
                    [attr.aria-label]="pageLabel(end + 1)"
                    (click)="changePage(end)"
                    (keydown.enter)="changePage(end)">...</span>
            </li>
        </ul>
    `, isInline: true, directives: [{ type: i3.FocusableDirective, selector: "[kendoGridFocusable],\n        [kendoGridEditCommand],\n        [kendoGridRemoveCommand],\n        [kendoGridSaveCommand],\n        [kendoGridCancelCommand],\n        [kendoGridSelectionCheckbox]\n    ", inputs: ["kendoGridFocusable"] }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: PagerNumericButtonsComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-pager-numeric-buttons',
                    template: `
        <select
            class="k-dropdownlist k-pager-nav"
            kendoGridFocusable
            tabindex="0"
            (change)="onSelectChange($event)">
            <option *ngIf="start > 1"
                class="k-link"
                value="previousButtons"
                [selected]="false"
                [attr.aria-label]="pageLabel(start - 1)">...
            </option>
            <option *ngFor="let num of buttons"
                [value]="num.toString()"
                [selected]="num === currentPage"
                [attr.aria-label]="pageLabel(num)"
                [attr.aria-current]="currentPage === num ? 'page' : undefined"
                [ngClass]="{'k-link': true, 'k-selected':currentPage === num}">
                {{num}}
            </option>
            <option *ngIf="end < totalPages"
                value="nextButtons"
                [selected]="false"
                class="k-link"
                [attr.aria-label]="pageLabel(end + 1)">...
            </option>
        </select>
        <ul [ngClass]="{'k-pager-numbers': true, 'k-reset': true}">
            <li *ngIf="start > 1">
                <span
                    kendoGridFocusable
                    tabindex="0"
                    class="k-link k-pager-nav"
                    role="button"
                    [attr.aria-label]="pageLabel(start - 1)"
                    (click)="changePage(start - 2)"
                    (keydown.enter)="changePage(start - 2)">...</span>
            </li>
            <li *ngFor="let num of buttons">
                <span
                    kendoGridFocusable
                    tabindex="0"
                    role="button"
                    [attr.aria-label]="pageLabel(num)"
                    [ngClass]="{'k-link': true, 'k-selected':currentPage === num, 'k-pager-nav': true}"
                    (click)="changePage(num - 1)"
                    (keydown.enter)="changePage(num - 1)">
                    {{num}}
                </span>
            </li>
            <li *ngIf="end < totalPages">
                <span
                    kendoGridFocusable
                    tabindex="0"
                    class="k-link k-pager-nav"
                    role="button"
                    [attr.aria-label]="pageLabel(end + 1)"
                    (click)="changePage(end)"
                    (keydown.enter)="changePage(end)">...</span>
            </li>
        </ul>
    `
                }]
        }], ctorParameters: function () { return [{ type: i1.LocalizationService }, { type: i0.ChangeDetectorRef }, { type: i2.PagerContextService }]; }, propDecorators: { numbersWrapClass: [{
                type: HostBinding,
                args: ['class.k-pager-numbers-wrap']
            }], buttonCount: [{
                type: Input
            }] } });

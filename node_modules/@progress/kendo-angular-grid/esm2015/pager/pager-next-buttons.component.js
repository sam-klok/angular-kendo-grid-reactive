/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PagerElementComponent } from './pager-element.component';
import * as i0 from "@angular/core";
import * as i1 from "@progress/kendo-angular-l10n";
import * as i2 from "./pager-context.service";
import * as i3 from "./../navigation/navigation.service";
import * as i4 from "../navigation/focusable.directive";
import * as i5 from "@angular/common";
/**
 * Displays buttons for navigating to the next and to the last page ([see example]({% slug paging_grid %}#toc-pager-template)).
 */
export class PagerNextButtonsComponent extends PagerElementComponent {
    constructor(localization, pagerContext, cd, navigationService) {
        super(localization, pagerContext, cd);
        this.navigationService = navigationService;
    }
    /**
     * @hidden
     *
     * @readonly
     * @type {boolean}
     * @memberOf PagerNextButtonsComponent
     */
    get disabled() {
        return this.currentPage === this.totalPages || !this.total;
    }
    onChanges({ total, skip, pageSize }) {
        this.total = total;
        this.skip = skip;
        this.pageSize = pageSize;
        this.cd.markForCheck();
    }
}
PagerNextButtonsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: PagerNextButtonsComponent, deps: [{ token: i1.LocalizationService }, { token: i2.PagerContextService }, { token: i0.ChangeDetectorRef }, { token: i3.NavigationService }], target: i0.ɵɵFactoryTarget.Component });
PagerNextButtonsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: PagerNextButtonsComponent, selector: "kendo-pager-next-buttons", usesInheritance: true, ngImport: i0, template: `
        <span
            [kendoGridFocusable]="!disabled"
            tabindex="0"
            [title]="textFor('pagerNextPage')"
            (click)="currentPage !== totalPages ? changePage(currentPage) : false"
            (keydown.enter)="currentPage !== totalPages ? changePage(currentPage) : false"
            role="button"
            [ngClass]="{
                'k-link': true,
                'k-pager-nav': true,
                'k-disabled': disabled,
                '': true
            }">
            <span role="note" [attr.aria-label]="textFor('pagerNextPage')"
                [ngClass]="{
                    'k-icon':true,
                    'k-i-caret-alt-right': true
                }">
            </span>
        </span>
        <span
            [kendoGridFocusable]="!disabled"
            tabindex="0"
            [title]="textFor('pagerLastPage')"
            (click)="currentPage !== totalPages ? changePage(totalPages-1) : false"
            (keydown.enter)="currentPage !== totalPages ? changePage(totalPages-1) : false"
            role="button"
            [ngClass]="{
                'k-link': true,
                'k-pager-nav': true,
                'k-disabled': disabled,
                'k-pager-last': true
            }">
            <span role="note" [attr.aria-label]="textFor('pagerLastPage')"
                [ngClass]="{
                    'k-icon':true,
                    'k-i-caret-alt-to-right': true
                }">
            </span>
        </span>
    `, isInline: true, directives: [{ type: i4.FocusableDirective, selector: "[kendoGridFocusable],\n        [kendoGridEditCommand],\n        [kendoGridRemoveCommand],\n        [kendoGridSaveCommand],\n        [kendoGridCancelCommand],\n        [kendoGridSelectionCheckbox]\n    ", inputs: ["kendoGridFocusable"] }, { type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: PagerNextButtonsComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-pager-next-buttons',
                    template: `
        <span
            [kendoGridFocusable]="!disabled"
            tabindex="0"
            [title]="textFor('pagerNextPage')"
            (click)="currentPage !== totalPages ? changePage(currentPage) : false"
            (keydown.enter)="currentPage !== totalPages ? changePage(currentPage) : false"
            role="button"
            [ngClass]="{
                'k-link': true,
                'k-pager-nav': true,
                'k-disabled': disabled,
                '': true
            }">
            <span role="note" [attr.aria-label]="textFor('pagerNextPage')"
                [ngClass]="{
                    'k-icon':true,
                    'k-i-caret-alt-right': true
                }">
            </span>
        </span>
        <span
            [kendoGridFocusable]="!disabled"
            tabindex="0"
            [title]="textFor('pagerLastPage')"
            (click)="currentPage !== totalPages ? changePage(totalPages-1) : false"
            (keydown.enter)="currentPage !== totalPages ? changePage(totalPages-1) : false"
            role="button"
            [ngClass]="{
                'k-link': true,
                'k-pager-nav': true,
                'k-disabled': disabled,
                'k-pager-last': true
            }">
            <span role="note" [attr.aria-label]="textFor('pagerLastPage')"
                [ngClass]="{
                    'k-icon':true,
                    'k-i-caret-alt-to-right': true
                }">
            </span>
        </span>
    `
                }]
        }], ctorParameters: function () { return [{ type: i1.LocalizationService }, { type: i2.PagerContextService }, { type: i0.ChangeDetectorRef }, { type: i3.NavigationService }]; } });

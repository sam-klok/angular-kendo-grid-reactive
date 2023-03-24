/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { filtersByField } from '../base-filter-cell.component';
import { replaceMessagePlaceholder } from '../../utils';
import * as i0 from "@angular/core";
import * as i1 from "../filter.service";
import * as i2 from "../../common/single-popup.service";
import * as i3 from "@progress/kendo-angular-l10n";
import * as i4 from "./../../navigation/navigation.service";
import * as i5 from "./filter-menu-container.component";
import * as i6 from "@angular/common";
/**
 * @hidden
 */
export class FilterMenuComponent {
    constructor(filterService, popupService, localization, navigationService) {
        this.filterService = filterService;
        this.popupService = popupService;
        this.localization = localization;
        this.navigationService = navigationService;
        this.tabIndex = '-1';
    }
    get hasFilters() {
        return filtersByField(this.filter, (this.column || {}).field).length > 0;
    }
    /**
     * @hidden
     */
    get filterLabel() {
        const localizationMsg = this.localization.get('filterMenuTitle') || '';
        const columnName = this.column.title || this.column.field;
        return replaceMessagePlaceholder(localizationMsg, 'columnName', columnName);
    }
    toggle(anchor, template) {
        this.popupRef = this.popupService.open(anchor, template, this.popupRef);
        if (!this.popupRef) {
            if (this.navigationService.tableEnabled) {
                this.navigationService.focusCell(0, this.column.leafIndex);
            }
            else {
                this.anchor.nativeElement.focus();
            }
        }
        return false;
    }
    close() {
        this.popupService.destroy();
        if (this.navigationService.tableEnabled) {
            this.navigationService.focusCell(0, this.column.leafIndex);
        }
        else {
            this.anchor.nativeElement.focus();
        }
    }
}
FilterMenuComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: FilterMenuComponent, deps: [{ token: i1.FilterService }, { token: i2.SinglePopupService }, { token: i3.LocalizationService }, { token: i4.NavigationService }], target: i0.ɵɵFactoryTarget.Component });
FilterMenuComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: FilterMenuComponent, selector: "kendo-grid-filter-menu", inputs: { column: "column", filter: "filter", tabIndex: "tabIndex" }, viewQueries: [{ propertyName: "anchor", first: true, predicate: ["anchor"], descendants: true, static: true }, { propertyName: "template", first: true, predicate: ["template"], descendants: true, read: TemplateRef, static: true }], ngImport: i0, template: `
        <a #anchor
            [ngClass]="{'k-grid-filter-menu':true, 'k-grid-header-menu':true, 'k-active': hasFilters}"
            [tabindex]="tabIndex"
            (click)="toggle(anchor, template)"
            (keydown.enter)="$event.stopImmediatePropagation()"
            href="#"
            [attr.title]="filterLabel">
            <span class="k-icon k-i-filter"></span>
        </a>
        <ng-template #template>
            <kendo-grid-filter-menu-container
                [column]="column"
                [filter]="filter"
                (close)="close()"
                (keydown.escape)="close()"
                (keydown.enter)="$event.stopImmediatePropagation()"
                >
            </kendo-grid-filter-menu-container>
        </ng-template>
    `, isInline: true, components: [{ type: i5.FilterMenuContainerComponent, selector: "kendo-grid-filter-menu-container", inputs: ["column", "isLast", "isExpanded", "menuTabbingService", "filter", "actionsClass"], outputs: ["close"] }], directives: [{ type: i6.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: FilterMenuComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'kendo-grid-filter-menu',
                    template: `
        <a #anchor
            [ngClass]="{'k-grid-filter-menu':true, 'k-grid-header-menu':true, 'k-active': hasFilters}"
            [tabindex]="tabIndex"
            (click)="toggle(anchor, template)"
            (keydown.enter)="$event.stopImmediatePropagation()"
            href="#"
            [attr.title]="filterLabel">
            <span class="k-icon k-i-filter"></span>
        </a>
        <ng-template #template>
            <kendo-grid-filter-menu-container
                [column]="column"
                [filter]="filter"
                (close)="close()"
                (keydown.escape)="close()"
                (keydown.enter)="$event.stopImmediatePropagation()"
                >
            </kendo-grid-filter-menu-container>
        </ng-template>
    `
                }]
        }], ctorParameters: function () { return [{ type: i1.FilterService }, { type: i2.SinglePopupService }, { type: i3.LocalizationService }, { type: i4.NavigationService }]; }, propDecorators: { column: [{
                type: Input
            }], filter: [{
                type: Input
            }], anchor: [{
                type: ViewChild,
                args: ['anchor', { static: true }]
            }], template: [{
                type: ViewChild,
                args: ['template', { static: true, read: TemplateRef }]
            }], tabIndex: [{
                type: Input
            }] } });

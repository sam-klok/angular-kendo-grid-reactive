/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { MenuTabbingService } from './../filtering/menu/menu-tabbing.service';
import { Component, Input, TemplateRef, HostBinding, ViewChild, isDevMode } from '@angular/core';
import { ColumnMenuService } from './column-menu.service';
import { filtersByField } from '../filtering/base-filter-cell.component';
import { hasFilter, hasSort, hasLock, hasStick, hasColumnChooser, hasAutoSizeColumn, hasPosition, hasAutoSizeAllColumns } from './utils';
import { replaceMessagePlaceholder } from '../utils';
import { ColunnMenuErrorMessages } from '../common/error-messages';
import * as i0 from "@angular/core";
import * as i1 from "./../navigation/navigation.service";
import * as i2 from "../common/single-popup.service";
import * as i3 from "@progress/kendo-angular-l10n";
import * as i4 from "./column-menu.service";
import * as i5 from "../common/provider.service";
import * as i6 from "./column-menu-container.component";
import * as i7 from "./column-menu-sort.component";
import * as i8 from "./column-menu-lock.component";
import * as i9 from "./column-menu-stick.component";
import * as i10 from "./column-menu-position.component";
import * as i11 from "./column-menu-chooser.component";
import * as i12 from "./column-menu-autosize.component";
import * as i13 from "./column-menu-autosize-all.component";
import * as i14 from "./column-menu-filter.component";
import * as i15 from "@angular/common";
import * as i16 from "./column-menu-item.directive";
const POPUP_CLASS = 'k-grid-columnmenu-popup';
/**
 * Represents the [column menu]({% slug columnmenu_grid %}) component.
 */
export class ColumnMenuComponent {
    constructor(navigationService, popupService, localization, service, ctx) {
        this.navigationService = navigationService;
        this.popupService = popupService;
        this.localization = localization;
        this.service = service;
        this.ctx = ctx;
        /**
         * @hidden
         */
        this.standalone = true;
        /**
         * The settings for the Column Menu.
         */
        this.settings = {};
        /**
         * @hidden
         */
        this.sortable = true;
        /**
         * @hidden
         */
        this.tabIndex = '-1';
        /**
         * @hidden
         */
        this.expandedFilter = false;
        /**
         * @hidden
         */
        this.expandedColumns = false;
        /**
         * @hidden
         */
        this.expandedPosition = false;
        this.closeSubscription = service.closeMenu.subscribe(this.close.bind(this));
    }
    /**
     * @hidden
     */
    get isActive() {
        return (this.hasFilter && filtersByField(this.filter, this.column.field).length > 0) ||
            (!this.sortable && this.hasSort && this.sort.find(descriptor => descriptor.field === this.column.field));
    }
    /**
     * @hidden
     */
    get hasFilter() {
        return hasFilter(this.settings, this.column);
    }
    /**
     * @hidden
     */
    get hasSort() {
        return hasSort(this.settings, this.column);
    }
    /**
     * @hidden
     */
    get hasColumnChooser() {
        return hasColumnChooser(this.settings);
    }
    /**
     * @hidden
     */
    get hasAutoSizeColumn() {
        return hasAutoSizeColumn(this.settings);
    }
    /**
     * @hidden
     */
    get hasAutoSizeAllColumns() {
        return hasAutoSizeAllColumns(this.settings);
    }
    /**
     * @hidden
     */
    get hasLock() {
        return hasLock(this.settings, this.column);
    }
    /**
     * @hidden
     */
    get hasStick() {
        return hasStick(this.settings, this.column);
    }
    /**
     * @hidden
     */
    get hasPosition() {
        return hasPosition(this.settings, this.column);
    }
    ngAfterViewInit() {
        if (this.ctx.grid.virtualColumns && isDevMode()) {
            if (this.settings.autoSizeAllColumns) {
                this.settings.autoSizeAllColumns = false;
                console.warn(ColunnMenuErrorMessages.autoSizeAllColumns);
            }
            if (this.settings.autoSizeColumn) {
                this.settings.autoSizeColumn = false;
                console.warn(ColunnMenuErrorMessages.autoSizeColumn);
            }
        }
    }
    ngOnChanges() {
        this.service.column = this.column;
        this.service.sort = this.sort;
        this.service.filter = this.filter;
        this.service.sortable = this.sortable;
    }
    ngOnDestroy() {
        this.close();
        this.closeSubscription.unsubscribe();
    }
    /**
     * @hidden
     */
    toggle(e, anchor, template) {
        if (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
        }
        this.expandedFilter = this.getExpandedState(this.settings.filter);
        this.expandedColumns = this.getExpandedState(this.settings.columnChooser);
        this.expandedPosition = this.getExpandedState(this.settings.setColumnPosition);
        this.popupRef = this.popupService.open(anchor, template, this.popupRef, POPUP_CLASS);
        if (!this.popupRef) {
            if (this.navigationService.tableEnabled) {
                this.navigationService.focusCell(0, this.column.leafIndex);
            }
            else {
                this.anchor.nativeElement.focus();
            }
        }
    }
    /**
     * @hidden
     */
    close() {
        this.popupService.destroy();
        this.popupRef = null;
        if (this.navigationService.tableEnabled) {
            this.navigationService.focusCell(0, this.column.leafIndex);
        }
        else {
            this.anchor.nativeElement.focus();
        }
    }
    /**
     * @hidden
     */
    get columnMenuTitle() {
        const localizationMsg = this.localization.get('columnMenu') || '';
        const columnName = this.column.title || this.column.field;
        return replaceMessagePlaceholder(localizationMsg, 'columnName', columnName);
    }
    getExpandedState(menuItemSettings) {
        return typeof (menuItemSettings) === 'object' ? menuItemSettings.expanded : false;
    }
}
ColumnMenuComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ColumnMenuComponent, deps: [{ token: i1.NavigationService }, { token: i2.SinglePopupService }, { token: i3.LocalizationService }, { token: i4.ColumnMenuService }, { token: i5.ContextService }], target: i0.ɵɵFactoryTarget.Component });
ColumnMenuComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: ColumnMenuComponent, selector: "kendo-grid-column-menu", inputs: { standalone: "standalone", column: "column", settings: "settings", sort: "sort", filter: "filter", sortable: "sortable", columnMenuTemplate: "columnMenuTemplate", tabIndex: "tabIndex" }, host: { properties: { "class.k-grid-column-menu-standalone": "this.standalone" } }, providers: [
        ColumnMenuService,
        MenuTabbingService
    ], viewQueries: [{ propertyName: "anchor", first: true, predicate: ["anchor"], descendants: true, static: true }, { propertyName: "template", first: true, predicate: ["template"], descendants: true, read: TemplateRef, static: true }], usesOnChanges: true, ngImport: i0, template: `
        <a #anchor
            class="k-grid-header-menu k-grid-column-menu"
            [ngClass]="{ 'k-active': isActive }"
            (click)="toggle($event, anchor, template)"
            (keydown.enter)="$event.stopImmediatePropagation()"
            href="#"
            [tabindex]="tabIndex"
            [attr.title]="columnMenuTitle">
            <span class="k-icon k-i-more-vertical"></span>
        </a>
        <ng-template #template>
            <ng-container
                [ngTemplateOutlet]="column.columnMenuTemplateRef || columnMenuTemplate || defaultTemplate"
                [ngTemplateOutletContext]="{ service: service, column: column }">
            </ng-container>
        </ng-template>
        <ng-template #defaultTemplate>
            <kendo-grid-columnmenu-container
                (keydown.escape)="close()"
                (keydown.enter)="$event.stopImmediatePropagation()">
                <kendo-grid-columnmenu-sort #sortItem [kendoGridColumnMenuItem]="sortItem" *ngIf="hasSort" [service]="service">
                </kendo-grid-columnmenu-sort>
                <kendo-grid-columnmenu-lock #lockItem *ngIf="hasLock && !hasPosition" [kendoGridColumnMenuItem]="lockItem" [service]="service">
                </kendo-grid-columnmenu-lock>
                <kendo-grid-columnmenu-stick #stickItem *ngIf="hasStick && !hasPosition" [kendoGridColumnMenuItem]="stickItem" [service]="service">
                </kendo-grid-columnmenu-stick>
                <kendo-grid-columnmenu-position
                    #positionItem
                    *ngIf="hasPosition"
                    [showLock]="hasLock"
                    [showStick]="hasStick"
                    [kendoGridColumnMenuItem]="positionItem"
                    [service]="service"
                    [expanded]="expandedPosition">
                </kendo-grid-columnmenu-position>
                <span [style.borderColor]="'rgba(0, 0, 0, 0.08)'" *ngIf="hasColumnChooser || hasAutoSizeColumn || hasAutoSizeAllColumns" class="k-separator"></span>
                <kendo-grid-columnmenu-chooser
                    #chooserItem
                    *ngIf="hasColumnChooser"
                    [kendoGridColumnMenuItem]="chooserItem"
                    [service]="service"
                    [expanded]="expandedColumns">
                </kendo-grid-columnmenu-chooser>
                <kendo-grid-columnmenu-autosize-column
                    #autoSizeColumnItem
                    *ngIf="hasAutoSizeColumn"
                    [service]="service"
                    [kendoGridColumnMenuItem]="autoSizeColumnItem"
                    [column]="column"
                >
                </kendo-grid-columnmenu-autosize-column>

                <kendo-grid-columnmenu-autosize-all-columns
                    #autoSizeAllColumnsItem
                    *ngIf="hasAutoSizeAllColumns"
                    [service]="service"
                    [kendoGridColumnMenuItem]="autoSizeAllColumnsItem"
                >
                </kendo-grid-columnmenu-autosize-all-columns>
                <span [style.borderColor]="'rgba(0, 0, 0, 0.08)'" *ngIf="hasColumnChooser || hasAutoSizeColumn || hasAutoSizeAllColumns" class="k-separator"></span>
                <kendo-grid-columnmenu-filter
                    #filterItem
                    *ngIf="hasFilter"
                    [kendoGridColumnMenuItem]="filterItem"
                    [service]="service"
                    [expanded]="expandedFilter">
                </kendo-grid-columnmenu-filter>
            </kendo-grid-columnmenu-container>
        </ng-template>
    `, isInline: true, components: [{ type: i6.ColumnMenuContainerComponent, selector: "kendo-grid-columnmenu-container" }, { type: i7.ColumnMenuSortComponent, selector: "kendo-grid-columnmenu-sort" }, { type: i8.ColumnMenuLockComponent, selector: "kendo-grid-columnmenu-lock" }, { type: i9.ColumnMenuStickComponent, selector: "kendo-grid-columnmenu-stick" }, { type: i10.ColumnMenuPositionComponent, selector: "kendo-grid-columnmenu-position", inputs: ["expanded", "showLock", "showStick", "isLast"], outputs: ["expand", "collapse"] }, { type: i11.ColumnMenuChooserComponent, selector: "kendo-grid-columnmenu-chooser", inputs: ["expanded", "isLast"], outputs: ["expand", "collapse"] }, { type: i12.ColumnMenuAutoSizeColumnComponent, selector: "kendo-grid-columnmenu-autosize-column", inputs: ["column"] }, { type: i13.ColumnMenuAutoSizeAllColumnsComponent, selector: "kendo-grid-columnmenu-autosize-all-columns" }, { type: i14.ColumnMenuFilterComponent, selector: "kendo-grid-columnmenu-filter", inputs: ["expanded", "isLast"], outputs: ["expand", "collapse"] }], directives: [{ type: i15.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i15.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i15.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i16.ColumnMenuItemDirective, selector: "[kendoGridColumnMenuItem]", inputs: ["kendoGridColumnMenuItem"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ColumnMenuComponent, decorators: [{
            type: Component,
            args: [{
                    providers: [
                        ColumnMenuService,
                        MenuTabbingService
                    ],
                    selector: 'kendo-grid-column-menu',
                    template: `
        <a #anchor
            class="k-grid-header-menu k-grid-column-menu"
            [ngClass]="{ 'k-active': isActive }"
            (click)="toggle($event, anchor, template)"
            (keydown.enter)="$event.stopImmediatePropagation()"
            href="#"
            [tabindex]="tabIndex"
            [attr.title]="columnMenuTitle">
            <span class="k-icon k-i-more-vertical"></span>
        </a>
        <ng-template #template>
            <ng-container
                [ngTemplateOutlet]="column.columnMenuTemplateRef || columnMenuTemplate || defaultTemplate"
                [ngTemplateOutletContext]="{ service: service, column: column }">
            </ng-container>
        </ng-template>
        <ng-template #defaultTemplate>
            <kendo-grid-columnmenu-container
                (keydown.escape)="close()"
                (keydown.enter)="$event.stopImmediatePropagation()">
                <kendo-grid-columnmenu-sort #sortItem [kendoGridColumnMenuItem]="sortItem" *ngIf="hasSort" [service]="service">
                </kendo-grid-columnmenu-sort>
                <kendo-grid-columnmenu-lock #lockItem *ngIf="hasLock && !hasPosition" [kendoGridColumnMenuItem]="lockItem" [service]="service">
                </kendo-grid-columnmenu-lock>
                <kendo-grid-columnmenu-stick #stickItem *ngIf="hasStick && !hasPosition" [kendoGridColumnMenuItem]="stickItem" [service]="service">
                </kendo-grid-columnmenu-stick>
                <kendo-grid-columnmenu-position
                    #positionItem
                    *ngIf="hasPosition"
                    [showLock]="hasLock"
                    [showStick]="hasStick"
                    [kendoGridColumnMenuItem]="positionItem"
                    [service]="service"
                    [expanded]="expandedPosition">
                </kendo-grid-columnmenu-position>
                <span [style.borderColor]="'rgba(0, 0, 0, 0.08)'" *ngIf="hasColumnChooser || hasAutoSizeColumn || hasAutoSizeAllColumns" class="k-separator"></span>
                <kendo-grid-columnmenu-chooser
                    #chooserItem
                    *ngIf="hasColumnChooser"
                    [kendoGridColumnMenuItem]="chooserItem"
                    [service]="service"
                    [expanded]="expandedColumns">
                </kendo-grid-columnmenu-chooser>
                <kendo-grid-columnmenu-autosize-column
                    #autoSizeColumnItem
                    *ngIf="hasAutoSizeColumn"
                    [service]="service"
                    [kendoGridColumnMenuItem]="autoSizeColumnItem"
                    [column]="column"
                >
                </kendo-grid-columnmenu-autosize-column>

                <kendo-grid-columnmenu-autosize-all-columns
                    #autoSizeAllColumnsItem
                    *ngIf="hasAutoSizeAllColumns"
                    [service]="service"
                    [kendoGridColumnMenuItem]="autoSizeAllColumnsItem"
                >
                </kendo-grid-columnmenu-autosize-all-columns>
                <span [style.borderColor]="'rgba(0, 0, 0, 0.08)'" *ngIf="hasColumnChooser || hasAutoSizeColumn || hasAutoSizeAllColumns" class="k-separator"></span>
                <kendo-grid-columnmenu-filter
                    #filterItem
                    *ngIf="hasFilter"
                    [kendoGridColumnMenuItem]="filterItem"
                    [service]="service"
                    [expanded]="expandedFilter">
                </kendo-grid-columnmenu-filter>
            </kendo-grid-columnmenu-container>
        </ng-template>
    `
                }]
        }], ctorParameters: function () { return [{ type: i1.NavigationService }, { type: i2.SinglePopupService }, { type: i3.LocalizationService }, { type: i4.ColumnMenuService }, { type: i5.ContextService }]; }, propDecorators: { standalone: [{
                type: HostBinding,
                args: ['class.k-grid-column-menu-standalone']
            }, {
                type: Input
            }], column: [{
                type: Input
            }], settings: [{
                type: Input
            }], sort: [{
                type: Input
            }], filter: [{
                type: Input
            }], sortable: [{
                type: Input
            }], columnMenuTemplate: [{
                type: Input
            }], tabIndex: [{
                type: Input
            }], anchor: [{
                type: ViewChild,
                args: ['anchor', { static: true }]
            }], template: [{
                type: ViewChild,
                args: ['template', { static: true, read: TemplateRef }]
            }] } });

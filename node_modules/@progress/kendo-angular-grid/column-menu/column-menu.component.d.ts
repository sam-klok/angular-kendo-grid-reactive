/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NavigationService } from './../navigation/navigation.service';
import { TemplateRef, OnChanges, OnDestroy, ElementRef, AfterViewInit } from '@angular/core';
import { LocalizationService } from "@progress/kendo-angular-l10n";
import { SinglePopupService } from '../common/single-popup.service';
import { ColumnMenuService } from './column-menu.service';
import { ColumnMenuSettings } from './column-menu-settings.interface';
import { ContextService } from '../common/provider.service';
import * as i0 from "@angular/core";
/**
 * Represents the [column menu]({% slug columnmenu_grid %}) component.
 */
export declare class ColumnMenuComponent implements AfterViewInit, OnChanges, OnDestroy {
    protected navigationService: NavigationService;
    protected popupService: SinglePopupService;
    localization: LocalizationService;
    service: ColumnMenuService;
    private ctx;
    /**
     * @hidden
     */
    standalone: boolean;
    /**
     * The Grid column instance to control with the menu.
     */
    column: any;
    /**
     * The settings for the Column Menu.
     */
    settings: ColumnMenuSettings;
    /**
     * The descriptors by which the data will be sorted.
     * Typically bound to the same value as [GridComponent.sort]({% slug api_grid_gridcomponent %}#toc-sort).
     */
    sort: any;
    /**
     * The descriptor by which the data will be filtered.
     * Typically bound to the same value as [GridComponent.filter]({% slug api_grid_gridcomponent %}#toc-filter).
     */
    filter: any;
    /**
     * @hidden
     */
    sortable: any;
    /**
     * @hidden
     */
    columnMenuTemplate: TemplateRef<any>;
    /**
     * @hidden
     */
    tabIndex: string;
    anchor: ElementRef;
    template: TemplateRef<any>;
    /**
     * @hidden
     */
    expandedFilter: boolean;
    /**
     * @hidden
     */
    expandedColumns: boolean;
    /**
     * @hidden
     */
    expandedPosition: boolean;
    private popupRef;
    private closeSubscription;
    constructor(navigationService: NavigationService, popupService: SinglePopupService, localization: LocalizationService, service: ColumnMenuService, ctx: ContextService);
    /**
     * @hidden
     */
    get isActive(): boolean;
    /**
     * @hidden
     */
    get hasFilter(): boolean;
    /**
     * @hidden
     */
    get hasSort(): boolean;
    /**
     * @hidden
     */
    get hasColumnChooser(): boolean;
    /**
     * @hidden
     */
    get hasAutoSizeColumn(): boolean;
    /**
     * @hidden
     */
    get hasAutoSizeAllColumns(): boolean;
    /**
     * @hidden
     */
    get hasLock(): boolean;
    /**
     * @hidden
     */
    get hasStick(): boolean;
    /**
     * @hidden
     */
    get hasPosition(): boolean;
    ngAfterViewInit(): void;
    ngOnChanges(): void;
    ngOnDestroy(): void;
    /**
     * @hidden
     */
    toggle(e: any, anchor: any, template: any): void;
    /**
     * @hidden
     */
    close(): void;
    /**
     * @hidden
     */
    get columnMenuTitle(): string;
    private getExpandedState;
    static ɵfac: i0.ɵɵFactoryDeclaration<ColumnMenuComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ColumnMenuComponent, "kendo-grid-column-menu", never, { "standalone": "standalone"; "column": "column"; "settings": "settings"; "sort": "sort"; "filter": "filter"; "sortable": "sortable"; "columnMenuTemplate": "columnMenuTemplate"; "tabIndex": "tabIndex"; }, {}, never, never>;
}

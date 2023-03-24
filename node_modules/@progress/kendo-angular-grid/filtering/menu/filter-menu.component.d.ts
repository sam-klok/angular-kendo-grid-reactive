/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NavigationService } from './../../navigation/navigation.service';
import { ElementRef, TemplateRef } from '@angular/core';
import { FilterService } from "../filter.service";
import { CompositeFilterDescriptor } from "@progress/kendo-data-query";
import { ColumnComponent } from '../../columns/column.component';
import { SinglePopupService } from '../../common/single-popup.service';
import { LocalizationService } from "@progress/kendo-angular-l10n";
import * as i0 from "@angular/core";
/**
 * @hidden
 */
export declare class FilterMenuComponent {
    protected filterService: FilterService;
    protected popupService: SinglePopupService;
    protected localization: LocalizationService;
    protected navigationService: NavigationService;
    /**
     * The column with which the filter is associated.
     * @type {ColumnComponent}
     */
    column: ColumnComponent;
    /**
     * The current root filter.
     * @type {CompositeFilterDescriptor}
     */
    filter: CompositeFilterDescriptor;
    anchor: ElementRef;
    template: TemplateRef<any>;
    tabIndex: string;
    private popupRef;
    constructor(filterService: FilterService, popupService: SinglePopupService, localization: LocalizationService, navigationService: NavigationService);
    get hasFilters(): boolean;
    /**
     * @hidden
     */
    get filterLabel(): string;
    toggle(anchor: any, template: any): boolean;
    close(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FilterMenuComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FilterMenuComponent, "kendo-grid-filter-menu", never, { "column": "column"; "filter": "filter"; "tabIndex": "tabIndex"; }, {}, never, never>;
}

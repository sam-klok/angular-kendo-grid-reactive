/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { MenuTabbingService } from './menu-tabbing.service';
import { CompositeFilterDescriptor, FilterDescriptor } from '@progress/kendo-data-query';
import { ColumnComponent } from "../../columns/column.component";
import { StringFilterComponent } from '../string-filter.component';
import { FilterService } from '../filter.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import * as i0 from "@angular/core";
/**
 * Represents a string-filter menu component.
 * ([see example]({% slug filter_menu %}#toc-built-in-filter-menu-components)).
 */
export declare class StringFilterMenuComponent extends StringFilterComponent {
    logicOperators: Array<{
        text: string;
        value: "and" | "or";
    }>;
    /**
     * @hidden
     */
    get hostClasses(): boolean;
    /**
     * The column with which the filter is associated.
     * @type {ColumnComponent}
     */
    column: ColumnComponent;
    /**
     * The current menu filter.
     * @type {CompositeFilterDescriptor}
     */
    filter: CompositeFilterDescriptor;
    /**
     * Determines if the inputs of second criteria will displayed.
     */
    extra: boolean;
    /**
     * The `FilterService` instance which is responsible for handling the changes in the filter descriptor.
     */
    filterService: FilterService;
    /**
     * @hidden
     */
    menuTabbingService: MenuTabbingService;
    constructor(localization: LocalizationService);
    get firstFilter(): FilterDescriptor;
    get secondFilter(): FilterDescriptor;
    logicChange(value: 'and' | 'or'): void;
    get filterMenuDropDownLabel(): string;
    protected localizationChange(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<StringFilterMenuComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<StringFilterMenuComponent, "kendo-grid-string-filter-menu", never, { "column": "column"; "filter": "filter"; "extra": "extra"; "filterService": "filterService"; "menuTabbingService": "menuTabbingService"; }, {}, never, never>;
}

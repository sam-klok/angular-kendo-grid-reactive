/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { FilterDescriptor, CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { ColumnComponent } from "../../columns/column.component";
import { FilterService } from '../filter.service';
import { MenuTabbingService } from './menu-tabbing.service';
import * as i0 from "@angular/core";
/**
 * @hidden
 */
export declare class StringFilterMenuInputComponent {
    private localizationService;
    operators: Array<{
        text: string;
        value: string;
    }>;
    column: ColumnComponent;
    filter: CompositeFilterDescriptor;
    operator: string;
    currentFilter: FilterDescriptor;
    filterService: FilterService;
    isFirstDropDown: boolean;
    menuTabbingService: MenuTabbingService;
    constructor(localizationService: LocalizationService);
    get columnLabel(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<StringFilterMenuInputComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<StringFilterMenuInputComponent, "kendo-grid-string-filter-menu-input", never, { "operators": "operators"; "column": "column"; "filter": "filter"; "operator": "operator"; "currentFilter": "currentFilter"; "filterService": "filterService"; "isFirstDropDown": "isFirstDropDown"; "menuTabbingService": "menuTabbingService"; }, {}, never, never>;
}

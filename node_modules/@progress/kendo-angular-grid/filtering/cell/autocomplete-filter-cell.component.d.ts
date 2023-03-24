/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ColumnComponent } from '../../columns/column.component';
import { FilterService } from '../filter.service';
import { CompositeFilterDescriptor, FilterDescriptor } from '@progress/kendo-data-query';
import { BaseFilterCellComponent } from '../base-filter-cell.component';
import { FilterComponent } from '../filter-component.interface';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import * as i0 from "@angular/core";
/**
 * @hidden
 */
export declare class AutoCompleteFilterCellComponent extends BaseFilterCellComponent implements FilterComponent {
    protected localization: LocalizationService;
    showOperators: boolean;
    column: ColumnComponent;
    filter: CompositeFilterDescriptor;
    data: any[];
    set valueField(value: string);
    get valueField(): string;
    get currentFilter(): FilterDescriptor;
    get currentOperator(): string;
    protected defaultOperators: Array<{
        text: string;
        value: string;
    }>;
    private _valueField;
    constructor(filterService: FilterService, column: ColumnComponent, localization: LocalizationService);
    static ɵfac: i0.ɵɵFactoryDeclaration<AutoCompleteFilterCellComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AutoCompleteFilterCellComponent, "kendo-grid-autocomplete-filter-cell", never, { "showOperators": "showOperators"; "column": "column"; "filter": "filter"; "data": "data"; "valueField": "valueField"; }, {}, never, never>;
}

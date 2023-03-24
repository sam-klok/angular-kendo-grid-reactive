/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ColumnInfoService } from './../common/column-info.service';
import { ColumnBase } from '../columns/column-base';
import { DetailTemplateDirective } from '../rendering/details/detail-template.directive';
import { CompositeFilterDescriptor, GroupDescriptor } from '@progress/kendo-data-query';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { ColumnComponent } from '../columns/column.component';
import * as i0 from "@angular/core";
/**
 * @hidden
 */
export declare class FilterRowComponent {
    private localization;
    private columnInfoService;
    columns: ColumnBase[];
    filter: CompositeFilterDescriptor;
    groups: Array<GroupDescriptor>;
    detailTemplate: DetailTemplateDirective;
    logicalRowIndex: number;
    lockedColumnsCount: number;
    filterRowClass: boolean;
    constructor(localization: LocalizationService, columnInfoService: ColumnInfoService);
    addStickyStyles(column: ColumnBase): {
        [key: string]: any;
    };
    filterLabel(column: ColumnComponent): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<FilterRowComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FilterRowComponent, "[kendoGridFilterRow]", never, { "columns": "columns"; "filter": "filter"; "groups": "groups"; "detailTemplate": "detailTemplate"; "logicalRowIndex": "logicalRowIndex"; "lockedColumnsCount": "lockedColumnsCount"; }, {}, never, never>;
}

/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ColumnInfoService } from './../../common/column-info.service';
import { ColumnComponent } from '../../columns/column.component';
import { DetailTemplateDirective } from '../details/detail-template.directive';
import { GroupDescriptor } from '@progress/kendo-data-query';
import { ColumnBase } from "../../columns/column-base";
import * as i0 from "@angular/core";
/**
 * @hidden
 */
export declare class FooterComponent {
    private columnInfoService;
    columns: Array<ColumnComponent>;
    groups: Array<GroupDescriptor>;
    detailTemplate: DetailTemplateDirective;
    scrollable: boolean;
    lockedColumnsCount: number;
    logicalRowIndex: number;
    get footerClass(): boolean;
    constructor(columnInfoService: ColumnInfoService);
    get columnsToRender(): ColumnBase[];
    logicalColumnIndex(column: any): number;
    addStickyStyles(column: ColumnBase): {
        [key: string]: any;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<FooterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FooterComponent, "[kendoGridFooter]", never, { "columns": "columns"; "groups": "groups"; "detailTemplate": "detailTemplate"; "scrollable": "scrollable"; "lockedColumnsCount": "lockedColumnsCount"; "logicalRowIndex": "logicalRowIndex"; }, {}, never, never>;
}

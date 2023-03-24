/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { DoCheck } from '@angular/core';
import { GroupDescriptor } from '@progress/kendo-data-query';
import { GroupInfoService } from './group-info.service';
import { GroupsService } from './groups.service';
import { GroupItem } from '../data/group-item.interface';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import * as i0 from "@angular/core";
/**
 * @hidden
 */
export declare class GroupHeaderComponent implements DoCheck {
    groupsService: GroupsService;
    groupInfoService: GroupInfoService;
    private localization;
    rowIndex: number;
    logicalRowIndex: number;
    item: GroupItem;
    skipGroupDecoration: boolean;
    hasDetails: boolean;
    totalColumnsCount: number;
    hasGroupHeaderColumn: boolean;
    groupHeaderColumns: any[];
    columns: any;
    groups: Array<GroupDescriptor>;
    isExpanded: boolean;
    get groupItemClass(): boolean;
    constructor(groupsService: GroupsService, groupInfoService: GroupInfoService, localization: LocalizationService);
    ngDoCheck(): void;
    prefixGroupCell(item: GroupItem): any[];
    toggleGroup(item: GroupItem): boolean;
    groupSpan(item: GroupItem): number;
    logicalColSpan(): number;
    ariaRole(): string;
    formatForGroup(item: GroupItem): string;
    groupTitle(item: GroupItem): string;
    groupHeaderTemplate(item: GroupItem): any;
    get groupButtonTitle(): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<GroupHeaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GroupHeaderComponent, "[kendoGridGroupHeader]", never, { "rowIndex": "rowIndex"; "logicalRowIndex": "logicalRowIndex"; "item": "item"; "skipGroupDecoration": "skipGroupDecoration"; "hasDetails": "hasDetails"; "totalColumnsCount": "totalColumnsCount"; "hasGroupHeaderColumn": "hasGroupHeaderColumn"; "groupHeaderColumns": "groupHeaderColumns"; "columns": "columns"; "groups": "groups"; }, {}, never, never>;
}

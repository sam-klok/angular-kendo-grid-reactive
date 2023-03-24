/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, HostBinding, Input } from '@angular/core';
import { columnsSpan } from '../columns/column-common';
import { getGroupRowArgs } from './utils';
import * as i0 from "@angular/core";
import * as i1 from "./groups.service";
import * as i2 from "./group-info.service";
import * as i3 from "@progress/kendo-angular-l10n";
import * as i4 from "@angular/common";
import * as i5 from "../navigation/logical-cell.directive";
import * as i6 from "../rendering/common/template-context.directive";
import * as i7 from "../rendering/common/field-accessor.pipe";
/**
 * @hidden
 */
export class GroupHeaderComponent {
    constructor(groupsService, groupInfoService, localization) {
        this.groupsService = groupsService;
        this.groupInfoService = groupInfoService;
        this.localization = localization;
        this.skipGroupDecoration = false;
        this.hasDetails = false;
        this.totalColumnsCount = 0;
        this.groups = [];
        this.isExpanded = false;
    }
    get groupItemClass() {
        return true;
    }
    ngDoCheck() {
        const groupArgs = {
            group: this.item.data,
            groupIndex: this.item.index,
            parentGroup: getGroupRowArgs(this.item.parentGroup)
        };
        this.isExpanded = this.groupsService.isExpanded(groupArgs);
    }
    prefixGroupCell(item) {
        return new Array(item.level);
    }
    toggleGroup(item) {
        this.groupsService.toggleRow(item);
        return false;
    }
    groupSpan(item) {
        const groupCount = (this.groups || []).length;
        const detailOffset = this.hasDetails ? 1 : 0;
        if (this.hasGroupHeaderColumn) {
            return groupCount + 1 + detailOffset - item.level;
        }
        let columnCount = columnsSpan(this.columns);
        if (this.skipGroupDecoration) {
            return columnCount;
        }
        return groupCount + columnCount + detailOffset - item.level;
    }
    logicalColSpan() {
        return this.skipGroupDecoration ? 1 : this.totalColumnsCount;
    }
    ariaRole() {
        if (this.skipGroupDecoration) {
            return 'presentation';
        }
        return 'gridcell';
    }
    formatForGroup(item) {
        return this.groupInfoService.formatForGroup(item);
    }
    groupTitle(item) {
        return this.groupInfoService.groupTitle(item);
    }
    groupHeaderTemplate(item) {
        return this.groupInfoService.groupHeaderTemplate(item);
    }
    get groupButtonTitle() {
        const messageKey = this.isExpanded ? 'groupCollapse' : 'groupExpand';
        return this.localization.get(messageKey);
    }
}
GroupHeaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: GroupHeaderComponent, deps: [{ token: i1.GroupsService }, { token: i2.GroupInfoService }, { token: i3.LocalizationService }], target: i0.ɵɵFactoryTarget.Component });
GroupHeaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: GroupHeaderComponent, selector: "[kendoGridGroupHeader]", inputs: { rowIndex: "rowIndex", logicalRowIndex: "logicalRowIndex", item: "item", skipGroupDecoration: "skipGroupDecoration", hasDetails: "hasDetails", totalColumnsCount: "totalColumnsCount", hasGroupHeaderColumn: "hasGroupHeaderColumn", groupHeaderColumns: "groupHeaderColumns", columns: "columns", groups: "groups" }, host: { properties: { "class.k-grouping-row": "this.groupItemClass" } }, ngImport: i0, template: `
        <ng-container *ngIf="!skipGroupDecoration">
            <td class="k-group-cell"
                role="presentation"
                *ngFor="let g of prefixGroupCell(item)"></td>
        </ng-container>
        <td [attr.colspan]="groupSpan(item)" *ngIf="!(skipGroupDecoration && hasGroupHeaderColumn)"
            [attr.role]="ariaRole()"
            aria-selected="false"
            [attr.aria-expanded]="isExpanded"
            kendoGridLogicalCell
            [logicalRowIndex]="logicalRowIndex"
            [logicalColIndex]="0"
            [logicalSlaveCell]="skipGroupDecoration"
            [groupItem]="item"
            [colSpan]="logicalColSpan()">
            <p class="k-reset">
                <ng-container *ngIf="!skipGroupDecoration">
                    <a href="#" tabindex="-1" (click)="toggleGroup(item)"
                        class="k-icon"
                        [ngClass]="{ 'k-i-caret-alt-down': isExpanded, 'k-i-caret-alt-right': !isExpanded }" role="presentation"
                        [attr.title]="groupButtonTitle"
                        [attr.aria-label]="groupButtonTitle">
                    </a>
                    <ng-container *ngIf="!groupHeaderTemplate(item)">
                    {{groupTitle(item)}}: {{item.data | valueOf:"value": formatForGroup(item)}}
                    </ng-container>
                    <ng-template
                        [templateContext]="{
                            templateRef: groupHeaderTemplate(item),
                            group: item.data,
                            aggregates: item.data?.aggregates,
                            value: item.data?.value,
                            field: item.data?.field,
                            index: item.index,
                            expanded: isExpanded,
                            $implicit: item.data
                            }">
                    </ng-template>
                </ng-container>
            </p>
        </td>
        <ng-container *ngIf="hasGroupHeaderColumn">
            <td *ngFor="let column of groupHeaderColumns; let index = index"
                role="gridcell"
                aria-selected="false"
                kendoGridLogicalCell
                [logicalRowIndex]="logicalRowIndex"
                [logicalColIndex]="index + 1"
                [logicalSlaveCell]="false"
                [groupItem]="item"
                [colSpan]="1"
            >
                <ng-template *ngIf="column.groupHeaderColumnTemplateRef" [ngTemplateOutlet]="column.groupHeaderColumnTemplateRef"
                    [ngTemplateOutletContext]="{
                        group: item.data,
                        aggregates: item.data?.aggregates,
                        value: item.data?.value,
                        field: item.data?.field,
                        index: item.index,
                        $implicit: item.data
                        }">
                </ng-template>
            </td>
        </ng-container>
    `, isInline: true, directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i5.LogicalCellDirective, selector: "[kendoGridLogicalCell]", inputs: ["logicalColIndex", "logicalRowIndex", "logicalSlaveCell", "colIndex", "colSpan", "rowSpan", "groupItem", "dataRowIndex", "dataItem", "detailExpandCell", "headerLabelText"] }, { type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i6.TemplateContextDirective, selector: "[templateContext]", inputs: ["templateContext"] }, { type: i4.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], pipes: { "valueOf": i7.FieldAccessorPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: GroupHeaderComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[kendoGridGroupHeader]',
                    template: `
        <ng-container *ngIf="!skipGroupDecoration">
            <td class="k-group-cell"
                role="presentation"
                *ngFor="let g of prefixGroupCell(item)"></td>
        </ng-container>
        <td [attr.colspan]="groupSpan(item)" *ngIf="!(skipGroupDecoration && hasGroupHeaderColumn)"
            [attr.role]="ariaRole()"
            aria-selected="false"
            [attr.aria-expanded]="isExpanded"
            kendoGridLogicalCell
            [logicalRowIndex]="logicalRowIndex"
            [logicalColIndex]="0"
            [logicalSlaveCell]="skipGroupDecoration"
            [groupItem]="item"
            [colSpan]="logicalColSpan()">
            <p class="k-reset">
                <ng-container *ngIf="!skipGroupDecoration">
                    <a href="#" tabindex="-1" (click)="toggleGroup(item)"
                        class="k-icon"
                        [ngClass]="{ 'k-i-caret-alt-down': isExpanded, 'k-i-caret-alt-right': !isExpanded }" role="presentation"
                        [attr.title]="groupButtonTitle"
                        [attr.aria-label]="groupButtonTitle">
                    </a>
                    <ng-container *ngIf="!groupHeaderTemplate(item)">
                    {{groupTitle(item)}}: {{item.data | valueOf:"value": formatForGroup(item)}}
                    </ng-container>
                    <ng-template
                        [templateContext]="{
                            templateRef: groupHeaderTemplate(item),
                            group: item.data,
                            aggregates: item.data?.aggregates,
                            value: item.data?.value,
                            field: item.data?.field,
                            index: item.index,
                            expanded: isExpanded,
                            $implicit: item.data
                            }">
                    </ng-template>
                </ng-container>
            </p>
        </td>
        <ng-container *ngIf="hasGroupHeaderColumn">
            <td *ngFor="let column of groupHeaderColumns; let index = index"
                role="gridcell"
                aria-selected="false"
                kendoGridLogicalCell
                [logicalRowIndex]="logicalRowIndex"
                [logicalColIndex]="index + 1"
                [logicalSlaveCell]="false"
                [groupItem]="item"
                [colSpan]="1"
            >
                <ng-template *ngIf="column.groupHeaderColumnTemplateRef" [ngTemplateOutlet]="column.groupHeaderColumnTemplateRef"
                    [ngTemplateOutletContext]="{
                        group: item.data,
                        aggregates: item.data?.aggregates,
                        value: item.data?.value,
                        field: item.data?.field,
                        index: item.index,
                        $implicit: item.data
                        }">
                </ng-template>
            </td>
        </ng-container>
    `
                }]
        }], ctorParameters: function () { return [{ type: i1.GroupsService }, { type: i2.GroupInfoService }, { type: i3.LocalizationService }]; }, propDecorators: { rowIndex: [{
                type: Input
            }], logicalRowIndex: [{
                type: Input
            }], item: [{
                type: Input
            }], skipGroupDecoration: [{
                type: Input
            }], hasDetails: [{
                type: Input
            }], totalColumnsCount: [{
                type: Input
            }], hasGroupHeaderColumn: [{
                type: Input
            }], groupHeaderColumns: [{
                type: Input
            }], columns: [{
                type: Input
            }], groups: [{
                type: Input
            }], groupItemClass: [{
                type: HostBinding,
                args: ['class.k-grouping-row']
            }] } });

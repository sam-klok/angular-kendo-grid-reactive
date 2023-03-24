/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { nodesToArray } from './../utils';
import { Component, Input } from '@angular/core';
import { isChanged, isPresent } from '../utils';
import { columnsSpan, columnsToRender } from "../columns/column-common";
import { closest, closestInScope, hasClasses, isFocusableWithTabKey, matchesClasses, matchesNodeName } from './common/dom-queries';
import { hasFilterRow } from '../filtering/filterable';
import { Keys } from '@progress/kendo-angular-common';
import { defaultTrackBy } from '../common/default-track-by';
import { NON_DATA_CELL_CLASSES, NON_DATA_ROW_CLASSES, IGNORE_TARGET_CLASSSES, IGNORE_CONTAINER_CLASSES } from './constants';
import * as i0 from "@angular/core";
import * as i1 from "./details/details.service";
import * as i2 from "../grouping/groups.service";
import * as i3 from "../data/change-notification.service";
import * as i4 from "../editing/edit.service";
import * as i5 from "@progress/kendo-angular-l10n";
import * as i6 from "../common/dom-events.service";
import * as i7 from "../selection/selection.service";
import * as i8 from "../selection/cell-selection.service";
import * as i9 from "../common/column-info.service";
import * as i10 from "../navigation/navigation.service";
import * as i11 from "./cell.component";
import * as i12 from "../grouping/group-header.component";
import * as i13 from "@progress/kendo-angular-common";
import * as i14 from "@angular/common";
import * as i15 from "../navigation/logical-row.directive";
import * as i16 from "../navigation/logical-cell.directive";
import * as i17 from "./common/template-context.directive";
const columnCellIndex = (cell, cells) => {
    let cellIndex = 0;
    for (let idx = 0; idx < cells.length; idx++) {
        if (cells[idx] === cell) {
            return cellIndex;
        }
        if (!hasClasses(cells[idx], 'k-hierarchy-cell k-group-cell')) {
            cellIndex++;
        }
    }
};
/**
 * @hidden
 */
export class TableBodyComponent {
    constructor(detailsService, groupsService, changeNotification, editService, localization, ngZone, renderer, element, domEvents, selectionService, cellSelectionService, columnInfoService, navigationService) {
        this.detailsService = detailsService;
        this.groupsService = groupsService;
        this.changeNotification = changeNotification;
        this.editService = editService;
        this.localization = localization;
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.element = element;
        this.domEvents = domEvents;
        this.selectionService = selectionService;
        this.cellSelectionService = cellSelectionService;
        this.columnInfoService = columnInfoService;
        this.navigationService = navigationService;
        this.columns = [];
        this.groups = [];
        this.skip = 0;
        this.noRecordsText = this.localization.get('noRecords');
        this.isLocked = false;
        this.skipGroupDecoration = false;
        this.showGroupFooters = false;
        this.lockedColumnsCount = 0;
        this.totalColumnsCount = 0;
        this.trackBy = defaultTrackBy;
        this.rowClass = () => null;
        this.cellKeydownSubscription = this.navigationService.cellKeydown.subscribe((args) => this.cellKeydownHandler(args));
        this.trackByWrapper = this.trackByWrapper.bind(this);
        this.trackByColumns = this.trackByColumns.bind(this);
    }
    get newDataItem() {
        return this.editService.newDataItem;
    }
    // Number of unlocked columns in the next table, if any
    get unlockedColumnsCount() {
        return this.totalColumnsCount - this.lockedColumnsCount - (this.allColumns || this.columns).length;
    }
    isAriaSelected(item, column) {
        return this.cellSelectionService.isCellSelected(item, column) ||
            this.isRowSelected(item) ? 'true' : 'false';
    }
    toggleRow(index, dataItem) {
        this.detailsService.toggleRow(index, dataItem);
        return false;
    }
    isExpanded(viewItem) {
        return this.detailsService.isExpanded(viewItem.index, viewItem.data);
    }
    detailButtonStyles(viewItem) {
        const expanded = this.isExpanded(viewItem);
        return expanded ? 'k-i-minus' : 'k-i-plus';
    }
    detailButtonTitle(viewItem) {
        const messageKey = this.isExpanded(viewItem) ? 'detailCollapse' : 'detailExpand';
        return this.localization.get(messageKey);
    }
    isGroup(item) {
        return item.type === 'group';
    }
    isDataItem(item) {
        return !this.isGroup(item) && !this.isFooter(item);
    }
    isFooter(item) {
        return item.type === 'footer';
    }
    isFooterItemInExpandedGroup(item) {
        const footerItem = { data: item.data, index: item.groupIndex, parentGroup: item.group.parentGroup };
        return this.isInExpandedGroup(footerItem);
    }
    isDataItemInExpandedGroup(item) {
        const dataItem = { data: item.group.data, index: item.groupIndex, parentGroup: item.group.parentGroup };
        return this.isInExpandedGroup(dataItem);
    }
    isInExpandedGroup(item) {
        return this.groupsService.isInExpandedGroup(item);
    }
    isParentGroupExpanded(item) {
        return this.groupsService.isInExpandedGroup(item.parentGroup);
    }
    isOdd(item) {
        return item.index % 2 !== 0;
    }
    isSelectable() {
        return this.selectable && this.selectable.enabled !== false;
    }
    isRowSelected(item) {
        return this.selectionService.isSelected(item.index);
    }
    trackByWrapper(index, item) {
        if (item.type === 'data') {
            item.isEditing = this.editService.hasEdited(item.index);
        }
        return this.trackBy(index, item);
    }
    trackByColumns(index, item) {
        return this.virtualColumns ? index : item;
    }
    ngDoCheck() {
        if (this.hasGroupHeaderColumn) {
            this.groupHeaderColumns = columnsToRender(this.skipGroupDecoration ? this.columns : this.columns.toArray().slice(1));
        }
        else {
            this.groupHeaderColumns = [];
        }
        if (this.isLocked) {
            this.groupHeaderSlaveCellsCount =
                this.hasGroupHeaderColumn ? this.columnsContainer.nonLockedColumnsToRender.length : 1;
        }
        else {
            this.groupHeaderSlaveCellsCount = 0;
        }
    }
    ngAfterViewChecked() {
        if (this.rowSticky) {
            this.applyStickyRowsStyling();
        }
    }
    ngOnChanges(changes) {
        if (isChanged('columns', changes, false)) {
            this.changeNotification.notify();
        }
    }
    logicalRowIndex(rowIndex) {
        let pos = this.skip + rowIndex;
        if (this.hasDetailTemplate) {
            pos *= 2;
        }
        const absoluteRowIndex = 1 + pos;
        const addRowOffset = this.editService.hasNewItem ? 1 : 0;
        const filterRowOffset = hasFilterRow(this.filterable) ? 1 : 0;
        const headerRowCount = this.columnInfoService.totalLevels + filterRowOffset + addRowOffset;
        return absoluteRowIndex + headerRowCount;
    }
    addRowLogicalIndex() {
        return this.columnInfoService.totalLevels + 1 +
            (hasFilterRow(this.filterable) ? 1 : 0);
    }
    logicalColIndex(column) {
        if (!isPresent(column.leafIndex)) {
            return -1;
        }
        return column.leafIndex + (this.hasDetailTemplate ? 1 : 0);
    }
    ngOnInit() {
        this.ngZone.runOutsideAngular(() => {
            const clickHandler = this.clickHandler.bind(this);
            const mousedownSubscription = this.renderer.listen(this.element.nativeElement, 'mousedown', clickHandler);
            const mouseupSubscription = this.renderer.listen(this.element.nativeElement, 'mouseup', clickHandler);
            const clickSubscription = this.renderer.listen(this.element.nativeElement, 'click', clickHandler);
            const contextmenuSubscription = this.renderer.listen(this.element.nativeElement, 'contextmenu', clickHandler);
            const touchstartSubscription = this.renderer.listen(this.element.nativeElement, 'touchstart', clickHandler);
            const touchendSubscription = this.renderer.listen(this.element.nativeElement, 'touchend', clickHandler);
            this.clickSubscription = () => {
                mousedownSubscription();
                mouseupSubscription();
                clickSubscription();
                contextmenuSubscription();
            };
            this.touchSubscription = () => {
                touchstartSubscription();
                touchendSubscription();
            };
        });
        let originalNoRecordText = this.localization.get('noRecords');
        this.l10nSubscription = this.localization.changes.subscribe(() => {
            if (this.noRecordsText === originalNoRecordText) {
                this.noRecordsText = this.localization.get('noRecords');
                originalNoRecordText = this.noRecordsText;
            }
        });
    }
    ngOnDestroy() {
        if (this.clickSubscription) {
            this.clickSubscription();
        }
        if (this.touchSubscription) {
            this.touchSubscription();
        }
        if (this.l10nSubscription) {
            this.l10nSubscription.unsubscribe();
        }
        this.cellKeydownSubscription.unsubscribe();
        clearTimeout(this.clickTimeout);
    }
    isEditingCell(index, column) {
        return this.editService.isEditing() && this.editService.isEditedColumn(index, column);
    }
    isEditingRow(index) {
        return this.editService.isEditing() && this.editService.hasEdited(index);
    }
    get hasGroupHeaderColumn() {
        return this.columnsContainer.hasGroupHeaderColumn;
    }
    get columnsContainer() {
        return this.columnInfoService.columnsContainer;
    }
    get columnsSpan() {
        return columnsSpan(this.columns);
    }
    get allColumnsSpan() {
        return columnsSpan(this.allColumns || this.columns);
    }
    get colSpan() {
        return this.columnsSpan + this.groups.length + (this.hasDetailTemplate ? 1 : 0);
    }
    get footerColumns() {
        return this.isLocked ? this.columnsContainer.lockedColumnsToRender : this.columnsContainer.nonLockedColumnsToRender;
    }
    showGroupHeader(item) {
        return !item.data.skipHeader;
    }
    addStickyColumnStyles(column) {
        const stickyStyles = this.columnInfoService.stickyColumnsStyles(column);
        return Object.assign(Object.assign({}, column.style), stickyStyles);
    }
    resizeHandler() {
        this.applyStickyRowsStyling();
    }
    get hasDetailTemplate() {
        return isPresent(this.detailTemplate);
    }
    clickHandler(eventArg) {
        const element = this.element.nativeElement;
        const target = this.eventTarget(eventArg);
        let cell, row, body, gridElement;
        let currentTarget = target;
        do {
            cell = closest(currentTarget, matchesNodeName('td'));
            row = closest(cell, matchesNodeName('tr'));
            body = closest(row, matchesNodeName('tbody'));
            currentTarget = body;
            gridElement = closestInScope(currentTarget, matchesClasses('k-grid'), element);
        } while (body && body !== element && !gridElement);
        if (cell && !hasClasses(cell, NON_DATA_CELL_CLASSES) &&
            !hasClasses(row, NON_DATA_ROW_CLASSES) &&
            body === element && !gridElement) {
            this.editService.preventCellClose();
            const focusable = target !== cell && isFocusableWithTabKey(target, false);
            if (!focusable && !matchesNodeName('label')(target) && !hasClasses(target, IGNORE_TARGET_CLASSSES) &&
                !closestInScope(target, matchesClasses(IGNORE_CONTAINER_CLASSES), cell)) {
                const args = this.cellClickArgs(cell, row, eventArg);
                if (eventArg.type === 'mousedown' || eventArg.type === 'touchstart') {
                    this.domEvents.cellMousedown.emit(args);
                }
                else if (eventArg.type === 'mouseup' || eventArg.type === 'touchend') {
                    this.domEvents.cellMouseup.emit(args);
                }
                else {
                    if (args.isEditedColumn || !this.editService.closeCell(eventArg)) {
                        if (eventArg.type === 'click') {
                            this.clickTimeout = setTimeout(() => {
                                this.emitCellClick(args);
                            }, 0);
                        }
                        else {
                            this.emitCellClick(args);
                        }
                    }
                }
            }
        }
    }
    emitCellClick(args) {
        this.domEvents.cellClick.emit(Object.assign(args, {
            isEdited: args.isEditedRow || args.isEditedColumn
        }));
    }
    cellKeydownHandler(args) {
        if (args.keyCode === Keys.Enter) {
            this.clickHandler(args);
        }
    }
    cellClickArgs(cell, row, eventArg) {
        const index = columnCellIndex(cell, row.cells);
        const column = this.columns.toArray()[index];
        const columnIndex = this.lockedColumnsCount + index;
        let rowIndex = row.getAttribute('data-kendo-grid-item-index');
        rowIndex = rowIndex ? parseInt(rowIndex, 10) : -1;
        const dataItem = rowIndex === -1 ? this.editService.newDataItem : this.data.at(rowIndex - this.skip);
        const isEditedColumn = this.editService.isEditedColumn(rowIndex, column);
        const isEditedRow = this.editService.isEdited(rowIndex);
        const type = eventArg.type === 'keydown' ? 'click' : eventArg.type;
        return {
            column: column,
            columnIndex: columnIndex,
            dataItem: dataItem,
            isEditedColumn: isEditedColumn,
            isEditedRow: isEditedRow,
            originalEvent: eventArg,
            rowIndex: rowIndex,
            type: type
        };
    }
    eventTarget(args) {
        if (args.type === 'touchend') {
            const touch = args.changedTouches[0];
            return document.elementFromPoint(touch.clientX, touch.clientY);
        }
        return args.target;
    }
    applyStickyRowsStyling() {
        const stickyRows = nodesToArray(this.element.nativeElement.querySelectorAll('.k-grid-row-sticky'));
        const length = stickyRows.length;
        if (length) {
            let accumulatedHeight = 0;
            const stickyRowsOffsets = [];
            stickyRows.forEach(row => {
                const rowHeight = row.getBoundingClientRect().height;
                stickyRowsOffsets.push({ accumulatedHeight, rowHeight });
                accumulatedHeight += rowHeight;
            });
            stickyRows.forEach((row, index) => {
                this.renderer.setStyle(row, 'top', `${stickyRowsOffsets[index].accumulatedHeight}px`);
                this.renderer.setStyle(row, 'bottom', `${accumulatedHeight - stickyRowsOffsets[index].accumulatedHeight - stickyRowsOffsets[index].rowHeight}px`);
            });
        }
    }
}
TableBodyComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: TableBodyComponent, deps: [{ token: i1.DetailsService }, { token: i2.GroupsService }, { token: i3.ChangeNotificationService }, { token: i4.EditService }, { token: i5.LocalizationService }, { token: i0.NgZone }, { token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i6.DomEventsService }, { token: i7.SelectionService }, { token: i8.CellSelectionService }, { token: i9.ColumnInfoService }, { token: i10.NavigationService }], target: i0.ɵɵFactoryTarget.Component });
TableBodyComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: TableBodyComponent, selector: "[kendoGridTableBody]", inputs: { columns: "columns", allColumns: "allColumns", groups: "groups", detailTemplate: "detailTemplate", noRecordsTemplate: "noRecordsTemplate", data: "data", skip: "skip", selectable: "selectable", filterable: "filterable", noRecordsText: "noRecordsText", isLocked: "isLocked", isLoading: "isLoading", isVirtual: "isVirtual", cellLoadingTemplate: "cellLoadingTemplate", skipGroupDecoration: "skipGroupDecoration", showGroupFooters: "showGroupFooters", lockedColumnsCount: "lockedColumnsCount", totalColumnsCount: "totalColumnsCount", virtualColumns: "virtualColumns", trackBy: "trackBy", rowSticky: "rowSticky", rowClass: "rowClass" }, usesOnChanges: true, ngImport: i0, template: `
    <ng-container *ngIf="editService.hasNewItem">
        <tr class="k-grid-add-row k-grid-edit-row k-master-row"
            kendoGridLogicalRow
                [logicalRowIndex]="addRowLogicalIndex()"
                [logicalSlaveRow]="lockedColumnsCount > 0"
                [logicalCellsCount]="columns.length"
                [logicalSlaveCellsCount]="unlockedColumnsCount">
            <ng-container *ngIf="!skipGroupDecoration">
                <td class="k-group-cell" *ngFor="let g of groups" role="presentation"></td>
            </ng-container>
            <td class="k-hierarchy-cell"
                *ngIf="detailTemplate?.templateRef"
                kendoGridLogicalCell
                    [logicalRowIndex]="addRowLogicalIndex()"
                    [logicalColIndex]="0"
                    aria-selected="false"
                >
            </td>
            <td *ngFor="let column of columns; let columnIndex = index; trackBy: trackByColumns;"
                kendoGridCell
                    [rowIndex]="-1"
                    [columnIndex]="lockedColumnsCount + columnIndex"
                    [isNew]="true"
                    [column]="column"
                    [dataItem]="newDataItem"
                [class.k-grid-content-sticky]="column.sticky"
                [ngClass]="column.cssClass"
                [style.left]="column.sticky ? '0' : undefined"
                [ngStyle]="column.sticky ? addStickyColumnStyles(column) : column.style"
                [attr.colspan]="column.colspan"
                kendoGridLogicalCell
                    [logicalRowIndex]="addRowLogicalIndex()"
                    [logicalColIndex]="logicalColIndex(column)"
                    [colSpan]="column.colspan"
                role="gridcell">
            </td>
        </tr>
    </ng-container>
    <tr *ngIf="data?.length === 0 || data === null" class="k-grid-norecords">
        <td [attr.colspan]="colSpan">
            <ng-template
                *ngIf="noRecordsTemplate?.templateRef"
                [templateContext]="{
                    templateRef: noRecordsTemplate?.templateRef
                 }">
            </ng-template>
            <ng-container *ngIf="!noRecordsTemplate?.templateRef">
                {{noRecordsText}}
            </ng-container>
        </td>
    </tr>

    <ng-container *ngFor="let item of data; trackBy: trackByWrapper; let rowIndex = index;">
        <tr *ngIf="isGroup(item) && isParentGroupExpanded($any(item)) && showGroupHeader(item)"
            kendoGridGroupHeader
                [columns]="columns"
                [groups]="groups"
                [item]="$any(item)"
                [hasDetails]="!!detailTemplate?.templateRef"
                [skipGroupDecoration]="skipGroupDecoration"
                [hasGroupHeaderColumn]="hasGroupHeaderColumn"
                [groupHeaderColumns]="groupHeaderColumns"
                [rowIndex]="rowIndex + 1"
                [totalColumnsCount]="totalColumnsCount"
            kendoGridLogicalRow
                [logicalRowIndex]="logicalRowIndex(rowIndex)"
                [logicalSlaveRow]="lockedColumnsCount > 0"
                [logicalCellsCount]="columns.length"
                [logicalSlaveCellsCount]="groupHeaderSlaveCellsCount">
        </tr>
        <tr
            *ngIf="isDataItem(item) && (!$any(item).group || isDataItemInExpandedGroup($any(item)))"
            kendoGridLogicalRow
                [dataRowIndex]="$any(item).index"
                [dataItem]="item.data"
                [logicalRowIndex]="logicalRowIndex(rowIndex)"
                [logicalSlaveRow]="lockedColumnsCount > 0"
                [logicalCellsCount]="columns.length"
                [logicalSlaveCellsCount]="unlockedColumnsCount"
            [class.k-grid-row-sticky]="rowSticky ? rowSticky({ dataItem: item.data, index: $any(item).index }) : false"
            [ngClass]="rowClass({ dataItem: item.data, index: $any(item).index })"
            [class.k-alt]="isOdd(item)"
            [class.k-master-row]="true"
            [class.k-grid-edit-row]="isEditingRow($any(item).index)"
            [attr.data-kendo-grid-item-index]="$any(item).index"
            [class.k-selected]="isSelectable() && isRowSelected(item)">
            <ng-container *ngIf="!skipGroupDecoration">
                <td class="k-group-cell" *ngFor="let g of groups" role="presentation"></td>
            </ng-container>
            <td class="k-hierarchy-cell"
                *ngIf="detailTemplate?.templateRef"
                kendoGridLogicalCell
                    [logicalRowIndex]="logicalRowIndex(rowIndex)"
                    [logicalColIndex]="0"
                    [dataRowIndex]="$any(item).index"
                    [dataItem]="item.data"
                    [detailExpandCell]="true"
                    aria-selected="false"
                    role="gridcell">
                <a class="k-icon"
                    *ngIf="detailTemplate.showIf(item.data, $any(item).index)"
                    [ngClass]="detailButtonStyles(item)"
                    [attr.title]="detailButtonTitle(item)"
                    [attr.aria-label]="detailButtonTitle(item)"
                    href="#" tabindex="-1" (click)="toggleRow($any(item).index, item.data)"></a>
            </td>
            <td
                kendoGridCell
                    [rowIndex]="$any(item).index"
                    [columnIndex]="lockedColumnsCount + columnIndex"
                    [attr.data-kendo-grid-column-index]="lockedColumnsCount + columnIndex"
                    [column]="column"
                    [dataItem]="item.data"
                    [isLoading]="isLoading"
                    [isVirtual]="isVirtual"
                    [loadingTemplate]="cellLoadingTemplate"
                kendoGridLogicalCell
                    [logicalRowIndex]="logicalRowIndex(rowIndex)"
                    [logicalColIndex]="logicalColIndex(column)"
                    [dataRowIndex]="$any(item).index"
                    [dataItem]="item.data"
                    [colIndex]="columnIndex"
                    [colSpan]="column.colspan"
                    role="gridcell"
                    [attr.aria-selected]="isSelectable() ? isAriaSelected(item, column) : undefined"
                    [class.k-grid-content-sticky]="column.sticky"
                    [class.k-touch-action-none]="isSelectable() && $any(selectable).drag"
                    [class.k-touch-action-auto]="!(isSelectable() && $any(selectable).drag)"
                [ngClass]="column.cssClass"
                [class.k-grid-edit-cell]="isEditingCell($any(item).index, column)"
                [ngStyle]="column.sticky ? addStickyColumnStyles(column) : column.style"
                [attr.colspan]="column.colspan"
                [class.k-selected]="isSelectable && cellSelectionService.isCellSelected(item, column)"
                *ngFor="let column of columns; let columnIndex = index; trackBy: trackByColumns;">
            </td>
        </tr>
        <tr *ngIf="isDataItem(item) &&
                (!$any(item).group || isDataItemInExpandedGroup($any(item))) &&
                detailTemplate?.templateRef &&
                detailTemplate.showIf(item.data, $any(item).index) &&
                isExpanded(item)"
            class="k-detail-row"
            [class.k-alt]="isOdd(item)"
            kendoGridLogicalRow
                [dataRowIndex]="$any(item).index"
                [dataItem]="item.data"
                [logicalRowIndex]="logicalRowIndex(rowIndex) + 1"
                [logicalSlaveRow]="false"
                [logicalCellsCount]="1"
            >
            <td class="k-group-cell" *ngFor="let g of groups"></td>
            <td class="k-hierarchy-cell"></td>
            <td class="k-detail-cell"
                [attr.colspan]="columnsSpan"
                kendoGridLogicalCell
                    [logicalRowIndex]="logicalRowIndex(rowIndex) + 1"
                    [logicalColIndex]="0"
                    [dataRowIndex]="$any(item).index"
                    [dataItem]="item.data"
                    [colIndex]="0"
                    [colSpan]="allColumnsSpan + 1"
                    role="gridcell" aria-selected="false"
                >
                <ng-template
                    [ngTemplateOutlet]="detailTemplate.templateRef"
                    [ngTemplateOutletContext]="{
                        dataItem: item.data,
                        rowIndex: $any(item).index,
                        $implicit: item.data
                    }">
                </ng-template>
            </td>
        </tr>
        <tr *ngIf="isFooter(item) &&
                $any(item).group &&
                (isFooterItemInExpandedGroup($any(item)) || (showGroupFooters && isParentGroupExpanded($any(item).group))) &&
                !$any(item.data).hideFooter"
            class="k-group-footer"
            kendoGridLogicalRow
                [logicalRowIndex]="logicalRowIndex(rowIndex)"
                [logicalSlaveRow]="lockedColumnsCount > 0"
                [logicalCellsCount]="columns.length"
                [logicalSlaveCellsCount]="unlockedColumnsCount">
            <ng-container *ngIf="!skipGroupDecoration">
                <td class="k-group-cell" *ngFor="let g of groups"></td>
            </ng-container>
            <td class="k-hierarchy-cell"
                *ngIf="detailTemplate?.templateRef"
                kendoGridLogicalCell
                    [logicalRowIndex]="logicalRowIndex(rowIndex)"
                    [logicalColIndex]="0"
                    aria-selected="false"
                >
            </td>
            <td kendoGridLogicalCell
                    [logicalRowIndex]="logicalRowIndex(rowIndex)"
                    [logicalColIndex]="logicalColIndex(column)"
                [attr.data-skip]="skipGroupDecoration"
                *ngFor="let column of footerColumns; let columnIndex = index; trackBy: trackByColumns;">
                <ng-template
                    [templateContext]="{
                        templateRef: $any(column).groupFooterTemplateRef,
                        group: $any(item.data),
                        field: $any(column).field,
                        column: column,
                        aggregates: $any(item.data)?.aggregates,
                        $implicit: $any(item.data)?.aggregates
                    }">
                </ng-template>
           </td>
        </tr>
    </ng-container>
    <kendo-resize-sensor *ngIf="rowSticky" (resize)="resizeHandler()"></kendo-resize-sensor>
    `, isInline: true, components: [{ type: i11.CellComponent, selector: "[kendoGridCell]", inputs: ["column", "columnIndex", "isNew", "isLoading", "isVirtual", "loadingTemplate", "rowIndex", "dataItem"] }, { type: i12.GroupHeaderComponent, selector: "[kendoGridGroupHeader]", inputs: ["rowIndex", "logicalRowIndex", "item", "skipGroupDecoration", "hasDetails", "totalColumnsCount", "hasGroupHeaderColumn", "groupHeaderColumns", "columns", "groups"] }, { type: i13.ResizeSensorComponent, selector: "kendo-resize-sensor", inputs: ["rateLimit"], outputs: ["resize"] }], directives: [{ type: i14.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i15.LogicalRowDirective, selector: "[kendoGridLogicalRow]", inputs: ["logicalRowIndex", "logicalSlaveRow", "logicalCellsCount", "logicalSlaveCellsCount", "dataRowIndex", "dataItem"] }, { type: i14.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i16.LogicalCellDirective, selector: "[kendoGridLogicalCell]", inputs: ["logicalColIndex", "logicalRowIndex", "logicalSlaveCell", "colIndex", "colSpan", "rowSpan", "groupItem", "dataRowIndex", "dataItem", "detailExpandCell", "headerLabelText"] }, { type: i14.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i14.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i17.TemplateContextDirective, selector: "[templateContext]", inputs: ["templateContext"] }, { type: i14.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: TableBodyComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[kendoGridTableBody]',
                    template: `
    <ng-container *ngIf="editService.hasNewItem">
        <tr class="k-grid-add-row k-grid-edit-row k-master-row"
            kendoGridLogicalRow
                [logicalRowIndex]="addRowLogicalIndex()"
                [logicalSlaveRow]="lockedColumnsCount > 0"
                [logicalCellsCount]="columns.length"
                [logicalSlaveCellsCount]="unlockedColumnsCount">
            <ng-container *ngIf="!skipGroupDecoration">
                <td class="k-group-cell" *ngFor="let g of groups" role="presentation"></td>
            </ng-container>
            <td class="k-hierarchy-cell"
                *ngIf="detailTemplate?.templateRef"
                kendoGridLogicalCell
                    [logicalRowIndex]="addRowLogicalIndex()"
                    [logicalColIndex]="0"
                    aria-selected="false"
                >
            </td>
            <td *ngFor="let column of columns; let columnIndex = index; trackBy: trackByColumns;"
                kendoGridCell
                    [rowIndex]="-1"
                    [columnIndex]="lockedColumnsCount + columnIndex"
                    [isNew]="true"
                    [column]="column"
                    [dataItem]="newDataItem"
                [class.k-grid-content-sticky]="column.sticky"
                [ngClass]="column.cssClass"
                [style.left]="column.sticky ? '0' : undefined"
                [ngStyle]="column.sticky ? addStickyColumnStyles(column) : column.style"
                [attr.colspan]="column.colspan"
                kendoGridLogicalCell
                    [logicalRowIndex]="addRowLogicalIndex()"
                    [logicalColIndex]="logicalColIndex(column)"
                    [colSpan]="column.colspan"
                role="gridcell">
            </td>
        </tr>
    </ng-container>
    <tr *ngIf="data?.length === 0 || data === null" class="k-grid-norecords">
        <td [attr.colspan]="colSpan">
            <ng-template
                *ngIf="noRecordsTemplate?.templateRef"
                [templateContext]="{
                    templateRef: noRecordsTemplate?.templateRef
                 }">
            </ng-template>
            <ng-container *ngIf="!noRecordsTemplate?.templateRef">
                {{noRecordsText}}
            </ng-container>
        </td>
    </tr>

    <ng-container *ngFor="let item of data; trackBy: trackByWrapper; let rowIndex = index;">
        <tr *ngIf="isGroup(item) && isParentGroupExpanded($any(item)) && showGroupHeader(item)"
            kendoGridGroupHeader
                [columns]="columns"
                [groups]="groups"
                [item]="$any(item)"
                [hasDetails]="!!detailTemplate?.templateRef"
                [skipGroupDecoration]="skipGroupDecoration"
                [hasGroupHeaderColumn]="hasGroupHeaderColumn"
                [groupHeaderColumns]="groupHeaderColumns"
                [rowIndex]="rowIndex + 1"
                [totalColumnsCount]="totalColumnsCount"
            kendoGridLogicalRow
                [logicalRowIndex]="logicalRowIndex(rowIndex)"
                [logicalSlaveRow]="lockedColumnsCount > 0"
                [logicalCellsCount]="columns.length"
                [logicalSlaveCellsCount]="groupHeaderSlaveCellsCount">
        </tr>
        <tr
            *ngIf="isDataItem(item) && (!$any(item).group || isDataItemInExpandedGroup($any(item)))"
            kendoGridLogicalRow
                [dataRowIndex]="$any(item).index"
                [dataItem]="item.data"
                [logicalRowIndex]="logicalRowIndex(rowIndex)"
                [logicalSlaveRow]="lockedColumnsCount > 0"
                [logicalCellsCount]="columns.length"
                [logicalSlaveCellsCount]="unlockedColumnsCount"
            [class.k-grid-row-sticky]="rowSticky ? rowSticky({ dataItem: item.data, index: $any(item).index }) : false"
            [ngClass]="rowClass({ dataItem: item.data, index: $any(item).index })"
            [class.k-alt]="isOdd(item)"
            [class.k-master-row]="true"
            [class.k-grid-edit-row]="isEditingRow($any(item).index)"
            [attr.data-kendo-grid-item-index]="$any(item).index"
            [class.k-selected]="isSelectable() && isRowSelected(item)">
            <ng-container *ngIf="!skipGroupDecoration">
                <td class="k-group-cell" *ngFor="let g of groups" role="presentation"></td>
            </ng-container>
            <td class="k-hierarchy-cell"
                *ngIf="detailTemplate?.templateRef"
                kendoGridLogicalCell
                    [logicalRowIndex]="logicalRowIndex(rowIndex)"
                    [logicalColIndex]="0"
                    [dataRowIndex]="$any(item).index"
                    [dataItem]="item.data"
                    [detailExpandCell]="true"
                    aria-selected="false"
                    role="gridcell">
                <a class="k-icon"
                    *ngIf="detailTemplate.showIf(item.data, $any(item).index)"
                    [ngClass]="detailButtonStyles(item)"
                    [attr.title]="detailButtonTitle(item)"
                    [attr.aria-label]="detailButtonTitle(item)"
                    href="#" tabindex="-1" (click)="toggleRow($any(item).index, item.data)"></a>
            </td>
            <td
                kendoGridCell
                    [rowIndex]="$any(item).index"
                    [columnIndex]="lockedColumnsCount + columnIndex"
                    [attr.data-kendo-grid-column-index]="lockedColumnsCount + columnIndex"
                    [column]="column"
                    [dataItem]="item.data"
                    [isLoading]="isLoading"
                    [isVirtual]="isVirtual"
                    [loadingTemplate]="cellLoadingTemplate"
                kendoGridLogicalCell
                    [logicalRowIndex]="logicalRowIndex(rowIndex)"
                    [logicalColIndex]="logicalColIndex(column)"
                    [dataRowIndex]="$any(item).index"
                    [dataItem]="item.data"
                    [colIndex]="columnIndex"
                    [colSpan]="column.colspan"
                    role="gridcell"
                    [attr.aria-selected]="isSelectable() ? isAriaSelected(item, column) : undefined"
                    [class.k-grid-content-sticky]="column.sticky"
                    [class.k-touch-action-none]="isSelectable() && $any(selectable).drag"
                    [class.k-touch-action-auto]="!(isSelectable() && $any(selectable).drag)"
                [ngClass]="column.cssClass"
                [class.k-grid-edit-cell]="isEditingCell($any(item).index, column)"
                [ngStyle]="column.sticky ? addStickyColumnStyles(column) : column.style"
                [attr.colspan]="column.colspan"
                [class.k-selected]="isSelectable && cellSelectionService.isCellSelected(item, column)"
                *ngFor="let column of columns; let columnIndex = index; trackBy: trackByColumns;">
            </td>
        </tr>
        <tr *ngIf="isDataItem(item) &&
                (!$any(item).group || isDataItemInExpandedGroup($any(item))) &&
                detailTemplate?.templateRef &&
                detailTemplate.showIf(item.data, $any(item).index) &&
                isExpanded(item)"
            class="k-detail-row"
            [class.k-alt]="isOdd(item)"
            kendoGridLogicalRow
                [dataRowIndex]="$any(item).index"
                [dataItem]="item.data"
                [logicalRowIndex]="logicalRowIndex(rowIndex) + 1"
                [logicalSlaveRow]="false"
                [logicalCellsCount]="1"
            >
            <td class="k-group-cell" *ngFor="let g of groups"></td>
            <td class="k-hierarchy-cell"></td>
            <td class="k-detail-cell"
                [attr.colspan]="columnsSpan"
                kendoGridLogicalCell
                    [logicalRowIndex]="logicalRowIndex(rowIndex) + 1"
                    [logicalColIndex]="0"
                    [dataRowIndex]="$any(item).index"
                    [dataItem]="item.data"
                    [colIndex]="0"
                    [colSpan]="allColumnsSpan + 1"
                    role="gridcell" aria-selected="false"
                >
                <ng-template
                    [ngTemplateOutlet]="detailTemplate.templateRef"
                    [ngTemplateOutletContext]="{
                        dataItem: item.data,
                        rowIndex: $any(item).index,
                        $implicit: item.data
                    }">
                </ng-template>
            </td>
        </tr>
        <tr *ngIf="isFooter(item) &&
                $any(item).group &&
                (isFooterItemInExpandedGroup($any(item)) || (showGroupFooters && isParentGroupExpanded($any(item).group))) &&
                !$any(item.data).hideFooter"
            class="k-group-footer"
            kendoGridLogicalRow
                [logicalRowIndex]="logicalRowIndex(rowIndex)"
                [logicalSlaveRow]="lockedColumnsCount > 0"
                [logicalCellsCount]="columns.length"
                [logicalSlaveCellsCount]="unlockedColumnsCount">
            <ng-container *ngIf="!skipGroupDecoration">
                <td class="k-group-cell" *ngFor="let g of groups"></td>
            </ng-container>
            <td class="k-hierarchy-cell"
                *ngIf="detailTemplate?.templateRef"
                kendoGridLogicalCell
                    [logicalRowIndex]="logicalRowIndex(rowIndex)"
                    [logicalColIndex]="0"
                    aria-selected="false"
                >
            </td>
            <td kendoGridLogicalCell
                    [logicalRowIndex]="logicalRowIndex(rowIndex)"
                    [logicalColIndex]="logicalColIndex(column)"
                [attr.data-skip]="skipGroupDecoration"
                *ngFor="let column of footerColumns; let columnIndex = index; trackBy: trackByColumns;">
                <ng-template
                    [templateContext]="{
                        templateRef: $any(column).groupFooterTemplateRef,
                        group: $any(item.data),
                        field: $any(column).field,
                        column: column,
                        aggregates: $any(item.data)?.aggregates,
                        $implicit: $any(item.data)?.aggregates
                    }">
                </ng-template>
           </td>
        </tr>
    </ng-container>
    <kendo-resize-sensor *ngIf="rowSticky" (resize)="resizeHandler()"></kendo-resize-sensor>
    `
                }]
        }], ctorParameters: function () { return [{ type: i1.DetailsService }, { type: i2.GroupsService }, { type: i3.ChangeNotificationService }, { type: i4.EditService }, { type: i5.LocalizationService }, { type: i0.NgZone }, { type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i6.DomEventsService }, { type: i7.SelectionService }, { type: i8.CellSelectionService }, { type: i9.ColumnInfoService }, { type: i10.NavigationService }]; }, propDecorators: { columns: [{
                type: Input
            }], allColumns: [{
                type: Input
            }], groups: [{
                type: Input
            }], detailTemplate: [{
                type: Input
            }], noRecordsTemplate: [{
                type: Input
            }], data: [{
                type: Input
            }], skip: [{
                type: Input
            }], selectable: [{
                type: Input
            }], filterable: [{
                type: Input
            }], noRecordsText: [{
                type: Input
            }], isLocked: [{
                type: Input
            }], isLoading: [{
                type: Input
            }], isVirtual: [{
                type: Input
            }], cellLoadingTemplate: [{
                type: Input
            }], skipGroupDecoration: [{
                type: Input
            }], showGroupFooters: [{
                type: Input
            }], lockedColumnsCount: [{
                type: Input
            }], totalColumnsCount: [{
                type: Input
            }], virtualColumns: [{
                type: Input
            }], trackBy: [{
                type: Input
            }], rowSticky: [{
                type: Input
            }], rowClass: [{
                type: Input
            }] } });

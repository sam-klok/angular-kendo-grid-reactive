/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, HostBinding, Input, QueryList, ViewChildren } from '@angular/core';
import { Subscription, of, merge } from "rxjs";
import { filter, map, switchMap, tap, takeUntil } from 'rxjs/operators';
import { isColumnComponent } from '../../columns/column.component';
import { isColumnGroupComponent } from '../../columns/column-group.component';
import { isCheckboxColumn } from '../../columns/column-base';
import { normalize } from '../../columns/sort-settings';
import { and, isNullOrEmptyString, isPresent, isTruthy, not, observe } from '../../utils';
import { columnsToRender, sortColumns, isInSpanColumn } from "../../columns/column-common";
import { hasFilterMenu, hasFilterRow } from '../../filtering/filterable';
import { Keys } from '@progress/kendo-angular-common';
import { DropTargetDirective } from '../../dragdrop/drop-target.directive';
import { position, isTargetBefore, offset } from '../../dragdrop/common';
import { hasItems } from '../../column-menu/utils';
import { closestInScope, isFocusable } from '../common/dom-queries';
import { FilterMenuComponent } from '../../filtering/menu/filter-menu.component';
import { ColumnMenuComponent } from '../../column-menu/column-menu.component';
import * as i0 from "@angular/core";
import * as i1 from "../../common/single-popup.service";
import * as i2 from "../../dragdrop/drag-hint.service";
import * as i3 from "../../dragdrop/drop-cue.service";
import * as i4 from "../../dragdrop/column-reorder.service";
import * as i5 from "../../common/id.service";
import * as i6 from "../../common/sort.service";
import * as i7 from "@progress/kendo-angular-l10n";
import * as i8 from "./../../common/column-info.service";
import * as i9 from "../../filtering/menu/filter-menu.component";
import * as i10 from "../../column-menu/column-menu.component";
import * as i11 from "../../filtering/filter-row.component";
import * as i12 from "@angular/common";
import * as i13 from "../../navigation/logical-row.directive";
import * as i14 from "../../navigation/logical-cell.directive";
import * as i15 from "../../dragdrop/drop-target.directive";
import * as i16 from "@progress/kendo-angular-common";
import * as i17 from "../../dragdrop/draggable-column.directive";
import * as i18 from "../common/template-context.directive";
import * as i19 from "../../selection/selectall-checkbox.directive";
import * as i20 from "../../navigation/focusable.directive";
import * as i21 from "../../column-resizing/column-handle.directive";
const mergeObjects = (...args) => Object.assign.apply(null, [{}].concat(args));
const directions = initialDirection => initialDirection === "asc" ? ["asc", "desc"] : ["desc", "asc"];
/**
 * @hidden
 */
const isRootLevel = ({ parent }) => !isTruthy(parent);
const ofColumnType = ({ draggable }) => ['column', 'columnGroup']
    .indexOf(draggable.context.type) >= 0;
const notSameElement = ({ draggable, target }) => draggable.element.nativeElement !== target.element.nativeElement;
const inSameParent = (x, y) => x.parent === y.parent ||
    (isInSpanColumn(y) && inSameParent(x, y.parent));
const sameParent = ({ draggable, target }) => inSameParent(draggable.context.column, target.context.column);
const lastNonLocked = ({ draggable }) => !isTruthy(draggable.context.column.locked) &&
    isRootLevel(draggable.context.column) &&
    draggable.context.lastColumn;
const notInSpanColumn = ({ draggable }) => !isInSpanColumn(draggable.context.column);
const reorderable = ({ draggable }) => draggable.context.column.reorderable;
const lockable = ({ draggable, target }) => draggable.context.column.lockable !== false ||
    draggable.context.column.isLocked === target.context.column.isLocked;
const rules = and(ofColumnType, reorderable, notInSpanColumn, notSameElement, sameParent, not(lastNonLocked), lockable);
const modifierKeys = ['alt', 'ctrl', 'shift', 'meta'];
/**
 * @hidden
 */
export class HeaderComponent {
    constructor(popupService, hint, cue, reorderService, idService, sortService, localization, columnInfoService, cd) {
        this.popupService = popupService;
        this.hint = hint;
        this.cue = cue;
        this.reorderService = reorderService;
        this.idService = idService;
        this.sortService = sortService;
        this.localization = localization;
        this.columnInfoService = columnInfoService;
        this.cd = cd;
        this.columns = [];
        this.groups = [];
        this.sort = new Array();
        this.sortable = false;
        this.groupable = false;
        this.lockedColumnsCount = 0;
        this.resizable = false;
        this.reorderable = false;
        this.columnMenu = false;
        this.totalColumnsCount = 0;
        this.sortedFields = {};
        this.dropTargets = new QueryList();
        this.subscription = new Subscription();
    }
    get headerClass() {
        return !this.scrollable;
    }
    get sortableLabel() {
        return this.localization.get('sortable');
    }
    get columnMenuSettings() {
        return this.columnMenu;
    }
    // Number of unlocked columns in the next table, if any
    get unlockedColumnsCount() {
        return this.totalColumnsCount - this.lockedColumnsCount - this.columns.length;
    }
    sortColumn(descriptor) {
        this.sortService.sort(descriptor);
    }
    getColumnComponent(column) {
        return column;
    }
    onSortClick(column, event, link) {
        const target = event.target;
        if (column.headerTemplateRef && target !== link) {
            const hasFocusableParent = Boolean(closestInScope(target, isFocusable, link));
            if (hasFocusableParent) {
                // Do not sort when clicking focusable template elements.
                return;
            }
        }
        const modifier = this.matchModifier(event);
        const toggledColumn = this.toggleSort(column, modifier);
        this.sortColumn(toggledColumn);
    }
    onHeaderKeydown(column, args) {
        if (args.keyCode === Keys.ArrowDown && args.altKey && this.showFilterMenu) {
            args.preventDefault();
            args.stopImmediatePropagation();
            const filterMenu = this.filterMenus.find(fm => fm.column === column);
            filterMenu.toggle(filterMenu.anchor.nativeElement, filterMenu.template);
        }
        if (args.keyCode === Keys.ArrowDown && args.altKey && this.showColumnMenu(column)) {
            args.preventDefault();
            args.stopImmediatePropagation();
            const columnMenu = this.columnMenus.find(cm => cm.column === column);
            columnMenu.toggle(null, columnMenu.anchor.nativeElement, columnMenu.template);
        }
        if (!this.sortable || args.defaultPrevented || column.sortable === false) {
            return;
        }
        if (args.keyCode === Keys.Enter && isPresent(column.field)) {
            const modifier = this.matchModifier(args);
            this.sortService.sort(this.toggleSort(column, modifier));
        }
    }
    showSortNumbering(column) {
        const { showIndexes } = normalize(this.sortable);
        return showIndexes
            && this.sort
            && this.sort.filter(({ dir }) => isPresent(dir)).length > 1
            && this.sortOrder(column.field) > 0;
    }
    sortOrder(field) {
        return this.sort
            .filter(({ dir }) => isPresent(dir))
            .findIndex(x => x.field === field)
            + 1;
    }
    sortIcon(field) {
        const state = this.sortDescriptor(field);
        return {
            'k-icon': isPresent(state.dir),
            'k-i-sort-desc-small': state.dir === "desc",
            'k-i-sort-asc-small': state.dir === "asc"
        };
    }
    sortState(column) {
        if (!this.isSortable(column)) {
            return;
        }
        const state = this.sortDescriptor(column.field);
        if (state.dir === 'asc') {
            return 'ascending';
        }
        if (state.dir === 'desc') {
            return 'descending';
        }
    }
    sortStatus(column) {
        if (!this.sortedFields[column.field] || !this.isSortable(column)) {
            return;
        }
        let msg = 'sortedDefault';
        const state = this.sortDescriptor(column.field);
        if (state.dir === 'asc') {
            msg = 'sortedAscending';
        }
        else if (state.dir === 'desc') {
            msg = 'sortedDescending';
        }
        return this.localization.get(msg);
    }
    /**
     *
     * @param column
     * @param modifier - Indicates whether the client-defined `multiSortKey` modifier is met. Defaults to `true`.
     * @returns - SortDescriptor[]
     */
    toggleSort(column, modifier = true) {
        const { allowUnsort, mode, initialDirection } = normalize(this.sortable, column.sortable);
        const descriptor = this.toggleDirection(column.field, allowUnsort, initialDirection);
        if (mode === 'single' || !modifier) {
            return [descriptor];
        }
        return [...this.sort.filter(desc => desc.field !== column.field), descriptor];
    }
    /**
     *
     * Determines whether the modifier key (if any) passed
     * with a click/keyboard event matches the user-defined multiSortKey.
     */
    matchModifier(event) {
        const { multiSortKey } = normalize(this.sortable);
        if (multiSortKey === 'none') {
            return modifierKeys.every(key => !event[`${key}Key`]);
        }
        return multiSortKey === 'ctrl'
            ? event.ctrlKey || event.metaKey
            : event[`${multiSortKey}Key`];
    }
    ngAfterViewInit() {
        this.subscription.add(observe(this.dropTargets)
            .subscribe(this.attachTargets.bind(this)));
    }
    ngDoCheck() {
        this._leafColumns = columnsToRender(this.columns || []).filter(x => !isColumnGroupComponent(x));
    }
    ngOnChanges(changes) {
        const sortChange = changes.sort;
        if (sortChange && !sortChange.isFirstChange()) {
            sortChange.currentValue.forEach(change => {
                this.sortedFields[change.field] = true;
            });
        }
    }
    ngOnInit() {
        this.subscription.add(this.localization.changes
            .subscribe(() => this.cd.markForCheck()));
    }
    ngOnDestroy() {
        if (this.targetSubscription) {
            this.targetSubscription.unsubscribe();
        }
        if (this.popupService) {
            this.popupService.destroy();
        }
        this.subscription.unsubscribe();
    }
    selectAllCheckboxId() {
        return this.idService.selectAllCheckboxId();
    }
    get selectAllCheckboxLabel() {
        return this.localization.get('selectAllCheckboxLabel');
    }
    isFirstOnRow(column, index) {
        const isTailing = (c) => c &&
            (this.columnsForLevel(c.level).indexOf(c) > 0 || isTailing(c.parent));
        return index === 0 && !this.groups.length && !this.detailTemplate && isTailing(column.parent);
    }
    logicalColumnIndex(column) {
        const index = column.leafIndex;
        if (isPresent(index)) {
            return index + (isPresent(this.detailTemplate) ? 1 : 0);
        }
        return -1;
    }
    get showFilterMenu() {
        return !this.columnMenu && hasFilterMenu(this.filterable);
    }
    get showFilterRow() {
        return hasFilterRow(this.filterable);
    }
    showColumnMenu(column) {
        return this.columnMenu && column.columnMenu &&
            (this.columnMenuTemplate || column.columnMenuTemplates.length || hasItems(this.columnMenu, column));
    }
    isFilterable(column) {
        return !isNullOrEmptyString(column.field) && column.filterable === true;
    }
    canDrop(draggable, target) {
        return this.reorderable && rules({ draggable, target });
    }
    shouldActivate(column) {
        const canReorder = this.reorderable && column.reorderable;
        if (!canReorder && !isColumnComponent(column)) {
            return false;
        }
        const groupable = this.groupable && isColumnComponent(column) && column.groupable !== false;
        return groupable || canReorder;
    }
    isSortable(column) {
        return !isNullOrEmptyString(column.field)
            && isTruthy(this.sortable) && isTruthy(column.sortable);
    }
    isCheckboxColumn(column) {
        return isCheckboxColumn(column) && !column.templateRef;
    }
    trackByIndex(index, _item) {
        return index;
    }
    addStickyStyles(column) {
        const stickyStyles = this.columnInfoService.stickyColumnsStyles(column);
        return Object.assign(Object.assign({}, column.style), stickyStyles);
    }
    toggleDirection(field, allowUnsort, initialDirection) {
        const descriptor = this.sortDescriptor(field);
        const [first, second] = directions(initialDirection);
        let dir = first;
        if (descriptor.dir === first) {
            dir = second;
        }
        else if (descriptor.dir === second && allowUnsort) {
            dir = undefined;
        }
        return { dir, field };
    }
    columnsForLevel(level) {
        const columns = this.columns ? this.columns.filter(column => column.level === level) : [];
        return sortColumns(columnsToRender(columns));
    }
    isColumnGroupComponent(column) {
        return isColumnGroupComponent(column);
    }
    get columnLevels() {
        return new Array((this.totalColumnLevels || 0) + 1);
    }
    sortDescriptor(field) {
        return this.sort.find(item => item.field === field) || { field };
    }
    get leafColumns() {
        return this._leafColumns;
    }
    attachTargets() {
        if (this.targetSubscription) {
            this.targetSubscription.unsubscribe();
        }
        this.targetSubscription = new Subscription();
        const enterStream = merge(...this.dropTargets.map(target => target.enter));
        const leaveStream = merge(...this.dropTargets.map(target => target.leave));
        const dropStream = merge(...this.dropTargets.map(target => target.drop));
        this.targetSubscription.add(enterStream.pipe(tap(({ target, draggable }) => {
            if (draggable.context.type === 'groupIndicator') {
                return;
            }
            const targetLocked = isTruthy(target.context.column.isLocked);
            const draggableLocked = isTruthy(draggable.context.column.isLocked);
            if (this.lockedColumnsCount > 0 || targetLocked || draggableLocked) {
                this.hint.toggleLock(targetLocked);
            }
        }), filter(({ draggable, target }) => this.canDrop(draggable, target)), switchMap(this.trackMove.bind(this, leaveStream, dropStream)), map((e) => mergeObjects(e, { before: this.calculateBefore(e), changeContainer: e.changeContainer })), map(this.normalizeTarget.bind(this)), tap(this.enter.bind(this)), switchMap((args) => dropStream.pipe(map(() => args), takeUntil(leaveStream.pipe(tap(this.leave.bind(this)))))))
            .subscribe(this.drop.bind(this)));
    }
    normalizeTarget(e) {
        let target = e.target;
        const parent = target.context.column.parent;
        if (parent && parent.isSpanColumn) {
            const arr = this.dropTargets.toArray();
            const firstSpan = arr.find(t => t.context.column.parent === parent);
            const index = arr.indexOf(firstSpan);
            const adjust = e.before ? 0 : parent.childColumns.length - 1;
            target = arr[index + adjust];
        }
        return mergeObjects(e, { target });
    }
    trackMove(leaveStream, dropStream, e) {
        const column = e.target.context.column;
        const levelColumns = this.columnsForLevel(column.level);
        const index = levelColumns.indexOf(column);
        const isFirst = (column.locked ? index === levelColumns.length - 1 : index === 0);
        const changed = e.draggable.context.column.isLocked !== column.isLocked;
        if (changed && isFirst) {
            return e.draggable.drag
                .pipe(takeUntil(leaveStream), takeUntil(dropStream), map(({ mouseEvent }) => mergeObjects({ changeContainer: true }, e, { mouseEvent })));
        }
        return of(mergeObjects({ changeContainer: changed }, e));
    }
    calculateBefore({ draggable, target, mouseEvent, changeContainer = false }) {
        const targetElement = target.element.nativeElement;
        let before = false;
        if (changeContainer) {
            const { left } = offset(targetElement);
            const halfWidth = targetElement.offsetWidth / 2;
            const middle = left + halfWidth;
            before = middle > mouseEvent.pageX;
            if (this.localization.rtl) {
                before = !before;
            }
        }
        else {
            before = isTargetBefore(draggable.element.nativeElement, targetElement);
        }
        return before;
    }
    enter({ target, before }) {
        this.hint.enable();
        if (this.localization.rtl) {
            before = !before;
        }
        this.cue.position(position(target.element.nativeElement, before));
    }
    leave() {
        this.hint.disable();
        this.cue.hide();
    }
    drop({ draggable, target, before, changeContainer }) {
        this.reorderService.reorder({
            before,
            changeContainer,
            source: draggable.context.column,
            target: target.context.column
        });
    }
}
HeaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: HeaderComponent, deps: [{ token: i1.SinglePopupService }, { token: i2.DragHintService }, { token: i3.DropCueService }, { token: i4.ColumnReorderService }, { token: i5.IdService }, { token: i6.SortService }, { token: i7.LocalizationService }, { token: i8.ColumnInfoService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
HeaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: HeaderComponent, selector: "[kendoGridHeader]", inputs: { totalColumnLevels: "totalColumnLevels", columns: "columns", groups: "groups", detailTemplate: "detailTemplate", scrollable: "scrollable", filterable: "filterable", sort: "sort", filter: "filter", sortable: "sortable", groupable: "groupable", lockedColumnsCount: "lockedColumnsCount", resizable: "resizable", reorderable: "reorderable", columnMenu: "columnMenu", columnMenuTemplate: "columnMenuTemplate", totalColumnsCount: "totalColumnsCount", tabIndex: "tabIndex" }, host: { properties: { "class.k-grid-header": "this.headerClass" } }, viewQueries: [{ propertyName: "dropTargets", predicate: DropTargetDirective, descendants: true }, { propertyName: "filterMenus", predicate: FilterMenuComponent, descendants: true }, { propertyName: "columnMenus", predicate: ColumnMenuComponent, descendants: true }], usesOnChanges: true, ngImport: i0, template: `
    <ng-container>
        <tr *ngFor="let i of columnLevels; let levelIndex = index"
            kendoGridLogicalRow
                [logicalRowIndex]="levelIndex"
                [logicalSlaveRow]="lockedColumnsCount > 0"
                [logicalCellsCount]="columns.length"
                [logicalSlaveCellsCount]="unlockedColumnsCount">
            <th
                class="k-group-cell k-header"
                role="presentation"
                *ngFor="let g of groups">
            </th>
            <th class="k-hierarchy-cell k-header"
                role="gridcell"
                *ngIf="detailTemplate?.templateRef"
                kendoGridLogicalCell
                    [logicalRowIndex]="levelIndex"
                    [logicalColIndex]="0"
                    aria-selected="false"
            >
            </th>
            <ng-container *ngFor="let column of columnsForLevel(levelIndex); trackBy: trackByIndex; let columnIndex = index; let last = last;">
                <th *ngIf="!isColumnGroupComponent(column)"
                    kendoGridLogicalCell
                    [logicalRowIndex]="levelIndex"
                    [logicalColIndex]="logicalColumnIndex(column)"
                    [headerLabelText]="column.title || getColumnComponent(column).field"
                    [colSpan]="column.colspan"
                    [rowSpan]="column.rowspan(totalColumnLevels)"
                    role="columnheader"
                    aria-selected="false"
                    [attr.aria-sort]="sortState(getColumnComponent(column))"
                    [class.k-sorted]="!!sortState(getColumnComponent(column))"
                    (keydown)="onHeaderKeydown(getColumnComponent(column), $event)"
                    kendoDropTarget
                    kendoDraggable
                    kendoDraggableColumn
                    [enableDrag]="shouldActivate(column)"
                    [context]="{
                        field: getColumnComponent(column).field,
                        type: 'column',
                        column: column,
                        hint: column.title || getColumnComponent(column).field,
                        lastColumn: last && columnIndex === 0
                    }"
                    class="k-header"
                    [class.k-filterable]="(showFilterMenu && isFilterable(getColumnComponent(column))) || showColumnMenu(column)"
                    [class.k-first]="isFirstOnRow(getColumnComponent(column), columnIndex)"
                    [class.k-grid-header-sticky]="column.sticky"
                    [ngClass]="column.headerClass"
                    [ngStyle]="column.sticky ? addStickyStyles(column) : column.headerStyle"
                    [attr.rowspan]="column.rowspan(totalColumnLevels)"
                    [attr.colspan]="column.colspan">

                    <ng-container *ngIf="!isSortable(getColumnComponent(column))">
                        <span class="k-cell-inner">
                            <span class="k-link">
                                <ng-template
                                    [templateContext]="{
                                        templateRef: column.headerTemplateRef,
                                        columnIndex: column.leafIndex,
                                        column: column,
                                        $implicit: column
                                    }">
                                </ng-template>
                                <ng-container *ngIf="!column.headerTemplateRef">
                                    <span class="k-column-title">{{column.displayTitle}}</span>
                                </ng-container>
                            </span>
                            <kendo-grid-filter-menu
                                *ngIf="showFilterMenu && isFilterable(getColumnComponent(column))"
                                [column]="getColumnComponent(column)"
                                [filter]="filter"
                                [tabIndex]="tabIndex">
                            </kendo-grid-filter-menu>
                            <kendo-grid-column-menu *ngIf="showColumnMenu(column)"
                                [standalone]="false"
                                [settings]="columnMenuSettings"
                                [column]="column"
                                [columnMenuTemplate]="columnMenuTemplate"
                                [sort]="sort"
                                [filter]="filter"
                                [sortable]="sortable"
                                [tabIndex]="tabIndex">
                            </kendo-grid-column-menu>
                        </span>
                    </ng-container>

                    <ng-container *ngIf="isSortable(getColumnComponent(column))">
                        <span class="k-cell-inner">
                            <span #link class="k-link" (click)="onSortClick(getColumnComponent(column), $event, link)">
                                <ng-template
                                    [templateContext]="{
                                        templateRef: column.headerTemplateRef,
                                        columnIndex: column.leafIndex,
                                        column: column,
                                        $implicit: column
                                    }">
                                </ng-template>
                                <ng-container *ngIf="!column.headerTemplateRef">
                                    <span class="k-column-title">{{column.displayTitle}}</span>
                                </ng-container>
                                <span role="note" [attr.aria-label]="sortableLabel" [ngClass]="sortIcon(getColumnComponent(column).field)"></span>
                                <span *ngIf="showSortNumbering(getColumnComponent(column))" class="k-sort-order">{{sortOrder(getColumnComponent(column).field)}}</span>
                            </span>
                            <span role="status"
                                class="k-sort-status"
                                [style.position]="'absolute'"
                                [style.left.px]="-10000"
                                [innerHtml]="sortStatus(getColumnComponent(column))">
                            </span>
                            <kendo-grid-filter-menu
                                *ngIf="showFilterMenu && isFilterable(getColumnComponent(column))"
                                [column]="getColumnComponent(column)"
                                [filter]="filter"
                                [tabIndex]="tabIndex">
                            </kendo-grid-filter-menu>
                            <kendo-grid-column-menu *ngIf="showColumnMenu(column)"
                                [standalone]="false"
                                [settings]="columnMenuSettings"
                                [column]="column"
                                [columnMenuTemplate]="columnMenuTemplate"
                                [sort]="sort"
                                [filter]="filter"
                                [sortable]="sortable"
                                [tabIndex]="tabIndex">
                            </kendo-grid-column-menu>
                        </span>
                    </ng-container>

                    <ng-container *ngIf="isCheckboxColumn(column) && !column.headerTemplateRef && $any(column).showSelectAll">
                        <input
                            class="k-checkbox k-checkbox-md k-rounded-md"
                            [attr.id]="selectAllCheckboxId()"
                            [attr.aria-label]="selectAllCheckboxLabel"
                            kendoGridSelectAllCheckbox
                            kendoGridFocusable>
                    </ng-container>
                    <span kendoGridColumnHandle
                        kendoDraggable
                        class="k-column-resizer"
                        *ngIf="resizable"
                        [column]="column"
                        [columns]="columns">
                    </span>
                </th>
                <th *ngIf="isColumnGroupComponent(column)"
                    kendoGridLogicalCell
                    [logicalRowIndex]="levelIndex"
                    [logicalColIndex]="logicalColumnIndex(column)"
                    [rowSpan]="column.rowspan(totalColumnLevels)"
                    [colSpan]="column.colspan"
                    [headerLabelText]="column.title || getColumnComponent(column).field"
                    kendoDropTarget
                    kendoDraggable
                    kendoDraggableColumn
                    [enableDrag]="shouldActivate(column)"
                    [context]="{
                        type: 'columnGroup',
                        column: column,
                        hint: column.title,
                        lastColumn: last && columnIndex === 0
                    }"
                    class="k-header"
                    [class.k-first]="isFirstOnRow(getColumnComponent(column), columnIndex)"
                    [class.k-filterable]="showColumnMenu(column)"
                    [class.k-grid-content-sticky]="column.sticky"
                    [ngClass]="column.headerClass"
                    [ngStyle]="column.headerStyle"
                    [attr.rowspan]="column.rowspan(totalColumnLevels)"
                    [attr.colspan]="column.colspan">
                    <span class="k-cell-inner">
                        <span class="k-link">
                            <ng-template
                                [templateContext]="{
                                    templateRef: column.headerTemplateRef,
                                    columnIndex: lockedColumnsCount + columnIndex,
                                    column: column,
                                    $implicit: column
                                }">
                            </ng-template>
                            <ng-container *ngIf="!column.headerTemplateRef">
                                <span class="k-column-title">{{column.displayTitle}}</span>
                            </ng-container>
                        </span>
                        <kendo-grid-column-menu *ngIf="showColumnMenu(column)"
                            [standalone]="false"
                            [settings]="columnMenuSettings"
                            [column]="column"
                            [columnMenuTemplate]="columnMenuTemplate">
                        </kendo-grid-column-menu>
                    </span>
                    <span kendoGridColumnHandle
                        kendoDraggable
                        class="k-column-resizer"
                        *ngIf="resizable"
                        [column]="column"
                        [columns]="columns">
                    </span>
                </th>
            </ng-container>
        </tr>
        <tr *ngIf="showFilterRow"
            kendoGridFilterRow
                [columns]="leafColumns"
                [filter]="filter"
                [groups]="groups"
                [detailTemplate]="detailTemplate"
                [lockedColumnsCount]="lockedColumnsCount"
            kendoGridLogicalRow
                [logicalRowIndex]="totalColumnLevels + 1"
                [logicalSlaveRow]="lockedColumnsCount > 0"
                [logicalCellsCount]="columns.length"
                [logicalSlaveCellsCount]="unlockedColumnsCount"
        ></tr>
    </ng-container>
    `, isInline: true, components: [{ type: i9.FilterMenuComponent, selector: "kendo-grid-filter-menu", inputs: ["column", "filter", "tabIndex"] }, { type: i10.ColumnMenuComponent, selector: "kendo-grid-column-menu", inputs: ["standalone", "column", "settings", "sort", "filter", "sortable", "columnMenuTemplate", "tabIndex"] }, { type: i11.FilterRowComponent, selector: "[kendoGridFilterRow]", inputs: ["columns", "filter", "groups", "detailTemplate", "logicalRowIndex", "lockedColumnsCount"] }], directives: [{ type: i12.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i13.LogicalRowDirective, selector: "[kendoGridLogicalRow]", inputs: ["logicalRowIndex", "logicalSlaveRow", "logicalCellsCount", "logicalSlaveCellsCount", "dataRowIndex", "dataItem"] }, { type: i12.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i14.LogicalCellDirective, selector: "[kendoGridLogicalCell]", inputs: ["logicalColIndex", "logicalRowIndex", "logicalSlaveCell", "colIndex", "colSpan", "rowSpan", "groupItem", "dataRowIndex", "dataItem", "detailExpandCell", "headerLabelText"] }, { type: i15.DropTargetDirective, selector: "[kendoDropTarget]", inputs: ["context"], outputs: ["enter", "leave", "drop"] }, { type: i16.DraggableDirective, selector: "[kendoDraggable]", inputs: ["enableDrag"], outputs: ["kendoPress", "kendoDrag", "kendoRelease"] }, { type: i17.DraggableColumnDirective, selector: "[kendoDraggableColumn]", inputs: ["context", "enableDrag"], outputs: ["drag"] }, { type: i12.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i12.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i18.TemplateContextDirective, selector: "[templateContext]", inputs: ["templateContext"] }, { type: i19.SelectAllCheckboxDirective, selector: "[kendoGridSelectAllCheckbox]", inputs: ["state"], outputs: ["selectAllChange"] }, { type: i20.FocusableDirective, selector: "[kendoGridFocusable],\n        [kendoGridEditCommand],\n        [kendoGridRemoveCommand],\n        [kendoGridSaveCommand],\n        [kendoGridCancelCommand],\n        [kendoGridSelectionCheckbox]\n    ", inputs: ["kendoGridFocusable"] }, { type: i21.ColumnHandleDirective, selector: "[kendoGridColumnHandle]", inputs: ["columns", "column"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: HeaderComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[kendoGridHeader]',
                    template: `
    <ng-container>
        <tr *ngFor="let i of columnLevels; let levelIndex = index"
            kendoGridLogicalRow
                [logicalRowIndex]="levelIndex"
                [logicalSlaveRow]="lockedColumnsCount > 0"
                [logicalCellsCount]="columns.length"
                [logicalSlaveCellsCount]="unlockedColumnsCount">
            <th
                class="k-group-cell k-header"
                role="presentation"
                *ngFor="let g of groups">
            </th>
            <th class="k-hierarchy-cell k-header"
                role="gridcell"
                *ngIf="detailTemplate?.templateRef"
                kendoGridLogicalCell
                    [logicalRowIndex]="levelIndex"
                    [logicalColIndex]="0"
                    aria-selected="false"
            >
            </th>
            <ng-container *ngFor="let column of columnsForLevel(levelIndex); trackBy: trackByIndex; let columnIndex = index; let last = last;">
                <th *ngIf="!isColumnGroupComponent(column)"
                    kendoGridLogicalCell
                    [logicalRowIndex]="levelIndex"
                    [logicalColIndex]="logicalColumnIndex(column)"
                    [headerLabelText]="column.title || getColumnComponent(column).field"
                    [colSpan]="column.colspan"
                    [rowSpan]="column.rowspan(totalColumnLevels)"
                    role="columnheader"
                    aria-selected="false"
                    [attr.aria-sort]="sortState(getColumnComponent(column))"
                    [class.k-sorted]="!!sortState(getColumnComponent(column))"
                    (keydown)="onHeaderKeydown(getColumnComponent(column), $event)"
                    kendoDropTarget
                    kendoDraggable
                    kendoDraggableColumn
                    [enableDrag]="shouldActivate(column)"
                    [context]="{
                        field: getColumnComponent(column).field,
                        type: 'column',
                        column: column,
                        hint: column.title || getColumnComponent(column).field,
                        lastColumn: last && columnIndex === 0
                    }"
                    class="k-header"
                    [class.k-filterable]="(showFilterMenu && isFilterable(getColumnComponent(column))) || showColumnMenu(column)"
                    [class.k-first]="isFirstOnRow(getColumnComponent(column), columnIndex)"
                    [class.k-grid-header-sticky]="column.sticky"
                    [ngClass]="column.headerClass"
                    [ngStyle]="column.sticky ? addStickyStyles(column) : column.headerStyle"
                    [attr.rowspan]="column.rowspan(totalColumnLevels)"
                    [attr.colspan]="column.colspan">

                    <ng-container *ngIf="!isSortable(getColumnComponent(column))">
                        <span class="k-cell-inner">
                            <span class="k-link">
                                <ng-template
                                    [templateContext]="{
                                        templateRef: column.headerTemplateRef,
                                        columnIndex: column.leafIndex,
                                        column: column,
                                        $implicit: column
                                    }">
                                </ng-template>
                                <ng-container *ngIf="!column.headerTemplateRef">
                                    <span class="k-column-title">{{column.displayTitle}}</span>
                                </ng-container>
                            </span>
                            <kendo-grid-filter-menu
                                *ngIf="showFilterMenu && isFilterable(getColumnComponent(column))"
                                [column]="getColumnComponent(column)"
                                [filter]="filter"
                                [tabIndex]="tabIndex">
                            </kendo-grid-filter-menu>
                            <kendo-grid-column-menu *ngIf="showColumnMenu(column)"
                                [standalone]="false"
                                [settings]="columnMenuSettings"
                                [column]="column"
                                [columnMenuTemplate]="columnMenuTemplate"
                                [sort]="sort"
                                [filter]="filter"
                                [sortable]="sortable"
                                [tabIndex]="tabIndex">
                            </kendo-grid-column-menu>
                        </span>
                    </ng-container>

                    <ng-container *ngIf="isSortable(getColumnComponent(column))">
                        <span class="k-cell-inner">
                            <span #link class="k-link" (click)="onSortClick(getColumnComponent(column), $event, link)">
                                <ng-template
                                    [templateContext]="{
                                        templateRef: column.headerTemplateRef,
                                        columnIndex: column.leafIndex,
                                        column: column,
                                        $implicit: column
                                    }">
                                </ng-template>
                                <ng-container *ngIf="!column.headerTemplateRef">
                                    <span class="k-column-title">{{column.displayTitle}}</span>
                                </ng-container>
                                <span role="note" [attr.aria-label]="sortableLabel" [ngClass]="sortIcon(getColumnComponent(column).field)"></span>
                                <span *ngIf="showSortNumbering(getColumnComponent(column))" class="k-sort-order">{{sortOrder(getColumnComponent(column).field)}}</span>
                            </span>
                            <span role="status"
                                class="k-sort-status"
                                [style.position]="'absolute'"
                                [style.left.px]="-10000"
                                [innerHtml]="sortStatus(getColumnComponent(column))">
                            </span>
                            <kendo-grid-filter-menu
                                *ngIf="showFilterMenu && isFilterable(getColumnComponent(column))"
                                [column]="getColumnComponent(column)"
                                [filter]="filter"
                                [tabIndex]="tabIndex">
                            </kendo-grid-filter-menu>
                            <kendo-grid-column-menu *ngIf="showColumnMenu(column)"
                                [standalone]="false"
                                [settings]="columnMenuSettings"
                                [column]="column"
                                [columnMenuTemplate]="columnMenuTemplate"
                                [sort]="sort"
                                [filter]="filter"
                                [sortable]="sortable"
                                [tabIndex]="tabIndex">
                            </kendo-grid-column-menu>
                        </span>
                    </ng-container>

                    <ng-container *ngIf="isCheckboxColumn(column) && !column.headerTemplateRef && $any(column).showSelectAll">
                        <input
                            class="k-checkbox k-checkbox-md k-rounded-md"
                            [attr.id]="selectAllCheckboxId()"
                            [attr.aria-label]="selectAllCheckboxLabel"
                            kendoGridSelectAllCheckbox
                            kendoGridFocusable>
                    </ng-container>
                    <span kendoGridColumnHandle
                        kendoDraggable
                        class="k-column-resizer"
                        *ngIf="resizable"
                        [column]="column"
                        [columns]="columns">
                    </span>
                </th>
                <th *ngIf="isColumnGroupComponent(column)"
                    kendoGridLogicalCell
                    [logicalRowIndex]="levelIndex"
                    [logicalColIndex]="logicalColumnIndex(column)"
                    [rowSpan]="column.rowspan(totalColumnLevels)"
                    [colSpan]="column.colspan"
                    [headerLabelText]="column.title || getColumnComponent(column).field"
                    kendoDropTarget
                    kendoDraggable
                    kendoDraggableColumn
                    [enableDrag]="shouldActivate(column)"
                    [context]="{
                        type: 'columnGroup',
                        column: column,
                        hint: column.title,
                        lastColumn: last && columnIndex === 0
                    }"
                    class="k-header"
                    [class.k-first]="isFirstOnRow(getColumnComponent(column), columnIndex)"
                    [class.k-filterable]="showColumnMenu(column)"
                    [class.k-grid-content-sticky]="column.sticky"
                    [ngClass]="column.headerClass"
                    [ngStyle]="column.headerStyle"
                    [attr.rowspan]="column.rowspan(totalColumnLevels)"
                    [attr.colspan]="column.colspan">
                    <span class="k-cell-inner">
                        <span class="k-link">
                            <ng-template
                                [templateContext]="{
                                    templateRef: column.headerTemplateRef,
                                    columnIndex: lockedColumnsCount + columnIndex,
                                    column: column,
                                    $implicit: column
                                }">
                            </ng-template>
                            <ng-container *ngIf="!column.headerTemplateRef">
                                <span class="k-column-title">{{column.displayTitle}}</span>
                            </ng-container>
                        </span>
                        <kendo-grid-column-menu *ngIf="showColumnMenu(column)"
                            [standalone]="false"
                            [settings]="columnMenuSettings"
                            [column]="column"
                            [columnMenuTemplate]="columnMenuTemplate">
                        </kendo-grid-column-menu>
                    </span>
                    <span kendoGridColumnHandle
                        kendoDraggable
                        class="k-column-resizer"
                        *ngIf="resizable"
                        [column]="column"
                        [columns]="columns">
                    </span>
                </th>
            </ng-container>
        </tr>
        <tr *ngIf="showFilterRow"
            kendoGridFilterRow
                [columns]="leafColumns"
                [filter]="filter"
                [groups]="groups"
                [detailTemplate]="detailTemplate"
                [lockedColumnsCount]="lockedColumnsCount"
            kendoGridLogicalRow
                [logicalRowIndex]="totalColumnLevels + 1"
                [logicalSlaveRow]="lockedColumnsCount > 0"
                [logicalCellsCount]="columns.length"
                [logicalSlaveCellsCount]="unlockedColumnsCount"
        ></tr>
    </ng-container>
    `
                }]
        }], ctorParameters: function () { return [{ type: i1.SinglePopupService }, { type: i2.DragHintService }, { type: i3.DropCueService }, { type: i4.ColumnReorderService }, { type: i5.IdService }, { type: i6.SortService }, { type: i7.LocalizationService }, { type: i8.ColumnInfoService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { totalColumnLevels: [{
                type: Input
            }], columns: [{
                type: Input
            }], groups: [{
                type: Input
            }], detailTemplate: [{
                type: Input
            }], scrollable: [{
                type: Input
            }], filterable: [{
                type: Input
            }], sort: [{
                type: Input
            }], filter: [{
                type: Input
            }], sortable: [{
                type: Input
            }], groupable: [{
                type: Input
            }], lockedColumnsCount: [{
                type: Input
            }], resizable: [{
                type: Input
            }], reorderable: [{
                type: Input
            }], columnMenu: [{
                type: Input
            }], columnMenuTemplate: [{
                type: Input
            }], totalColumnsCount: [{
                type: Input
            }], tabIndex: [{
                type: Input
            }], headerClass: [{
                type: HostBinding,
                args: ['class.k-grid-header']
            }], dropTargets: [{
                type: ViewChildren,
                args: [DropTargetDirective]
            }], filterMenus: [{
                type: ViewChildren,
                args: [FilterMenuComponent]
            }], columnMenus: [{
                type: ViewChildren,
                args: [ColumnMenuComponent]
            }] } });

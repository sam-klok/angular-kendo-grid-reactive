/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ColumnInfoService } from './../../common/column-info.service';
import { ChangeDetectorRef, AfterViewInit, OnChanges, OnDestroy, OnInit, QueryList, TemplateRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { ColumnComponent } from '../../columns/column.component';
import { ColumnBase } from '../../columns/column-base';
import { DetailTemplateDirective } from '../details/detail-template.directive';
import { SortDescriptor } from '@progress/kendo-data-query';
import { SortSettings } from '../../columns/sort-settings';
import { GroupDescriptor, CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { SinglePopupService } from '../../common/single-popup.service';
import { FilterableSettings } from '../../filtering/filterable';
import { IdService } from '../../common/id.service';
import { DropTargetDirective } from '../../dragdrop/drop-target.directive';
import { DraggableColumnDirective } from '../../dragdrop/draggable-column.directive';
import { DragHintService } from '../../dragdrop/drag-hint.service';
import { DropCueService } from '../../dragdrop/drop-cue.service';
import { ColumnReorderService } from '../../dragdrop/column-reorder.service';
import { SortService } from '../../common/sort.service';
import { FilterMenuComponent } from '../../filtering/menu/filter-menu.component';
import { ColumnMenuComponent } from '../../column-menu/column-menu.component';
import { ColumnMenuSettings } from '../../column-menu/column-menu-settings.interface';
import * as i0 from "@angular/core";
/**
 * @hidden
 */
export declare class HeaderComponent implements AfterViewInit, OnInit, OnChanges, OnDestroy {
    private popupService;
    private hint;
    private cue;
    private reorderService;
    private idService;
    private sortService;
    private localization;
    private columnInfoService;
    private cd;
    /**
     * @hidden
     */
    totalColumnLevels: number;
    columns: Array<ColumnBase>;
    groups: Array<GroupDescriptor>;
    detailTemplate: DetailTemplateDirective;
    scrollable: boolean;
    filterable: FilterableSettings;
    sort: Array<SortDescriptor>;
    filter: CompositeFilterDescriptor;
    sortable: SortSettings;
    groupable: boolean;
    lockedColumnsCount: number;
    resizable: boolean;
    reorderable: boolean;
    columnMenu: boolean | ColumnMenuSettings;
    columnMenuTemplate: TemplateRef<any>;
    totalColumnsCount: number;
    tabIndex: string;
    sortedFields: any;
    get headerClass(): boolean;
    get sortableLabel(): string;
    get columnMenuSettings(): ColumnMenuSettings;
    dropTargets: QueryList<DropTargetDirective>;
    filterMenus: QueryList<FilterMenuComponent>;
    columnMenus: QueryList<ColumnMenuComponent>;
    get unlockedColumnsCount(): number;
    private subscription;
    private targetSubscription;
    private _leafColumns;
    constructor(popupService: SinglePopupService, hint: DragHintService, cue: DropCueService, reorderService: ColumnReorderService, idService: IdService, sortService: SortService, localization: LocalizationService, columnInfoService: ColumnInfoService, cd: ChangeDetectorRef);
    sortColumn(descriptor: SortDescriptor[]): void;
    getColumnComponent(column: ColumnBase): ColumnComponent;
    onSortClick(column: ColumnComponent, event: MouseEvent, link: Element): void;
    onHeaderKeydown(column: ColumnComponent, args: KeyboardEvent): void;
    showSortNumbering(column: ColumnComponent): boolean;
    sortOrder(field: string): number;
    sortIcon(field: string): any;
    sortState(column: ColumnComponent): string;
    sortStatus(column: ColumnComponent): string;
    /**
     *
     * @param column
     * @param modifier - Indicates whether the client-defined `multiSortKey` modifier is met. Defaults to `true`.
     * @returns - SortDescriptor[]
     */
    toggleSort(column: ColumnComponent, modifier?: boolean): Array<SortDescriptor>;
    /**
     *
     * Determines whether the modifier key (if any) passed
     * with a click/keyboard event matches the user-defined multiSortKey.
     */
    matchModifier(event: MouseEvent | KeyboardEvent): boolean;
    ngAfterViewInit(): void;
    ngDoCheck(): void;
    ngOnChanges(changes: any): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    selectAllCheckboxId(): string;
    get selectAllCheckboxLabel(): string;
    isFirstOnRow(column: ColumnComponent, index: number): boolean;
    logicalColumnIndex(column: any): number;
    get showFilterMenu(): boolean;
    get showFilterRow(): boolean;
    showColumnMenu(column: any): boolean;
    isFilterable(column: ColumnComponent): boolean;
    canDrop(draggable: DraggableColumnDirective, target: DropTargetDirective): boolean;
    shouldActivate(column: ColumnBase): boolean;
    isSortable(column: ColumnComponent): boolean;
    isCheckboxColumn(column: any): boolean;
    trackByIndex(index: number, _item: any): any;
    addStickyStyles(column: ColumnBase): {
        [key: string]: any;
    };
    protected toggleDirection(field: string, allowUnsort: boolean, initialDirection: "asc" | "desc"): SortDescriptor;
    columnsForLevel(level: number): Array<ColumnBase>;
    isColumnGroupComponent(column: ColumnBase): boolean;
    get columnLevels(): Array<number>;
    private sortDescriptor;
    get leafColumns(): ColumnBase[];
    private attachTargets;
    private normalizeTarget;
    private trackMove;
    private calculateBefore;
    private enter;
    private leave;
    private drop;
    static ɵfac: i0.ɵɵFactoryDeclaration<HeaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<HeaderComponent, "[kendoGridHeader]", never, { "totalColumnLevels": "totalColumnLevels"; "columns": "columns"; "groups": "groups"; "detailTemplate": "detailTemplate"; "scrollable": "scrollable"; "filterable": "filterable"; "sort": "sort"; "filter": "filter"; "sortable": "sortable"; "groupable": "groupable"; "lockedColumnsCount": "lockedColumnsCount"; "resizable": "resizable"; "reorderable": "reorderable"; "columnMenu": "columnMenu"; "columnMenuTemplate": "columnMenuTemplate"; "totalColumnsCount": "totalColumnsCount"; "tabIndex": "tabIndex"; }, {}, never, never>;
}

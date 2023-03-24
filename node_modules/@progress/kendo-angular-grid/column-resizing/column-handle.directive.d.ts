/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ChangeDetectorRef, ElementRef, NgZone, OnDestroy, OnInit } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { ColumnBase } from '../columns/column-base';
import { DraggableDirective } from '@progress/kendo-angular-common';
import { ColumnResizingService } from './column-resizing.service';
import { ColumnInfoService } from '../common/column-info.service';
import * as i0 from "@angular/core";
/**
 * @hidden
 */
export declare class ColumnHandleDirective implements OnInit, OnDestroy {
    draggable: DraggableDirective;
    private element;
    private service;
    private zone;
    private cdr;
    private localization;
    private columnInfoService;
    columns: Array<ColumnBase>;
    column: ColumnBase;
    get visible(): string;
    get leftStyle(): number | null;
    get rightStyle(): number | null;
    private subscriptions;
    private rtl;
    autoFit(): void;
    constructor(draggable: DraggableDirective, element: ElementRef, service: ColumnResizingService, zone: NgZone, cdr: ChangeDetectorRef, localization: LocalizationService, columnInfoService: ColumnInfoService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private shouldUpdate;
    private initColumnWidth;
    private initState;
    private resize;
    private sizeToFit;
    private updateWidth;
    private columnsForLevel;
    private getTableDelta;
    static ɵfac: i0.ɵɵFactoryDeclaration<ColumnHandleDirective, [{ host: true; }, null, null, null, null, null, null]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ColumnHandleDirective, "[kendoGridColumnHandle]", never, { "columns": "columns"; "column": "column"; }, {}, never>;
}

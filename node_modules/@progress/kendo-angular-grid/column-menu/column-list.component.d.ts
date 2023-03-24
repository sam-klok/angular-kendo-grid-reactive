/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef, NgZone, Renderer2, EventEmitter, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
import { ColumnMenuService } from './column-menu.service';
import * as i0 from "@angular/core";
/**
 * @hidden
 */
export declare class ColumnListComponent implements OnInit, OnDestroy {
    private element;
    private ngZone;
    private renderer;
    get className(): boolean;
    reset: EventEmitter<any>;
    apply: EventEmitter<any>;
    columnChange: EventEmitter<any>;
    set columns(value: any[]);
    get columns(): any[];
    autoSync: boolean;
    allowHideAll: boolean;
    applyText: string;
    resetText: string;
    actionsClass: string;
    isLast: boolean;
    isExpanded: boolean;
    service: ColumnMenuService;
    private applyButton;
    private hasLocked;
    private hasVisibleLocked;
    private unlockedCount;
    private hasUnlockedFiltered;
    private hasFiltered;
    private _columns;
    private allColumns;
    private domSubscriptions;
    constructor(element: ElementRef, ngZone: NgZone, renderer: Renderer2);
    isDisabled(column: any): boolean;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    cancelChanges(): void;
    applyChanges(): void;
    onTab(e: Event): void;
    private forEachCheckBox;
    private updateDisabled;
    private updateColumnState;
    static ɵfac: i0.ɵɵFactoryDeclaration<ColumnListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ColumnListComponent, "kendo-grid-columnlist", never, { "columns": "columns"; "autoSync": "autoSync"; "allowHideAll": "allowHideAll"; "applyText": "applyText"; "resetText": "resetText"; "actionsClass": "actionsClass"; "isLast": "isLast"; "isExpanded": "isExpanded"; "service": "service"; }, { "reset": "reset"; "apply": "apply"; "columnChange": "columnChange"; }, never, never>;
}

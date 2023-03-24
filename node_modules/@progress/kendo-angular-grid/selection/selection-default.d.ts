/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { Subscription } from "rxjs";
import { RowArgs } from "../rendering/common/row-args";
import { SelectionEvent, CellSelectionItem } from "./types";
import { ColumnComponent } from '../columns/column.component';
import { PairSet } from './pair-set';
import { ContextService } from '../common/provider.service';
import * as i0 from "@angular/core";
/**
 * @hidden
 */
export declare class Selection {
    protected ctx: ContextService;
    protected cd: ChangeDetectorRef;
    /**
     * Defines the collection that will store the selected item keys.
     */
    selectedKeys: any[];
    /**
     * Defines the item key that will be stored in the `selectedKeys` collection.
     */
    selectionKey: string | ((context: RowArgs) => any);
    /**
     * Defines a function that determines the column key of a data cell.
     *
     * The function should return an unique value for each column.
     * By default, the Grid uses the column index as a column key.
     */
    columnKey: string | ((column: any, columnIndex: number) => any);
    /**
     * Fires when the `selectedKeys` collection has been updated.
     */
    selectedKeysChange: EventEmitter<any[]>;
    protected rowSelectionState: Set<any>;
    protected cellSelectionState: PairSet;
    protected lastSelectionState: any[];
    protected selectionChangeSubscription: Subscription;
    private get isCellSelectionMode();
    constructor(ctx: ContextService, cd: ChangeDetectorRef);
    ngOnChanges(changes: SimpleChanges): void;
    protected init(): void;
    /**
     * @hidden
     */
    destroy(): void;
    /**
     * @hidden
     */
    reset(): void;
    protected getItemKey(row: RowArgs): any;
    protected getSelectionItem(row: RowArgs, col: ColumnComponent, colIndex: number): CellSelectionItem;
    protected onSelectionChange(selection: SelectionEvent): void;
    private notifyChange;
    private setState;
    private stateToArray;
    static ɵfac: i0.ɵɵFactoryDeclaration<Selection, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<Selection, "kendo-grid-selection-base", never, { "selectedKeys": "selectedKeys"; "selectionKey": "kendoGridSelectBy"; "columnKey": "columnKey"; }, { "selectedKeysChange": "selectedKeysChange"; }, never>;
}

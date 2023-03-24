/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { OnDestroy, OnChanges } from '@angular/core';
import { IdService } from '../common/id.service';
import { NavigationService } from './navigation.service';
import { LogicalRow } from './logical-row.interface';
import * as i0 from "@angular/core";
/**
 * @hidden
 */
export declare class LogicalRowDirective implements LogicalRow, OnDestroy, OnChanges {
    private idService;
    private navigation;
    logicalRowIndex: number;
    logicalSlaveRow: boolean;
    logicalCellsCount: number;
    logicalSlaveCellsCount: number;
    dataRowIndex: number;
    dataItem: any;
    uid: number;
    get hostRole(): string;
    get ariaRowIndex(): number;
    get ariaOwns(): string;
    constructor(idService: IdService, navigation: NavigationService);
    ngOnChanges(changes: any): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LogicalRowDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<LogicalRowDirective, "[kendoGridLogicalRow]", never, { "logicalRowIndex": "logicalRowIndex"; "logicalSlaveRow": "logicalSlaveRow"; "logicalCellsCount": "logicalCellsCount"; "logicalSlaveCellsCount": "logicalSlaveCellsCount"; "dataRowIndex": "dataRowIndex"; "dataItem": "dataItem"; }, {}, never>;
}

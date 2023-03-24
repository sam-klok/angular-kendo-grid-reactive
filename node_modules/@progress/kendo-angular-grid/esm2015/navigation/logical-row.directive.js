/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, HostBinding, Input } from '@angular/core';
import { anyChanged } from '@progress/kendo-angular-common';
import * as i0 from "@angular/core";
import * as i1 from "../common/id.service";
import * as i2 from "./navigation.service";
let id = 0;
function nextId() {
    return id++;
}
/**
 * @hidden
 */
export class LogicalRowDirective {
    constructor(idService, navigation) {
        this.idService = idService;
        this.navigation = navigation;
        this.logicalSlaveRow = false;
        this.logicalSlaveCellsCount = 0;
        this.dataRowIndex = -1;
        this.uid = nextId();
    }
    get hostRole() {
        return this.logicalSlaveRow ? 'presentation' : 'row';
    }
    get ariaRowIndex() {
        return this.logicalRowIndex + 1;
    }
    get ariaOwns() {
        if (!this.navigation.enabled || this.logicalSlaveRow || this.logicalSlaveCellsCount === 0) {
            return undefined;
        }
        const ids = [];
        const total = this.logicalCellsCount + this.logicalSlaveCellsCount;
        for (let cellIndex = this.logicalCellsCount; cellIndex < total; cellIndex++) {
            ids.push(this.idService.cellId(this.logicalRowIndex, cellIndex));
        }
        return ids.join(' ');
    }
    ngOnChanges(changes) {
        if (!this.navigation.enabled || this.logicalSlaveRow) {
            return;
        }
        const indexChange = changes.logicalRowIndex;
        const logicalSlaveRowChange = changes.logicalSlaveRow;
        if (indexChange || logicalSlaveRowChange) {
            const index = indexChange && !indexChange.isFirstChange() ? indexChange.previousValue : this.logicalRowIndex;
            this.navigation.unregisterRow(index, this);
            this.navigation.registerRow(this);
        }
        else if (anyChanged(['dataRowIndex', 'dataItem'], changes)) {
            this.navigation.updateRow(this);
        }
    }
    ngOnDestroy() {
        this.navigation.unregisterRow(this.logicalRowIndex, this);
    }
}
LogicalRowDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: LogicalRowDirective, deps: [{ token: i1.IdService }, { token: i2.NavigationService }], target: i0.ɵɵFactoryTarget.Directive });
LogicalRowDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.16", type: LogicalRowDirective, selector: "[kendoGridLogicalRow]", inputs: { logicalRowIndex: "logicalRowIndex", logicalSlaveRow: "logicalSlaveRow", logicalCellsCount: "logicalCellsCount", logicalSlaveCellsCount: "logicalSlaveCellsCount", dataRowIndex: "dataRowIndex", dataItem: "dataItem" }, host: { properties: { "attr.role": "this.hostRole", "attr.aria-rowindex": "this.ariaRowIndex", "attr.aria-owns": "this.ariaOwns" } }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: LogicalRowDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[kendoGridLogicalRow]'
                }]
        }], ctorParameters: function () { return [{ type: i1.IdService }, { type: i2.NavigationService }]; }, propDecorators: { logicalRowIndex: [{
                type: Input
            }], logicalSlaveRow: [{
                type: Input
            }], logicalCellsCount: [{
                type: Input
            }], logicalSlaveCellsCount: [{
                type: Input
            }], dataRowIndex: [{
                type: Input
            }], dataItem: [{
                type: Input
            }], hostRole: [{
                type: HostBinding,
                args: ['attr.role']
            }], ariaRowIndex: [{
                type: HostBinding,
                args: ['attr.aria-rowindex']
            }], ariaOwns: [{
                type: HostBinding,
                args: ['attr.aria-owns']
            }] } });

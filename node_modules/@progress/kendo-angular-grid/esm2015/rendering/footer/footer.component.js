/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, HostBinding } from '@angular/core';
import { columnsToRender } from '../../columns/column-common';
import { isPresent } from '../../utils';
import * as i0 from "@angular/core";
import * as i1 from "./../../common/column-info.service";
import * as i2 from "../../navigation/logical-row.directive";
import * as i3 from "@angular/common";
import * as i4 from "../../navigation/logical-cell.directive";
import * as i5 from "../common/template-context.directive";
/**
 * @hidden
 */
export class FooterComponent {
    constructor(columnInfoService) {
        this.columnInfoService = columnInfoService;
        this.columns = [];
        this.groups = [];
        this.lockedColumnsCount = 0;
        this.logicalRowIndex = 0;
    }
    get footerClass() {
        return !this.scrollable;
    }
    get columnsToRender() {
        return columnsToRender(this.columns || []);
    }
    logicalColumnIndex(column) {
        const index = column.leafIndex;
        if (isPresent(index)) {
            return index + (isPresent(this.detailTemplate) ? 1 : 0);
        }
        return -1;
    }
    addStickyStyles(column) {
        const stickyStyles = this.columnInfoService.stickyColumnsStyles(column);
        return Object.assign(Object.assign({}, column.style), stickyStyles);
    }
}
FooterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: FooterComponent, deps: [{ token: i1.ColumnInfoService }], target: i0.ɵɵFactoryTarget.Component });
FooterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: FooterComponent, selector: "[kendoGridFooter]", inputs: { columns: "columns", groups: "groups", detailTemplate: "detailTemplate", scrollable: "scrollable", lockedColumnsCount: "lockedColumnsCount", logicalRowIndex: "logicalRowIndex" }, host: { properties: { "class.k-grid-footer": "this.footerClass" } }, ngImport: i0, template: `
    <ng-container>
        <tr
            [class.k-footer-template]="true"
            kendoGridLogicalRow
                [logicalRowIndex]="logicalRowIndex"
                [logicalSlaveRow]="lockedColumnsCount > 0"
                [logicalCellsCount]="columns.length"
                [logicalSlaveCellsCount]="columns.length - lockedColumnsCount"
            >
            <td
                [class.k-group-cell]="true"
                role="presentation"
                *ngFor="let g of groups">
            </td>
            <td
                [class.k-hierarchy-cell]="true"
                role="presentation"
                *ngIf="detailTemplate?.templateRef">
            </td>
            <td
                *ngFor="let column of columnsToRender; let columnIndex = index"
                kendoGridLogicalCell
                    [logicalRowIndex]="logicalRowIndex"
                    [logicalColIndex]="logicalColumnIndex(column)"
                    role="columnfooter"
                    aria-selected="false"
                [class.k-grid-footer-sticky]="column.sticky"
                [ngClass]="column.footerClass"
                [ngStyle]="column.sticky ? addStickyStyles(column) : column.footerStyle">
                <ng-template
                    [templateContext]="{
                        templateRef: column.footerTemplateRef,
                        columnIndex: lockedColumnsCount + columnIndex,
                        column: column,
                        $implicit: column
                    }">
                </ng-template>
            </td>
        </tr>
    </ng-container>
    `, isInline: true, directives: [{ type: i2.LogicalRowDirective, selector: "[kendoGridLogicalRow]", inputs: ["logicalRowIndex", "logicalSlaveRow", "logicalCellsCount", "logicalSlaveCellsCount", "dataRowIndex", "dataItem"] }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.LogicalCellDirective, selector: "[kendoGridLogicalCell]", inputs: ["logicalColIndex", "logicalRowIndex", "logicalSlaveCell", "colIndex", "colSpan", "rowSpan", "groupItem", "dataRowIndex", "dataItem", "detailExpandCell", "headerLabelText"] }, { type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i3.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i5.TemplateContextDirective, selector: "[templateContext]", inputs: ["templateContext"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: FooterComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[kendoGridFooter]',
                    template: `
    <ng-container>
        <tr
            [class.k-footer-template]="true"
            kendoGridLogicalRow
                [logicalRowIndex]="logicalRowIndex"
                [logicalSlaveRow]="lockedColumnsCount > 0"
                [logicalCellsCount]="columns.length"
                [logicalSlaveCellsCount]="columns.length - lockedColumnsCount"
            >
            <td
                [class.k-group-cell]="true"
                role="presentation"
                *ngFor="let g of groups">
            </td>
            <td
                [class.k-hierarchy-cell]="true"
                role="presentation"
                *ngIf="detailTemplate?.templateRef">
            </td>
            <td
                *ngFor="let column of columnsToRender; let columnIndex = index"
                kendoGridLogicalCell
                    [logicalRowIndex]="logicalRowIndex"
                    [logicalColIndex]="logicalColumnIndex(column)"
                    role="columnfooter"
                    aria-selected="false"
                [class.k-grid-footer-sticky]="column.sticky"
                [ngClass]="column.footerClass"
                [ngStyle]="column.sticky ? addStickyStyles(column) : column.footerStyle">
                <ng-template
                    [templateContext]="{
                        templateRef: column.footerTemplateRef,
                        columnIndex: lockedColumnsCount + columnIndex,
                        column: column,
                        $implicit: column
                    }">
                </ng-template>
            </td>
        </tr>
    </ng-container>
    `
                }]
        }], ctorParameters: function () { return [{ type: i1.ColumnInfoService }]; }, propDecorators: { columns: [{
                type: Input
            }], groups: [{
                type: Input
            }], detailTemplate: [{
                type: Input
            }], scrollable: [{
                type: Input
            }], lockedColumnsCount: [{
                type: Input
            }], logicalRowIndex: [{
                type: Input
            }], footerClass: [{
                type: HostBinding,
                args: ['class.k-grid-footer']
            }] } });

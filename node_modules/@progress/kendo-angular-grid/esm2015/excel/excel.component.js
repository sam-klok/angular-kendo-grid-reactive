/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, ContentChildren, QueryList } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { saveAs } from '@progress/kendo-file-saver';
import { toDataURL, workbookOptions, ColumnBase } from '@progress/kendo-angular-excel-export';
import { ExcelExportEvent } from './excel-export-event';
import { orderBy } from '@progress/kendo-data-query';
import { sortColumns } from '../columns/column-common';
import * as i0 from "@angular/core";
import * as i1 from "./excel.service";
import * as i2 from "@progress/kendo-angular-l10n";
const fetchComponentData = (component) => {
    return {
        data: component.view.map(item => item),
        group: component.group
    };
};
const toExcelColumn = (column) => {
    return {
        title: column.title,
        field: column.field,
        locked: Boolean(column.locked),
        width: column.width,
        level: column.level,
        hidden: !column.isVisible,
        groupHeaderTemplate: column.groupHeaderTemplate,
        groupHeaderColumnTemplate: column.groupHeaderColumnTemplate,
        groupFooterTemplate: column.groupFooterTemplate,
        footerTemplate: column.footerTemplate
    };
};
const toExcelColumns = (columns) => {
    const result = [];
    sortColumns(columns)
        .forEach((column) => {
        if (column.isSpanColumn) {
            result.push(...toExcelColumns(column.childrenArray));
        }
        else {
            const excelColumn = toExcelColumn(column);
            if (column.isColumnGroup) {
                excelColumn.children = [excelColumn].concat(toExcelColumns(column.childrenArray));
            }
            result.push(excelColumn);
        }
    });
    return result;
};
const componentColumns = (component) => {
    const columns = toExcelColumns(component.columns.toArray());
    return orderBy(columns, [{ field: 'locked', dir: 'desc' }]);
};
/**
 * Configures the settings for the export of Grid in Excel ([see example]({% slug excelexport_grid %})).
 */
export class ExcelComponent {
    constructor(excelService, localization, zone) {
        this.localization = localization;
        this.zone = zone;
        /**
         * Specifies the file name of the exported Excel file.
         * @default "Export.xlsx"
         */
        this.fileName = 'Export.xlsx';
        /**
         * @hidden
         */
        this.columns = new QueryList();
        this.saveSubscription = excelService.saveToExcel.subscribe(this.save.bind(this));
    }
    ngOnDestroy() {
        this.saveSubscription.unsubscribe();
        if (this.dataSubscription) {
            this.dataSubscription.unsubscribe();
        }
    }
    save(component) {
        const data = (this.fetchData || fetchComponentData)(component);
        const exportData = (result) => {
            delete this.dataSubscription;
            this.exportData(component, result);
        };
        if (data instanceof Promise) {
            data.then(exportData);
        }
        else if (data instanceof Observable) {
            this.dataSubscription = data.pipe(take(1)).subscribe(exportData);
        }
        else {
            exportData(data);
        }
    }
    exportData(component, result) {
        const options = workbookOptions({
            columns: this.columns.length ? this.columns : componentColumns(component),
            data: result.data,
            group: result.group,
            filterable: this.filterable,
            creator: this.creator,
            date: this.date,
            paddingCellOptions: this.paddingCellOptions,
            headerPaddingCellOptions: this.headerPaddingCellOptions,
            rtl: this.localization.rtl,
            collapsible: this.collapsible
        });
        const args = new ExcelExportEvent(options);
        component.excelExport.emit(args);
        if (!args.isDefaultPrevented()) {
            this.zone.runOutsideAngular(() => this.saveFile(options));
        }
    }
    saveFile(options) {
        toDataURL(options).then((dataURL) => {
            saveAs(dataURL, this.fileName, {
                forceProxy: this.forceProxy,
                proxyURL: this.proxyURL
            });
        });
    }
}
ExcelComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ExcelComponent, deps: [{ token: i1.ExcelService }, { token: i2.LocalizationService }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
ExcelComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: ExcelComponent, selector: "kendo-grid-excel", inputs: { fileName: "fileName", filterable: "filterable", creator: "creator", date: "date", forceProxy: "forceProxy", proxyURL: "proxyURL", fetchData: "fetchData", paddingCellOptions: "paddingCellOptions", headerPaddingCellOptions: "headerPaddingCellOptions", collapsible: "collapsible" }, queries: [{ propertyName: "columns", predicate: ColumnBase, descendants: true }], ngImport: i0, template: ``, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ExcelComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'kendo-grid-excel',
                    template: ``
                }]
        }], ctorParameters: function () { return [{ type: i1.ExcelService }, { type: i2.LocalizationService }, { type: i0.NgZone }]; }, propDecorators: { fileName: [{
                type: Input
            }], filterable: [{
                type: Input
            }], creator: [{
                type: Input
            }], date: [{
                type: Input
            }], forceProxy: [{
                type: Input
            }], proxyURL: [{
                type: Input
            }], fetchData: [{
                type: Input
            }], paddingCellOptions: [{
                type: Input
            }], headerPaddingCellOptions: [{
                type: Input
            }], collapsible: [{
                type: Input
            }], columns: [{
                type: ContentChildren,
                args: [ColumnBase, { descendants: true }]
            }] } });

/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, HostListener, HostBinding } from '@angular/core';
import { Button } from '@progress/kendo-angular-buttons';
import * as i0 from "@angular/core";
import * as i1 from "./excel.service";
import * as i2 from "@progress/kendo-angular-l10n";
/**
 * Represents the `export-to-Excel` command of the Grid. You can apply this
 * directive to any `button` element inside a
 * [ToolbarTemplate]({% slug api_grid_commandcolumncomponent %}).
 * When the user clicks a button associated with the directive, the
 * [excelExport]({% slug api_grid_gridcomponent %}#toc-excelexport) event
 * fires ([see example]({% slug excelexport_grid %})).
 *
 * @example
 * ```html-no-run
 * <kendo-grid>
 *      <ng-template kendoGridToolbarTemplate>
 *          <button kendoGridExcelCommand>Export to PDF</button>
 *      </ng-template>
 *      <kendo-grid-excel fileName="Grid.xlsx">
 *      </kendo-grid-excel>
 * </kendo-grid>
 * ```
 */
export class ExcelCommandDirective extends Button {
    constructor(excelService, element, renderer, localization, ngZone) {
        super(element, renderer, null, localization, ngZone);
        this.excelService = excelService;
        this.ngZone = ngZone;
    }
    /**
     * @hidden
     */
    onClick(e) {
        e.preventDefault();
        this.excelService.exportClick.emit();
    }
    /**
     * @hidden
     */
    get excelClass() {
        return true;
    }
}
ExcelCommandDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ExcelCommandDirective, deps: [{ token: i1.ExcelService }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i2.LocalizationService }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive });
ExcelCommandDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.16", type: ExcelCommandDirective, selector: "[kendoGridExcelCommand]", host: { listeners: { "click": "onClick($event)" }, properties: { "class.k-grid-excel": "this.excelClass" } }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ExcelCommandDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[kendoGridExcelCommand]'
                }]
        }], ctorParameters: function () { return [{ type: i1.ExcelService }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i2.LocalizationService }, { type: i0.NgZone }]; }, propDecorators: { onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }], excelClass: [{
                type: HostBinding,
                args: ['class.k-grid-excel']
            }] } });

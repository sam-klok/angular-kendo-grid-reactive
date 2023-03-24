/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, HostListener, HostBinding } from '@angular/core';
import { Button } from '@progress/kendo-angular-buttons';
import * as i0 from "@angular/core";
import * as i1 from "./pdf.service";
import * as i2 from "@progress/kendo-angular-l10n";
/**
 * Represents the `export-to-PDF` command of the Grid.
 * You can apply this directive to any `button` element inside a
 * [ToolbarTemplate]({% slug api_grid_commandcolumncomponent %}).
 * When the user clicks a button that is associated with the directive, the
 * [pdfExport]({% slug api_grid_gridcomponent %}#toc-pdfexport) event
 * fires ([see example]({% slug pdfexport_grid %})).
 *
 * @example
 * ```html-no-run
 * <kendo-grid>
 *      <ng-template kendoGridToolbarTemplate>
 *          <button kendoGridPDFCommand>Export to PDF</button>
 *      </ng-template>
 *      <kendo-grid-pdf fileName="Grid.pdf">
 *      </kendo-grid-pdf>
 * </kendo-grid>
 * ```
 */
export class PDFCommandDirective extends Button {
    constructor(pdfService, element, renderer, localization, ngZone) {
        super(element, renderer, null, localization, ngZone);
        this.pdfService = pdfService;
        this.ngZone = ngZone;
    }
    /**
     * @hidden
     */
    onClick(e) {
        e.preventDefault();
        this.pdfService.exportClick.emit();
    }
    /**
     * @hidden
     */
    get pdfClass() {
        return true;
    }
}
PDFCommandDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: PDFCommandDirective, deps: [{ token: i1.PDFService }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i2.LocalizationService }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive });
PDFCommandDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.16", type: PDFCommandDirective, selector: "[kendoGridPDFCommand]", host: { listeners: { "click": "onClick($event)" }, properties: { "class.k-grid-pdf": "this.pdfClass" } }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: PDFCommandDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[kendoGridPDFCommand]'
                }]
        }], ctorParameters: function () { return [{ type: i1.PDFService }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i2.LocalizationService }, { type: i0.NgZone }]; }, propDecorators: { onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }], pdfClass: [{
                type: HostBinding,
                args: ['class.k-grid-pdf']
            }] } });

/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@progress/kendo-angular-inputs";
/**
 * @hidden
 */
export class PagerInputDirective {
    constructor(host, renderer) {
        this.host = host;
        this.renderer = renderer;
    }
    ngAfterViewInit() {
        const inputElement = this.host.numericInput.nativeElement;
        this.renderer.addClass(inputElement, 'k-pager-nav');
    }
}
PagerInputDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: PagerInputDirective, deps: [{ token: i1.NumericTextBoxComponent }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
PagerInputDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.16", type: PagerInputDirective, selector: "[kendoGridPagerInput]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: PagerInputDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[kendoGridPagerInput]' }]
        }], ctorParameters: function () { return [{ type: i1.NumericTextBoxComponent }, { type: i0.Renderer2 }]; } });

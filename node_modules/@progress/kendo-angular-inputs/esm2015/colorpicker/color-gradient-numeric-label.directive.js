/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./../numerictextbox/numerictextbox.component";
/**
 * @hidden
 */
export class NumericLabelDirective {
    constructor(host) {
        this.host = host;
    }
    ngOnInit() {
        const localizationToken = `${this.kendoAdditionalNumericLabel}ChannelLabel`;
        this.host.numericInput.nativeElement.setAttribute('aria-label', this.localizationService.get(localizationToken));
    }
}
NumericLabelDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: NumericLabelDirective, deps: [{ token: i1.NumericTextBoxComponent }], target: i0.ɵɵFactoryTarget.Directive });
NumericLabelDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.16", type: NumericLabelDirective, selector: "[kendoAdditionalNumericLabel]", inputs: { kendoAdditionalNumericLabel: "kendoAdditionalNumericLabel", localizationService: "localizationService" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: NumericLabelDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[kendoAdditionalNumericLabel]' }]
        }], ctorParameters: function () { return [{ type: i1.NumericTextBoxComponent }]; }, propDecorators: { kendoAdditionalNumericLabel: [{
                type: Input
            }], localizationService: [{
                type: Input
            }] } });

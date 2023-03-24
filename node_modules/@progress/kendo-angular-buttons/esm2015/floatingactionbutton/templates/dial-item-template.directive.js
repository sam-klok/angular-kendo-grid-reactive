/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, Optional } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Represents a template that defines the content of the whole dial item.
 * To define the template, nest an `<ng-template>` tag
 * with the `kendoDialItemTemplate` directive inside the `<kendo-floatingactionbutton>` tag
 * ([see example]({% slug templates_floatingactionbutton %}#toc-dial-item-template)).
 */
export class DialItemTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
DialItemTemplateDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: DialItemTemplateDirective, deps: [{ token: i0.TemplateRef, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
DialItemTemplateDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.16", type: DialItemTemplateDirective, selector: "[kendoDialItemTemplate]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: DialItemTemplateDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[kendoDialItemTemplate]'
                }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef, decorators: [{
                    type: Optional
                }] }]; } });

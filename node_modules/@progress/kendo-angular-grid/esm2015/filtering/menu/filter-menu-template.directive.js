/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, Optional } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Represents the filter-menu template
 * ([see example]({% slug filter_menu %}#toc-custom-filters)).
 */
export class FilterMenuTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
FilterMenuTemplateDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: FilterMenuTemplateDirective, deps: [{ token: i0.TemplateRef, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
FilterMenuTemplateDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.16", type: FilterMenuTemplateDirective, selector: "[kendoGridFilterMenuTemplate]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: FilterMenuTemplateDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[kendoGridFilterMenuTemplate]'
                }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef, decorators: [{
                    type: Optional
                }] }]; } });

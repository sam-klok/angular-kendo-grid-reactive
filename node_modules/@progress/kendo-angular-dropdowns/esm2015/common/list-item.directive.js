/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * @hidden
 */
export class ListItemDirective {
    constructor(element) {
        this.element = element;
    }
}
ListItemDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ListItemDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
ListItemDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.16", type: ListItemDirective, selector: "\"li[role=option], li[role=group]\"", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ListItemDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '"li[role=option], li[role=group]"' // eslint-disable-line
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; } });

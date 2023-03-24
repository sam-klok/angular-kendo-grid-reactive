/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, EventEmitter } from '@angular/core';
import { getScrollbarWidth } from './get-scrollbar-width';
import { isDocumentAvailable } from './is-document-available';
import * as i0 from "@angular/core";
const propName = '--kendo-scrollbar-width';
/**
 * @hidden
 */
export class ScrollbarWidthService {
    constructor() {
        this.changes = new EventEmitter();
        if (typeof window !== 'undefined' && isDocumentAvailable()) {
            document.body.style.setProperty(propName, `${getScrollbarWidth()}px`);
        }
    }
}
ScrollbarWidthService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ScrollbarWidthService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ScrollbarWidthService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ScrollbarWidthService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ScrollbarWidthService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

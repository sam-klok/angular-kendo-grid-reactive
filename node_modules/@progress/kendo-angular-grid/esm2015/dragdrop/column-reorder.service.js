/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * @hidden
 */
export class ColumnReorderService {
    constructor() {
        this.changes = new EventEmitter();
    }
    reorder(e) {
        this.changes.emit(e);
    }
}
ColumnReorderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ColumnReorderService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ColumnReorderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ColumnReorderService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ColumnReorderService, decorators: [{
            type: Injectable
        }] });

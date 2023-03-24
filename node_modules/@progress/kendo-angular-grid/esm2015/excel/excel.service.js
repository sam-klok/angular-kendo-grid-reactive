/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter, Injectable, isDevMode } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * @hidden
 */
export class ExcelService {
    constructor() {
        this.saveToExcel = new EventEmitter();
        this.exportClick = new EventEmitter();
    }
    save(component) {
        if (this.saveToExcel.observers.length === 0) {
            if (isDevMode()) {
                throw new Error('Saving excel requires including the ExcelModule and adding the <kendo-grid-excel> component.');
            }
        }
        else {
            this.saveToExcel.emit(component);
        }
    }
}
ExcelService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ExcelService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ExcelService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ExcelService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ExcelService, decorators: [{
            type: Injectable
        }] });

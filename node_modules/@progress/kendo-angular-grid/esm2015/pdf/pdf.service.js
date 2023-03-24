/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter, Injectable, isDevMode } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * @hidden
 */
export class PDFService {
    constructor() {
        this.savePDF = new EventEmitter();
        this.drawPDF = new EventEmitter();
        this.exportClick = new EventEmitter();
        this.dataChanged = new EventEmitter();
    }
    save(component) {
        this.emitEvent(this.savePDF, component);
    }
    draw(component, promise) {
        this.emitEvent(this.drawPDF, { component, promise });
    }
    /**
     * @hidden
     */
    emitEvent(emitter, args) {
        if (emitter.observers.length === 0) {
            if (isDevMode()) {
                throw new Error('Creating PDF requires including the PDFModule and adding the <kendo-grid-pdf> component.');
            }
        }
        else {
            emitter.emit(args);
        }
    }
}
PDFService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: PDFService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
PDFService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: PDFService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: PDFService, decorators: [{
            type: Injectable
        }] });

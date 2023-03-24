/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable } from '@angular/core';
import { append } from './common';
import * as i0 from "@angular/core";
/**
 * @hidden
 */
export class DropCueService {
    create() {
        this.dom = document.createElement("div");
        this.dom.className = 'k-grouping-dropclue';
        this.hide();
    }
    attach() {
        return append(this.dom);
    }
    remove() {
        if (this.dom && this.dom.parentElement) {
            document.body.removeChild(this.dom);
            this.dom = null;
        }
    }
    hide() {
        this.dom.style.display = "none";
    }
    position({ left, top, height }) {
        this.dom.style.display = 'block';
        this.dom.style.height = height + 'px';
        this.dom.style.top = top + 'px';
        const width = this.dom.offsetWidth / 2;
        this.dom.style.left = left - width + 'px';
    }
}
DropCueService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: DropCueService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
DropCueService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: DropCueService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: DropCueService, decorators: [{
            type: Injectable
        }] });

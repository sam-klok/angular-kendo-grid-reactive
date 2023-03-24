/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, SecurityContext } from '@angular/core';
import { append } from './common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
const updateClass = (element, valid) => {
    const icon = element.querySelector('.k-icon');
    icon.className = icon.className
        .replace(/(plus|cancel)/, valid ? 'plus' : 'cancel');
};
const updateLock = (element, locked = null) => {
    const icon = element.querySelectorAll('.k-icon')[1];
    const value = locked === null ? '' : (locked ? 'k-i-lock' : 'k-i-unlock');
    icon.className = icon.className
        .replace(/(k-i-unlock|k-i-lock)/, '') + ` ${value}`;
};
const decorate = (element) => {
    element.className = 'k-header k-drag-clue';
    element.style.position = 'absolute';
    element.style.zIndex = '20000';
};
/**
 * @hidden
 */
export class DragHintService {
    constructor(santizer) {
        this.santizer = santizer;
    }
    create(title) {
        this.dom = document.createElement("div");
        decorate(this.dom);
        const safeTitle = this.santizer.sanitize(SecurityContext.HTML, title);
        this.dom.innerHTML = `
            <span class="k-icon k-drag-status k-i-cancel k-icon-with-modifier">
                <span class="k-icon k-icon-modifier"></span>
            </span>
            ${safeTitle}
        `;
    }
    attach() {
        return append(this.dom);
    }
    remove() {
        if (this.dom && this.dom.parentNode) {
            (function (el) {
                setTimeout(() => document.body.removeChild(el));
            })(this.dom); // hack for IE + pointer events!
            this.dom = null;
        }
    }
    show() {
        this.dom.style.display = "";
    }
    hide() {
        this.dom.style.display = "none";
    }
    enable() {
        updateClass(this.dom, true);
    }
    disable() {
        updateClass(this.dom, false);
    }
    removeLock() {
        updateLock(this.dom);
    }
    toggleLock(locked) {
        updateLock(this.dom, locked);
    }
    move(move) {
        this.dom.style.top = move.pageY + 'px';
        this.dom.style.left = move.pageX + 'px';
    }
}
DragHintService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: DragHintService, deps: [{ token: i1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Injectable });
DragHintService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: DragHintService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: DragHintService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.DomSanitizer }]; } });

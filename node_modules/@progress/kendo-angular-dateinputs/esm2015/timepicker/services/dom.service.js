/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable } from '@angular/core';
import { isDocumentAvailable } from '@progress/kendo-angular-common';
import { domContainerFactory as containerFactory } from '../../util';
import * as i0 from "@angular/core";
const div = containerFactory('div');
const ul = containerFactory('ul');
const li = containerFactory('li');
const span = containerFactory('span');
const listTitle = () => span('hour', 'k-title k-timeselector-title');
const listItem = () => li('<span>02</span>', 'k-item');
const list = () => ul([listItem()], 'k-reset');
const scrollable = () => (div([list()], 'k-time-container k-flex k-content k-scrollable'));
const timeListWrapper = () => {
    if (!isDocumentAvailable()) {
        return null;
    }
    return div([listTitle(), div([scrollable()], 'k-time-list')], 'k-time-list-wrapper', { left: '-10000px', position: 'absolute' });
};
const TIMELIST_WRAPPER = timeListWrapper();
/**
 * @hidden
 */
export class TimePickerDOMService {
    ensureHeights() {
        if (this.timeListHeight !== undefined) {
            return;
        }
        this.calculateHeights();
    }
    calculateHeights(container) {
        if (!isDocumentAvailable()) {
            return;
        }
        const listContainer = container && container.querySelector('.k-time-list-container');
        const hostContainer = listContainer || document.body;
        const wrapper = hostContainer.appendChild(TIMELIST_WRAPPER);
        this.timeListHeight = wrapper.querySelector('.k-scrollable').getBoundingClientRect().height;
        this.itemHeight = wrapper.querySelector('li').getBoundingClientRect().height;
        hostContainer.removeChild(wrapper);
    }
    isActive(element) {
        if (!isDocumentAvailable() || !element) {
            return false;
        }
        return (element.nativeElement || element) === document.activeElement;
    }
}
TimePickerDOMService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: TimePickerDOMService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
TimePickerDOMService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: TimePickerDOMService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: TimePickerDOMService, decorators: [{
            type: Injectable
        }] });

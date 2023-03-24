/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Input, isDevMode, HostBinding, Component } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * @hidden
 */
export class ColumnMenuItemBase {
    constructor() {
        this.hostClass = true;
    }
    ngOnInit() {
        if (isDevMode() && !this.service) {
            throw new Error('The service input of the predefined column menu components is mandatory.');
        }
    }
    /**
     * @hidden
     */
    close() {
        this.service.close();
    }
}
ColumnMenuItemBase.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ColumnMenuItemBase, deps: [], target: i0.ɵɵFactoryTarget.Component });
ColumnMenuItemBase.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: ColumnMenuItemBase, selector: "kendo-grid-column-menu-item-base", inputs: { service: "service" }, host: { properties: { "class.k-columnmenu-item-wrapper": "this.hostClass" } }, ngImport: i0, template: ``, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ColumnMenuItemBase, decorators: [{
            type: Component,
            args: [{
                    selector: 'kendo-grid-column-menu-item-base',
                    template: ``
                }]
        }], propDecorators: { service: [{
                type: Input
            }], hostClass: [{
                type: HostBinding,
                args: ['class.k-columnmenu-item-wrapper']
            }] } });

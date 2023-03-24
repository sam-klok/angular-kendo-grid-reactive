/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, HostBinding, HostListener, Input, Optional } from "@angular/core";
import { Button } from '@progress/kendo-angular-buttons';
import { L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
import * as i0 from "@angular/core";
import * as i1 from "./../drag-resize.service";
import * as i2 from "@progress/kendo-angular-l10n";
export class WindowMaximizeActionDirective extends Button {
    constructor(el, renderer, _service, localization, ngZone) {
        super(el, renderer, null, localization, ngZone);
        this.buttonType = 'button';
        this.buttonClass = true;
        this.window = _service;
        this.fillMode = 'flat';
        this.icon = 'window';
    }
    /**
     * @hidden
     */
    onClick() {
        if (!this.isDisabled) {
            this.window.maximizeAction();
        }
    }
    get visible() {
        return this.window.options.state === 'default' ? 'inline-flex' : 'none';
    }
}
WindowMaximizeActionDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: WindowMaximizeActionDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.DragResizeService, optional: true }, { token: i2.LocalizationService }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive });
WindowMaximizeActionDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.16", type: WindowMaximizeActionDirective, selector: "button[kendoWindowMaximizeAction]", inputs: { window: "window" }, host: { listeners: { "click": "onClick()" }, properties: { "attr.type": "this.buttonType", "class.k-window-action": "this.buttonClass", "style.display": "this.visible" } }, providers: [
        LocalizationService,
        {
            provide: L10N_PREFIX,
            useValue: 'kendo.button'
        }
    ], exportAs: ["kendoWindowMaximizeAction"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: WindowMaximizeActionDirective, decorators: [{
            type: Directive,
            args: [{
                    exportAs: 'kendoWindowMaximizeAction',
                    providers: [
                        LocalizationService,
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.button'
                        }
                    ],
                    selector: 'button[kendoWindowMaximizeAction]' // eslint-disable-line
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.DragResizeService, decorators: [{
                    type: Optional
                }] }, { type: i2.LocalizationService }, { type: i0.NgZone }]; }, propDecorators: { window: [{
                type: Input
            }], buttonType: [{
                type: HostBinding,
                args: ['attr.type']
            }], buttonClass: [{
                type: HostBinding,
                args: ['class.k-window-action']
            }], onClick: [{
                type: HostListener,
                args: ['click']
            }], visible: [{
                type: HostBinding,
                args: ['style.display']
            }] } });

/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, HostListener, HostBinding } from '@angular/core';
import { Button } from '@progress/kendo-angular-buttons';
import * as i0 from "@angular/core";
import * as i1 from "./edit.service";
import * as i2 from "@progress/kendo-angular-l10n";
/**
 * Represents the command for adding a new item to the Grid. You can apply this directive to any
 * `button` element inside a [ToolbarTemplate]({% slug api_grid_commandcolumncomponent %}).
 * When an associated button with the directive is clicked, the
 * [add]({% slug api_grid_gridcomponent %}#toc-add) event is triggered
 * ([see example]({% slug basics_editing_grid %})).
 *
 * @example
 * ```html-no-run
 * <kendo-grid>
 *    <ng-template kendoGridToolbarTemplate>
 *       <button kendoGridAddCommand>Add new</button>
 *    </ng-template>
 * </kendo-grid>
 * ```
 */
export class AddCommandDirective extends Button {
    constructor(editService, element, renderer, localization, ngZone) {
        super(element, renderer, null, localization, ngZone);
        this.editService = editService;
    }
    /**
     * @hidden
     */
    onClick(e) {
        e.preventDefault();
        this.editService.beginAdd();
    }
    /**
     * @hidden
     */
    get commandClass() {
        return true;
    }
}
AddCommandDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: AddCommandDirective, deps: [{ token: i1.EditService }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i2.LocalizationService }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive });
AddCommandDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.16", type: AddCommandDirective, selector: "[kendoGridAddCommand]", host: { listeners: { "click": "onClick($event)" }, properties: { "class.k-grid-add-command": "this.commandClass" } }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: AddCommandDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[kendoGridAddCommand]'
                }]
        }], ctorParameters: function () { return [{ type: i1.EditService }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i2.LocalizationService }, { type: i0.NgZone }]; }, propDecorators: { onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }], commandClass: [{
                type: HostBinding,
                args: ['class.k-grid-add-command']
            }] } });

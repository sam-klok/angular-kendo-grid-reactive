/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, HostListener, HostBinding, Inject } from '@angular/core';
import { Button } from '@progress/kendo-angular-buttons';
import { CELL_CONTEXT } from '../rendering/common/cell-context';
import * as i0 from "@angular/core";
import * as i1 from "./edit.service";
import * as i2 from "@progress/kendo-angular-l10n";
/**
 * Represents the `cancel` command of the Grid. You can apply this directive to any `button`
 * element inside a [CommandColumnComponent]({% slug api_grid_commandcolumncomponent %}).
 * When an associated button with the directive is clicked, the
 * [cancel]({% slug api_grid_gridcomponent %}#toc-cancel) event
 * is triggered ([see example]({% slug basics_editing_grid %})).
 *
 * > When the row is not in the edit mode, the button with the `kendoGridCancelCommand` is automatically hidden.
 *
 * @example
 * ```html-no-run
 * <kendo-grid>
 *   <kendo-grid-command-column title="command">
 *     <ng-template kendoGridCellTemplate>
 *       <button kendoGridCancelCommand>Cancel changes</button>
 *     </ng-template>
 *   </kendo-grid-command-column>
 * </kendo-grid>
 * ```
 *
 * You can control the content of the button based on the state of the row.
 *
 * @example
 * ```html-no-run
 * <kendo-grid>
 *   <kendo-grid-command-column title="command">
 *     <ng-template kendoGridCellTemplate let-isNew="isNew">
 *       <button kendoGridCancelCommand>{{isNew ? 'Discard' : 'Cancel changes'}}</button>
 *     </ng-template>
 *   </kendo-grid-command-column>
 * </kendo-grid>
 * ```
 */
export class CancelCommandDirective extends Button {
    constructor(editService, cellContext, element, renderer, localization, ngZone) {
        super(element, renderer, null, localization, ngZone);
        this.editService = editService;
        this.cellContext = cellContext;
        /**
         * @hidden
         */
        this.commandClass = true;
    }
    /**
     * @hidden
     */
    get visible() {
        return !this.isEdited ? 'none' : '';
    }
    /**
     * @hidden
     */
    onClick(e) {
        e.preventDefault();
        if (this.isEdited) {
            this.editService.endEdit(this.rowIndex);
        }
    }
    ngDoCheck() {
        if (this.cellContext) {
            this.rowIndex = this.cellContext.rowIndex;
            this.isEdited = this.editService.isEdited(this.rowIndex);
        }
    }
}
CancelCommandDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: CancelCommandDirective, deps: [{ token: i1.EditService }, { token: CELL_CONTEXT }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i2.LocalizationService }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive });
CancelCommandDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.16", type: CancelCommandDirective, selector: "[kendoGridCancelCommand]", host: { listeners: { "click": "onClick($event)" }, properties: { "style.display": "this.visible", "class.k-grid-cancel-command": "this.commandClass" } }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: CancelCommandDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[kendoGridCancelCommand]'
                }]
        }], ctorParameters: function () { return [{ type: i1.EditService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [CELL_CONTEXT]
                }] }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i2.LocalizationService }, { type: i0.NgZone }]; }, propDecorators: { visible: [{
                type: HostBinding,
                args: ['style.display']
            }], commandClass: [{
                type: HostBinding,
                args: ['class.k-grid-cancel-command']
            }], onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });

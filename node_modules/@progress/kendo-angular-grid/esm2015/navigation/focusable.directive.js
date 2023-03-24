/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, Inject, Input, Optional, SkipSelf } from '@angular/core';
import { DefaultFocusableElement } from './default-focusable-element';
import { CELL_CONTEXT } from '../rendering/common/cell-context';
import * as i0 from "@angular/core";
/**
 * A directive that controls the way focusable elements receive
 * [focus in a navigable Grid]({% slug keyboard_navigation_grid %}).
 *
 * @example
 * ```ts-preview
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *      <input type="text" placeholder="Tab stop #0" style="margin-bottom: 8px;" />
 *      <kendo-grid [data]="data" [navigable]="true">
 *          <kendo-grid-column field="ProductID" title="Product ID" [width]="100">
 *          </kendo-grid-column>
 *          <kendo-grid-column field="ProductName" title="Product Name" [width]="150">
 *          </kendo-grid-column>
 *          <kendo-grid-column>
 *              <ng-template kendoGridCellTemplate let-dataItem>
 *                  <!-- The first focusable element will be focused when pressing Enter on the cell -->
 *                  <input type="text" kendoGridFocusable [value]="dataItem.ProductName" style="margin-right: 8px;" />
 *                  <button kendoGridFocusable>Update</button>
 *              </ng-template>
 *          </kendo-grid-column>
 *          <kendo-grid-column [width]="100">
 *              <ng-template kendoGridCellTemplate>
 *                  <!-- A single focusable element will be focused during navigation -->
 *                  <button kendoGridFocusable>Delete</button>
 *              </ng-template>
 *          </kendo-grid-column>
 *      </kendo-grid>
 *      <input type="text" placeholder="Tab stop #2" style="margin-top: 8px;" />
 *    `
 * })
 *
 * class AppComponent {
 *     public readonly data: any = [{
 *         "ProductID": 1,
 *         "ProductName": "Chai",
 *         "UnitPrice": 18.0000,
 *         "Discontinued": true
 *     }, {
 *         "ProductID": 2,
 *         "ProductName": "Chang",
 *         "UnitPrice": 19.0000,
 *         "Discontinued": false
 *     }];
 * }
 * ```
 */
export class FocusableDirective {
    constructor(cellContext, hostElement, renderer) {
        this.cellContext = cellContext;
        this.hostElement = hostElement;
        this.renderer = renderer;
        this.active = true;
        this._enabled = true;
        if (this.cellContext) {
            this.group = this.cellContext.focusGroup;
        }
        if (this.group) {
            this.group.registerElement(this);
        }
    }
    /**
     * @hidden
     */
    set enabled(value) {
        if (value === '') {
            value = true;
        }
        else {
            value = Boolean(value);
        }
        if (value !== this.enabled) {
            this._enabled = value;
            if (this.element) {
                this.element.toggle(this.active && value);
            }
        }
    }
    get enabled() {
        return this._enabled;
    }
    ngAfterViewInit() {
        if (!this.element) {
            this.element = new DefaultFocusableElement(this.hostElement, this.renderer);
        }
        if (this.group && this.element) {
            this.toggle(this.group.isActive);
        }
    }
    ngOnDestroy() {
        if (this.group) {
            this.group.unregisterElement(this);
        }
    }
    /**
     * @hidden
     */
    toggle(active) {
        if (this.element && active !== this.active) {
            this.element.toggle(this.enabled && active);
            this.active = active;
        }
    }
    /**
     * @hidden
     */
    canFocus() {
        return this.enabled && this.element && this.element.canFocus();
    }
    /**
     * @hidden
     */
    isNavigable() {
        return this.enabled && this.element && this.element.isNavigable();
    }
    /**
     * @hidden
     */
    focus() {
        if (this.enabled && this.element) {
            this.element.focus();
        }
    }
    /**
     * @hidden
     */
    hasFocus() {
        return this.enabled && this.element && this.element.hasFocus();
    }
    /**
     * @hidden
     */
    registerElement(element) {
        this.element = element;
    }
}
FocusableDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: FocusableDirective, deps: [{ token: CELL_CONTEXT, optional: true, skipSelf: true }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
FocusableDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.16", type: FocusableDirective, selector: "[kendoGridFocusable],\n        [kendoGridEditCommand],\n        [kendoGridRemoveCommand],\n        [kendoGridSaveCommand],\n        [kendoGridCancelCommand],\n        [kendoGridSelectionCheckbox]\n    ", inputs: { enabled: ["kendoGridFocusable", "enabled"] }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: FocusableDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[kendoGridFocusable]' + `,
        [kendoGridEditCommand],
        [kendoGridRemoveCommand],
        [kendoGridSaveCommand],
        [kendoGridCancelCommand],
        [kendoGridSelectionCheckbox]
    `
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [CELL_CONTEXT]
                }, {
                    type: SkipSelf
                }] }, { type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { enabled: [{
                type: Input,
                args: ['kendoGridFocusable']
            }] } });

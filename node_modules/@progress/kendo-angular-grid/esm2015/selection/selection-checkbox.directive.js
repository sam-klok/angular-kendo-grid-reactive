/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, HostBinding, Input } from '@angular/core';
import { Keys } from '@progress/kendo-angular-common';
import * as i0 from "@angular/core";
import * as i1 from "./selection.service";
/**
 * Represents the row-selection checkbox of the Grid. The directive expects the
 * index of the current row as an input parameter. Inside the
 * [CheckboxColumnComponent]({% slug api_grid_checkboxcolumncomponent %}), apply the
 * directive to an `input` element. When the user clicks the checkbox that is associated
 * with the directive, a [selectionChange]({% slug api_grid_gridcomponent %}#toc-selectionChange)
 * event is triggered.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *        <kendo-grid [data]="gridData" [selectable]="{enabled: true, checkboxOnly: true}">
 *          <kendo-grid-checkbox-column title="Custom checkbox">
 *            <ng-template kendoGridCellTemplate let-idx="rowIndex">
 *              Select row <input [kendoGridSelectionCheckbox]="idx" />
 *            </ng-template>
 *          </kendo-grid-checkbox-column>
 *          <kendo-grid-column field="ProductID" title="Product ID" [width]="120">
 *          </kendo-grid-column>
 *          <kendo-grid-column field="ProductName" title="Product Name">
 *          </kendo-grid-column>
 *        </kendo-grid>
 *    `
 * })
 *
 * class AppComponent {
 *    public gridData: any[];
 *
 *    constructor() {
 *        this.gridData = products;
 *    }
 * }
 *
 * const products = [{
 *    "ProductID": 1,
 *    "ProductName": "Chai",
 *    "UnitPrice": 18.0000,
 *    "Discontinued": true
 *  }, {
 *    "ProductID": 2,
 *    "ProductName": "Chang",
 *    "UnitPrice": 19.0000,
 *    "Discontinued": false
 *  }
 * ];
 *
 * ```
 */
export class SelectionCheckboxDirective {
    constructor(selectionService, el, renderer, ngZone) {
        this.selectionService = selectionService;
        this.el = el;
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.type = 'checkbox';
        this.ngZone.runOutsideAngular(() => {
            this.destroyClick = this.renderer.listen(this.el.nativeElement, 'click', this.onClick.bind(this));
            this.destroyKeyDown = this.renderer.listen(this.el.nativeElement, 'keydown', this.onKeyDown.bind(this));
        });
    }
    ngAfterContentChecked() {
        this.setCheckedState();
    }
    ngOnDestroy() {
        if (this.destroyClick) {
            this.destroyClick();
        }
        if (this.destroyKeyDown) {
            this.destroyKeyDown();
        }
    }
    onClick() {
        if (this.selectionService.options.enabled) {
            this.ngZone.run(() => {
                const ev = this.selectionService.toggleByIndex(this.itemIndex);
                ev.ctrlKey = true;
                ev.shiftKey = false;
                this.selectionService.changes.emit(ev);
            });
        }
    }
    onKeyDown(e) {
        if (e.keyCode === Keys.Enter) {
            this.onClick();
        }
    }
    /*
     * @hidden
     */
    setCheckedState() {
        this.renderer.setProperty(this.el.nativeElement, 'checked', this.selectionService.isSelected(this.itemIndex));
    }
}
SelectionCheckboxDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: SelectionCheckboxDirective, deps: [{ token: i1.SelectionService }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive });
SelectionCheckboxDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.16", type: SelectionCheckboxDirective, selector: "[kendoGridSelectionCheckbox]", inputs: { itemIndex: ["kendoGridSelectionCheckbox", "itemIndex"] }, host: { properties: { "attr.type": "this.type" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: SelectionCheckboxDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[kendoGridSelectionCheckbox]'
                }]
        }], ctorParameters: function () { return [{ type: i1.SelectionService }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.NgZone }]; }, propDecorators: { itemIndex: [{
                type: Input,
                args: ['kendoGridSelectionCheckbox']
            }], type: [{
                type: HostBinding,
                args: ['attr.type']
            }] } });

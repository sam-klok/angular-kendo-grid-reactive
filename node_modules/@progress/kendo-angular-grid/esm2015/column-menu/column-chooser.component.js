/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input } from '@angular/core';
import { closest } from '../rendering/common/dom-queries';
import * as i0 from "@angular/core";
import * as i1 from "@progress/kendo-angular-l10n";
import * as i2 from "../common/column-info.service";
import * as i3 from "@progress/kendo-angular-popup";
import * as i4 from "./column-list.component";
/**
 * Represents the component for selecting columns in the Grid. To enable the user to show or hide columns,
 * add the component inside a [ToolbarTemplate]({% slug api_grid_toolbartemplatedirective %}) directive.
 *
 * @example
 * ```ts-preview
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *       <kendo-grid [data]="data">
 *          <ng-template kendoGridToolbarTemplate>
 *             <kendo-grid-column-chooser></kendo-grid-column-chooser>
 *          </ng-template>
 *          <kendo-grid-column field="Field1"></kendo-grid-column>
 *          <kendo-grid-column field="Field2" [hidden]="true"></kendo-grid-column>
 *       </kendo-grid>
 *     `
 * })
 *
 * class AppComponent {
 *   public data: any[] = [{ Field1: 'Foo', Field2: 'Bar' }];
 * }
 * ```
 */
export class ColumnChooserComponent {
    constructor(localization, columnInfoService, popupService, ngZone, renderer, changeDetector) {
        this.localization = localization;
        this.columnInfoService = columnInfoService;
        this.popupService = popupService;
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.changeDetector = changeDetector;
        /**
         * Specifies if the changes in the visibility of the column will be immediately applied.
         */
        this.autoSync = false;
        /**
         * Specifies if all columns can be hidden.
         */
        this.allowHideAll = true;
    }
    get columns() {
        return this.columnInfoService.leafNamedColumns;
    }
    ngOnDestroy() {
        this.close();
    }
    /**
     * @hidden
     */
    toggle(anchor, template) {
        if (!this.popupRef) {
            const direction = this.localization.rtl ? 'right' : 'left';
            this.popupRef = this.popupService.open({
                anchor: anchor,
                content: template,
                positionMode: 'absolute',
                anchorAlign: { vertical: 'bottom', horizontal: direction },
                popupAlign: { vertical: 'top', horizontal: direction }
            });
            this.renderer.setAttribute(this.popupRef.popupElement, 'dir', this.localization.rtl ? 'rtl' : 'ltr');
            this.ngZone.runOutsideAngular(() => this.closeClick = this.renderer.listen("document", "click", ({ target }) => {
                if (!closest(target, node => node === this.popupRef.popupElement || node === anchor)) {
                    this.close();
                }
            }));
        }
        else {
            this.close();
        }
    }
    /**
     * @hidden
     */
    onApply(changed) {
        this.close();
        if (changed.length) {
            this.changeDetector.markForCheck();
            this.columnInfoService.changeVisibility(changed);
        }
    }
    /**
     * @hidden
     */
    onChange(changed) {
        this.changeDetector.markForCheck();
        this.columnInfoService.changeVisibility(changed);
    }
    close() {
        if (this.popupRef) {
            this.popupRef.close();
            this.popupRef = null;
        }
        this.detachClose();
    }
    detachClose() {
        if (this.closeClick) {
            this.closeClick();
            this.closeClick = null;
        }
    }
}
ColumnChooserComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ColumnChooserComponent, deps: [{ token: i1.LocalizationService }, { token: i2.ColumnInfoService }, { token: i3.PopupService }, { token: i0.NgZone }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
ColumnChooserComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: ColumnChooserComponent, selector: "kendo-grid-column-chooser", inputs: { autoSync: "autoSync", allowHideAll: "allowHideAll" }, ngImport: i0, template: `
        <button #anchor
            type="button"
            (click)="toggle(anchor, template)"
            class="k-button k-button-flat-base k-button-flat k-icon-button k-button-md k-rounded-md k-button-rectangle k-icon-button"
            [attr.title]="localization.get('columns')">
            <span class="k-button-icon k-icon k-i-columns"></span>
        </button>
        <ng-template #template>
            <span class='k-column-chooser-title'>{{ localization.get('columns') }}</span>
            <kendo-grid-columnlist
                [columns]="columns"
                [applyText]="localization.get('columnsApply')"
                [resetText]="localization.get('columnsReset')"
                [autoSync]="autoSync"
                [allowHideAll]="allowHideAll"
                (apply)="onApply($event)"
                (columnChange)="onChange($event)">
            </kendo-grid-columnlist>
        </ng-template>
    `, isInline: true, components: [{ type: i4.ColumnListComponent, selector: "kendo-grid-columnlist", inputs: ["columns", "autoSync", "allowHideAll", "applyText", "resetText", "actionsClass", "isLast", "isExpanded", "service"], outputs: ["reset", "apply", "columnChange"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ColumnChooserComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'kendo-grid-column-chooser',
                    template: `
        <button #anchor
            type="button"
            (click)="toggle(anchor, template)"
            class="k-button k-button-flat-base k-button-flat k-icon-button k-button-md k-rounded-md k-button-rectangle k-icon-button"
            [attr.title]="localization.get('columns')">
            <span class="k-button-icon k-icon k-i-columns"></span>
        </button>
        <ng-template #template>
            <span class='k-column-chooser-title'>{{ localization.get('columns') }}</span>
            <kendo-grid-columnlist
                [columns]="columns"
                [applyText]="localization.get('columnsApply')"
                [resetText]="localization.get('columnsReset')"
                [autoSync]="autoSync"
                [allowHideAll]="allowHideAll"
                (apply)="onApply($event)"
                (columnChange)="onChange($event)">
            </kendo-grid-columnlist>
        </ng-template>
    `
                }]
        }], ctorParameters: function () { return [{ type: i1.LocalizationService }, { type: i2.ColumnInfoService }, { type: i3.PopupService }, { type: i0.NgZone }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { autoSync: [{
                type: Input
            }], allowHideAll: [{
                type: Input
            }] } });

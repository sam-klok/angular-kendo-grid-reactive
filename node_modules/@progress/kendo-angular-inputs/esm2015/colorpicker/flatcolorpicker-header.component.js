/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, HostBinding, Input, Output, EventEmitter, ViewChild, ViewChildren, ElementRef } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@progress/kendo-angular-l10n";
import * as i2 from "@angular/common";
/**
 * @hidden
 */
export class FlatColorPickerHeaderComponent {
    constructor(localizationService) {
        this.localizationService = localizationService;
        this.hostClasses = true;
        this.innerTabIndex = -1;
        this.viewChange = new EventEmitter();
        this.valuePaneClick = new EventEmitter();
        this.clearButtonClick = new EventEmitter();
        this.tabOut = new EventEmitter();
    }
    onViewButtonClick(view) {
        this.activeView = view;
        this.viewChange.emit(view);
    }
    get viewButtons() {
        return this.views && this.views.indexOf('gradient') >= 0 && this.views.indexOf('palette') >= 0;
    }
    getViewButtonIcon(view) {
        return view === 'gradient' ? 'k-i-color-canvas' : 'k-i-palette';
    }
    getText(text) {
        return this.localizationService.get(text);
    }
    onHeaderTabOut(ev, index) {
        if (index === 0) {
            ev.preventDefault();
            this.tabOut.emit();
        }
    }
}
FlatColorPickerHeaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: FlatColorPickerHeaderComponent, deps: [{ token: i1.LocalizationService }], target: i0.ɵɵFactoryTarget.Component });
FlatColorPickerHeaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: FlatColorPickerHeaderComponent, selector: "[kendoFlatColorPickerHeader]", inputs: { clearButton: "clearButton", activeView: "activeView", views: "views", preview: "preview", innerTabIndex: "innerTabIndex", value: "value", selection: "selection" }, outputs: { viewChange: "viewChange", valuePaneClick: "valuePaneClick", clearButtonClick: "clearButtonClick", tabOut: "tabOut" }, host: { properties: { "class.k-coloreditor-header": "this.hostClasses", "class.k-hstack": "this.hostClasses" } }, viewQueries: [{ propertyName: "clearButtonElement", first: true, predicate: ["clearButton"], descendants: true, read: ElementRef }, { propertyName: "viewButtonsCollection", predicate: ["viewButtons"], descendants: true, read: ElementRef }], ngImport: i0, template: `
        <div class="k-coloreditor-header-actions k-hstack">
            <div 
                *ngIf="viewButtons" 
                class="k-button-group k-button-group-flat">
                <button *ngFor="let view of views; let i = index;"
                    #viewButtons
                    type="button"
                    [tabindex]="innerTabIndex.toString()"
                    (click)="onViewButtonClick(view)"
                    (keydown.shift.tab)="onHeaderTabOut($event, i)"
                    class="k-button k-button-md k-button-flat k-button-flat-base k-icon-button"
                    [attr.title]="getText(view === 'gradient' ? 'gradientView' : 'paletteView')"
                    [attr.aria-label]="getText(view === 'gradient' ? 'gradientView' : 'paletteView')"
                    [attr.aria-pressed]="activeView === view"
                    [ngClass]="activeView === view ? 'k-selected' : ''">
                    <span
                        class="k-button-icon k-icon"
                        [ngClass]="getViewButtonIcon(view)">
                    </span>
                </button>
            </div>
        </div>
        <div class="k-spacer"></div>
        <div class="k-coloreditor-header-actions k-hstack">
            <button
                [tabindex]="innerTabIndex.toString()"
                *ngIf="clearButton"
                #clearButton
                type="button"
                class="k-button k-button-md k-button-flat k-button-flat-base k-icon-button k-coloreditor-reset"
                [attr.aria-label]="getText('clearButton')"
                [attr.title]="getText('clearButton')"
                (click)="clearButtonClick.emit()">
                    <span class="k-button-icon k-icon k-i-droplet-slash"></span>
            </button>
            <div class="k-coloreditor-preview k-vstack" *ngIf="preview" aria-hidden="true">
                <span
                    class="k-coloreditor-preview-color k-color-preview"
                    [attr.title]="getText('previewColor')"
                    [style.background-color]="selection">
                </span>
                <span class="k-coloreditor-current-color k-color-preview"
                    [style.background-color]="value"
                    [attr.title]="getText('revertSelection')"
                    (click)="valuePaneClick.emit($event)">
                </span>
            </div>
        </div>
    `, isInline: true, directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: FlatColorPickerHeaderComponent, decorators: [{
            type: Component,
            args: [{
                    // eslint-disable-next-line @angular-eslint/component-selector
                    selector: '[kendoFlatColorPickerHeader]',
                    template: `
        <div class="k-coloreditor-header-actions k-hstack">
            <div 
                *ngIf="viewButtons" 
                class="k-button-group k-button-group-flat">
                <button *ngFor="let view of views; let i = index;"
                    #viewButtons
                    type="button"
                    [tabindex]="innerTabIndex.toString()"
                    (click)="onViewButtonClick(view)"
                    (keydown.shift.tab)="onHeaderTabOut($event, i)"
                    class="k-button k-button-md k-button-flat k-button-flat-base k-icon-button"
                    [attr.title]="getText(view === 'gradient' ? 'gradientView' : 'paletteView')"
                    [attr.aria-label]="getText(view === 'gradient' ? 'gradientView' : 'paletteView')"
                    [attr.aria-pressed]="activeView === view"
                    [ngClass]="activeView === view ? 'k-selected' : ''">
                    <span
                        class="k-button-icon k-icon"
                        [ngClass]="getViewButtonIcon(view)">
                    </span>
                </button>
            </div>
        </div>
        <div class="k-spacer"></div>
        <div class="k-coloreditor-header-actions k-hstack">
            <button
                [tabindex]="innerTabIndex.toString()"
                *ngIf="clearButton"
                #clearButton
                type="button"
                class="k-button k-button-md k-button-flat k-button-flat-base k-icon-button k-coloreditor-reset"
                [attr.aria-label]="getText('clearButton')"
                [attr.title]="getText('clearButton')"
                (click)="clearButtonClick.emit()">
                    <span class="k-button-icon k-icon k-i-droplet-slash"></span>
            </button>
            <div class="k-coloreditor-preview k-vstack" *ngIf="preview" aria-hidden="true">
                <span
                    class="k-coloreditor-preview-color k-color-preview"
                    [attr.title]="getText('previewColor')"
                    [style.background-color]="selection">
                </span>
                <span class="k-coloreditor-current-color k-color-preview"
                    [style.background-color]="value"
                    [attr.title]="getText('revertSelection')"
                    (click)="valuePaneClick.emit($event)">
                </span>
            </div>
        </div>
    `
                }]
        }], ctorParameters: function () { return [{ type: i1.LocalizationService }]; }, propDecorators: { hostClasses: [{
                type: HostBinding,
                args: ['class.k-coloreditor-header']
            }, {
                type: HostBinding,
                args: ['class.k-hstack']
            }], clearButton: [{
                type: Input
            }], activeView: [{
                type: Input
            }], views: [{
                type: Input
            }], preview: [{
                type: Input
            }], innerTabIndex: [{
                type: Input
            }], value: [{
                type: Input
            }], selection: [{
                type: Input
            }], viewChange: [{
                type: Output
            }], valuePaneClick: [{
                type: Output
            }], clearButtonClick: [{
                type: Output
            }], tabOut: [{
                type: Output
            }], viewButtonsCollection: [{
                type: ViewChildren,
                args: ['viewButtons', { read: ElementRef }]
            }], clearButtonElement: [{
                type: ViewChild,
                args: ['clearButton', { read: ElementRef }]
            }] } });

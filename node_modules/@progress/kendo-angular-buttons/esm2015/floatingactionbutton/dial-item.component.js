/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, HostBinding, Input } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "@progress/kendo-angular-l10n";
import * as i2 from "@angular/common";
/**
 * @hidden
 */
export class DialItemComponent {
    constructor(element, renderer, localisationService) {
        this.element = element;
        this.renderer = renderer;
        this.localisationService = localisationService;
        this.hostClass = true;
        this.role = 'menuitem';
    }
    get disabledClass() {
        return this.item.disabled;
    }
    get title() {
        const label = this.item.label;
        return label ? label : this.itemTitle;
    }
    get indexAttr() {
        return this.index;
    }
    get iconClasses() {
        const classes = [];
        if (this.item.iconClass) {
            classes.push(`${this.item.iconClass}`);
        }
        if (this.item.icon) {
            classes.push(`k-fab-item-icon k-icon k-i-${this.item.icon}`);
        }
        return classes;
    }
    get itemTitle() {
        const icon = this.item.icon;
        const itemTitle = this.item.itemTitle;
        return (icon && itemTitle) ? itemTitle : icon;
    }
    ngAfterViewInit() {
        const element = this.element.nativeElement;
        const rtl = this.localisationService.rtl;
        const hAlign = this.align.horizontal;
        this.renderer.addClass(element, this.getTextDirectionClass(rtl, hAlign));
    }
    getTextDirectionClass(rtl, hAlign) {
        const dir = rtl ? 'rtl' : 'ltr';
        const align = hAlign === 'end' ? 'end' : 'start';
        const directions = {
            rtl: { end: 'k-text-left', start: 'k-text-right' },
            ltr: { start: 'k-text-left', end: 'k-text-right' }
        };
        return directions[dir][align];
    }
}
DialItemComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: DialItemComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.LocalizationService }], target: i0.ɵɵFactoryTarget.Component });
DialItemComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: DialItemComponent, selector: "[kendoDialItem]", inputs: { cssClass: "cssClass", cssStyle: "cssStyle", isFocused: "isFocused", index: "index", item: "item", dialItemTemplate: "dialItemTemplate", align: "align" }, host: { properties: { "class.k-fab-item": "this.hostClass", "attr.role": "this.role", "attr.aria-disabled": "this.disabledClass", "class.k-disabled": "this.disabledClass", "attr.title": "this.title", "attr.aria-label": "this.title", "attr.data-fab-item-index": "this.indexAttr" } }, ngImport: i0, template: `
        <ng-template *ngIf="dialItemTemplate"
            [ngTemplateOutlet]="dialItemTemplate"
            [ngTemplateOutletContext]="{ $implicit: item, index: index, isFocused: isFocused }"
        >
        </ng-template>

        <ng-container *ngIf="!dialItemTemplate">
            <span *ngIf="item.label" class="k-fab-item-text">{{ item.label }}</span>
            <span *ngIf="item.icon || item.iconClass" [ngClass]="iconClasses"></span>
        </ng-container>
    `, isInline: true, directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: DialItemComponent, decorators: [{
            type: Component,
            args: [{
                    // eslint-disable-next-line @angular-eslint/component-selector
                    selector: '[kendoDialItem]',
                    template: `
        <ng-template *ngIf="dialItemTemplate"
            [ngTemplateOutlet]="dialItemTemplate"
            [ngTemplateOutletContext]="{ $implicit: item, index: index, isFocused: isFocused }"
        >
        </ng-template>

        <ng-container *ngIf="!dialItemTemplate">
            <span *ngIf="item.label" class="k-fab-item-text">{{ item.label }}</span>
            <span *ngIf="item.icon || item.iconClass" [ngClass]="iconClasses"></span>
        </ng-container>
    `
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.LocalizationService }]; }, propDecorators: { hostClass: [{
                type: HostBinding,
                args: ['class.k-fab-item']
            }], role: [{
                type: HostBinding,
                args: ['attr.role']
            }], disabledClass: [{
                type: HostBinding,
                args: ['attr.aria-disabled']
            }, {
                type: HostBinding,
                args: ['class.k-disabled']
            }], title: [{
                type: HostBinding,
                args: ['attr.title']
            }, {
                type: HostBinding,
                args: ['attr.aria-label']
            }], indexAttr: [{
                type: HostBinding,
                args: ['attr.data-fab-item-index']
            }], cssClass: [{
                type: Input
            }], cssStyle: [{
                type: Input
            }], isFocused: [{
                type: Input
            }], index: [{
                type: Input
            }], item: [{
                type: Input
            }], dialItemTemplate: [{
                type: Input
            }], align: [{
                type: Input
            }] } });

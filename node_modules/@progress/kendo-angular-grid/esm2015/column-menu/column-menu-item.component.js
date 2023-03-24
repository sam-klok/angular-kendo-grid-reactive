/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, Output, EventEmitter, ContentChild } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { ColumnMenuItemContentTemplateDirective } from './column-menu-item-content-template.directive';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * Represents an item that can be placed inside a
 * [ColumnMenuTemplate]({% slug api_grid_columnmenutemplatedirective %}) directive.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *       <kendo-grid [data]="data" [columnMenu]="true" [resizable]="true" #grid>
 *          <ng-template kendoGridColumnMenuTemplate let-service="service" let-column="column">
 *              <kendo-grid-columnmenu-item icon="arrows-resizing" text="Fit column"
 *                  (itemClick)="grid.autoFitColumn(column); service.close()">
 *              </kendo-grid-columnmenu-item>
 *          </ng-template>
 *          <kendo-grid-column field="Field1"></kendo-grid-column>
 *          <kendo-grid-column field="Field2"></kendo-grid-column>
 *       </kendo-grid>
 *     `
 * })
 *
 * class AppComponent {
 *   public data: any[] = [{ Field1: 'Foo', Field2: 'Bar' }];
 * }
 *
 * ```
 */
export class ColumnMenuItemComponent {
    constructor() {
        /**
         * Fires when the item is clicked.
         */
        this.itemClick = new EventEmitter();
        /**
         * Fires when the content is expanded.
         */
        this.expand = new EventEmitter();
        /**
         * Fires when the content is collapsed.
         */
        this.collapse = new EventEmitter();
        this.contentState = 'collapsed';
    }
    get iconClass() {
        return `k-i-${this.icon}`;
    }
    ngOnChanges(changes) {
        if (changes.expanded) {
            this.updateContentState();
        }
    }
    /**
     * @hidden
     */
    onClick(e) {
        this.itemClick.emit(e);
        if (this.contentTemplate) {
            this.expanded = !this.expanded;
            this.updateContentState();
            if (this.expanded) {
                this.expand.emit();
            }
            else {
                this.collapse.emit();
            }
        }
    }
    updateContentState() {
        this.contentState = this.expanded ? 'expanded' : 'collapsed';
    }
}
ColumnMenuItemComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ColumnMenuItemComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ColumnMenuItemComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: ColumnMenuItemComponent, selector: "kendo-grid-columnmenu-item", inputs: { icon: "icon", text: "text", selected: "selected", disabled: "disabled", expanded: "expanded" }, outputs: { itemClick: "itemClick", expand: "expand", collapse: "collapse" }, queries: [{ propertyName: "contentTemplate", first: true, predicate: ColumnMenuItemContentTemplateDirective, descendants: true }], usesOnChanges: true, ngImport: i0, template: `
        <div
            class="k-columnmenu-item"
            (click)="onClick($event)"
            (keydown.enter)="onClick($event)"
            [class.k-selected]="selected"
            [class.k-disabled]="disabled"
            role="button"
            [attr.aria-expanded]="expanded">
           <span *ngIf="icon" class="k-icon" [ngClass]="iconClass">
           </span>
           {{ text }}
        </div>
        <div *ngIf="contentTemplate" [@state]="contentState" [style.overflow]="'hidden'" class="k-columnmenu-item-content">
            <ng-container [ngTemplateOutlet]="contentTemplate.templateRef">
            </ng-container>
        <div>
    `, isInline: true, directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], animations: [
        trigger('state', [
            state('collapsed', style({ display: 'none' })),
            state('expanded', style({ display: 'block' })),
            transition('collapsed => expanded', [
                style({
                    height: '0px',
                    display: 'block'
                }),
                animate('100ms ease-in', style({
                    height: '*'
                }))
            ]),
            transition('expanded => collapsed', [
                style({
                    height: '*'
                }),
                animate('100ms ease-in', style({
                    height: '0px'
                }))
            ])
        ])
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ColumnMenuItemComponent, decorators: [{
            type: Component,
            args: [{
                    animations: [
                        trigger('state', [
                            state('collapsed', style({ display: 'none' })),
                            state('expanded', style({ display: 'block' })),
                            transition('collapsed => expanded', [
                                style({
                                    height: '0px',
                                    display: 'block'
                                }),
                                animate('100ms ease-in', style({
                                    height: '*'
                                }))
                            ]),
                            transition('expanded => collapsed', [
                                style({
                                    height: '*'
                                }),
                                animate('100ms ease-in', style({
                                    height: '0px'
                                }))
                            ])
                        ])
                    ],
                    selector: 'kendo-grid-columnmenu-item',
                    template: `
        <div
            class="k-columnmenu-item"
            (click)="onClick($event)"
            (keydown.enter)="onClick($event)"
            [class.k-selected]="selected"
            [class.k-disabled]="disabled"
            role="button"
            [attr.aria-expanded]="expanded">
           <span *ngIf="icon" class="k-icon" [ngClass]="iconClass">
           </span>
           {{ text }}
        </div>
        <div *ngIf="contentTemplate" [@state]="contentState" [style.overflow]="'hidden'" class="k-columnmenu-item-content">
            <ng-container [ngTemplateOutlet]="contentTemplate.templateRef">
            </ng-container>
        <div>
    `
                }]
        }], propDecorators: { itemClick: [{
                type: Output
            }], expand: [{
                type: Output
            }], collapse: [{
                type: Output
            }], icon: [{
                type: Input
            }], text: [{
                type: Input
            }], selected: [{
                type: Input
            }], disabled: [{
                type: Input
            }], expanded: [{
                type: Input
            }], contentTemplate: [{
                type: ContentChild,
                args: [ColumnMenuItemContentTemplateDirective, { static: false }]
            }] } });

/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, EventEmitter, HostBinding, TemplateRef, Input, Output } from '@angular/core';
import { parseCSSClassNames } from '../common/util';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * Specifies the action buttons of the Dialog
 * ([see example]({% slug actionbuttons_dialog %})).
 */
export class DialogActionsComponent {
    constructor(el) {
        this.el = el;
        /**
         * Specifies the possible layout of the action buttons.
         */
        this.layout = 'stretched';
        /**
         * Fires when the user clicks an action button.
         */
        this.action = new EventEmitter();
        this.buttonGroupClassName = true;
    }
    /**
     * Allows the declarative specification of the actions.
     */
    set actions(value) {
        if (value instanceof TemplateRef) {
            this.actionsTemplate = value;
        }
        else if (Array.isArray(value)) {
            this.actionsArray = value;
        }
        else {
            throw new Error('"actions" must be either TemplateRef or DialogAction[] instance.');
        }
    }
    get className() {
        return this.layout === 'stretched';
    }
    /**
     * @hidden
     */
    onButtonClick(action, _e) {
        this.action.emit(action);
    }
    /**
     * @hidden
     */
    buttonClass(action) {
        let classes = ['k-button k-button-md k-rounded-md'];
        const fillMode = action.fillMode ? action.fillMode : 'solid';
        const themeColor = action.themeColor ? action.themeColor : 'base';
        const cssClasses = action.cssClass ? parseCSSClassNames(action.cssClass) : [];
        classes.push(`k-button-${fillMode} k-button-${fillMode}-${themeColor}`);
        if (cssClasses.length > 0) {
            classes = classes.concat(cssClasses);
        }
        return classes.join(' ');
    }
}
DialogActionsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: DialogActionsComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
DialogActionsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: DialogActionsComponent, selector: "kendo-dialog-actions", inputs: { actions: "actions", layout: "layout" }, outputs: { action: "action" }, host: { properties: { "class.k-dialog-buttongroup": "this.buttonGroupClassName", "class.k-actions": "this.buttonGroupClassName", "class.k-actions-stretched": "this.className" } }, ngImport: i0, template: `
        <ng-content *ngIf="!actions"></ng-content>
        <ng-container *ngIf="actionsArray; else actionTemplate">
            <button
                type="button"
                *ngFor="let action of actionsArray"
                [ngClass]="buttonClass(action)"
                (click)="onButtonClick(action, $event)"
                [attr.aria-label]="action.text"
            >
                {{ action.text }}
            </button>
        </ng-container>
        <ng-template #actionTemplate [ngTemplateOutlet]="actionsTemplate"></ng-template>
    `, isInline: true, directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: DialogActionsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'kendo-dialog-actions',
                    template: `
        <ng-content *ngIf="!actions"></ng-content>
        <ng-container *ngIf="actionsArray; else actionTemplate">
            <button
                type="button"
                *ngFor="let action of actionsArray"
                [ngClass]="buttonClass(action)"
                (click)="onButtonClick(action, $event)"
                [attr.aria-label]="action.text"
            >
                {{ action.text }}
            </button>
        </ng-container>
        <ng-template #actionTemplate [ngTemplateOutlet]="actionsTemplate"></ng-template>
    `
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { actions: [{
                type: Input
            }], layout: [{
                type: Input
            }], action: [{
                type: Output
            }], buttonGroupClassName: [{
                type: HostBinding,
                args: ['class.k-dialog-buttongroup']
            }, {
                type: HostBinding,
                args: ['class.k-actions']
            }], className: [{
                type: HostBinding,
                args: ['class.k-actions-stretched']
            }] } });

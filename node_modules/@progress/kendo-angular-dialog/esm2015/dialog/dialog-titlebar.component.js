/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, EventEmitter, HostBinding, Output, Input, Optional } from '@angular/core';
import { L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
import { take } from 'rxjs/operators';
import { PreventableEvent } from '../common/preventable-event';
import { TitleBarLocalizationService } from '../localization/titlebar-localization.service';
import * as i0 from "@angular/core";
import * as i1 from "@progress/kendo-angular-l10n";
import * as i2 from "../localization/localized-messages.directive";
/**
 * Represents the [Kendo UI DialogTitleBar component for Angular]({% slug api_dialog_dialogtitlebarcomponent %}).
 *
 * It is used as part of the Dialog content when the component is created dynamically by using an [Angular service]({% slug service_dialog %}).
 */
export class DialogTitleBarComponent {
    constructor(zone, hostElement, localizationService) {
        this.zone = zone;
        this.hostElement = hostElement;
        this.localizationService = localizationService;
        /**
         * Fires when the close button of the title-bar is clicked.
         */
        this.close = new EventEmitter();
    }
    get className() {
        return true;
    }
    get closeButtonTitle() {
        return this.closeTitle || this.localizationService.get('closeTitle');
    }
    ngAfterViewInit() {
        this.zone.onStable.pipe(take(1)).subscribe(() => {
            const element = this.hostElement.nativeElement.querySelector('.k-dialog-title');
            element.setAttribute('id', this.id);
        });
    }
    /**
     * @hidden
     */
    onCloseClick(e) {
        e.preventDefault();
        const eventArgs = new PreventableEvent();
        this.close.emit(eventArgs);
    }
}
DialogTitleBarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: DialogTitleBarComponent, deps: [{ token: i0.NgZone }, { token: i0.ElementRef }, { token: i1.LocalizationService, optional: true }], target: i0.ɵɵFactoryTarget.Component });
DialogTitleBarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: DialogTitleBarComponent, selector: "kendo-dialog-titlebar", inputs: { id: "id", closeTitle: "closeTitle" }, outputs: { close: "close" }, host: { properties: { "class.k-window-titlebar": "this.className", "class.k-dialog-titlebar": "this.className" } }, providers: [
        TitleBarLocalizationService,
        {
            provide: LocalizationService,
            useExisting: TitleBarLocalizationService
        },
        {
            provide: L10N_PREFIX,
            useValue: 'kendo.dialog'
        }
    ], ngImport: i0, template: `
         <ng-container
            kendoDialogTitleBarLocalizedMessages
            i18n-closeTitle="kendo.dialog.closeTitle|The title of the close button"
            closeTitle="Close"
        >
            <div class="k-window-title k-dialog-title">
                <ng-content></ng-content>
            </div>

            <div class="k-window-actions k-dialog-actions">
                <button
                    role="button"
                    [attr.title]="closeButtonTitle"
                    [attr.aria-label]="closeButtonTitle"
                    class="k-button k-button-md k-rounded-md k-button-flat k-button-flat-base k-icon-button k-window-action k-dialog-action"
                    (click)="onCloseClick($event)"
                >
                    <span class="k-button-icon k-icon k-i-x"></span>
                </button>
            </div>
        </ng-container>
    `, isInline: true, directives: [{ type: i2.LocalizedMessagesDirective, selector: "\n    [kendoDialogLocalizedMessages],\n    [kendoWindowLocalizedMessages],\n    [kendoDialogTitleBarLocalizedMessages]\n  " }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: DialogTitleBarComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'kendo-dialog-titlebar',
                    providers: [
                        TitleBarLocalizationService,
                        {
                            provide: LocalizationService,
                            useExisting: TitleBarLocalizationService
                        },
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.dialog'
                        }
                    ],
                    template: `
         <ng-container
            kendoDialogTitleBarLocalizedMessages
            i18n-closeTitle="kendo.dialog.closeTitle|The title of the close button"
            closeTitle="Close"
        >
            <div class="k-window-title k-dialog-title">
                <ng-content></ng-content>
            </div>

            <div class="k-window-actions k-dialog-actions">
                <button
                    role="button"
                    [attr.title]="closeButtonTitle"
                    [attr.aria-label]="closeButtonTitle"
                    class="k-button k-button-md k-rounded-md k-button-flat k-button-flat-base k-icon-button k-window-action k-dialog-action"
                    (click)="onCloseClick($event)"
                >
                    <span class="k-button-icon k-icon k-i-x"></span>
                </button>
            </div>
        </ng-container>
    `
                }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: i0.ElementRef }, { type: i1.LocalizationService, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { close: [{
                type: Output
            }], id: [{
                type: Input
            }], closeTitle: [{
                type: Input
            }], className: [{
                type: HostBinding,
                args: ['class.k-window-titlebar']
            }, {
                type: HostBinding,
                args: ['class.k-dialog-titlebar']
            }] } });

/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogActionsComponent } from './dialog/dialog-actions.component';
import { LocalizedMessagesDirective } from './localization/localized-messages.directive';
import { CustomMessagesComponent } from './localization/custom-messages.component';
import * as i0 from "@angular/core";
/**
 * @hidden
 */
export const SHARED_DIRECTIVES = [
    DialogActionsComponent,
    CustomMessagesComponent,
    LocalizedMessagesDirective
];
/**
 * @hidden
 */
export class SharedModule {
}
SharedModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: SharedModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SharedModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: SharedModule, declarations: [DialogActionsComponent,
        CustomMessagesComponent,
        LocalizedMessagesDirective], imports: [CommonModule], exports: [DialogActionsComponent,
        CustomMessagesComponent,
        LocalizedMessagesDirective, CommonModule] });
SharedModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: SharedModule, imports: [[CommonModule], CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: SharedModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [SHARED_DIRECTIVES],
                    exports: [SHARED_DIRECTIVES, CommonModule],
                    imports: [CommonModule]
                }]
        }] });

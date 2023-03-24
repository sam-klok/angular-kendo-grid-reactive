/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, forwardRef } from '@angular/core';
import { Messages } from './messages';
import * as i0 from "@angular/core";
import * as i1 from "@progress/kendo-angular-l10n";
/**
 * @hidden
 */
export class LocalizedSplitButtonMessagesDirective extends Messages {
    constructor(service) {
        super();
        this.service = service;
    }
}
LocalizedSplitButtonMessagesDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: LocalizedSplitButtonMessagesDirective, deps: [{ token: i1.LocalizationService }], target: i0.ɵɵFactoryTarget.Directive });
LocalizedSplitButtonMessagesDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.16", type: LocalizedSplitButtonMessagesDirective, selector: "[kendoSplitButtonLocalizedMessages]", providers: [
        {
            provide: Messages,
            useExisting: forwardRef(() => LocalizedSplitButtonMessagesDirective)
        }
    ], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: LocalizedSplitButtonMessagesDirective, decorators: [{
            type: Directive,
            args: [{
                    providers: [
                        {
                            provide: Messages,
                            useExisting: forwardRef(() => LocalizedSplitButtonMessagesDirective)
                        }
                    ],
                    selector: '[kendoSplitButtonLocalizedMessages]'
                }]
        }], ctorParameters: function () { return [{ type: i1.LocalizationService }]; } });

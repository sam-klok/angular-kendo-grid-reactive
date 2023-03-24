/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, forwardRef } from '@angular/core';
import { TimePickerMessages } from './messages';
import * as i0 from "@angular/core";
import * as i1 from "@progress/kendo-angular-l10n";
/**
 * @hidden
 */
export class TimeSelectorLocalizedMessagesDirective extends TimePickerMessages {
    constructor(service) {
        super();
        this.service = service;
    }
}
TimeSelectorLocalizedMessagesDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: TimeSelectorLocalizedMessagesDirective, deps: [{ token: i1.LocalizationService }], target: i0.ɵɵFactoryTarget.Directive });
TimeSelectorLocalizedMessagesDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.16", type: TimeSelectorLocalizedMessagesDirective, selector: "[kendoTimeSelectorLocalizedMessages]", providers: [
        {
            provide: TimePickerMessages,
            useExisting: forwardRef(() => TimeSelectorLocalizedMessagesDirective)
        }
    ], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: TimeSelectorLocalizedMessagesDirective, decorators: [{
            type: Directive,
            args: [{
                    providers: [
                        {
                            provide: TimePickerMessages,
                            useExisting: forwardRef(() => TimeSelectorLocalizedMessagesDirective)
                        }
                    ],
                    selector: '[kendoTimeSelectorLocalizedMessages]'
                }]
        }], ctorParameters: function () { return [{ type: i1.LocalizationService }]; } });

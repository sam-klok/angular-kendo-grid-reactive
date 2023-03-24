/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, forwardRef } from '@angular/core';
import { Messages } from './messages';
import * as i0 from "@angular/core";
import * as i1 from "@progress/kendo-angular-l10n";
/**
 * Custom component messages override default component messages ([see example]({% slug globalization_dateinputs %}#toc-custom-messages)).
 */
export class DateTimePickerCustomMessagesComponent extends Messages {
    constructor(service) {
        super();
        this.service = service;
    }
    get override() {
        return true;
    }
}
DateTimePickerCustomMessagesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: DateTimePickerCustomMessagesComponent, deps: [{ token: i1.LocalizationService }], target: i0.ɵɵFactoryTarget.Component });
DateTimePickerCustomMessagesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: DateTimePickerCustomMessagesComponent, selector: "kendo-datetimepicker-messages", providers: [
        {
            provide: Messages,
            useExisting: forwardRef(() => DateTimePickerCustomMessagesComponent)
        }
    ], usesInheritance: true, ngImport: i0, template: ``, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: DateTimePickerCustomMessagesComponent, decorators: [{
            type: Component,
            args: [{
                    providers: [
                        {
                            provide: Messages,
                            useExisting: forwardRef(() => DateTimePickerCustomMessagesComponent)
                        }
                    ],
                    selector: 'kendo-datetimepicker-messages',
                    template: ``
                }]
        }], ctorParameters: function () { return [{ type: i1.LocalizationService }]; } });

/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupModule } from '@progress/kendo-angular-popup';
import { EventsModule } from '@progress/kendo-angular-common';
import { IntlModule } from '@progress/kendo-angular-intl';
import { DateInputModule } from '../dateinput/dateinput.module';
import { CalendarModule } from '../calendar/calendar.module';
import { TimePickerModule } from '../timepicker/timepicker.module';
import { TemplatesModule } from '../calendar/templates.module';
import { touchEnabled } from '@progress/kendo-common';
import { TOUCH_ENABLED } from '../touch-enabled';
import { DateTimePickerComponent } from './datetimepicker.component';
import { DateTimePickerCustomMessagesComponent } from './localization/datetimepicker-custom-messages.component';
import { LocalizedMessagesDirective } from './localization/localized-messages.directive';
import * as i0 from "@angular/core";
const COMPONENT_DIRECTIVES = [
    DateTimePickerComponent,
    DateTimePickerCustomMessagesComponent,
    LocalizedMessagesDirective
];
/**
 * Represents the [NgModule](link:site.data.urls.angular['ngmoduleapi'])
 * definition for the DateTimePicker component.
 */
export class DateTimePickerModule {
}
DateTimePickerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: DateTimePickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DateTimePickerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: DateTimePickerModule, declarations: [DateTimePickerComponent,
        DateTimePickerCustomMessagesComponent,
        LocalizedMessagesDirective], imports: [CommonModule,
        IntlModule,
        DateInputModule,
        CalendarModule,
        TimePickerModule,
        PopupModule,
        EventsModule,
        TemplatesModule], exports: [DateTimePickerComponent,
        DateTimePickerCustomMessagesComponent,
        LocalizedMessagesDirective, TemplatesModule] });
DateTimePickerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: DateTimePickerModule, providers: [
        { provide: TOUCH_ENABLED, useValue: touchEnabled }
    ], imports: [[
            CommonModule,
            IntlModule,
            DateInputModule,
            CalendarModule,
            TimePickerModule,
            PopupModule,
            EventsModule,
            TemplatesModule
        ], TemplatesModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: DateTimePickerModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        ...COMPONENT_DIRECTIVES
                    ],
                    exports: [
                        ...COMPONENT_DIRECTIVES,
                        TemplatesModule
                    ],
                    imports: [
                        CommonModule,
                        IntlModule,
                        DateInputModule,
                        CalendarModule,
                        TimePickerModule,
                        PopupModule,
                        EventsModule,
                        TemplatesModule
                    ],
                    providers: [
                        { provide: TOUCH_ENABLED, useValue: touchEnabled }
                    ]
                }]
        }] });

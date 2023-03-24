/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as i0 from "@angular/core";
import * as i1 from "./date-range.component";
import * as i2 from "./date-range-popup.component";
import * as i3 from "./date-range-popup-template.directive";
import * as i4 from "./date-range-selection.directive";
import * as i5 from "./date-range-start-input.directive";
import * as i6 from "./date-range-end-input.directive";
import * as i7 from "@angular/common";
import * as i8 from "../calendar/multiview-calendar.module";
import * as i9 from "../dateinput/dateinput.module";
import * as i10 from "@progress/kendo-angular-popup";
import * as i11 from "@progress/kendo-angular-common";
/**
 * The exported package module.
 *
 * The package exports:
 * - `DateRangeComponent`&mdash;The DateRange component class.
 * - `DateRangePopupComponent`&mdash;The DateRangePopup component class.
 * - `DateRangeSelectionDirective`&mdash;The MultiviewCalendar date range selection directive.
 * - `DateRangeEndInputDirective`&mdash;The end DateInput date range selection directive.
 * - `DateRangeStartInputDirective`&mdash;The start DateInput date range selection directive.
 * - `DateRangePopupTemplateDirective`&mdash;The DateRangePopup content template directive.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the DateRange module
 * import { DateRangeModule } from '@progress/kendo-angular-dateinputs';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, DateRangeModule], // import DateRange module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
export declare class DateRangeModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<DateRangeModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<DateRangeModule, [typeof i1.DateRangeComponent, typeof i2.DateRangePopupComponent, typeof i3.DateRangePopupTemplateDirective, typeof i4.DateRangeSelectionDirective, typeof i5.DateRangeStartInputDirective, typeof i6.DateRangeEndInputDirective], [typeof i7.CommonModule, typeof i8.MultiViewCalendarModule, typeof i9.DateInputModule, typeof i10.PopupModule, typeof i11.EventsModule], [typeof i1.DateRangeComponent, typeof i2.DateRangePopupComponent, typeof i3.DateRangePopupTemplateDirective, typeof i4.DateRangeSelectionDirective, typeof i5.DateRangeStartInputDirective, typeof i6.DateRangeEndInputDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<DateRangeModule>;
}

/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { NumericTextBoxComponent } from './numerictextbox/numerictextbox.component';
import { CommonModule } from '@angular/common';
import { LocalizedNumericTextBoxMessagesDirective } from './numerictextbox/localization/localized-numerictextbox-messages.directive';
import { NumericTextBoxCustomMessagesComponent } from './numerictextbox/localization/custom-messages.component';
import { EventsModule } from '@progress/kendo-angular-common';
import * as i0 from "@angular/core";
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the NumericTextBox component.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the NumericTextBox module
 * import { NumericTextBoxModule } from '@progress/kendo-angular-inputs';
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
 *     imports:      [BrowserModule, NumericTextBoxModule], // import NumericTextBox module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
export class NumericTextBoxModule {
}
NumericTextBoxModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: NumericTextBoxModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NumericTextBoxModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: NumericTextBoxModule, declarations: [LocalizedNumericTextBoxMessagesDirective,
        NumericTextBoxComponent,
        NumericTextBoxCustomMessagesComponent], imports: [CommonModule, EventsModule], exports: [NumericTextBoxComponent,
        NumericTextBoxCustomMessagesComponent] });
NumericTextBoxModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: NumericTextBoxModule, imports: [[CommonModule, EventsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: NumericTextBoxModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        LocalizedNumericTextBoxMessagesDirective,
                        NumericTextBoxComponent,
                        NumericTextBoxCustomMessagesComponent
                    ],
                    exports: [
                        NumericTextBoxComponent,
                        NumericTextBoxCustomMessagesComponent
                    ],
                    imports: [CommonModule, EventsModule]
                }]
        }] });

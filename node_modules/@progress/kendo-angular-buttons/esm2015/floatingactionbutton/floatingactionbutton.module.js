/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatingActionButtonComponent } from './floatingactionbutton.component';
import { DialItemTemplateDirective } from './templates/dial-item-template.directive';
import { FloatingActionButtonTemplateDirective } from './templates/fab-template.directive';
import { DialListComponent } from './dial-list.component';
import { DialItemComponent } from './dial-item.component';
import { ListModule } from '../listbutton/list.module';
import { EventsModule } from '@progress/kendo-angular-common';
import { PopupModule } from '@progress/kendo-angular-popup';
import * as i0 from "@angular/core";
const exportedModules = [
    FloatingActionButtonComponent,
    DialItemTemplateDirective,
    FloatingActionButtonTemplateDirective
];
const declarations = [
    ...exportedModules,
    DialListComponent,
    DialItemComponent
];
/**
 * Represents the [NgModule](link:site.data.urls.angular['ngmoduleapi'])
 * definition for the FloatingActionButton component.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the FloatingActionButton module
 * import { FloatingActionButtonModule } from '@progress/kendo-angular-buttons';
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
 *     imports:      [BrowserModule, FloatingActionButtonModule], // import FloatingActionButton module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * ```
 */
export class FloatingActionButtonModule {
}
FloatingActionButtonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: FloatingActionButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FloatingActionButtonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: FloatingActionButtonModule, declarations: [FloatingActionButtonComponent,
        DialItemTemplateDirective,
        FloatingActionButtonTemplateDirective, DialListComponent,
        DialItemComponent], imports: [CommonModule, PopupModule, ListModule, EventsModule], exports: [FloatingActionButtonComponent,
        DialItemTemplateDirective,
        FloatingActionButtonTemplateDirective] });
FloatingActionButtonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: FloatingActionButtonModule, imports: [[CommonModule, PopupModule, ListModule, EventsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: FloatingActionButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [declarations],
                    exports: [exportedModules],
                    imports: [CommonModule, PopupModule, ListModule, EventsModule]
                }]
        }] });

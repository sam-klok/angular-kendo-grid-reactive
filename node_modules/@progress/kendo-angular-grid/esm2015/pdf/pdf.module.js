/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { PDFComponent } from './pdf.component';
import { PDFMarginComponent } from './pdf-margin.component';
import { PDFCommandDirective } from './pdf-command.directive';
import { PDFTemplateDirective } from './pdf-template.directive';
import * as i0 from "@angular/core";
const exportedModules = [
    PDFComponent,
    PDFMarginComponent,
    PDFCommandDirective,
    PDFTemplateDirective
];
const declarations = [
    PDFComponent,
    PDFMarginComponent,
    PDFCommandDirective,
    PDFTemplateDirective
];
/**
 * Represents the [NgModule](link:site.data.urls.angular['ngmoduleapi'])
 * definition for the Grid PDF component.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Grid and PDF modules
 * import { GridModule, PDFModule } from '@progress/kendo-angular-grid';
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
 *     imports:      [BrowserModule, GridModule, PDFModule], // import Grid and PDF modules
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
export class PDFModule {
}
PDFModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: PDFModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PDFModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: PDFModule, declarations: [PDFComponent,
        PDFMarginComponent,
        PDFCommandDirective,
        PDFTemplateDirective], exports: [PDFComponent,
        PDFMarginComponent,
        PDFCommandDirective,
        PDFTemplateDirective] });
PDFModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: PDFModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: PDFModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [declarations],
                    exports: [exportedModules]
                }]
        }] });

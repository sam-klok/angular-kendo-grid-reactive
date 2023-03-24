/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as i0 from "@angular/core";
import * as i1 from "./pdf.component";
import * as i2 from "./pdf-margin.component";
import * as i3 from "./pdf-command.directive";
import * as i4 from "./pdf-template.directive";
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
export declare class PDFModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<PDFModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<PDFModule, [typeof i1.PDFComponent, typeof i2.PDFMarginComponent, typeof i3.PDFCommandDirective, typeof i4.PDFTemplateDirective], never, [typeof i1.PDFComponent, typeof i2.PDFMarginComponent, typeof i3.PDFCommandDirective, typeof i4.PDFTemplateDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<PDFModule>;
}

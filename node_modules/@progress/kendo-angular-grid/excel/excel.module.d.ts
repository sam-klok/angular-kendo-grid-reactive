/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as i0 from "@angular/core";
import * as i1 from "./excel.component";
import * as i2 from "./excel-command.directive";
import * as i3 from "@progress/kendo-angular-excel-export";
/**
 * Represents the [NgModule](link:site.data.urls.angular['ngmoduleapi'])
 * definition for the Excel component of the Grid.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Grid and Excel modules
 * import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
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
 *     imports:      [BrowserModule, GridModule, ExcelModule], // import Grid and Excel modules
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
export declare class ExcelModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<ExcelModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ExcelModule, [typeof i1.ExcelComponent, typeof i2.ExcelCommandDirective], never, [typeof i1.ExcelComponent, typeof i2.ExcelCommandDirective, typeof i3.ExcelExportModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ExcelModule>;
}

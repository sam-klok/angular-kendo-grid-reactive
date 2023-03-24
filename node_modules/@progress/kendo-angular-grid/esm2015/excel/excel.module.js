/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { ExcelComponent } from './excel.component';
import { ExcelCommandDirective } from './excel-command.directive';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import * as i0 from "@angular/core";
const declarations = [ExcelComponent, ExcelCommandDirective];
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
export class ExcelModule {
}
ExcelModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ExcelModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ExcelModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ExcelModule, declarations: [ExcelComponent, ExcelCommandDirective], exports: [ExcelComponent, ExcelCommandDirective, ExcelExportModule] });
ExcelModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ExcelModule, imports: [ExcelExportModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ExcelModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [declarations],
                    exports: [declarations, ExcelExportModule]
                }]
        }] });

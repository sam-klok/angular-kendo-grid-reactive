/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { FocusableDirective } from './../focusable/focusable.directive';
import { ButtonItemTemplateDirective } from './button-item-template.directive';
import { TemplateContextDirective } from './template-context.directive';
import * as i0 from "@angular/core";
const EXPORTED_DIRECTIVES = [
    ListComponent,
    FocusableDirective,
    ButtonItemTemplateDirective,
    TemplateContextDirective
];
/**
 * @hidden
 */
export class ListModule {
}
ListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ListModule, declarations: [ListComponent,
        FocusableDirective,
        ButtonItemTemplateDirective,
        TemplateContextDirective], imports: [CommonModule], exports: [ListComponent,
        FocusableDirective,
        ButtonItemTemplateDirective,
        TemplateContextDirective] });
ListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ListModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ListModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [EXPORTED_DIRECTIVES],
                    exports: [EXPORTED_DIRECTIVES],
                    imports: [CommonModule]
                }]
        }] });

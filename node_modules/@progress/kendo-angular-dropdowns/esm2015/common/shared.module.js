/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list.component';
import { SearchBarComponent } from './searchbar.component';
import { TagListComponent } from './taglist.component';
import { PopupModule } from '@progress/kendo-angular-popup';
import { ResizeSensorModule, EventsModule } from '@progress/kendo-angular-common';
import { SharedDirectivesModule } from './shared-directives.module';
import { ListItemDirective } from './list-item.directive';
import { SelectableDirective } from './selection/selectable.directive';
import { TemplateContextDirective } from './templates/template-context.directive';
import { CheckDirective } from '../dropdowntrees/checked-state/check.directive';
import { CheckAllDirective } from '../dropdowntrees/checked-state/check-all.directive';
import * as i0 from "@angular/core";
const INTERNAL_DIRECTIVES = [
    ListComponent,
    ListItemDirective,
    SelectableDirective,
    SearchBarComponent,
    TemplateContextDirective,
    TagListComponent,
    CheckDirective,
    CheckAllDirective
];
/**
 * @hidden
 */
export class SharedModule {
}
SharedModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: SharedModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SharedModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: SharedModule, declarations: [ListComponent,
        ListItemDirective,
        SelectableDirective,
        SearchBarComponent,
        TemplateContextDirective,
        TagListComponent,
        CheckDirective,
        CheckAllDirective], imports: [CommonModule, FormsModule, ReactiveFormsModule, PopupModule, ResizeSensorModule, SharedDirectivesModule, EventsModule], exports: [ListComponent,
        ListItemDirective,
        SelectableDirective,
        SearchBarComponent,
        TemplateContextDirective,
        TagListComponent,
        CheckDirective,
        CheckAllDirective, CommonModule, FormsModule, ReactiveFormsModule, PopupModule, ResizeSensorModule, SharedDirectivesModule, EventsModule] });
SharedModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: SharedModule, imports: [[CommonModule, FormsModule, ReactiveFormsModule, PopupModule, ResizeSensorModule, SharedDirectivesModule, EventsModule], CommonModule, FormsModule, ReactiveFormsModule, PopupModule, ResizeSensorModule, SharedDirectivesModule, EventsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: SharedModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [INTERNAL_DIRECTIVES],
                    exports: [INTERNAL_DIRECTIVES, CommonModule, FormsModule, ReactiveFormsModule, PopupModule, ResizeSensorModule, SharedDirectivesModule, EventsModule],
                    imports: [CommonModule, FormsModule, ReactiveFormsModule, PopupModule, ResizeSensorModule, SharedDirectivesModule, EventsModule]
                }]
        }] });

/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupHeaderTemplateDirective } from './group-header-template.directive';
import { GroupHeaderColumnTemplateDirective } from './group-header-column-template.directive';
import { GroupHeaderComponent } from './group-header.component';
import { GroupFooterTemplateDirective } from './group-footer-template.directive';
import { GroupPanelComponent } from './group-panel.component';
import { GroupIndicatorComponent } from './group-indicator.component';
import { SharedModule } from "../shared.module";
import { DragAndDropModule } from '../dragdrop/drag-and-drop.module';
import * as i0 from "@angular/core";
const exportedModules = [
    GroupHeaderTemplateDirective,
    GroupHeaderColumnTemplateDirective,
    GroupFooterTemplateDirective,
    GroupHeaderComponent,
    GroupPanelComponent,
    GroupIndicatorComponent
];
/**
 * @hidden
 */
export class GroupModule {
    static exports() {
        return [
            GroupHeaderTemplateDirective,
            GroupHeaderColumnTemplateDirective,
            GroupFooterTemplateDirective
        ];
    }
}
GroupModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: GroupModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GroupModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: GroupModule, declarations: [GroupHeaderTemplateDirective,
        GroupHeaderColumnTemplateDirective,
        GroupFooterTemplateDirective,
        GroupHeaderComponent,
        GroupPanelComponent,
        GroupIndicatorComponent], imports: [CommonModule, SharedModule, DragAndDropModule], exports: [GroupHeaderTemplateDirective,
        GroupHeaderColumnTemplateDirective,
        GroupFooterTemplateDirective,
        GroupHeaderComponent,
        GroupPanelComponent,
        GroupIndicatorComponent] });
GroupModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: GroupModule, imports: [[CommonModule, SharedModule, DragAndDropModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: GroupModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [exportedModules],
                    exports: [exportedModules],
                    imports: [CommonModule, SharedModule, DragAndDropModule]
                }]
        }] });

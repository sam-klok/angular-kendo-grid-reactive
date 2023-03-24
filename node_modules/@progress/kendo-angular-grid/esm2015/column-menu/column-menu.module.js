/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnListComponent } from './column-list.component';
import { ColumnChooserComponent } from './column-chooser.component';
import { ColumnMenuChooserComponent } from './column-menu-chooser.component';
import { ColumnMenuFilterComponent } from './column-menu-filter.component';
import { ColumnMenuItemComponent } from './column-menu-item.component';
import { ColumnMenuItemContentTemplateDirective } from './column-menu-item-content-template.directive';
import { ColumnMenuSortComponent } from './column-menu-sort.component';
import { ColumnMenuComponent } from './column-menu.component';
import { ColumnMenuLockComponent } from './column-menu-lock.component';
import { FilterMenuModule } from '../filtering/menu/filter-menu.module';
import { ColumnMenuTemplateDirective } from './column-menu-template.directive';
import { ColumnMenuContainerComponent } from './column-menu-container.component';
import { ColumnMenuItemDirective } from './column-menu-item.directive';
import { ColumnMenuStickComponent } from './column-menu-stick.component';
import { ColumnMenuPositionComponent } from './column-menu-position.component';
import { ColumnMenuAutoSizeColumnComponent } from './column-menu-autosize.component';
import { ColumnMenuAutoSizeAllColumnsComponent } from './column-menu-autosize-all.component';
import * as i0 from "@angular/core";
const COMPONENTS = [
    ColumnListComponent,
    ColumnChooserComponent,
    ColumnMenuChooserComponent,
    ColumnMenuFilterComponent,
    ColumnMenuItemComponent,
    ColumnMenuItemContentTemplateDirective,
    ColumnMenuSortComponent,
    ColumnMenuComponent,
    ColumnMenuLockComponent,
    ColumnMenuTemplateDirective,
    ColumnMenuContainerComponent,
    ColumnMenuItemDirective,
    ColumnMenuStickComponent,
    ColumnMenuPositionComponent,
    ColumnMenuAutoSizeColumnComponent,
    ColumnMenuAutoSizeAllColumnsComponent
];
/**
 * @hidden
 */
export class ColumnMenuModule {
    static exports() {
        return [
            ColumnChooserComponent,
            ColumnMenuFilterComponent,
            ColumnMenuItemComponent,
            ColumnMenuItemContentTemplateDirective,
            ColumnMenuSortComponent,
            ColumnMenuLockComponent,
            ColumnMenuStickComponent,
            ColumnMenuPositionComponent,
            ColumnMenuChooserComponent,
            ColumnMenuTemplateDirective,
            ColumnMenuContainerComponent,
            ColumnMenuItemDirective,
            ColumnMenuComponent,
            ColumnMenuAutoSizeColumnComponent,
            ColumnMenuAutoSizeAllColumnsComponent
        ];
    }
}
ColumnMenuModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ColumnMenuModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ColumnMenuModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ColumnMenuModule, declarations: [ColumnListComponent,
        ColumnChooserComponent,
        ColumnMenuChooserComponent,
        ColumnMenuFilterComponent,
        ColumnMenuItemComponent,
        ColumnMenuItemContentTemplateDirective,
        ColumnMenuSortComponent,
        ColumnMenuComponent,
        ColumnMenuLockComponent,
        ColumnMenuTemplateDirective,
        ColumnMenuContainerComponent,
        ColumnMenuItemDirective,
        ColumnMenuStickComponent,
        ColumnMenuPositionComponent,
        ColumnMenuAutoSizeColumnComponent,
        ColumnMenuAutoSizeAllColumnsComponent], imports: [CommonModule, FilterMenuModule], exports: [ColumnListComponent,
        ColumnChooserComponent,
        ColumnMenuChooserComponent,
        ColumnMenuFilterComponent,
        ColumnMenuItemComponent,
        ColumnMenuItemContentTemplateDirective,
        ColumnMenuSortComponent,
        ColumnMenuComponent,
        ColumnMenuLockComponent,
        ColumnMenuTemplateDirective,
        ColumnMenuContainerComponent,
        ColumnMenuItemDirective,
        ColumnMenuStickComponent,
        ColumnMenuPositionComponent,
        ColumnMenuAutoSizeColumnComponent,
        ColumnMenuAutoSizeAllColumnsComponent] });
ColumnMenuModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ColumnMenuModule, imports: [[CommonModule, FilterMenuModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ColumnMenuModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [COMPONENTS],
                    imports: [CommonModule, FilterMenuModule],
                    exports: [COMPONENTS]
                }]
        }] });

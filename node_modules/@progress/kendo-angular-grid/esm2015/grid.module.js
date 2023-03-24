/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { GridSpacerComponent } from './rendering/common/spacer.component';
import { GridMarqueeDirective } from './selection/marquee.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid.component';
import { ListComponent } from './rendering/list.component';
import { DataBindingDirective } from './databinding.directive';
import { SelectionDirective } from './selection/selection.directive';
import { ExpandDetailsDirective } from './rendering/details-expand.directive';
import { ExpandGroupDirective } from './rendering/groups-expand.directive';
import { LocalizedMessagesDirective } from './localization/localized-messages.directive';
import { CustomMessagesComponent } from './localization/custom-messages.component';
import { RowFilterModule } from "./filtering/cell/row-filtering.module";
import { PagerModule } from "./pager/pager.module";
import { GroupModule } from "./grouping/group.module";
import { HeaderModule } from "./rendering/header/header.module";
import { BodyModule } from "./rendering/body.module";
import { FooterModule } from "./rendering/footer/footer.module";
import { SharedModule } from './shared.module';
import { ToolbarTemplateDirective } from "./rendering/toolbar/toolbar-template.directive";
import { ToolbarComponent } from "./rendering/toolbar/toolbar.component";
import { ResizeSensorModule } from '@progress/kendo-angular-common';
import { TemplateEditingDirective } from './editing-directives/template-editing.directive';
import { ReactiveEditingDirective } from './editing-directives/reactive-editing.directive';
import { InCellEditingDirective } from './editing-directives/in-cell-editing.directive';
import { GroupBindingDirective } from './grouping/group-scroll-binding.directive';
import { FilterMenuModule } from "./filtering/menu/filter-menu.module";
import { ColumnMenuModule } from './column-menu/column-menu.module';
import * as i0 from "@angular/core";
import * as i1 from "./grouping/group-header-template.directive";
import * as i2 from "./grouping/group-header-column-template.directive";
import * as i3 from "./grouping/group-footer-template.directive";
import * as i4 from "./columns/column.component";
import * as i5 from "./columns/span-column.component";
import * as i6 from "./columns/column-group.component";
import * as i7 from "./rendering/footer/footer-template.directive";
import * as i8 from "./rendering/details/detail-template.directive";
import * as i9 from "./navigation/focusable.directive";
import * as i10 from "./columns/command-column.component";
import * as i11 from "./columns/checkbox-column.component";
import * as i12 from "./selection/selection-checkbox.directive";
import * as i13 from "./rendering/cell-template.directive";
import * as i14 from "./rendering/no-records-template.directive";
import * as i15 from "./editing/edit-template.directive";
import * as i16 from "./editing/edit-command.directive";
import * as i17 from "./editing/cancel-command.directive";
import * as i18 from "./editing/save-command.directive";
import * as i19 from "./editing/remove-command.directive";
import * as i20 from "./editing/add-command.directive";
import * as i21 from "./rendering/cell-loading.template.directive";
import * as i22 from "./rendering/loading-template.directive";
import * as i23 from "./rendering/header/header-template.directive";
import * as i24 from "./selection/selectall-checkbox.directive";
import * as i25 from "./pager/pager.component";
import * as i26 from "./pager/pager-prev-buttons.component";
import * as i27 from "./pager/pager-next-buttons.component";
import * as i28 from "./pager/pager-numeric-buttons.component";
import * as i29 from "./pager/pager-input.component";
import * as i30 from "./pager/pager-info.component";
import * as i31 from "./pager/pager-page-sizes.component";
import * as i32 from "./pager/pager-template.directive";
import * as i33 from "./pager/pager-dropdown.directive";
import * as i34 from "./pager/pager-input.directive";
import * as i35 from "./filtering/filter-row.component";
import * as i36 from "./filtering/cell/filter-cell.component";
import * as i37 from "./filtering/cell/filter-cell-template.directive";
import * as i38 from "./filtering/cell/filter-cell-operators.component";
import * as i39 from "./filtering/cell/string-filter-cell.component";
import * as i40 from "./filtering/cell/numeric-filter-cell.component";
import * as i41 from "./filtering/cell/autocomplete-filter-cell.component";
import * as i42 from "./filtering/cell/boolean-filter-cell.component";
import * as i43 from "./filtering/cell/date-filter-cell.component";
import * as i44 from "./filtering/operators/contains-filter-operator.component";
import * as i45 from "./filtering/operators/not-contains-filter-operator.component";
import * as i46 from "./filtering/operators/ends-with-filter-operator.component";
import * as i47 from "./filtering/operators/eq-filter-operator.component";
import * as i48 from "./filtering/operators/is-empty-filter-operator.component";
import * as i49 from "./filtering/operators/is-not-empty-filter-operator.component";
import * as i50 from "./filtering/operators/is-not-null-filter-operator.component";
import * as i51 from "./filtering/operators/isnull-filter-operator.component";
import * as i52 from "./filtering/operators/neq-filter-operator.component";
import * as i53 from "./filtering/operators/starts-with-filter-operator.component";
import * as i54 from "./filtering/operators/gt-filter-operator.component";
import * as i55 from "./filtering/operators/gte-filter-operator.component";
import * as i56 from "./filtering/operators/lt-filter-operator.component";
import * as i57 from "./filtering/operators/lte-filter-operator.component";
import * as i58 from "./filtering/operators/after-filter-operator.component";
import * as i59 from "./filtering/operators/after-eq-filter-operator.component";
import * as i60 from "./filtering/operators/before-eq-filter-operator.component";
import * as i61 from "./filtering/operators/before-filter-operator.component";
import * as i62 from "./filtering/menu/string-filter-menu.component";
import * as i63 from "./filtering/menu/filter-menu-template.directive";
import * as i64 from "./filtering/menu/numeric-filter-menu.component";
import * as i65 from "./filtering/menu/date-filter-menu.component";
import * as i66 from "./filtering/menu/boolean-filter-menu.component";
import * as i67 from "./filtering/menu/filter-menu-dropdownlist.directive";
import * as i68 from "./filtering/menu/filter-radio-button.directive";
import * as i69 from "./column-menu/column-chooser.component";
import * as i70 from "./column-menu/column-menu-filter.component";
import * as i71 from "./column-menu/column-menu-item.component";
import * as i72 from "./column-menu/column-menu-item-content-template.directive";
import * as i73 from "./column-menu/column-menu-sort.component";
import * as i74 from "./column-menu/column-menu-lock.component";
import * as i75 from "./column-menu/column-menu-stick.component";
import * as i76 from "./column-menu/column-menu-position.component";
import * as i77 from "./column-menu/column-menu-chooser.component";
import * as i78 from "./column-menu/column-menu-template.directive";
import * as i79 from "./column-menu/column-menu-container.component";
import * as i80 from "./column-menu/column-menu-item.directive";
import * as i81 from "./column-menu/column-menu.component";
import * as i82 from "./column-menu/column-menu-autosize.component";
import * as i83 from "./column-menu/column-menu-autosize-all.component";
const exportedModules = [
    GridComponent,
    ToolbarTemplateDirective,
    ToolbarComponent,
    GridSpacerComponent,
    DataBindingDirective,
    SelectionDirective,
    CustomMessagesComponent,
    GroupBindingDirective,
    TemplateEditingDirective,
    ReactiveEditingDirective,
    InCellEditingDirective,
    ExpandDetailsDirective,
    ExpandGroupDirective,
    ...GroupModule.exports(),
    ...SharedModule.exports(),
    ...BodyModule.exports(),
    ...HeaderModule.exports(),
    ...FooterModule.exports(),
    ...PagerModule.exports(),
    ...RowFilterModule.exports(),
    ...FilterMenuModule.exports(),
    ...ColumnMenuModule.exports()
];
const declarations = [
    GridComponent,
    ListComponent,
    ToolbarComponent,
    LocalizedMessagesDirective,
    CustomMessagesComponent,
    DataBindingDirective,
    ToolbarTemplateDirective,
    SelectionDirective,
    TemplateEditingDirective,
    ReactiveEditingDirective,
    InCellEditingDirective,
    ExpandDetailsDirective,
    ExpandGroupDirective,
    GroupBindingDirective,
    GridMarqueeDirective,
    GridSpacerComponent
];
/**
 * Represents the [NgModule](link:site.data.urls.angular['ngmoduleapi'])
 * definition for the Grid component.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Grid module
 * import { GridModule } from '@progress/kendo-angular-grid';
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
 *     imports:      [BrowserModule, GridModule], // import Grid module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
export class GridModule {
}
GridModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: GridModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GridModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: GridModule, declarations: [GridComponent,
        ListComponent,
        ToolbarComponent,
        LocalizedMessagesDirective,
        CustomMessagesComponent,
        DataBindingDirective,
        ToolbarTemplateDirective,
        SelectionDirective,
        TemplateEditingDirective,
        ReactiveEditingDirective,
        InCellEditingDirective,
        ExpandDetailsDirective,
        ExpandGroupDirective,
        GroupBindingDirective,
        GridMarqueeDirective,
        GridSpacerComponent], imports: [CommonModule,
        GroupModule,
        SharedModule,
        BodyModule,
        HeaderModule,
        FooterModule,
        PagerModule,
        RowFilterModule,
        FilterMenuModule,
        ResizeSensorModule,
        ColumnMenuModule], exports: [GridComponent,
        ToolbarTemplateDirective,
        ToolbarComponent,
        GridSpacerComponent,
        DataBindingDirective,
        SelectionDirective,
        CustomMessagesComponent,
        GroupBindingDirective,
        TemplateEditingDirective,
        ReactiveEditingDirective,
        InCellEditingDirective,
        ExpandDetailsDirective,
        ExpandGroupDirective, i1.GroupHeaderTemplateDirective, i2.GroupHeaderColumnTemplateDirective, i3.GroupFooterTemplateDirective, i4.ColumnComponent, i5.SpanColumnComponent, i6.ColumnGroupComponent, i7.FooterTemplateDirective, i8.DetailTemplateDirective, i9.FocusableDirective, i10.CommandColumnComponent, i11.CheckboxColumnComponent, i12.SelectionCheckboxDirective, i13.CellTemplateDirective, i14.NoRecordsTemplateDirective, i15.EditTemplateDirective, i16.EditCommandDirective, i17.CancelCommandDirective, i18.SaveCommandDirective, i19.RemoveCommandDirective, i20.AddCommandDirective, i21.CellLoadingTemplateDirective, i22.LoadingTemplateDirective, i23.HeaderTemplateDirective, i24.SelectAllCheckboxDirective, i25.PagerComponent, i26.PagerPrevButtonsComponent, i27.PagerNextButtonsComponent, i28.PagerNumericButtonsComponent, i29.PagerInputComponent, i30.PagerInfoComponent, i31.PagerPageSizesComponent, i32.PagerTemplateDirective, i33.PagerDropDownListDirective, i34.PagerInputDirective, i35.FilterRowComponent, i36.FilterCellComponent, i37.FilterCellTemplateDirective, i38.FilterCellOperatorsComponent, i39.StringFilterCellComponent, i40.NumericFilterCellComponent, i41.AutoCompleteFilterCellComponent, i42.BooleanFilterCellComponent, i43.DateFilterCellComponent, i38.FilterCellOperatorsComponent, i44.ContainsFilterOperatorComponent, i45.DoesNotContainFilterOperatorComponent, i46.EndsWithFilterOperatorComponent, i47.EqualFilterOperatorComponent, i48.IsEmptyFilterOperatorComponent, i49.IsNotEmptyFilterOperatorComponent, i50.IsNotNullFilterOperatorComponent, i51.IsNullFilterOperatorComponent, i52.NotEqualFilterOperatorComponent, i53.StartsWithFilterOperatorComponent, i54.GreaterFilterOperatorComponent, i55.GreaterOrEqualToFilterOperatorComponent, i56.LessFilterOperatorComponent, i57.LessOrEqualToFilterOperatorComponent, i58.AfterFilterOperatorComponent, i59.AfterEqFilterOperatorComponent, i60.BeforeEqFilterOperatorComponent, i61.BeforeFilterOperatorComponent, i62.StringFilterMenuComponent, i63.FilterMenuTemplateDirective, i64.NumericFilterMenuComponent, i65.DateFilterMenuComponent, i66.BooleanFilterMenuComponent, i67.FilterMenuDropDownListDirective, i68.BooleanFilterRadioButtonDirective, i38.FilterCellOperatorsComponent, i44.ContainsFilterOperatorComponent, i45.DoesNotContainFilterOperatorComponent, i46.EndsWithFilterOperatorComponent, i47.EqualFilterOperatorComponent, i48.IsEmptyFilterOperatorComponent, i49.IsNotEmptyFilterOperatorComponent, i50.IsNotNullFilterOperatorComponent, i51.IsNullFilterOperatorComponent, i52.NotEqualFilterOperatorComponent, i53.StartsWithFilterOperatorComponent, i54.GreaterFilterOperatorComponent, i55.GreaterOrEqualToFilterOperatorComponent, i56.LessFilterOperatorComponent, i57.LessOrEqualToFilterOperatorComponent, i58.AfterFilterOperatorComponent, i59.AfterEqFilterOperatorComponent, i60.BeforeEqFilterOperatorComponent, i61.BeforeFilterOperatorComponent, i69.ColumnChooserComponent, i70.ColumnMenuFilterComponent, i71.ColumnMenuItemComponent, i72.ColumnMenuItemContentTemplateDirective, i73.ColumnMenuSortComponent, i74.ColumnMenuLockComponent, i75.ColumnMenuStickComponent, i76.ColumnMenuPositionComponent, i77.ColumnMenuChooserComponent, i78.ColumnMenuTemplateDirective, i79.ColumnMenuContainerComponent, i80.ColumnMenuItemDirective, i81.ColumnMenuComponent, i82.ColumnMenuAutoSizeColumnComponent, i83.ColumnMenuAutoSizeAllColumnsComponent] });
GridModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: GridModule, imports: [[
            CommonModule,
            GroupModule,
            SharedModule,
            BodyModule,
            HeaderModule,
            FooterModule,
            PagerModule,
            RowFilterModule,
            FilterMenuModule,
            ResizeSensorModule,
            ColumnMenuModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: GridModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [declarations],
                    exports: [exportedModules],
                    imports: [
                        CommonModule,
                        GroupModule,
                        SharedModule,
                        BodyModule,
                        HeaderModule,
                        FooterModule,
                        PagerModule,
                        RowFilterModule,
                        FilterMenuModule,
                        ResizeSensorModule,
                        ColumnMenuModule
                    ]
                }]
        }] });

/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as i0 from "@angular/core";
import * as i1 from "./grid.component";
import * as i2 from "./rendering/list.component";
import * as i3 from "./rendering/toolbar/toolbar.component";
import * as i4 from "./localization/localized-messages.directive";
import * as i5 from "./localization/custom-messages.component";
import * as i6 from "./databinding.directive";
import * as i7 from "./rendering/toolbar/toolbar-template.directive";
import * as i8 from "./selection/selection.directive";
import * as i9 from "./editing-directives/template-editing.directive";
import * as i10 from "./editing-directives/reactive-editing.directive";
import * as i11 from "./editing-directives/in-cell-editing.directive";
import * as i12 from "./rendering/details-expand.directive";
import * as i13 from "./rendering/groups-expand.directive";
import * as i14 from "./grouping/group-scroll-binding.directive";
import * as i15 from "./selection/marquee.directive";
import * as i16 from "./rendering/common/spacer.component";
import * as i17 from "@angular/common";
import * as i18 from "./grouping/group.module";
import * as i19 from "./shared.module";
import * as i20 from "./rendering/body.module";
import * as i21 from "./rendering/header/header.module";
import * as i22 from "./rendering/footer/footer.module";
import * as i23 from "./pager/pager.module";
import * as i24 from "./filtering/cell/row-filtering.module";
import * as i25 from "./filtering/menu/filter-menu.module";
import * as i26 from "@progress/kendo-angular-common";
import * as i27 from "./column-menu/column-menu.module";
import * as i28 from "./grouping/group-header-template.directive";
import * as i29 from "./grouping/group-header-column-template.directive";
import * as i30 from "./grouping/group-footer-template.directive";
import * as i31 from "./columns/column.component";
import * as i32 from "./columns/span-column.component";
import * as i33 from "./columns/column-group.component";
import * as i34 from "./rendering/footer/footer-template.directive";
import * as i35 from "./rendering/details/detail-template.directive";
import * as i36 from "./navigation/focusable.directive";
import * as i37 from "./columns/command-column.component";
import * as i38 from "./columns/checkbox-column.component";
import * as i39 from "./selection/selection-checkbox.directive";
import * as i40 from "./rendering/cell-template.directive";
import * as i41 from "./rendering/no-records-template.directive";
import * as i42 from "./editing/edit-template.directive";
import * as i43 from "./editing/edit-command.directive";
import * as i44 from "./editing/cancel-command.directive";
import * as i45 from "./editing/save-command.directive";
import * as i46 from "./editing/remove-command.directive";
import * as i47 from "./editing/add-command.directive";
import * as i48 from "./rendering/cell-loading.template.directive";
import * as i49 from "./rendering/loading-template.directive";
import * as i50 from "./rendering/header/header-template.directive";
import * as i51 from "./selection/selectall-checkbox.directive";
import * as i52 from "./pager/pager.component";
import * as i53 from "./pager/pager-prev-buttons.component";
import * as i54 from "./pager/pager-next-buttons.component";
import * as i55 from "./pager/pager-numeric-buttons.component";
import * as i56 from "./pager/pager-input.component";
import * as i57 from "./pager/pager-info.component";
import * as i58 from "./pager/pager-page-sizes.component";
import * as i59 from "./pager/pager-template.directive";
import * as i60 from "./pager/pager-dropdown.directive";
import * as i61 from "./pager/pager-input.directive";
import * as i62 from "./filtering/filter-row.component";
import * as i63 from "./filtering/cell/filter-cell.component";
import * as i64 from "./filtering/cell/filter-cell-template.directive";
import * as i65 from "./filtering/cell/filter-cell-operators.component";
import * as i66 from "./filtering/cell/string-filter-cell.component";
import * as i67 from "./filtering/cell/numeric-filter-cell.component";
import * as i68 from "./filtering/cell/autocomplete-filter-cell.component";
import * as i69 from "./filtering/cell/boolean-filter-cell.component";
import * as i70 from "./filtering/cell/date-filter-cell.component";
import * as i71 from "./filtering/operators/contains-filter-operator.component";
import * as i72 from "./filtering/operators/not-contains-filter-operator.component";
import * as i73 from "./filtering/operators/ends-with-filter-operator.component";
import * as i74 from "./filtering/operators/eq-filter-operator.component";
import * as i75 from "./filtering/operators/is-empty-filter-operator.component";
import * as i76 from "./filtering/operators/is-not-empty-filter-operator.component";
import * as i77 from "./filtering/operators/is-not-null-filter-operator.component";
import * as i78 from "./filtering/operators/isnull-filter-operator.component";
import * as i79 from "./filtering/operators/neq-filter-operator.component";
import * as i80 from "./filtering/operators/starts-with-filter-operator.component";
import * as i81 from "./filtering/operators/gt-filter-operator.component";
import * as i82 from "./filtering/operators/gte-filter-operator.component";
import * as i83 from "./filtering/operators/lt-filter-operator.component";
import * as i84 from "./filtering/operators/lte-filter-operator.component";
import * as i85 from "./filtering/operators/after-filter-operator.component";
import * as i86 from "./filtering/operators/after-eq-filter-operator.component";
import * as i87 from "./filtering/operators/before-eq-filter-operator.component";
import * as i88 from "./filtering/operators/before-filter-operator.component";
import * as i89 from "./filtering/menu/string-filter-menu.component";
import * as i90 from "./filtering/menu/filter-menu-template.directive";
import * as i91 from "./filtering/menu/numeric-filter-menu.component";
import * as i92 from "./filtering/menu/date-filter-menu.component";
import * as i93 from "./filtering/menu/boolean-filter-menu.component";
import * as i94 from "./filtering/menu/filter-menu-dropdownlist.directive";
import * as i95 from "./filtering/menu/filter-radio-button.directive";
import * as i96 from "./column-menu/column-chooser.component";
import * as i97 from "./column-menu/column-menu-filter.component";
import * as i98 from "./column-menu/column-menu-item.component";
import * as i99 from "./column-menu/column-menu-item-content-template.directive";
import * as i100 from "./column-menu/column-menu-sort.component";
import * as i101 from "./column-menu/column-menu-lock.component";
import * as i102 from "./column-menu/column-menu-stick.component";
import * as i103 from "./column-menu/column-menu-position.component";
import * as i104 from "./column-menu/column-menu-chooser.component";
import * as i105 from "./column-menu/column-menu-template.directive";
import * as i106 from "./column-menu/column-menu-container.component";
import * as i107 from "./column-menu/column-menu-item.directive";
import * as i108 from "./column-menu/column-menu.component";
import * as i109 from "./column-menu/column-menu-autosize.component";
import * as i110 from "./column-menu/column-menu-autosize-all.component";
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
export declare class GridModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<GridModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<GridModule, [typeof i1.GridComponent, typeof i2.ListComponent, typeof i3.ToolbarComponent, typeof i4.LocalizedMessagesDirective, typeof i5.CustomMessagesComponent, typeof i6.DataBindingDirective, typeof i7.ToolbarTemplateDirective, typeof i8.SelectionDirective, typeof i9.TemplateEditingDirective, typeof i10.ReactiveEditingDirective, typeof i11.InCellEditingDirective, typeof i12.ExpandDetailsDirective, typeof i13.ExpandGroupDirective, typeof i14.GroupBindingDirective, typeof i15.GridMarqueeDirective, typeof i16.GridSpacerComponent], [typeof i17.CommonModule, typeof i18.GroupModule, typeof i19.SharedModule, typeof i20.BodyModule, typeof i21.HeaderModule, typeof i22.FooterModule, typeof i23.PagerModule, typeof i24.RowFilterModule, typeof i25.FilterMenuModule, typeof i26.ResizeSensorModule, typeof i27.ColumnMenuModule], [typeof i1.GridComponent, typeof i7.ToolbarTemplateDirective, typeof i3.ToolbarComponent, typeof i16.GridSpacerComponent, typeof i6.DataBindingDirective, typeof i8.SelectionDirective, typeof i5.CustomMessagesComponent, typeof i14.GroupBindingDirective, typeof i9.TemplateEditingDirective, typeof i10.ReactiveEditingDirective, typeof i11.InCellEditingDirective, typeof i12.ExpandDetailsDirective, typeof i13.ExpandGroupDirective, typeof i28.GroupHeaderTemplateDirective, typeof i29.GroupHeaderColumnTemplateDirective, typeof i30.GroupFooterTemplateDirective, typeof i31.ColumnComponent, typeof i32.SpanColumnComponent, typeof i33.ColumnGroupComponent, typeof i34.FooterTemplateDirective, typeof i35.DetailTemplateDirective, typeof i36.FocusableDirective, typeof i37.CommandColumnComponent, typeof i38.CheckboxColumnComponent, typeof i39.SelectionCheckboxDirective, typeof i40.CellTemplateDirective, typeof i41.NoRecordsTemplateDirective, typeof i42.EditTemplateDirective, typeof i43.EditCommandDirective, typeof i44.CancelCommandDirective, typeof i45.SaveCommandDirective, typeof i46.RemoveCommandDirective, typeof i47.AddCommandDirective, typeof i48.CellLoadingTemplateDirective, typeof i49.LoadingTemplateDirective, typeof i50.HeaderTemplateDirective, typeof i51.SelectAllCheckboxDirective, typeof i52.PagerComponent, typeof i53.PagerPrevButtonsComponent, typeof i54.PagerNextButtonsComponent, typeof i55.PagerNumericButtonsComponent, typeof i56.PagerInputComponent, typeof i57.PagerInfoComponent, typeof i58.PagerPageSizesComponent, typeof i59.PagerTemplateDirective, typeof i60.PagerDropDownListDirective, typeof i61.PagerInputDirective, typeof i62.FilterRowComponent, typeof i63.FilterCellComponent, typeof i64.FilterCellTemplateDirective, typeof i65.FilterCellOperatorsComponent, typeof i66.StringFilterCellComponent, typeof i67.NumericFilterCellComponent, typeof i68.AutoCompleteFilterCellComponent, typeof i69.BooleanFilterCellComponent, typeof i70.DateFilterCellComponent, typeof i65.FilterCellOperatorsComponent, typeof i71.ContainsFilterOperatorComponent, typeof i72.DoesNotContainFilterOperatorComponent, typeof i73.EndsWithFilterOperatorComponent, typeof i74.EqualFilterOperatorComponent, typeof i75.IsEmptyFilterOperatorComponent, typeof i76.IsNotEmptyFilterOperatorComponent, typeof i77.IsNotNullFilterOperatorComponent, typeof i78.IsNullFilterOperatorComponent, typeof i79.NotEqualFilterOperatorComponent, typeof i80.StartsWithFilterOperatorComponent, typeof i81.GreaterFilterOperatorComponent, typeof i82.GreaterOrEqualToFilterOperatorComponent, typeof i83.LessFilterOperatorComponent, typeof i84.LessOrEqualToFilterOperatorComponent, typeof i85.AfterFilterOperatorComponent, typeof i86.AfterEqFilterOperatorComponent, typeof i87.BeforeEqFilterOperatorComponent, typeof i88.BeforeFilterOperatorComponent, typeof i89.StringFilterMenuComponent, typeof i90.FilterMenuTemplateDirective, typeof i91.NumericFilterMenuComponent, typeof i92.DateFilterMenuComponent, typeof i93.BooleanFilterMenuComponent, typeof i94.FilterMenuDropDownListDirective, typeof i95.BooleanFilterRadioButtonDirective, typeof i65.FilterCellOperatorsComponent, typeof i71.ContainsFilterOperatorComponent, typeof i72.DoesNotContainFilterOperatorComponent, typeof i73.EndsWithFilterOperatorComponent, typeof i74.EqualFilterOperatorComponent, typeof i75.IsEmptyFilterOperatorComponent, typeof i76.IsNotEmptyFilterOperatorComponent, typeof i77.IsNotNullFilterOperatorComponent, typeof i78.IsNullFilterOperatorComponent, typeof i79.NotEqualFilterOperatorComponent, typeof i80.StartsWithFilterOperatorComponent, typeof i81.GreaterFilterOperatorComponent, typeof i82.GreaterOrEqualToFilterOperatorComponent, typeof i83.LessFilterOperatorComponent, typeof i84.LessOrEqualToFilterOperatorComponent, typeof i85.AfterFilterOperatorComponent, typeof i86.AfterEqFilterOperatorComponent, typeof i87.BeforeEqFilterOperatorComponent, typeof i88.BeforeFilterOperatorComponent, typeof i96.ColumnChooserComponent, typeof i97.ColumnMenuFilterComponent, typeof i98.ColumnMenuItemComponent, typeof i99.ColumnMenuItemContentTemplateDirective, typeof i100.ColumnMenuSortComponent, typeof i101.ColumnMenuLockComponent, typeof i102.ColumnMenuStickComponent, typeof i103.ColumnMenuPositionComponent, typeof i104.ColumnMenuChooserComponent, typeof i105.ColumnMenuTemplateDirective, typeof i106.ColumnMenuContainerComponent, typeof i107.ColumnMenuItemDirective, typeof i108.ColumnMenuComponent, typeof i109.ColumnMenuAutoSizeColumnComponent, typeof i110.ColumnMenuAutoSizeAllColumnsComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<GridModule>;
}

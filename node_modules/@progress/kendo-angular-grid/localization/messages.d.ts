/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ComponentMessages } from '@progress/kendo-angular-l10n';
import * as i0 from "@angular/core";
/**
 * @hidden
 */
export declare class GridMessages extends ComponentMessages {
    /**
     * The text for the empty group panel.
     */
    groupPanelEmpty: string;
    /**
     * The no-records text.
     */
    noRecords: string;
    /**
     * The label of the pager. By default follows the pattern 'Page navigation, page {currentPage} of {totalPages}'.
     * The default label text when the current page is 1, and the total number of pages is 10 will be
     * 'Page navigation, page 1 of 10'.
     *
     * The message consists of several parts - the current page number, the total number of pages, and a localizable string.
     * To allow for reordering its parts, the `pagerLabel` input accepts a string with placeholders for the current page
     * and total number of pages. The '{currentPage}' and '{totalPages}' placeholders will be replaced
     * internally with the respective actual values.
     *
     * @example
     *
     * ```ts-no-run
     *      <kendo-grid>
     *          <kendo-grid-messages
     *              pagerLabel="You are currently on page {currentPage} of {totalPages}"
     *          >
     *          </kendo-grid-messages>
     *      </kendo-grid>
     *  ```
     */
    pagerLabel: string;
    /**
     * The label for the **First page** button.
     */
    pagerFirstPage: string;
    /**
     * The label for the **Last page** button.
     */
    pagerLastPage: string;
    /**
     * The label for the **Previous page** button.
     */
    pagerPreviousPage: string;
    /**
     * The label for the **Next page** button.
     */
    pagerNextPage: string;
    /**
     * The label displayed before the pager input.
     */
    pagerPage: string;
    /**
     * The label displayed after the page-size selector.
     */
    pagerItemsPerPage: string;
    /**
     * The label before the total-page number.
     */
    pagerOf: string;
    /**
     * The label after the total-page number.
     */
    pagerItems: string;
    /**
     * The title attribute of the page number input element.
     */
    pagerPageNumberInputTitle: string;
    /**
     * The label of the filter cell or icon.
     */
    filter: string;
    /**
     * The label of the filter input.
     *
     * The filter input label consists of a two-part message - the name of the column and a localizable string.
     * For a column named 'Product Name', the default label will be 'Product Name Filter'.
     *
     * To allow reordering the column name and the localizable part, the filterInputLabel accepts a string with a
     * placeholder for the column name - e.g. 'filter for {columnName}'. The '{columnName}' placeholder will be replaced
     * internally with the current column name, and the resulting label will be rendered as 'filter for Product Name'.
     *
     * @example
     *
     * ```ts-no-run
     *      <kendo-grid>
     *          <kendo-grid-messages
     *              filterInputLabel="filter for {columnName}"
     *          >
     *          </kendo-grid-messages>
     *      </kendo-grid>
     *  ```
     */
    filterInputLabel: string;
    /**
     * The title of the filter menu icon.
     *
     * The title consists of a two-part message - the name of the column and a localizable string.
     * For a column named 'Product Name', the default title will be 'Product Name Filter Menu'.
     *
     * To allow reordering the column name and the localizable part, the filterMenuTitle accepts a string with a
     * placeholder for the column name - e.g. 'filter for {columnName}'. The '{columnName}' placeholder will be replaced
     * internally with the current column name, and the resulting title will be rendered as 'filter for Product Name'.
     *
     * @example
     *
     * ```ts-no-run
     *      <kendo-grid>
     *          <kendo-grid-messages
     *              filterMenuTitle="filter for {columnName}"
     *          >
     *          </kendo-grid-messages>
     *      </kendo-grid>
     *  ```
     */
    filterMenuTitle: string;
    /**
     * The label of the filter menu operators DropDownList.
     *
     * The label consists of a two-part message - the name of the column and a localizable string.
     * For a column named 'Product Name', the default label will be 'Product Name Filter Menu Operators'.
     *
     * To allow reordering the column name and the localizable part, the filterMenuOperatorsDropDownLabel accepts a string with a
     * placeholder for the column name - e.g. 'filter operators for {columnName}'. The '{columnName}' placeholder will be replaced
     * internally with the current column name, and the resulting label will be rendered as 'filter operators for Product Name'.
     *
     * @example
     *
     * ```ts-no-run
     *      <kendo-grid>
     *          <kendo-grid-messages
     *              filterMenuOperatorsDropDownLabel="filter operators for {columnName}"
     *          >
     *          </kendo-grid-messages>
     *      </kendo-grid>
     *  ```
     */
    filterMenuOperatorsDropDownLabel: string;
    /**
     * The label of the filter menu logic DropDownList.
     *
     * The label consists of a two-part message - the name of the column and a localizable string.
     * For a column named 'Product Name', the default label will be 'Product Name Filter Menu Logic'.
     *
     * To allow reordering the column name and the localizable part, the filterMenuLogicDropDownLabel accepts a string with a
     * placeholder for the column name - e.g. 'filter logic for {columnName}'. The '{columnName}' placeholder will be replaced
     * internally with the current column name, and the resulting label will be rendered as 'filter logic for Product Name'.
     *
     * @example
     *
     * ```ts-no-run
     *      <kendo-grid>
     *          <kendo-grid-messages
     *              filterMenuOperatorsDropDownLabel="filter operators for {columnName}"
     *          >
     *          </kendo-grid-messages>
     *      </kendo-grid>
     *  ```
     */
    filterMenuLogicDropDownLabel: string;
    /**
     * The text of the `Equal` (**Is equal to**) filter operator.
     */
    filterEqOperator: string;
    /**
     * The text of the `NotEqual` (**Is not equal to**) filter operator.
     */
    filterNotEqOperator: string;
    /**
     * The text of the `IsNull` (**Is null**) filter operator.
     */
    filterIsNullOperator: string;
    /**
     * The text of the `IsNotNull` (**Is not null**) filter operator.
     */
    filterIsNotNullOperator: string;
    /**
     * The text of the `IsEmpty` (**Is empty**) filter operator.
     */
    filterIsEmptyOperator: string;
    /**
     * The text of the `IsNotEmpty` (**Is not empty**) filter operator.
     */
    filterIsNotEmptyOperator: string;
    /**
     * The text of the `StartsWith` (**Starts with**) filter operator.
     */
    filterStartsWithOperator: string;
    /**
     * The text of the `Contains` (**Contains**) filter operator.
     */
    filterContainsOperator: string;
    /**
     * The text of the `DoesNotContain` (**Does not contain**) filter operator.
     */
    filterNotContainsOperator: string;
    /**
     * The text of the `EndsWith` (**Ends with**) string filter operator.
     */
    filterEndsWithOperator: string;
    /**
     * The text of the `GreaterOrEqualTo` (**Is greater than or equal to**) numeric filter operator.
     */
    filterGteOperator: string;
    /**
     * The text of the `Greater` (**Is greater than**) numeric filter operator.
     */
    filterGtOperator: string;
    /**
     * The text of the `LessOrEqualTo` (**Is less than or equal to**) numeric filter operator.
     */
    filterLteOperator: string;
    /**
     * The text of the `Less` (**Is less than**) numeric filter operator.
     */
    filterLtOperator: string;
    /**
     * The text of the `IsTrue` Boolean filter option.
     */
    filterIsTrue: string;
    /**
     * The text of the `IsFalse` Boolean filter option.
     */
    filterIsFalse: string;
    /**
     * The text of the `(All)` option for Boolean filter.
     */
    filterBooleanAll: string;
    /**
     * The text of the `AfterOrEqualTo` (**Is after or equal to**) date filter operator.
     */
    filterAfterOrEqualOperator: string;
    /**
     * The text of the `After` (**Is after**) date filter operator.
     */
    filterAfterOperator: string;
    /**
     * The text of the `Before` (**Is before**) date filter operator.
     */
    filterBeforeOperator: string;
    /**
     * The text of the `BeforeOrEqualTo` (**Is before or equal to**) date filter operator.
     */
    filterBeforeOrEqualOperator: string;
    /**
     * The text of the **Filter** button.
     */
    filterFilterButton: string;
    /**
     * The text of the **Clear filter** button.
     */
    filterClearButton: string;
    /**
     * The text of the `And` filter logic.
     */
    filterAndLogic: string;
    /**
     * The text of the `Or` filter logic.
     */
    filterOrLogic: string;
    /**
     * The loading text.
     *
     * > The `loading` property is part of the accessibility support of the Grid.
     * Its value is detectable by screen readers and is not otherwise visible.
     */
    loading: string;
    /**
     * The text of the aria-label attribute placed on the Grid focusable element.
     */
    gridLabel: string;
    /**
     * The title of the column menu icon.
     *
     * The title consists of a two-part message - the name of the column and a localizable string.
     * For a column named 'Product Name', the default title will be 'Product Name Column Menu'.
     *
     * To allow reordering the column name and the localizable part, the columnMenu accepts a string with a
     * placeholder for the column name - e.g. 'menu for {columnName}'. The '{columnName}' placeholder will be replaced
     * internally with the current column name, and the resulting title will be rendered as 'menu for Product Name'.
     *
     * @example
     *
     * ```ts-no-run
     *      <kendo-grid>
     *          <kendo-grid-messages
     *              filterMenuTitle="filter for {columnName}"
     *          >
     *          </kendo-grid-messages>
     *      </kendo-grid>
     *  ```
     */
    columnMenu: string;
    /**
     * The text that is displayed in the column menu for the set column position item.
     */
    setColumnPosition: string;
    /**
     * The text that is displayed in the column menu for the column items.
     */
    columns: string;
    /**
     * The text that is displayed in the column menu for the lock item.
     */
    lock: string;
    /**
     * The text that is displayed in the column menu for the unlock item.
     */
    unlock: string;
    /**
     * The text that is displayed in the column menu for the stick item.
     */
    stick: string;
    /**
     * The text that is displayed in the column menu for the unstick item.
     */
    unstick: string;
    /**
     * The label of the sort icon.
     */
    sortable: string;
    /**
     * The text that is displayed in the column menu for the ascending sort item.
     */
    sortAscending: string;
    /**
     * The text that is displayed in the column menu for the descending sort item.
     */
    sortDescending: string;
    /**
     * The text shown in the column menu for the autosize this column item.
     */
    autosizeThisColumn: string;
    /**
     * The text shown in the column menu for the autosize all columns item.
     */
    autosizeAllColumns: string;
    /**
     * The status announcement when a column is sorted in an ascending order.
     */
    sortedAscending: string;
    /**
     * The status announcement when a column is sorted in a descending order.
     */
    sortedDescending: string;
    /**
     * The status announcement when a column is no longer sorted.
     */
    sortedDefault: string;
    /**
     * The text that is displayed in the column menu or in the column chooser item
     * for the **Apply** button of the columns.
     */
    columnsApply: string;
    /**
     * The text that is displayed in the column menu or in the column chooser item
     * for the **Reset** button of the columns.
     */
    columnsReset: string;
    /**
     * The title of the expand icon of detail rows.
     */
    detailExpand: string;
    /**
     * The title of the collapse icon of detail rows.
     */
    detailCollapse: string;
    /**
     * The text of the Today button of the Date filter.
     */
    filterDateToday: string;
    /**
     * The title of the Toggle button of the Date filter.
     */
    filterDateToggle: string;
    /**
     * The title of the Decrement button of the Numeric filter.
     */
    filterNumericDecrement: string;
    /**
     * The title of the Increment button of the Numeric filter.
     */
    filterNumericIncrement: string;
    /**
     * The labels of the checkbox column checkboxes.
     */
    selectionCheckboxLabel: string;
    /**
     * The label of the checkbox column select all checkbox.
     */
    selectAllCheckboxLabel: string;
    /**
     * The text of the title and aria-label attributes applied to the collapse icon of group rows.
     */
    groupCollapse: string;
    /**
     * The text of the title and aria-label attributes applied to the expand icon of group rows.
     */
    groupExpand: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<GridMessages, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<GridMessages, "kendo-grid-messages-base", never, { "groupPanelEmpty": "groupPanelEmpty"; "noRecords": "noRecords"; "pagerLabel": "pagerLabel"; "pagerFirstPage": "pagerFirstPage"; "pagerLastPage": "pagerLastPage"; "pagerPreviousPage": "pagerPreviousPage"; "pagerNextPage": "pagerNextPage"; "pagerPage": "pagerPage"; "pagerItemsPerPage": "pagerItemsPerPage"; "pagerOf": "pagerOf"; "pagerItems": "pagerItems"; "pagerPageNumberInputTitle": "pagerPageNumberInputTitle"; "filter": "filter"; "filterInputLabel": "filterInputLabel"; "filterMenuTitle": "filterMenuTitle"; "filterMenuOperatorsDropDownLabel": "filterMenuOperatorsDropDownLabel"; "filterMenuLogicDropDownLabel": "filterMenuLogicDropDownLabel"; "filterEqOperator": "filterEqOperator"; "filterNotEqOperator": "filterNotEqOperator"; "filterIsNullOperator": "filterIsNullOperator"; "filterIsNotNullOperator": "filterIsNotNullOperator"; "filterIsEmptyOperator": "filterIsEmptyOperator"; "filterIsNotEmptyOperator": "filterIsNotEmptyOperator"; "filterStartsWithOperator": "filterStartsWithOperator"; "filterContainsOperator": "filterContainsOperator"; "filterNotContainsOperator": "filterNotContainsOperator"; "filterEndsWithOperator": "filterEndsWithOperator"; "filterGteOperator": "filterGteOperator"; "filterGtOperator": "filterGtOperator"; "filterLteOperator": "filterLteOperator"; "filterLtOperator": "filterLtOperator"; "filterIsTrue": "filterIsTrue"; "filterIsFalse": "filterIsFalse"; "filterBooleanAll": "filterBooleanAll"; "filterAfterOrEqualOperator": "filterAfterOrEqualOperator"; "filterAfterOperator": "filterAfterOperator"; "filterBeforeOperator": "filterBeforeOperator"; "filterBeforeOrEqualOperator": "filterBeforeOrEqualOperator"; "filterFilterButton": "filterFilterButton"; "filterClearButton": "filterClearButton"; "filterAndLogic": "filterAndLogic"; "filterOrLogic": "filterOrLogic"; "loading": "loading"; "gridLabel": "gridLabel"; "columnMenu": "columnMenu"; "setColumnPosition": "setColumnPosition"; "columns": "columns"; "lock": "lock"; "unlock": "unlock"; "stick": "stick"; "unstick": "unstick"; "sortable": "sortable"; "sortAscending": "sortAscending"; "sortDescending": "sortDescending"; "autosizeThisColumn": "autosizeThisColumn"; "autosizeAllColumns": "autosizeAllColumns"; "sortedAscending": "sortedAscending"; "sortedDescending": "sortedDescending"; "sortedDefault": "sortedDefault"; "columnsApply": "columnsApply"; "columnsReset": "columnsReset"; "detailExpand": "detailExpand"; "detailCollapse": "detailCollapse"; "filterDateToday": "filterDateToday"; "filterDateToggle": "filterDateToggle"; "filterNumericDecrement": "filterNumericDecrement"; "filterNumericIncrement": "filterNumericIncrement"; "selectionCheckboxLabel": "selectionCheckboxLabel"; "selectAllCheckboxLabel": "selectAllCheckboxLabel"; "groupCollapse": "groupCollapse"; "groupExpand": "groupExpand"; }, {}, never>;
}

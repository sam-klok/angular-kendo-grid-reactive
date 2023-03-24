/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * Defines the settings for sorting the Grid column.
 */
export interface ColumnSortSettings {
    /**
     * Enables the removal of the column sorting.
     */
    allowUnsort?: boolean;
    /**
     * Determines the initial (from the unsorted to the sorted state) sort direction.
     *
     * The available values for setting the initial sort direction are:
     * - `asc` (default)
     * - `desc`
     */
    initialDirection?: 'asc' | 'desc';
}
/**
 * Specifies settings for sorting by single column.
 */
export interface SingleSortSettings extends ColumnSortSettings {
    /**
     * The sort mode of the Grid.
     */
    mode?: 'single';
}
/**
 * Specifies a modifier key.
 */
export declare type ModifierKey = 'none' | 'ctrl' | 'shift' | 'alt';
/**
 * Specifies settings for sorting by multiple columns.
 */
export interface MultipleSortSettings extends ColumnSortSettings {
    /**
     * The sort mode of the Grid.
     */
    mode?: 'multiple';
    /**
     * Enables the sort-sequence indicators for sorting multiple columns.
     */
    showIndexes?: boolean;
    /**
     * Specifies the modifier key for sorting by 2nd or more columns.
     *
     * The default value is 'none', meaning that clicking a column will add it to the sort order.
     * Selecting a key modifier along with the click will remove sorting from all other columns.
     *
     * If the key is set to 'ctrl', 'shift' or 'alt', clicking a column will remove sorting from all other columns.
     * The specified key must be pressed to add the column to the sort order instead.
     *
     * > The `ctrl` value corresponds to the `Command` key in a macOS environment.
     *
     * @default 'none'
     */
    multiSortKey?: ModifierKey;
}
/**
 * Defines the settings for sorting the Grid.
 * Can be of type `boolean`, [SingleSortSettings]({% slug api_grid_singlesortsettings %}),
 * or [MultipleSortSettings]({% slug api_grid_multiplesortsettings %}).
 */
export declare type SortSettings = boolean | SingleSortSettings | MultipleSortSettings;
/**
 * @hidden
 */
export declare const normalize: (...settings: (SortSettings | ColumnSortSettings)[]) => any;

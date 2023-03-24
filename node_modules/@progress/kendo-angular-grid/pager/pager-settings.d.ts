/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * The type of the Grid pager.
 *
 * The available values are:
 * * `numeric`&mdash;Buttons with numbers.
 * * `input`&mdash;Input for typing the page number.
 *
 * @example
 * ```html-no-run
 *
 * <kendo-grid
 *    [pageable]="{
 *        type: 'numeric'
 *    }">
 * </kendo-grid>
 * ```
 */
export declare type PagerType = 'numeric' | 'input';
/**
 * The position of the Grid pager.
 *
 * The available values are:
 * * `top`&mdash;The pager is rendered above the Grid headers.
 * * `bottom`&mdash;(Default) The pager is rendered below the data table.
 * * `both`&mdash;Two pagers are rendered - one above the Grid headers, and one - below the data table.
 *
 * @example
 * ```html-no-run
 *
 * <kendo-grid
 *    [pageable]="{
 *        position: 'both'
 *    }">
 * </kendo-grid>
 * ```
 */
export declare type PagerPosition = 'top' | 'bottom' | 'both';
/**
 * The pager settings of the Grid ([see example]({% slug paging_grid %}#toc-pager-settings)).
 *
 * @example
 * ```html-no-run
 *
 * <kendo-grid
 *    [pageable]="{
 *        buttonCount: 2,
 *        info: false
 *    }">
 * </kendo-grid>
 * ```
 */
export interface PagerSettings {
    /**
     * Sets the maximum numeric buttons count before the buttons are collapsed.
     *
     * @default 10
     */
    buttonCount?: number;
    /**
     * Toggles the information about the current page and the total number of records.
     *
     * @default true
     */
    info?: boolean;
    /**
     * Defines the type of the Grid pager.
     *
     * @default 'numeric'
     */
    type?: PagerType;
    /**
     * Shows a menu for selecting the page size.
     *
     * @default false
     */
    pageSizes?: boolean | Array<number>;
    /**
     * Toggles the **Previous** and **Next** buttons.
     *
     * @default true
     */
    previousNext?: boolean;
    /**
     * Toggles the built-in responsive behavior of the Pager.
     * Available in version `5.0.0` and above ([see example]({% slug paging_grid %}#toc-responsive-pager)).
     *
     * @default true
     */
    responsive?: boolean;
    /**
     * Defines the Pager position relative to the Grid data table.
     * The possible values are 'top', 'bottom', and 'both' ([see example]({% slug paging_grid %}#toc-pager-settings)).
     *
     * @default 'bottom'
     */
    position?: PagerPosition;
}
/**
 * @hidden
 */
export declare const normalize: (settings: any) => any;

/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * Represents the possible navigable sections of the Grid ([see example]({% slug keyboard_navigation_grid %}#toc-navigable-sections)).
 */
export declare type GridNavigableSection = 'pager' | 'table';
/**
 * Represents the type of the Grid [`navigable`]({% slug api_grid_gridcomponent %}#toc-navigable) option.
 */
export declare type GridNavigableSettings = boolean | GridNavigableSection[];

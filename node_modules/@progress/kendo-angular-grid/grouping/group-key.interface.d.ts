/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * Represents the default format in which the the [kendoGridExpandGroupBy]({% slug api_grid_expandgroupdirective %})
 * directive persists the expanded group keys ([see example]({% slug groups_expanded_state_grid %}#toc-built-in-directive)).
 *
 * Determining whether a group is expanded or collapsed is done by comparing all of the following field values.
 */
export interface GroupKey {
    /**
     * Represents the `field` property value of the current group item.
     */
    field: string;
    /**
     * Represents the `value` property value of the current group item.
     */
    value: any;
    /**
     * An array of `{ field: string, value: any }` items indicating all parent groups of the current one,
     * staring from the direct parent group all the way to the root level one.
     *
     * The following example demonstrates how to provide [expandedGroupKeys]({% slug api_grid_expandgroupdirective %}#toc-expandedgroupkeys).
     * The `productCategory` group provides as `parentGroupKeys` first the group descriptor for its direct parent group,
     * and then the group descriptors for the ancestor groups.
     *
     * @example
     * ```ts-no-run
     * public expandedGroupKeys: Array<GroupKey> = [
     *    { field: 'location', value: 'Sofia' },
     *    { field: 'inStock', value: true, parentGroupKeys: [{ field: 'location', value: 'Sofia' }] },
     *    { field: 'productCategory', value: 'Bevarages', parentGroupKeys: [{ field: 'inStock', value: true }, { field: 'location', value: 'Sofia' }] }
     * ];
     * ```
     */
    parentGroupKeys?: Array<{
        field: string;
        value: any;
    }>;
}

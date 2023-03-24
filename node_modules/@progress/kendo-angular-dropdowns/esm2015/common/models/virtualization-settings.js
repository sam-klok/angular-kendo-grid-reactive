/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * @hidden
 */
const DEFAULTS = {
    pageSize: 50,
    itemHeight: 28
};
/**
 * @hidden
 */
export const normalizeVirtualizationSettings = (settings, defaultOverrides) => {
    const defaults = Object.assign({}, DEFAULTS, defaultOverrides);
    if (settings === true) {
        return defaults;
    }
    if (!settings) {
        return null;
    }
    return Object.assign({ pageSize: DEFAULTS.pageSize }, settings);
};

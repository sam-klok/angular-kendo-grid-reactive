/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * Arguments for the `columnLockedChange` event.
 */
export class ColumnLockedChangeEvent {
    /**
     * @hidden
     */
    constructor(columns) {
        this.columns = columns;
    }
}

/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter } from '@angular/core';
import { GroupDescriptor } from '@progress/kendo-data-query';
import * as i0 from "@angular/core";
/**
 * @hidden
 */
export declare class GroupIndicatorComponent {
    directionChange: EventEmitter<GroupDescriptor>;
    remove: EventEmitter<GroupDescriptor>;
    group: GroupDescriptor;
    groupTitle: string;
    get groupIndicatorClass(): boolean;
    get dir(): string;
    toggleDirection(): boolean;
    removeDescriptor(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<GroupIndicatorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GroupIndicatorComponent, "[kendoGroupIndicator]", never, { "group": "group"; "groupTitle": "groupTitle"; }, { "directionChange": "directionChange"; "remove": "remove"; }, never, never>;
}

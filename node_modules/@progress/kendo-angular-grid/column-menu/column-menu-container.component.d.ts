/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ColumnMenuItemDirective } from './column-menu-item.directive';
import { AfterContentInit, NgZone, QueryList } from '@angular/core';
import { ColumnMenuService } from './column-menu.service';
import * as i0 from "@angular/core";
/**
 * @hidden
 */
export declare class ColumnMenuContainerComponent implements AfterContentInit {
    private service;
    private ngZone;
    columnMenuItems: QueryList<ColumnMenuItemDirective>;
    constructor(service: ColumnMenuService, ngZone: NgZone);
    ngAfterContentInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ColumnMenuContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ColumnMenuContainerComponent, "kendo-grid-columnmenu-container", never, {}, {}, ["columnMenuItems"], ["*"]>;
}

/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef, NgZone, Renderer2 } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * @hidden
 */
export declare class ColumnMenuItemDirective {
    hostElement: ElementRef;
    private renderer;
    private ngZone;
    menuItemComponent: any;
    firstFocusableElement: HTMLElement;
    lastFocusableElement: HTMLElement;
    set isFirst(value: boolean);
    get isFirst(): boolean;
    set isLast(value: boolean);
    get isLast(): boolean;
    private _isFirst;
    private _isLast;
    private columnMenuItems;
    private subs;
    constructor(hostElement: ElementRef, renderer: Renderer2, ngZone: NgZone);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    private onTab;
    private getLastColumnMenuItem;
    private isExpandableItem;
    static ɵfac: i0.ɵɵFactoryDeclaration<ColumnMenuItemDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ColumnMenuItemDirective, "[kendoGridColumnMenuItem]", never, { "menuItemComponent": "kendoGridColumnMenuItem"; }, {}, never>;
}

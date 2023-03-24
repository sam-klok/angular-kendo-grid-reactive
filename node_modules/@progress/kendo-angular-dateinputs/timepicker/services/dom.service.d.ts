/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * @hidden
 */
export declare class TimePickerDOMService {
    itemHeight: number;
    timeListHeight: number;
    ensureHeights(): void;
    calculateHeights(container?: HTMLElement): void;
    isActive(element: ElementRef): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<TimePickerDOMService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TimePickerDOMService>;
}

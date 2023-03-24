/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * Arguments for the scrollTo method. Specifies to which row / column should the grid scroll to.
 */
export interface ScrollRequest {
    row?: number;
    column?: number;
}
/**
 * @hidden
 */
export declare class ScrollRequestService {
    requests: Subject<ScrollRequest>;
    scrollTo(request: ScrollRequest): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ScrollRequestService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ScrollRequestService>;
}

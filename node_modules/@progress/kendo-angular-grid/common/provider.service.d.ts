/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import type { GridComponent } from '../grid.component';
import * as i0 from "@angular/core";
/**
 * @hidden
 *
 * The Context service is used to provide common
 * services and DI tokens for a Grid instance.
 *
 * This keeps the constructor parameters stable
 * and a avoids dependency cycles between components.
 */
export declare class ContextService {
    grid: GridComponent;
    static ɵfac: i0.ɵɵFactoryDeclaration<ContextService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ContextService>;
}

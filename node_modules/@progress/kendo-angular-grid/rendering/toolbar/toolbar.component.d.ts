/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { TemplateRef } from '@angular/core';
import { ContextService } from './../../common/provider.service';
import * as i0 from "@angular/core";
/**
 * @hidden
 */
export declare class ToolbarComponent {
    private ctx;
    context: any;
    set position(value: 'top' | 'bottom');
    get toolbarTemplateRef(): TemplateRef<any>;
    constructor(ctx: ContextService);
    static ɵfac: i0.ɵɵFactoryDeclaration<ToolbarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ToolbarComponent, "kendo-grid-toolbar", never, { "position": "position"; }, {}, never, never>;
}

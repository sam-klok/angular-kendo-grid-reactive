/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef, NgZone, Renderer2 } from "@angular/core";
import { DragResizeService } from './../drag-resize.service';
import { Button } from '@progress/kendo-angular-buttons';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import * as i0 from "@angular/core";
export declare class WindowMaximizeActionDirective extends Button {
    /**
     * @hidden
     */
    window: any;
    buttonType: string;
    buttonClass: boolean;
    constructor(el: ElementRef, renderer: Renderer2, _service: DragResizeService, localization: LocalizationService, ngZone: NgZone);
    /**
     * @hidden
     */
    onClick(): void;
    get visible(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<WindowMaximizeActionDirective, [null, null, { optional: true; }, null, null]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WindowMaximizeActionDirective, "button[kendoWindowMaximizeAction]", ["kendoWindowMaximizeAction"], { "window": "window"; }, {}, never>;
}

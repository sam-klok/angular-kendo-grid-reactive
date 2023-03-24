/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { LoadingTemplateDirective } from '../loading-template.directive';
import * as i0 from "@angular/core";
/**
 * @hidden
 */
export declare class LoadingComponent {
    private localization;
    hostClass: boolean;
    loadingTemplate: LoadingTemplateDirective;
    get loadingText(): string;
    constructor(localization: LocalizationService);
    static ɵfac: i0.ɵɵFactoryDeclaration<LoadingComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LoadingComponent, "[kendoGridLoading]", never, { "loadingTemplate": "loadingTemplate"; }, {}, never, never>;
}

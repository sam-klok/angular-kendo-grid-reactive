/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { LocalizationService } from '@progress/kendo-angular-l10n';
import * as i0 from "@angular/core";
/**
 * @hidden
 */
export declare class ContrastComponent {
    private localization;
    value: string;
    ratio: string;
    constructor(localization: LocalizationService);
    get formatedRatio(): string;
    get contrastRatioText(): string;
    get satisfiesAACondition(): boolean;
    get satisfiesAAACondition(): boolean;
    get contrastRatio(): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<ContrastComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ContrastComponent, "[kendoContrastTool]", never, { "value": "value"; "ratio": "ratio"; }, {}, never, never>;
}

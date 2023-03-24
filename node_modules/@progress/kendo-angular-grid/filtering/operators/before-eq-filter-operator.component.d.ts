/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { FilterOperatorBase } from './filter-operator.base';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import * as i0 from "@angular/core";
export declare class BeforeEqFilterOperatorComponent extends FilterOperatorBase {
    constructor(localization: LocalizationService);
    /**
     * @hidden
     */
    toJSON(): {
        text: string;
        value: string;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<BeforeEqFilterOperatorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BeforeEqFilterOperatorComponent, "kendo-filter-before-eq-operator", never, {}, {}, never, never>;
}

/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NavigationService } from './../navigation/navigation.service';
import { ChangeDetectorRef } from '@angular/core';
import { PagerContextService, PagerContextChanges } from "./pager-context.service";
import { PagerElementComponent } from './pager-element.component';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import * as i0 from "@angular/core";
/**
 * Displays buttons for navigating to the next and to the last page ([see example]({% slug paging_grid %}#toc-pager-template)).
 */
export declare class PagerNextButtonsComponent extends PagerElementComponent {
    navigationService: NavigationService;
    /**
     * @hidden
     *
     * @readonly
     * @type {boolean}
     * @memberOf PagerNextButtonsComponent
     */
    get disabled(): boolean;
    constructor(localization: LocalizationService, pagerContext: PagerContextService, cd: ChangeDetectorRef, navigationService: NavigationService);
    protected onChanges({ total, skip, pageSize }: PagerContextChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PagerNextButtonsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PagerNextButtonsComponent, "kendo-pager-next-buttons", never, {}, {}, never, never>;
}

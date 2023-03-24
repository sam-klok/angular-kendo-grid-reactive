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
 * Displays buttons for navigating to the first and to the previous page ([see example]({% slug paging_grid %}#toc-pager-templates)).
 */
export declare class PagerPrevButtonsComponent extends PagerElementComponent {
    navigationService: NavigationService;
    constructor(localization: LocalizationService, pagerContext: PagerContextService, cd: ChangeDetectorRef, navigationService: NavigationService);
    /**
     * @hidden
     *
     * @readonly
     * @type {boolean}
     * @memberOf PagerPrevButtonsComponent
     */
    get disabled(): boolean;
    protected onChanges({ total, skip, pageSize }: PagerContextChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PagerPrevButtonsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PagerPrevButtonsComponent, "kendo-pager-prev-buttons", never, {}, {}, never, never>;
}

/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { FilterService } from '../filter.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { BooleanFilterComponent } from '../boolean-filter.component';
import { MenuTabbingService } from './menu-tabbing.service';
import * as i0 from "@angular/core";
/**
 * Represents a Boolean-filter menu component.
 *
 * @example
 *  ```html-no-run
 *      <kendo-grid-column field="Discontinued" title="Discontinued">
 *          <ng-template kendoGridFilterMenuTemplate let-filter let-column="column" let-filterService="filterService">
 *            <kendo-grid-boolean-filter-menu
 *                [column]="column"
 *                [filter]="filter"
 *                [filterService]="filterService"
 *                >
 *            </kendo-grid-boolean-filter-menu>
 *          </ng-template>
 *      </kendo-grid-column>
 *   ```
 */
export declare class BooleanFilterMenuComponent extends BooleanFilterComponent {
    /**
     * @hidden
     */
    get hostClasses(): boolean;
    /**
     * The current menu filter.
     * @type {CompositeFilterDescriptor}
     */
    filter: CompositeFilterDescriptor;
    /**
     * The `FilterService` instance which is responsible for handling the changes in the filter descriptor.
     */
    filterService: FilterService;
    /**
     * @hidden
     */
    menuTabbingService: MenuTabbingService;
    idPrefix: string;
    /**
     * @hidden
     */
    private radioButtons;
    constructor(localization: LocalizationService);
    ngAfterViewInit(): void;
    /**
     * @hidden
     */
    radioId(value: any): string;
    /**
     * @hidden
     */
    onChange(value: any, input: HTMLInputElement): void;
    /**
     * @hidden
     */
    isSelected(radioValue: any): boolean;
    /**
     * @hidden
     */
    onShiftTab(e: Event): void;
    /**
     * @hidden
     */
    get columnLabel(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<BooleanFilterMenuComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BooleanFilterMenuComponent, "kendo-grid-boolean-filter-menu", never, { "filter": "filter"; "filterService": "filterService"; "menuTabbingService": "menuTabbingService"; }, {}, never, never>;
}

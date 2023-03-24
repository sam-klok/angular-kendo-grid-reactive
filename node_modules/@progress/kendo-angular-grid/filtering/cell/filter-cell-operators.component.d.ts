/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { DropDownListComponent } from '@progress/kendo-angular-dropdowns';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import * as i0 from "@angular/core";
/**
 * Represents a component which accommodates the filter operators.
 */
export declare class FilterCellOperatorsComponent implements OnInit, OnDestroy {
    protected localization: LocalizationService;
    clearText: string;
    /**
     * @hidden
     */
    get hostClasses(): boolean;
    /**
     * @hidden
     */
    dropdown: DropDownListComponent;
    /**
     * The filter operators that will be displayed.
     */
    operators: Array<{
        text: string;
        value: string;
    }>;
    /**
     * Determines if the **Clear** button will be displayed.
     * @type {boolean}
     */
    showButton: boolean;
    /**
     * Determines if the list of operators will be displayed.
     * @type {boolean}
     */
    showOperators: boolean;
    /**
     * The selected operator.
     * @type {string}
     */
    value: string;
    /**
     * Fires when the operator is selected.
     * @type {EventEmitter<string>}
     */
    valueChange: EventEmitter<string>;
    /**
     * Fires when the **Clear** button is clicked.
     * @type {EventEmitter<{}>}
     */
    clear: EventEmitter<{}>;
    private subscription;
    constructor(localization: LocalizationService);
    /**
     * @hidden
     */
    onChange(dataItem: any): void;
    /**
     * @hidden
     */
    clearClick(): boolean;
    /**
     * @hidden
     */
    clearKeydown(args: KeyboardEvent): void;
    /**
     * @hidden
     */
    dropdownKeydown(args: KeyboardEvent): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FilterCellOperatorsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FilterCellOperatorsComponent, "kendo-grid-filter-cell-operators", never, { "operators": "operators"; "showButton": "showButton"; "showOperators": "showOperators"; "value": "value"; }, { "valueChange": "valueChange"; "clear": "clear"; }, never, never>;
}

/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter, QueryList, ElementRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { ColorPickerView } from './models';
import * as i0 from "@angular/core";
/**
 * @hidden
 */
export declare class FlatColorPickerHeaderComponent {
    private localizationService;
    hostClasses: boolean;
    clearButton: boolean;
    activeView: ColorPickerView;
    views: Array<ColorPickerView>;
    preview: boolean;
    innerTabIndex: number;
    value: string;
    selection: string;
    viewChange: EventEmitter<ColorPickerView>;
    valuePaneClick: EventEmitter<any>;
    clearButtonClick: EventEmitter<any>;
    tabOut: EventEmitter<any>;
    viewButtonsCollection: QueryList<ElementRef>;
    clearButtonElement: ElementRef;
    constructor(localizationService: LocalizationService);
    onViewButtonClick(view: ColorPickerView): void;
    get viewButtons(): boolean;
    getViewButtonIcon(view: string): string;
    getText(text: string): string;
    onHeaderTabOut(ev: any, index: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FlatColorPickerHeaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FlatColorPickerHeaderComponent, "[kendoFlatColorPickerHeader]", never, { "clearButton": "clearButton"; "activeView": "activeView"; "views": "views"; "preview": "preview"; "innerTabIndex": "innerTabIndex"; "value": "value"; "selection": "selection"; }, { "viewChange": "viewChange"; "valuePaneClick": "valuePaneClick"; "clearButtonClick": "clearButtonClick"; "tabOut": "tabOut"; }, never, never>;
}

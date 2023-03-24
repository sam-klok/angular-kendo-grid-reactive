/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { MultiSelectCheckableSettings } from '../models/checkboxes-settings';
import { SelectionService } from './selection.service';
import * as i0 from "@angular/core";
/**
 * @hidden
 */
export declare class SelectableDirective {
    index: number;
    checkboxes: MultiSelectCheckableSettings;
    height: number;
    multipleSelection: boolean;
    private selectionService;
    constructor(selectionService: SelectionService);
    get focusedClassName(): boolean;
    get selectedClassName(): boolean;
    onClick(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SelectableDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SelectableDirective, "[kendoDropDownsSelectable]", never, { "index": "index"; "checkboxes": "checkboxes"; "height": "height"; "multipleSelection": "multipleSelection"; }, {}, never>;
}

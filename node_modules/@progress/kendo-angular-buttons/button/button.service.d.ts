/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Observable, Subject } from 'rxjs';
import { ButtonDirective } from "./button.directive";
import * as i0 from "@angular/core";
/**
 * @hidden
 */
export declare class KendoButtonService {
    buttonClicked: Subject<ButtonDirective>;
    buttonClicked$: Observable<ButtonDirective>;
    click(button: ButtonDirective): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<KendoButtonService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<KendoButtonService>;
}

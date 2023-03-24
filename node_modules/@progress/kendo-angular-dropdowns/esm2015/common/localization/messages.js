/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, Input } from '@angular/core';
import { ComponentMessages } from '@progress/kendo-angular-l10n';
import * as i0 from "@angular/core";
/**
 * @hidden
 */
export class Messages extends ComponentMessages {
}
Messages.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: Messages, deps: null, target: i0.ɵɵFactoryTarget.Directive });
Messages.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.16", type: Messages, inputs: { noDataText: "noDataText", clearTitle: "clearTitle", checkAllText: "checkAllText", selectButtonText: "selectButtonText" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: Messages, decorators: [{
            type: Directive
        }], propDecorators: { noDataText: [{
                type: Input
            }], clearTitle: [{
                type: Input
            }], checkAllText: [{
                type: Input
            }], selectButtonText: [{
                type: Input
            }] } });

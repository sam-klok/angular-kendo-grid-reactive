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
Messages.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.16", type: Messages, selector: "kendo-datetimepicker-messages-base", inputs: { toggle: "toggle", dateTab: "dateTab", dateTabLabel: "dateTabLabel", timeTab: "timeTab", timeTabLabel: "timeTabLabel", accept: "accept", acceptLabel: "acceptLabel", cancel: "cancel", cancelLabel: "cancelLabel", today: "today", now: "now", nowLabel: "nowLabel", prevButtonTitle: "prevButtonTitle", nextButtonTitle: "nextButtonTitle" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: Messages, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line
                    selector: 'kendo-datetimepicker-messages-base'
                }]
        }], propDecorators: { toggle: [{
                type: Input
            }], dateTab: [{
                type: Input
            }], dateTabLabel: [{
                type: Input
            }], timeTab: [{
                type: Input
            }], timeTabLabel: [{
                type: Input
            }], accept: [{
                type: Input
            }], acceptLabel: [{
                type: Input
            }], cancel: [{
                type: Input
            }], cancelLabel: [{
                type: Input
            }], today: [{
                type: Input
            }], now: [{
                type: Input
            }], nowLabel: [{
                type: Input
            }], prevButtonTitle: [{
                type: Input
            }], nextButtonTitle: [{
                type: Input
            }] } });

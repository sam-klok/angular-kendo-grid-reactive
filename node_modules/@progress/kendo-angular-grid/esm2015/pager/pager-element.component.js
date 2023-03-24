/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@progress/kendo-angular-l10n";
import * as i2 from "./pager-context.service";
/**
 * @hidden
 */
export class PagerElementComponent {
    constructor(localization, pagerContext, cd) {
        this.localization = localization;
        this.pagerContext = pagerContext;
        this.cd = cd;
        this.total = this.pagerContext.total;
        this.skip = this.pagerContext.skip;
        this.pageSize = this.pagerContext.pageSize;
    }
    /**
     * @hidden
     *
     * @readonly
     * @type {number}
     * @memberOf PagerElementComponent
     */
    get currentPage() {
        return Math.floor((this.skip || 0) / this.pageSize) + 1;
    }
    /**
     * @hidden
     *
     * @readonly
     * @type {number}
     * @memberOf PagerElementComponent
     */
    get totalPages() {
        return Math.ceil((this.total || 0) / this.pageSize);
    }
    /**
     * @hidden
     *
     * @param {string} key
     * @returns {string}
     *
     * @memberOf PagerElementComponent
     */
    textFor(key) {
        return this.localization.get(key);
    }
    /**
     * @hidden
     *
     * @param {number} page
     *
     * @memberOf PagerElementComponent
     */
    changePage(page) {
        this.pagerContext.changePage(page);
        return false;
    }
    /**
     * @hidden
     *
     * @memberOf PagerElementComponent
     */
    ngOnInit() {
        this.subscriptions = this.pagerContext.changes.subscribe(this.onChanges.bind(this));
        this.subscriptions.add(this.localization.changes.subscribe(() => this.cd.markForCheck()));
    }
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    }
}
PagerElementComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: PagerElementComponent, deps: [{ token: i1.LocalizationService }, { token: i2.PagerContextService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
PagerElementComponent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.16", type: PagerElementComponent, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: PagerElementComponent, decorators: [{
            type: Directive,
            args: [{}]
        }], ctorParameters: function () { return [{ type: i1.LocalizationService }, { type: i2.PagerContextService }, { type: i0.ChangeDetectorRef }]; } });

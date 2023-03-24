/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, Input } from "@angular/core";
import { FilterHostDirective } from "../filter-host.directive";
import { isNullOrEmptyString, isPresent } from "../../utils";
import { filterMenuComponentFactory } from "./filter-menu-component.factory";
import { StringFilterMenuComponent } from "./string-filter-menu.component";
import * as i0 from "@angular/core";
/**
 * @hidden
 */
export class FilterMenuHostDirective extends FilterHostDirective {
    constructor(host, resolver) {
        super(host, resolver);
    }
    componentType() {
        if (isPresent(this.column) && !isNullOrEmptyString(this.column.filter)) {
            return filterMenuComponentFactory(this.column.filter);
        }
        return StringFilterMenuComponent;
    }
    initComponent(ctx) {
        super.initComponent(ctx);
        this.component.instance.filterService = this.filterService;
        this.component.instance.menuTabbingService = this.menuTabbingService;
    }
}
FilterMenuHostDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: FilterMenuHostDirective, deps: [{ token: i0.ViewContainerRef }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.Directive });
FilterMenuHostDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.16", type: FilterMenuHostDirective, selector: "[kendoFilterMenuHost]", inputs: { filterService: "filterService", menuTabbingService: "menuTabbingService" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: FilterMenuHostDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[kendoFilterMenuHost]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }, { type: i0.ComponentFactoryResolver }]; }, propDecorators: { filterService: [{
                type: Input
            }], menuTabbingService: [{
                type: Input
            }] } });

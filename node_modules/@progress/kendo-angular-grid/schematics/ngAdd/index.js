/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
function default_1(options) {
    const finalOptions = Object.assign(Object.assign({}, options), { mainNgModule: 'GridModule', package: 'grid', peerDependencies: {
            // peer dep of the dropdowns
            '@progress/kendo-angular-treeview': '^7.0.0',
            // peer dependency of kendo-angular-inputs
            '@progress/kendo-angular-dialog': '^7.0.0'
        } });
    return schematics_1.externalSchematic('@progress/kendo-schematics', 'ng-add', finalOptions);
}
exports.default = default_1;

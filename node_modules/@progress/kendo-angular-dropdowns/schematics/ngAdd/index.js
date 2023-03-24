/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
function default_1(options) {
    const finalOptions = Object.assign(Object.assign({}, options), { mainNgModule: 'DropDownsModule', package: 'dropdowns', peerDependencies: {
            // peers of the treeview
            "@progress/kendo-angular-inputs": "^9.0.0",
            // peers of inputs
            "@progress/kendo-angular-intl": "^4.0.0",
            "@progress/kendo-drawing": "^1.9.3"
        } });
    return schematics_1.externalSchematic('@progress/kendo-schematics', 'ng-add', finalOptions);
}
exports.default = default_1;

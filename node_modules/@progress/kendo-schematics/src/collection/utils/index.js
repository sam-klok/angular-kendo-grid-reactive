"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseComplexOptions = exports.fileContent = exports.asObservable = exports.stringify = exports.buildSelector = exports.folderName = exports.getAppModulePath = exports.findModule = exports.addImportToModule = exports.addExportToModule = exports.addDeclarationToModule = exports.addSymbolToMetadata = void 0;
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const rxjs_1 = require("rxjs");
var ast_utils_1 = require("./ast-utils");
Object.defineProperty(exports, "addSymbolToMetadata", { enumerable: true, get: function () { return ast_utils_1.addSymbolToMetadata; } });
Object.defineProperty(exports, "addDeclarationToModule", { enumerable: true, get: function () { return ast_utils_1.addDeclarationToModule; } });
Object.defineProperty(exports, "addExportToModule", { enumerable: true, get: function () { return ast_utils_1.addExportToModule; } });
Object.defineProperty(exports, "addImportToModule", { enumerable: true, get: function () { return ast_utils_1.addImportToModule; } });
var find_module_1 = require("./find-module");
Object.defineProperty(exports, "findModule", { enumerable: true, get: function () { return find_module_1.findModule; } });
__exportStar(require("./workspace"), exports);
var bootstrap_module_1 = require("./bootstrap-module");
Object.defineProperty(exports, "getAppModulePath", { enumerable: true, get: function () { return bootstrap_module_1.getAppModulePath; } });
const folderName = (options) => (name) => options.flat ? '' : core_1.strings.dasherize(name);
exports.folderName = folderName;
const prefix = (pre, name) => (pre ? `${pre}-` : '') + name;
const buildSelector = (options) => {
    const name = options.selector || core_1.strings.dasherize(options.name);
    return prefix(options.prefix, name);
};
exports.buildSelector = buildSelector;
function stringify(json) {
    return `${JSON.stringify(json, null, 2)}\n`;
}
exports.stringify = stringify;
function isObservable(thunk) {
    if (!thunk || typeof thunk !== 'object') {
        return false;
    }
    if (Symbol.observable && Symbol.observable in thunk) {
        return true;
    }
    return typeof thunk.subscribe === 'function';
}
function asObservable(thunk) {
    if (isObservable(thunk)) {
        return thunk;
    }
    return rxjs_1.of(thunk);
}
exports.asObservable = asObservable;
function fileContent(tree, path) {
    const content = tree.read(path);
    if (content === null) {
        throw new schematics_1.SchematicsException(`File ${path} does not exist.`);
    }
    return content.toString('utf-8');
}
exports.fileContent = fileContent;
const parseComplexOptions = (props, options) => props.reduce((acc, option) => {
    if (options[option]) {
        try {
            let rawValue = options[option];
            let parsed = JSON.parse(rawValue);
            acc[option] = parsed;
            // console.log(`Parsing ${option}, raw: '${rawValue}', json: '${JSON.stringify(parsed, null, "  ")}'`);
        }
        catch (e) {
            e.message = `Failed parsing '${option}' input. ${e.message}.`;
            throw e;
        }
    }
    return acc;
}, {});
exports.parseComplexOptions = parseComplexOptions;

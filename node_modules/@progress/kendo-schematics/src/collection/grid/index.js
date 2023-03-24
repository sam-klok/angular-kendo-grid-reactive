"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.grid = void 0;
const core_1 = require("@angular-devkit/core");
const strings_1 = require("@angular-devkit/core/src/utils/strings");
const schematics_1 = require("@angular-devkit/schematics");
const path_1 = require("path");
const schema_1 = require("./schema");
const data_1 = require("./files/data");
const utils_1 = require("../utils");
const classify = core_1.strings.classify;
const arrayify = (args) => args.map(s => `'${s}'`).join(", ");
function grid(_options) {
    return (_tree, _context) => {
        var _a;
        _options.name = path_1.basename(_options.name);
        let defaults = {
            style: "css"
        };
        let path = path_1.normalize('/' + path_1.dirname((_options.path + '/' + _options.name)));
        if (process.platform == "win32") {
            path = path.replace(/\\/g, '/');
        }
        const parsedComplexOptions = utils_1.parseComplexOptions(['columns'], _options);
        const overrides = {};
        if (_options.dataSource == schema_1.DataSource.Example) {
            // If the data source is "Example", use a predefined template for data and columns
            overrides.columns = [
                { field: "ProductID", title: "ID" },
                { field: "ProductName", title: "Product Name" },
                { field: "UnitPrice", title: "Unit Price" }
            ];
        }
        const templateOptions = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, defaults), _options), parsedComplexOptions), overrides), { classify,
            dasherize: strings_1.dasherize,
            arrayify });
        const templateSource = schematics_1.apply(schematics_1.url(_options.inlineTemplate ? './files/inline' : './files/html'), [
            schematics_1.template(templateOptions),
            schematics_1.move(_options.path)
        ]);
        const angularComponentOptions = {
            path: _options.path,
            name: _options.name,
            inlineTemplate: _options.inlineTemplate,
            inlineStyle: _options.inlineStyle,
            skipTests: _options.skipTests,
            style: templateOptions.style
        };
        if (_options.dataSource == schema_1.DataSource.Example) {
            // Import the example datasource
            _tree.create(`${_options.path}/${strings_1.dasherize(_options.name)}/data.ts`, data_1.productsSourceCode);
        }
        else if (_options.dataSource == schema_1.DataSource['Mock Data']) {
            // Generate mocked data out of the column defitions
            let dataSourceCode = `export const data = [{\n`;
            for (let i = 0; i <= 15; i++) {
                for (const column of parsedComplexOptions.columns) {
                    dataSourceCode += `        "${column.field}": "${(_a = column.title) !== null && _a !== void 0 ? _a : column.field} ${i}",\n`;
                }
                if (i < 15) {
                    dataSourceCode += `    }, {\n`;
                }
            }
            dataSourceCode += `    }];\n`;
            dataSourceCode += `export default data;`;
            _tree.create(`${_options.path}/${strings_1.dasherize(_options.name)}/data.ts`, dataSourceCode);
        }
        return schematics_1.chain([
            schematics_1.externalSchematic('@schematics/angular', 'component', angularComponentOptions),
            schematics_1.mergeWith(templateSource, schematics_1.MergeStrategy.Overwrite)
        ]);
    };
}
exports.grid = grid;

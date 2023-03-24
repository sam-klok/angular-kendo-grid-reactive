"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chart = void 0;
const core_1 = require("@angular-devkit/core");
const strings_1 = require("@angular-devkit/core/src/utils/strings");
const schematics_1 = require("@angular-devkit/schematics");
const path_1 = require("path");
const utils_1 = require("../../utils");
const schema_1 = require("./schema");
const data_1 = require("./files/data");
const classify = core_1.strings.classify;
const arrayify = (args) => args.map(s => `'${s}'`).join(", ");
function chart(_options) {
    return (_tree, _context) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        _options.name = path_1.basename(_options.name);
        let defaults = {
            style: "css"
        };
        let path = path_1.normalize('/' + path_1.dirname((_options.path + '/' + _options.name)));
        if (process.platform == "win32") {
            path = path.replace(/\\/g, '/');
        }
        const parsedComplexOptions = utils_1.parseComplexOptions(['series', 'categoryAxis', 'valueAxis'], _options);
        // Autofill properties... These will require a lot of "if"-s in the templates otherwise.
        if (((_a = parsedComplexOptions === null || parsedComplexOptions === void 0 ? void 0 : parsedComplexOptions.series) === null || _a === void 0 ? void 0 : _a.length) > 0 && ((_b = parsedComplexOptions === null || parsedComplexOptions === void 0 ? void 0 : parsedComplexOptions.categoryAxis) === null || _b === void 0 ? void 0 : _b.length) > 0) {
            let defaultCategoryField = (_e = (_d = (_c = parsedComplexOptions === null || parsedComplexOptions === void 0 ? void 0 : parsedComplexOptions.categoryAxis) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.name) !== null && _e !== void 0 ? _e : "category";
            console.log("Has series and categories. Default category field: " + defaultCategoryField);
            for (let s of (_f = parsedComplexOptions.series) !== null && _f !== void 0 ? _f : []) {
                console.log("Series " + JSON.stringify(s) + " categoryField: " + s.categoryField);
                if (!s.categoryField) {
                    console.log("Category field using default: " + defaultCategoryField);
                    s.categoryField = defaultCategoryField;
                }
            }
        }
        const overrides = {};
        if (_options.dataSource == schema_1.DataSource.Example) {
            overrides.series = [
                { field: "lemons", categoryField: "season", name: "Lemons", type: schema_1.SeriesType.line },
                { field: "apples", categoryField: "season", name: "Apples", type: schema_1.SeriesType.line },
                { field: "mangos", categoryField: "season", name: "Mangos", type: schema_1.SeriesType.line }
            ];
            overrides.categoryAxis = [
                { type: schema_1.CategoryAxisType.category, name: "season", title: "Season" }
            ];
            overrides.valueAxis = [
                { type: schema_1.ValueAxisType.numeric, name: "Quantity", title: "Quantity" }
            ];
        }
        const templateOptions = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, defaults), _options), parsedComplexOptions), overrides), { classify,
            dasherize: strings_1.dasherize,
            arrayify });
        const templateSource = schematics_1.apply(schematics_1.url(_options.inlineTemplate ? './files/inline' : './files/html'), [
            schematics_1.template(templateOptions),
            schematics_1.move(_options.path),
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
            _tree.create(`${_options.path}/${strings_1.dasherize(_options.name)}/data.ts`, data_1.seriesSourceCode);
        }
        else if (_options.dataSource == schema_1.DataSource['Mock Data']) {
            let seriesSourceCode = `export const seriesData = [{`;
            let series = (_g = templateOptions.series) !== null && _g !== void 0 ? _g : [];
            let categoryAxis = (_h = templateOptions.categoryAxis) !== null && _h !== void 0 ? _h : [];
            let valueAxis = (_j = templateOptions.valueAxis) !== null && _j !== void 0 ? _j : [];
            var primaryAxisType = (_l = (_k = categoryAxis[0]) === null || _k === void 0 ? void 0 : _k.type) !== null && _l !== void 0 ? _l : schema_1.CategoryAxisType.category;
            if (primaryAxisType == schema_1.CategoryAxisType.date) {
                // Generate some fin tech sales data per month.
                let now = new Date();
                let year = now.getUTCFullYear();
                for (let month = 1; month <= 12; month++) {
                    seriesSourceCode += `\n        "${(_m = categoryAxis[0].name) !== null && _m !== void 0 ? _m : "date"}": new Date("${year}-${month}"),`;
                    for (let s of series) {
                        seriesSourceCode += `\n        "${s.field}": ${Math.random() * 100},`;
                    }
                    if (month < 12) {
                        seriesSourceCode += `\n    }, {`;
                    }
                }
                // What about a secondary value axis? No idea how these work or map on the same chart.
            }
            else if (primaryAxisType == schema_1.CategoryAxisType.category) {
                // Generate some bar chart worthy categories.
                for (let c = 1; c <= 4; c++) {
                    seriesSourceCode += `\n        "${(_o = categoryAxis[0].name) !== null && _o !== void 0 ? _o : "category"}": "${((_p = categoryAxis[0].title) !== null && _p !== void 0 ? _p : categoryAxis[0].name) + " " + c}",`;
                    for (let s of series) {
                        seriesSourceCode += `\n        "${s.field}": ${Math.random() * 100},`;
                    }
                    if (c < 4) {
                        seriesSourceCode += `\n    }, {`;
                    }
                }
                // What about a secondary value axis? No idea how these work or map on the same chart.
            }
            seriesSourceCode += `\n    }];`;
            seriesSourceCode += `\nexport default seriesData;`;
            _tree.create(`${_options.path}/${strings_1.dasherize(_options.name)}/data.ts`, seriesSourceCode);
        }
        return schematics_1.chain([
            schematics_1.externalSchematic('@schematics/angular', 'component', angularComponentOptions),
            schematics_1.mergeWith(templateSource, schematics_1.MergeStrategy.Overwrite)
        ]);
    };
}
exports.chart = chart;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduler = void 0;
const core_1 = require("@angular-devkit/core");
const strings_1 = require("@angular-devkit/core/src/utils/strings");
const schematics_1 = require("@angular-devkit/schematics");
const path_1 = require("path");
const events_utc_1 = require("./files/events-utc");
function scheduler(_options) {
    return (_tree, _context) => {
        _options.name = path_1.basename(_options.name);
        let path = path_1.normalize('/' + path_1.dirname((_options.path + '/' + _options.name)));
        if (process.platform == "win32") {
            path = path.replace(/\\/g, '/');
        }
        const templateSource = schematics_1.apply(schematics_1.url(_options.inlineTemplate ? './files/inline' : './files/html'), [
            schematics_1.template(Object.assign(Object.assign({}, _options), { classify: core_1.strings.classify, dasherize: core_1.strings.dasherize, arrayify(args) {
                    return args.map(s => `'${s}'`).join(", ");
                } })),
            schematics_1.move(_options.path),
        ]);
        const angularComponentOptions = {
            path: _options.path,
            name: _options.name,
            inlineTemplate: _options.inlineTemplate,
            inlineStyle: _options.inlineStyle,
            skipTests: _options.skipTests,
            style: "css"
        };
        _tree.create(`${_options.path}/${strings_1.dasherize(_options.name)}/events-utc.ts`, events_utc_1.eventsSourceCode);
        return schematics_1.chain([
            schematics_1.externalSchematic('@schematics/angular', 'component', angularComponentOptions),
            schematics_1.mergeWith(templateSource, schematics_1.MergeStrategy.Overwrite)
        ]);
    };
}
exports.scheduler = scheduler;

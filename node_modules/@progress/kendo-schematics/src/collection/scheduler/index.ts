import { strings } from '@angular-devkit/core';
import { dasherize } from '@angular-devkit/core/src/utils/strings';
import {
	apply,
	chain,
	externalSchematic,
	MergeStrategy,
	mergeWith,
	move,
	Rule,
	SchematicContext,
	template,
	Tree,
	url
} from '@angular-devkit/schematics';

import { basename, normalize, dirname, win32 } from 'path';
import { Schema } from './schema';
import { eventsSourceCode } from './files/events-utc';

export function scheduler(_options: Schema): Rule {
	return (_tree: Tree, _context: SchematicContext) => {
		_options.name = basename(_options.name);

		let path =  normalize('/' + dirname((_options.path + '/' + _options.name)));
		if (process.platform == "win32") {
			path = path.replace(/\\/g, '/');
		}

		const templateSource = apply(
			url(_options.inlineTemplate ? './files/inline' : './files/html'), [
				template({
					..._options,
					classify: strings.classify,
					dasherize: strings.dasherize,
					arrayify(args: string[]) {
						return args.map(s => `'${s}'`).join(", ");
					}
				}),
				move(_options.path),
			],
		);

        const angularComponentOptions = {
			path: _options.path,
			name: _options.name,
			inlineTemplate: _options.inlineTemplate,
			inlineStyle: _options.inlineStyle,
			skipTests: _options.skipTests,
			style: "css"
		};

		_tree.create(`${_options.path}/${dasherize(_options.name)}/events-utc.ts`, eventsSourceCode);

		return chain([
			externalSchematic('@schematics/angular', 'component', angularComponentOptions),
			mergeWith(templateSource, MergeStrategy.Overwrite)
		]);
	};
}

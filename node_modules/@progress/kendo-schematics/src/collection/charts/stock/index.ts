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

import { basename, normalize, dirname } from 'path';
import { parseComplexOptions } from '../../utils';
import { SchemaStock } from './schema';
import { seriesData } from './files/data';

export function chart(_options: SchemaStock): Rule {
	return (_tree: Tree, _context: SchematicContext) => {
		_options.name = basename(_options.name);

		let path =  normalize('/' + dirname((_options.path + '/' + _options.name)));
		if (process.platform == "win32") {
			path = path.replace(/\\/g, '/');
		}

        const parsedComplexOptions = parseComplexOptions(['series', 'categoryAxis', 'valueAxis', 'navigatorSeries'], _options);

		const templateSource = apply(
			url(_options.inlineTemplate ? './files/inline' : './files/html'), [
				template({
					classify: strings.classify,
					dasherize: strings.dasherize,
					arrayify(args: string[]) {
						return args.map(s => `'${s}'`).join(", ");
					},
                    ...Object.assign({}, _options, parsedComplexOptions)
				}),
				move(_options.path),
			],
		);

        const angularComponentOptions = {
			path: _options.path,
			name: _options.name,
			inlineTemplate: _options.inlineTemplate,
			inlineStyle: _options.inlineStyle,
			skipTests: _options.skipTests
		};

		if(_options.mockedData) {
			_tree.create(`${_options.path}/${dasherize(_options.name)}/data.ts`, `export const seriesData = ${seriesData}`);
		}

		return chain([
			externalSchematic('@schematics/angular', 'component', angularComponentOptions),
			mergeWith(templateSource, MergeStrategy.Overwrite)
		]);
	};
}

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
import { DataSource, Schema } from './schema';
import { productsSourceCode } from './files/data';
import { parseComplexOptions } from '../utils';

const classify = strings.classify;

const arrayify = (args: string[]) =>
	args.map(s => `'${s}'`).join(", ");

export function grid(_options: Schema): Rule {
	return (_tree: Tree, _context: SchematicContext) => {
		_options.name = basename(_options.name);

		let defaults = {
			style: "css"
		};

		let path =  normalize('/' + dirname((_options.path + '/' + _options.name)));
		if (process.platform == "win32") {
			path = path.replace(/\\/g, '/');
		}

        const parsedComplexOptions = parseComplexOptions(['columns'], _options);

		const overrides: any = {};

		if (_options.dataSource == DataSource.Example) {
			// If the data source is "Example", use a predefined template for data and columns
			overrides.columns = [
				{ field: "ProductID", title: "ID" },
				{ field: "ProductName", title: "Product Name" },
				{ field: "UnitPrice", title: "Unit Price"}
			]
		}

		const templateOptions = {
			...defaults,
			..._options,
			...parsedComplexOptions,
			...overrides,
			classify,
			dasherize,
			arrayify
		};

		const templateSource = apply(
			url(_options.inlineTemplate ? './files/inline' : './files/html'), [
				template(templateOptions),
				move(_options.path)
			],
		);

        const angularComponentOptions = {
			path: _options.path,
			name: _options.name,
			inlineTemplate: _options.inlineTemplate,
			inlineStyle: _options.inlineStyle,
			skipTests: _options.skipTests,
			style: templateOptions.style
		};

		if(_options.dataSource == DataSource.Example) {
			// Import the example datasource
			_tree.create(`${_options.path}/${dasherize(_options.name)}/data.ts`, productsSourceCode);
		}
		else if (_options.dataSource == DataSource['Mock Data'])
		{
			// Generate mocked data out of the column defitions
			let dataSourceCode = `export const data = [{\n`;
			for (let i = 0; i <= 15; i++) {
				for (const column of parsedComplexOptions.columns) {
					dataSourceCode += `        "${column.field}": "${column.title ?? column.field} ${i}",\n`;
				}
				if (i < 15) {
					dataSourceCode += `    }, {\n`;
				}
			}
			dataSourceCode += `    }];\n`;
			dataSourceCode += `export default data;`;
			_tree.create(`${_options.path}/${dasherize(_options.name)}/data.ts`, dataSourceCode);
		}

		return chain([
			externalSchematic('@schematics/angular', 'component', angularComponentOptions),
			mergeWith(templateSource, MergeStrategy.Overwrite)
		]);
	};
}

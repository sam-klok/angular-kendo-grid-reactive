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
import { CategoryAxis, CategoryAxisType, DataSource, Schema, Series, SeriesType, ValueAxis, ValueAxisType } from './schema';
import { seriesSourceCode } from './files/data';

const classify = strings.classify;

const arrayify = (args: string[]) =>
	args.map(s => `'${s}'`).join(", ");

export function chart(_options: Schema): Rule {
	return (_tree: Tree, _context: SchematicContext) => {
		_options.name = basename(_options.name);

		let defaults = {
			style: "css"
		};

		let path =  normalize('/' + dirname((_options.path + '/' + _options.name)));
		if (process.platform == "win32") {
			path = path.replace(/\\/g, '/');
		}

        const parsedComplexOptions = parseComplexOptions(['series', 'categoryAxis', 'valueAxis'], _options);

		// Autofill properties... These will require a lot of "if"-s in the templates otherwise.
		if (parsedComplexOptions?.series?.length > 0 && parsedComplexOptions?.categoryAxis?.length > 0) {
			let defaultCategoryField = (parsedComplexOptions?.categoryAxis?.[0] as CategoryAxis)?.name ?? "category";
			console.log("Has series and categories. Default category field: " + defaultCategoryField);
			for (let s of parsedComplexOptions.series ?? []) {
				console.log("Series " + JSON.stringify(s) + " categoryField: " + s.categoryField);
				if (!s.categoryField) {
					console.log("Category field using default: " + defaultCategoryField)
					s.categoryField = defaultCategoryField;
				}
			}
		}

		const overrides: any = {};

		if (_options.dataSource == DataSource.Example) {
			overrides.series = <Series[]>[
				{ field: "lemons", categoryField: "season", name: "Lemons", type: SeriesType.line },
				{ field: "apples", categoryField: "season", name: "Apples", type: SeriesType.line },
				{ field: "mangos", categoryField: "season", name: "Mangos", type: SeriesType.line }
			];
			overrides.categoryAxis = <CategoryAxis[]>[
				{ type: CategoryAxisType.category, name: "season", title: "Season" }
			];
			overrides.valueAxis = <ValueAxis[]>[
				{ type: ValueAxisType.numeric, name: "Quantity", title: "Quantity" }	
			];
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
				move(_options.path),
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
			_tree.create(`${_options.path}/${dasherize(_options.name)}/data.ts`, seriesSourceCode);
		}
		else if (_options.dataSource == DataSource['Mock Data'])
		{
			let seriesSourceCode = `export const seriesData = [{`;

			let series: Series[] = templateOptions.series ?? [];
			let categoryAxis: CategoryAxis[] = templateOptions.categoryAxis ?? [];
			let valueAxis: ValueAxis[] = templateOptions.valueAxis ?? [];

			var primaryAxisType = categoryAxis[0]?.type ?? CategoryAxisType.category;

			if (primaryAxisType == CategoryAxisType.date) {
				// Generate some fin tech sales data per month.

				let now = new Date();
				let year = now.getUTCFullYear();

				for (let month = 1; month <= 12; month++) {
					seriesSourceCode += `\n        "${categoryAxis[0].name ?? "date"}": new Date("${year}-${month}"),`;

					for (let s of series) {
						seriesSourceCode += `\n        "${s.field}": ${Math.random() * 100},`;
					}

					if (month < 12) {
						seriesSourceCode += `\n    }, {`;
					}
				}

				// What about a secondary value axis? No idea how these work or map on the same chart.

			} else if (primaryAxisType == CategoryAxisType.category) {
				// Generate some bar chart worthy categories.

				for (let c = 1; c <= 4; c++) {
					seriesSourceCode += `\n        "${categoryAxis[0].name ?? "category"}": "${(categoryAxis[0].title ?? categoryAxis[0].name) + " " + c}",`;

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
			_tree.create(`${_options.path}/${dasherize(_options.name)}/data.ts`, seriesSourceCode);
		}

		return chain([
			externalSchematic('@schematics/angular', 'component', angularComponentOptions),
			mergeWith(templateSource, MergeStrategy.Overwrite)
		]);
	};
}

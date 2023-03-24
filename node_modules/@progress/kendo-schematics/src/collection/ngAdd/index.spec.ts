import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';

import { Schema as RegisterOptions } from './schema';

import { createAppModule, createMainBootstrap, createCliConfig, createPackageJson } from '../utils/test';
import { getWorkspace, getProjectFromWorkspace, stringify } from '../utils';
import { themeVersion } from './theming';

const collectionPath = path.join(__dirname, '../../collection.json');

const fileContent = (tree: Tree, path: string) =>
    tree.get(path).content.toString();

const createAppTree = (options: any) => {
    let appTree = createCliConfig(Tree.empty(), options);
    appTree = createAppModule(appTree);
    appTree = createMainBootstrap(appTree);
    appTree = createPackageJson(appTree);

    return appTree;
}

describe('ng add', () => {
    const runner = new SchematicTestRunner('@progress/kendo-schematics', collectionPath);

    const defaultOptions: RegisterOptions = {
        package: 'grid',
        mainNgModule: 'GridModule',
        peerDependencies: {},
        project: 'demo',
        export: false,
        skipInstall: true // `true` just for the tests
    };

    let appTree: Tree;

    beforeEach(() => {
        appTree = createAppTree({ useTargets: false });
    });

    it('imports package modules in app NgModule', async() => {
        const options = {
            ...defaultOptions
        };

        await runner.runSchematicAsync('ng-add', options, appTree).forEach(tree => {
            const content = fileContent(tree, '/src/app/app.module.ts');

            expect(content).toMatch(/imports: \[GridModule, BrowserAnimationsModule]/);
            expect(content).toMatch("import { GridModule } from '@progress/kendo-angular-grid';");
            expect(content).toMatch("import { BrowserAnimationsModule } from '@angular/platform-browser/animations';");
            expect(content).not.toMatch("import 'hammerjs';");
        });
    });

    it('imports hammerjs in app NgModule', async() => {
        const options = {
            ...defaultOptions,
            importHammerjs: true
        };

        await runner.runSchematicAsync('ng-add', options, appTree).forEach(tree => {
            const content = fileContent(tree, '/src/app/app.module.ts');

            expect(content).toMatch("import 'hammerjs';");
            expect(content).toMatch(/imports: \[GridModule, BrowserAnimationsModule]/);
        });
    });

    it('imports additional modules in app NgModule', async() => {
        const options = {
            ...defaultOptions,
            dependencies: [
                {
                    import: 'MyModule',
                    from: 'MyPackage'
                },
                {
                    import: 'MyModuleFromMyPackage',
                    from: 'MyPackage'
                },
                {
                    import: 'MyOtherModule',
                    from: 'MyOtherPackage'
                }
            ]
        };

        await runner.runSchematicAsync('ng-add', options, appTree).forEach(tree => {
            const content = fileContent(tree, '/src/app/app.module.ts');

            expect(content).toMatch(/imports: \[GridModule, BrowserAnimationsModule, MyModule, MyModuleFromMyPackage, MyOtherModule]/);
            expect(content).toMatch("import { GridModule } from '@progress/kendo-angular-grid';");
            expect(content).toMatch("import { BrowserAnimationsModule } from '@angular/platform-browser/animations';");

            expect(content).toMatch("import { MyModule, MyModuleFromMyPackage } from 'MyPackage';");
            expect(content).toMatch("import { MyOtherModule } from 'MyOtherPackage';");
        });
    });

    it('exports package modules from app NgModule', async() => {
        const options = {
            ...defaultOptions,
            export: true
        };

        await runner.runSchematicAsync('ng-add', options, appTree).forEach(tree => {
            const content = fileContent(tree, '/src/app/app.module.ts');

            expect(content).toMatch(/exports: \[GridModule]/);
        });
    });

    it('imports the theme', async() => {
        const options = {
            ...defaultOptions,
            theme: 'material'
        };

        await runner.runSchematicAsync('ng-add', options, appTree).forEach(tree => {
            const workspace = getWorkspace(tree);
            const project = getProjectFromWorkspace(workspace, options.project);

            const styles = project.architect.build.options.styles;
            expect(styles[0].input).toMatch(/kendo-theme-material/);
        });
    });

    it('imports the theme once', async () => {
        const options = {
            ...defaultOptions,
            theme: 'default'
        };

        const packageJSON = stringify({
            dependencies: {
                '@progress/kendo-theme-material': themeVersion
            }
        });
        appTree.create('package.json', packageJSON);

        await runner.runSchematicAsync('ng-add', options, appTree).forEach(tree => {
            const workspace = getWorkspace(tree);
            const project = getProjectFromWorkspace(workspace, options.project);

            const styles = project.architect.build.options.styles;
            expect(styles).toEqual([ 'src/styles.css' ]);
        });
    });

    it('updates package.json', async() => {
        const options = {
            ...defaultOptions,
            theme: 'material'
        };

        const packageJSON = stringify({
            dependencies: {}
        });
        appTree.create('package.json', packageJSON);

        await runner.runSchematicAsync('ng-add', options, appTree).forEach(tree => {
            const json = JSON.parse(fileContent(tree, 'package.json')).dependencies;

            expect(json['@progress/kendo-theme-material']).toBe(themeVersion);
            expect(json['@progress/kendo-dependency']).toBe('^1.0.0');
            expect(json['hammerjs']).toBe(undefined);
        });
    });

    it('adds @angular/localize for Angular 12.x projects', async() => {
        const options = {
            ...defaultOptions,
            theme: 'material'
        };

        const packageJSON = stringify({
            dependencies: {
                '@angular/core': '^12.2.3'
            }
        });
        appTree.create('package.json', packageJSON);

        await runner.runSchematicAsync('ng-add', options, appTree).forEach(tree => {
            const json = JSON.parse(fileContent(tree, 'package.json')).dependencies;

            expect(json['@angular/localize']).toBe('^12.2.3');
        });
    });

    it('adds @angular/localize for Angular projects with tagged version', async() => {
        const options = {
            ...defaultOptions,
            theme: 'material'
        };

        const packageJSON = stringify({
            dependencies: {
                '@angular/core': 'next'
            }
        });
        appTree.create('package.json', packageJSON);

        await runner.runSchematicAsync('ng-add', options, appTree).forEach(tree => {
            const json = JSON.parse(fileContent(tree, 'package.json')).dependencies;

            expect(json['@angular/localize']).toBe('next');
        });
    });

    it('update package.json with hammerjs', async() => {
        const options = {
            ...defaultOptions,
            theme: 'material',
            importHammerjs: true
        };

        const packageJSON = stringify({
            dependencies: {}
        });
        appTree.create('package.json', packageJSON);

        await runner.runSchematicAsync('ng-add', options, appTree).forEach(tree => {
            const json = JSON.parse(fileContent(tree, 'package.json')).dependencies;

            expect(json['@progress/kendo-theme-material']).toBe(themeVersion);
            expect(json['@progress/kendo-dependency']).toBe('^1.0.0');
            expect(json['hammerjs']).toBe('^2.0.0');
        });
    });

    describe('in projects with "targets"', () => {
        beforeEach(() => {
            appTree = createAppTree({ useTargets: true });
        });

        it('imports the theme', async() => {
            const options = {
                ...defaultOptions,
                theme: 'material'
            };

            await runner.runSchematicAsync('ng-add', options, appTree).forEach(tree => {
                const workspace = getWorkspace(tree);
                const project = getProjectFromWorkspace(workspace, options.project);

                const styles = (<any> project).targets.build.options.styles;
                expect(styles[0].input).toMatch(/kendo-theme-material/);
            });
        });
    });

    describe('in projects without "test" target', () => {
        beforeEach(() => {
            appTree = createAppTree({ skipTests: true });
        });

        it('imports the theme', async() => {
            const options = {
                ...defaultOptions,
                theme: 'material'
            };

            await runner.runSchematicAsync('ng-add', options, appTree).forEach(tree => {
                const content = fileContent(tree, '/src/app/app.module.ts');

                expect(content).toMatch("import { GridModule } from '@progress/kendo-angular-grid';");
            });
        });
    });
});

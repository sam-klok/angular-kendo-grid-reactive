"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const testing_1 = require("@angular-devkit/schematics/testing");
const path = require("path");
const test_1 = require("../utils/test");
const utils_1 = require("../utils");
const theming_1 = require("./theming");
const collectionPath = path.join(__dirname, '../../collection.json');
const fileContent = (tree, path) => tree.get(path).content.toString();
const createAppTree = (options) => {
    let appTree = test_1.createCliConfig(schematics_1.Tree.empty(), options);
    appTree = test_1.createAppModule(appTree);
    appTree = test_1.createMainBootstrap(appTree);
    appTree = test_1.createPackageJson(appTree);
    return appTree;
};
describe('ng add', () => {
    const runner = new testing_1.SchematicTestRunner('@progress/kendo-schematics', collectionPath);
    const defaultOptions = {
        package: 'grid',
        mainNgModule: 'GridModule',
        peerDependencies: {},
        project: 'demo',
        export: false,
        skipInstall: true // `true` just for the tests
    };
    let appTree;
    beforeEach(() => {
        appTree = createAppTree({ useTargets: false });
    });
    it('imports package modules in app NgModule', () => __awaiter(void 0, void 0, void 0, function* () {
        const options = Object.assign({}, defaultOptions);
        yield runner.runSchematicAsync('ng-add', options, appTree).forEach(tree => {
            const content = fileContent(tree, '/src/app/app.module.ts');
            expect(content).toMatch(/imports: \[GridModule, BrowserAnimationsModule]/);
            expect(content).toMatch("import { GridModule } from '@progress/kendo-angular-grid';");
            expect(content).toMatch("import { BrowserAnimationsModule } from '@angular/platform-browser/animations';");
            expect(content).not.toMatch("import 'hammerjs';");
        });
    }));
    it('imports hammerjs in app NgModule', () => __awaiter(void 0, void 0, void 0, function* () {
        const options = Object.assign(Object.assign({}, defaultOptions), { importHammerjs: true });
        yield runner.runSchematicAsync('ng-add', options, appTree).forEach(tree => {
            const content = fileContent(tree, '/src/app/app.module.ts');
            expect(content).toMatch("import 'hammerjs';");
            expect(content).toMatch(/imports: \[GridModule, BrowserAnimationsModule]/);
        });
    }));
    it('imports additional modules in app NgModule', () => __awaiter(void 0, void 0, void 0, function* () {
        const options = Object.assign(Object.assign({}, defaultOptions), { dependencies: [
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
            ] });
        yield runner.runSchematicAsync('ng-add', options, appTree).forEach(tree => {
            const content = fileContent(tree, '/src/app/app.module.ts');
            expect(content).toMatch(/imports: \[GridModule, BrowserAnimationsModule, MyModule, MyModuleFromMyPackage, MyOtherModule]/);
            expect(content).toMatch("import { GridModule } from '@progress/kendo-angular-grid';");
            expect(content).toMatch("import { BrowserAnimationsModule } from '@angular/platform-browser/animations';");
            expect(content).toMatch("import { MyModule, MyModuleFromMyPackage } from 'MyPackage';");
            expect(content).toMatch("import { MyOtherModule } from 'MyOtherPackage';");
        });
    }));
    it('exports package modules from app NgModule', () => __awaiter(void 0, void 0, void 0, function* () {
        const options = Object.assign(Object.assign({}, defaultOptions), { export: true });
        yield runner.runSchematicAsync('ng-add', options, appTree).forEach(tree => {
            const content = fileContent(tree, '/src/app/app.module.ts');
            expect(content).toMatch(/exports: \[GridModule]/);
        });
    }));
    it('imports the theme', () => __awaiter(void 0, void 0, void 0, function* () {
        const options = Object.assign(Object.assign({}, defaultOptions), { theme: 'material' });
        yield runner.runSchematicAsync('ng-add', options, appTree).forEach(tree => {
            const workspace = utils_1.getWorkspace(tree);
            const project = utils_1.getProjectFromWorkspace(workspace, options.project);
            const styles = project.architect.build.options.styles;
            expect(styles[0].input).toMatch(/kendo-theme-material/);
        });
    }));
    it('imports the theme once', () => __awaiter(void 0, void 0, void 0, function* () {
        const options = Object.assign(Object.assign({}, defaultOptions), { theme: 'default' });
        const packageJSON = utils_1.stringify({
            dependencies: {
                '@progress/kendo-theme-material': theming_1.themeVersion
            }
        });
        appTree.create('package.json', packageJSON);
        yield runner.runSchematicAsync('ng-add', options, appTree).forEach(tree => {
            const workspace = utils_1.getWorkspace(tree);
            const project = utils_1.getProjectFromWorkspace(workspace, options.project);
            const styles = project.architect.build.options.styles;
            expect(styles).toEqual(['src/styles.css']);
        });
    }));
    it('updates package.json', () => __awaiter(void 0, void 0, void 0, function* () {
        const options = Object.assign(Object.assign({}, defaultOptions), { theme: 'material' });
        const packageJSON = utils_1.stringify({
            dependencies: {}
        });
        appTree.create('package.json', packageJSON);
        yield runner.runSchematicAsync('ng-add', options, appTree).forEach(tree => {
            const json = JSON.parse(fileContent(tree, 'package.json')).dependencies;
            expect(json['@progress/kendo-theme-material']).toBe(theming_1.themeVersion);
            expect(json['@progress/kendo-dependency']).toBe('^1.0.0');
            expect(json['hammerjs']).toBe(undefined);
        });
    }));
    it('adds @angular/localize for Angular 12.x projects', () => __awaiter(void 0, void 0, void 0, function* () {
        const options = Object.assign(Object.assign({}, defaultOptions), { theme: 'material' });
        const packageJSON = utils_1.stringify({
            dependencies: {
                '@angular/core': '^12.2.3'
            }
        });
        appTree.create('package.json', packageJSON);
        yield runner.runSchematicAsync('ng-add', options, appTree).forEach(tree => {
            const json = JSON.parse(fileContent(tree, 'package.json')).dependencies;
            expect(json['@angular/localize']).toBe('^12.2.3');
        });
    }));
    it('adds @angular/localize for Angular projects with tagged version', () => __awaiter(void 0, void 0, void 0, function* () {
        const options = Object.assign(Object.assign({}, defaultOptions), { theme: 'material' });
        const packageJSON = utils_1.stringify({
            dependencies: {
                '@angular/core': 'next'
            }
        });
        appTree.create('package.json', packageJSON);
        yield runner.runSchematicAsync('ng-add', options, appTree).forEach(tree => {
            const json = JSON.parse(fileContent(tree, 'package.json')).dependencies;
            expect(json['@angular/localize']).toBe('next');
        });
    }));
    it('update package.json with hammerjs', () => __awaiter(void 0, void 0, void 0, function* () {
        const options = Object.assign(Object.assign({}, defaultOptions), { theme: 'material', importHammerjs: true });
        const packageJSON = utils_1.stringify({
            dependencies: {}
        });
        appTree.create('package.json', packageJSON);
        yield runner.runSchematicAsync('ng-add', options, appTree).forEach(tree => {
            const json = JSON.parse(fileContent(tree, 'package.json')).dependencies;
            expect(json['@progress/kendo-theme-material']).toBe(theming_1.themeVersion);
            expect(json['@progress/kendo-dependency']).toBe('^1.0.0');
            expect(json['hammerjs']).toBe('^2.0.0');
        });
    }));
    describe('in projects with "targets"', () => {
        beforeEach(() => {
            appTree = createAppTree({ useTargets: true });
        });
        it('imports the theme', () => __awaiter(void 0, void 0, void 0, function* () {
            const options = Object.assign(Object.assign({}, defaultOptions), { theme: 'material' });
            yield runner.runSchematicAsync('ng-add', options, appTree).forEach(tree => {
                const workspace = utils_1.getWorkspace(tree);
                const project = utils_1.getProjectFromWorkspace(workspace, options.project);
                const styles = project.targets.build.options.styles;
                expect(styles[0].input).toMatch(/kendo-theme-material/);
            });
        }));
    });
    describe('in projects without "test" target', () => {
        beforeEach(() => {
            appTree = createAppTree({ skipTests: true });
        });
        it('imports the theme', () => __awaiter(void 0, void 0, void 0, function* () {
            const options = Object.assign(Object.assign({}, defaultOptions), { theme: 'material' });
            yield runner.runSchematicAsync('ng-add', options, appTree).forEach(tree => {
                const content = fileContent(tree, '/src/app/app.module.ts');
                expect(content).toMatch("import { GridModule } from '@progress/kendo-angular-grid';");
            });
        }));
    });
});

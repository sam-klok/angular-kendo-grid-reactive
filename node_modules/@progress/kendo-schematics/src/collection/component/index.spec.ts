import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';

import { Schema as ComponentOptions } from './schema';

const collectionPath = path.join(__dirname, '../../collection.json');

import { fileContent } from '../utils';

describe('component', () => {
    const runner = new SchematicTestRunner('@progress/kendo-schematics', collectionPath);

    const defaultOptions: ComponentOptions = {
        name: 'foo',
        sourceDir: 'src',
        path: 'app',
        inlineTemplate: false,
        changeDetection: 'Default',
        inlineStyle: false,
        styleext: 'css'
    };

    let appTree: Tree;

    beforeEach(() => {
        appTree = Tree.empty();
    });

    it('should create component files', () => {
        const options = {
            ...defaultOptions
        };

        runner.runSchematicAsync('test-component', options, appTree).forEach(tree =>
            expect(tree.files.indexOf('/src/app/foo/foo.component.ts')).toBeGreaterThanOrEqual(0)
        );
    });

    it('should create flat component files', () => {
        const options = {
            ...defaultOptions,
            flat: true
        };

        runner.runSchematicAsync('test-component', options, appTree).forEach(tree =>
            expect(tree.files.indexOf('/src/app/foo.component.ts')).toBeGreaterThanOrEqual(0)
        );
    });

    it('should render generated selector', () => {
        const options = {
            ...defaultOptions
        };

        runner.runSchematicAsync('test-component', options, appTree).forEach(tree => {
            const content = fileContent(tree, '/src/app/foo/foo.component.ts');

            expect(content).toMatch(/selector: 'foo'/);
        });
    });

    it('should render provided selector', () => {
        const options = {
            ...defaultOptions,
            selector: 'mySelector'
        };

        runner.runSchematicAsync('test-component', options, appTree).forEach(tree => {
            const content = fileContent(tree, '/src/app/foo/foo.component.ts');

            expect(content).toMatch(/selector: 'mySelector'/);
        });
    });

    it('should render generated selector with prefix', () => {
        const options = {
            ...defaultOptions,
            prefix: 'pre'
        };

        runner.runSchematicAsync('test-component', options, appTree).forEach(tree => {
            const content = fileContent(tree, '/src/app/foo/foo.component.ts');

            expect(content).toMatch(/selector: 'pre-foo'/);
        });
    });

    it('should render inline template', () => {
        const options = {
            ...defaultOptions,
            inlineTemplate: true
        };

        runner.runSchematicAsync('test-component', options, appTree).forEach(tree => {
            const content = fileContent(tree, '/src/app/foo/foo.component.ts');

            expect(content).toMatch(/template: /);
            expect(content).not.toMatch(/templateUrl: /);
            expect(tree.files.indexOf('/src/app/foo/foo.component.html')).toEqual(-1);
        });
    });

    it('should render external Template', () => {
        const options = {
            ...defaultOptions,
            inlineTemplate: false
        };

        runner.runSchematicAsync('test-component', options, appTree).forEach(tree => {
            const content = fileContent(tree, '/src/app/foo/foo.component.ts');

            expect(content).not.toMatch(/template: /);
            expect(content).toMatch(/templateUrl: '.\/foo.component.html'/);
            expect(tree.files.indexOf('/src/app/foo/foo.component.html')).toBeGreaterThanOrEqual(0);
        });
    });

    it('should not set view encapsulation', () => {
        const options = {
            ...defaultOptions
        };

        runner.runSchematicAsync('test-component', options, appTree).forEach(tree => {
            const content = fileContent(tree, '/src/app/foo/foo.component.ts');

            expect(content).not.toMatch(/encapsulation: ViewEncapsulation/);
        });
    });

    it('should set view encapsulation to Emulated', () => {
        const options = {
            ...defaultOptions,
            viewEncapsulation: 'Emulated'
        };

        runner.runSchematicAsync('test-component', options, appTree).forEach(tree => {
            const content = fileContent(tree, '/src/app/foo/foo.component.ts');

            expect(content).toMatch(/encapsulation: ViewEncapsulation.Emulated/);
        });
    });

    it('should set view encapsulation to None', () => {
        const options = {
            ...defaultOptions,
            viewEncapsulation: 'None'
        };

        runner.runSchematicAsync('test-component', options, appTree).forEach(tree => {
            const content = fileContent(tree, '/src/app/foo/foo.component.ts');

            expect(content).toMatch(/encapsulation: ViewEncapsulation.None/);
        });
    });

    it('should not set default change detection', () => {
        const options = {
            ...defaultOptions
        };

        runner.runSchematicAsync('test-component', options, appTree).forEach(tree => {
            const content = fileContent(tree, '/src/app/foo/foo.component.ts');

            expect(content).not.toMatch(/changeDetection: ChangeDetectionStrategy.Default/);
        });
    });

    it('should set OnPush change detection', () => {
        const options = {
            ...defaultOptions,
            changeDetection: 'OnPush'
        };

        runner.runSchematicAsync('test-component', options, appTree).forEach(tree => {
            const content = fileContent(tree, '/src/app/foo/foo.component.ts');

            expect(content).toMatch(/changeDetection: ChangeDetectionStrategy.OnPush/);
        });
    });

    it('should render inline styles', () => {
        const options = {
            ...defaultOptions,
            inlineStyle: true
        };

        runner.runSchematicAsync('test-component', options, appTree).forEach(tree => {
            const content = fileContent(tree, '/src/app/foo/foo.component.ts');

            expect(content).toMatch(/styles: \[\]/);
            expect(content).not.toMatch(/styleUrls: /);
            expect(tree.files.indexOf('/src/app/foo/foo.component.css')).toEqual(-1);
        });
    });

    it('should render external styles', () => {
        const options = {
            ...defaultOptions
        };

        runner.runSchematicAsync('test-component', options, appTree).forEach(tree => {
            const content = fileContent(tree, '/src/app/foo/foo.component.ts');

            expect(content).not.toMatch(/styles: \[\]/);
            expect(content).toMatch(/styleUrls: \['.\/foo.component.css/);
            expect(tree.files.indexOf('/src/app/foo/foo.component.css')).toBeGreaterThanOrEqual(0);
        });
    });

    it('should render external scss styles', () => {
        const options = {
            ...defaultOptions,
            styleext: 'scss'
        };

        runner.runSchematicAsync('test-component', options, appTree).forEach(tree => {
            const content = fileContent(tree, '/src/app/foo/foo.component.ts');

            expect(content).not.toMatch(/styles: \[\]/);
            expect(content).toMatch(/styleUrls: \['.\/foo.component.scss/);
            expect(tree.files.indexOf('/src/app/foo/foo.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/foo/foo.component.css')).toEqual(-1);
        });
    });
});

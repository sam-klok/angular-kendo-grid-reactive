"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMainBootstrap = void 0;
function createMainBootstrap(tree, path) {
    tree.create(path || '/src/main.ts', `
        import { enableProdMode } from '@angular/core';
        import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
        
        import { AppModule } from './app/app.module';
        import { environment } from './environments/environment';
        
        if (environment.production) {
        enableProdMode();
        }
        
        platformBrowserDynamic().bootstrapModule(AppModule)
        .catch(err => console.log(err));
    `);
    return tree;
}
exports.createMainBootstrap = createMainBootstrap;

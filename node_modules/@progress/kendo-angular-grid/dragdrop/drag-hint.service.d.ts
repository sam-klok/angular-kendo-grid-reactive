/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { DomSanitizer } from '@angular/platform-browser';
import * as i0 from "@angular/core";
/**
 * @hidden
 */
export declare class DragHintService {
    private santizer;
    private dom;
    constructor(santizer: DomSanitizer);
    create(title: string): void;
    attach(): Function;
    remove(): void;
    show(): void;
    hide(): void;
    enable(): void;
    disable(): void;
    removeLock(): void;
    toggleLock(locked: boolean): void;
    move(move: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DragHintService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DragHintService>;
}

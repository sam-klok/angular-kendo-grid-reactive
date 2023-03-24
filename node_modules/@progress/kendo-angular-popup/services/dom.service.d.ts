/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef } from '@angular/core';
import { AlignSettings, BoundingRect, ElementRect, OffsetPosition, PositionSettings, ScrollInfo, ViewPort } from '@progress/kendo-popup-common';
import { Position } from '../models/position.interface';
import * as i0 from "@angular/core";
/**
 * @hidden
 */
export declare class DOMService {
    addOffset(current: OffsetPosition, addition: OffsetPosition): OffsetPosition;
    addScroll(rect: ElementRect, scroll: ScrollInfo): ElementRect;
    align(settings: AlignSettings): OffsetPosition;
    boundingOffset(el: HTMLElement): BoundingRect;
    getFontStyles(el: HTMLElement): any;
    getWindow(): Window;
    hasOffsetParent(el: ElementRef): boolean;
    offset(el: HTMLElement): ElementRect;
    offsetAtPoint(el: ElementRef, currentLocation: OffsetPosition): ElementRect;
    nativeElement(el: any): HTMLElement;
    position(element: HTMLElement, popup: ElementRef, scale?: number): ElementRect;
    removeScroll(rect: ElementRect, scroll: ScrollInfo): ElementRect;
    restrictToView(settings: PositionSettings): Position;
    scrollPosition(el: ElementRef): ScrollInfo;
    scrollableParents(el: HTMLElement): Array<HTMLElement>;
    stackingElementOffset(el: ElementRef): ElementRect;
    stackingElementScroll(el: ElementRef): ScrollInfo;
    getRelativeContextElement(el: ElementRef): HTMLElement;
    useRelativePosition(el: ElementRef): boolean;
    windowViewPort(el: ElementRef): ViewPort;
    zIndex(anchor: HTMLElement, container: ElementRef): number;
    zoomLevel(): number;
    isZoomed(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<DOMService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DOMService>;
}

/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, EventEmitter, Host, Input, Output, HostBinding } from '@angular/core';
import { Subscription, of } from 'rxjs';
import { and, not, or } from '../utils';
import { takeUntil, delay, filter, tap, switchMap, switchMapTo, map } from 'rxjs/operators';
import { isFocusableWithTabKey, matchesNodeName } from '../rendering/common/dom-queries';
import * as i0 from "@angular/core";
import * as i1 from "@progress/kendo-angular-common";
import * as i2 from "./drag-and-drop.service";
import * as i3 from "./drag-hint.service";
import * as i4 from "./drop-cue.service";
import * as i5 from "../navigation/navigation.service";
/**
 * @hidden
 */
const preventOnDblClick = release => mouseDown => of(mouseDown).pipe(delay(150), takeUntil(release));
const hasClass = className => el => new RegExp(`(^| )${className}( |$)`).test(el.className);
const isDeleteButton = or(hasClass('k-i-x'), hasClass('k-icon-button'));
const isSortIcon = or(hasClass('k-i-sort-asc-small'), hasClass('k-i-sort-desc-small'));
const skipButtons = and(not(isDeleteButton), not(isSortIcon), not(isFocusableWithTabKey), not(matchesNodeName('label')));
const elementUnderCursor = ({ clientX, clientY }) => document.elementFromPoint(clientX, clientY);
const hideThenShow = (element, cont) => {
    element.style.display = 'none';
    const result = cont();
    element.style.display = 'block';
    return result;
};
/**
 * @hidden
 */
export class DraggableColumnDirective {
    constructor(draggable, element, zone, service, hint, cue, nav, renderer) {
        this.draggable = draggable;
        this.element = element;
        this.zone = zone;
        this.service = service;
        this.hint = hint;
        this.cue = cue;
        this.nav = nav;
        this.renderer = renderer;
        this.context = {};
        this.drag = new EventEmitter();
        this.subscriptions = new Subscription();
    }
    set enableDrag(enabled) {
        this.enabled = enabled;
        this.updateTouchAction();
    }
    get hostClass() {
        return this.enabled;
    }
    ngOnInit() {
        this.subscriptions.add(this.zone.runOutsideAngular(() => this.draggable.kendoPress.pipe(filter(_ => this.enabled), filter(({ originalEvent: { target } }) => target === this.element.nativeElement || skipButtons(target)), tap((e) => {
            const originalEvent = e.originalEvent;
            if (!e.isTouch) {
                originalEvent.preventDefault();
            }
            this.nav.navigateTo(originalEvent.target);
        }), switchMap(preventOnDblClick(this.draggable.kendoRelease)), tap((_) => {
            this.hint.create(this.context.hint);
            this.cue.create();
        }), switchMap(down => this.draggable.kendoDrag.pipe(tap((e) => {
            if (e.isTouch) {
                e.originalEvent.preventDefault();
            }
        }), tap(this.hint.attach()), tap(this.cue.attach()), 
        // eslint-disable-next-line rxjs/no-unsafe-takeuntil
        takeUntil(this.draggable.kendoRelease), map(move => ({ move, down })))), tap(this.performDrag.bind(this)), switchMapTo(this.draggable.kendoRelease)).subscribe(this.drop.bind(this))));
    }
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    }
    drop(upEvent) {
        this.hint.remove();
        this.cue.remove();
        this.service.notifyDrop(this, upEvent);
    }
    performDrag({ move }) {
        this.hint.move(move);
        const cursorElement = this.elementUnderCursor(move);
        if (cursorElement) {
            this.service.notifyDrag(this, cursorElement, move);
        }
        this.drag.emit({
            draggable: this,
            mouseEvent: move
        });
    }
    elementUnderCursor(mouseEvent) {
        this.hint.hide();
        let target = elementUnderCursor(mouseEvent);
        if (target && /k-grouping-dropclue/.test(target.className)) {
            target = hideThenShow(target, elementUnderCursor.bind(this, mouseEvent));
        }
        this.hint.show();
        return target;
    }
    updateTouchAction() {
        if (!this.element) {
            return;
        }
        // eslint-disable-next-line no-unused-expressions
        this.enabled ? this.renderer.addClass(this.element.nativeElement, 'k-touch-action-none') :
            this.renderer.removeClass(this.element.nativeElement, 'k-touch-action-none');
    }
}
DraggableColumnDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: DraggableColumnDirective, deps: [{ token: i1.DraggableDirective, host: true }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i2.DragAndDropService }, { token: i3.DragHintService }, { token: i4.DropCueService }, { token: i5.NavigationService }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
DraggableColumnDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.16", type: DraggableColumnDirective, selector: "[kendoDraggableColumn]", inputs: { context: "context", enableDrag: "enableDrag" }, outputs: { drag: "drag" }, host: { properties: { "class.k-grid-draggable-header": "this.hostClass" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: DraggableColumnDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[kendoDraggableColumn]'
                }]
        }], ctorParameters: function () { return [{ type: i1.DraggableDirective, decorators: [{
                    type: Host
                }] }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: i2.DragAndDropService }, { type: i3.DragHintService }, { type: i4.DropCueService }, { type: i5.NavigationService }, { type: i0.Renderer2 }]; }, propDecorators: { context: [{
                type: Input
            }], enableDrag: [{
                type: Input
            }], drag: [{
                type: Output
            }], hostClass: [{
                type: HostBinding,
                args: ['class.k-grid-draggable-header']
            }] } });

/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, ContentChild, ContentChildren, EventEmitter, Input, Output, ViewChild, ViewChildren, ViewContainerRef, Inject, Optional } from '@angular/core';
import { RTL } from '@progress/kendo-angular-l10n';
import { DateRangePopupTemplateDirective } from './date-range-popup-template.directive';
import { MultiViewCalendarComponent } from '../calendar/multiview-calendar.component';
import { PreventableEvent } from '../preventable-event';
import { isDocumentAvailable, guid, Keys, hasObservers } from '@progress/kendo-angular-common';
import { Subscription, fromEvent, merge } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { isWindowAvailable } from '../util';
import { isPresent } from '../common/utils';
import * as i0 from "@angular/core";
import * as i1 from "@progress/kendo-angular-popup";
import * as i2 from "./date-range.service";
import * as i3 from "../calendar/multiview-calendar.component";
import * as i4 from "./date-range-selection.directive";
/**
 * Represents the Kendo UI DateRangePopup component for Angular.
 *
 * @example
 * ```ts
 * import { DateInputsModule, DateRangeService } from '@progress/kendo-angular-dateinputs';
 *
 * _@Component({
 * providers: [DateRangeService],
 * selector: 'my-app',
 * template: `
 *  <button #anchor (click)="popup.toggle()">Toggle</button>
 *  <kendo-daterange-popup [anchor]="anchor" #popup></kendo-daterange-popup>
 * `
 * })
 * export class AppComponent {
 * }
 * ```
 */
export class DateRangePopupComponent {
    constructor(popupService, dateRangeService, ref, zone, rtl) {
        this.popupService = popupService;
        this.dateRangeService = dateRangeService;
        this.ref = ref;
        this.zone = zone;
        this.rtl = rtl;
        /**
         * Controls the popup animation.
         * By default, the opening and closing animations are enabled.
         * For more information about controlling the popup animations,
         * refer to the article on [animations]({% slug animations_popup %}).
         */
        this.animate = true;
        /**
         * Configures the collision behavior of the popup.
         * For more information, refer to the article on
         * [viewport boundary detection]({% slug viewportboundarydetection_popup %}).
         */
        this.collision = { horizontal: 'fit', vertical: 'flip' };
        /**
         * Fires each time the popup is about to open.
         * This event is preventable. If you cancel the event, the popup will remain closed.
         * For more information, refer to the section on
         * [events]({% slug overview_datepicker %}#toc-events).
         */
        this.open = new EventEmitter();
        /**
         * Fires each time the popup is about to close.
         * This event is preventable. If you cancel the event, the popup will remain open.
         * For more information, refer to the section on
         * [events]({% slug overview_datepicker %}#toc-events).
         */
        this.close = new EventEmitter();
        /**
         * Fires each time the calendar element is blurred.
         */
        this.onBlur = new EventEmitter();
        /**
         * Fires each time the calendar element is focused.
         */
        this.onFocus = new EventEmitter();
        /**
         * Fires each time the popup is closed either on `ESC` keypress or on leaving the viewport.
         */
        this.cancel = new EventEmitter();
        /**
         * @hidden
         */
        this.popupUID = guid();
        this.calendarSubscriptions = new Subscription();
        this.popupSubscriptions = new Subscription();
        this.resolvedPromise = Promise.resolve();
    }
    /**
     * The active calendar that is visible in the popup.
     *
     * > When the popup is closed, the property returns `null`.
     */
    get calendar() {
        return this._calendar;
    }
    set calendar(calendar) {
        this._calendar = calendar;
        this.subscribeFocusBlur(calendar);
    }
    /**
     * Gets the active state of the component.
     * When the opened calendar is active, returns `true`.
     */
    get isActive() {
        return this.calendar && this.calendar.isActive;
    }
    /**
     * Gets or sets the visibility state of the component.
     */
    set show(show) {
        if (this._show === show) {
            return;
        }
        const event = new PreventableEvent();
        if (show) {
            this.open.emit(event);
        }
        else {
            this.close.emit(event);
        }
        if (event.isDefaultPrevented()) {
            return;
        }
        this._toggle(show);
    }
    get show() {
        return this._show;
    }
    ngOnInit() {
        this.dateRangeService.registerPopup(this);
    }
    ngAfterViewInit() {
        this.calendarSubscriptions.add(this.contentCalendar.changes.subscribe((changes) => this.calendar = changes.first));
        this.calendarSubscriptions.add(this.viewCalendar.changes.subscribe((changes) => this.calendar = changes.first));
        if (isWindowAvailable()) {
            this.zone.runOutsideAngular(() => this.windowBlurSubscription = fromEvent(window, 'blur').subscribe(this.handleWindowBlur.bind(this)));
        }
    }
    ngOnDestroy() {
        this.destroyPopup();
        this.calendarSubscriptions.unsubscribe();
        if (this.activateSubscription) {
            this.activateSubscription.unsubscribe();
        }
        if (this.blurSubscription) {
            this.blurSubscription.unsubscribe();
            this.focusSubscription.unsubscribe();
        }
        if (this.windowBlurSubscription) {
            this.windowBlurSubscription.unsubscribe();
        }
    }
    /**
     *  Opens the popup component and focuses the calendar.
     */
    activate() {
        if (this.show === true) {
            return;
        }
        if (this.activateSubscription) {
            this.activateSubscription.unsubscribe();
        }
        this.show = true;
        this.ref.markForCheck();
        this.zone.runOutsideAngular(() => {
            this.activateSubscription = merge(this.contentCalendar.changes, this.viewCalendar.changes)
                .pipe(filter(changes => changes && changes.first), map(changes => changes.first))
                .subscribe((calendar) => setTimeout(() => {
                calendar.focus();
                this.calendarSubscriptions.add(calendar.viewList.focusedCellChange.subscribe((id) => {
                    this.dateRangeService.setActiveDescendent(id);
                }));
            }));
        });
    }
    /**
     *  Focuses the calendar (if available).
     */
    focus() {
        if (this.calendar) {
            this.calendar.focus();
        }
    }
    /**
     * Checks if a focused element ids placed inside the popup.
     *
     * @return boolean;
     */
    hasActiveContent() {
        if (!isDocumentAvailable() || !this.popupRef) {
            return false;
        }
        return this.popupRef.popupElement.contains(document.activeElement);
    }
    /**
     * Toggles the visibility of the popup.
     * If you use the `toggle` method to show or hide the popup,
     * the `open` and `close` events do not fire.
     *
     * @param show The state of the popup.
     */
    toggle(show) {
        this.resolvedPromise.then(() => {
            this._toggle((show === undefined) ? !this.show : show);
        });
    }
    /**
     * @hidden
     *
     * Closes the popup and triggers the `cancel` event.
     */
    cancelPopup() {
        this.show = false;
        this.cancel.emit();
    }
    handleWindowBlur() {
        if (!this.show) {
            return;
        }
        if (hasObservers(this.close)) {
            this.zone.run(() => this.show = false);
        }
        else {
            this.show = false;
        }
    }
    handleMouseLeave() {
        this.dateRangeService.setRange(this.dateRangeService.selectionRange);
    }
    handleKeydown(event) {
        const { altKey, keyCode } = event;
        if (keyCode === Keys.Escape || (altKey && keyCode === Keys.ArrowUp)) {
            this.zone.run(() => this.cancelPopup());
        }
    }
    subscribeFocusBlur(calendar) {
        if (this.blurSubscription) {
            this.blurSubscription.unsubscribe();
            this.focusSubscription.unsubscribe();
        }
        if (!calendar) {
            return;
        }
        const calendarElement = calendar.element.nativeElement.querySelector('.k-calendar-view');
        this.blurSubscription = fromEvent(calendarElement, 'blur').subscribe(() => this.onBlur.emit());
        this.focusSubscription = fromEvent(calendarElement, 'focus').subscribe(() => this.onFocus.emit());
    }
    addPopupSubscriptions(...subscriptions) {
        if (!isPresent(this.popupSubscriptions)) {
            this.popupSubscriptions = new Subscription();
        }
        subscriptions.map(s => this.popupSubscriptions.add(s));
    }
    get _appendTo() {
        const appendTo = this.appendTo;
        if (!appendTo || appendTo === 'root') {
            return undefined;
        }
        return appendTo === 'component' ? this.container : appendTo;
    }
    _toggle(show) {
        this._show = show;
        if (this.popupRef) {
            this.destroyPopup();
        }
        if (this._show) {
            const direction = this.rtl ? 'right' : 'left';
            this.popupRef = this.popupService.open({
                anchor: this.anchor,
                anchorAlign: this.anchorAlign || { vertical: 'bottom', horizontal: direction },
                animate: this.animate,
                appendTo: this._appendTo,
                collision: this.collision,
                content: (this.contentTemplate || {}).templateRef || this.defaultTemplate,
                margin: this.margin,
                popupAlign: this.popupAlign || { vertical: 'top', horizontal: direction },
                positionMode: 'absolute'
            });
            const { popupElement, popupAnchorViewportLeave } = this.popupRef;
            popupElement.setAttribute('id', this.popupUID);
            this.addPopupSubscriptions(this.zone.runOutsideAngular(() => fromEvent(popupElement, 'keydown').subscribe(this.handleKeydown.bind(this))), fromEvent(popupElement, 'mouseleave').subscribe(this.handleMouseLeave.bind(this)), popupAnchorViewportLeave.subscribe(() => this.cancelPopup()));
        }
    }
    destroyPopup() {
        if (isPresent(this.popupRef)) {
            this.popupRef.close();
            this.popupRef = null;
        }
        if (isPresent(this.popupSubscriptions)) {
            this.popupSubscriptions.unsubscribe();
        }
    }
}
DateRangePopupComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: DateRangePopupComponent, deps: [{ token: i1.PopupService }, { token: i2.DateRangeService }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }, { token: RTL, optional: true }], target: i0.ɵɵFactoryTarget.Component });
DateRangePopupComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: DateRangePopupComponent, selector: "kendo-daterange-popup", inputs: { animate: "animate", anchor: "anchor", anchorAlign: "anchorAlign", appendTo: "appendTo", collision: "collision", popupAlign: "popupAlign", margin: "margin" }, outputs: { open: "open", close: "close", onBlur: "blur", onFocus: "focus", cancel: "cancel" }, queries: [{ propertyName: "contentTemplate", first: true, predicate: DateRangePopupTemplateDirective, descendants: true }, { propertyName: "contentCalendar", predicate: MultiViewCalendarComponent }], viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true, read: ViewContainerRef }, { propertyName: "defaultTemplate", first: true, predicate: ["defaultTemplate"], descendants: true }, { propertyName: "viewCalendar", predicate: MultiViewCalendarComponent, descendants: true }], exportAs: ["kendo-daterange-popup"], ngImport: i0, template: `
        <ng-container #container></ng-container>
        <ng-template #defaultTemplate>
            <kendo-multiviewcalendar kendoDateRangeSelection></kendo-multiviewcalendar>
        </ng-template>
    `, isInline: true, components: [{ type: i3.MultiViewCalendarComponent, selector: "kendo-multiviewcalendar", inputs: ["id", "focusedDate", "min", "max", "rangeValidation", "disabledDatesRangeValidation", "selection", "value", "disabled", "tabindex", "tabIndex", "isActive", "disabledDates", "activeView", "bottomView", "topView", "showViewHeader", "animateNavigation", "weekNumber", "activeRangeEnd", "selectionRange", "views", "orientation", "cellTemplate", "monthCellTemplate", "yearCellTemplate", "decadeCellTemplate", "centuryCellTemplate", "weekNumberTemplate", "headerTitleTemplate"], outputs: ["activeViewChange", "navigate", "cellEnter", "cellLeave", "valueChange", "blur", "focus", "focusCalendar"], exportAs: ["kendo-multiviewcalendar"] }], directives: [{ type: i4.DateRangeSelectionDirective, selector: "[kendoDateRangeSelection]", inputs: ["autoCorrectOn", "selectionRange", "activeRangeEnd"], outputs: ["activeRangeEndChange", "selectionRangeChange"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: DateRangePopupComponent, decorators: [{
            type: Component,
            args: [{
                    exportAs: 'kendo-daterange-popup',
                    selector: 'kendo-daterange-popup',
                    template: `
        <ng-container #container></ng-container>
        <ng-template #defaultTemplate>
            <kendo-multiviewcalendar kendoDateRangeSelection></kendo-multiviewcalendar>
        </ng-template>
    `
                }]
        }], ctorParameters: function () { return [{ type: i1.PopupService }, { type: i2.DateRangeService }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [RTL]
                }] }]; }, propDecorators: { container: [{
                type: ViewChild,
                args: ['container', { read: ViewContainerRef, static: false }]
            }], defaultTemplate: [{
                type: ViewChild,
                args: ['defaultTemplate', { static: false }]
            }], contentTemplate: [{
                type: ContentChild,
                args: [DateRangePopupTemplateDirective, { static: false }]
            }], viewCalendar: [{
                type: ViewChildren,
                args: [MultiViewCalendarComponent]
            }], contentCalendar: [{
                type: ContentChildren,
                args: [MultiViewCalendarComponent]
            }], animate: [{
                type: Input
            }], anchor: [{
                type: Input
            }], anchorAlign: [{
                type: Input
            }], appendTo: [{
                type: Input
            }], collision: [{
                type: Input
            }], popupAlign: [{
                type: Input
            }], margin: [{
                type: Input
            }], open: [{
                type: Output
            }], close: [{
                type: Output
            }], onBlur: [{
                type: Output,
                args: ['blur']
            }], onFocus: [{
                type: Output,
                args: ['focus']
            }], cancel: [{
                type: Output
            }] } });

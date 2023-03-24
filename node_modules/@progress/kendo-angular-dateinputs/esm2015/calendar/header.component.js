/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { getDate } from '@progress/kendo-date-math';
import { CalendarViewEnum } from './models/view.enum';
import { MIN_DATE, MAX_DATE } from '../defaults';
import { dateInRange, getToday, isInRange } from '../util';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "./services/bus-view.service";
import * as i2 from "@progress/kendo-angular-l10n";
import * as i3 from "@progress/kendo-angular-intl";
import * as i4 from "./services/disabled-dates.service";
import * as i5 from "@progress/kendo-angular-common";
import * as i6 from "@angular/common";
/**
 * @hidden
 */
export class HeaderComponent {
    constructor(bus, cdr, localization, intl, disabledDatesService) {
        this.bus = bus;
        this.cdr = cdr;
        this.localization = localization;
        this.intl = intl;
        this.disabledDatesService = disabledDatesService;
        this.navigate = true;
        this.todayAvailable = true;
        this.min = new Date(MIN_DATE);
        this.max = new Date(MAX_DATE);
        this.rangeLength = 1;
        this.isPrevDisabled = true;
        this.isNextDisabled = true;
        this.showNavigationButtons = false;
        this.orientation = 'horizontal';
        this.todayButtonClick = new EventEmitter();
        this.prevButtonClick = new EventEmitter();
        this.nextButtonClick = new EventEmitter();
        this.getComponentClass = true;
        this.subscriptions = new Subscription();
    }
    get horizontalHostClass() {
        return this.orientation === 'horizontal';
    }
    get verticalHostClass() {
        return this.orientation === 'vertical';
    }
    ngOnInit() {
        this.subscriptions.add(this.intl.changes.subscribe(this.intlChange.bind(this)));
        this.subscriptions.add(this.localization.changes.subscribe(this.l10nChange.bind(this)));
        this.subscriptions.add(this.disabledDatesService.changes.subscribe(this.setTodayAvailability.bind(this)));
    }
    ngOnChanges(_) {
        const service = this.bus.service(this.activeView);
        if (!service) {
            return;
        }
        this.activeViewValue = CalendarViewEnum[this.activeView];
        this.todayMessage = this.localization.get('today');
        this.parentViewButtonTitle = this.localization.get('parentViewButtonTitle');
        this.setTodayAvailability();
        this.navigate = this.bus.canMoveUp(this.activeView);
        this.title = this.getTitle();
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    handleTodayClick() {
        if (!this.todayAvailable) {
            return;
        }
        this.bus.moveToBottom(this.activeView);
        this.todayButtonClick.emit(dateInRange(getToday(), this.min, this.max));
    }
    handleNavigation() {
        if (!this.navigate) {
            return;
        }
        this.bus.moveUp(this.activeView);
    }
    isDisabled() {
        return this.navigate ? null : '';
    }
    intlChange() {
        if (this.currentDate && this.bus.service(this.activeView)) {
            this.title = this.getTitle();
            this.cdr.markForCheck();
        }
    }
    l10nChange() {
        this.prevButtonTitle = this.localization.get('prevButtonTitle');
        this.nextButtonTitle = this.localization.get('nextButtonTitle');
        this.parentViewButtonTitle = this.localization.get('parentViewButtonTitle');
        this.todayMessage = this.localization.get('today');
        this.cdr.markForCheck();
    }
    getTitle() {
        if (!this.currentDate) {
            return '';
        }
        const service = this.bus.service(this.activeView);
        const take = this.rangeLength - 1;
        const title = service.title(this.currentDate);
        const nextDate = service.addToDate(this.currentDate, take);
        if (take < 1 || !service.isInRange(nextDate, this.min, this.max)) {
            return title;
        }
        return `${title} - ${service.title(nextDate)}`;
    }
    setTodayAvailability() {
        const today = getToday();
        const isTodayInRange = isInRange(today, getDate(this.min), getDate(this.max));
        const isDisabled = this.disabledDatesService.isDateDisabled(today);
        this.todayAvailable = isTodayInRange && !isDisabled;
        this.cdr.markForCheck();
    }
}
HeaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: HeaderComponent, deps: [{ token: i1.BusViewService }, { token: i0.ChangeDetectorRef }, { token: i2.LocalizationService }, { token: i3.IntlService }, { token: i4.DisabledDatesService }], target: i0.ɵɵFactoryTarget.Component });
HeaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: HeaderComponent, selector: "kendo-calendar-header", inputs: { activeView: "activeView", currentDate: "currentDate", min: "min", max: "max", rangeLength: "rangeLength", templateRef: "templateRef", isPrevDisabled: "isPrevDisabled", isNextDisabled: "isNextDisabled", showNavigationButtons: "showNavigationButtons", orientation: "orientation", id: "id" }, outputs: { todayButtonClick: "todayButtonClick", prevButtonClick: "prevButtonClick", nextButtonClick: "nextButtonClick" }, host: { properties: { "class.k-calendar-header": "this.getComponentClass", "class.k-hstack": "this.horizontalHostClass", "class.k-vstack": "this.verticalHostClass" } }, usesOnChanges: true, ngImport: i0, template: `
    <span class="k-button k-nav-fast k-button-md k-rounded-md k-button-flat k-button-flat-base k-calendar-title"
        role="button"
        [id]="id"
        tabindex="-1"
        [class.k-disabled]="!navigate"
        [attr.aria-disabled]="isDisabled()"
        [kendoEventsOutsideAngular]="{
            click: handleNavigation
        }"
        [title]="parentViewButtonTitle"
        [scope]="this">
        <ng-template [ngIf]="!templateRef">{{title}}</ng-template>
        <ng-template
            [ngIf]="templateRef"
            [ngTemplateOutlet]="templateRef"
            [ngTemplateOutletContext]="{ $implicit: title, activeView: activeViewValue, date: currentDate }"
        ></ng-template>
    </span>
    <span class="k-spacer"></span>
    <span class="k-calendar-nav k-hstack">
        <button
            *ngIf="showNavigationButtons"
            class="k-button k-button-md k-rounded-md k-button-flat k-button-flat-base k-icon-button k-calendar-nav-prev"
            tabindex="-1"
            type="button"
            [attr.aria-disabled]="isPrevDisabled"
            [disabled]="isPrevDisabled"
            [title]="prevButtonTitle"
            (click)="prevButtonClick.emit()"
        >
            <span class="k-icon k-i-chevron-left"></span>
        </button>
        <span
            class="k-today k-calendar-nav-today"
            tabindex="-1"
            [class.k-disabled]="!todayAvailable"
            [kendoEventsOutsideAngular]="{
                click: handleTodayClick
            }"
            [scope]="this"
            role="link"
        >
            {{ todayMessage }}
        </span>
        <button
            *ngIf="showNavigationButtons"
            class="k-button k-button-md k-rounded-md k-button-flat k-button-flat-base k-icon-button k-calendar-nav-next"
            tabindex="-1"
            type="button"
            [attr.aria-disabled]="isNextDisabled"
            [disabled]="isNextDisabled"
            [title]="nextButtonTitle"
            (click)="nextButtonClick.emit()"
        >
            <span class="k-icon k-i-chevron-right"></span>
        </button>
    </span>
  `, isInline: true, directives: [{ type: i5.EventsOutsideAngularDirective, selector: "[kendoEventsOutsideAngular]", inputs: ["kendoEventsOutsideAngular", "scope"] }, { type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: HeaderComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'kendo-calendar-header',
                    template: `
    <span class="k-button k-nav-fast k-button-md k-rounded-md k-button-flat k-button-flat-base k-calendar-title"
        role="button"
        [id]="id"
        tabindex="-1"
        [class.k-disabled]="!navigate"
        [attr.aria-disabled]="isDisabled()"
        [kendoEventsOutsideAngular]="{
            click: handleNavigation
        }"
        [title]="parentViewButtonTitle"
        [scope]="this">
        <ng-template [ngIf]="!templateRef">{{title}}</ng-template>
        <ng-template
            [ngIf]="templateRef"
            [ngTemplateOutlet]="templateRef"
            [ngTemplateOutletContext]="{ $implicit: title, activeView: activeViewValue, date: currentDate }"
        ></ng-template>
    </span>
    <span class="k-spacer"></span>
    <span class="k-calendar-nav k-hstack">
        <button
            *ngIf="showNavigationButtons"
            class="k-button k-button-md k-rounded-md k-button-flat k-button-flat-base k-icon-button k-calendar-nav-prev"
            tabindex="-1"
            type="button"
            [attr.aria-disabled]="isPrevDisabled"
            [disabled]="isPrevDisabled"
            [title]="prevButtonTitle"
            (click)="prevButtonClick.emit()"
        >
            <span class="k-icon k-i-chevron-left"></span>
        </button>
        <span
            class="k-today k-calendar-nav-today"
            tabindex="-1"
            [class.k-disabled]="!todayAvailable"
            [kendoEventsOutsideAngular]="{
                click: handleTodayClick
            }"
            [scope]="this"
            role="link"
        >
            {{ todayMessage }}
        </span>
        <button
            *ngIf="showNavigationButtons"
            class="k-button k-button-md k-rounded-md k-button-flat k-button-flat-base k-icon-button k-calendar-nav-next"
            tabindex="-1"
            type="button"
            [attr.aria-disabled]="isNextDisabled"
            [disabled]="isNextDisabled"
            [title]="nextButtonTitle"
            (click)="nextButtonClick.emit()"
        >
            <span class="k-icon k-i-chevron-right"></span>
        </button>
    </span>
  `
                }]
        }], ctorParameters: function () { return [{ type: i1.BusViewService }, { type: i0.ChangeDetectorRef }, { type: i2.LocalizationService }, { type: i3.IntlService }, { type: i4.DisabledDatesService }]; }, propDecorators: { activeView: [{
                type: Input
            }], currentDate: [{
                type: Input
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }], rangeLength: [{
                type: Input
            }], templateRef: [{
                type: Input
            }], isPrevDisabled: [{
                type: Input
            }], isNextDisabled: [{
                type: Input
            }], showNavigationButtons: [{
                type: Input
            }], orientation: [{
                type: Input
            }], id: [{
                type: Input
            }], todayButtonClick: [{
                type: Output
            }], prevButtonClick: [{
                type: Output
            }], nextButtonClick: [{
                type: Output
            }], getComponentClass: [{
                type: HostBinding,
                args: ["class.k-calendar-header"]
            }], horizontalHostClass: [{
                type: HostBinding,
                args: ["class.k-hstack"]
            }], verticalHostClass: [{
                type: HostBinding,
                args: ["class.k-vstack"]
            }] } });

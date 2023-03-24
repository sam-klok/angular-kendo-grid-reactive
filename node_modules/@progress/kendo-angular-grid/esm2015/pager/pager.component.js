/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, EventEmitter, Output, HostBinding, HostListener, Optional, Inject } from '@angular/core';
import { normalize } from './pager-settings';
import { anyChanged, replaceMessagePlaceholder } from '../utils';
import { Subscription } from 'rxjs';
import { RESPONSIVE_BREAKPOINT_LARGE, RESPONSIVE_BREAKPOINT_MEDIUM } from '../constants';
import { take } from 'rxjs/operators';
import { CELL_CONTEXT } from '../rendering/common/cell-context';
import { FocusGroup } from '../navigation/focus-group';
import { FocusRoot, FOCUS_ROOT_ACTIVE } from '../navigation/focus-root';
import { findFocusableChild, findLastFocusableChild } from '../rendering/common/dom-queries';
import * as i0 from "@angular/core";
import * as i1 from "./pager-context.service";
import * as i2 from "../navigation/navigation.service";
import * as i3 from "@progress/kendo-angular-l10n";
import * as i4 from "../navigation/focus-root";
import * as i5 from "../navigation/focus-group";
import * as i6 from "./pager-prev-buttons.component";
import * as i7 from "./pager-numeric-buttons.component";
import * as i8 from "./pager-input.component";
import * as i9 from "./pager-next-buttons.component";
import * as i10 from "./pager-info.component";
import * as i11 from "./pager-page-sizes.component";
import * as i12 from "@progress/kendo-angular-common";
import * as i13 from "@angular/common";
/**
 * @hidden
 */
export class PagerComponent {
    constructor(pagerContext, navigationService, element, renderer, zone, localizationService, cellContext, focusRoot, focusGroup) {
        this.pagerContext = pagerContext;
        this.navigationService = navigationService;
        this.element = element;
        this.renderer = renderer;
        this.zone = zone;
        this.localizationService = localizationService;
        this.cellContext = cellContext;
        this.focusRoot = focusRoot;
        this.focusGroup = focusGroup;
        this.total = 0;
        this.skip = 1;
        this.pageChange = new EventEmitter();
        this.pagerWrapClass = true;
        this.gridPagerClass = true;
        this.settings = normalize({});
        this.subscriptions = new Subscription();
        this._templateContext = {};
        this._isFocused = false;
        this.resizeHandler = () => {
            const element = this.element.nativeElement;
            if (this.template || !element) {
                return;
            }
            const width = element.offsetWidth;
            if (width < RESPONSIVE_BREAKPOINT_MEDIUM) {
                this.renderer.removeClass(element, 'k-pager-md');
                this.renderer.addClass(element, 'k-pager-sm');
            }
            else if (width >= RESPONSIVE_BREAKPOINT_MEDIUM && width < RESPONSIVE_BREAKPOINT_LARGE) {
                this.renderer.addClass(element, 'k-pager-md');
                this.renderer.removeClass(element, 'k-pager-sm');
            }
            else {
                this.clearResponsiveClasses();
            }
        };
    }
    set options(value) {
        this.settings = normalize(value);
    }
    get isFocused() {
        return this._isFocused;
    }
    get pagerAriaLabel() {
        return this.navigationService.pagerEnabled ? this.pagerLabel : undefined;
    }
    /**
     * @hidden
     */
    get pagerLabel() {
        const localizationMsg = this.localizationService.get('pagerLabel') || '';
        return replaceMessagePlaceholder(replaceMessagePlaceholder(localizationMsg, 'currentPage', this.currentPage.toString()), 'totalPages', this.totalPages.toString());
    }
    get focusTrapTabIndex() {
        return this.focusGroup.isActive ? '0' : '-1';
    }
    onFocusIn(event) {
        if (this.navigationService.pagerEnabled) {
            const shouldFocusPager = event.target === this.element.nativeElement;
            if (shouldFocusPager) {
                this._isFocused = true;
                this.focusRoot.deactivate();
            }
            else {
                this.focusRoot.activate();
            }
        }
    }
    onFocusOut() {
        if (this.navigationService.pagerEnabled) {
            this._isFocused = false;
        }
    }
    onEscape() {
        if (this.navigationService.pagerEnabled) {
            this.focusRoot.deactivate();
            this.element.nativeElement.focus();
        }
    }
    onEnter(event) {
        if (this.navigationService.pagerEnabled && event.target === this.element.nativeElement) {
            this.focusRoot.activate();
            this.focusFirstElement();
        }
    }
    navigateToPreviousPage(e) {
        if (this.shouldTriggerPageChange(e.target, this.currentPage > 1)) {
            this.pagerContext.prevPage();
        }
    }
    navigateToNextPage(e) {
        if (this.shouldTriggerPageChange(e.target, this.currentPage < this.totalPages)) {
            this.pagerContext.nextPage();
        }
    }
    navigateToFirstPage(e) {
        if (this.shouldTriggerPageChange(e.target, this.currentPage > 1)) {
            this.pagerContext.changePage(0);
        }
    }
    navigateToLastPage(e) {
        if (this.shouldTriggerPageChange(e.target, this.currentPage < this.totalPages)) {
            this.pagerContext.changePage(this.totalPages - 1);
        }
    }
    get totalPages() {
        return Math.ceil((this.total || 0) / this.pageSize);
    }
    get currentPage() {
        return Math.floor((this.skip || 0) / this.pageSize) + 1;
    }
    get templateContext() {
        const context = this._templateContext;
        context.totalPages = this.totalPages;
        context.total = this.total;
        context.skip = this.skip;
        context.pageSize = this.pageSize;
        context.currentPage = this.currentPage;
        return context;
    }
    ngOnInit() {
        this.subscriptions.add(this.pagerContext.pageChange.subscribe(this.changePage.bind(this)));
        if (this.navigationService.pagerEnabled) {
            this.focusRoot.deactivate();
        }
    }
    ngDoCheck() {
        this.updateCellContext();
    }
    ngOnChanges(changes) {
        if (anyChanged(['pageSize', 'skip', 'total'], changes, false)) {
            this.pagerContext.notifyChanges({
                pageSize: this.pageSize,
                skip: this.skip,
                total: this.total
            });
        }
        if (changes.template) {
            // eslint-disable-next-line no-unused-expressions
            changes.template.currentValue ? this.clearResponsiveClasses() : this.resizeHandler();
        }
        if (changes.options) {
            // eslint-disable-next-line no-unused-expressions
            this.settings.responsive ? this.resizeHandler() : this.clearResponsiveClasses();
        }
    }
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    }
    changePage(event) {
        this.pageChange.emit(event);
    }
    onInnerFocusIn(event, position) {
        this.zone.onStable.pipe(take(1)).subscribe(() => {
            if (position === 'start') {
                if (event.relatedTarget === this.element.nativeElement) {
                    this.focusFirstElement();
                }
                else {
                    this.focusLastElement();
                }
            }
            else {
                this.focusFirstElement();
            }
        });
    }
    clearResponsiveClasses() {
        const element = this.element.nativeElement;
        this.renderer.removeClass(element, 'k-pager-sm');
        this.renderer.removeClass(element, 'k-pager-md');
    }
    shouldTriggerPageChange(target, condition) {
        return this.navigationService.pagerEnabled &&
            target === this.element.nativeElement &&
            condition;
    }
    focusFirstElement() {
        const first = findFocusableChild(this.element.nativeElement, true);
        if (first) {
            first.focus();
        }
    }
    focusLastElement() {
        const last = findLastFocusableChild(this.element.nativeElement, true);
        if (last) {
            last.focus();
        }
    }
    updateCellContext() {
        if (this.cellContext) {
            this.cellContext.focusGroup = this.focusGroup;
        }
    }
}
PagerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: PagerComponent, deps: [{ token: i1.PagerContextService }, { token: i2.NavigationService }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.NgZone }, { token: i3.LocalizationService }, { token: CELL_CONTEXT, optional: true }, { token: i4.FocusRoot }, { token: i5.FocusGroup }], target: i0.ɵɵFactoryTarget.Component });
PagerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: PagerComponent, selector: "kendo-pager", inputs: { total: "total", skip: "skip", pageSize: "pageSize", options: "options", template: "template" }, outputs: { pageChange: "pageChange" }, host: { listeners: { "focusin": "onFocusIn($event)", "focusout": "onFocusOut()", "keydown.escape": "onEscape()", "keydown.enter": "onEnter($event)", "keydown.arrowleft": "navigateToPreviousPage($event)", "keydown.pageup": "navigateToPreviousPage($event)", "keydown.arrowright": "navigateToNextPage($event)", "keydown.pagedown": "navigateToNextPage($event)", "keydown.home": "navigateToFirstPage($event)", "keydown.end": "navigateToLastPage($event)" }, properties: { "class.k-pager-wrap": "this.pagerWrapClass", "class.k-grid-pager": "this.gridPagerClass", "class.k-focus": "this.isFocused", "attr.aria-label": "this.pagerAriaLabel" } }, providers: [{
            provide: FOCUS_ROOT_ACTIVE,
            useValue: true
        }, {
            provide: FocusRoot,
            deps: [FOCUS_ROOT_ACTIVE],
            useClass: FocusRoot
        }, {
            provide: FocusGroup,
            deps: [FocusRoot],
            useClass: FocusGroup
        }], usesOnChanges: true, ngImport: i0, template: `
        <div
            *ngIf="navigationService.pagerEnabled"
            class="k-sr-only"
            [tabindex]="focusTrapTabIndex"
            [attr.aria-hidden]="true"
            (focusin)="onInnerFocusIn($event, 'start')">
        </div>
        <ng-container
            *ngIf="template?.templateRef"
            [ngTemplateOutlet]="template.templateRef"
            [ngTemplateOutletContext]="templateContext">
        </ng-container>
        <ng-container *ngIf="!template?.templateRef">
            <kendo-pager-prev-buttons *ngIf="settings.previousNext"></kendo-pager-prev-buttons>
            <kendo-pager-numeric-buttons
                *ngIf="settings.type === 'numeric'"
                [buttonCount]="settings.buttonCount">
            </kendo-pager-numeric-buttons>
            <kendo-pager-input *ngIf="settings.type === 'input'"></kendo-pager-input>
            <kendo-pager-next-buttons *ngIf="settings.previousNext"></kendo-pager-next-buttons>
            <kendo-pager-info *ngIf='settings.info'></kendo-pager-info>
            <kendo-pager-page-sizes
                *ngIf="settings.pageSizes"
                [pageSizes]="$any(settings.pageSizes)"
                #pageSizes
            ></kendo-pager-page-sizes>
        </ng-container>
        <div
            *ngIf="navigationService.pagerEnabled"
            class="k-sr-only"
            [tabindex]="focusTrapTabIndex"
            [attr.aria-hidden]="true"
            (focusin)="onInnerFocusIn($event, 'end')">
        </div>
        <kendo-resize-sensor *ngIf="settings.responsive" (resize)="resizeHandler()"></kendo-resize-sensor>
  `, isInline: true, components: [{ type: i6.PagerPrevButtonsComponent, selector: "kendo-pager-prev-buttons" }, { type: i7.PagerNumericButtonsComponent, selector: "kendo-pager-numeric-buttons", inputs: ["buttonCount"] }, { type: i8.PagerInputComponent, selector: "kendo-pager-input" }, { type: i9.PagerNextButtonsComponent, selector: "kendo-pager-next-buttons" }, { type: i10.PagerInfoComponent, selector: "kendo-pager-info" }, { type: i11.PagerPageSizesComponent, selector: "kendo-pager-page-sizes", inputs: ["pageSizes"] }, { type: i12.ResizeSensorComponent, selector: "kendo-resize-sensor", inputs: ["rateLimit"], outputs: ["resize"] }], directives: [{ type: i13.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i13.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: PagerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'kendo-pager',
                    providers: [{
                            provide: FOCUS_ROOT_ACTIVE,
                            useValue: true
                        }, {
                            provide: FocusRoot,
                            deps: [FOCUS_ROOT_ACTIVE],
                            useClass: FocusRoot
                        }, {
                            provide: FocusGroup,
                            deps: [FocusRoot],
                            useClass: FocusGroup
                        }],
                    template: `
        <div
            *ngIf="navigationService.pagerEnabled"
            class="k-sr-only"
            [tabindex]="focusTrapTabIndex"
            [attr.aria-hidden]="true"
            (focusin)="onInnerFocusIn($event, 'start')">
        </div>
        <ng-container
            *ngIf="template?.templateRef"
            [ngTemplateOutlet]="template.templateRef"
            [ngTemplateOutletContext]="templateContext">
        </ng-container>
        <ng-container *ngIf="!template?.templateRef">
            <kendo-pager-prev-buttons *ngIf="settings.previousNext"></kendo-pager-prev-buttons>
            <kendo-pager-numeric-buttons
                *ngIf="settings.type === 'numeric'"
                [buttonCount]="settings.buttonCount">
            </kendo-pager-numeric-buttons>
            <kendo-pager-input *ngIf="settings.type === 'input'"></kendo-pager-input>
            <kendo-pager-next-buttons *ngIf="settings.previousNext"></kendo-pager-next-buttons>
            <kendo-pager-info *ngIf='settings.info'></kendo-pager-info>
            <kendo-pager-page-sizes
                *ngIf="settings.pageSizes"
                [pageSizes]="$any(settings.pageSizes)"
                #pageSizes
            ></kendo-pager-page-sizes>
        </ng-container>
        <div
            *ngIf="navigationService.pagerEnabled"
            class="k-sr-only"
            [tabindex]="focusTrapTabIndex"
            [attr.aria-hidden]="true"
            (focusin)="onInnerFocusIn($event, 'end')">
        </div>
        <kendo-resize-sensor *ngIf="settings.responsive" (resize)="resizeHandler()"></kendo-resize-sensor>
  `
                }]
        }], ctorParameters: function () { return [{ type: i1.PagerContextService }, { type: i2.NavigationService }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.NgZone }, { type: i3.LocalizationService }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [CELL_CONTEXT]
                }] }, { type: i4.FocusRoot }, { type: i5.FocusGroup }]; }, propDecorators: { total: [{
                type: Input
            }], skip: [{
                type: Input
            }], pageSize: [{
                type: Input
            }], options: [{
                type: Input
            }], template: [{
                type: Input
            }], pageChange: [{
                type: Output
            }], pagerWrapClass: [{
                type: HostBinding,
                args: ['class.k-pager-wrap']
            }], gridPagerClass: [{
                type: HostBinding,
                args: ['class.k-grid-pager']
            }], isFocused: [{
                type: HostBinding,
                args: ['class.k-focus']
            }], pagerAriaLabel: [{
                type: HostBinding,
                args: ['attr.aria-label']
            }], onFocusIn: [{
                type: HostListener,
                args: ['focusin', ['$event']]
            }], onFocusOut: [{
                type: HostListener,
                args: ['focusout']
            }], onEscape: [{
                type: HostListener,
                args: ['keydown.escape']
            }], onEnter: [{
                type: HostListener,
                args: ['keydown.enter', ['$event']]
            }], navigateToPreviousPage: [{
                type: HostListener,
                args: ['keydown.arrowleft', ['$event']]
            }, {
                type: HostListener,
                args: ['keydown.pageup', ['$event']]
            }], navigateToNextPage: [{
                type: HostListener,
                args: ['keydown.arrowright', ['$event']]
            }, {
                type: HostListener,
                args: ['keydown.pagedown', ['$event']]
            }], navigateToFirstPage: [{
                type: HostListener,
                args: ['keydown.home', ['$event']]
            }], navigateToLastPage: [{
                type: HostListener,
                args: ['keydown.end', ['$event']]
            }] } });

/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, ChangeDetectionStrategy, EventEmitter, HostBinding, Input, Output, ContentChild, ViewChild, ViewContainerRef, Inject, Optional, forwardRef, isDevMode } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, NgControl } from '@angular/forms';
import { L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
import { cloneDate } from '@progress/kendo-date-math';
import { hasObservers, KendoInput, Keys } from '@progress/kendo-angular-common';
import { validatePackage } from '@progress/kendo-licensing';
import { packageMetadata } from '../package-metadata';
import { MIN_DATE, MAX_DATE } from '../defaults';
import { minValidator } from '../validators/min.validator';
import { maxValidator } from '../validators/max.validator';
import { PreventableEvent } from '../preventable-event';
import { CalendarViewEnum } from '../calendar/models/view.enum';
import { CellTemplateDirective } from '../calendar/templates/cell-template.directive';
import { MonthCellTemplateDirective } from '../calendar/templates/month-cell-template.directive';
import { YearCellTemplateDirective } from '../calendar/templates/year-cell-template.directive';
import { DecadeCellTemplateDirective } from '../calendar/templates/decade-cell-template.directive';
import { CenturyCellTemplateDirective } from '../calendar/templates/century-cell-template.directive';
import { WeekNumberCellTemplateDirective } from '../calendar/templates/weeknumber-cell-template.directive';
import { HeaderTitleTemplateDirective } from '../calendar/templates/header-title-template.directive';
import { NavigationItemTemplateDirective } from '../calendar/templates/navigation-item-template.directive';
import { PickerService } from '../common/picker.service';
import { DisabledDatesService } from '../calendar/services/disabled-dates.service';
import { noop, isValidRange, setTime, isWindowAvailable, isTabExitingCalendar, getSizeClass, getRoundedClass, getFillModeClass, DEFAULT_FILL_MODE, DEFAULT_ROUNDED, DEFAULT_SIZE } from '../util';
import { TOUCH_ENABLED } from '../touch-enabled';
import { requiresZoneOnBlur, currentFocusTarget, attributeNames } from '../common/utils';
import { fromEvent } from 'rxjs';
import { incompleteDateValidator } from '../validators/incomplete-date.validator';
import { disabledDatesValidator } from '../validators/disabled-date.validator';
import * as i0 from "@angular/core";
import * as i1 from "@progress/kendo-angular-l10n";
import * as i2 from "@progress/kendo-angular-popup";
import * as i3 from "../common/picker.service";
import * as i4 from "../calendar/services/disabled-dates.service";
import * as i5 from "../dateinput/dateinput.component";
import * as i6 from "../calendar/calendar.component";
import * as i7 from "../calendar/localization/calendar-custom-messages.component";
import * as i8 from "./localization/datepicker-localized-messages.directive";
import * as i9 from "@progress/kendo-angular-common";
const MIN_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/DatePickerComponent/#toc-min';
const MAX_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/DatePickerComponent/#toc-max';
const VALUE_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/datepicker/#toc-using-with-json';
const DEFAULT_FORMAT = 'd';
const TWO_DIGIT_YEAR_MAX = 68;
/**
 * Represents the [Kendo UI DatePicker component for Angular]({% slug overview_datepicker %}#toc-basic-usage).
 */
export class DatePickerComponent {
    constructor(zone, localization, cdr, popupService, wrapper, renderer, injector, pickerService, disabledDatesService, touchEnabled) {
        this.zone = zone;
        this.localization = localization;
        this.cdr = cdr;
        this.popupService = popupService;
        this.wrapper = wrapper;
        this.renderer = renderer;
        this.injector = injector;
        this.pickerService = pickerService;
        this.disabledDatesService = disabledDatesService;
        this.touchEnabled = touchEnabled;
        /**
         * Defines the active view that the Calendar initially renders
         * ([see example]({% slug calendar_type_datepicker %}#toc-active-view)).
         * By default, the active view is `month`.
         *
         * > You have to set `activeView` within the `topView`-`bottomView` range.
         */
        this.activeView = CalendarViewEnum[CalendarViewEnum.month];
        /**
         * Defines the bottommost Calendar view to which the user can navigate
         * ([see example]({% slug calendar_type_datepicker %}#toc-focused-dates)).
         */
        this.bottomView = CalendarViewEnum[CalendarViewEnum.month];
        /**
         * Defines the topmost Calendar view to which the user can navigate
         * ([see example]({% slug calendar_type_datepicker %}#toc-focused-dates)).
         */
        this.topView = CalendarViewEnum[CalendarViewEnum.century];
        /**
         * Specifies the Calendar type.
         *
         * The possible values are:
         * - `infinite` (default)
         * - `classic`
         *
         */
        this.calendarType = 'infinite';
        /**
         * Determines whether to enable animation when navigating to previous/next Calendar view.
         * Applies to the [`classic`]({% slug api_dateinputs_datepickercomponent %}#toc-calendartype) Calendar only.
         *
         * > This feature uses the [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API). In order to run the animation in browsers that do not support it, you need the `web-animations-js` polyfill.
         *
         * @default false
         */
        this.animateCalendarNavigation = false;
        /**
         * Sets or gets the `disabled` property of the DatePicker and determines whether the component is active
         * ([see example]({% slug disabled_datepicker %})).
         */
        this.disabled = false;
        /**
         * Sets the read-only state of the DatePicker
         * ([see example]({% slug readonly_datepicker %}#toc-read-only-datepicker)).
         */
        this.readonly = false;
        /**
         * Sets the read-only state of the DatePicker input field
         * ([see example]({% slug readonly_datepicker %}#toc-read-only-input)).
         *
         * > Note that if you set the [`readonly`]({% slug api_dateinputs_datepickercomponent %}#toc-readonly) property value to `true`,
         * the input will be rendered in a read-only state regardless of the `readOnlyInput` value.
         */
        this.readOnlyInput = false;
        /**
         * Sets or gets the `navigation` property of the Calendar
         * and determines whether the navigation side-bar is displayed.
         * ([see example]({% slug sidebar_datepicker %})).
         */
        this.navigation = true;
        /**
         * Specifies the smallest valid date
         * ([see example]({% slug dateranges_datepicker %})).
         * By default, the `min` value is `1900-1-1`.
         */
        this.min = cloneDate(MIN_DATE);
        /**
         * Specifies the biggest valid date
         * ([see example]({% slug dateranges_datepicker %})).
         * By default, the `max` value is `2099-12-31`.
         */
        this.max = cloneDate(MAX_DATE);
        /**
         * Determines whether the built-in validation for incomplete dates is to be enforced when a form is being validated.
         */
        this.incompleteDateValidation = false;
        /**
         * Specifies the focused date of the Calendar component
         * ([see example]({% slug calendar_type_datepicker %}#toc-focused-dates)).
         */
        this.focusedDate = null;
        /**
         * Specifies the date format that is used to display the input value
         * ([see example]({% slug formats_datepicker %})).
         *
         * Format value options:
         * - `string` - Provide a `string` if a single format is going to be used regardless whether the input is focused or blurred.
         * - [`FormatSettings`]({% slug api_dateinputs_formatsettings %}) - To display different formats when the component is focused or blurred, provide a settings object with specified `inputFormat` and `displayFormat` values.
         */
        this.format = DEFAULT_FORMAT;
        /**
         * The maximum year to assume to be from the current century when typing two-digit year value
         * ([see example]({% slug formats_datepicker %}#toc-two-digit-year-format)).
         *
         * The default value is 68, indicating that typing any value less than 69
         * will be assumed to be 20xx, while 69 and larger will be assumed to be 19xx.
         */
        this.twoDigitYearMax = TWO_DIGIT_YEAR_MAX;
        /**
         * Specifies the hint the DatePicker displays when its value is `null`.
         * ([more information and exaples]({% slug placeholders_datepicker %})).
         *
         * @example
         * ```ts
         * _@Component({
         * selector: 'my-app',
         * template: `
         *  <kendo-datepicker placeholder="Enter birth date..."></kendo-datepicker>
         * `
         * })
         * export class AppComponent { }
         * ```
         */
        this.placeholder = null;
        /**
         * Sets or gets the `tabindex` property of the DatePicker.
         */
        this.tabindex = 0;
        /**
         * Sets the title of the input element of the DatePicker.
         */
        this.title = "";
        /**
         * Determines whether the built-in min or max validators are enforced when validating a form.
         */
        this.rangeValidation = true;
        /**
         * Determines whether the built-in validator for disabled
         * date ranges is enforced when validating a form
         * ([see example]({% slug disabled_dates_datepicker %}#toc-validation)).
         */
        this.disabledDatesValidation = true;
        /**
         * Determines whether to display a week number column in the `month` view of the Calendar
         * ([see example]({% slug calendar_type_datepicker %}#toc-week-number-column)).
         */
        this.weekNumber = false;
        /**
         * Fires each time the user selects a new value
         * ([more information and example]({% slug overview_datepicker %}#toc-events)).
         */
        this.valueChange = new EventEmitter();
        /**
         * Fires each time the user focuses the input element
         * ([more information and example]({% slug overview_datepicker %}#toc-events)).
         *
         * > To wire the event programmatically, use the `onFocus` property.
         *
         * @example
         * ```ts
         * _@Component({
         * selector: 'my-app',
         * template: `
         *  <kendo-datepicker (focus)="handleFocus()"></kendo-datepicker>
         * `
         * })
         * export class AppComponent {
         *   public handleFocus(): void {
         *      console.log("Component is focused");
         *   }
         * }
         * ```
         */
        this.onFocus = new EventEmitter();
        /**
         * Fires each time the input element gets blurred
         * ([more information and example]({% slug overview_datepicker %}#toc-events)).
         *
         * > To wire the event programmatically, use the `onBlur` property.
         *
         * @example
         * ```ts
         * _@Component({
         * selector: 'my-app',
         * template: `
         *  <kendo-datepicker (blur)="handleBlur()"></kendo-datepicker>
         * `
         * })
         * export class AppComponent {
         *   public handleBlur(): void {
         *      console.log("Component is blurred");
         *   }
         * }
         * ```
         */
        this.onBlur = new EventEmitter();
        /**
         * Fires each time the popup is about to open.
         * This event is preventable. If you cancel the event, the popup will remain closed
         * ([more information and example]({% slug overview_datepicker %}#toc-events)).
         */
        this.open = new EventEmitter();
        /**
         * Fires each time the popup is about to close.
         * This event is preventable. If you cancel the event, the popup will remain open
         * ([more information and example]({% slug overview_datepicker %}#toc-events)).
         */
        this.close = new EventEmitter();
        /**
         * @hidden
         */
        this.wrapperClasses = true;
        this._popupSettings = { animate: true };
        this._show = false;
        this._value = null;
        this._active = false;
        this.onControlChange = noop;
        this.onControlTouched = noop;
        this.onValidatorChange = noop;
        this.minValidateFn = noop;
        this.maxValidateFn = noop;
        this.disabledDatesValidateFn = noop;
        this.incompleteValidator = noop;
        this.resolvedPromise = Promise.resolve(null);
        this.domEvents = [];
        this._size = DEFAULT_SIZE;
        this._rounded = DEFAULT_ROUNDED;
        this._fillMode = DEFAULT_FILL_MODE;
        validatePackage(packageMetadata);
        this.pickerSubscriptions = this.pickerService.onFocus.subscribe(this.handleFocus.bind(this));
        this.pickerSubscriptions.add(this.pickerService.onBlur.subscribe(this.handleBlur.bind(this)));
        this.pickerSubscriptions.add(this.pickerService.sameDateSelected.subscribe(this.handleSameSelection.bind(this)));
        this.pickerSubscriptions.add(this.pickerService.dateCompletenessChange.subscribe(this.handleDateCompletenessChange.bind(this)));
    }
    /**
     * @hidden
     */
    set cellTemplateRef(template) {
        this.cellTemplate = template;
    }
    /**
     * @hidden
     */
    set monthCellTemplateRef(template) {
        this.monthCellTemplate = template;
    }
    /**
     * @hidden
     */
    set yearCellTemplateRef(template) {
        this.yearCellTemplate = template;
    }
    /**
     * @hidden
     */
    set decadeCellTemplateRef(template) {
        this.decadeCellTemplate = template;
    }
    /**
     * @hidden
     */
    set centuryCellTemplateRef(template) {
        this.centuryCellTemplate = template;
    }
    /**
     * @hidden
     */
    set weekNumberTemplateRef(template) {
        this.weekNumberTemplate = template;
    }
    /**
     * @hidden
     */
    set headerTitleTemplateRef(template) {
        this.headerTitleTemplate = template;
    }
    /**
     * @hidden
     */
    set navigationItemTemplateRef(template) {
        this.navigationItemTemplate = template;
    }
    /**
     * Configures the popup options of the DatePicker.
     *
     * The available options are:
     * - `animate: Boolean`&mdash;Controls the popup animation. By default, the open and close animations are enabled.
     * - `appendTo: 'root' | 'component' | ViewContainerRef`&mdash;Controls the popup container. By default, the popup will be appended to the root component.
     * - `popupClass: String`&mdash;Specifies a list of CSS classes that are used to style the popup.
     */
    set popupSettings(settings) {
        this._popupSettings = Object.assign({}, { animate: true }, settings);
    }
    get popupSettings() {
        return this._popupSettings;
    }
    /**
     * Specifies the value of the DatePicker component.
     *
     * > The `value` has to be a valid
     * [JavaScript `Date`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date) instance.
     */
    set value(value) {
        this.verifyValue(value);
        this._value = cloneDate(value);
    }
    get value() {
        return this._value;
    }
    /**
     * @hidden
     */
    set tabIndex(tabIndex) {
        this.tabindex = tabIndex;
    }
    get tabIndex() {
        return this.tabindex;
    }
    /**
     * Sets the dates of the DatePicker that will be disabled
     * ([see example]({% slug disabled_dates_datepicker %})).
     */
    set disabledDates(value) {
        this._disabledDates = value;
        this.disabledDatesService.initialize(value);
    }
    get disabledDates() {
        return this._disabledDates;
    }
    /**
     * Sets the size of the component.
     *
     * The possible values are:
     * * `small`
     * * `medium` (Default)
     * * `large`
     * * `none`
     *
     */
    set size(size) {
        this.renderer.removeClass(this.wrapper.nativeElement, getSizeClass('input', this.size));
        this.renderer.removeClass(this.toggleButton.nativeElement, getSizeClass('input', this.size));
        const newSize = size ? size : DEFAULT_SIZE;
        if (newSize !== 'none') {
            this.renderer.addClass(this.wrapper.nativeElement, getSizeClass('input', newSize));
            this.renderer.addClass(this.toggleButton.nativeElement, getSizeClass('input', newSize));
        }
        this._size = newSize;
    }
    get size() {
        return this._size;
    }
    /**
     * Sets the border radius of the component.
     *
     * The possible values are:
     * * `small`
     * * `medium` (Default)
     * * `large`
     * * `full`
     * * `none`
     *
     */
    set rounded(rounded) {
        this.renderer.removeClass(this.wrapper.nativeElement, getRoundedClass(this.rounded));
        const newRounded = rounded ? rounded : DEFAULT_ROUNDED;
        if (newRounded !== 'none') {
            this.renderer.addClass(this.wrapper.nativeElement, getRoundedClass(newRounded));
        }
        this._rounded = newRounded;
    }
    get rounded() {
        return this._rounded;
    }
    /**
     * Sets the fillMode of the component.
     *
     * The possible values are:
     * * `solid` (Default)
     * * `flat`
     * * `outline`
     * * `none`
     *
     */
    set fillMode(fillMode) {
        this.renderer.removeClass(this.wrapper.nativeElement, getFillModeClass('input', this.fillMode));
        this.renderer.removeClass(this.toggleButton.nativeElement, getFillModeClass('button', this.fillMode));
        this.renderer.removeClass(this.toggleButton.nativeElement, `k-button-${this.fillMode}-base`);
        const newFillMode = fillMode ? fillMode : DEFAULT_FILL_MODE;
        if (newFillMode !== 'none') {
            this.renderer.addClass(this.toggleButton.nativeElement, getFillModeClass('button', newFillMode));
            this.renderer.addClass(this.toggleButton.nativeElement, `k-button-${newFillMode}-base`);
            this.renderer.addClass(this.wrapper.nativeElement, getFillModeClass('input', newFillMode));
        }
        this._fillMode = newFillMode;
    }
    get fillMode() {
        return this._fillMode;
    }
    /**
     * @hidden
     */
    get disabledClass() {
        return this.disabled;
    }
    get popupUID() {
        var _a;
        return (_a = this.calendar) === null || _a === void 0 ? void 0 : _a.popupId;
    }
    ;
    get isActive() {
        return this._active;
    }
    set isActive(value) {
        this._active = value;
        if (!this.wrapper) {
            return;
        }
        const element = this.wrapper.nativeElement;
        if (value) {
            this.renderer.addClass(element, 'k-focus');
        }
        else {
            this.renderer.removeClass(element, 'k-focus');
        }
    }
    get show() {
        return this._show;
    }
    set show(show) {
        if (show && (this.disabled || this.readonly)) {
            return;
        }
        const skipZone = !show && (!this._show || !hasObservers(this.close));
        if (!skipZone) {
            this.zone.run(() => {
                this.togglePopup(show);
            });
        }
        else {
            this.togglePopup(show);
        }
    }
    /**
     * @hidden
     * Used by the TextBoxContainer to determine if the component is empty.
     */
    isEmpty() {
        return !this.value && this.input.isEmpty();
    }
    /**
     * @hidden
     */
    ngOnInit() {
        this.localizationChangeSubscription = this.localization
            .changes
            .subscribe(() => this.cdr.markForCheck());
        this.control = this.injector.get(NgControl, null);
        if (this.wrapper) {
            this.renderer.removeAttribute(this.wrapper.nativeElement, 'tabindex');
            this.zone.runOutsideAngular(() => {
                this.bindEvents();
            });
        }
    }
    ngAfterViewInit() {
        this.setComponentClasses();
    }
    /**
     * @hidden
     */
    ngOnChanges(changes) {
        this.verifySettings();
        if (changes.min || changes.max || changes.rangeValidation || changes.disabledDatesValidation || changes.disabledDates || changes.incompleteDateValidation) {
            this.minValidateFn = this.rangeValidation ? minValidator(this.min) : noop;
            this.maxValidateFn = this.rangeValidation ? maxValidator(this.max) : noop;
            this.disabledDatesValidateFn = this.disabledDatesValidation ? disabledDatesValidator(this.disabledDatesService.isDateDisabled) : noop;
            this.incompleteValidator = this.incompleteDateValidation ? incompleteDateValidator() : noop;
            this.onValidatorChange();
        }
    }
    /**
     * @hidden
     */
    ngOnDestroy() {
        this.isActive = false;
        this.show = false;
        if (this.localizationChangeSubscription) {
            this.localizationChangeSubscription.unsubscribe();
        }
        if (this.windowBlurSubscription) {
            this.windowBlurSubscription.unsubscribe();
        }
        this.domEvents.forEach(unbindCallback => unbindCallback());
        this.pickerSubscriptions.unsubscribe();
    }
    /**
     * Returns the current open state of the popup.
     */
    get isOpen() {
        return this.show;
    }
    /**
     * @hidden
     */
    writeValue(value) {
        this.verifyValue(value);
        this.value = cloneDate(value);
        this.cdr.markForCheck();
        if (!value && this.input) {
            this.input.placeholder = this.placeholder;
            this.input.writeValue(value);
        }
    }
    /**
     * @hidden
     */
    registerOnChange(fn) {
        this.onControlChange = fn;
    }
    /**
     * @hidden
     */
    registerOnTouched(fn) {
        this.onControlTouched = fn;
    }
    /**
     * @hidden
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this.cdr.markForCheck();
    }
    /**
     * @hidden
     */
    validate(control) {
        return this.minValidateFn(control) || this.maxValidateFn(control) || this.disabledDatesValidateFn(control) || this.incompleteValidator(control, this.input && this.input.isDateIncomplete);
    }
    /**
     * @hidden
     */
    registerOnValidatorChange(fn) {
        this.onValidatorChange = fn;
    }
    /**
     * Focuses the DatePicker component.
     *
     * @example
     * ```ts
     * _@Component({
     * selector: 'my-app',
     * template: `
     *  <button (click)="datepicker.focus()">Focus date picker</button>
     *  <kendo-datepicker #datepicker></kendo-datepicker>
     * `
     * })
     * export class AppComponent { }
     * ```
     */
    focus() {
        this.input.focus();
    }
    /**
     * Blurs the DatePicker component.
     */
    blur() {
        (this.calendar || this.input)['blur']();
    }
    /**
     * Toggles the visibility of the popup. If you use the `toggle` method to show or hide the popup,
     * the `open` and `close` events do not fire.
     *
     * @param show - The state of the popup.
     */
    toggle(show) {
        if (this.disabled || this.readonly) {
            return;
        }
        this.resolvedPromise.then(() => {
            this._toggle((show === undefined) ? !this.show : show);
        });
    }
    /**
     * @hidden
     */
    handleIconClick(event) {
        if (this.disabled || this.readonly) {
            return;
        }
        event.preventDefault();
        this.focusInput();
        //XXX: explicitly call the handleFocus handler here
        //due to async IE focus event
        this.handleFocus();
        this.show = !this.show;
        this.cdr.markForCheck();
    }
    /**
     * @hidden
     */
    handleMousedown(args) {
        args.preventDefault();
    }
    /**
     * @hidden
     */
    handleChange(value) {
        this.cdr.markForCheck();
        this.focusInput();
        this.value = value;
        this.show = false;
        this.onControlChange(cloneDate(value));
        this.valueChange.emit(cloneDate(value));
    }
    /**
     * @hidden
     */
    handleInputChange(value) {
        this.handleChange(this.input.formatSections.time ? value : this.mergeTime(value));
    }
    /**
     * @hidden
     */
    get popupClasses() {
        return [
            'k-calendar-container',
            'k-group',
            'k-reset'
        ].concat(this.popupSettings.popupClass || []);
    }
    /**
     * @hidden
     */
    get appendTo() {
        const { appendTo } = this.popupSettings;
        if (!appendTo || appendTo === 'root') {
            return undefined;
        }
        return appendTo === 'component' ? this.container : appendTo;
    }
    get input() {
        return this.pickerService.input;
    }
    get calendar() {
        return this.pickerService.calendar;
    }
    /**
     * @hidden
     */
    mergeTime(value) {
        return this.value && value ? setTime(value, this.value) : value;
    }
    /**
     * @hidden
     */
    handleKeydown(e) {
        const { altKey, shiftKey, keyCode, target } = e;
        if (keyCode === Keys.Escape) {
            this.show = false;
        }
        if (altKey) {
            if (keyCode === Keys.ArrowDown && !this.show) {
                this.show = true;
            }
            if (keyCode === Keys.ArrowUp) {
                this.show = false;
            }
        }
        if (keyCode === Keys.Tab && this.show && this.calendar.isActive && isTabExitingCalendar(this.calendarType, target, shiftKey)) {
            this.input.focus();
            this.show = false;
        }
    }
    togglePopup(show) {
        const event = new PreventableEvent();
        if (!this._show && show) {
            this.open.emit(event);
        }
        else if (this._show && !show) {
            this.close.emit(event);
        }
        if (event.isDefaultPrevented()) {
            return;
        }
        this._toggle(show);
        this.toggleFocus();
    }
    _toggle(show) {
        if (show === this._show) {
            return;
        }
        this._show = show;
        const inputElement = this.wrapper.nativeElement.querySelector('input');
        if (show) {
            const direction = this.localization.rtl ? 'right' : 'left';
            this.popupRef = this.popupService.open({
                anchor: this.wrapper,
                anchorAlign: { vertical: 'bottom', horizontal: direction },
                animate: this.popupSettings.animate,
                appendTo: this.appendTo,
                content: this.popupTemplate,
                popupAlign: { vertical: 'top', horizontal: direction },
                popupClass: this.popupClasses,
                positionMode: 'absolute'
            });
            if (this.calendar.type === 'infinite') {
                this.pickerSubscriptions.add(this.calendar.monthView.focusedCellChange.subscribe((id) => {
                    this.renderer.setAttribute(inputElement, attributeNames.ariaActiveDescendant, id);
                }));
            }
            else {
                this.pickerSubscriptions.add(this.calendar.multiViewCalendar.viewList.focusedCellChange.subscribe((id) => {
                    this.renderer.setAttribute(inputElement, attributeNames.ariaActiveDescendant, id);
                }));
            }
            this.popupRef.popupElement.setAttribute('id', this.popupUID);
            this.renderer.setAttribute(inputElement, attributeNames.ariaControls, this.popupUID);
            this.subscription = this.popupRef.popupAnchorViewportLeave.subscribe(() => this.show = false);
        }
        else {
            this.popupRef.close();
            this.popupRef = null;
            this.subscription.unsubscribe();
            this.renderer.removeAttribute(inputElement, attributeNames.ariaControls);
            this.renderer.removeAttribute(inputElement, attributeNames.ariaActiveDescendant);
            this.cdr.detectChanges();
        }
    }
    focusInput() {
        if (this.touchEnabled) {
            return;
        }
        this.input.focus();
    }
    toggleFocus() {
        if (!this.isActive) {
            return;
        }
        if (this.show) {
            if (!this.calendar) {
                this.cdr.detectChanges();
            }
            if (this.calendar) {
                this.calendar.focus();
            }
        }
        else if (!this.touchEnabled) {
            this.input.focus();
        }
        else if (!this.input.isActive) {
            this.handleBlur();
        }
    }
    verifySettings() {
        if (!isDevMode()) {
            return;
        }
        if (!isValidRange(this.min, this.max)) {
            throw new Error(`The max value should be bigger than the min. See ${MIN_DOC_LINK} and ${MAX_DOC_LINK}.`);
        }
    }
    verifyValue(value) {
        if (!isDevMode()) {
            return;
        }
        if (value && !(value instanceof Date)) {
            throw new Error(`The 'value' should be a valid JavaScript Date instance. Check ${VALUE_DOC_LINK} for possible resolution.`);
        }
    }
    bindEvents() {
        const element = this.wrapper.nativeElement;
        this.domEvents.push(this.renderer.listen(element, 'keydown', this.handleKeydown.bind(this)));
        if (isWindowAvailable()) {
            this.windowBlurSubscription = fromEvent(window, 'blur').subscribe(this.handleWindowBlur.bind(this));
        }
    }
    handleFocus() {
        if (this.isActive) {
            return;
        }
        this.isActive = true;
        if (hasObservers(this.onFocus)) {
            this.zone.run(() => {
                this.onFocus.emit();
            });
        }
    }
    handleWindowBlur() {
        if (!this.isOpen) {
            return;
        }
        this.show = false;
    }
    handleBlur(args) {
        const currentTarget = args && currentFocusTarget(args);
        if (currentTarget && (this.input.containsElement(currentTarget) ||
            (this.calendar && this.calendar.containsElement(currentTarget)))) {
            return;
        }
        if (hasObservers(this.onBlur) || (this.show && hasObservers(this.close)) || requiresZoneOnBlur(this.control)) {
            this.zone.run(() => {
                this.blurComponent();
                this.cdr.markForCheck();
            });
        }
        else {
            this.blurComponent();
        }
    }
    blurComponent() {
        this.isActive = false; // order is important ¯\_(ツ)_/¯
        this.show = false;
        this.cdr.detectChanges();
        this.onControlTouched();
        this.onBlur.emit();
    }
    handleSameSelection() {
        if (this.show) {
            this.focusInput();
            this.show = false;
        }
    }
    handleDateCompletenessChange() {
        this.cdr.markForCheck();
        this.zone.run(() => this.onValidatorChange());
    }
    setComponentClasses() {
        if (this.size) {
            this.renderer.addClass(this.wrapper.nativeElement, getSizeClass('input', this.size));
            this.renderer.addClass(this.toggleButton.nativeElement, getSizeClass('button', this.size));
        }
        if (this.rounded) {
            this.renderer.addClass(this.wrapper.nativeElement, getRoundedClass(this.rounded));
        }
        if (this.fillMode) {
            this.renderer.addClass(this.wrapper.nativeElement, getFillModeClass('input', this.fillMode));
            this.renderer.addClass(this.toggleButton.nativeElement, getFillModeClass('button', this.fillMode));
            this.renderer.addClass(this.toggleButton.nativeElement, `k-button-${this.fillMode}-base`);
        }
    }
}
DatePickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: DatePickerComponent, deps: [{ token: i0.NgZone }, { token: i1.LocalizationService }, { token: i0.ChangeDetectorRef }, { token: i2.PopupService }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.Injector }, { token: i3.PickerService }, { token: i4.DisabledDatesService }, { token: TOUCH_ENABLED, optional: true }], target: i0.ɵɵFactoryTarget.Component });
DatePickerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: DatePickerComponent, selector: "kendo-datepicker", inputs: { cellTemplateRef: ["cellTemplate", "cellTemplateRef"], monthCellTemplateRef: ["monthCellTemplate", "monthCellTemplateRef"], yearCellTemplateRef: ["yearCellTemplate", "yearCellTemplateRef"], decadeCellTemplateRef: ["decadeCellTemplate", "decadeCellTemplateRef"], centuryCellTemplateRef: ["centuryCellTemplate", "centuryCellTemplateRef"], weekNumberTemplateRef: ["weekNumberTemplate", "weekNumberTemplateRef"], headerTitleTemplateRef: ["headerTitleTemplate", "headerTitleTemplateRef"], navigationItemTemplateRef: ["navigationItemTemplate", "navigationItemTemplateRef"], activeView: "activeView", bottomView: "bottomView", topView: "topView", calendarType: "calendarType", animateCalendarNavigation: "animateCalendarNavigation", disabled: "disabled", readonly: "readonly", readOnlyInput: "readOnlyInput", popupSettings: "popupSettings", navigation: "navigation", min: "min", max: "max", incompleteDateValidation: "incompleteDateValidation", focusedDate: "focusedDate", value: "value", format: "format", twoDigitYearMax: "twoDigitYearMax", formatPlaceholder: "formatPlaceholder", placeholder: "placeholder", tabindex: "tabindex", tabIndex: "tabIndex", disabledDates: "disabledDates", title: "title", rangeValidation: "rangeValidation", disabledDatesValidation: "disabledDatesValidation", weekNumber: "weekNumber", size: "size", rounded: "rounded", fillMode: "fillMode" }, outputs: { valueChange: "valueChange", onFocus: "focus", onBlur: "blur", open: "open", close: "close" }, host: { properties: { "class.k-datepicker": "this.wrapperClasses", "class.k-input": "this.wrapperClasses", "class.k-disabled": "this.disabledClass" } }, providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DatePickerComponent), multi: true },
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => DatePickerComponent), multi: true },
        { provide: KendoInput, useExisting: forwardRef(() => DatePickerComponent) },
        LocalizationService,
        PickerService,
        DisabledDatesService,
        {
            provide: L10N_PREFIX,
            useValue: 'kendo.datepicker'
        }
    ], queries: [{ propertyName: "cellTemplate", first: true, predicate: CellTemplateDirective, descendants: true }, { propertyName: "monthCellTemplate", first: true, predicate: MonthCellTemplateDirective, descendants: true }, { propertyName: "yearCellTemplate", first: true, predicate: YearCellTemplateDirective, descendants: true }, { propertyName: "decadeCellTemplate", first: true, predicate: DecadeCellTemplateDirective, descendants: true }, { propertyName: "centuryCellTemplate", first: true, predicate: CenturyCellTemplateDirective, descendants: true }, { propertyName: "weekNumberTemplate", first: true, predicate: WeekNumberCellTemplateDirective, descendants: true }, { propertyName: "headerTitleTemplate", first: true, predicate: HeaderTitleTemplateDirective, descendants: true }, { propertyName: "navigationItemTemplate", first: true, predicate: NavigationItemTemplateDirective, descendants: true }], viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true, read: ViewContainerRef, static: true }, { propertyName: "popupTemplate", first: true, predicate: ["popupTemplate"], descendants: true, static: true }, { propertyName: "toggleButton", first: true, predicate: ["toggleButton"], descendants: true, static: true }], exportAs: ["kendo-datepicker"], usesOnChanges: true, ngImport: i0, template: `
        <ng-container kendoDatePickerLocalizedMessages
            i18n-today="kendo.datepicker.today|The label for the today button in the calendar header"
            today="Today"

            i18n-toggle="kendo.datepicker.toggle|The title of the toggle button in the datepicker component"
            toggle="Toggle calendar"

            i18n-prevButtonTitle="kendo.datepicker.prevButtonTitle|The title of the previous button in the Classic calendar"
            prevButtonTitle="Navigate to previous view"

            i18n-nextButtonTitle="kendo.datepicker.nextButtonTitle|The title of the next button in the Classic calendar"
            nextButtonTitle="Navigate to next view"
        >
        </ng-container>
        <kendo-dateinput
            #input
            [role]="'combobox'"
            pickerType="datepicker"
            hasPopup="grid"
            [isPopupOpen]="show"
            [disabled]="disabled"
            [readonly]="readonly || readOnlyInput"
            [ariaReadOnly]="readonly"
            [tabindex]="tabindex"
            [title]="title"
            [format]="format"
            [twoDigitYearMax]="twoDigitYearMax"
            [formatPlaceholder]="formatPlaceholder"
            [placeholder]="placeholder"
            [min]="min"
            [max]="max"
            [incompleteDateValidation]="incompleteDateValidation"
            fillMode="none"
            rounded="none"
            size="none"
            [value]="value"
            (valueChange)="handleInputChange($event)"
        ></kendo-dateinput>
        <button
            #toggleButton
            type="button"
            class="k-input-button k-button k-icon-button"
            [tabindex]="-1"
            [attr.title]="localization.get('toggle')"
            [attr.aria-label]="localization.get('toggle')"
            [kendoEventsOutsideAngular]="{
                click: handleIconClick,
                mousedown: handleMousedown
            }"
            [scope]="this"
        >
            <span class="k-button-icon k-icon k-i-calendar"></span>
        </button>
        <ng-container #container></ng-container>
        <ng-template #popupTemplate>
            <kendo-calendar
                #calendar
                [type]="calendarType"
                [min]="min"
                [max]="max"
                [navigation]="navigation"
                [animateNavigation]="animateCalendarNavigation"
                [activeView]="activeView"
                [bottomView]="bottomView"
                [topView]="topView"
                [weekNumber]="weekNumber"
                [cellTemplate]="cellTemplate"
                [monthCellTemplate]="monthCellTemplate"
                [yearCellTemplate]="yearCellTemplate"
                [decadeCellTemplate]="decadeCellTemplate"
                [centuryCellTemplate]="centuryCellTemplate"
                [weekNumberTemplate]="weekNumberTemplate"
                [headerTitleTemplate]="headerTitleTemplate"
                [navigationItemTemplate]="navigationItemTemplate"
                [focusedDate]="focusedDate"
                [value]="value"
                (valueChange)="handleChange(mergeTime($event))"
                [kendoEventsOutsideAngular]="{
                    keydown: handleKeydown
                }"
                [scope]="this"
                [disabledDates]="disabledDates"
            >
                <kendo-calendar-messages
                    [today]="localization.get('today')"
                    [prevButtonTitle]="localization.get('prevButtonTitle')"
                    [nextButtonTitle]="localization.get('nextButtonTitle')"
                >
                </kendo-calendar-messages>
            </kendo-calendar>
        <ng-template>
    `, isInline: true, components: [{ type: i5.DateInputComponent, selector: "kendo-dateinput", inputs: ["focusableId", "pickerType", "disabled", "readonly", "title", "tabindex", "role", "ariaReadOnly", "tabIndex", "format", "formatPlaceholder", "placeholder", "steps", "max", "min", "rangeValidation", "autoCorrect", "incompleteDateValidation", "twoDigitYearMax", "value", "spinners", "isPopupOpen", "hasPopup", "size", "rounded", "fillMode"], outputs: ["valueChange", "valueUpdate", "focus", "blur"], exportAs: ["kendo-dateinput"] }, { type: i6.CalendarComponent, selector: "kendo-calendar", inputs: ["id", "focusedDate", "min", "max", "rangeValidation", "selection", "value", "disabled", "tabindex", "tabIndex", "disabledDates", "navigation", "activeView", "bottomView", "topView", "type", "animateNavigation", "weekNumber", "cellTemplate", "monthCellTemplate", "yearCellTemplate", "decadeCellTemplate", "centuryCellTemplate", "weekNumberTemplate", "headerTitleTemplate", "navigationItemTemplate"], outputs: ["activeViewChange", "navigate", "activeViewDateChange", "blur", "focus", "valueChange"], exportAs: ["kendo-calendar"] }, { type: i7.CalendarCustomMessagesComponent, selector: "kendo-calendar-messages" }], directives: [{ type: i8.DatePickerLocalizedMessagesDirective, selector: "[kendoDatePickerLocalizedMessages]" }, { type: i9.EventsOutsideAngularDirective, selector: "[kendoEventsOutsideAngular]", inputs: ["kendoEventsOutsideAngular", "scope"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: DatePickerComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    exportAs: 'kendo-datepicker',
                    providers: [
                        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DatePickerComponent), multi: true },
                        { provide: NG_VALIDATORS, useExisting: forwardRef(() => DatePickerComponent), multi: true },
                        { provide: KendoInput, useExisting: forwardRef(() => DatePickerComponent) },
                        LocalizationService,
                        PickerService,
                        DisabledDatesService,
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.datepicker'
                        }
                    ],
                    selector: 'kendo-datepicker',
                    template: `
        <ng-container kendoDatePickerLocalizedMessages
            i18n-today="kendo.datepicker.today|The label for the today button in the calendar header"
            today="Today"

            i18n-toggle="kendo.datepicker.toggle|The title of the toggle button in the datepicker component"
            toggle="Toggle calendar"

            i18n-prevButtonTitle="kendo.datepicker.prevButtonTitle|The title of the previous button in the Classic calendar"
            prevButtonTitle="Navigate to previous view"

            i18n-nextButtonTitle="kendo.datepicker.nextButtonTitle|The title of the next button in the Classic calendar"
            nextButtonTitle="Navigate to next view"
        >
        </ng-container>
        <kendo-dateinput
            #input
            [role]="'combobox'"
            pickerType="datepicker"
            hasPopup="grid"
            [isPopupOpen]="show"
            [disabled]="disabled"
            [readonly]="readonly || readOnlyInput"
            [ariaReadOnly]="readonly"
            [tabindex]="tabindex"
            [title]="title"
            [format]="format"
            [twoDigitYearMax]="twoDigitYearMax"
            [formatPlaceholder]="formatPlaceholder"
            [placeholder]="placeholder"
            [min]="min"
            [max]="max"
            [incompleteDateValidation]="incompleteDateValidation"
            fillMode="none"
            rounded="none"
            size="none"
            [value]="value"
            (valueChange)="handleInputChange($event)"
        ></kendo-dateinput>
        <button
            #toggleButton
            type="button"
            class="k-input-button k-button k-icon-button"
            [tabindex]="-1"
            [attr.title]="localization.get('toggle')"
            [attr.aria-label]="localization.get('toggle')"
            [kendoEventsOutsideAngular]="{
                click: handleIconClick,
                mousedown: handleMousedown
            }"
            [scope]="this"
        >
            <span class="k-button-icon k-icon k-i-calendar"></span>
        </button>
        <ng-container #container></ng-container>
        <ng-template #popupTemplate>
            <kendo-calendar
                #calendar
                [type]="calendarType"
                [min]="min"
                [max]="max"
                [navigation]="navigation"
                [animateNavigation]="animateCalendarNavigation"
                [activeView]="activeView"
                [bottomView]="bottomView"
                [topView]="topView"
                [weekNumber]="weekNumber"
                [cellTemplate]="cellTemplate"
                [monthCellTemplate]="monthCellTemplate"
                [yearCellTemplate]="yearCellTemplate"
                [decadeCellTemplate]="decadeCellTemplate"
                [centuryCellTemplate]="centuryCellTemplate"
                [weekNumberTemplate]="weekNumberTemplate"
                [headerTitleTemplate]="headerTitleTemplate"
                [navigationItemTemplate]="navigationItemTemplate"
                [focusedDate]="focusedDate"
                [value]="value"
                (valueChange)="handleChange(mergeTime($event))"
                [kendoEventsOutsideAngular]="{
                    keydown: handleKeydown
                }"
                [scope]="this"
                [disabledDates]="disabledDates"
            >
                <kendo-calendar-messages
                    [today]="localization.get('today')"
                    [prevButtonTitle]="localization.get('prevButtonTitle')"
                    [nextButtonTitle]="localization.get('nextButtonTitle')"
                >
                </kendo-calendar-messages>
            </kendo-calendar>
        <ng-template>
    `
                }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: i1.LocalizationService }, { type: i0.ChangeDetectorRef }, { type: i2.PopupService }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.Injector }, { type: i3.PickerService }, { type: i4.DisabledDatesService }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [TOUCH_ENABLED]
                }] }]; }, propDecorators: { container: [{
                type: ViewChild,
                args: ['container', { read: ViewContainerRef, static: true }]
            }], popupTemplate: [{
                type: ViewChild,
                args: ['popupTemplate', { static: true }]
            }], toggleButton: [{
                type: ViewChild,
                args: ['toggleButton', { static: true }]
            }], cellTemplate: [{
                type: ContentChild,
                args: [CellTemplateDirective, { static: false }]
            }], cellTemplateRef: [{
                type: Input,
                args: ['cellTemplate']
            }], monthCellTemplate: [{
                type: ContentChild,
                args: [MonthCellTemplateDirective, { static: false }]
            }], monthCellTemplateRef: [{
                type: Input,
                args: ['monthCellTemplate']
            }], yearCellTemplate: [{
                type: ContentChild,
                args: [YearCellTemplateDirective, { static: false }]
            }], yearCellTemplateRef: [{
                type: Input,
                args: ['yearCellTemplate']
            }], decadeCellTemplate: [{
                type: ContentChild,
                args: [DecadeCellTemplateDirective, { static: false }]
            }], decadeCellTemplateRef: [{
                type: Input,
                args: ['decadeCellTemplate']
            }], centuryCellTemplate: [{
                type: ContentChild,
                args: [CenturyCellTemplateDirective, { static: false }]
            }], centuryCellTemplateRef: [{
                type: Input,
                args: ['centuryCellTemplate']
            }], weekNumberTemplate: [{
                type: ContentChild,
                args: [WeekNumberCellTemplateDirective, { static: false }]
            }], weekNumberTemplateRef: [{
                type: Input,
                args: ['weekNumberTemplate']
            }], headerTitleTemplate: [{
                type: ContentChild,
                args: [HeaderTitleTemplateDirective, { static: false }]
            }], headerTitleTemplateRef: [{
                type: Input,
                args: ['headerTitleTemplate']
            }], navigationItemTemplate: [{
                type: ContentChild,
                args: [NavigationItemTemplateDirective, { static: false }]
            }], navigationItemTemplateRef: [{
                type: Input,
                args: ['navigationItemTemplate']
            }], activeView: [{
                type: Input
            }], bottomView: [{
                type: Input
            }], topView: [{
                type: Input
            }], calendarType: [{
                type: Input
            }], animateCalendarNavigation: [{
                type: Input
            }], disabled: [{
                type: Input
            }], readonly: [{
                type: Input
            }], readOnlyInput: [{
                type: Input
            }], popupSettings: [{
                type: Input
            }], navigation: [{
                type: Input
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }], incompleteDateValidation: [{
                type: Input
            }], focusedDate: [{
                type: Input
            }], value: [{
                type: Input
            }], format: [{
                type: Input
            }], twoDigitYearMax: [{
                type: Input
            }], formatPlaceholder: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], tabIndex: [{
                type: Input
            }], disabledDates: [{
                type: Input
            }], title: [{
                type: Input
            }], rangeValidation: [{
                type: Input
            }], disabledDatesValidation: [{
                type: Input
            }], weekNumber: [{
                type: Input
            }], size: [{
                type: Input
            }], rounded: [{
                type: Input
            }], fillMode: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], onFocus: [{
                type: Output,
                args: ['focus']
            }], onBlur: [{
                type: Output,
                args: ['blur']
            }], open: [{
                type: Output
            }], close: [{
                type: Output
            }], wrapperClasses: [{
                type: HostBinding,
                args: ['class.k-datepicker']
            }, {
                type: HostBinding,
                args: ['class.k-input']
            }], disabledClass: [{
                type: HostBinding,
                args: ['class.k-disabled']
            }] } });

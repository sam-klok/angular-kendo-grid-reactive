/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, ChangeDetectionStrategy, EventEmitter, HostBinding, Input, Output, ViewChild, ViewContainerRef, Inject, Optional, forwardRef, isDevMode } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, NgControl } from '@angular/forms';
import { L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
import { cloneDate, isEqual } from '@progress/kendo-date-math';
import { hasObservers, KendoInput, Keys } from '@progress/kendo-angular-common';
import { validatePackage } from '@progress/kendo-licensing';
import { packageMetadata } from '../package-metadata';
import { MIDNIGHT_DATE, MIN_TIME, MAX_TIME } from '../defaults';
import { PickerService } from '../common/picker.service';
import { requiresZoneOnBlur, currentFocusTarget, attributeNames } from '../common/utils';
import { TIME_PART } from './models/time-part.default';
import { PreventableEvent } from '../preventable-event';
import { noop, setTime, isWindowAvailable, getFillModeClass, getSizeClass, getRoundedClass, DEFAULT_FILL_MODE, DEFAULT_ROUNDED, DEFAULT_SIZE } from '../util';
import { timeRangeValidator } from '../validators/time-range.validator';
import { TOUCH_ENABLED } from '../touch-enabled';
import { fromEvent } from 'rxjs';
import { incompleteDateValidator } from '../validators/incomplete-date.validator';
import { BusViewService } from '../calendar/services/bus-view.service';
import * as i0 from "@angular/core";
import * as i1 from "../calendar/services/bus-view.service";
import * as i2 from "@progress/kendo-angular-l10n";
import * as i3 from "@progress/kendo-angular-popup";
import * as i4 from "../common/picker.service";
import * as i5 from "@progress/kendo-angular-intl";
import * as i6 from "../dateinput/dateinput.component";
import * as i7 from "./timeselector.component";
import * as i8 from "./localization/timeselector-custom-messages.component";
import * as i9 from "./localization/timepicker-localized-messages.directive";
import * as i10 from "@progress/kendo-angular-common";
const VALUE_DOC_LINK = 'https://www.telerik.com/kendo-angular-ui/components/dateinputs/timepicker/#toc-integration-with-json';
const INTL_DATE_FORMAT = 'https://github.com/telerik/kendo-intl/blob/master/docs/date-formatting/index.md';
const formatRegExp = new RegExp(`${TIME_PART.hour}|${TIME_PART.minute}|${TIME_PART.second}|${TIME_PART.millisecond}|${TIME_PART.dayperiod}|literal`);
/**
 * Represents the [Kendo UI TimePicker component for Angular]({% slug overview_timepicker %}#toc-basic-usage).
 */
export class TimePickerComponent {
    constructor(bus, zone, localization, cdr, popupService, wrapper, renderer, injector, pickerService, intl, touchEnabled) {
        this.bus = bus;
        this.zone = zone;
        this.localization = localization;
        this.cdr = cdr;
        this.popupService = popupService;
        this.wrapper = wrapper;
        this.renderer = renderer;
        this.injector = injector;
        this.pickerService = pickerService;
        this.intl = intl;
        this.touchEnabled = touchEnabled;
        /**
         * Sets or gets the `disabled` property of the TimePicker and
         * determines whether the component is active
         * ([see example]({% slug disabled_timepicker %})).
         */
        this.disabled = false;
        /**
         * Sets the read-only state of the TimePicker
         * ([see example]({% slug readonly_timepicker %}#toc-read-only-timepicker)).
         */
        this.readonly = false;
        /**
         * Sets the read-only state of the TimePicker input field
         * ([see example]({% slug readonly_timepicker %}#toc-read-only-input)).
         *
         * > Note that if you set the [`readonly`]({% slug api_dateinputs_timepickercomponent %}#toc-readonly) property value to `true`,
         * the input will be rendered in a read-only state regardless of the `readOnlyInput` value.
         */
        this.readOnlyInput = false;
        /**
         * Specifies the time format that is used to display the input value
         * ([see example]({% slug formats_timepicker %})).
         */
        this.format = 't';
        /**
         * Specifies the hint the TimePicker displays when its value is `null`.
         * For more information, refer to the article on
         * [placeholders]({% slug placeholders_timepicker %}).
         *
         * @example
         * ```ts
         * _@Component({
         * selector: 'my-app',
         * template: `
         *  <kendo-timepicker placeholder="Enter start..."></kendo-timepicker>
         * `
         * })
         * export class AppComponent { }
         * ```
         */
        this.placeholder = null;
        /**
         * Determines whether the built-in validation for incomplete dates is to be enforced when a form is being validated.
         */
        this.incompleteDateValidation = false;
        /**
         * Determines whether to display the **Cancel** button in the popup.
         */
        this.cancelButton = true;
        /**
         * Determines whether to display the **Now** button in the popup.
         *
         * > If the current time is out of range or the incremental step is greater than `1`, the **Now** button will be hidden.
         */
        this.nowButton = true;
        /**
         * Sets or gets the `tabindex` property of the TimePicker.
         */
        this.tabindex = 0;
        /**
         * Sets the title of the input element of the TimePicker.
         */
        this.title = "";
        /**
         * Determines whether the built-in min or max validators are enforced when a form is being validated.
         */
        this.rangeValidation = true;
        /**
         * Fires each time the user selects a new value.
         * For more information, refer to the section on
         * [events]({% slug overview_timepicker %}#toc-events).
         */
        this.valueChange = new EventEmitter();
        /**
         * Fires each time the user focuses the input element.
         * For more information, refer to the section on
         * [events]({% slug overview_timepicker %}#toc-events).
         *
         * > To wire the event programmatically, use the `onFocus` property.
         *
         * @example
         * ```ts
         * _@Component({
         * selector: 'my-app',
         * template: `
         *  <kendo-timepicker (focus)="handleFocus()"></kendo-timepicker>
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
         * Fires each time the input element gets blurred.
         * For more information, refer to the section on
         * [events]({% slug overview_timepicker %}#toc-events).
         *
         * > To wire the event programmatically, use the `onBlur` property.
         *
         * @example
         * ```ts
         * _@Component({
         * selector: 'my-app',
         * template: `
         *  <kendo-timepicker (blur)="handleBlur()"></kendo-timepicker>
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
         * This event is preventable. If you cancel the event, the popup will remain closed.
         * For more information, refer to the section on
         * [events]({% slug overview_timepicker %}#toc-events).
         */
        this.open = new EventEmitter();
        /**
         * Fires each time the popup is about to close.
         * This event is preventable. If you cancel the event, the popup will remain open.
         * For more information, refer to the section on
         * [events]({% slug overview_timepicker %}#toc-events).
         */
        this.close = new EventEmitter();
        /**
         * @hidden
         */
        this.wrapperClasses = true;
        this.onControlChange = noop;
        this.onControlTouched = noop;
        this.onValidatorChange = noop;
        this.resolvedPromise = Promise.resolve(null);
        this.timeRangeValidateFn = noop;
        this.incompleteValidator = noop;
        this._min = cloneDate(MIN_TIME);
        this._max = cloneDate(MAX_TIME);
        this._popupSettings = { animate: true };
        this._show = false;
        this._steps = {};
        this._value = null;
        this._active = false;
        this.domEvents = [];
        this._size = DEFAULT_SIZE;
        this._rounded = DEFAULT_ROUNDED;
        this._fillMode = DEFAULT_FILL_MODE;
        validatePackage(packageMetadata);
        this.pickerSubscriptions = this.pickerService.onFocus.subscribe(this.handleFocus.bind(this));
        this.pickerSubscriptions.add(this.pickerService.onBlur.subscribe(this.handleBlur.bind(this)));
        this.pickerSubscriptions.add(this.pickerService.dateCompletenessChange.subscribe(this.handleDateCompletenessChange.bind(this)));
    }
    /**
     * Specifies the smallest valid time value
     * ([see example]({% slug timeranges_timepicker %})).
     */
    set min(min) {
        this._min = cloneDate(min || MIN_TIME);
    }
    get min() {
        return this._min;
    }
    /**
     * Specifies the biggest valid time value
     * ([see example]({% slug timeranges_timepicker %})).
     */
    set max(max) {
        this._max = cloneDate(max || MAX_TIME);
    }
    get max() {
        return this._max;
    }
    /**
     * Configures the incremental steps of the TimePicker.
     * For more information, refer to the article on
     * [incremental steps]({% slug incrementalsteps_timepicker %}).
     *
     * > If the incremental step is greater than `1`, the **Now** button will be hidden.
     *
     * @example
     * ```ts
     * _@Component({
     * selector: 'my-app',
     * template: `
     *  <kendo-timepicker format="HH:mm:ss" [steps]="steps"></kendo-timepicker>
     * `
     * })
     * class AppComponent {
     *   public steps = { hour: 2, minute: 15, second: 15, millisecond: 10 };
     * }
     * ```
     *
     */
    set steps(steps) {
        this._steps = steps || {};
    }
    get steps() {
        return this._steps;
    }
    /**
     * Configures the popup of the TimePicker.
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
     * @hidden
     */
    set tabIndex(tabIndex) {
        this.tabindex = tabIndex;
    }
    get tabIndex() {
        return this.tabindex;
    }
    /**
     * Specifies the value of the TimePicker component.
     */
    set value(value) {
        this.verifyValue(value);
        this._value = cloneDate(value);
    }
    get value() {
        return this._value;
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
            this.renderer.addClass(this.wrapper.nativeElement, getFillModeClass('input', newFillMode));
            this.renderer.addClass(this.toggleButton.nativeElement, getFillModeClass('button', newFillMode));
            this.renderer.addClass(this.toggleButton.nativeElement, `k-button-${newFillMode}-base`);
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
        return `k-timepicker-popup-${this.bus.calendarId}-`;
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
    get input() {
        return this.pickerService.input;
    }
    get timeSelector() {
        return this.pickerService.timeSelector;
    }
    /**
     * @hidden
     * Used by the TextBoxContainer to determine if the component is empty
     */
    isEmpty() {
        return !this.value && this.input.isEmpty();
    }
    /**
     * @hidden
     */
    ngOnInit() {
        this.localizationChangeSubscription = this.localization
            .changes.subscribe(() => this.cdr.markForCheck());
        this.control = this.injector.get(NgControl, null);
        if (this.wrapper) {
            this.renderer.removeAttribute(this.wrapper.nativeElement, 'tabindex');
            this.zone.runOutsideAngular(() => {
                this.bindEvents();
            });
        }
    }
    /**
     * @hidden
     */
    ngAfterViewInit() {
        this.setComponentClasses();
    }
    /**
     * @hidden
     */
    ngOnChanges(changes) {
        if (changes.min || changes.max || changes.rangeValidation || changes.incompleteDateValidation) {
            this.timeRangeValidateFn = this.rangeValidation ? timeRangeValidator(this.min, this.max) : noop;
            this.incompleteValidator = this.incompleteDateValidation ? incompleteDateValidator() : noop;
            this.onValidatorChange();
        }
        if (changes.format) {
            this.verifyFormat();
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
     * @hidden
     */
    handleKeydown(event) {
        const { altKey, keyCode } = event;
        if (keyCode === Keys.Escape) {
            this.show = false;
            this.cdr.detectChanges();
            return;
        }
        if (altKey) {
            if (keyCode === Keys.ArrowUp) {
                event.preventDefault();
                this.show = false;
                this.cdr.detectChanges();
            }
            if (keyCode === Keys.ArrowDown && !this.show) {
                event.preventDefault();
                this.show = true;
            }
        }
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
        return this.timeRangeValidateFn(control) || this.incompleteValidator(control, this.input && this.input.isDateIncomplete);
    }
    /**
     * @hidden
     */
    registerOnValidatorChange(fn) {
        this.onValidatorChange = fn;
    }
    /**
     * Focuses the TimePicker component.
     *
     * @example
     * ```ts
     * _@Component({
     * selector: 'my-app',
     * template: `
     *  <button (click)="timepicker.focus()">Focus time picker</button>
     *  <kendo-timepicker #timepicker></kendo-timepicker>
     * `
     * })
     * export class AppComponent { }
     * ```
     */
    focus() {
        this.input.focus();
    }
    /**
     * Blurs the TimePicker component.
     */
    blur() {
        (this.timeSelector || this.input)['blur']();
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
     * Returns the current open state of the popup.
     */
    get isOpen() {
        return this.show;
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
    /**
     * @hidden
     */
    handleChange(value) {
        if (isEqual(this.value, value)) {
            this.focusInput();
            this.show = false;
            return;
        }
        this.value = cloneDate(value);
        this.zone.run(() => {
            this.focusInput();
            this.show = false;
            this.onControlChange(cloneDate(value));
            this.valueChange.emit(cloneDate(value));
        });
    }
    /**
     * @hidden
     */
    handleReject() {
        this.show = false;
    }
    /**
     * @hidden
     */
    handleInputChange(value) {
        const val = this.input.formatSections.date ? value : this.mergeTime(value);
        this.handleChange(val);
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
    handleIconClick(event) {
        if (this.disabled || this.readonly) {
            return;
        }
        event.preventDefault();
        this.focusInput();
        //XXX: explicit call handleFocus handler here
        //due to async IE focus event
        this.handleFocus();
        this.show = !this.show;
        this.cdr.detectChanges();
    }
    /**
     * @hidden
     */
    get popupClasses() {
        return [
            'k-group',
            'k-reset'
        ].concat(this.popupSettings.popupClass || []);
    }
    /**
     * @hidden
     */
    normalizeTime(date) {
        return setTime(MIDNIGHT_DATE, date);
    }
    /**
     * @hidden
     */
    mergeTime(value) {
        return this.value && value ? setTime(this.value, value) : value;
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
        if (show === this.isOpen) {
            return;
        }
        this._show = show;
        this.cdr.markForCheck();
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
            this.popupRef.popupElement.setAttribute('id', this.popupUID);
            this.renderer.setAttribute(inputElement, attributeNames.ariaControls, this.popupUID);
            this.popupRef.popupAnchorViewportLeave.subscribe(() => this.show = false);
        }
        else {
            this.popupRef.close();
            this.popupRef = null;
            this.renderer.removeAttribute(inputElement, attributeNames.ariaControls);
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
            if (!this.timeSelector) {
                this.cdr.detectChanges();
            }
            if (this.isActive) {
                this.timeSelector.focus();
            }
        }
        else if (!this.touchEnabled) {
            this.input.focus();
        }
        else if (!this.input.isActive) {
            this.handleBlur();
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
    verifyFormat() {
        if (!isDevMode()) {
            return;
        }
        const formatContainsDateParts = this.intl.splitDateFormat(this.format).some(part => !formatRegExp.test(part.type));
        if (formatContainsDateParts) {
            throw new Error(`Provided format is not supported. Supported specifiers are T|t|H|h|m|s|S|a. See ${INTL_DATE_FORMAT}`);
        }
    }
    bindEvents() {
        const element = this.wrapper.nativeElement;
        this.domEvents.push(this.renderer.listen(element, 'keydown', this.handleKeydown.bind(this)));
        if (isWindowAvailable()) {
            this.windowBlurSubscription = fromEvent(window, 'blur').subscribe(this.handleWindowBlur.bind(this));
        }
    }
    handleWindowBlur() {
        if (!this.isOpen) {
            return;
        }
        this.show = false;
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
    handleBlur(args) {
        const currentTarget = args && currentFocusTarget(args);
        if (currentTarget && (this.input.containsElement(currentTarget) ||
            (this.timeSelector && this.timeSelector.containsElement(currentTarget)))) {
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
        this.cdr.detectChanges();
    }
    blurComponent() {
        this.isActive = false; // order is important ¯\_(ツ)_/¯
        this.show = false;
        this.onControlTouched();
        this.onBlur.emit();
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
TimePickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: TimePickerComponent, deps: [{ token: i1.BusViewService }, { token: i0.NgZone }, { token: i2.LocalizationService }, { token: i0.ChangeDetectorRef }, { token: i3.PopupService }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.Injector }, { token: i4.PickerService }, { token: i5.IntlService }, { token: TOUCH_ENABLED, optional: true }], target: i0.ɵɵFactoryTarget.Component });
TimePickerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: TimePickerComponent, selector: "kendo-timepicker", inputs: { disabled: "disabled", readonly: "readonly", readOnlyInput: "readOnlyInput", format: "format", formatPlaceholder: "formatPlaceholder", placeholder: "placeholder", min: "min", max: "max", incompleteDateValidation: "incompleteDateValidation", cancelButton: "cancelButton", nowButton: "nowButton", steps: "steps", popupSettings: "popupSettings", tabindex: "tabindex", tabIndex: "tabIndex", title: "title", rangeValidation: "rangeValidation", value: "value", size: "size", rounded: "rounded", fillMode: "fillMode" }, outputs: { valueChange: "valueChange", onFocus: "focus", onBlur: "blur", open: "open", close: "close" }, host: { properties: { "class.k-timepicker": "this.wrapperClasses", "class.k-input": "this.wrapperClasses", "class.k-disabled": "this.disabledClass" } }, providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TimePickerComponent), multi: true },
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => TimePickerComponent), multi: true },
        { provide: KendoInput, useExisting: forwardRef(() => TimePickerComponent) },
        LocalizationService,
        BusViewService,
        {
            provide: L10N_PREFIX,
            useValue: 'kendo.timepicker'
        },
        PickerService
    ], viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true, read: ViewContainerRef }, { propertyName: "popupTemplate", first: true, predicate: ["popupTemplate"], descendants: true }, { propertyName: "toggleButton", first: true, predicate: ["toggleButton"], descendants: true, static: true }], exportAs: ["kendo-timepicker"], usesOnChanges: true, ngImport: i0, template: `
        <ng-container kendoTimePickerLocalizedMessages
            i18n-accept="kendo.timepicker.accept|The Accept button text in the timepicker component"
            accept="Set"

            i18n-acceptLabel="kendo.timepicker.acceptLabel|The label for the Accept button in the timepicker component"
            acceptLabel="Set time"

            i18n-cancel="kendo.timepicker.cancel|The Cancel button text in the timepicker component"
            cancel="Cancel"

            i18n-cancelLabel="kendo.timepicker.cancelLabel|The label for the Cancel button in the timepicker component"
            cancelLabel="Cancel changes"

            i18n-now="kendo.timepicker.now|The Now button text in the timepicker component"
            now="Now"

            i18n-nowLabel="kendo.timepicker.nowLabel|The label for the Now button in the timepicker component"
            nowLabel="Select now"

            i18n-toggle="kendo.timepicker.toggle|The label for the toggle button in the timepicker component"
            toggle="Toggle time list"

            i18n-hour="kendo.timepicker.hour|The label for the hour part in the timepicker component"
            hour="Hour"

            i18n-minute="kendo.timepicker.minute|The label for the minute part in the timepicker component"
            minute="Minute"

            i18n-second="kendo.timepicker.second|The label for the second part in the timepicker component"
            second="Second"

            i18n-millisecond="kendo.timepicker.millisecond|The label for the millisecond part in the timepicker component"
            millisecond="Millisecond"

            i18n-dayperiod="kendo.timepicker.dayperiod|The label for the dayperiod part in the timepicker component"
            dayperiod="Dayperiod"
        >
        </ng-container>
        <kendo-dateinput
            #input
            pickerType="timepicker"
            hasPopup="dialog"
            [isPopupOpen]="show"
            [disabled]="disabled"
            [readonly]="readonly || readOnlyInput"
            [role]="'combobox'"
            [ariaReadOnly]="readonly"
            [format]="format"
            [formatPlaceholder]="formatPlaceholder"
            [placeholder]="placeholder"
            [min]="normalizeTime(min)"
            [max]="normalizeTime(max)"
            [incompleteDateValidation]="incompleteDateValidation"
            [fillMode]="fillMode"
            [rounded]="rounded"
            [size]="size"
            [steps]="steps"
            [tabindex]="!show ? tabindex : -1"
            [title]="title"
            [value]="value"
            (valueChange)="handleInputChange($event)"
        ></kendo-dateinput>
        <button
            #toggleButton
            type="button"
            tabindex="-1"
            class="k-input-button k-button k-icon-button"
            [attr.title]="localization.get('toggle')"
            [attr.aria-label]="localization.get('toggle')"
            [kendoEventsOutsideAngular]="{
                click: handleIconClick,
                mousedown: handleMousedown
            }"
            [scope]="this"
        >
            <span class="k-button-icon k-icon k-i-clock"></span>
        </button>
        <ng-template #popupTemplate>
            <kendo-timeselector
                #timeSelector
                [cancelButton]="cancelButton"
                [nowButton]="nowButton"
                [format]="format"
                [min]="min"
                [max]="max"
                [steps]="steps"
                [value]="value"
                [kendoEventsOutsideAngular]="{
                    keydown: handleKeydown,
                    mousedown: handleMousedown
                }"
                [scope]="this"
                (valueChange)="handleChange($event)"
                (valueReject)="handleReject()"
            >
                <kendo-timeselector-messages
                    [acceptLabel]="localization.get('acceptLabel')"
                    [accept]="localization.get('accept')"
                    [cancelLabel]="localization.get('cancelLabel')"
                    [cancel]="localization.get('cancel')"
                    [nowLabel]="localization.get('nowLabel')"
                    [now]="localization.get('now')"
                    [hour]="localization.get('hour')"
                    [minute]="localization.get('minute')"
                    [second]="localization.get('second')"
                    [millisecond]="localization.get('millisecond')"
                    [dayperiod]="localization.get('dayperiod')"
                >
                </kendo-timeselector-messages>
            </kendo-timeselector>
        </ng-template>
        <ng-container #container></ng-container>
    `, isInline: true, components: [{ type: i6.DateInputComponent, selector: "kendo-dateinput", inputs: ["focusableId", "pickerType", "disabled", "readonly", "title", "tabindex", "role", "ariaReadOnly", "tabIndex", "format", "formatPlaceholder", "placeholder", "steps", "max", "min", "rangeValidation", "autoCorrect", "incompleteDateValidation", "twoDigitYearMax", "value", "spinners", "isPopupOpen", "hasPopup", "size", "rounded", "fillMode"], outputs: ["valueChange", "valueUpdate", "focus", "blur"], exportAs: ["kendo-dateinput"] }, { type: i7.TimeSelectorComponent, selector: "kendo-timeselector", inputs: ["format", "min", "max", "cancelButton", "setButton", "nowButton", "disabled", "steps", "value"], outputs: ["valueChange", "valueReject"], exportAs: ["kendo-timeselector"] }, { type: i8.TimeSelectorCustomMessagesComponent, selector: "kendo-timeselector-messages" }], directives: [{ type: i9.TimePickerLocalizedMessagesDirective, selector: "[kendoTimePickerLocalizedMessages]" }, { type: i10.EventsOutsideAngularDirective, selector: "[kendoEventsOutsideAngular]", inputs: ["kendoEventsOutsideAngular", "scope"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: TimePickerComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    exportAs: 'kendo-timepicker',
                    providers: [
                        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TimePickerComponent), multi: true },
                        { provide: NG_VALIDATORS, useExisting: forwardRef(() => TimePickerComponent), multi: true },
                        { provide: KendoInput, useExisting: forwardRef(() => TimePickerComponent) },
                        LocalizationService,
                        BusViewService,
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.timepicker'
                        },
                        PickerService
                    ],
                    selector: 'kendo-timepicker',
                    template: `
        <ng-container kendoTimePickerLocalizedMessages
            i18n-accept="kendo.timepicker.accept|The Accept button text in the timepicker component"
            accept="Set"

            i18n-acceptLabel="kendo.timepicker.acceptLabel|The label for the Accept button in the timepicker component"
            acceptLabel="Set time"

            i18n-cancel="kendo.timepicker.cancel|The Cancel button text in the timepicker component"
            cancel="Cancel"

            i18n-cancelLabel="kendo.timepicker.cancelLabel|The label for the Cancel button in the timepicker component"
            cancelLabel="Cancel changes"

            i18n-now="kendo.timepicker.now|The Now button text in the timepicker component"
            now="Now"

            i18n-nowLabel="kendo.timepicker.nowLabel|The label for the Now button in the timepicker component"
            nowLabel="Select now"

            i18n-toggle="kendo.timepicker.toggle|The label for the toggle button in the timepicker component"
            toggle="Toggle time list"

            i18n-hour="kendo.timepicker.hour|The label for the hour part in the timepicker component"
            hour="Hour"

            i18n-minute="kendo.timepicker.minute|The label for the minute part in the timepicker component"
            minute="Minute"

            i18n-second="kendo.timepicker.second|The label for the second part in the timepicker component"
            second="Second"

            i18n-millisecond="kendo.timepicker.millisecond|The label for the millisecond part in the timepicker component"
            millisecond="Millisecond"

            i18n-dayperiod="kendo.timepicker.dayperiod|The label for the dayperiod part in the timepicker component"
            dayperiod="Dayperiod"
        >
        </ng-container>
        <kendo-dateinput
            #input
            pickerType="timepicker"
            hasPopup="dialog"
            [isPopupOpen]="show"
            [disabled]="disabled"
            [readonly]="readonly || readOnlyInput"
            [role]="'combobox'"
            [ariaReadOnly]="readonly"
            [format]="format"
            [formatPlaceholder]="formatPlaceholder"
            [placeholder]="placeholder"
            [min]="normalizeTime(min)"
            [max]="normalizeTime(max)"
            [incompleteDateValidation]="incompleteDateValidation"
            [fillMode]="fillMode"
            [rounded]="rounded"
            [size]="size"
            [steps]="steps"
            [tabindex]="!show ? tabindex : -1"
            [title]="title"
            [value]="value"
            (valueChange)="handleInputChange($event)"
        ></kendo-dateinput>
        <button
            #toggleButton
            type="button"
            tabindex="-1"
            class="k-input-button k-button k-icon-button"
            [attr.title]="localization.get('toggle')"
            [attr.aria-label]="localization.get('toggle')"
            [kendoEventsOutsideAngular]="{
                click: handleIconClick,
                mousedown: handleMousedown
            }"
            [scope]="this"
        >
            <span class="k-button-icon k-icon k-i-clock"></span>
        </button>
        <ng-template #popupTemplate>
            <kendo-timeselector
                #timeSelector
                [cancelButton]="cancelButton"
                [nowButton]="nowButton"
                [format]="format"
                [min]="min"
                [max]="max"
                [steps]="steps"
                [value]="value"
                [kendoEventsOutsideAngular]="{
                    keydown: handleKeydown,
                    mousedown: handleMousedown
                }"
                [scope]="this"
                (valueChange)="handleChange($event)"
                (valueReject)="handleReject()"
            >
                <kendo-timeselector-messages
                    [acceptLabel]="localization.get('acceptLabel')"
                    [accept]="localization.get('accept')"
                    [cancelLabel]="localization.get('cancelLabel')"
                    [cancel]="localization.get('cancel')"
                    [nowLabel]="localization.get('nowLabel')"
                    [now]="localization.get('now')"
                    [hour]="localization.get('hour')"
                    [minute]="localization.get('minute')"
                    [second]="localization.get('second')"
                    [millisecond]="localization.get('millisecond')"
                    [dayperiod]="localization.get('dayperiod')"
                >
                </kendo-timeselector-messages>
            </kendo-timeselector>
        </ng-template>
        <ng-container #container></ng-container>
    `
                }]
        }], ctorParameters: function () { return [{ type: i1.BusViewService }, { type: i0.NgZone }, { type: i2.LocalizationService }, { type: i0.ChangeDetectorRef }, { type: i3.PopupService }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.Injector }, { type: i4.PickerService }, { type: i5.IntlService }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [TOUCH_ENABLED]
                }] }]; }, propDecorators: { container: [{
                type: ViewChild,
                args: ['container', { read: ViewContainerRef, static: false }]
            }], popupTemplate: [{
                type: ViewChild,
                args: ['popupTemplate', { static: false }]
            }], toggleButton: [{
                type: ViewChild,
                args: ['toggleButton', { static: true }]
            }], disabled: [{
                type: Input
            }], readonly: [{
                type: Input
            }], readOnlyInput: [{
                type: Input
            }], format: [{
                type: Input
            }], formatPlaceholder: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }], incompleteDateValidation: [{
                type: Input
            }], cancelButton: [{
                type: Input
            }], nowButton: [{
                type: Input
            }], steps: [{
                type: Input
            }], popupSettings: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], tabIndex: [{
                type: Input
            }], title: [{
                type: Input
            }], rangeValidation: [{
                type: Input
            }], value: [{
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
                args: ['class.k-timepicker']
            }, {
                type: HostBinding,
                args: ['class.k-input']
            }], disabledClass: [{
                type: HostBinding,
                args: ['class.k-disabled']
            }] } });

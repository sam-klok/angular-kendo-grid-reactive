/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output, ViewChild, ContentChild, forwardRef, ViewContainerRef, isDevMode, Optional, Inject, HostListener } from '@angular/core';
import { anyChanged, guid, hasObservers, isDocumentAvailable, KendoInput } from '@progress/kendo-angular-common';
import { DataBoundComponent, ExpandableComponent } from '@progress/kendo-angular-treeview';
import { getter } from '@progress/kendo-common';
import { NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DataService } from '../common/data.service';
import { DisabledItemsService } from '../common/disabled-items/disabled-items.service';
import { NavigationService } from '../common/navigation/navigation.service';
import { L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
import { SelectionService } from '../common/selection/selection.service';
import { PreventableEvent } from '../common/models/preventable-event';
import { getFillModeClass, getRoundedClass, getSizeClass, inDropDown, isArray, isPresent, isUntouched, noop } from '../common/util';
import { NoDataTemplateDirective } from '../common/templates/no-data-template.directive';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HeaderTemplateDirective } from '../common/templates/header-template.directive';
import { FooterTemplateDirective } from '../common/templates/footer-template.directive';
import { NodeTemplateDirective } from './templates/node-template.directive';
import { DropDownTreeMessages } from '../common/constants/error-messages';
import { TOUCH_ENABLED } from '../common/constants/touch-enabled';
import { ValueTemplateDirective } from '../common/templates/value-template.directive';
import * as i0 from "@angular/core";
import * as i1 from "@progress/kendo-angular-popup";
import * as i2 from "../common/navigation/navigation.service";
import * as i3 from "@progress/kendo-angular-l10n";
import * as i4 from "@progress/kendo-angular-treeview";
import * as i5 from "../common/localization/localized-messages.directive";
import * as i6 from "@angular/common";
import * as i7 from "../common/templates/template-context.directive";
import * as i8 from "@angular/forms";
import * as i9 from "../common/filter-input.directive";
import * as i10 from "@progress/kendo-angular-common";
const DEFAULT_POPUP_SETTINGS = { animate: true };
const hasChildren = () => false;
const fetchChildren = () => of([]);
const itemDisabled = () => false;
const isNodeVisible = () => true;
const DEFAULT_SIZE = 'medium';
const DEFAULT_ROUNDED = 'medium';
const DEFAULT_FILL_MODE = 'solid';
/**
 * Represents the [Kendo UI DropDownTree component for Angular]({% slug overview_ddt %}).
 */
export class DropDownTreeComponent {
    constructor(injector, wrapper, popupService, navigationService, renderer, _zone, cdr, localization, touchEnabled) {
        this.injector = injector;
        this.wrapper = wrapper;
        this.popupService = popupService;
        this.navigationService = navigationService;
        this.renderer = renderer;
        this._zone = _zone;
        this.cdr = cdr;
        this.localization = localization;
        this.touchEnabled = touchEnabled;
        this.hostClasses = true;
        this.role = 'combobox';
        this.ariaHasPopup = 'tree';
        /**
         * Fires each time the popup is about to open
         * ([see example]({% slug openstate_ddt %})).
         * This event is preventable. If you cancel it, the popup will remain closed.
         */
        this.open = new EventEmitter();
        /**
         * Fires after the popup has been opened.
         */
        this.opened = new EventEmitter();
        /**
         * Fires each time the popup is about to close
         * ([see example]({% slug openstate_ddt %})).
         * This event is preventable. If you cancel it, the popup will remain open.
         */
        this.close = new EventEmitter();
        /**
         * Fires after the popup has been closed.
         */
        this.closed = new EventEmitter();
        /**
         * Fires when the user expands a node in the popup TreeView.
         */
        this.nodeExpand = new EventEmitter();
        /**
         * Fires when the user collapses a node in the popup TreeView.
         */
        this.nodeCollapse = new EventEmitter();
        /**
         * Fires each time the user focuses the DropDownTree.
         */
        this.onFocus = new EventEmitter();
        /**
         * Fires each time the DropDownTree gets blurred.
         */
        this.onBlur = new EventEmitter();
        /**
         * Fires each time the value is changed
         * ([see example]({% slug overview_ddt %}#toc-events)).
         */
        this.valueChange = new EventEmitter();
        /**
         * Fires when the value of the built-in filter input element changes.
         */
        this.filterChange = new EventEmitter();
        /**
         * If set to `true`, renders a button on hovering over the component.
         * Clicking this button resets the value of the component to `undefined` and triggers the `change` event.
         */
        this.clearButton = true;
        /**
         * A function which determines if a specific node has child nodes.
         */
        this.hasChildren = hasChildren;
        /**
         * A function which provides the child nodes for a given parent node.
         */
        this.fetchChildren = fetchChildren;
        /**
         * The hint which is displayed when the component is empty.
         */
        this.placeholder = "";
        /**
         * Sets the height of the options list. By default, `listHeight` is 200px.
         *
         * > The `listHeight` property affects only the list of options and not the whole popup container.
         * > To set the height of the popup container, use `popupSettings.height`.
         */
        this.listHeight = 200;
        /**
         * Sets the disabled state of the component.
         */
        this.disabled = false;
        /**
         * Sets the read-only state of the component.
         */
        this.readonly = false;
        /**
         * Specifies the type of the selected value
         * ([more information and example]({% slug valuebinding_ddt %}#toc-primitive-values)).
         * If set to `true`, the selected value has to be of a primitive value.
         */
        this.valuePrimitive = false;
        /**
         * A function that is executed for each data item and determines if a specific item is disabled.
         */
        this.itemDisabled = itemDisabled;
        /**
         * A callback which determines whether a tree node should be rendered as hidden. The utility .k-display-none class is used to hide the nodes.
         * Useful for custom filtering implementations.
         */
        this.isNodeVisible = isNodeVisible;
        /**
         * Indicates whether the child nodes will be fetched on node expand or will be initially prefetched.
         * @default true
         */
        this.loadOnDemand = true;
        /**
         * Renders the built-in input element for filtering the DropDownTree.
         * If set to `true`, the component emits the `filterChange` event, which can be used to [filter the DropDownTree manually]({% slug filtering_ddt %}#toc-manual-filtering).
         * A built-in filtering implementation is available to use with the [`kendoDropDownTreeHierarchyBinding`]({% slug api_dropdowns_dropdowntreehierarchybindingdirective %}) and [`kendoDropDownTreeFlatBinding`]({% slug api_dropdowns_dropdowntreeflatbindingdirective %}) directives.
         */
        this.filterable = false;
        /**
         * @hidden
         */
        this.filter = '';
        /**
         * @hidden
         *
         * Used by the kendo-label and kendo-floatinglabel to access and associate the focusable element with the provided label via aria-labelledby.
         */
        this.focusableId = `k-${guid()}`;
        /**
         * @hidden
         */
        this.selectedKeys = [];
        /**
         * @hidden
         */
        this.filterStateChange = new EventEmitter();
        /**
         * @hidden
         */
        this.allNodesHidden = false;
        /**
         * @hidden
         *
         * Used to associate the value label with the wrapper via aria-describedby.
         */
        this.valueLabelId = `k-${guid()}`;
        this._popupSettings = DEFAULT_POPUP_SETTINGS;
        this._tabindex = 0;
        this._isFocused = false;
        this._popupId = guid();
        this._size = 'medium';
        this._rounded = 'medium';
        this._fillMode = 'solid';
        this.subscriptions = [];
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
        this.direction = localization.rtl ? 'rtl' : 'ltr';
        this.subscribeEvents();
        this.subscribeTouchEvents();
        this.subscribeFocusEvents();
    }
    get hostAriaInvalid() {
        return this.formControl ? this.formControl.invalid.toString() : null;
    }
    get isDisabled() {
        return this.disabled;
    }
    get isDisabledAttribute() {
        return this.disabled ? '' : null;
    }
    get isLoading() {
        return this.loading;
    }
    get isBusy() {
        return this.loading ? 'true' : null;
    }
    get hostAriaControls() {
        return this.isOpen ? this._popupId : null;
    }
    get id() {
        return this.focusableId;
    }
    get hostTabIndex() {
        return this.tabindex;
    }
    get isAriaExpanded() {
        return this.isOpen;
    }
    get hostAriaAutocomplete() {
        return this.filterable ? 'list' : null;
    }
    get isReadonly() {
        return this.readonly ? '' : null;
    }
    /**
     * @hidden
     */
    handleClick() {
        this.togglePopup(!this.isOpen);
    }
    /**
     * @hidden
     */
    handleKeydown(event) {
        if (this.disabled || this.readonly) {
            return;
        }
        const eventData = event;
        this.navigationService.process({
            originalEvent: eventData
        });
    }
    set treeview(treeview) {
        if (treeview) {
            if (this.isFocused && !this.filterable || this.touchEnabled) {
                treeview.focus();
            }
            // the treeview animations are initially disabled (we don't want expand animations during popup opening)
            // re-enables the animations for user interaction
            treeview.animate = true;
            this._treeview = treeview;
        }
    }
    get treeview() {
        return this._treeview;
    }
    /**
     * Sets the data of the DropDownTree.
     *
     * > The data has to be provided in an array-like list with objects.
     */
    set data(data) {
        this._nodes = data;
        this.setState();
    }
    get data() {
        return this._nodes;
    }
    /**
     * Sets the value of the DropDownTree.
     * It can either be of the primitive (string, numbers) or of the complex (objects) type.
     * To define the type, use the `valuePrimitive` option.
     *
     */
    set value(newValue) {
        this._value = newValue;
        this.setState();
    }
    get value() {
        return this._value;
    }
    /**
     * Configures the popup of the DropDownTree.
     *
     * The available options are:
     * - `animate: Boolean`&mdash;Controls the popup animation. By default, the open and close animations are enabled.
     * - `width: Number | String`&mdash;Sets the width of the popup container. By default, the width of the host element is used. If set to `auto`, the component automatically adjusts the width of the popup and no item labels are wrapped.
     * - `height: Number`&mdash;Sets the height of the popup container.
     * - `popupClass: String`&mdash;Specifies a list of CSS classes that are used to style the popup.
     * - `appendTo: "root" | "component" | ViewContainerRef`&mdash;Specifies the component to which the popup will be appended.
     */
    set popupSettings(settings) {
        this._popupSettings = Object.assign({}, DEFAULT_POPUP_SETTINGS, settings);
    }
    get popupSettings() {
        return this._popupSettings;
    }
    /**
     * Keeps the current `dataItem` object in order to resolve selection.
     * Needs to be provided when `value` is bound in and `valuePrimitive` is set to true.
     */
    set dataItem(item) {
        this._dataItem = item;
        this.setState();
    }
    get dataItem() {
        return this._dataItem ? this._dataItem : this.value;
    }
    /**
     * Specifies the [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
     */
    set tabindex(value) {
        const providedTabIndex = Number(value);
        const defaultTabIndex = 0;
        this._tabindex = !isNaN(providedTabIndex) ? providedTabIndex : defaultTabIndex;
    }
    get tabindex() {
        return this.disabled ? -1 : this._tabindex;
    }
    /**
     * Sets the size of the component.
     *
     * The possible values are:
     * * `small`
     * * `medium` (default)
     * * `large`
     * * `none`
     *
     */
    set size(size) {
        const newSize = size ? size : DEFAULT_SIZE;
        this.renderer.removeClass(this.wrapper.nativeElement, getSizeClass('picker', this.size));
        if (size !== 'none') {
            this.renderer.addClass(this.wrapper.nativeElement, getSizeClass('picker', newSize));
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
     * * `medium` (default)
     * * `large`
     * * `full`
     * * `none`
     *
     */
    set rounded(rounded) {
        const newRounded = rounded ? rounded : DEFAULT_ROUNDED;
        this.renderer.removeClass(this.wrapper.nativeElement, getRoundedClass(this.rounded));
        if (rounded !== 'none') {
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
     * * `flat`
     * * `solid` (default)
     * * `outline`
     * * `none`
     *
     */
    set fillMode(fillMode) {
        const newFillMode = fillMode ? fillMode : DEFAULT_FILL_MODE;
        this.renderer.removeClass(this.wrapper.nativeElement, getFillModeClass('picker', this.fillMode));
        if (fillMode !== 'none') {
            this.renderer.addClass(this.wrapper.nativeElement, getFillModeClass('picker', newFillMode));
        }
        this._fillMode = newFillMode;
    }
    get fillMode() {
        return this._fillMode;
    }
    set isFocused(isFocused) {
        this.renderer[isFocused ? 'addClass' : 'removeClass'](this.wrapper.nativeElement, 'k-focus');
        this._isFocused = isFocused;
    }
    get isFocused() {
        return this._isFocused;
    }
    get width() {
        const wrapperWidth = this.wrapper.nativeElement.offsetWidth;
        const width = this.popupSettings.width || wrapperWidth;
        const minWidth = isNaN(wrapperWidth) ? wrapperWidth : `${wrapperWidth}px`;
        const maxWidth = isNaN(width) ? width : `${width}px`;
        return { min: minWidth, max: maxWidth };
    }
    get height() {
        const popupHeight = this.popupSettings.height;
        return isPresent(popupHeight) ? `${popupHeight}px` : 'auto';
    }
    /**
     * Returns the current open state of the popup.
     */
    get isOpen() {
        return isPresent(this.popupRef);
    }
    get clearButtonVisiblity() {
        if (this.touchEnabled) {
            return 'visible';
        }
    }
    /**
     * @hidden
     *
     * Alias for `isNodeExpanded`. Used for compatibility with the `ExpandableComponent` interface.
     * Required for the expand-directive.
     */
    set isExpanded(callback) {
        this.isNodeExpanded = callback;
    }
    get isExpanded() {
        return this.isNodeExpanded;
    }
    /**
     * @hidden
     *
     * Alias for `nodeExpand`. Used for compatibility with the `ExpandableComponent` interface.
     * Required for the expand-directive.
     */
    get expand() {
        return this.nodeExpand;
    }
    /**
     * @hidden
     *
     * Alias for `nodeCollapse`. Used for compatibility with the `ExpandableComponent` interface.
     * Required for the expand-directive.
     */
    get collapse() {
        return this.nodeCollapse;
    }
    /**
     * @hidden
     *
     * Alias for `data`. Used for compatibility with the `DataBoundComponent` interface.
     * Required for the data-binding directives.
     */
    set nodes(nodes) {
        this.data = nodes;
    }
    get nodes() {
        return this.data;
    }
    /**
     * @hidden
     *
     * Alias for `fetchChildren`. Used for compatibility with the `DataBoundComponent` interface.
     * Required for the data-binding directives
     */
    set children(callback) {
        this.fetchChildren = callback;
    }
    get children() {
        return this.fetchChildren;
    }
    /**
     * @hidden
     *
     * Alias for `isNodeVisible`. Used for compatibility with the `DataBoundComponent` interface.
     * The `DataBoundComponent` interface is used in the data-binding directives.
     */
    set isVisible(callback) {
        this.isNodeVisible = callback;
    }
    get isVisible() {
        return this.isNodeVisible;
    }
    /**
     * @hidden
     */
    get formControl() {
        const ngControl = this.injector.get(NgControl, null);
        return (ngControl === null || ngControl === void 0 ? void 0 : ngControl.control) || null;
    }
    ngOnInit() {
        this.renderer.removeAttribute(this.wrapper.nativeElement, 'tabindex');
        this.assignAriaDescribedBy();
        this.subscriptions.push(this.localization
            .changes.subscribe(({ rtl }) => {
            this.direction = rtl ? 'rtl' : 'ltr';
            this.cdr.markForCheck();
        }));
        this.setComponentClasses();
    }
    /**
     * @hidden
     */
    ngOnDestroy() {
        this.destroyPopup();
        this.unsubscribeEvents();
    }
    /**
     * @hidden
     */
    ngOnChanges(changes) {
        if (anyChanged(['textField', 'valueField', 'valuePrimitive'], changes, false)) {
            this.setState();
        }
    }
    /**
     * @hidden
     */
    ngAfterContentChecked() {
        this.verifySettings();
    }
    /**
     * @hidden
     *
     * Used by the kendo-floatinglabel component to determine if the floating label
     * should be rendered inside the input when the component is not focused.
     */
    isEmpty() {
        return !this.text && !this.placeholder;
    }
    /**
     * @hidden
     */
    togglePopup(open) {
        const isDisabled = this.disabled || this.readonly;
        const sameState = this.isOpen === open;
        if (isDisabled || sameState) {
            return;
        }
        const togglePrevented = this.triggerPopupEvents(open);
        if (!togglePrevented) {
            if (open) {
                this.createPopup();
            }
            else {
                this.destroyPopup();
            }
        }
    }
    /**
     * @hidden
     */
    handleFocus(event) {
        if (event.target !== this.wrapper.nativeElement) {
            return;
        }
        event.stopImmediatePropagation();
        if (!this.isFocused) {
            this.isFocused = true;
            if (hasObservers(this.onFocus)) {
                this._zone.run(() => {
                    this.onFocus.emit();
                });
            }
        }
    }
    /**
     * @hidden
     */
    handleBlur(e) {
        const relatedTarget = e && e.relatedTarget;
        if (this.wrapper.nativeElement.contains(relatedTarget) ||
            (this.isOpen && this.popupRef.popupElement.contains(relatedTarget))) {
            return;
        }
        this.isFocused = false;
        if (hasObservers(this.onBlur) ||
            isUntouched(this.wrapper.nativeElement)) {
            this._zone.run(() => {
                this.togglePopup(false);
                this.onBlur.emit();
                this.onTouchedCallback();
            });
        }
        else {
            this.togglePopup(false);
        }
    }
    /**
     * Focuses a specific item of the DropDownTree based on a provided index in the format of `1_1`.
     * The targeted item should be expanded in order for it to be focused.
     * If null or invalid index is provided the focus will be set on the first item.
     */
    focusItemAt(index) {
        if (this.treeview) {
            const lookup = this.treeview.itemLookup(index);
            let isItemDisabled = !isPresent(lookup) || this.treeview.isDisabled(lookup.item.dataItem, lookup.item.index);
            if (!isItemDisabled) {
                this.treeview.focus(index);
            }
        }
    }
    /**
     * Focuses the DropDownTree.
     */
    focus() {
        if (!this.disabled) {
            this.wrapper.nativeElement.focus();
        }
    }
    /**
     * Blurs the DropDownTree.
     */
    blur() {
        if (!this.disabled) {
            this.wrapper.nativeElement.blur();
        }
    }
    /**
     * Resets the value of the DropDownTree.
     * If you use the `reset` method to clear the value of the component,
     * the model will not update automatically and the `valueChange` event will not be fired.
     */
    reset() {
        this.value = undefined;
        this.dataItem = undefined;
    }
    /**
     * Toggles the visibility of the popup
     * ([see example]({% slug openstate_ddt %})).
     * If you use the `toggle` method to open or close the popup, the `open` and `close` events will not be fired.
     *
     * @param open - The state of the popup.
     */
    toggle(open) {
        // The Promise is required to open the popup on load.
        // Otherwise, the "ViewContainerRef not found..." error will be thrown.
        Promise.resolve(null).then(() => {
            const shouldOpen = isPresent(open) ? open : !isPresent(this.popupRef);
            this.destroyPopup();
            if (shouldOpen) {
                this.createPopup();
            }
        });
    }
    /**
     * @hidden
     */
    get popupContainerClasses() {
        const containerClasses = ['k-popup-dropdowntree'];
        if (this.popupSettings.popupClass) {
            containerClasses.push(this.popupSettings.popupClass);
        }
        return containerClasses;
    }
    /**
     * @hidden
     */
    onSelectionChange({ dataItem, index }) {
        this.valueDepth = index.split('_').length - 1;
        const valueField = this.getField(this.valueField, dataItem);
        const newValue = this.valuePrimitive ?
            getter(valueField)(dataItem) :
            dataItem;
        const shouldUpdateValue = newValue !== this.value;
        if (shouldUpdateValue) {
            this.value = newValue;
            this.dataItem = dataItem;
            this.emitValueChange(this.value);
        }
        this.togglePopup(false);
        this.focus();
    }
    /**
     * @hidden
     */
    messageFor(key) {
        return this.localization.get(key);
    }
    /**
     * @hidden
     */
    clearValue(event) {
        event.stopImmediatePropagation();
        this.focus();
        this.value = undefined;
        this.dataItem = undefined;
        this.clearState();
        this.valueChange.emit(undefined);
        this.emitValueChange();
    }
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
    preventEventDefault(event) {
        event.preventDefault();
    }
    /**
     * @hidden
     */
    writeValue(value) {
        // If the user resets the value by providing null/undefined we need to reset the `dataItem`
        // Because upon initialization of the component the `writeValue` is being called twice -
        // first time with `null` value regardless of sync/async value - an extra check is added to
        // distinguish between client reset and initial phanotm 'null' value
        if (!isPresent(value) && isPresent(this.value)) {
            this.dataItem = null;
        }
        this.value = value === null ? undefined : value;
    }
    /**
     * @hidden
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @hidden
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
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
    handleFilterInputChange(input) {
        this.filterChange.next(input.value);
        this.allNodesHidden = this.nodes.every((node, index) => !this.isVisible(node, String(index)));
    }
    /**
     * @hidden
     */
    get buttonClasses() {
        return this.loading ? 'k-i-loading k-input-loading-icon' : 'k-i-caret-alt-down';
    }
    /**
     * @hidden
     */
    get selectButtonClasses() {
        return `${this.size ? getSizeClass('button', this.size) : ''} ${this.fillMode ? 'k-button-' + this.fillMode : ''} ${this.fillMode ? 'k-button-' + this.fillMode + '-base' : ''}`;
    }
    /**
     * @hidden
     */
    get filterInputClasses() {
        return `${this.size ? getSizeClass('input', this.size) : ''} ${this.fillMode ? 'k-input-' + this.fillMode : ''} ${this.rounded ? getRoundedClass(this.rounded) : ''}`;
    }
    verifySettings() {
        if (!isDevMode()) {
            return;
        }
        if (this.valuePrimitive === true && isPresent(this.value) && typeof this.value === "object") {
            throw new Error(DropDownTreeMessages.primitive);
        }
        if (this.valuePrimitive === true && isPresent(this.value) && typeof this.dataItem !== "object") {
            throw new Error(DropDownTreeMessages.dataItem);
        }
        if (this.valuePrimitive === false && isPresent(this.value) && typeof this.value !== "object") {
            throw new Error(DropDownTreeMessages.object);
        }
        if (!isPresent(this.valueField) || !isPresent(this.textField)) {
            throw new Error(DropDownTreeMessages.textAndValue);
        }
        if ((isArray(this.valueField) || isArray(this.textField)) && isPresent(this.value) && !isPresent(this.valueDepth)) {
            throw new Error(DropDownTreeMessages.valueDepth);
        }
    }
    emitValueChange(value) {
        this.onChangeCallback(value);
        this.valueChange.emit(value);
    }
    getText(textField, dataItem) {
        if (isPresent(dataItem) && isPresent(textField)) {
            const field = this.getField(textField, dataItem);
            return getter(field)(dataItem);
        }
        return null;
    }
    /**
     * @hidden
     *
     * Determines the `valueField` and `textField` for a specific level in the data set
     *  @param field - the field value (string | string[])
     *  @param value - current value
     */
    getField(field, value) {
        const fieldsCount = field.length - 1;
        if (typeof field === 'string') {
            // If the `valueField` | `textField` is the same for all levels
            return field;
        }
        else if (isPresent(this.valueDepth)) {
            // When `valueDepth` can be defined from the index on selectionChange or provided by the user
            return fieldsCount < this.valueDepth ? field[fieldsCount] : field[this.valueDepth];
        }
        else {
            // Fallback: Look to find a match of each field in the current data item
            // Side effect may occur if all of the listed fields are present in the data item
            return field.find(item => item in value);
        }
    }
    triggerPopupEvents(open) {
        const eventArgs = new PreventableEvent();
        if (open) {
            this.open.emit(eventArgs);
        }
        else {
            this.close.emit(eventArgs);
        }
        return eventArgs.isDefaultPrevented();
    }
    createPopup() {
        const horizontalAlign = this.direction === "rtl" ? "right" : "left";
        const anchorPosition = { horizontal: horizontalAlign, vertical: 'bottom' };
        const popupPosition = { horizontal: horizontalAlign, vertical: 'top' };
        this.popupRef = this.popupService.open({
            anchor: this.wrapper,
            appendTo: this.appendTo,
            anchorAlign: anchorPosition,
            content: this.popupTemplate,
            popupAlign: popupPosition,
            positionMode: 'absolute',
            popupClass: this.popupContainerClasses
        });
        const popupWrapper = this.popupRef.popupElement;
        const { min, max } = this.width;
        this.renderer.setStyle(popupWrapper, 'minWidth', min);
        this.renderer.setStyle(popupWrapper, 'width', max);
        this.renderer.setStyle(popupWrapper, 'height', this.height);
        this.renderer.setAttribute(popupWrapper, 'dir', this.direction);
        this.renderer.setAttribute(popupWrapper, 'id', this._popupId);
        this.popupRef.popupOpen.subscribe(() => {
            this.cdr.detectChanges();
            this.opened.emit();
        });
        this.popupRef.popupClose.subscribe(() => {
            this.closed.emit();
        });
    }
    destroyPopup() {
        if (this.popupRef) {
            this.popupRef.close();
            this.popupRef = null;
            if (this.filter !== "") {
                this.filter = "";
                this.allNodesHidden = false;
                if (hasObservers(this.filterChange)) {
                    this._zone.run(() => {
                        this.filterChange.emit("");
                    });
                }
            }
        }
    }
    handleEscape() {
        this.togglePopup(false);
        this.focus();
    }
    setState() {
        if (isPresent(this.value) && isPresent(this.dataItem) && isPresent(this.valueField)) {
            this.text = this.getText(this.textField, this.dataItem);
            const valueField = this.getField(this.valueField, this.dataItem);
            this.selectBy = valueField;
            this.selectedKeys = [getter(valueField)(this.dataItem)];
        }
        else {
            this.clearState();
        }
        this.cdr.markForCheck();
    }
    clearState() {
        this.text = undefined;
        this.selectedKeys = [];
    }
    subscribeEvents() {
        this.subscriptions.push(this.navigationService.open.subscribe((event) => {
            event.originalEvent.preventDefault();
            this.togglePopup(true);
        }), this.navigationService.close.subscribe((event) => {
            event.originalEvent.preventDefault();
            this.togglePopup(false);
            this.focus();
        }), this.navigationService.enter
            .pipe(tap((event) => event.originalEvent.preventDefault()))
            .subscribe(() => this.togglePopup(true)), this.navigationService.esc
            .subscribe(() => this.handleEscape()), this.navigationService.tab.subscribe(() => this.focus()), this.navigationService.down.subscribe((event) => {
            if (!this.treeview) {
                return;
            }
            event.originalEvent.preventDefault();
            if (!this.treeview.isActive) {
                this.treeview.focus();
            }
        }), this.navigationService.up.subscribe((event) => {
            if (!this.treeview) {
                return;
            }
            event.originalEvent.preventDefault();
            if (this.filterable && this.treeview['navigationService']['activeIndex'] === '0') {
                this.filterInput.nativeElement.focus();
            }
        }));
    }
    subscribeTouchEvents() {
        if (!isDocumentAvailable() || !this.touchEnabled) {
            return;
        }
        this._zone.runOutsideAngular(() => 
        // Roll up DropDownTree on iOS when tapped outside
        this.touchstartDisposeHandler = this.renderer.listen(document, 'touchstart', (e) => {
            const target = e.target;
            if (this.isFocused && !inDropDown(this.wrapper, target, this.popupRef)) {
                this._zone.run(() => {
                    if (this.isOpen) {
                        this.treeview.blur();
                    }
                    this.blur();
                });
            }
        }));
    }
    subscribeFocusEvents() {
        if (isDocumentAvailable()) {
            this.handleFocus = this.handleFocus.bind(this);
            this.handleDocumentBlur = this.handleDocumentBlur.bind(this);
            this._zone.runOutsideAngular(() => {
                const useCapture = true;
                document.addEventListener('focus', this.handleFocus, useCapture);
                document.addEventListener('blur', this.handleDocumentBlur, useCapture);
            });
        }
    }
    unSubscribeFocusEvents() {
        if (isDocumentAvailable()) {
            const useCapture = true;
            document.removeEventListener('focus', this.handleFocus, useCapture);
            document.removeEventListener('blur', this.handleDocumentBlur, useCapture);
        }
    }
    unsubscribeEvents() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
        this.unSubscribeFocusEvents();
        if (this.touchstartDisposeHandler) {
            this.touchstartDisposeHandler();
        }
    }
    handleDocumentBlur(event) {
        if (event.target !== this.wrapper.nativeElement) {
            return;
        }
        event.stopImmediatePropagation();
        this.handleBlur(event);
    }
    assignAriaDescribedBy() {
        const currentValue = this.wrapper.nativeElement.getAttribute('aria-describedby') || '';
        // add to the current value - don't replace it (the aria-describedby is used by the FormField component as well)
        const newValue = `${this.valueLabelId} ${currentValue.trim()}`.trim();
        this.renderer.setAttribute(this.wrapper.nativeElement, 'aria-describedby', newValue);
    }
    setComponentClasses() {
        if (this.size !== 'none') {
            this.renderer.addClass(this.wrapper.nativeElement, getSizeClass('picker', this.size));
        }
        if (this.rounded !== 'none') {
            this.renderer.addClass(this.wrapper.nativeElement, getRoundedClass(this.rounded));
        }
        if (this.fillMode !== 'none') {
            this.renderer.addClass(this.wrapper.nativeElement, getFillModeClass('picker', this.fillMode));
        }
    }
}
DropDownTreeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: DropDownTreeComponent, deps: [{ token: i0.Injector }, { token: i0.ElementRef }, { token: i1.PopupService }, { token: i2.NavigationService }, { token: i0.Renderer2 }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }, { token: i3.LocalizationService }, { token: TOUCH_ENABLED, optional: true }], target: i0.ɵɵFactoryTarget.Component });
DropDownTreeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: DropDownTreeComponent, selector: "kendo-dropdowntree", inputs: { loading: "loading", clearButton: "clearButton", data: "data", value: "value", textField: "textField", valueField: "valueField", valueDepth: "valueDepth", hasChildren: "hasChildren", fetchChildren: "fetchChildren", placeholder: "placeholder", popupSettings: "popupSettings", dataItem: "dataItem", listHeight: "listHeight", disabled: "disabled", readonly: "readonly", valuePrimitive: "valuePrimitive", tabindex: "tabindex", size: "size", rounded: "rounded", fillMode: "fillMode", itemDisabled: "itemDisabled", isNodeExpanded: "isNodeExpanded", isNodeVisible: "isNodeVisible", loadOnDemand: "loadOnDemand", filterable: "filterable", filter: "filter", focusableId: "focusableId" }, outputs: { open: "open", opened: "opened", close: "close", closed: "closed", nodeExpand: "nodeExpand", nodeCollapse: "nodeCollapse", onFocus: "focus", onBlur: "blur", valueChange: "valueChange", filterChange: "filterChange" }, host: { listeners: { "click": "handleClick()", "keydown": "handleKeydown($event)" }, properties: { "class.k-dropdowntree": "this.hostClasses", "class.k-picker": "this.hostClasses", "attr.aria-invalid": "this.hostAriaInvalid", "class.k-disabled": "this.isDisabled", "attr.disabled": "this.isDisabledAttribute", "class.k-loading": "this.isLoading", "attr.aria-busy": "this.isBusy", "attr.aria-controls": "this.hostAriaControls", "attr.id": "this.id", "attr.dir": "this.direction", "attr.tabindex": "this.hostTabIndex", "attr.role": "this.role", "attr.aria-haspopup": "this.ariaHasPopup", "attr.aria-expanded": "this.isAriaExpanded", "attr.aria-autocomplete": "this.hostAriaAutocomplete", "attr.readonly": "this.isReadonly" } }, providers: [
        DataService,
        SelectionService,
        NavigationService,
        DisabledItemsService,
        LocalizationService,
        {
            provide: L10N_PREFIX,
            useValue: 'kendo.dropdowntree'
        },
        {
            multi: true,
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DropDownTreeComponent)
        },
        {
            provide: KendoInput,
            useExisting: forwardRef(() => DropDownTreeComponent)
        },
        {
            provide: DataBoundComponent,
            useExisting: forwardRef(() => DropDownTreeComponent)
        },
        {
            provide: ExpandableComponent,
            useExisting: forwardRef(() => DropDownTreeComponent)
        }
    ], queries: [{ propertyName: "noDataTemplate", first: true, predicate: NoDataTemplateDirective, descendants: true }, { propertyName: "headerTemplate", first: true, predicate: HeaderTemplateDirective, descendants: true }, { propertyName: "footerTemplate", first: true, predicate: FooterTemplateDirective, descendants: true }, { propertyName: "nodeTemplate", first: true, predicate: NodeTemplateDirective, descendants: true }, { propertyName: "valueTemplate", first: true, predicate: ValueTemplateDirective, descendants: true }], viewQueries: [{ propertyName: "popupTemplate", first: true, predicate: ["popupTemplate"], descendants: true, static: true }, { propertyName: "container", first: true, predicate: ["container"], descendants: true, read: ViewContainerRef, static: true }, { propertyName: "treeview", first: true, predicate: ["treeview"], descendants: true }, { propertyName: "filterInput", first: true, predicate: ["filterInput"], descendants: true }], exportAs: ["kendoDropDownTree"], usesOnChanges: true, ngImport: i0, template: `
        <ng-container kendoDropDownTreeLocalizedMessages
            i18n-noDataText="kendo.dropdowntree.noDataText|The text displayed in the popup when there are no items"
            noDataText="NO DATA FOUND"

            i18n-clearTitle="kendo.dropdowntree.clearTitle|The title of the clear button"
            clearTitle="clear"

            i18n-selectButtonText="kendo.dropdowntree.selectButtonText|The text set as aria-label on the select button"
            selectButtonText="Select"
        >
        </ng-container>
        <span
            [attr.id]="valueLabelId"
            class="k-input-inner"
        >
            <span class="k-input-value-text">
                <ng-template *ngIf="valueTemplate"
                    [templateContext]="{
                        templateRef: valueTemplate.templateRef,
                        $implicit: dataItem
                    }">
                </ng-template>
                <ng-template [ngIf]="!valueTemplate"> {{ text || placeholder }} </ng-template>
            </span>
        </span>
        <span
            *ngIf="!loading && !readonly && clearButton && text?.length && !disabled"
            class="k-clear-value"
            [style.visibility]="clearButtonVisiblity"
            aria-hidden="true"
            [attr.title]="messageFor('clearTitle')"
            (click)="clearValue($event)"
        >
            <span class="k-icon k-i-x"></span>
        </span>
        <button
            tabindex="-1"
            type="button"
            aria-hidden="true"
            class="k-input-button k-button k-icon-button"
            [ngClass]="selectButtonClasses"
            [attr.aria-label]="messageFor('selectButtonText')"
        >
            <span
                class="k-button-icon k-icon"
                [ngClass]="buttonClasses"
            ></span>
        </button>
        <ng-template #popupTemplate>
            <span
                *ngIf="filterable"
                class="k-list-filter"
            >
                <span
                    class="k-textbox k-input"
                    [ngClass]="filterInputClasses"
                >
                    <span class="k-input-prefix">
                        <span class="k-input-icon k-icon k-i-search"></span>
                    </span>
                    <input
                        #filterInput
                        (input)="handleFilterInputChange($event.target)"
                        [filterInput]="filterable && !touchEnabled"
                        (keydown.arrowdown)="handleKeydown($event)"
                        (keydown.alt.arrowup)="handleKeydown($event)"
                        [(ngModel)]="filter"
                        class="k-input-inner"
                        role="textbox"
                        aria-haspopup="true"
                        aria-expanded="false"
                        tabindex="0"
                        aria-disabled="false"
                        aria-readonly="false"
                        [kendoEventsOutsideAngular]="{
                            blur: handleBlur
                        }"
                        [scope]="this"
                    >
                </span>
            </span>
            <!--header template-->
            <ng-template
                *ngIf="headerTemplate"
                [templateContext]="{
                    templateRef: headerTemplate?.templateRef
                }">
            </ng-template>
            <kendo-treeview
                #treeview
                *ngIf="data.length !== 0 && !allNodesHidden"
                [size]="size"
                [nodes]="data"
                [style.maxHeight.px]="listHeight"
                [animate]="false"
                [(selectedKeys)]="selectedKeys"
                [selectBy]="selectBy"
                [textField]="textField"
                kendoTreeViewSelectable
                [children]="children"
                [hasChildren]="hasChildren"
                [loadOnDemand]="loadOnDemand"
                [isExpanded]="isNodeExpanded"
                [isDisabled]="itemDisabled"
                [nodeTemplate]="nodeTemplate"
                [filter]="filter"
                [isVisible]="isNodeVisible"
                (focusout)="handleBlur($event)"
                (keydown)="handleKeydown($event)"
                (selectionChange)="onSelectionChange($event)"
                (expand)="nodeExpand.emit($event)"
                (collapse)="nodeCollapse.emit($event)"
            >
            </kendo-treeview>
            <!--footer template-->
            <ng-template
                *ngIf="footerTemplate"
                [templateContext]="{
                    templateRef: footerTemplate?.templateRef
                }">
            </ng-template>
            <!--no-data template-->
            <div class="k-no-data" *ngIf="data.length === 0 || allNodesHidden">
                <ng-template [ngIf]="noDataTemplate"
                    [templateContext]="{
                        templateRef: noDataTemplate?.templateRef
                    }">
                </ng-template>
                <ng-template [ngIf]="!noDataTemplate">
                    <div>{{ messageFor('noDataText') }}</div>
                </ng-template>
            </div>
        </ng-template>
        <ng-container #container></ng-container>
    `, isInline: true, components: [{ type: i4.TreeViewComponent, selector: "kendo-treeview", inputs: ["filterInputPlaceholder", "expandDisabledNodes", "animate", "nodeTemplate", "loadMoreButtonTemplate", "trackBy", "nodes", "textField", "hasChildren", "isChecked", "isDisabled", "isExpanded", "isSelected", "isVisible", "navigable", "children", "loadOnDemand", "filterable", "filter", "size", "disableParentNodesOnly"], outputs: ["childrenLoaded", "blur", "focus", "expand", "collapse", "nodeDragStart", "nodeDrag", "filterStateChange", "nodeDrop", "nodeDragEnd", "addItem", "removeItem", "checkedChange", "selectionChange", "filterChange", "nodeClick", "nodeDblClick"], exportAs: ["kendoTreeView"] }], directives: [{ type: i5.LocalizedMessagesDirective, selector: "\n    [kendoDropDownListLocalizedMessages],\n    [kendoDropDownTreeLocalizedMessages],\n    [kendoComboBoxLocalizedMessages],\n    [kendoMultiColumnComboBoxLocalizedMessages],\n    [kendoAutoCompleteLocalizedMessages],\n    [kendoMultiSelectLocalizedMessages],\n    [kendoMultiSelectTreeLocalizedMessages]\n  " }, { type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i7.TemplateContextDirective, selector: "[templateContext]", inputs: ["templateContext"] }, { type: i6.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i8.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i9.FilterInputDirective, selector: "[filterInput]", inputs: ["filterInput"] }, { type: i8.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i8.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i10.EventsOutsideAngularDirective, selector: "[kendoEventsOutsideAngular]", inputs: ["kendoEventsOutsideAngular", "scope"] }, { type: i4.SelectDirective, selector: "[kendoTreeViewSelectable]", inputs: ["isSelected", "selectBy", "kendoTreeViewSelectable", "selectedKeys"], outputs: ["selectedKeysChange"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: DropDownTreeComponent, decorators: [{
            type: Component,
            args: [{
                    exportAs: 'kendoDropDownTree',
                    providers: [
                        DataService,
                        SelectionService,
                        NavigationService,
                        DisabledItemsService,
                        LocalizationService,
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.dropdowntree'
                        },
                        {
                            multi: true,
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => DropDownTreeComponent)
                        },
                        {
                            provide: KendoInput,
                            useExisting: forwardRef(() => DropDownTreeComponent)
                        },
                        {
                            provide: DataBoundComponent,
                            useExisting: forwardRef(() => DropDownTreeComponent)
                        },
                        {
                            provide: ExpandableComponent,
                            useExisting: forwardRef(() => DropDownTreeComponent)
                        }
                    ],
                    selector: 'kendo-dropdowntree',
                    template: `
        <ng-container kendoDropDownTreeLocalizedMessages
            i18n-noDataText="kendo.dropdowntree.noDataText|The text displayed in the popup when there are no items"
            noDataText="NO DATA FOUND"

            i18n-clearTitle="kendo.dropdowntree.clearTitle|The title of the clear button"
            clearTitle="clear"

            i18n-selectButtonText="kendo.dropdowntree.selectButtonText|The text set as aria-label on the select button"
            selectButtonText="Select"
        >
        </ng-container>
        <span
            [attr.id]="valueLabelId"
            class="k-input-inner"
        >
            <span class="k-input-value-text">
                <ng-template *ngIf="valueTemplate"
                    [templateContext]="{
                        templateRef: valueTemplate.templateRef,
                        $implicit: dataItem
                    }">
                </ng-template>
                <ng-template [ngIf]="!valueTemplate"> {{ text || placeholder }} </ng-template>
            </span>
        </span>
        <span
            *ngIf="!loading && !readonly && clearButton && text?.length && !disabled"
            class="k-clear-value"
            [style.visibility]="clearButtonVisiblity"
            aria-hidden="true"
            [attr.title]="messageFor('clearTitle')"
            (click)="clearValue($event)"
        >
            <span class="k-icon k-i-x"></span>
        </span>
        <button
            tabindex="-1"
            type="button"
            aria-hidden="true"
            class="k-input-button k-button k-icon-button"
            [ngClass]="selectButtonClasses"
            [attr.aria-label]="messageFor('selectButtonText')"
        >
            <span
                class="k-button-icon k-icon"
                [ngClass]="buttonClasses"
            ></span>
        </button>
        <ng-template #popupTemplate>
            <span
                *ngIf="filterable"
                class="k-list-filter"
            >
                <span
                    class="k-textbox k-input"
                    [ngClass]="filterInputClasses"
                >
                    <span class="k-input-prefix">
                        <span class="k-input-icon k-icon k-i-search"></span>
                    </span>
                    <input
                        #filterInput
                        (input)="handleFilterInputChange($event.target)"
                        [filterInput]="filterable && !touchEnabled"
                        (keydown.arrowdown)="handleKeydown($event)"
                        (keydown.alt.arrowup)="handleKeydown($event)"
                        [(ngModel)]="filter"
                        class="k-input-inner"
                        role="textbox"
                        aria-haspopup="true"
                        aria-expanded="false"
                        tabindex="0"
                        aria-disabled="false"
                        aria-readonly="false"
                        [kendoEventsOutsideAngular]="{
                            blur: handleBlur
                        }"
                        [scope]="this"
                    >
                </span>
            </span>
            <!--header template-->
            <ng-template
                *ngIf="headerTemplate"
                [templateContext]="{
                    templateRef: headerTemplate?.templateRef
                }">
            </ng-template>
            <kendo-treeview
                #treeview
                *ngIf="data.length !== 0 && !allNodesHidden"
                [size]="size"
                [nodes]="data"
                [style.maxHeight.px]="listHeight"
                [animate]="false"
                [(selectedKeys)]="selectedKeys"
                [selectBy]="selectBy"
                [textField]="textField"
                kendoTreeViewSelectable
                [children]="children"
                [hasChildren]="hasChildren"
                [loadOnDemand]="loadOnDemand"
                [isExpanded]="isNodeExpanded"
                [isDisabled]="itemDisabled"
                [nodeTemplate]="nodeTemplate"
                [filter]="filter"
                [isVisible]="isNodeVisible"
                (focusout)="handleBlur($event)"
                (keydown)="handleKeydown($event)"
                (selectionChange)="onSelectionChange($event)"
                (expand)="nodeExpand.emit($event)"
                (collapse)="nodeCollapse.emit($event)"
            >
            </kendo-treeview>
            <!--footer template-->
            <ng-template
                *ngIf="footerTemplate"
                [templateContext]="{
                    templateRef: footerTemplate?.templateRef
                }">
            </ng-template>
            <!--no-data template-->
            <div class="k-no-data" *ngIf="data.length === 0 || allNodesHidden">
                <ng-template [ngIf]="noDataTemplate"
                    [templateContext]="{
                        templateRef: noDataTemplate?.templateRef
                    }">
                </ng-template>
                <ng-template [ngIf]="!noDataTemplate">
                    <div>{{ messageFor('noDataText') }}</div>
                </ng-template>
            </div>
        </ng-template>
        <ng-container #container></ng-container>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i0.ElementRef }, { type: i1.PopupService }, { type: i2.NavigationService }, { type: i0.Renderer2 }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: i3.LocalizationService }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [TOUCH_ENABLED]
                }] }]; }, propDecorators: { hostClasses: [{
                type: HostBinding,
                args: ['class.k-dropdowntree']
            }, {
                type: HostBinding,
                args: ['class.k-picker']
            }], hostAriaInvalid: [{
                type: HostBinding,
                args: ['attr.aria-invalid']
            }], isDisabled: [{
                type: HostBinding,
                args: ['class.k-disabled']
            }], isDisabledAttribute: [{
                type: HostBinding,
                args: ['attr.disabled']
            }], isLoading: [{
                type: HostBinding,
                args: ['class.k-loading']
            }], isBusy: [{
                type: HostBinding,
                args: ['attr.aria-busy']
            }], hostAriaControls: [{
                type: HostBinding,
                args: ['attr.aria-controls']
            }], id: [{
                type: HostBinding,
                args: ['attr.id']
            }], direction: [{
                type: HostBinding,
                args: ['attr.dir']
            }], hostTabIndex: [{
                type: HostBinding,
                args: ['attr.tabindex']
            }], role: [{
                type: HostBinding,
                args: ['attr.role']
            }], ariaHasPopup: [{
                type: HostBinding,
                args: ['attr.aria-haspopup']
            }], isAriaExpanded: [{
                type: HostBinding,
                args: ['attr.aria-expanded']
            }], hostAriaAutocomplete: [{
                type: HostBinding,
                args: ['attr.aria-autocomplete']
            }], isReadonly: [{
                type: HostBinding,
                args: ['attr.readonly']
            }], handleClick: [{
                type: HostListener,
                args: ['click']
            }], handleKeydown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }], noDataTemplate: [{
                type: ContentChild,
                args: [NoDataTemplateDirective, { static: false }]
            }], headerTemplate: [{
                type: ContentChild,
                args: [HeaderTemplateDirective, { static: false }]
            }], footerTemplate: [{
                type: ContentChild,
                args: [FooterTemplateDirective, { static: false }]
            }], nodeTemplate: [{
                type: ContentChild,
                args: [NodeTemplateDirective, { static: false }]
            }], valueTemplate: [{
                type: ContentChild,
                args: [ValueTemplateDirective, { static: false }]
            }], popupTemplate: [{
                type: ViewChild,
                args: ['popupTemplate', { static: true }]
            }], container: [{
                type: ViewChild,
                args: ['container', { read: ViewContainerRef, static: true }]
            }], treeview: [{
                type: ViewChild,
                args: ['treeview', { static: false }]
            }], filterInput: [{
                type: ViewChild,
                args: ['filterInput', { static: false }]
            }], open: [{
                type: Output
            }], opened: [{
                type: Output
            }], close: [{
                type: Output
            }], closed: [{
                type: Output
            }], nodeExpand: [{
                type: Output
            }], nodeCollapse: [{
                type: Output
            }], onFocus: [{
                type: Output,
                args: ['focus']
            }], onBlur: [{
                type: Output,
                args: ['blur']
            }], valueChange: [{
                type: Output
            }], filterChange: [{
                type: Output
            }], loading: [{
                type: Input
            }], clearButton: [{
                type: Input
            }], data: [{
                type: Input
            }], value: [{
                type: Input
            }], textField: [{
                type: Input
            }], valueField: [{
                type: Input
            }], valueDepth: [{
                type: Input
            }], hasChildren: [{
                type: Input
            }], fetchChildren: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], popupSettings: [{
                type: Input
            }], dataItem: [{
                type: Input
            }], listHeight: [{
                type: Input
            }], disabled: [{
                type: Input
            }], readonly: [{
                type: Input
            }], valuePrimitive: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], size: [{
                type: Input
            }], rounded: [{
                type: Input
            }], fillMode: [{
                type: Input
            }], itemDisabled: [{
                type: Input
            }], isNodeExpanded: [{
                type: Input
            }], isNodeVisible: [{
                type: Input
            }], loadOnDemand: [{
                type: Input
            }], filterable: [{
                type: Input
            }], filter: [{
                type: Input
            }], focusableId: [{
                type: Input
            }] } });

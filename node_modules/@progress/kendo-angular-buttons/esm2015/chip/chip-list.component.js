/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, HostBinding, ContentChildren, EventEmitter, Output, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocalizationService, L10N_PREFIX } from '@progress/kendo-angular-l10n';
import { ChipComponent } from './chip.component';
import { closest, getStylingClasses } from '../util';
import { validatePackage } from '@progress/kendo-licensing';
import { packageMetadata } from '../package-metadata';
import { Keys } from '@progress/kendo-angular-common';
import * as i0 from "@angular/core";
import * as i1 from "@progress/kendo-angular-l10n";
export class ChipListComponent {
    constructor(localizationService, renderer, element, ngZone) {
        this.localizationService = localizationService;
        this.renderer = renderer;
        this.element = element;
        this.ngZone = ngZone;
        this.hostClass = true;
        this.orientation = 'horizontal';
        /**
         * Sets the selection mode of the ChipList.
         *
         * The available values are:
         * * `none` (default)
         * * `single`
         * * `multiple`
         */
        this.selection = 'none';
        /**
         * Fires each time when the ChipList selection is changed.
         */
        this.selectedChange = new EventEmitter();
        /**
         * Fires each time the user clicks on the remove icon of the Chip.
         */
        this.remove = new EventEmitter();
        this.role = 'listbox';
        this._size = 'medium';
        this.subs = new Subscription();
        validatePackage(packageMetadata);
        this.direction = localizationService.rtl ? 'rtl' : 'ltr';
    }
    /**
     * The size property specifies the gap between the Chips in the ChipList
     * ([see example]({% slug appearance_chiplist %}#toc-size)).
     *
     * The possible values are:
     * * `'small'`
     * * `'medium'` (default)
     * * `'large'`
     * * `none`
     */
    set size(size) {
        const sizeValue = size ? size : 'medium';
        this.handleClasses(sizeValue, 'size');
        this._size = sizeValue;
    }
    get size() {
        return this._size;
    }
    get single() {
        return this.selection === 'single';
    }
    get multiple() {
        return this.selection === 'multiple';
    }
    /**
     * @hidden
     */
    onClick($event) {
        const target = $event.target;
        const isRemoveClicked = closest(target, '.k-chip-remove-action');
        const clickedChip = closest(target, '.k-chip');
        const chip = this.chips.find((chip) => clickedChip === chip.element.nativeElement);
        if (isRemoveClicked && clickedChip) {
            const removeEventArgs = { sender: this, originalEvent: $event, removedChip: chip };
            this.remove.emit(removeEventArgs);
        }
        if (this.selection !== 'none' && clickedChip && !isRemoveClicked) {
            this.setSelection(chip);
        }
    }
    ngOnInit() {
        this.dynamicRTLSubscription = this.localizationService.changes
            .subscribe(({ rtl }) => this.direction = rtl ? 'rtl' : 'ltr');
    }
    ngAfterViewInit() {
        const stylingInputs = ['size'];
        stylingInputs.forEach(input => {
            this.handleClasses(this[input], input);
        });
    }
    ngAfterContentInit() {
        this.chips.forEach((chip) => {
            const chipEl = chip.element.nativeElement;
            this.renderer.setAttribute(chipEl, 'role', 'option');
            if (chip.removable) {
                this.renderer.setAttribute(chipEl, 'aria-keyshortcuts', 'Enter Delete');
            }
            this.renderer.removeAttribute(chipEl, 'aria-pressed');
            this.renderer.setAttribute(chipEl, 'aria-selected', `${chip.selected}`);
        });
        this.attachElementEventHandlers();
    }
    ngOnDestroy() {
        if (this.dynamicRTLSubscription) {
            this.dynamicRTLSubscription.unsubscribe();
        }
        this.subs.unsubscribe();
    }
    selectedChips() {
        return this.chips.reduce((acc, cur, idx) => { return cur.selected ? acc.concat(idx) : acc; }, []);
    }
    /**
     * Updates the selection on click of a Chip. Emits events.
     */
    setSelection(chip) {
        if (this.selection === 'single') {
            this.clearSelection(chip);
        }
        chip.selected = !chip.selected;
        const chipEl = chip.element.nativeElement;
        this.renderer.setAttribute(chipEl, 'aria-selected', `${chip.selected}`);
        this.selectedChange.emit(this.selectedChips());
    }
    clearSelection(chip) {
        this.chips.forEach((c) => {
            if (chip !== c) {
                c.selected = false;
                this.renderer.setAttribute(c.element.nativeElement, 'aria-selected', 'false');
            }
        });
    }
    handleClasses(value, input) {
        const elem = this.element.nativeElement;
        const classes = getStylingClasses('chip-list', input, this[input], value);
        if (classes.toRemove) {
            this.renderer.removeClass(elem, classes.toRemove);
        }
        if (classes.toAdd) {
            this.renderer.addClass(elem, classes.toAdd);
        }
    }
    attachElementEventHandlers() {
        const chiplist = this.element.nativeElement;
        this.ngZone.runOutsideAngular(() => {
            this.subs.add(this.renderer.listen(chiplist, 'keydown', this.keyDownHandler.bind(this)));
        });
    }
    keyDownHandler(e) {
        const isEnterOrSpace = e.keyCode === Keys.Enter || e.keyCode === Keys.Space;
        const isDeleteOrBackspace = e.keyCode === Keys.Delete || e.keyCode === Keys.Backspace;
        if (isEnterOrSpace) {
            const target = e.target;
            const clickedChip = closest(target, '.k-chip');
            const chip = this.chips.find((chip) => clickedChip === chip.element.nativeElement);
            if (this.selection !== 'none' && clickedChip) {
                this.ngZone.run(() => {
                    this.setSelection(chip);
                });
            }
        }
        else if (isDeleteOrBackspace) {
            const target = e.target;
            const clickedChip = closest(target, '.k-chip');
            const chip = this.chips.find((chip) => clickedChip === chip.element.nativeElement);
            if (clickedChip) {
                const removeEventArgs = { sender: this, originalEvent: e, removedChip: chip };
                this.ngZone.run(() => {
                    this.remove.emit(removeEventArgs);
                });
            }
        }
    }
}
ChipListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ChipListComponent, deps: [{ token: i1.LocalizationService }, { token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
ChipListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: ChipListComponent, selector: "kendo-chiplist, kendo-chip-list", inputs: { selection: "selection", size: "size" }, outputs: { selectedChange: "selectedChange", remove: "remove" }, host: { listeners: { "click": "onClick($event)" }, properties: { "class.k-chip-list": "this.hostClass", "attr.aria-orientation": "this.orientation", "attr.dir": "this.direction", "class.k-selection-single": "this.single", "attr.aria-multiselectable": "this.multiple", "class.k-selection-multiple": "this.multiple", "attr.role": "this.role" } }, providers: [
        LocalizationService,
        {
            provide: L10N_PREFIX,
            useValue: 'kendo.chiplist'
        }
    ], queries: [{ propertyName: "chips", predicate: ChipComponent }], ngImport: i0, template: `
        <ng-content></ng-content>
    `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: ChipListComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'kendo-chiplist, kendo-chip-list',
                    template: `
        <ng-content></ng-content>
    `,
                    providers: [
                        LocalizationService,
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.chiplist'
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1.LocalizationService }, { type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i0.NgZone }]; }, propDecorators: { hostClass: [{
                type: HostBinding,
                args: ['class.k-chip-list']
            }], orientation: [{
                type: HostBinding,
                args: ['attr.aria-orientation']
            }], direction: [{
                type: HostBinding,
                args: ['attr.dir']
            }], selection: [{
                type: Input
            }], size: [{
                type: Input
            }], selectedChange: [{
                type: Output
            }], remove: [{
                type: Output
            }], chips: [{
                type: ContentChildren,
                args: [ChipComponent]
            }], single: [{
                type: HostBinding,
                args: ['class.k-selection-single']
            }], multiple: [{
                type: HostBinding,
                args: ['attr.aria-multiselectable']
            }, {
                type: HostBinding,
                args: ['class.k-selection-multiple']
            }], role: [{
                type: HostBinding,
                args: ['attr.role']
            }], onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });

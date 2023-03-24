/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter, ElementRef, Renderer2, AfterViewInit, OnInit, NgZone, OnChanges, SimpleChanges } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { ChipRemoveEvent } from './chip-remove-event-args.interface';
import { ChipContentClickEvent } from './chip-content-click-event-args.interface';
import { ChipFillMode, ChipRounded, ChipSize, ChipThemeColor } from '../common/models';
import * as i0 from "@angular/core";
/**
 * Displays a Chip that represents an input, attribute or an action.
 */
export declare class ChipComponent implements OnInit, AfterViewInit, OnChanges {
    element: ElementRef;
    private renderer;
    private ngZone;
    private localizationService;
    /**
     * Sets the label text of the Chip.
     */
    label: string;
    /**
     * Defines the name for an existing icon in a Kendo UI theme.
     * The icon is rendered inside the Chip by a `span.k-icon` element.
     */
    icon: string;
    /**
     * Defines a CSS class — or multiple classes separated by spaces —
     * which are applied to a span element.
     * Allows the usage of custom icons.
     */
    iconClass: string;
    /**
     * The avatarClass allows the usage of avatar icons rendered in the Chip.
     */
    avatarClass: string;
    /**
     * Specifies the selected state of the Chip.
     * @default false
     */
    selected: boolean;
    /**
     * Specifies if the Chip will be removable or not.
     * If the property is set to `true`, the Chip renders a remove icon.
     * @default false
     */
    removable: boolean;
    /**
     * Specifies a custom remove icon that will be rendered when the Chip is removable.
     * [see example]({% slug icons %})
     */
    removeIcon: string;
    /**
     * If set to `true`, the Chip will be disabled.
     * @default false
     */
    disabled: boolean;
    /**
     * The size property specifies the padding of the Chip
     * ([see example]({% slug appearance_chip %}#toc-size)).
     *
     * The possible values are:
     * * `small`
     * * `medium` (default)
     * * `large`
     * * `none`
     */
    set size(size: ChipSize);
    get size(): ChipSize;
    /**
     * The rounded property specifies the border radius of the Chip
     * ([see example]({% slug appearance_chip %}#toc-rounded)).
     *
     * The possible values are:
     * * `small`
     * * `medium` (default)
     * * `large`
     * * `full`
     * * `none`
     */
    set rounded(rounded: ChipRounded);
    get rounded(): ChipRounded;
    /**
     * The fillMode property specifies the background and border styles of the Chip
     * ([see example]({% slug appearance_chip %}#toc-fillMode)).
     *
     * The possible values are:
     * * `solid` (default)
     * * `outline`
     * * `none`
     */
    set fillMode(fillMode: ChipFillMode);
    get fillMode(): ChipFillMode;
    /**
     * The Chip allows you to specify predefined theme colors.
     * The theme color will be applied as a background and border color while also amending the text color accordingly
     * ([see example]({% slug appearance_chip %}#toc-themeColor)).
     *
     * The possible values are:
     * * `base` (default)
     * * `info`
     * * `success`
     * * `warning`
     * * `error`
     * * `none`
     */
    set themeColor(themeColor: ChipThemeColor);
    get themeColor(): ChipThemeColor;
    /**
     * Fires each time the user clicks the remove icon of the Chip.
     */
    remove: EventEmitter<ChipRemoveEvent>;
    /**
     * Fires each time the user clicks the content of the Chip.
     */
    contentClick: EventEmitter<ChipContentClickEvent>;
    tabIndex: number;
    hostClass: boolean;
    get hasIconClass(): boolean;
    get disabledClass(): boolean;
    get selectedClass(): boolean;
    get focusedClass(): boolean;
    /**
     * @hidden
     */
    direction: string;
    private _size;
    private _rounded;
    private _fillMode;
    private _themeColor;
    private focused;
    private subs;
    constructor(element: ElementRef, renderer: Renderer2, ngZone: NgZone, localizationService: LocalizationService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    /**
     * @hidden
     */
    get kendoIconClass(): string;
    /**
     * @hidden
     */
    get customIconClass(): string;
    /**
     * @hidden
     */
    get chipAvatarClass(): string;
    /**
     * @hidden
     */
    get removeIconClass(): string;
    /**
     * Focuses the Chip component.
     */
    focus(): void;
    /**
     * Blurs the Chip component.
     */
    blur(): void;
    /**
     * @hidden
     */
    onRemoveClick(e: any): void;
    private attachElementEventHandlers;
    /**
     * @hidden
     */
    private verifyIconSettings;
    private handleClasses;
    private handleThemeColor;
    private keyDownHandler;
    static ɵfac: i0.ɵɵFactoryDeclaration<ChipComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ChipComponent, "kendo-chip", never, { "label": "label"; "icon": "icon"; "iconClass": "iconClass"; "avatarClass": "avatarClass"; "selected": "selected"; "removable": "removable"; "removeIcon": "removeIcon"; "disabled": "disabled"; "size": "size"; "rounded": "rounded"; "fillMode": "fillMode"; "themeColor": "themeColor"; }, { "remove": "remove"; "contentClick": "contentClick"; }, never, ["*"]>;
}

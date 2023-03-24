/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { Subscription, from, merge } from "rxjs";
import { and, isNullOrEmptyString, observe, or } from '../utils';
import { DropTargetDirective } from '../dragdrop/drop-target.directive';
import { position, isTargetBefore } from '../dragdrop/common';
import { tap, filter, switchMapTo, takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../dragdrop/drag-hint.service";
import * as i2 from "../dragdrop/drop-cue.service";
import * as i3 from "./group-info.service";
import * as i4 from "@progress/kendo-angular-l10n";
import * as i5 from "./group-indicator.component";
import * as i6 from "@angular/common";
import * as i7 from "../dragdrop/drop-target.directive";
import * as i8 from "../dragdrop/draggable-column.directive";
import * as i9 from "@progress/kendo-angular-common";
const withoutField = ({ field }) => isNullOrEmptyString(field);
const alreadyGrouped = ({ groups, field }) => groups.some(group => group.field === field);
const overSameTarget = ({ target, field }) => target.field === field;
const overLastTarget = ({ target }) => target.lastTarget;
const isLastGroup = ({ groups, field }) => groups.map(group => group.field).indexOf(field) === groups.length - 1;
const isNotGroupable = (groupsService) => ({ field }) => !groupsService.isGroupable(field);
const columnRules = (groupService) => or(withoutField, alreadyGrouped, isNotGroupable(groupService));
const indicatorRules = or(overSameTarget, and(overLastTarget, isLastGroup));
/**
 * @hidden
 */
export class GroupPanelComponent {
    constructor(hint, cue, groupInfoService, localization, cd) {
        this.hint = hint;
        this.cue = cue;
        this.groupInfoService = groupInfoService;
        this.localization = localization;
        this.cd = cd;
        this.change = new EventEmitter();
        this.groups = [];
        this.dropTargets = new QueryList();
        this.groupTitles = [];
        this.subscription = new Subscription();
    }
    get groupHeaderClass() {
        return true;
    }
    set text(value) {
        this.emptyText = value;
    }
    get text() {
        return this.emptyText ? this.emptyText : this.localization.get('groupPanelEmpty');
    }
    ngAfterViewInit() {
        this.subscription.add(observe(this.dropTargets)
            .subscribe(this.attachTargets.bind(this)));
    }
    ngOnInit() {
        this.subscription.add(this.localization.changes.subscribe(() => this.cd.markForCheck()));
    }
    ngDoCheck() {
        const currentTitles = this.groups.map(group => this.groupInfoService.groupTitle(group));
        if (currentTitles.length !== this.groupTitles.length || currentTitles.some((current, idx) => current !== this.groupTitles[idx])) {
            this.groupTitles = currentTitles;
            this.cd.markForCheck();
        }
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.targetSubscription) {
            this.targetSubscription.unsubscribe();
        }
    }
    directionChange(group) {
        const index = this.groups.findIndex(x => x.field === group.field);
        const groups = [...this.groups.slice(0, index), group, ...this.groups.slice(index + 1)];
        this.change.emit(groups);
    }
    insert(field, index) {
        const groups = this.groups.filter(x => x.field !== field);
        if (groups.length || this.groups.length === 0) {
            this.change.emit([...groups.slice(0, index), { field: field }, ...groups.slice(index)]);
        }
    }
    remove(group) {
        this.change.emit(this.groups.filter(x => x.field !== group.field));
    }
    canDrop(draggable, target) {
        const isIndicator = draggable.type === 'groupIndicator';
        const rules = isIndicator
            ? indicatorRules
            : columnRules(this.groupInfoService);
        return !rules({
            field: draggable.field,
            groups: this.groups,
            target
        });
    }
    attachTargets() {
        if (this.targetSubscription) {
            this.targetSubscription.unsubscribe();
        }
        this.targetSubscription = new Subscription();
        const enterStream = this.dropTargets
            .reduce((acc, target) => merge(acc, target.enter), from([]));
        const leaveStream = this.dropTargets
            .reduce((acc, target) => merge(acc, target.leave), from([]));
        const dropStream = this.dropTargets
            .reduce((acc, target) => merge(acc, target.drop), from([]));
        this.targetSubscription.add(enterStream.pipe(tap(_ => this.hint.removeLock()), filter(({ draggable, target }) => this.canDrop(draggable.context, target.context)), tap(this.enter.bind(this)), switchMapTo(dropStream.pipe(takeUntil(leaveStream.pipe(tap(this.leave.bind(this))))))).subscribe(this.drop.bind(this)));
    }
    enter({ draggable, target }) {
        this.hint.enable();
        let before = target.context.lastTarget || isTargetBefore(draggable.element.nativeElement, target.element.nativeElement);
        if (this.localization.rtl) {
            before = !before;
        }
        this.cue.position(position(target.element.nativeElement, before));
    }
    leave() {
        this.hint.disable();
        this.cue.hide();
    }
    drop({ target, draggable }) {
        const field = draggable.context.field;
        const index = this.dropTargets.toArray().indexOf(target);
        this.insert(field, index);
    }
}
GroupPanelComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: GroupPanelComponent, deps: [{ token: i1.DragHintService }, { token: i2.DropCueService }, { token: i3.GroupInfoService }, { token: i4.LocalizationService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
GroupPanelComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: GroupPanelComponent, selector: "kendo-grid-group-panel", inputs: { text: "text", groups: "groups" }, outputs: { change: "change" }, host: { properties: { "class.k-grouping-header": "this.groupHeaderClass", "class.k-grouping-header-flex": "this.groupHeaderClass" } }, viewQueries: [{ propertyName: "dropTargets", predicate: DropTargetDirective, descendants: true }], ngImport: i0, template: `
        <ng-container *ngIf="groups.length === 0">
            <div
                class="k-indicator-container"
                [context]="{
                    lastTarget: true
                }"
                kendoDropTarget>
                {{ text }}
            </div>
        </ng-container>
        <div *ngFor="let group of groups; let index = index;"
            class="k-indicator-container"
            [context]="{
                field: group.field
            }"
            kendoDropTarget>
            <div
                kendoDraggableColumn
                [enableDrag]="true"
                [context]="{
                    field: group.field,
                    type: 'groupIndicator',
                    hint:  groupTitles[index]
                }"
                kendoGroupIndicator
                kendoDraggable
                [group]="group"
                [groupTitle]="groupTitles[index]"
                (directionChange)="directionChange($event)"
                (remove)="remove($event)">
            </div>
        </div>
        <div class="k-indicator-container"
            *ngIf="groups.length !== 0"
            [context]="{
                lastTarget: true
            }"
            kendoDropTarget>&nbsp;</div>
    `, isInline: true, components: [{ type: i5.GroupIndicatorComponent, selector: "[kendoGroupIndicator]", inputs: ["group", "groupTitle"], outputs: ["directionChange", "remove"] }], directives: [{ type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i7.DropTargetDirective, selector: "[kendoDropTarget]", inputs: ["context"], outputs: ["enter", "leave", "drop"] }, { type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i8.DraggableColumnDirective, selector: "[kendoDraggableColumn]", inputs: ["context", "enableDrag"], outputs: ["drag"] }, { type: i9.DraggableDirective, selector: "[kendoDraggable]", inputs: ["enableDrag"], outputs: ["kendoPress", "kendoDrag", "kendoRelease"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: GroupPanelComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-grid-group-panel',
                    template: `
        <ng-container *ngIf="groups.length === 0">
            <div
                class="k-indicator-container"
                [context]="{
                    lastTarget: true
                }"
                kendoDropTarget>
                {{ text }}
            </div>
        </ng-container>
        <div *ngFor="let group of groups; let index = index;"
            class="k-indicator-container"
            [context]="{
                field: group.field
            }"
            kendoDropTarget>
            <div
                kendoDraggableColumn
                [enableDrag]="true"
                [context]="{
                    field: group.field,
                    type: 'groupIndicator',
                    hint:  groupTitles[index]
                }"
                kendoGroupIndicator
                kendoDraggable
                [group]="group"
                [groupTitle]="groupTitles[index]"
                (directionChange)="directionChange($event)"
                (remove)="remove($event)">
            </div>
        </div>
        <div class="k-indicator-container"
            *ngIf="groups.length !== 0"
            [context]="{
                lastTarget: true
            }"
            kendoDropTarget>&nbsp;</div>
    `
                }]
        }], ctorParameters: function () { return [{ type: i1.DragHintService }, { type: i2.DropCueService }, { type: i3.GroupInfoService }, { type: i4.LocalizationService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { change: [{
                type: Output
            }], groupHeaderClass: [{
                type: HostBinding,
                args: ["class.k-grouping-header"]
            }, {
                type: HostBinding,
                args: ["class.k-grouping-header-flex"]
            }], text: [{
                type: Input
            }], groups: [{
                type: Input
            }], dropTargets: [{
                type: ViewChildren,
                args: [DropTargetDirective]
            }] } });

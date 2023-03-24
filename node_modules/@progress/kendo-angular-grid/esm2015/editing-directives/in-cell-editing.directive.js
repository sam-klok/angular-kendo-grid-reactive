/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, Input } from '@angular/core';
import { Keys } from '@progress/kendo-angular-common';
import { EditingDirectiveBase } from './editing-directive-base';
import { markAllAsTouched } from './utils';
import * as i0 from "@angular/core";
import * as i1 from "../grid.component";
import * as i2 from "../editing/local-data-changes.service";
/**
 * A directive which encapsulates the editing operations of the Grid when using the in-cell
 * editing with Reactive Forms ([see example]({% slug editing_directives_grid %}#toc-the-incell-directive)).
 */
export class InCellEditingDirective extends EditingDirectiveBase {
    constructor(grid, localDataChangesService, cdr) {
        super(grid, localDataChangesService);
        this.grid = grid;
        this.localDataChangesService = localDataChangesService;
        this.cdr = cdr;
    }
    // Need mixin
    createModel(args) {
        return this.createFormGroup(args);
    }
    saveModel({ dataItem, formGroup, isNew }) {
        if (!formGroup.dirty && !isNew) {
            return;
        }
        if (formGroup.valid) {
            this.editService.assignValues(dataItem, formGroup.value);
            return dataItem;
        }
        markAllAsTouched(formGroup);
    }
    /**
     * @hidden
     */
    ngOnInit() {
        super.ngOnInit();
        this.subscriptions.add(this.grid.cellClick.subscribe(this.cellClickHandler.bind(this)));
        this.subscriptions.add(this.grid.cellClose.subscribe(this.cellCloseHandler.bind(this)));
    }
    removeHandler(args) {
        super.removeHandler(args);
        this.grid.cancelCell();
    }
    cellClickHandler(args) {
        if (!args.isEdited && args.type !== 'contextmenu') {
            this.grid.editCell(args.rowIndex, args.columnIndex, this.createFormGroup(args));
            this.cdr.markForCheck();
        }
    }
    cellCloseHandler(args) {
        const { formGroup, dataItem } = args;
        if (!formGroup.valid) {
            args.preventDefault();
        }
        else if (formGroup.dirty) {
            if (args.originalEvent && args.originalEvent.keyCode === Keys.Escape) {
                return;
            }
            this.editService.assignValues(dataItem, formGroup.value);
            this.editService.update(dataItem);
        }
    }
}
InCellEditingDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: InCellEditingDirective, deps: [{ token: i1.GridComponent }, { token: i2.LocalDataChangesService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
InCellEditingDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.16", type: InCellEditingDirective, selector: "[kendoGridInCellEditing]", inputs: { createFormGroup: ["kendoGridInCellEditing", "createFormGroup"] }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: InCellEditingDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[kendoGridInCellEditing]'
                }]
        }], ctorParameters: function () { return [{ type: i1.GridComponent }, { type: i2.LocalDataChangesService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { createFormGroup: [{
                type: Input,
                args: ['kendoGridInCellEditing']
            }] } });

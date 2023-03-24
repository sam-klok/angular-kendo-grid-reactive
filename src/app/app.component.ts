import { Component } from '@angular/core';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { process } from '@progress/kendo-data-query';
import { products } from './products';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-kendo-grid';
  public products: unknown[] = products;

  public group: { field: string }[] = [
    {
      field: "Category.CategoryName",
    },
  ];

  // Bind 'this' explicitly to capture the execution context of the component.
  constructor() {
    this.allData = this.allData.bind(this);
  }

  public allData(): ExcelExportData {
    const result: ExcelExportData = {
      data: process(products, {
        group: this.group,
        sort: [{ field: "ProductID", dir: "asc" }],
      }).data,
      group: this.group,
    };

    return result;
  }
}

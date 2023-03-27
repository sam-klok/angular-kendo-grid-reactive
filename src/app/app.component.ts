import { Component } from '@angular/core';
import { IProduct } from './product';
import { ProductsService } from "./products.service";
import { Observable, Subscription, tap, of, catchError, EMPTY } from "rxjs";
import { process } from '@progress/kendo-data-query';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-kendo-grid';
  errorMessage = '';
  products$ = this.productsService.products$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

  public group: { field: string }[] = [
    {
      field: 'Category.CategoryName',
    },
  ];

  
  // allData$ = this.productsService.products$
  //   .pipe(
  //   );

  // this.allData = this.allData.bind(this);

  // public allData(): ExcelExportData {
  //   const result: ExcelExportData = {
  //     data: process(sampleProducts, {
  //       group: this.group,
  //       sort: [{ field: 'ProductID', dir: 'asc' }],
  //     }).data,
  //     group: this.group,
  //   };

  //   return result;
  // }

  

  constructor(private productsService: ProductsService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}

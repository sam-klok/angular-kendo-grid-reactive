import { Component } from '@angular/core';
import { IProduct } from './product';
import { ProductsService } from "./products.service";
import { Observable, Subscription, tap, of, catchError, EMPTY, map } from "rxjs";
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
  emptyExcelExportData = {} as ExcelExportData;

  products$ = this.productsService.products$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

  // Export to Excel with groouping by Category Name
  excelExportData = () : Observable<ExcelExportData> => { 
    return this.productsService.products$
      .pipe(
        map( result => <ExcelExportData> { 
          data: process(
            result, 
            { group: [{ field: 'Category.CategoryName' }],
              sort:  [{ field: 'ProductID', dir: 'asc' }],
            }).data,
          group: [{ field: 'Category.CategoryName' }]}),
        catchError(err => {
          this.errorMessage = err;
          return EMPTY;
        })
      )
  }

  // Export to Excel with no grouping (working)
  // public excelData = ():Observable<ExcelExportData> => {
  //   return this.productsService.products$
  //     .pipe(
  //       map( result => <ExcelExportData>
  //         { data: result,
  //           group: [{ field: 'Category.CategoryName' }]})
  //     )
  // }  


  // constructor() {
  //   this.allData = this.allData.bind(this);
  // }

  constructor(private productsService: ProductsService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}

import { Component } from '@angular/core';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { process } from '@progress/kendo-data-query';
import { IProduct } from './product';
//import { products } from './products';
import { ProductsService } from "./products.service";
import { Subscription, tap } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-kendo-grid';
  //public products: unknown[] = products;
  products: IProduct[] = [];
  errorMessage: string = '';
  sub!: Subscription;

  public group: { field: string }[] = [
    {
      field: "Category.CategoryName",
    },
  ];

  // Bind 'this' explicitly to capture the execution context of the component.
  constructor(private productsService: ProductsService) {
    //this.allData = this.allData.bind(this);
  }

  ngOnInit(): void {
    this.sub = this.productsService.getProducts().subscribe({
      next: products => {
        this.products = products;
        //this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  // public allData(): ExcelExportData {
  //   const result: ExcelExportData = {
  //     data: process(products, {
  //       group: this.group,
  //       sort: [{ field: "ProductID", dir: "asc" }],
  //     }).data,
  //     group: this.group,
  //   };

  //   return result;
  // }
}

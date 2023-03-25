import { Component } from '@angular/core';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { process } from '@progress/kendo-data-query';
import { IProduct } from './product';
//import { products } from './products';
import { ProductsService } from "./products.service";
import { Observable, Subscription, tap, of } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-kendo-grid';

  //products$: Observable<IProduct[]> = new Observable([]);
  products$: Observable<IProduct[]> = this.productsService.getProducts();

  constructor(private productsService: ProductsService) {
    //this.products$ = this.productsService.getProducts();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}

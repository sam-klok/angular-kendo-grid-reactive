import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap, map } from "rxjs"
import { IProduct } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productUrl = 'api/products/products2.json';

  constructor(private http: HttpClient) { }

  products$ = this.http.get<IProduct[]>(this.productUrl)
    .pipe(
      map(products =>
        products.map(product => ({
          ...product,
          //price: product.price ? product.price * 1.5 : 0,
          searchKey: [product.ProductName]
        } as IProduct))),
      tap(data => console.log('Products: ', JSON.stringify(data))),
      catchError(this.handleError)
    );  

  // getProducts(): Observable<IProduct[]> {
  //   return this.http.get<IProduct[]>(this.productUrl).pipe(
  //     tap(data => console.log('All', JSON.stringify(data))),
  //     catchError(this.handleError)
  //   );
  // }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }  
}

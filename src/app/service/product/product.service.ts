import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError, map } from 'rxjs';

import { ProductDto } from 'src/app/model/ProductDto';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  urlPath = 'http://localhost:8090/d-una/api/v1/product';
  errors: string[];

  constructor(private httpClient: HttpClient) {
    this.errors = [];
   }

   saveProduct(product: ProductDto) {
    return this.httpClient.post<any>(this.urlPath, product).pipe(
      map((response: any) => {
        return response.data; 
      }),
      catchError((err: HttpErrorResponse) => {
        this.errors = err.error;
        return throwError(err);
      })
    );
  }

  findAll(){
    return this.httpClient.get<ProductDto[]>(this.urlPath).pipe(
      map((response: any) => {
        return response.data; 
      }),
      catchError(err => {
        return throwError(err);
      })
    )
  }
  
  }

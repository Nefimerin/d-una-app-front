import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError, map } from 'rxjs';
import { Observable } from 'rxjs';

import { ProductDto } from 'src/app/model/ProductDto';


interface ApiResponse<T> {
  data: ProductDto;
}

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

  removeProduct(id: number) {
    return this.httpClient.delete<Response>(`${this.urlPath}/${id}`, { observe: 'response' });
  }

  updateProduct(product: ProductDto) {
    return this.httpClient.put<ProductDto>(`${this.urlPath}/${product.productId}`, product).pipe(
      map((response: any) => {
        return response.data; 
      }),
      catchError((err: HttpErrorResponse) => {
        this.errors = err.error;
        return throwError(err);
      })
    );
  }

  findProductById(code: number): Observable<ProductDto> {
    return this.httpClient.get<ApiResponse<ProductDto>>(`${this.urlPath}/${code}`, { observe: 'response' })
      .pipe(
        map(response => response.body?.data as ProductDto)
      );
  }
  
  }

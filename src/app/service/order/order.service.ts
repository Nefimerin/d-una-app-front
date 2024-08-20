import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError, map } from 'rxjs';
import { Observable } from 'rxjs';
import { OrderRequestDto } from 'src/app/model/OrderRequestDto';
import { OrderResponseDto } from 'src/app/model/OrderResponseDto';

interface ApiResponse<T> {
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private urlPath = 'http://localhost:8090/d-una/api/v1/order';
  private errors: string[];

  constructor(private httpClient: HttpClient) {
    this.errors = [];
  }

  createOrder(order: OrderRequestDto): Observable<OrderRequestDto> {
    return this.httpClient.post<ApiResponse<OrderRequestDto>>(this.urlPath, order).pipe(
      map((response: ApiResponse<OrderRequestDto>) => response.data),
      catchError((err: HttpErrorResponse) => {
        this.errors = err.error;
        return throwError(err);
      })
    );
  }

  getAllOrders(): Observable<OrderResponseDto[]> {
    return this.httpClient.get<ApiResponse<OrderResponseDto[]>>(this.urlPath).pipe(
      map((response: ApiResponse<OrderResponseDto[]>) => response.data),
      catchError(err => throwError(err))
    );
  }

  deleteOrder(id: number): Observable<HttpResponse<void>> {
    return this.httpClient.delete<void>(`${this.urlPath}/${id}`, { observe: 'response' }).pipe(
      catchError((err: HttpErrorResponse) => {
        this.errors = err.error;
        return throwError(err);
      })
    );
  }

  updateOrder(order: OrderRequestDto): Observable<OrderRequestDto> {
    return this.httpClient.put<ApiResponse<OrderRequestDto>>(`${this.urlPath}/${order.orderId}`, order).pipe(
      map((response: ApiResponse<OrderRequestDto>) => response.data),
      catchError((err: HttpErrorResponse) => {
        this.errors = err.error;
        return throwError(err);
      })
    );
  }

  getOrderById(id: number): Observable<OrderResponseDto> {
    return this.httpClient.get<ApiResponse<OrderResponseDto>>(`${this.urlPath}/${id}`).pipe(
      map(response => response.data),
      catchError((err: HttpErrorResponse) => {
        this.errors = err.error;
        return throwError(err);
      })
    );
  }
}

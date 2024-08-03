import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError, map } from 'rxjs';
import { Observable } from 'rxjs';
import { UserRequestDto } from 'src/app/model/UserDto';
import { UserResponseDto } from 'src/app/model/UserResponseDto';

interface ApiResponse<T> {
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  urlPath = 'http://localhost:8090/d-una/api/v1/user';
  errors: string[];

  constructor(private httpClient: HttpClient) {
    this.errors = [];
  }

  saveUser(user: UserRequestDto): Observable<UserRequestDto> {
    return this.httpClient.post<ApiResponse<UserRequestDto>>(this.urlPath, user).pipe(
      map((response: ApiResponse<UserRequestDto>) => response.data),
      catchError((err: HttpErrorResponse) => {
        this.errors = err.error;
        return throwError(err);
      })
    );
  }

  findAllUsers(): Observable<UserResponseDto[]> {
    return this.httpClient.get<ApiResponse<UserResponseDto[]>>(this.urlPath).pipe(
      map((response: ApiResponse<UserResponseDto[]>) => response.data),
      catchError(err => throwError(err))
    );
  }

  removeUser(id: number): Observable<HttpResponse<void>> {
    return this.httpClient.delete<void>(`${this.urlPath}/${id}`, { observe: 'response' }).pipe(
      catchError((err: HttpErrorResponse) => {
        this.errors = err.error;
        return throwError(err);
      })
    );
  }

  updateUser(user: UserRequestDto): Observable<UserRequestDto> {
    return this.httpClient.put<ApiResponse<UserRequestDto>>(`${this.urlPath}/${user.id}`, user).pipe(
      map((response: ApiResponse<UserRequestDto>) => response.data),
      catchError((err: HttpErrorResponse) => {
        this.errors = err.error;
        return throwError(err);
      })
    );
  }

  findUserById(id: number): Observable<UserRequestDto> {
    return this.httpClient.get<ApiResponse<UserRequestDto>>(`${this.urlPath}/${id}`).pipe(
      map(response => response.data),
      catchError((err: HttpErrorResponse) => {
        this.errors = err.error;
        return throwError(err);
      })
    );
  }
}

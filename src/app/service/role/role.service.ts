import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError, map } from 'rxjs';
import { Observable } from 'rxjs';

import { RoleDto } from 'src/app/model/RoleDto';


interface ApiResponse<T> {
  data: RoleDto;
}

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  urlPath = 'http://localhost:8090/d-una/api/v1/role';
  errors: string[];
  

  constructor(private httpClient: HttpClient) {
    this.errors = [];
   }

   saveRole(role: RoleDto) {
    return this.httpClient.post<any>(this.urlPath, role).pipe(
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
    return this.httpClient.get<RoleDto[]>(this.urlPath).pipe(
      map((response: any) => {
        return response.data; 
      }),
      catchError(err => {
        return throwError(err);
      })
    )
  }

  removeRole(id: number) {
    return this.httpClient.delete<Response>(`${this.urlPath}/${id}`, { observe: 'response' });
  }

  updateRole(role: RoleDto) {
    return this.httpClient.put<RoleDto>(`${this.urlPath}/${role.roleId}`, role).pipe(
      map((response: any) => {
        return response.data; 
      }),
      catchError((err: HttpErrorResponse) => {
        this.errors = err.error;
        return throwError(err);
      })
    );
  }

  findRoleById(code: number): Observable<RoleDto> {
    return this.httpClient.get<ApiResponse<RoleDto>>(`${this.urlPath}/${code}`, { observe: 'response' })
      .pipe(
        map(response => response.body?.data as RoleDto)
      );
  }
  
  }

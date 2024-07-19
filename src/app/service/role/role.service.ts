import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError, map } from 'rxjs';
import { RoleDto } from 'src/app/model/RoleDto';


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
  
  }

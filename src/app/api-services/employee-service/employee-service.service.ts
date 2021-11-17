import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "../../domain-classes/employee/employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  /*
   Data & Properties.
   */

  baseUrl : string = "http://localhost:6060/api/v1/employee";
  headers : HttpHeaders  = new HttpHeaders({'Content-Type': 'application/json'});

  /*
   Constructor & Methods
   */

  constructor(private httpClient : HttpClient) {
  }

  getEmployeeList(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.baseUrl}`,{headers : this.headers});
  }

  createNewEmployee(employee : Employee): Observable<Employee>{
    return this.httpClient.post<Employee>(`${this.baseUrl}`, employee,{headers : this.headers});
  }

  getEmployeeById(id : number | undefined): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.baseUrl}/id/${id}`,{headers : this.headers});
  }

  updateExistingEmployee(employee : Employee): Observable<Employee>{
    return this.httpClient.put<Employee>(`${this.baseUrl}`, employee,{headers : this.headers});
  }

  deleteEmployeeById(id : number | undefined): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/id/${id}`,{headers : this.headers});
  }
}

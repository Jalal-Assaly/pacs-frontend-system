import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employees.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private employeesServerUrl = 'https://192.168.1.38:8088/attributes-management/users-attributes/employee';

  constructor(private http: HttpClient) { }

  // Subscriber functions
  public getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.employeesServerUrl}/list`);
  }
  public getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.employeesServerUrl}/find/id/${id}`);
  }
  public addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.employeesServerUrl}/add`, employee);
  }

  public updateEmployee(employee: Employee, employeeId: string): Observable<Employee> {
    return this.http.put<Employee>(`${this.employeesServerUrl}/update/${employeeId}`, employee);
  }

  public deleteEmployee(employeeId: string): Observable<any> {
    return this.http.delete<void>(`${this.employeesServerUrl}/delete/${employeeId}`);
  }
}
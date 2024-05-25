import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EmployeeLog } from '../models/employee-logs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeLogsService {
  private employeeLogsServerUrl = 'https://192.168.1.38:8088/access-control';

  constructor(private http: HttpClient) { }

  // Subscriber functions
  public getAllEmployeeLogs(): Observable<EmployeeLog[]> {
    return this.http.get<EmployeeLog[]>(`${this.employeeLogsServerUrl}/list/logs/employees`);
  }

  public deleteEmployeeLogs(id: string): Observable<any> {
    return this.http.delete<void>(`${this.employeeLogsServerUrl}/delete/${id}`);
  }
}
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserCredentials } from '../models/user-credentials.model'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeCredentialsService {
  private employeeCredentialsServerUrl = 'https://192.168.1.38:8081/user-credentials/employee';

  constructor(private http: HttpClient) { }

  // Subscriber functions
  public getAllEmployeeCredentials(): Observable<UserCredentials[]> {
    return this.http.get<UserCredentials[]>(`${this.employeeCredentialsServerUrl}/list`);
  }

  public getEmployeeCredentialsById(id: string): Observable<UserCredentials> {
    return this.http.get<UserCredentials>(`${this.employeeCredentialsServerUrl}/find/id/${id}`);
  }

  public getEmployeeCredentialsByEmail(email: string): Observable<UserCredentials> {
    return this.http.get<UserCredentials>(`${this.employeeCredentialsServerUrl}/find/email/${email}`);
  }

  public deleteEmployeeCredentials(id: string): Observable<any> {
    return this.http.delete<void>(`${this.employeeCredentialsServerUrl}/delete/${id}`);
  }
}
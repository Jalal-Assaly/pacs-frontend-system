import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserCredentials } from '../models/user-credentials.model'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeCredentialsService {
  private apiServerUrl = 'http://localhost:8081/user-credentials/employee';

  constructor(private http: HttpClient) { }

  // Subscriber functions
  public getAllEmployeeCredentials(): Observable<UserCredentials[]> {
    return this.http.get<UserCredentials[]>(`${this.apiServerUrl}/list`);
  }
}
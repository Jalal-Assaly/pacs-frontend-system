import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserCredentials } from '../models/user-credentials.model'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VisitorCredentialsService {
  private visitorCredentialsServerUrl = 'https://pacserverpi.local:8088/user-credentials/visitor';

  constructor(private http: HttpClient) { }

  // Subscriber functions
  public getAllVisitorCredentials(): Observable<UserCredentials[]> {
    return this.http.get<UserCredentials[]>(`${this.visitorCredentialsServerUrl}/list`);
  }

  public getVisitorCredentialsById(id: string): Observable<UserCredentials> {
    return this.http.get<UserCredentials>(`${this.visitorCredentialsServerUrl}/find/id/${id}`);
  }

  public getVisitorCredentialsByEmail(email: string): Observable<UserCredentials> {
    return this.http.get<UserCredentials>(`${this.visitorCredentialsServerUrl}/find/email/${email}`);
  }

  public deleteVisitorCredentials(id: string): Observable<any> {
    return this.http.delete<void>(`${this.visitorCredentialsServerUrl}/delete/${id}`);
  }
}
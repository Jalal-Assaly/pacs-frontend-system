import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Visitor } from '../models/visitor';

@Injectable({
  providedIn: 'root'
})
export class VisitorManagementService {

  private visitorManagementServerUrl = 'http://192.168.1.38:8088/visitor-management';

  constructor(private http: HttpClient) { }

  // Subscriber functions
  public getAllVisitors(): Observable<Visitor[]> {
    return this.http.get<Visitor[]>(`${this.visitorManagementServerUrl}/list`);
  }

  public getVisitorCredentialsByEmail(email: string): Observable<Visitor> {
    return this.http.get<Visitor>(`${this.visitorManagementServerUrl}/find/info/email/${email}`);
  }

  public getVisitorAttributesByEmail(email: string): Observable<Visitor> {
    return this.http.get<Visitor>(`${this.visitorManagementServerUrl}/find/attributes/email/${email}`);
  }

  public addVisitor(visitor: Visitor): Observable<any> {
    return this.http.post<void>(`${this.visitorManagementServerUrl}/add`, visitor);
  }

  public updateVisitor(id: string, visitor: Visitor): Observable<any> {
    return this.http.put<void>(`${this.visitorManagementServerUrl}/update/${id}`, visitor);
  }

  public deleteVisitor(id: string): Observable<any> {
    return this.http.delete<void>(`${this.visitorManagementServerUrl}/delete/${id}`);
  }
}
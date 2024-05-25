import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Visitor } from '../models/visitors.model'
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employees.model';

@Injectable({
  providedIn: 'root'
})
export class VisitorsService {
  private visitorsServerUrl = 'https://192.168.1.38:8082/attributes-management/users-attributes/visitor';

  constructor(private http: HttpClient) { }

  // Subscriber functions
  public getAllVisitors(): Observable<Visitor[]> {
    return this.http.get<Visitor[]>(`${this.visitorsServerUrl}/list`);
  }
  public getVisitorById(id: string): Observable<Visitor> {
    return this.http.get<Visitor>(`${this.visitorsServerUrl}/find/id/${id}`);
  }
  public addVisitor(visitor: Visitor): Observable<Visitor> {
    return this.http.post<Employee>(`${this.visitorsServerUrl}/add`, visitor);
  }

  public updateVisitor(visitor: Visitor, visitorId: string): Observable<Visitor> {
    return this.http.put<Visitor>(`${this.visitorsServerUrl}/update/${visitorId}`, visitor);
  }

  public deleteVisitor(visitorId: string): Observable<any> {
    return this.http.delete<void>(`${this.visitorsServerUrl}/delete/${visitorId}`);
  }
}
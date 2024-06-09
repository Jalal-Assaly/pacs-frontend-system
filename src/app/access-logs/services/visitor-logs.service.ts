import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { VisitorLog } from '../models/visitor-logs';

@Injectable({
  providedIn: 'root'
})
export class VisitorLogsService {
  private visitorLogsServerUrl = 'https://pacserverpi.local:8088/access-control';

  constructor(private http: HttpClient) { }

  // Subscriber functions
  public getAllVisitorLogs(): Observable<VisitorLog[]> {
    return this.http.get<VisitorLog[]>(`${this.visitorLogsServerUrl}/list/logs/visitors`);
  }

  public deleteVisitorLogs(id: string): Observable<any> {
    return this.http.delete<void>(`${this.visitorLogsServerUrl}/delete/visitor/log/${id}`);
  }
}
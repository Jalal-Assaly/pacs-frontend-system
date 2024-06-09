import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccessPoint } from '../models/access-points.model'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccessPointsService {
  private accesspointsServerUrl = 'https://pacserverpi.local:8088/attributes-management/access-points-attributes';

  constructor(private http: HttpClient) { }

  // Subscriber functions
  public getAllAccessPoints(): Observable<AccessPoint[]> {
    return this.http.get<AccessPoint[]>(`${this.accesspointsServerUrl}/list`);
  }
  public getAccessPointById(id: string): Observable<AccessPoint> {
    return this.http.get<AccessPoint>(`${this.accesspointsServerUrl}/find/id/${id}`);
  }
  public addAccesspoint(accessPoint: AccessPoint): Observable<AccessPoint> {
    return this.http.post<AccessPoint>(`${this.accesspointsServerUrl}/add`, accessPoint);
  }

  public updateAccessPoint(accessPoint: AccessPoint, accessPointId: string): Observable<AccessPoint> {
    return this.http.put<AccessPoint>(`${this.accesspointsServerUrl}/admin-update/${accessPointId}`, accessPoint);
  }

  public deleteAccessPoint(accessPointId: string): Observable<any> {
    return this.http.delete<void>(`${this.accesspointsServerUrl}/delete/${accessPointId}`);
  }
}
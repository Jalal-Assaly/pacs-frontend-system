import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccessPoint } from '../models/access-points.model'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccessPointsService {
  private apiServerUrl = 'http://localhost:8082/access-points-attributes';

  constructor(private http: HttpClient) { }

  // Subscriber functions
  public getAllAccessPoints(): Observable<AccessPoint[]> {
    return this.http.get<AccessPoint[]>(`${this.apiServerUrl}/list`);
  }
}
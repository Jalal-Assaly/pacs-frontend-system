import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccessPolicy } from '../models/access-policies.model'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccessPoliciesService {
  private accesspoliciesServerUrl = 'http://localhost:8085/access-policies';

  constructor(private http: HttpClient) { }

  // Subscriber functions
  public getAllAccessPolicies(): Observable<AccessPolicy[]> {
    return this.http.get<AccessPolicy[]>(`${this.accesspoliciesServerUrl}/list`);
  }
  public getAccessPolicyByLocation(location: string): Observable<AccessPolicy> {
    return this.http.get<AccessPolicy>(`${this.accesspoliciesServerUrl}/find/location/${location}`);
  }
  public addAccessPolicy(accessPolicy: AccessPolicy): Observable<AccessPolicy> {
    return this.http.post<AccessPolicy>(`${this.accesspoliciesServerUrl}/add`, accessPolicy);
  }

  public updateAccessPolicy(accessPolicy: AccessPolicy, accessPolicyId: string): Observable<AccessPolicy> {
    return this.http.put<AccessPolicy>(`${this.accesspoliciesServerUrl}/update/${accessPolicyId}`, accessPolicy);
  }

  public deleteAccessPolicy(accessPolicyId: string): Observable<any> {
    return this.http.delete<void>(`${this.accesspoliciesServerUrl}/delete/${accessPolicyId}`);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HealthCheckResponse } from '../types/health-check.types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private apiUrl = import.meta.env['NG_APP_API_URL'];

  constructor(private httpClient: HttpClient) {}

  checkHealth(): Observable<HealthCheckResponse> {
    return this.httpClient.get<HealthCheckResponse>(this.apiUrl);
  }
}
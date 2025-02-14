import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HealthCheckResponse } from '../types/health-check.types';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  checkHealth(): Observable<HealthCheckResponse> {
    return this.httpClient.get<HealthCheckResponse>(this.apiUrl);
  }
}
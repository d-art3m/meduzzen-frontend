import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = import.meta.env['NG_APP_API_URL'];

  constructor(private http: HttpClient) {}

  getUsers(page: number = 1, limit: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get(`${this.apiUrl}/users`, { params });
  }

  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${id}`);
  }

  updateUser(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/me`, data);
  }

  deleteUser(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/me`);
  }
}

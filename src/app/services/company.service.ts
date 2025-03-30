import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company, CompanyType } from '../models/company.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private apiUrl = import.meta.env['NG_APP_API_URL'];

  constructor(private http: HttpClient) {}

  getCompanies(
    type: CompanyType = CompanyType.Public,
    page: number = 1,
    limit: number = 10
  ): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    const endpoint =
      type === CompanyType.Personal
        ? `${this.apiUrl}/companies/personal`
        : `${this.apiUrl}/companies`;

    return this.http.get(endpoint, { params });
  }

  getCompanyById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/companies/${id}`);
  }

  createCompany(companyData: Partial<Company>): Observable<any> {
    return this.http.post(`${this.apiUrl}/companies`, companyData);
  }

  updateCompany(id: string, companyData: Partial<Company>): Observable<any> {
    return this.http.put(`${this.apiUrl}/companies/${id}`, companyData);
  }

  deleteCompany(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/companies/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz } from '../models/quiz.model';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private apiUrl = import.meta.env['NG_APP_API_URL'];

  constructor(private http: HttpClient) {}

  createQuiz(quizData: Quiz): Observable<any> {
    return this.http.post(`${this.apiUrl}/quizzes`, quizData);
  }

  getPublicQuizzes(page: number = 1, limit: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get(`${this.apiUrl}/quizzes`, { params });
  }

  getQuizzesByCompanyId(companyId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/quizzes/company/${companyId}`);
  }

  getQuizById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/quizzes/${id}`);
  }

  updateQuiz(id: string, quizData: Partial<Quiz>): Observable<any> {
    return this.http.put(`${this.apiUrl}/quizzes/${id}`, quizData);
  }

  deleteQuiz(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/quizzes/${id}`);
  }
}

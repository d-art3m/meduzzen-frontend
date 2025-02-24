import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, catchError, EMPTY, Observable, switchMap, tap } from 'rxjs';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { User } from '../models/user.model';
import { Auth } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private TOKEN_KEY = 'auth_token';

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private auth0: Auth0Service) {}
  
  private saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.currentUserSubject.next(null);
    this.auth0.logout({ logoutParams: { returnTo: window.location.origin } });
  }

  signUp(user: Partial<User>): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, user);
  }

  signIn(credentials: Auth): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/signin`, credentials)
      .pipe(
        tap((res: any) => {
          this.saveToken(res.detail.access_token);
          this.currentUserSubject.next(res.detail.user);
        })
      );
  }

  getCurrentUser(): void {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    this.http.get(`${this.apiUrl}/users/me`, { headers })
      .pipe(
        tap((res: any) => this.currentUserSubject.next(res.detail))
      )
      .subscribe();
  }

  loginWithAuth0(): void {
    this.auth0.loginWithRedirect();
  }

  handleAuth0Token(): void {
    this.auth0.getAccessTokenSilently().pipe(
      switchMap(token => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post(`${this.apiUrl}/auth/auth0`, {}, { headers });
      }),
      tap((res: any) => {
        this.saveToken(res.detail.access_token);
        this.currentUserSubject.next(res.detail.user);
      }),
      catchError(() => {
        return EMPTY;
      })
    ).subscribe();
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { User } from '../models/user.model';
import { Auth } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = import.meta.env['NG_APP_API_URL'];
  private ACCESS_TOKEN_KEY = 'access_token';
  private REFRESH_TOKEN_KEY = 'refresh_token';

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private auth0: Auth0Service) {}
  
  private saveAccessToken(token: string): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
  }

  private saveRefreshToken(refreshToken: string): void {
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    return !!token;
  }

  logout(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    this.currentUserSubject.next(null);
    this.auth0.logout({ logoutParams: { returnTo: window.location.origin } });
  }

  signUp(user: Partial<User>): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/signup`, user);
  }

  signIn(credentials: Auth): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/signin`, credentials)
      .pipe(
        tap((res: any) => {
          this.saveAccessToken(res.detail.access_token);
          this.saveRefreshToken(res.detail.refresh_token);
        })
      );
  }

  setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): void {
    this.http.get(`${this.apiUrl}/users/me`)
      .pipe(
        tap((res: any) => this.currentUserSubject.next(res.detail))
      )
      .subscribe();
  }

  refreshAccessToken(refreshToken: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/refresh`, { refresh_token: refreshToken }).pipe(
      tap((res: any) => {
        this.saveAccessToken(res.detail.access_token);
      })
    );
  }

  loginWithAuth0(): void {
    this.auth0.loginWithRedirect();
  }

  handleAuth0Token(): void {
    this.auth0.getAccessTokenSilently().subscribe(token => {
      this.saveAccessToken(token);
      this.getCurrentUser();
    });
  }

}

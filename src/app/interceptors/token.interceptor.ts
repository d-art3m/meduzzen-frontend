import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`)
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getAccessToken();
    let req = request;
    if (token) {
      req = this.addToken(request, token);
    }
    
    return next.handle(req).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          const refreshToken = this.authService.getRefreshToken();
          if (refreshToken) {
            return this.authService.refreshAccessToken(refreshToken).pipe(
              switchMap((res: any) => {
                const newToken = res.detail.access_token;
                return next.handle(this.addToken(request, newToken));
              }),
              catchError(err => {
                this.authService.logout();
                return throwError(() => err);
              })
            );
          }
        }
        return throwError(() => error);
      })
    );
  }
}
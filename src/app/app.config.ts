import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthModule } from '@auth0/auth0-angular';
import { TokenInterceptor } from './interceptors/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(AuthModule.forRoot({
      domain: import.meta.env['NG_APP_AUTH0_DOMAIN'],
      clientId: import.meta.env['NG_APP_AUTH0_CLIENT_ID'],
      
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: import.meta.env['NG_APP_AUTH0_AUDIENCE'],
        scope: 'openid profile email',
      },
    })),
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
};

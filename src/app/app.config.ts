import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { AuthModule } from '@auth0/auth0-angular';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(AuthModule.forRoot({
      domain: environment.domain,
      clientId: environment.clientId,
      
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: environment.apiUrl,
        scope: 'openid profile email',
      },
    })),
  ],
};

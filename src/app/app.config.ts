import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { HurecomPreset } from '@/hurecom-preset';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { DialogService } from 'primeng/dynamicdialog';
import { routes } from './app.routes';
import { apiInterceptor } from './core/interceptors/api.interceptor';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { API_BASE_URL } from './core/tokens/api.token';

const apiBaseUrl =
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1'
    ? 'http://localhost:8080'
    : `${window.location.protocol}//${window.location.host}`;

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([authInterceptor, apiInterceptor])
    ),
    providePrimeNG({
      theme: {
        preset: HurecomPreset,
      }
    }),
    DialogService,
    MessageService,
    { provide: API_BASE_URL, useValue: apiBaseUrl }
  ]
};

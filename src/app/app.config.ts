import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

// --- Imports ที่จำเป็นสำหรับ Interceptor ---
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
// -----------------------------------------

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),

    // --- การตั้งค่าสำหรับ HttpClient และ Interceptor ---
    // 1. ทำให้ HttpClient รู้จักการทำงานกับ Interceptor แบบ Class-based
    provideHttpClient(withInterceptorsFromDi()),

    // 2. ลงทะเบียน AuthInterceptor ของเรา
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    // ----------------------------------------------
  ],
};

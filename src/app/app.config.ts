import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { TokenInterceptor } from '@core/services/common/http-interceptor';
import { MessageService } from 'primeng/api';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (
  http: HttpClient
) => new TranslateHttpLoader(http, './i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([TokenInterceptor])),
    MessageService,
    importProvidersFrom(BrowserAnimationsModule),
    provideTranslateService({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
};

import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import {
  HttpClientModule,
  provideHttpClient,
  withInterceptorsFromDi,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';

import { routes } from './app.routes';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';




export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),

    provideHttpClient(withInterceptorsFromDi()),

    importProvidersFrom(
      HttpClientModule,
      ReactiveFormsModule,

      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatSnackBarModule,
      MatTableModule,
      MatToolbarModule,
      MatIconModule,
      MatSelectModule
    ),

    // ✅ Register JWT interceptor
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
};


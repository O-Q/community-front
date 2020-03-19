import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './components/shared/error/error.component';
import { HomeComponent } from './components/shared/home/home.component';
import { MaterialBaseModule } from './material.module';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginComponent } from './components/shared/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';
import { ACCESS_TOKEN_KEY } from './constants/local-storage.constant';
import { LoadWidgetMap } from './components/widgets/lazy-widgets';
import { LAZY_WIDGETS } from './components/widgets/tokens';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/auth.interceptor';

@NgModule({
  declarations: [
    ErrorComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialBaseModule,
    ReactiveFormsModule,
  ],
  exports: [
    ErrorComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSidenavModule,
  ],
  providers: [
    { provide: LAZY_WIDGETS, useFactory: LoadWidgetMap },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],

})
export class CoreModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './components/shared/error/error.component';
import { HomeComponent } from './components/shared/home/home.component';
import { MaterialBaseModule } from './material.module';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import {
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatSidenavModule
} from '@angular/material';
import { LoginComponent } from './components/shared/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';
import { ACCESS_TOKEN_KEY } from './constants/local-storage.constant';
import { LoadWidgetMap } from './components/widgets/lazy-widgets';
import { LAZY_WIDGETS } from './components/widgets/tokens';

export function appTokenGetter() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}
@NgModule({
  declarations: [
    ErrorComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    MaterialBaseModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: appTokenGetter,
        whitelistedDomains: [environment.urls.baseUrl]
      }
    }),
  ],
  exports: [
    ErrorComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSidenavModule,
    JwtModule
  ],
  entryComponents: [LoginComponent],
  providers: [
    { provide: LAZY_WIDGETS, useFactory: LoadWidgetMap }]
})
export class CoreModule { }

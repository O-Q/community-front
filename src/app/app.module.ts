import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppStoreModule } from './store/app-store.module';
import { SharedModule } from './components/shared/shared.module';
import { MaterialBaseModule } from './material.module';
import { MatSidenavModule } from '@angular/material';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { ACCESS_TOKEN_KEY } from './constants/local-storage.constant';
export function appTokenGetter() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: appTokenGetter,
        whitelistedDomains: [environment.urls.baseUrl]
      }
    }),
    AppRoutingModule,
    AppStoreModule,
    MaterialBaseModule,
    MatSidenavModule,
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

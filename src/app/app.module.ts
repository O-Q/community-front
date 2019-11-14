import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material';
import { JwtModule } from '@auth0/angular-jwt';

import { environment } from '../environments/environment';
import { LAZY_WIDGETS } from './components/widgets/tokens';
import { ACCESS_TOKEN_KEY } from './constants/local-storage.constant';
import { MaterialBaseModule } from './material.module';
import { AppStoreModule } from './store/app-store.module';
import { SharedModule } from './components/shared/shared.module';
import { LoadWidgetMap } from './components/widgets/lazy-widgets';
import { AppComponent } from './app.component';

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
  providers: [
    { provide: LAZY_WIDGETS, useFactory: LoadWidgetMap }],

  bootstrap: [AppComponent]
})
export class AppModule { }

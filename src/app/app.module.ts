import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { MatSidenavModule } from '@angular/material';
import { AppComponent } from './app.component';
import { AppStoreModule } from './store/app-store.module';
import { SharedModule } from './components/shared/shared.module';
import { MaterialBaseModule } from './material.module';
import { environment } from '../environments/environment';
import { ACCESS_TOKEN_KEY } from './constants/local-storage.constant';
import { LAZY_WIDGETS } from './components/widgets/tokens';
import { LoadWidgetMap } from './components/widgets/lazy-widgets';
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
  providers: [{ provide: LAZY_WIDGETS, useFactory: LoadWidgetMap }],
  bootstrap: [AppComponent]
})
export class AppModule {}

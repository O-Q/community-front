import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { JwtModule } from '@auth0/angular-jwt';

import { environment } from '../environments/environment';
import { LAZY_WIDGETS } from './components/widgets/tokens';
import { ACCESS_TOKEN_KEY } from './constants/local-storage.constant';
import { MaterialBaseModule } from './material.module';
import { AppStoreModule } from './store/app-store.module';
import { CoreModule } from './core.module';
import { LoadWidgetMap } from './components/widgets/lazy-widgets';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AppStoreModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

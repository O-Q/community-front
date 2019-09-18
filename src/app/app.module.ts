import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppStoreModule } from './store/app-store.module';
import { SharedModule } from './shared/shared.module';
import { MaterialBaseModule } from './material.module';
import { MatSidenavModule } from '@angular/material';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppStoreModule,
    MaterialBaseModule,
    MatSidenavModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

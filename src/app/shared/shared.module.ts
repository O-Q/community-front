import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { MaterialBaseModule } from '../material.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {
  MatSidenavModule,
  MatSlideToggleModule,
  MatMenuModule,
  MatListModule,
  MatDialogModule,
  MatInputModule
} from '@angular/material';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

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
    MatSlideToggleModule,
    MatMenuModule,
    MatListModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  exports: [ErrorComponent, HomeComponent, HeaderComponent, FooterComponent],
  entryComponents: [LoginComponent]
})
export class SharedModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { MaterialBaseModule } from '../../material.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {
  MatSlideToggleModule,
  MatMenuModule,
  MatListModule,
  MatDialogModule,
  MatInputModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
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
    RouterModule,
    MaterialBaseModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatListModule,
    MatDialogModule,
    MatInputModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule
  ],
  exports: [ErrorComponent, HomeComponent, HeaderComponent, FooterComponent],
  entryComponents: [LoginComponent]
})
export class SharedModule {}

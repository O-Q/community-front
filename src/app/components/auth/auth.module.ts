import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialBaseModule } from 'src/app/material.module';
import { MatInputModule } from '@angular/material/input';
import { RegisterComponent } from './register-rule/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatCheckboxModule,
  MatTooltipModule,
  MatDialogModule
} from '@angular/material';
import { RegisterRuleComponent } from './register-rule/register-rule.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AppCommonModule } from '../common/common.module';

@NgModule({
  declarations: [
    RegisterComponent,
    RegisterRuleComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    MatInputModule,
    MatCheckboxModule,
    MatTooltipModule,
    MaterialBaseModule
  ]
})
export class AuthModule {}

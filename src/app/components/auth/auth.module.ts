import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialBaseModule } from 'src/app/material.module';
import { MatInputModule } from '@angular/material/input';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatCheckboxModule,
  MatDividerModule,
  MatTooltipModule
} from '@angular/material';
import { RegisterRuleComponent } from './register-rule/register-rule.component';

@NgModule({
  declarations: [RegisterComponent, RegisterRuleComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    MatInputModule,
    MatCheckboxModule,
    MatTooltipModule,
    MaterialBaseModule
  ]
})
export class AuthModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterRuleComponent } from './register-rule/register-rule.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SuccessComponent } from '../common/success/success.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'register', component: RegisterRuleComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {
    path: 'register-done',
    component: SuccessComponent,
    data: {
      message: 'ثبت‌نام شما با موفقیت انجام شد.',
      iconName: 'check_circle'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}

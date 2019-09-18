import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterRuleComponent } from './register-rule/register-rule.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'register', component: RegisterRuleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { ProfileComponent } from './profile/profile.component';
import { AccountComponent } from './account/account.component';
import { PrivacyComponent } from './privacy/privacy.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'profile'
  },
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: 'profile', component: ProfileComponent, data: {
          title: 'پروفایل من',
        }
      },
      {
        path: 'account', component: AccountComponent, data: {
          title: 'حساب کاربری'
        }
      },
      {
        path: 'privacy', component: PrivacyComponent, data: {
          title: 'حریم خصوصی'
        }
      }


    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }

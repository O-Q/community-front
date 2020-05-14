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
      { path: 'profile', component: ProfileComponent },
      { path: 'account', component: AccountComponent },
      { path: 'privacy', component: PrivacyComponent }


    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }

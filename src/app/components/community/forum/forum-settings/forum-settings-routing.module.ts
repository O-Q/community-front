import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForumSettingsComponent } from './forum-settings.component';
import { ForumSettingsWidgetsComponent } from './forum-settings-widgets/forum-settings-widgets.component';
import { ForumSettingsGeneralComponent } from './forum-settings-general/forum-settings-general.component';
import { ForumSettingsPermissionComponent } from './forum-settings-permission/forum-settings-permission.component';
import { CanSaveDeactivateGuard } from '../../../../utils/unsave-guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'general'
  },
  {
    path: '',
    component: ForumSettingsComponent,
    children: [
      { path: 'widgets', component: ForumSettingsWidgetsComponent, canDeactivate: [CanSaveDeactivateGuard] },
      { path: 'general', component: ForumSettingsGeneralComponent, canDeactivate: [CanSaveDeactivateGuard] },
      { path: 'permission', component: ForumSettingsPermissionComponent, canDeactivate: [CanSaveDeactivateGuard] },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForumSettingsRoutingModule { }

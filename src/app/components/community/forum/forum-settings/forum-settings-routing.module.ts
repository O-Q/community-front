import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForumSettingsComponent } from './forum-settings.component';
import { ForumSettingsWidgetsComponent } from './forum-settings-widgets/forum-settings-widgets.component';
import { ForumSettingsGeneralComponent } from './forum-settings-general/forum-settings-general.component';
import { ForumSettingsPermissionComponent } from './forum-settings-permission/forum-settings-permission.component';
import { CanSaveDeactivateGuard } from '@app/guards/unsave-guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'general'
  },
  {
    path: '',
    component: ForumSettingsComponent,
    children: [
      {
        path: 'widgets', component: ForumSettingsWidgetsComponent, canDeactivate: [CanSaveDeactivateGuard], data: {
          title: 'تنظیمات - ویجت‌ها',
          description: 'تنظیم و شخصی‌سازی ویجت‌های بلاگ'
        },
      },
      {
        path: 'general', component: ForumSettingsGeneralComponent, canDeactivate: [CanSaveDeactivateGuard],
        data: {
          title: 'تنظیمات - اطلاعات کلی',
          description: 'تنظیم و شخصی‌سازی اطلاعات کلی بلاگ'
        },
      },
      {
        path: 'permission', component: ForumSettingsPermissionComponent, canDeactivate: [CanSaveDeactivateGuard],
        data: {
          title: 'تنظیمات - دسترسی‌ها',
          description: 'تنظیم و شخصی‌سازی دسترسی‌ها و اعضا'
        }
      },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForumSettingsRoutingModule { }

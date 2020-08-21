import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForumSettingsWidgetsComponent } from '../../forum/forum-settings/forum-settings-widgets/forum-settings-widgets.component';
import { CanSaveDeactivateGuard } from '@app/guards/unsave-guard';
import { ForumSettingsPermissionComponent } from '../../forum/forum-settings/forum-settings-permission/forum-settings-permission.component';
import { BlogSettingsGeneralComponent } from './blog-settings-general/blog-settings-general.component';
import { BlogSettingsComponent } from './blog-settings.component';
import { BlogSettingsWidgetsComponent } from './blog-settings-widgets/blog-settings-widgets.component';
import { BlogSettingsPermissionComponent } from './blog-settings-permission/blog-settings-permission.component';
import { SocialModGuard } from '../../../../guards/social-mod.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'general',

  },
  {
    path: '',
    component: BlogSettingsComponent,
    children: [
      {
        path: 'widgets', component: ForumSettingsWidgetsComponent, canDeactivate: [CanSaveDeactivateGuard], data: {
          title: 'تنظیمات - ویجت‌ها',
          description: 'تنظیم و شخصی‌سازی ویجت‌های بلاگ'
        },
      },
      {
        path: 'general', component: BlogSettingsGeneralComponent, canDeactivate: [CanSaveDeactivateGuard],
        data: {
          title: 'تنظیمات - اطلاعات کلی',
          description: 'تنظیم و شخصی‌سازی اطلاعات کلی بلاگ'
        },
      },
      {
        path: 'permission', component: BlogSettingsPermissionComponent, canDeactivate: [CanSaveDeactivateGuard],
        data: {
          title: 'تنظیمات - دسترسی‌ها',
          description: 'تنظیم و شخصی‌سازی دسترسی‌ها و اعضا'
        },

      },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogSettingsRoutingModule { }

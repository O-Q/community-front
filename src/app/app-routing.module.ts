import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/shared/home/home.component';
import { ErrorComponent } from './components/shared/error/error.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';
const routes: Routes = [
  {
    path: '', pathMatch: 'full', component: HomeComponent, data: {
      title: 'صفحه اصلی',
      description: 'سایت نارنجی، پایگاه جامع اجتماعات ایران است. در این بستر می‌توانید بلاگ و انجمن خود را بسازید. شخصی‌سازی و مدیریت کنید و با هم به گفت‌وگو بپردازید.'
    },
  },
  {
    path: 'c',
    loadChildren: () =>
      import('./components/community/forum/forum.module').then(
        m => m.ForumModule
      )
  },
  {
    path: 'u',
    loadChildren: () =>
      import('./components/user/user.module').then(
        m => m.UserModule
      )
  },
  {
    path: 'b',
    loadChildren: () =>
      import('./components/community/blog/blog.module').then(
        m => m.BlogModule
      )
  },
  {
    path: 'settings',
    loadChildren: () => import('./components/settings/settings.module').then(
      m => m.SettingsModule
    ), canLoad: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./components/auth/auth.module').then(m => m.AuthModule),
    canLoad: [NotAuthGuard]
  },
  {
    path: 'error/:code',
    component: ErrorComponent,
    data: {
      title: 'خطا',
      description: ''
    }
  },
  {
    path: '**',
    redirectTo: 'error/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

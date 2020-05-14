import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/shared/home/home.component';
import { ErrorComponent } from './components/shared/error/error.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
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
    )
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./components/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'error/:code',
    component: ErrorComponent
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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/shared/home/home.component';
import { ErrorComponent } from './components/shared/error/error.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  {
    path: 'c',
    loadChildren: () =>
      import('./components/community/community.module').then(
        m => m.CommunityModule
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
export class AppRoutingModule {}

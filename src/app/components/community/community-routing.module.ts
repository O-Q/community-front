import { CommunityHomeComponent } from './community-home/community-home.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: ':name', component: CommunityHomeComponent }
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class CommunityRoutingModule {}

import { CommunityHomeComponent } from './community-home/community-home.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommunityPostComponent } from './community-post/community-post.component';
import { CommunityNewPostComponent } from './community-new-post/community-new-post.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: ':name', component: CommunityHomeComponent },
  { path: ':name/p/:pid', component: CommunityPostComponent },
  { path: ':name/new', component: CommunityNewPostComponent }
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class CommunityRoutingModule {}

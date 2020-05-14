import { ForumHomeComponent } from './forum-home/forum-home.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ForumPostComponent } from './forum-post/forum-post.component';
import { ForumComponent } from './forum.component';

const routes: Routes = [
  {
    path: '', component: ForumComponent, children: [
      { path: 'new', loadChildren: () => import('./../base/base-community.module').then(m => m.BaseCommunityModule) },
      { path: ':name', component: ForumHomeComponent },
      { path: ':name/new', loadChildren: () => import('./forum-new-post/forum-new-post.module').then(m => m.ForumNewPostModule) },
      { path: ':name/settings', loadChildren: () => import('./forum-settings/forum-settings.module').then(m => m.ForumSettingsModule) },
      { path: ':name/p/:pid', component: ForumPostComponent },
      { path: ':name/p/:pid/edit', loadChildren: () => import('./forum-new-post/forum-new-post.module').then(m => m.ForumNewPostModule) }
    ],
  },

];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class ForumRoutingModule { }

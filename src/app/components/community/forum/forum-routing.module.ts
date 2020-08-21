import { ForumHomeComponent } from './forum-home/forum-home.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ForumPostComponent } from './forum-post/forum-post.component';
import { ForumComponent } from './forum.component';
import { AuthGuard } from '../../../guards/auth.guard';
import { SocialModGuard } from '../../../guards/social-mod.guard';
import { SocialAuthorGuard } from '../../../guards/social-author.guard';
import { SocialWriteGuard } from '../../../guards/social-write.guard';

const routes: Routes = [
  {
    path: '', component: ForumComponent, children: [
      {
        path: 'new', loadChildren: () => import('./../base/base-community.module').then(m => m.BaseCommunityModule),
        canActivate: [AuthGuard],
        data: {
          title: 'ساخت انجمن',
          description: 'انجمن خود را بسازید و شخصی‌سازی و مدیریت کنید.'
        }
      },
      { path: ':name', component: ForumHomeComponent },
      {
        path: ':name/new', loadChildren: () => import('./forum-new-post/forum-new-post.module').then(m => m.ForumNewPostModule),
        canLoad: [AuthGuard, SocialWriteGuard]
      },
      {
        path: ':name/settings', loadChildren: () => import('./forum-settings/forum-settings.module').then(m => m.ForumSettingsModule),
        canLoad: [SocialModGuard]
      },
      { path: ':name/p/:pid', component: ForumPostComponent },
      {
        path: ':name/p/:pid/edit', loadChildren: () => import('./forum-new-post/forum-new-post.module').then(m => m.ForumNewPostModule),
        canLoad: [SocialAuthorGuard]
      }
    ],
  },

];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class ForumRoutingModule { }

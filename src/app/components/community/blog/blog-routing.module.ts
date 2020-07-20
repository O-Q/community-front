import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './blog.component';
import { BlogHomeComponent } from './blog-home/blog-home.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { SocialAuthorGuard } from '../../../guards/social-author.guard';
import { SocialModGuard } from '../../../guards/social-mod.guard';
import { AuthGuard } from '../../../guards/auth.guard';
import { SocialWriteGuard } from '../../../guards/social-write.guard';


const routes: Routes = [
  {
    path: '', component: BlogComponent, children: [
      {
        path: 'new', loadChildren: () => import('./../base/base-community.module').then(m => m.BaseCommunityModule),
        canLoad: [AuthGuard]
      },

      {
        path: ':name/new', loadChildren: () => import('./blog-new-post/blog-new-post.module').then(m => m.BlogNewPostModule),
        canLoad: [AuthGuard, SocialWriteGuard]
      },
      {
        path: ':name/settings', loadChildren: () => import('./blog-settings/blog-settings.module').then(m => m.BlogSettingsModule),
        canLoad: [SocialModGuard]
      },
      { path: ':name/p/:pid', component: BlogPostComponent },
      {
        path: ':name/p/:pid/edit', loadChildren: () => import('./blog-new-post/blog-new-post.module').then(m => m.BlogNewPostModule),
        canLoad: [SocialAuthorGuard]
      },
      { path: ':name', component: BlogHomeComponent },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }

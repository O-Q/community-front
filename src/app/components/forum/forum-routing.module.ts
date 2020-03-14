import { ForumHomeComponent } from './forum-home/forum-home.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ForumPostComponent } from './forum-post/forum-post.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: ':name', component: ForumHomeComponent },
  { path: ':name/p/:pid', component: ForumPostComponent },
  { path: ':name/new', loadChildren: () => import('./forum-new-post/forum-new-post.module').then(m => m.ForumNewPostModule) }
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class ForumRoutingModule { }

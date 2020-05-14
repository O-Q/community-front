import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { UserPostsComponent } from './user-posts/user-posts.component';


const routes: Routes = [{
  path: '', component: UserComponent, children: [
    { path: ':username', component: UserPostsComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

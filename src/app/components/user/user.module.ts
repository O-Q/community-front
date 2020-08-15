import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { MaterialBaseModule } from '@app/material.module';
import { UserComponent } from './user.component';
import { MatTabsModule } from '@angular/material/tabs';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { AppCommonModule } from '@app/components/common/common.module';
import { SkeletonProfileBoxComponent } from './user-info/skeleton-profile-box/skeleton-profile-box.component';


@NgModule({
  declarations: [UserComponent, UserPostsComponent, UserInfoComponent, SkeletonProfileBoxComponent],
  imports: [
    CommonModule,
    AppCommonModule,
    UserRoutingModule,
    MaterialBaseModule,
    MatTabsModule,
  ]
})
export class UserModule { }

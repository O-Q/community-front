import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumHomeComponent } from './forum-home/forum-home.component';
import { ForumRoutingModule } from './forum-routing.module';
import { MaterialBaseModule } from '../../material.module';
import { ForumDetailComponent } from './shared/forum-detail/forum-detail.component';
import { PostCardComponent } from './shared/post-card/post-card.component';
import { PostActionsComponent } from './shared/post-card/post-actions/post-actions.component';
import { ForumWidgetComponent } from './forum-home/forum-widget/forum-widget.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';


import { ShareBottomSheetComponent } from './shared/post-card/share-bottom-sheet/share-bottom-sheet.component';
import { ForumPostComponent } from './forum-post/forum-post.component';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { AppCommonModule } from '../common/common.module';
import { FormsModule } from '@angular/forms';
import { SkeletonWidgetComponent } from './forum-home/forum-widget/skeleton-widget/skeleton-widget.component';
import { SkeletonModule } from '../skeleton/skeleton.module';
import { ForumBaseComponent } from './forum-base/forum-base.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    ForumHomeComponent,
    ForumDetailComponent,
    ForumWidgetComponent,
    ForumPostComponent,
    ForumBaseComponent,
    PostActionsComponent,
    PostCardComponent,
    ShareBottomSheetComponent,
    SkeletonWidgetComponent
  ],
  imports: [
    CommonModule,
    ForumRoutingModule,
    AppCommonModule,
    FormsModule,
    MaterialBaseModule,
    MatBottomSheetModule,
    MatInputModule,
    MatSelectModule,
    ScrollingModule,
    SkeletonModule

  ],
})
export class ForumModule { }

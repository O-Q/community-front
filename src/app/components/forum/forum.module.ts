import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumHomeComponent } from './forum-home/forum-home.component';
import { ForumRoutingModule } from './forum-routing.module';
import { MaterialBaseModule } from '../../material.module';
import { ForumDetailComponent } from './shared/forum-detail/forum-detail.component';
import { PostCardComponent } from './shared/post-card/post-card.component';
import { PostActionsComponent } from './shared/post-card/post-actions/post-actions.component';
import { ForumWidgetComponent } from './forum-home/forum-widget/forum-widget.component';
import {
  MatListModule,
  MatMenuModule,
  MatBottomSheetModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';


import { ShareBottomSheetComponent } from './shared/post-card/share-bottom-sheet/share-bottom-sheet.component';
import { ForumPostComponent } from './forum-post/forum-post.component';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { AppCommonModule } from '../common/common.module';
import { FormsModule } from '@angular/forms';
import { SkeletonWidgetComponent } from './forum-home/forum-widget/skeleton-widget/skeleton-widget.component';
import { SkeletonModule } from '../skeleton/skeleton.module';
import { ForumBaseComponent } from './forum-base/forum-base.component';

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
    MatListModule,
    MatMenuModule,
    MatBottomSheetModule,
    MatInputModule,
    MatSelectModule,
    SkeletonModule

  ],
  entryComponents: [ShareBottomSheetComponent, ConfirmDialogComponent]
})
export class ForumModule { }

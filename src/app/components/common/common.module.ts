import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MaterialBaseModule } from '../../material.module';
import { SuccessComponent } from './success/success.component';
import { PostCardComponent } from './post-card/post-card.component';
import { ShareBottomSheetComponent } from './post-card/share-bottom-sheet/share-bottom-sheet.component';
import { SkeletonForumPostComponent } from './post-card/skeleton-forum-post/skeleton-forum-post.component';
import { PostActionsComponent } from './post-card/post-actions/post-actions.component';
import { RouterModule } from '@angular/router';
import { SkeletonModule } from '../skeleton/skeleton.module';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatTooltipModule } from '@angular/material/tooltip';


const components = [
  ConfirmDialogComponent,
  SuccessComponent,
  PostCardComponent,
  ShareBottomSheetComponent,
  SkeletonForumPostComponent,
  PostActionsComponent];
@NgModule({
  declarations: components,
  imports: [CommonModule, RouterModule, MatDialogModule, MatBottomSheetModule, SkeletonModule, MaterialBaseModule],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { minWidth: '250px' } }
  ],
  exports: [...components, SkeletonModule, MaterialBaseModule, MatTooltipModule]
})
export class AppCommonModule { }

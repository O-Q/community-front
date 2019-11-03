import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityHomeComponent } from './community-home/community-home.component';
import { CommunityRoutingModule } from './community-routing.module';
import { MaterialBaseModule } from '../../material.module';
import { CommunityDetailComponent } from './shared/community-detail/community-detail.component';
import { PostCardComponent } from './shared/post-card/post-card.component';
import { PostActionsComponent } from './shared/post-card/post-actions/post-actions.component';
import { CommunityWidgetComponent } from './community-home/community-widget/community-widget.component';
import {
  MatListModule,
  MatMenuModule,
  MatBottomSheetModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
// import { MatContenteditableModule as MatEditorModule } from 'mat-contenteditable';

import { WidgetRulesComponent } from './community-home/community-widget/widgets/widget-rules/widget-rules.component';
import { WidgetUsersListComponent } from './community-home/community-widget/widgets/widget-users-list/widget-users-list.component';
import { ShareBottomSheetComponent } from './shared/post-card/share-bottom-sheet/share-bottom-sheet.component';
import { CommunityPostComponent } from './community-post/community-post.component';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { AppCommonModule } from '../common/common.module';
import { FormsModule } from '@angular/forms';
import { CommunityBaseComponent } from './community-base/community-base.component';
import { CommunityNewPostComponent } from './community-new-post/community-new-post.component';

@NgModule({
  declarations: [
    CommunityHomeComponent,
    CommunityDetailComponent,
    CommunityWidgetComponent,
    CommunityPostComponent,
    CommunityBaseComponent,
    CommunityNewPostComponent,
    PostActionsComponent,
    PostCardComponent,
    ShareBottomSheetComponent
  ],
  imports: [
    CommonModule,
    CommunityRoutingModule,
    AppCommonModule,
    FormsModule,
    MaterialBaseModule,
    MatListModule,
    MatMenuModule,
    MatBottomSheetModule,
    MatInputModule,
    MatSelectModule
    // MatEditorModule,
    // CKEditorModule
  ],
  entryComponents: [ShareBottomSheetComponent, ConfirmDialogComponent]
})
export class CommunityModule {}

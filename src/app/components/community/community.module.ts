import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityHomeComponent } from './community-home/community-home.component';
import { CommunityRoutingModule } from './community-routing.module';
import { MaterialBaseModule } from '../../material.module';
import { CommunityDetailComponent } from './shared/community-detail/community-detail.component';
import { PostCardComponent } from './shared/post-card/post-card.component';
import { PostActionsComponent } from './shared/post-card/post-actions/post-actions.component';
import { CommunityWidgetComponent } from './community-home/community-widget/community-widget.component';
import { WidgetRulesComponent } from './community-home/community-widget/widgets/widget-rules/widget-rules.component';
import {
  MatListModule,
  MatMenuModule,
  MatBottomSheetModule
} from '@angular/material';
import { WidgetUsersListComponent } from './community-home/community-widget/widgets/widget-users-list/widget-users-list.component';
import { ShareBottomSheetComponent } from './shared/post-card/share-bottom-sheet/share-bottom-sheet.component';

@NgModule({
  declarations: [
    CommunityHomeComponent,
    CommunityDetailComponent,
    PostActionsComponent,
    PostCardComponent,
    CommunityWidgetComponent,
    WidgetRulesComponent,
    WidgetUsersListComponent,
    ShareBottomSheetComponent
  ],
  imports: [
    CommonModule,
    CommunityRoutingModule,
    MaterialBaseModule,
    MatListModule,
    MatMenuModule,
    MatBottomSheetModule
  ],
  entryComponents: [ShareBottomSheetComponent]
})
export class CommunityModule {}

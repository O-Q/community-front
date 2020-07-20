import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumHomeComponent } from './forum-home/forum-home.component';
import { ForumRoutingModule } from './forum-routing.module';
import { ForumDetailComponent } from './shared/forum-detail/forum-detail.component';
import { ForumWidgetComponent } from './forum-home/forum-widget/forum-widget.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


import { ForumPostComponent } from './forum-post/forum-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SkeletonWidgetComponent } from './forum-home/forum-widget/skeleton-widget/skeleton-widget.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ForumBaseComponent } from './forum-base/forum-base.component';
import { ForumComponent } from './forum.component';
import { AppCommonModule } from '../../common/common.module';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    ForumHomeComponent,
    ForumDetailComponent,
    ForumWidgetComponent,
    ForumPostComponent,
    ForumBaseComponent,
    SkeletonWidgetComponent,
    ForumComponent,
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    ForumRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatBottomSheetModule,
    MatInputModule,
    MatSelectModule,
    ScrollingModule,
  ],
})
export class ForumModule {
}

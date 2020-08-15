import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { BlogBaseComponent } from './blog-base/blog-base.component';
import { AppCommonModule } from '../../common/common.module';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { BlogHomeComponent } from './blog-home/blog-home.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ForumWidgetComponent } from '../forum/forum-home/forum-widget/forum-widget.component';
import { BlogWidgetComponent } from './blog-home/blog-widget/blog-widget.component';
import { SkeletonWidgetModule } from '../shared/skeleton-widget/skeleton-widget.module';
import { MatChipsModule } from '@angular/material/chips';


@NgModule({
  declarations: [BlogComponent, BlogBaseComponent, BlogPostComponent, BlogHomeComponent, BlogWidgetComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppCommonModule,
    BlogRoutingModule,
    MatTabsModule,
    MatChipsModule,
    SkeletonWidgetModule,
  ]
})
export class BlogModule { }

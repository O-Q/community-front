import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumNewPostComponent } from './forum-new-post.component';
import { MatSelectModule, MatInputModule, MatMenuModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { MaterialBaseModule } from '../../../material.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ForumNewPostComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ForumNewPostComponent }]),
    MaterialBaseModule,
    CKEditorModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
  ]
})
export class ForumNewPostModule { }

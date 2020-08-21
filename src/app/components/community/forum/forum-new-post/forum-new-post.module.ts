import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';

import { MaterialBaseModule } from '../../../../material.module';
import { ForumNewPostComponent } from './forum-new-post.component';
import { MatChipsModule } from '@angular/material/chips';


@NgModule({
  declarations: [ForumNewPostComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ForumNewPostComponent }]),
    MaterialBaseModule,
    CKEditorModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatChipsModule
  ]
})
export class ForumNewPostModule { }

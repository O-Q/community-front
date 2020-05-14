import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';

import { MaterialBaseModule } from '../../../../material.module';
import { BlogNewPostComponent } from './blog-new-post.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [BlogNewPostComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: BlogNewPostComponent }]),
    MaterialBaseModule,
    CKEditorModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
  ]
})
export class BlogNewPostModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonLineComponent } from './skeleton-line/skeleton-line.component';



@NgModule({
  declarations: [SkeletonLineComponent],
  imports: [
    CommonModule
  ],
  exports: [SkeletonLineComponent]
})
export class SkeletonModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonWidgetComponent } from './skeleton-widget.component';
import { SkeletonModule } from '../../../skeleton/skeleton.module';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [SkeletonWidgetComponent],
  imports: [
    CommonModule,
    SkeletonModule,
    MatCardModule,
  ],
  exports: [SkeletonWidgetComponent]
})
export class SkeletonWidgetModule { }

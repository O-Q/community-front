import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetFlairsComponent } from './widget-flairs.component';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [WidgetFlairsComponent],
  imports: [
    CommonModule, MatCardModule, MatChipsModule, RouterModule
  ]
})
export class WidgetFlairsModule {
  static entry = WidgetFlairsComponent;
}

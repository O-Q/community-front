import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetUserListComponent } from './widget-user-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@NgModule({
  imports: [CommonModule, MatCardModule, MatListModule],
  declarations: [WidgetUserListComponent],
})
export class WidgetUserListModule {
  static entry = WidgetUserListComponent;
}

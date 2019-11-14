import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetUserListComponent } from './widget-user-list.component';
import { MatCardModule, MatListModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, MatCardModule, MatListModule],
  declarations: [WidgetUserListComponent],
  entryComponents: [WidgetUserListComponent]
})
export class WidgetUserListModule {
  static entry = WidgetUserListComponent;
}

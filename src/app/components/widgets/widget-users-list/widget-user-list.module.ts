import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetUserListComponent } from './widget-user-list.component';

@NgModule({
  imports: [CommonModule],
  declarations: [WidgetUserListComponent],
  entryComponents: [WidgetUserListComponent]
})
export class WidgetUserListModule {
  static entry = WidgetUserListComponent;
}

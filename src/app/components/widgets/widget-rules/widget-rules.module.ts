import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetRulesComponent } from './widget-rules.component';
import { MatCardModule, MatDividerModule, MatListModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, MatCardModule, MatDividerModule, MatListModule],
  declarations: [WidgetRulesComponent],
  entryComponents: [WidgetRulesComponent]
})
export class WidgetRulesModule {
  static entry = WidgetRulesComponent;
}

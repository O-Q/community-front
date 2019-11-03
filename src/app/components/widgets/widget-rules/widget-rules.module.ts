import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetRulesComponent } from './widget-rules.component';

@NgModule({
  imports: [CommonModule],
  declarations: [WidgetRulesComponent],
  entryComponents: [WidgetRulesComponent]
})
export class WidgetRulesModule {
  static entry = WidgetRulesComponent;
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetRulesComponent } from './widget-rules.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

@NgModule({
  imports: [CommonModule, MatCardModule, MatDividerModule, MatListModule],
  declarations: [WidgetRulesComponent],
})
export class WidgetRulesModule {
  static entry = WidgetRulesComponent;
}

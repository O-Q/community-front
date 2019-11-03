import { Component, OnInit } from '@angular/core';
import { RuleGroup } from '../../../../../../interfaces/widgets.interface';

@Component({
  selector: 'app-widget-rules',
  templateUrl: './widget-rules.component.html',
  styleUrls: ['./widget-rules.component.scss']
})
export class WidgetRulesComponent implements OnInit {
  rules: RuleGroup[] = [
    { subject: 'قانون اول', description: 'توضیح قانون اول' },
    { subject: 'قانون دوم', description: 'توضیح قانون دوم' }
  ];
  constructor() {}

  ngOnInit() {}
}

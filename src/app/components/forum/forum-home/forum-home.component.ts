import { Component, OnInit } from '@angular/core';
import { Widget } from '../../../interfaces/widgets.interface';
import { WidgetNames } from './../../../../../server/src/shared/widget-list.enum';

@Component({
  selector: 'app-forum-home',
  templateUrl: './forum-home.component.html',
  styleUrls: ['./forum-home.component.scss']
})
export class ForumHomeComponent implements OnInit {
  posts = [1, 2, 3, 4, 5, 6];
  widgets: Widget[] = [
    { name: WidgetNames.RULES },
    {
      name: WidgetNames.USER_LIST, inputs: {
        title: 'بهترین کاربران',
        users: [
          { name: 'Mahdi', url: 'https://google.com', value: 50 },
          { name: 'Asghar', url: 'https://yahoo.com', value: 60 },
        ]
      }
    },
    {
      name: WidgetNames.CHAT,
      inputs: {}
    }
  ];
  constructor() { }

  ngOnInit() { }
}

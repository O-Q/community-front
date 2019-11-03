import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-widget-user-list',
  templateUrl: './widget-user-list.component.html',
  styleUrls: ['./widget-user-list.component.scss']
})
export class WidgetUserListComponent implements OnInit {
  // todo: must contain username and link to profile
  @Input()
  users;
  @Input()
  title: string;
  constructor() {}

  ngOnInit() {}
}

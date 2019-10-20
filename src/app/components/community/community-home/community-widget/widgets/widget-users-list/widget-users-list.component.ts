import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-widget-users-list',
  templateUrl: './widget-users-list.component.html',
  styleUrls: ['./widget-users-list.component.scss']
})
export class WidgetUsersListComponent implements OnInit {
  // todo: must contain username and link to profile
  @Input()
  users;
  @Input()
  title: string;
  constructor() {}

  ngOnInit() {}
}

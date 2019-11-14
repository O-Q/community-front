import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-widget-user-list',
  templateUrl: './widget-user-list.component.html',
  styleUrls: ['./widget-user-list.component.scss']
})
export class WidgetUserListComponent implements OnInit {
  // todo: must contain username and link to profile
  @Input()
  inputs: { title: string, users: { url: string, name: string, value: string }[] };
  constructor() { }

  ngOnInit() {
    console.log(this.inputs);

  }
}

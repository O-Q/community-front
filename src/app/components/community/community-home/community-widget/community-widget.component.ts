import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-community-widget',
  templateUrl: './community-widget.component.html',
  styleUrls: ['./community-widget.component.scss']
})
export class CommunityWidgetComponent implements OnInit {
  @Input()
  widgets;

  users = [
    { name: 'Mahdi', url: 'https://google.com', value: 50 },
    { name: 'Asghar', url: 'https://yahoo.com', value: 60 }
  ];
  constructor() {}

  ngOnInit() {}
}

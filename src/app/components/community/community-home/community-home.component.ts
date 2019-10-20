import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-community-home',
  templateUrl: './community-home.component.html',
  styleUrls: ['./community-home.component.scss']
})
export class CommunityHomeComponent implements OnInit {
  posts = [1, 2, 3, 4, 5, 6];
  widgets = [1, 2];
  constructor() {}

  ngOnInit() {}
}

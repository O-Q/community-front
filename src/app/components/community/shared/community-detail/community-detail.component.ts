import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-community-detail',
  templateUrl: './community-detail.component.html',
  styleUrls: ['./community-detail.component.scss']
})
export class CommunityDetailComponent implements OnInit {
  backgroundImage = `url("https://material.angular.io/assets/img/examples/shiba1.jpg")`;
  constructor() {}

  ngOnInit() {}
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-community-post',
  templateUrl: './community-post.component.html',
  styleUrls: ['./community-post.component.scss']
})
export class CommunityPostComponent implements OnInit {
  backgroundImage = `url("https://material.angular.io/assets/img/examples/shiba1.jpg")`;

  constructor() {}

  ngOnInit() {}
}

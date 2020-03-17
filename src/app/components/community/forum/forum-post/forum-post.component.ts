import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-forum-post',
  templateUrl: './forum-post.component.html',
  styleUrls: ['./forum-post.component.scss']
})
export class ForumPostComponent implements OnInit {
  backgroundImage = `url("https://material.angular.io/assets/img/examples/shiba1.jpg")`;
  constructor() { }

  ngOnInit() { }
}

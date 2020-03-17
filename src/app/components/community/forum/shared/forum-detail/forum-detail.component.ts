import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-forum-detail',
  templateUrl: './forum-detail.component.html',
  styleUrls: ['./forum-detail.component.scss']
})
export class ForumDetailComponent {
  @Input()
  social;
  forumImage = `url("https://material.angular.io/assets/img/examples/shiba1.jpg")`;

  constructor() {
  }
  toPersianDate(date: string) {
    return new Date(date).toLocaleDateString('fa-IR');
  }
}

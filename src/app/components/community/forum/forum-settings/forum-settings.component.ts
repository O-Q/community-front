import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forum-settings',
  templateUrl: './forum-settings.component.html',
  styleUrls: ['./forum-settings.component.scss']
})
export class ForumSettingsComponent implements OnInit {
  navLinks = [
    {
      path: 'general',
      title: 'اطلاعات کلی'
    },
    {
      path: 'widgets',
      title: 'ویجت‌ها'
    }, {
      path: 'permission',
      title: 'مجوز و دسترسی'
    },

  ];
  constructor() { }

  ngOnInit(): void {
  }

}

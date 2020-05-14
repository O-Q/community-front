import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-settings',
  templateUrl: './blog-settings.component.html',
  styleUrls: ['./blog-settings.component.scss']
})
export class BlogSettingsComponent {
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

}

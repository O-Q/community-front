import { Component, OnInit } from '@angular/core';
import { ThemeService } from '@app/services/theme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  navLinks = [{
    path: 'profile',
    title: 'پروفایل'
  }, {
    path: 'account',
    title: 'حساب کاربری'
  },
  {
    path: 'privacy',
    title: 'حریم خصوصی'
  }
  ];
  constructor(private theme: ThemeService) {
  }

  ngOnInit(): void {
    this.theme.changeToUserDefault();

  }

}

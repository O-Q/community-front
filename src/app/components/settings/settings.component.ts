import { Component, OnInit } from '@angular/core';
import { ThemeService } from '@app/services/theme.service';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AppState } from '../../store/state';

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
  username$ = this.store.select('user').pipe(map(u => u.user?.username));
  constructor(private theme: ThemeService, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.theme.changeToUserDefault();

  }

}

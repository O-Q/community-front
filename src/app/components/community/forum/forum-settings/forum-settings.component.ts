import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@store/state';
import { getMergedRoute } from '@store/router/router.selectors';
import { first, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { getUserSocialRole } from '../../../../store/user';

@Component({
  selector: 'app-forum-settings',
  templateUrl: './forum-settings.component.html',
  styleUrls: ['./forum-settings.component.scss']
})
export class ForumSettingsComponent implements OnInit {
  navLinks = [
    {
      path: 'general',
      title: 'اطلاعات کلی',
      permission: 'changeInfo'
    },
    {
      path: 'widgets',
      title: 'ویجت‌ها',
      permission: 'changeWidgets'
    }, {
      path: 'permission',
      title: 'مجوز و دسترسی',
      permission: 'changeUsers'
    },
  ];
  role$ = this.store.select(getUserSocialRole);
  permissionRoles$ = this.store.select('social').pipe(map(s => s.social.permissionRoles));
  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
  }
  async onBack() {
    const route = await this.store.select(getMergedRoute).pipe(first()).toPromise();
    this.router.navigate(['c', route.params.name]);
  }

}

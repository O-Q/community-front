import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@store/state';
import { getMergedRoute } from '@store/router/router.selectors';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

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
  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
  }
  async onBack() {
    const route = await this.store.select(getMergedRoute).pipe(first()).toPromise();
    this.router.navigate(['c', route.params.name]);
  }

}

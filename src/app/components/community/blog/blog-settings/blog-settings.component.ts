import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '@store/state';
import { Store } from '@ngrx/store';
import { getMergedRoute } from '@store/router/router.selectors';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-blog-settings',
  templateUrl: './blog-settings.component.html',
  styleUrls: ['./blog-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
  constructor(private router: Router, private store: Store<AppState>) {
  }

  async onBack() {
    const route = await this.store.select(getMergedRoute).pipe(first()).toPromise();
    this.router.navigate(['b', route.params.name]);
  }

}

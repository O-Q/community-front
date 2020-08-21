import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '@store/state';
import { Store } from '@ngrx/store';
import { getMergedRoute } from '@store/router/router.selectors';
import * as UserInfoActions from '@store/user-info/user-info.actions';
import * as PostActions from '@store/post/post.actions';
import { Subscription } from 'rxjs';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  navLinks = [{ path: '', title: 'اطلاعات کلی' }];
  subs: Subscription;
  constructor(private store: Store<AppState>, private title: Title, private meta: Meta) { }

  ngOnInit(): void {
    this.subs = this.store.select(getMergedRoute).subscribe(route => {
      const username = route.params.username;
      if (username) {
        this.store.dispatch(UserInfoActions.UserInfoGetting({ username }));
        this.store.dispatch(PostActions.PostsUserFetching({ username, query: { page: 1, itemsPerPage: 20 } }));
        this.title.setTitle(`نارنجی - صفحه کاربری ${username}`);
        this.meta.updateTag({ name: 'description', content: `صفحه‌ی کاربری ${username}` });
      }
    });
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}

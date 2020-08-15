import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@store/state';
import * as UserInfoActions from '@store/user-info/user-info.actions';
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  user$ = this.store.select('userInfo');
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  onFollow(username: string) {
    this.store.dispatch(UserInfoActions.UserFollowing({ username }));

  }
  onTalk(user) {
    alert('به زودی...');

  }

  onUnfollow(username: string) {
    this.store.dispatch(UserInfoActions.UserUnFollowing({ username }));
  }
}

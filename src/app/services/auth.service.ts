import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@store/state';
import * as authActions from '@store/auth/auth.actions';
import { ACCESS_TOKEN_KEY } from '@app/constants/local-storage.constant';
import { Router } from '@angular/router';
import { decodeUser } from '@app/utils/decode-user.util';
import * as UserActions from '@store/user/user.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private store: Store<AppState>, private router: Router) { }


  loadUser() {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    const user = decodeUser(token);
    if (user) {
      this.store.dispatch(authActions.loadUser({ user }));
      this.store.dispatch(UserActions.UserFetching());
    } else {
      this.store.dispatch(authActions.logout({ silent: true }));
    }
  }
}

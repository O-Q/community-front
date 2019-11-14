import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/state';
import * as authActions from '../store/auth/auth.actions';
import { environment } from '../../environments/environment';
import { ACCESS_TOKEN_KEY } from '../constants/local-storage.constant';
import { Router } from '@angular/router';
import { decodeUser } from '../utils/decode-user.util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private store: Store<AppState>, private router: Router) { }


  loadUser() {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    const user = decodeUser(token);
    if (user) {
      this.store.dispatch(authActions.loadUser({ payload: user }));
    } else {
      this.logout();
    }
  }

  logout() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    this.store.dispatch(authActions.logout());
    // this.router.navigateByUrl('http://localhost:4200');
  }
}

import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/state';
import * as credentialActions from '../store/credential/credential.actions';

@Injectable({
  providedIn: 'root'
})
export class CredentialService {
  constructor(private store: Store<AppState>) {}

  login(user: User) {
    this.store.dispatch(credentialActions.login({ payload: user }));
  }

  logout() {
    this.store.dispatch(credentialActions.logout());
  }

  signUp() {}
}

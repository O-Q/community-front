import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/state';
import * as authActions from '../store/auth/auth.actions';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ConfigService } from './config.service';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ACCESS_TOKEN_KEY } from '../constants/local-storage.constant';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private store: Store<AppState>, private router: Router) {}

  logout() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    this.store.dispatch(authActions.logout());
    this.router.navigateByUrl(environment.urls.baseUrl);
  }
}

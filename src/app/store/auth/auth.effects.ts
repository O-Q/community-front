import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { environment } from '@env/environment';
import * as AuthActions from './auth.actions';
import * as UserActions from '@store/user/user.actions';

import { ConfigService } from '@app/services/config.service';
import { ACCESS_TOKEN_KEY } from '@app/constants/local-storage.constant';
import { DEFAULT_HTTP_OPTION } from '@app/constants/http-headers.constant';
import { RegisterUser } from '@app/models/register-user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { decodeUser } from '@app/utils/decode-user.util';
import { Store } from '@ngrx/store';
import { AppState } from '@store/state';
import { ThemeService } from '@app/services/theme.service';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.signupStart),
    switchMap(signupData => {
      const body = new RegisterUser(
        signupData.username,
        signupData.password,
        signupData.email
      );
      return this.http
        .post<{ accessToken: string }>(
          this.configService.makeUrl(environment.urls.auth.SIGN_UP),
          body,
          DEFAULT_HTTP_OPTION
        )
        .pipe(
          map(resData => {
            const token = this._setSession(resData);
            const user = decodeUser(token);
            this.store.dispatch(UserActions.UserFetching());
            this.router.navigate(['/']);
            this.snackbar.open('شما با موفقیت ثبت‌نام شدید🎉');
            return AuthActions.loadUser({ mode: 'signup', user });
          }),
          catchError((error: HttpErrorResponse) => {
            let message: string;
            if (error.status === 409) {
              // conflict
              error = error.error;
              const field: string = error.message[0].split(' ')[0];
              const word = this._translateField(field);
              message = `این ${word} قبلا انتخاب شده است.`;
            }
            return of(
              AuthActions.authenticateFail({
                payload: { message, mode: 'signup' }
              })
            );
          })
        );
    })
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.loginStart),
    switchMap(signinData => {
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      };
      console.log(signinData);

      const { username, password } = signinData;
      const body = `username=${username}&password=${password}`;
      return this.http
        .post<{ accessToken: string }>(
          this.configService.makeUrl(environment.urls.auth.SIGN_IN),
          body,
          { headers }
        )
        .pipe(
          map(resData => {
            const token = this._setSession(resData);
            const user = decodeUser(token);
            this.store.dispatch(UserActions.UserFetching());
            return AuthActions.loadUser({ mode: 'signin', user });
          }),
          catchError((error: HttpErrorResponse) => {
            let message: string;

            if (error.status === 401) {
              message = 'نام کاربری یا گذرواژه اشتباه است.';
            } else {
              message = 'مشکلی پیش آمده است. پس از مدتی مجددا تلاش کنید.';
            }
            return of(
              AuthActions.authenticateFail({
                payload: { message, mode: 'signin' }
              })
            );
          })
        );
    })
  );

  @Effect({ dispatch: false })
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.loadUser),
    tap(actionData => {
      let message;
      if (actionData.mode === 'signin') {
        message = 'شما با موفقیت وارد شدید 😀';
      } else if (actionData.mode === 'signup') {
        message = 'ثبت‌نام با موفقیت انجام شد 😊';
      }
      if (message) {
        this.router.navigateByUrl('/');
        this.snackbar.open(message);
      }
    })
  );

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(ofType(AuthActions.logout), tap((payload) => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    this.store.dispatch(UserActions.UserLogout());
    if (!payload.silent) {
      this.snackbar.open(payload.message);
    }
    // this.router.navigateByUrl('/');
  }));

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private configService: ConfigService,
    private snackbar: MatSnackBar,
    private store: Store<AppState>,
    private theme: ThemeService
  ) { }

  private _setSession(payload: { accessToken: string }) {
    localStorage.setItem(ACCESS_TOKEN_KEY, payload.accessToken);
    return payload.accessToken;
  }

  private _translateField(field: string) {
    switch (field.toLowerCase()) {
      case 'username':
        return 'نام کاربری';
      case 'email':
        return 'ایمیل';
      default:
        return '';
    }
  }
}


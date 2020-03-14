import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from '../../../environments/environment';
import * as AuthActions from './auth.actions';
import { ConfigService } from '../../services/config.service';
import { ACCESS_TOKEN_KEY } from '../../constants/local-storage.constant';
import { User } from '../../models/user.model';
import { DEFAULT_HTTP_OPTION } from '../../constants/http-headers.constant';
import { RegisterUser } from '../../models/register-user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { decodeUser } from '../../utils/decode-user.util';

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

            return AuthActions.authenticateSuccess({
              payload: { mode: 'signup', user }
            });
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
            return AuthActions.authenticateSuccess({
              payload: { mode: 'signin', user }
            });
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
    ofType(AuthActions.authenticateSuccess),
    tap(actionData => {
      this.router.navigateByUrl('/');
      const message =
        actionData.payload.mode === 'signin'
          ? 'شما با موفقیت وارد شدید 😀'
          : 'ثبت‌نام با موفقیت انجام شد 😊';
      this.snackbar.open(message);
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private configService: ConfigService,
    private snackbar: MatSnackBar
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


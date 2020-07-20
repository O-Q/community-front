import { Effect, ofType, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '@app/services/config.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import * as UserInfoActions from './user-info.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { environment } from '@env/environment';
import { DEFAULT_HTTP_OPTION } from '@app/constants/http-headers.constant';
import { AppState } from '@store/state';
import { IUser } from '@app/models/user.model';


@Injectable()
export class UserInfoEffects {
    @Effect()
    UserInfoGet: Observable<Action> = this.actions$.pipe(
        ofType(UserInfoActions.UserInfoGetting),
        switchMap((body) => {
            return this.http.get<IUser>(
                this.configService.makeUrl(
                    environment.urls.user.GET_USER_INFO, { params: { username: body.username } }), DEFAULT_HTTP_OPTION).pipe
                (map(r => {
                    return UserInfoActions.UserInfoGot({ user: r });
                }),
                    catchError((error) => {
                        const message = error.error.message;
                        return of(UserInfoActions.UserInfoError({ message }));
                    }));

        }));
    @Effect()
    UserInfoUnFollow: Observable<Action> = this.actions$.pipe(
        ofType(UserInfoActions.UserUnFollowing),
        switchMap((body) => {
            return this.http.post(
                this.configService.makeUrl(
                    environment.urls.user.UNFOLLOW_USER, { params: { username: body.username } }), {}, DEFAULT_HTTP_OPTION).pipe
                (map(() => {
                    return UserInfoActions.UserUnFollowed();
                }),
                    catchError((error) => {
                        const message = error.error.message;
                        return of(UserInfoActions.UserInfoError({ message }));
                    }));

        }));
    @Effect()
    UserInfoFollow: Observable<Action> = this.actions$.pipe(
        ofType(UserInfoActions.UserFollowing),
        switchMap((body) => {
            return this.http.post(
                this.configService.makeUrl(
                    environment.urls.user.FOLLOW_USER, { params: { username: body.username } }), {}, DEFAULT_HTTP_OPTION).pipe
                (map(() => {
                    return UserInfoActions.UserFollowed();
                }),
                    catchError((error) => {
                        const message = error.error.message;
                        return of(UserInfoActions.UserInfoError({ message }));
                    }));

        }));

    constructor(private actions$: Actions,
        private http: HttpClient,
        private configService: ConfigService,
        private snackbar: MatSnackBar,
        private store: Store<AppState>) { }
}

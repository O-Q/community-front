import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConfigService } from '../../services/config.service';

import * as UserActions from './user.actions';
import { environment } from '../../../environments/environment';
import { DEFAULT_HTTP_OPTION } from '../../constants/http-headers.constant';
import { of } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable()
export class UserEffects {
    @Effect()
    userSocialFetch = this.actions$.pipe(
        ofType(UserActions.UserSocialsFetching),
        switchMap(() => {
            return this.http.get(
                this.configService.makeUrl(environment.urls.user.SOCIALS),
                DEFAULT_HTTP_OPTION
            ).pipe(map(resData => {
                return UserActions.UserSocialsFetched({
                    socials: resData
                });
            }), catchError((error: HttpErrorResponse) => {
                // if (error.status === 404) {
                //     this.router.navigateByUrl('/error/404');
                // }
                const message = error.error.message;
                return of(UserActions.UserSocialsFetchFailed({ message }));
            }));

        })
    );


    @Effect()
    userFetch = this.actions$.pipe(
        ofType(UserActions.UserFetching),
        switchMap(() => {
            return this.http.get<User>(
                this.configService.makeUrl(environment.urls.user.GET_USER),
                DEFAULT_HTTP_OPTION
            ).pipe(map(resData => {
                return UserActions.UserFetched(resData);
            }), catchError((error: HttpErrorResponse) => {
                // if (error.status === 404) {
                //     this.router.navigateByUrl('/error/404');
                // }
                const message = error.error.message;
                return of(UserActions.UserSocialsFetchFailed({ message }));
            }));

        })
    );
    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private configService: ConfigService,
        // private router: Router,
        // private snackbar: MatSnackBar
    ) { }
}
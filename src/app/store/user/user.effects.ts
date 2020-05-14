import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConfigService } from '../../services/config.service';

import * as UserActions from './user.actions';
import { environment } from '../../../environments/environment';
import { DEFAULT_HTTP_OPTION } from '../../constants/http-headers.constant';
import { of, Observable } from 'rxjs';
import { IUser } from '../../models/user.model';
import { Store, Action } from '@ngrx/store';
import { AppState } from '../state';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Injectable()
export class UserEffects {
    @Effect()
    userFetch: Observable<Action> = this.actions$.pipe(
        ofType(UserActions.UserFetching),
        switchMap(() => {
            return this.http.get<IUser>(
                this.configService.makeUrl(environment.urls.user.GET_USER),
                DEFAULT_HTTP_OPTION
            ).pipe(map(resData => {
                return UserActions.UserFetched({ user: resData });
            }), catchError((error: HttpErrorResponse) => {
                // if (error.status === 404) {
                //     this.router.navigateByUrl('/error/404');
                // }
                const message = error.error.message;
                return of(UserActions.UserError({ message }));
            }));

        })
    );

    @Effect()
    userEmailChange: Observable<Action> = this.actions$.pipe(
        ofType(UserActions.UserEmailChanging),
        withLatestFrom(this.store.select('user').pipe(map(u => u.user))),
        switchMap(([body, user]) => {
            console.log(user);

            const { email, currentPassword } = body;
            return this.http.patch(
                this.configService.makeUrl(environment.urls.user.UPDATE_USER_EMAIL),
                { email, currentPassword },
                DEFAULT_HTTP_OPTION
            ).pipe(map(() => {
                this.snackbar.open('ایمیل با موفقیت تغییر یافت');
                return UserActions.UserEmailChanged({ user: { ...user, email } });
            }), catchError((error: HttpErrorResponse) => {
                // if (error.status === 404) {
                //     this.router.navigateByUrl('/error/404');
                // }
                const message = error.error.message;
                return of(UserActions.UserError({ message }));
            }));

        })
    );

    @Effect()
    userPasswordChange: Observable<Action> = this.actions$.pipe(
        ofType(UserActions.UserPasswordChanging),
        switchMap((body) => {
            const { password, currentPassword } = body;
            return this.http.patch(
                this.configService.makeUrl(environment.urls.user.UPDATE_USER_PASSWORD),
                { password, currentPassword },
                DEFAULT_HTTP_OPTION
            ).pipe(map(() => {
                this.snackbar.open('گذرواژه با موفقیت تغییر یافت');
                return UserActions.UserPasswordChanged();
            }), catchError((error: HttpErrorResponse) => {
                // if (error.status === 404) {
                //     this.router.navigateByUrl('/error/404');
                // }
                const message = error.error.message;
                console.log(message);

                return of(UserActions.UserError({ message }));
            }));

        })
    );



    @Effect()
    userAvatarChange: Observable<Action> = this.actions$.pipe(
        ofType(UserActions.UserAvatarChanging),
        switchMap((body) => {
            const { file } = body;
            const formData: FormData = new FormData();
            formData.append('avatar', file, file.name);
            return this.http.post<any>(
                this.configService.makeUrl(environment.urls.user.UPLOAD_AVATAR),
                formData,
            ).pipe(map((r) => {
                this.snackbar.open('آواتار با موفقیت بروزرسانی شد');
                return UserActions.UserAvatarChanged({ link: r.link });
            }), catchError((error: HttpErrorResponse) => {
                // if (error.status === 404) {
                //     this.router.navigateByUrl('/error/404');
                // }
                const message = error.error.message;
                console.log(message);
                return of(UserActions.UserAvatarChangeFailed({ message }));
            }));
        })
    );


    @Effect()
    userBannerChange: Observable<Action> = this.actions$.pipe(
        ofType(UserActions.UserBannerChanging),
        switchMap((body) => {
            const { file } = body;
            const formData: FormData = new FormData();
            formData.append('banner', file, file.name);
            return this.http.post<any>(
                this.configService.makeUrl(environment.urls.user.UPLOAD_BANNER),
                formData,
            ).pipe(map((r) => {
                this.snackbar.open('بنر با موفقیت بروزرسانی شد');
                return UserActions.UserBannerChanged({ link: r.link });
            }), catchError((error: HttpErrorResponse) => {
                // if (error.status === 404) {
                //     this.router.navigateByUrl('/error/404');
                // }
                const message = error.error.message;
                console.log(message);
                return of(UserActions.UserBannerChangeFailed({ message }));
            }));

        })
    );

    @Effect()
    userPhotoRemove: Observable<Action> = this.actions$.pipe(
        ofType(UserActions.UserPhotoRemoving),
        switchMap((body) => {
            switch (body.fileType) {
                case 'banner': {
                    return this.http.delete<any>(
                        this.configService.makeUrl(environment.urls.user.DELETE_BANNER),
                        DEFAULT_HTTP_OPTION
                    ).pipe(map((r) => {
                        this.snackbar.open('بنر با موفقیت بروزرسانی شد');
                        return UserActions.UserPhotoRemoved({ fileType: body.fileType });
                    }), catchError((error: HttpErrorResponse) => {
                        // if (error.status === 404) {
                        //     this.router.navigateByUrl('/error/404');
                        // }
                        const message = error.error.message;
                        console.log(message);
                        return of(UserActions.UserPhotoRemoveFailed({ message }));
                    }));
                } case 'avatar': {
                    return this.http.delete<any>(
                        this.configService.makeUrl(environment.urls.user.DELETE_AVATAR),
                        DEFAULT_HTTP_OPTION
                    ).pipe(map((r) => {
                        this.snackbar.open('بنر با موفقیت بروزرسانی شد');
                        return UserActions.UserPhotoRemoved({ fileType: body.fileType });
                    }), catchError((error: HttpErrorResponse) => {
                        // if (error.status === 404) {
                        //     this.router.navigateByUrl('/error/404');
                        // }
                        const message = error.error.message;
                        console.log(message);
                        return of(UserActions.UserPhotoRemoveFailed({ message }));
                    }));
                }
            }

        })
    );



    @Effect()
    userPrivacyUpdate: Observable<Action> = this.actions$.pipe(
        ofType(UserActions.UserPrivacyUpdating),
        switchMap((body) => {
            const { privacy } = body;
            return this.http.patch<any>(
                this.configService.makeUrl(environment.urls.user.UPDATE_PRIVACY),
                privacy,
                DEFAULT_HTTP_OPTION
            ).pipe(map(() => {
                this.snackbar.open('اطلاعات حریم خصوصی با موفقیت بروزرسانی شد');
                return UserActions.UserPrivacyUpdated({ privacy });
            }), catchError((error: HttpErrorResponse) => {
                const message = error.error.message;
                this.errorHandler.handleHttpError(error, { showSnackbar: true });
                return of(UserActions.UserBannerChangeFailed({ message }));
            }));

        })
    );
    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private configService: ConfigService,
        private store: Store<AppState>,
        // private router: Router,
        private snackbar: MatSnackBar,
        private errorHandler: ErrorHandlerService
    ) { }
}
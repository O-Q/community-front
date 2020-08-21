import { Injectable } from '@angular/core';
import { Effect, Actions, ofType, createEffect } from '@ngrx/effects';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as SocialActions from '@store/social/social.actions';
import * as UserActions from '@store/user/user.actions';
import { switchMap, map, catchError, withLatestFrom, throttleTime } from 'rxjs/operators';
import { ConfigService } from '@app/services/config.service';
import { DEFAULT_HTTP_OPTION } from '@app/constants/http-headers.constant';
import { environment } from '@env/environment';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorHandlerService } from '@app/services/error-handler.service';
import { Widget } from '@app/interfaces/widgets.interface';
import { disableSaveGuard } from '@app/guards/unsave-guard';
import { SocialType } from '@app/models/user.model';
import { ThemeService } from '@app/services/theme.service';
import { Store } from '@ngrx/store';
import { AppState } from '@store/state';
import { socialTypeToPersian, imageTypeToPersian } from '../../utils/conv.util';

@Injectable()
export class SocialEffects {

  urls = environment.urls;

  @Effect()
  socialFetch = this.actions$.pipe(
    ofType(SocialActions.SocialFetching),
    switchMap(socialFetchingData => {
      const url = socialFetchingData.socialType === SocialType.BLOG ? this.urls.blog.GET_BLOG : this.urls.forum.GET_FORUM;
      return this.http.get<any>(
        this.configService.makeUrl(url, {
          queries: { n: socialFetchingData.sname }
        }),
        DEFAULT_HTTP_OPTION
      ).pipe(map(resData => {
        this.store.dispatch(UserActions.UserSocialNotification({ sname: socialFetchingData.sname, notifications: [] }));
        this.theme.changeColors(resData.colors);

        return SocialActions.SocialFetched({
          social: resData
        });
      }), catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleHttpError(error, { showSnackbar: true });
        const message = error.error?.message;
        return of(SocialActions.SocialError({ message }));
      }));

    })
  );

  socialCreate = createEffect(() => (
    this.actions$.pipe(
      ofType(SocialActions.SocialCreating), throttleTime(2000),
      switchMap(socialCreatingData => {
        const { name, title, description, subject, flairs, socialType } = socialCreatingData;
        const url = socialType === SocialType.BLOG ? this.urls.blog.BASE : this.urls.forum.BASE;
        const address = socialType === SocialType.BLOG ? 'b' : 'c';
        return this.http.post<any>(
          this.configService.makeUrl(url),
          { name, title, description, subject, flairs },
        ).pipe(switchMap(resData => {
          this.snackbar.open(`${socialTypeToPersian(socialType)} ${name} با موفقیت ساخته شد`);
          this.router.navigateByUrl(`/${address}/${name}`);
          return [UserActions.UserSocialCreated({
            social: {
              notifications: [],
              role: 'CREATOR',
              social: { flairs, _id: resData._id, name, type: socialType },
              status: 'ACTIVE',
              writeAccess: true,
            }
          }), SocialActions.SocialFetched({ social: resData })];
        }), catchError((error: HttpErrorResponse) => {
          console.log('error');
          this.errorHandler.handleHttpError(error, { showSnackbar: true });
          const message = error.error.message;
          return of(SocialActions.SocialError({ message }));
        }));
      })
    )
  ));


  @Effect()
  socialWidgets = this.actions$.pipe(
    ofType(SocialActions.SocialWidgetsUpdating),
    switchMap((socialWidgetData) => {
      const { sname, widgets, socialType } = socialWidgetData;
      const url = socialType === SocialType.BLOG ? this.urls.blog.UPDATE_WIDGETS : this.urls.forum.UPDATE_WIDGETS;
      return this.http.patch(
        this.configService.makeUrl(url, { queries: { n: sname } }),
        { widgets },
        DEFAULT_HTTP_OPTION
      ).pipe(map(() => {
        this.snackbar.open(`ویجت‌ها با موفقیت به روزرسانی شدند`);
        disableSaveGuard();
        return SocialActions.SocialWidgetsUpdated({ widgets });
      }), catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleHttpError(error, { showSnackbar: true });
        const message = error.error.message;
        return of(SocialActions.SocialError({ message }));
      }));

    })
  );
  @Effect()
  socialWidget = this.actions$.pipe(
    ofType(SocialActions.SocialWidgetUpdating),
    switchMap((socialWidgetData) => {
      const { sname, widget, socialType } = socialWidgetData;
      const url = socialType === SocialType.BLOG ? this.urls.blog.UPDATE_WIDGET : this.urls.forum.UPDATE_WIDGET;
      return this.http.patch(
        this.configService.makeUrl(url, { queries: { n: sname } }),
        { widget },
        DEFAULT_HTTP_OPTION
      ).pipe(map(() => {
        this.snackbar.open(`ویجت‌ با موفقیت به روزرسانی شد`);
        disableSaveGuard();
        return SocialActions.SocialWidgetUpdated({ widget });
      }), catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleHttpError(error, { showSnackbar: true });
        const message = error.error.message;
        return of(SocialActions.SocialError({ message }));
      }));

    })
  );

  @Effect()
  socialJoin = this.actions$.pipe(
    ofType(SocialActions.SocialJoining),
    switchMap((socialJoiningData) => {
      const { sid, socialType } = socialJoiningData;
      const url = socialType === SocialType.BLOG ? this.urls.blog.JOIN_BY_SID : this.urls.forum.JOIN_BY_SID;
      return this.http.post(
        this.configService.makeUrl(url, { params: { sid } }),
        {},
        DEFAULT_HTTP_OPTION
      ).pipe(map((social: any) => {
        this.snackbar.open(`شما در ${socialTypeToPersian(socialType)} ${social.name} عضو شدید. 🎉`);
        return SocialActions.SocialJoined();
      }), catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleHttpError(error, { showSnackbar: true });
        const message = error.error.message;
        return of(SocialActions.SocialError({ message }));
      }));
    })
  );


  @Effect()
  socialPermissionRolesUpdate = this.actions$.pipe(
    ofType(SocialActions.SocialPermissionRolesUpdating),
    switchMap((socialPermissionRolesData) => {
      const { sid, socialType, permissionRoles } = socialPermissionRolesData;
      const url = socialType === SocialType.BLOG ? this.urls.blog.PERMISSION_ROLE : this.urls.forum.PERMISSION_ROLE;
      return this.http.patch(
        this.configService.makeUrl(url, { params: { sid } }),
        { permissionRoles },
        DEFAULT_HTTP_OPTION
      ).pipe(map(() => {
        this.snackbar.open(`دسترسی نقش‌ها بروزرسانی شد.`);
        return SocialActions.SocialPermissionRolesUpdated({ permissionRoles });
      }), catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleHttpError(error, { showSnackbar: true });
        const message = error.error.message;
        return of(SocialActions.SocialError({ message }));
      }));
    })
  );

  @Effect()
  socialLeave = this.actions$.pipe(
    ofType(SocialActions.SocialLeaving),
    switchMap((socialLeavingData) => {
      const { sid, socialType } = socialLeavingData;
      const url = socialType === SocialType.BLOG ? this.urls.blog.LEAVE_BY_SID : this.urls.forum.LEAVE_BY_SID;
      return this.http.delete(
        this.configService.makeUrl(url, { params: { sid } }),
        DEFAULT_HTTP_OPTION
      ).pipe(map(() => {
        UserActions.UserLeaveSocial({ sid });
        return SocialActions.SocialLeft();
      }), catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleHttpError(error, { showSnackbar: true });
        const message = error.error.message;
        return of(SocialActions.SocialError({ message }));
      }));
    })
  );

  @Effect()
  socialInfo = this.actions$.pipe(
    ofType(SocialActions.SocialInfoUpdating),
    switchMap((socialInfoData) => {
      const { sname, description, flairs, isPrivate, status, socialType, title, colors, aboutMe } = socialInfoData;
      const body = { title, description, flairs, isPrivate, status, colors, aboutMe };

      const url = socialType === SocialType.FORUM ? this.urls.forum.UPDATE_INFO : this.urls.blog.UPDATE_INFO;
      return this.http.patch<any>(
        this.configService.makeUrl(url, { queries: { n: sname } }),
        body,
        DEFAULT_HTTP_OPTION
      ).pipe(map(() => {
        const successMessage = `اطلاعات ${socialTypeToPersian(socialType)} با موفقیت به روزرسانی شد`;
        this.theme.changeColors(colors);
        this.snackbar.open(successMessage);
        disableSaveGuard();
        return SocialActions.SocialInfoUpdated(body);
      }), catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleHttpError(error, { showSnackbar: true });
        const message = error.error.message;
        return of(SocialActions.SocialError({ message }));
      }));

    })
  );

  @Effect()
  socialImageUpdating = this.actions$.pipe(
    ofType(SocialActions.SocialImageUpdating),
    switchMap((socialImageData) => {
      const { socialType, imageType, file, sname } = socialImageData;
      const successMessage = `${imageTypeToPersian(imageType)} ${socialTypeToPersian(socialType)} با موفقیت به روزرسانی شد`;
      let url: string;
      const formData = new FormData();
      formData.append(imageType, file, file.name);
      switch (socialType) {
        case SocialType.BLOG:
          if (imageType === 'avatar') {
            url = this.urls.blog.UPLOAD_AVATAR;
          } else {
            url = this.urls.blog.UPLOAD_BANNER;
          }
          break;
        case SocialType.FORUM:
          if (imageType === 'avatar') {
            url = this.urls.forum.UPLOAD_AVATAR;
          } else {
            url = this.urls.forum.UPLOAD_BANNER;
          }
          break;
      }
      return this.http.post<{ link: string }>(
        this.configService.makeUrl(url, { queries: { n: sname } }),
        formData,
      ).pipe(map((r) => {
        this.snackbar.open(successMessage);
        return SocialActions.SocialImageUpdated({ link: r.link, imageType });
      }), catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleHttpError(error, { showSnackbar: true });
        const message = error.error.message;
        return of(SocialActions.SocialError({ message }));
      }));
    })
  );

  @Effect()
  socialImageDeleting = this.actions$.pipe(
    ofType(SocialActions.SocialImageDeleting),
    switchMap((socialImageData) => {
      const { socialType, imageType, sname } = socialImageData;
      const successMessage = `${imageTypeToPersian(imageType)} ${socialTypeToPersian(socialType)} با موفقیت به حذف شد`;
      let url: string;
      switch (socialType) {
        case SocialType.BLOG:
          if (imageType === 'avatar') {
            url = this.urls.blog.DELETE_AVATAR;
          } else {
            url = this.urls.blog.DELETE_BANNER;
          }
          break;
        case SocialType.FORUM:
          if (imageType === 'avatar') {
            url = this.urls.forum.UPLOAD_AVATAR;
          } else {
            url = this.urls.forum.UPLOAD_BANNER;
          }
          break;
      }
      return this.http.delete(
        this.configService.makeUrl(url, { queries: { n: sname } }),
        DEFAULT_HTTP_OPTION
      ).pipe(map((r) => {
        this.snackbar.open(successMessage);
        return SocialActions.SocialImageDeleted({ imageType });
      }), catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleHttpError(error, { showSnackbar: true });
        const message = error.error.message;
        return of(SocialActions.SocialError({ message }));
      }));
    })
  );


  @Effect()
  socialDefaultWidgets = this.actions$.pipe(
    ofType(SocialActions.SocialWidgetDefaultGetting),
    switchMap(({ socialType }) => {
      const url = socialType === SocialType.FORUM ? this.urls.forum.GET_DEFAULT_WIDGETS : this.urls.blog.GET_DEFAULT_WIDGETS;
      return this.http.get<Widget[]>(
        this.configService.makeUrl(url),
        DEFAULT_HTTP_OPTION
      ).pipe(map((widgets) => {
        return SocialActions.SocialWidgetDefaultGot({ widgets });
      }), catchError((error: HttpErrorResponse) => {
        const message = error.error.message;
        this.errorHandler.handleHttpError(error, { showSnackbar: true });
        return of(SocialActions.SocialError({ message }));
      }));
    }));

  @Effect()
  socialDelete = this.actions$.pipe(
    ofType(SocialActions.SocialDeleting),
    withLatestFrom(this.store.select('user').pipe(map(u => u.user?.socials))),
    switchMap(([payload, socials]) => {
      const url = payload.socialType === SocialType.FORUM ? this.urls.forum.DELETE_FORUM : this.urls.blog.DELETE_BLOG;
      return this.http.delete(
        this.configService.makeUrl(url, { params: { sid: payload.sid } }),
        DEFAULT_HTTP_OPTION
      ).pipe(map(() => {
        this.router.navigate(['/']);
        this.store.dispatch(UserActions.UserSocialsFetched({ socials: socials.filter(s => s.social._id !== payload.sid) }));
        return SocialActions.SocialDeleted();
      }), catchError((error: HttpErrorResponse) => {
        const message = error.error.message;
        this.errorHandler.handleHttpError(error, { showSnackbar: true });
        return of(SocialActions.SocialError({ message }));
      }));
    }));

  @Effect()
  socialUsersGet = this.actions$.pipe(
    ofType(SocialActions.SocialUsersGetting),
    switchMap((payload) => {
      const url = payload.socialType === SocialType.FORUM ? this.urls.forum.SOCIAL_USERS : this.urls.blog.SOCIAL_USERS;
      console.log(this.configService.makeUrl(url, { queries: { n: payload.sname } }));

      return this.http.get<any>(
        this.configService.makeUrl(url, { queries: { n: payload.sname } }),
        DEFAULT_HTTP_OPTION
      ).pipe(map((r) => {
        return SocialActions.SocialUsersGot({ users: r.users });
      }), catchError((error: HttpErrorResponse) => {
        const message = error.error.message;
        this.errorHandler.handleHttpError(error, { showSnackbar: true });
        return of(SocialActions.SocialError({ message }));
      }));
    }));

  @Effect()
  socialUsersUpdate = this.actions$.pipe(
    ofType(SocialActions.SocialUsersUpdating),
    switchMap((payload) => {
      const url = payload.socialType === SocialType.FORUM ?
        this.urls.forum.UPDATE_SOCIAL_USERS :
        this.urls.blog.UPDATE_SOCIAL_USERS;
      return this.http.patch<any>(
        this.configService.makeUrl(url, { params: { sid: payload.sid } }),
        payload.updatedUsers,
        DEFAULT_HTTP_OPTION
      ).pipe(map(() => {
        this.snackbar.open('کاربران با موفقیت بروزرسانی شدند.');
        return SocialActions.SocialUsersUpdated();
      }), catchError((error: HttpErrorResponse) => {
        const message = error.error.message;
        this.errorHandler.handleHttpError(error, { showSnackbar: true });
        return of(SocialActions.SocialError({ message }));
      }));
    }));


  @Effect()
  socialUserRemove = this.actions$.pipe(
    ofType(SocialActions.SocialUserRemoving),
    switchMap((payload) => {
      const url = payload.socialType === SocialType.FORUM ?
        this.urls.forum.REMOVE_SOCIAL_USER :
        this.urls.blog.REMOVE_SOCIAL_USER;
      return this.http.delete<any>(
        this.configService.makeUrl(url, { params: { sid: payload.sid, uid: payload.uid } }),
        DEFAULT_HTTP_OPTION
      ).pipe(map(() => {
        this.snackbar.open('کاربر با موفقیت حذف شد.');
        return SocialActions.SocialUserRemoved();
      }), catchError((error: HttpErrorResponse) => {
        const message = error.error.message;
        this.errorHandler.handleHttpError(error, { showSnackbar: true });
        return of(SocialActions.SocialError({ message }));
      }));
    }));

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private configService: ConfigService,
    private router: Router,
    private snackbar: MatSnackBar,
    private errorHandler: ErrorHandlerService,
    private theme: ThemeService,
    private store: Store<AppState>
  ) { }
}

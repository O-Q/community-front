import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as SocialActions from './social.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ConfigService } from '../../services/config.service';
import { DEFAULT_HTTP_OPTION } from '../../constants/http-headers.constant';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class SocialEffects {
  @Effect()
  socialFetch = this.actions$.pipe(
    ofType(SocialActions.SocialFetching),
    switchMap(socialFetchingData => {
      switch (socialFetchingData.socialType) {
        case 'blog':
          return this.http.get(
            this.configService.makeUrl(environment.urls.blog.GET_BLOG, {
              params: { sname: socialFetchingData.sname }
            }),
            DEFAULT_HTTP_OPTION
          ).pipe(map(resData => {
            return SocialActions.SocialFetched({
              social: resData
            });
          }), catchError((error: HttpErrorResponse) => {
            if (error.status === 404) {
              this.router.navigateByUrl('/error/404');
            }
            const message = error.error.message;
            return of(SocialActions.SocialFetchFailed({ message }));
          }));
        case 'forum':
          return this.http.get<any>(
            this.configService.makeUrl(environment.urls.forum.GET_FORUM, { params: { sname: socialFetchingData.sname } }),
            DEFAULT_HTTP_OPTION
          ).pipe(map(resData => {
            return SocialActions.SocialFetched({
              social: resData
            });
          }), catchError((error: HttpErrorResponse) => {
            if (error.status === 404) {
              this.router.navigateByUrl('/error/404');
            }
            const message = error.error.message;
            return of(SocialActions.SocialFetchFailed({ message }));

          }));
        default:
          console.error('invalid social type');
          break;
      }
    })
  );
  @Effect()
  postDetailedFetch = this.actions$.pipe(
    ofType(SocialActions.PostDetailedFetching),
    switchMap((postDetailedData) => {
      return this.http.get(
        this.configService.makeUrl(environment.urls.post.GET_POST, {
          params: {
            pid: postDetailedData.pid,
            sid: postDetailedData.sid
          }
        }),
        DEFAULT_HTTP_OPTION
      );
    }));

  @Effect()
  postsFetch = this.actions$.pipe(
    ofType(SocialActions.PostsFetching),
    switchMap((postsFetchingData) => {
      return this.http.get(
        this.configService.makeUrl(environment.urls.post.GET_POSTS_BY_SID, {
          params: {
            sid: postsFetchingData.sid
          },
          queries: postsFetchingData.query
        }),
        DEFAULT_HTTP_OPTION
      );
    }));

  @Effect()
  socialCreate = this.actions$.pipe(
    ofType(SocialActions.SocialCreating),
    switchMap(socialCreatingData => {
      const { name, description, subject, flairs, socialType } = socialCreatingData;
      switch (socialType) {
        case 'blog':
          return this.http.post(
            this.configService.makeUrl(environment.urls.blog.BASE),
            { name, description, subject, flairs },
            DEFAULT_HTTP_OPTION
          ).pipe(map(resData => {
            this.snackbar.open(`بلاگ ${name} با موفقیت ساخته شد`);
            this.router.navigateByUrl(`/b/${name}`);
            return SocialActions.SocialFetched({
              social: resData
            });
          }), catchError((error: HttpErrorResponse) => {
            const message = error.error.message;
            return of(SocialActions.SocialFetchFailed({ message }));
          }));

        case 'forum':
          return this.http.post<any>(
            this.configService.makeUrl(environment.urls.forum.BASE),
            { name, description, subject, flairs },
            DEFAULT_HTTP_OPTION
          ).pipe(map(resData => {
            this.snackbar.open(`انجمن ${name} با موفقیت ساخته شد`);
            this.router.navigateByUrl(`/c/${name}`);
            return SocialActions.SocialFetched({
              social: resData
            });
          }), catchError((error: HttpErrorResponse) => {
            const message = error.error.message;
            // TODO": NOT FETCHED. IT'S ABOUT CREATE
            return of(SocialActions.SocialFetchFailed({ message }));
          }));

        default:
          console.error('invalid social type');
          break;
      }
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private configService: ConfigService,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }
}

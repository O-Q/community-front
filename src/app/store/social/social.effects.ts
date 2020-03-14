import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as SocialActions from './social.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ConfigService } from '../../services/config.service';
import { DEFAULT_HTTP_OPTION } from '../../constants/http-headers.constant';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';

@Injectable()
export class SocialEffects {
  @Effect()
  socialFetch = this.actions$.pipe(
    ofType(SocialActions.SocialFetching),
    switchMap(socialFetchingData => {
      // TODO: incomplete body
      const body = {
        name: socialFetchingData.name
      };

      switch (socialFetchingData.socialType) {
        case 'blog':
          return this.http.get(
            this.configService.makeUrl(environment.urls.blog.GET_BLOG, {
              params: { sid: socialFetchingData.sid }
            }),
            DEFAULT_HTTP_OPTION
          );
        case 'forum':
          return this.http.get<any>(
            this.configService.makeUrl(environment.urls.forum.GET_FORUM, { params: { sid: socialFetchingData.sid } }),
            DEFAULT_HTTP_OPTION
          ).pipe(map(resData => {
            return SocialActions.SocialFetched({
              social: resData
            });
          }), catchError((error: HttpErrorResponse) => {
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
            pid: postDetailedData.postId,
            sid: postDetailedData.groupId
          }
        }),
        DEFAULT_HTTP_OPTION
      );
    }));

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private configService: ConfigService
  ) { }
}

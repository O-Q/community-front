import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import * as SocialActions from './social.actions';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ConfigService } from '../../services/config.service';
import { DEFAULT_HTTP_OPTION } from '../../constants/http-headers.constant';
import { environment } from '../../../environments/environment';

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
              params: { id: socialFetchingData.id }
            }),
            DEFAULT_HTTP_OPTION
          );
        case 'forum':
          return this.http.get(
            this.configService.makeUrl(environment.urls.forum.GET_FORUM),
            DEFAULT_HTTP_OPTION
          );
        default:
          console.error('invalid social type');
          break;
      }
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private configService: ConfigService
  ) {}
}

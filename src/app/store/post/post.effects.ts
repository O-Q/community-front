import { Effect, Actions, ofType } from '@ngrx/effects';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { ConfigService } from '../../services/config.service';
import { DEFAULT_HTTP_OPTION } from '../../constants/http-headers.constant';
import * as PostActions from './post.actions';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Injectable()
export class PostEffects {
    @Effect()
    postPublish = this.actions$.pipe(
        ofType(PostActions.PostPublishing),
        switchMap(postPublishingData => {
            return this.http.post(
                this.configService.makeUrl(environment.urls.post.CREATE_POST_BY_SID, { params: { sid: postPublishingData.sid } }),
                postPublishingData.post,
                DEFAULT_HTTP_OPTION
            ).pipe(map(() => {
                this.router.navigateByUrl(`/c/${[postPublishingData.sname]}`);
                return PostActions.PostPublished();
            }), catchError((error: HttpErrorResponse) => {
                this.errorHandler.handleHttpError(error, { showSnackbar: true });
                const message = error.error.message;
                return of(PostActions.PostPublishFailed({ message }));
            }));
        }));

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private configService: ConfigService,
        private router: Router,
        private errorHandler: ErrorHandlerService
    ) { }
}

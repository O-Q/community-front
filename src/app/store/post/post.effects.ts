import { Effect, Actions, ofType } from '@ngrx/effects';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';

import { ConfigService } from '../../services/config.service';
import { DEFAULT_HTTP_OPTION } from '../../constants/http-headers.constant';
import * as PostActions from './post.actions';
import * as SocialActions from './../social/social.actions';

import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { Store } from '@ngrx/store';
import { AppState } from '../state';
import { PostDetailed, Post } from '../../interfaces/post.interface';
import { SocialType } from '../../../../server/dist/user/interfaces/user.interface';

@Injectable()
export class PostEffects {
    @Effect()
    postsFetch = this.actions$.pipe(
        ofType(PostActions.PostsFetching),
        switchMap((postsFetchingData) => {
            return this.http.get<Post[]>(
                this.configService.makeUrl(environment.urls.post.GET_POSTS_BY_SNAME, {
                    queries: { ...postsFetchingData.query, n: postsFetchingData.sname }
                }),
                DEFAULT_HTTP_OPTION
            ).pipe(
                map(resData => {
                    return PostActions.PostsFetched({ posts: resData });
                }), catchError((error: HttpErrorResponse) => {
                    const message = error.error.message;
                    return of(PostActions.PostsFetchFailed({ message }));
                })

            );
        }));

    @Effect()
    postsUserFetch = this.actions$.pipe(
        ofType(PostActions.PostsUserFetching),
        switchMap((postsFetchingData) => {
            const { query, username } = postsFetchingData;
            return this.http.get<Post[]>(
                this.configService.makeUrl(environment.urls.post.GET_POSTS_BY_USERNAME, {
                    queries: { u: username, ...query }
                }),
                DEFAULT_HTTP_OPTION
            ).pipe(
                map(resData => {
                    return PostActions.PostsUserFetched({ posts: resData });
                }), catchError((error: HttpErrorResponse) => {
                    const message = error.error.message;
                    return of(PostActions.PostsUserFetchFailed({ message }));
                })

            );
        }));

    @Effect()
    postExpress = this.actions$.pipe(
        ofType(PostActions.PostExpressing),
        switchMap((postsFetchingData) => {
            const { reaction, pid } = postsFetchingData;
            return this.http.post<{ reaction: number }>(
                this.configService.makeUrl(environment.urls.post.UPDATE_REACTION, {
                    params: { pid }
                }),
                { reaction },
                DEFAULT_HTTP_OPTION
            ).pipe(
                map(r => {
                    return PostActions.PostExpressed({ reaction: r.reaction, pid });
                }), catchError((error: HttpErrorResponse) => {
                    const message = error.error.message;
                    return of(PostActions.PostExpressFailed({ message }));
                })

            );
        }));

    @Effect()
    postPublish = this.actions$.pipe(
        ofType(PostActions.PostPublishing),
        switchMap(postPublishingData => {
            return this.http.post(
                this.configService.makeUrl(environment.urls.post.CREATE_POST_BY_SID, { params: { sid: postPublishingData.sid } }),
                postPublishingData.post,
                DEFAULT_HTTP_OPTION
            ).pipe(map(() => {
                this.router.navigate([postPublishingData.socialType === SocialType.BLOG ? '/b' : '/c', postPublishingData.sname]);
                return PostActions.PostPublished();
            }), catchError((error: HttpErrorResponse) => {
                this.errorHandler.handleHttpError(error, { showSnackbar: true });
                const message = error.error.message;
                return of(PostActions.PostPublishFailed({ message }));
            }));
        }));
    @Effect()
    postReplyPublish = this.actions$.pipe(
        ofType(PostActions.PostReplyPublishing),
        switchMap(postReplyPublishingData => {
            const { pid, sid, comment, sname } = postReplyPublishingData;
            console.log('bb');

            return this.http.post(
                this.configService.makeUrl(environment.urls.post.CREATE_REPLAY_POST_BY_SID, { params: { sid, pid } }),
                { comment },
                DEFAULT_HTTP_OPTION
            ).pipe(map(() => {
                this.router.navigateByUrl(`/c/${sname}`);
                return PostActions.PostPublished();
            }), catchError((error: HttpErrorResponse) => {
                this.errorHandler.handleHttpError(error, { showSnackbar: true });
                const message = error.error.message;
                return of(PostActions.PostPublishFailed({ message }));
            }));
        }));
    @Effect()
    postDelete = this.actions$.pipe(
        ofType(PostActions.PostDeleting),
        withLatestFrom(this.store.select('post')),
        switchMap(
            ([postDeletingData, postState]) => {

                const { pid, sname } = postDeletingData;
                return this.http.delete(
                    this.configService.makeUrl(environment.urls.post.DELETE_POST, { params: { pid } }),
                    DEFAULT_HTTP_OPTION
                ).pipe(map(() => {
                    console.log(postDeletingData.socialType);

                    this.router.navigate([postDeletingData.socialType === 'BLOG' ? '/b' : '/c', sname]);
                    const posts = postState.posts.filter(p => p._id !== pid);

                    this.store.dispatch(PostActions.PostsFetched({ posts }));
                    return PostActions.PostDeleted();
                }), catchError((error: HttpErrorResponse) => {
                    console.log(error);

                    this.errorHandler.handleHttpError(error, { showSnackbar: true });
                    const message = error.error.message;
                    return of(PostActions.PostDeleteFailed({ message }));
                }));
            }));
    @Effect()
    postDetailedFetch = this.actions$.pipe(
        ofType(PostActions.PostDetailedFetching),
        switchMap((postDetailedData) => {
            return this.http.get<PostDetailed>(
                this.configService.makeUrl(environment.urls.post.GET_POST, {
                    params: {
                        pid: postDetailedData.pid,
                    }
                }),
                DEFAULT_HTTP_OPTION
            ).pipe(
                map(resData => {
                    return PostActions.PostDetailedFetched({ post: resData });
                }), catchError((error: HttpErrorResponse) => {
                    const message = error.error.message;
                    return of(PostActions.PostDetailedFetchFailed({ message }));
                })

            );
        }));
    @Effect()
    postUpdate = this.actions$.pipe(
        ofType(PostActions.PostUpdating),
        switchMap((postUpdateData) => {
            console.log(postUpdateData.post);
            const { text, title, subtitle, pid, flairs } = postUpdateData.post;
            return this.http.patch<PostDetailed>(
                this.configService.makeUrl(environment.urls.post.UPDATE_POST, {
                    params: {
                        pid
                    }
                }),
                { title, text, subtitle, flairs },
                DEFAULT_HTTP_OPTION
            ).pipe(
                map(resData => {
                    console.log(postUpdateData);

                    this.router.navigate([postUpdateData.socialType === SocialType.BLOG ? '/b' : '/c', postUpdateData.sname]);
                    return PostActions.PostDetailedFetched({ post: resData });
                }), catchError((error: HttpErrorResponse) => {
                    const message = error.error.message;
                    return of(PostActions.PostDetailedFetchFailed({ message }));
                })

            );
        }));
    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private configService: ConfigService,
        private router: Router,
        private errorHandler: ErrorHandlerService,
        private store: Store<AppState>
    ) { }
}

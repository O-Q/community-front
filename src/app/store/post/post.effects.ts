import { Effect, Actions, ofType } from '@ngrx/effects';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';

import { ConfigService } from '@app/services/config.service';
import { DEFAULT_HTTP_OPTION } from '@app/constants/http-headers.constant';
import * as PostActions from './post.actions';
import * as SearchActions from './../search/search.actions';


import { environment } from '@env/environment';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '@app/services/error-handler.service';
import { Store } from '@ngrx/store';
import { AppState } from '@store/state';
import { PostDetailed, Post } from '@app/interfaces/post.interface';
import { SocialType } from '@app/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class PostEffects {
    @Effect()
    postsFetch = this.actions$.pipe(
        ofType(PostActions.PostsFetching),
        switchMap((postsFetchingData) => {
            return this.http.get<{ posts: Post[], length: number }>(
                this.configService.makeUrl(environment.urls.post.GET_POSTS_BY_SNAME, {
                    queries: { ...postsFetchingData.query, n: postsFetchingData.sname }
                }),
                DEFAULT_HTTP_OPTION
            ).pipe(
                map(resData => {
                    return PostActions.PostsFetched({ posts: resData.posts, length: resData.length });
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
            const { reaction, pid, isComment } = postsFetchingData;
            if (postsFetchingData.isHomepage) {
                this.store.dispatch(SearchActions.HomepagePostExpressing({ post: postsFetchingData.post }));
            }
            return this.http.post<{ reaction: number }>(
                this.configService.makeUrl(environment.urls.post.UPDATE_REACTION, {
                    params: { pid }
                }),
                { reaction },
                DEFAULT_HTTP_OPTION
            ).pipe(
                map(r => {
                    return PostActions.PostExpressed({ reaction: r.reaction, pid, isComment: !!isComment });

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
                return PostActions.PostPublished({});
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
            const { pid, sid, comment, sname, socialType } = postReplyPublishingData;
            return this.http.post(
                this.configService.makeUrl(environment.urls.post.CREATE_REPLAY_POST_BY_SID, { params: { sid, pid } }),
                { comment, socialType },
                DEFAULT_HTTP_OPTION
            ).pipe(map((post) => {
                post['social'] = sname;
                // this.router.navigateByUrl(`/${socialType === SocialType.BLOG ? 'b' : 'c'}/${sname}/p/${pid}`);
                return PostActions.PostPublished({ comment: post });
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
                const { pid, sname, socialType, isComment } = postDeletingData;
                return this.http.delete(
                    this.configService.makeUrl(environment.urls.post.DELETE_POST, { params: { pid }, queries: { socialType } }),
                    DEFAULT_HTTP_OPTION
                ).pipe(map(() => {
                    console.log(postDeletingData.socialType);
                    if (!isComment) {
                        this.router.navigate([postDeletingData.socialType === 'BLOG' ? '/b' : '/c', sname]);
                        const posts = postState.posts?.filter(p => p._id !== pid);
                        this.store.dispatch(PostActions.PostsFetched({ posts, length: postState.length - 1 }));
                    } else { // comments
                        const comments = postState.post.comments.filter(c => c._id !== pid);
                        this.store.dispatch(PostActions.PostDetailedFetched({
                            post: {
                                ...postState.post,
                                comments,
                                comment: postState.post.comment - 1
                            }
                        }));

                    }

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
        withLatestFrom(this.store.select('post')),
        switchMap(([postUpdateData, postState]) => {
            console.log(postUpdateData.post);
            const { text, subtitle, flairs } = postUpdateData.post;
            const pid = postUpdateData.post.pid || postUpdateData.post._id;
            const isComment = !!postUpdateData.isComment;
            const title = isComment ? '$$COMMENT' : postUpdateData.post.title;
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
                    if (!isComment) {
                        this.router.navigate([postUpdateData.socialType === SocialType.BLOG ? '/b' : '/c', postUpdateData.sname]);
                    }
                    this.snackbar.open('پست با موفقیت بروزرسانی شد.');
                    return PostActions.PostDetailedFetched({
                        post: {
                            ...postState.post,
                            comments: postState.post.comments.map(c => c._id === pid ? { ...resData, author: postUpdateData.post.author } : c),
                        }
                    });
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
        private snackbar: MatSnackBar,
        private errorHandler: ErrorHandlerService,
        private store: Store<AppState>
    ) { }
}

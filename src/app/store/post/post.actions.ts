import { createAction, props } from '@ngrx/store';
import { Post, PostDetailed } from '@app/interfaces/post.interface';
import { Params } from '@angular/router';
import { SocialType } from '@app/models/user.model';

export const PostsFetching = createAction('[Post] Posts Fetching', props<PostsFetchingPayload>());
export const PostsFetched = createAction('[Post] Posts Fetched', props<{ posts: Post[], length: number }>());
export const PostsFetchFailed = createAction(
    '[Post] Posts Fetch Failed',
    props<{ message: string }>()
);

export const PostsUserFetching = createAction('[Post] Posts User Fetching', props<PostsUserFetchingPayload>());
export const PostsUserFetched = createAction('[Post] Posts User Fetched', props<{ posts: Post[] }>());
export const PostsUserFetchFailed = createAction(
    '[Post] Posts User Fetch Failed',
    props<{ message: string }>()
);

export const PostPublishing = createAction('[POST] Post Publish Start', props<{ post: any, sid: string, sname: string, socialType: SocialType }>());
export const PostPublished = createAction('[POST] Post Published Successfully', props<{ comment?: any }>());
export const PostPublishFailed = createAction('[POST] Post Publish Failed', props<{ message: string }>());

export const PostReplyPublishing = createAction('[POST] Post Reply Publish Start', props<{ comment: string, sid: string, pid: string, sname: string, socialType: 'BLOG' | 'FORUM' }>());
export const PostReplyPublished = createAction('[POST] Post Reply Publish Successfully', props<{ comment: Post }>());
export const PostReplyPublishFailed = createAction('[POST] Post Reply Publish Failed', props<{ message: string }>());


export const PostDeleting = createAction('[POST] Post Deleting Start', props<{ pid: string, sname: string, socialType: SocialType, isComment?: boolean }>());
export const PostDeleted = createAction('[POST] Post Deleted Successfully');
export const PostDeleteFailed = createAction('[POST] Post Delete Failed', props<{ message: string }>());


export const PostDetailedFetching = createAction(
    '[Post] Post Detailed Fetch Start',
    props<CommentPostPayload>()
);
export const PostDetailedFetched = createAction(
    '[Post] Post Detailed Fetched Successfully',
    props<{ post: PostDetailed }>());
export const PostDetailedFetchFailed = createAction(
    '[Post] Post Detailed Fetch Failed',
    props<{ message: string }>());

export const PostUpdating = createAction('[POST] Post Updating Start',
    props<{ post: any, sid: string, sname: string, socialType: 'BLOG' | 'FORUM', isComment?: boolean }>());
export const PostUpdated = createAction('[POST] Post Updated Successfully');
export const PostUpdateFailed = createAction('[POST] Post Update Failed', props<{ message: string }>());


export const PostExpressing = createAction('[POST] Post Express Start', props<{ reaction: 'LIKE' | 'DISLIKE', pid: string, post: Post, isComment?: boolean }>());
export const PostExpressed = createAction('[POST] Post Expressed Successfully', props<{ reaction: number, pid: string, isComment }>());
export const PostExpressFailed = createAction('[POST] Post Express Failed', props<{ message: string }>());


interface CommentPostPayload {
    sname: string;
    pid: string;
}


interface PostsFetchingPayload {
    sname: string;
    query: Params;
}


interface PostsUserFetchingPayload {
    username: string;
    query: { itemsPerPage: number, page: number, sortBy?: string, isComment?: boolean };
}

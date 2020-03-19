import { createAction, props } from '@ngrx/store';
import { PostDetailed, Post } from '../../interfaces/post.interface';
import { Params } from '@angular/router';

export const SocialFetching = createAction(
  '[Social] Social Fetch Start',
  props<SocialFetchingPayload>()
);
export const SocialFetched = createAction(
  '[Social] Social Fetched Successfully',
  props<SocialFetchedPayload>()
);
export const SocialFetchFailed = createAction(
  '[Social] Social Fetch Failed',
  props<{ message: string }>()
);

export const PostDetailedFetching = createAction(
  '[Social] Post Detailed Fetch Start',
  props<CommentPostPayload>()
);
export const PostDetailedFetched = createAction(
  '[Social] Post Detailed Fetched Successfully',
  props<{ post: PostDetailed }>());
export const PostDetailedFetchFailed = createAction(
  '[Social] Post Detailed Fetch Failed',
  props<{ message: string }>());
export const LeavePost = createAction('[Social] Leave Post Detailed');

export const PostsFetching = createAction('[Social] Posts Fetching', props<PostsFetchingPayload>());
export const PostsFetched = createAction('[Social] Posts Fetched', props<{ posts: Post[] }>());
export const PostsFetchFailed = createAction(
  '[Social] Posts Fetch Failed',
  props<{ message: string }>()
);

export const SocialCreating = createAction(
  '[Social] Social Create Start',
  props<SocialCreatingPayload>()
);


interface SocialCreatingPayload {
  name: string;
  description: string;
  subject: string;
  flairs: string[];
  socialType: string;
}


interface SocialFetchingPayload {
  // TODO: type

  sname: string;
  socialType: 'forum' | 'blog';
}

interface SocialFetchedPayload {
  // TODO: type
  social: any;
}
interface CommentPostPayload {
  sname: string;
  pid: string;
}
interface PostsFetchingPayload {
  sname: string;
  query: Params;
}

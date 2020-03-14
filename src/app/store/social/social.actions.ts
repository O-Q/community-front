import { createAction, props } from '@ngrx/store';
import { PostDetailed } from '../../interfaces/post.interface';

export const SocialFetching = createAction(
  '[Social] Social Fetch Start',
  props<SocialFetchingPayload>()
);
export const SocialFetched = createAction(
  '[Social] Social Fetched Successfully',
  props<SocialFetchedPayload>()
);

export const SocialFetchFailed = createAction(
  '[Social] Social Fetch Fail',
  props<{ message: string }>()
);

export const PostDetailedFetching = createAction(
  '[Social] Post Detailed Fetch Start',
  props<CommentPostPayload>()
);

export const PostDetailedFetched = createAction(
  '[Social] Post Detailed Fetched Successfully',
  props<{ post: PostDetailed }>());


export const LeavePost = createAction('[Social] Leave Post Detailed');

interface SocialFetchingPayload {
  // TODO: type

  sid: string;
  name: string;
  socialType: 'forum' | 'blog';
}

interface SocialFetchedPayload {
  // TODO: type
  social: any;
}
interface CommentPostPayload {
  groupId: string;
  postId: string;
}

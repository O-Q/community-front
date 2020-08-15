import { createAction, props } from '@ngrx/store';
import { PostSortBy } from '@app/constants/post.constant';
import { Post } from '@app/interfaces/post.interface';

export const SearchFetching = createAction(
  '[Search] Search Fetch Start', props<{ text: string, page: number, itemsPerPage: number }>()
);

export const SearchFetched = createAction(
  '[Search] Search Fetched Successfully',
  props<{ data: any }>()
);
export const HomepageSocialFetching = createAction(
  '[Search] Homepage Social Fetch Start', props<{ page: number, itemsPerPage: number }>()
);

export const HomepageSocialFetched = createAction(
  '[Search] Homepage Social Fetched Successfully',
  props<{ data: any }>()
);
export const HomepagePostFetching = createAction(
  '[Search] Homepage Post Fetch Start', props<{ page: number, itemsPerPage: number, sortBy: PostSortBy }>()
);

export const HomepagePostFetched = createAction(
  '[Search] Homepage Post Fetched Successfully',
  props<{ posts: Post[], length: number }>()
);
export const HomepagePostExpressing = createAction('[Search] Homepage Post Expressing',
  props<{ post: Post }>());


export const SearchError = createAction(
  '[Search] Search Error',
  props<{ message: any }>()
);

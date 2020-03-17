import { createReducer, on } from '@ngrx/store';
import * as socialActions from './social.actions';
import { PostDetailed, Post } from '../../interfaces/post.interface';
import { Widget } from '../../interfaces/widgets.interface';

export interface State {
  // TODO: type
  readonly social: any; //
  readonly fetchError: string;
  readonly loading: boolean;
  // TODO: type not completed
  readonly focusedPost: PostDetailed;
  readonly filterPostsQuery: { flair: string };
  readonly posts: Post[];

}

const INIT_STATE: State = {
  social: null,
  fetchError: null,
  loading: false,
  filterPostsQuery: null,
  focusedPost: null,
  posts: null,
};

export const reducer = createReducer(
  INIT_STATE,
  on(socialActions.SocialFetching, state => ({
    ...state,
    loading: true,
    social: null,
    fetchError: null,
    filterPostsQuery: null,
    posts: null
  })),
  on(socialActions.SocialFetchFailed, (state, action) => ({
    ...state,
    loading: false,
    fetchError: action.message
  })),
  on(socialActions.SocialFetched, (state, action) => ({
    ...state,
    social: action.social,
    loading: false
  })),
  on(socialActions.PostDetailedFetching, (state) => ({
    ...state,
    loading: true
  })),
  on(socialActions.PostDetailedFetched, (state, action) => ({
    ...state,
    focusedPost: action.post,
    loading: false
  })),
  on(socialActions.PostDetailedFetchFailed, (state, action) => ({
    ...state,
    fetchError: action.message,
    loading: false
  })),
  on(socialActions.LeavePost, (state) => ({
    ...state,
    focusedPost: null,
    loading: false
  })),
  on(socialActions.PostsFetching, (state, action) => ({
    ...state,
    filterPostsQuery: action.query,
    loading: true
  })),
  on(socialActions.PostsFetched, (state, action) => ({
    ...state,
    posts: action.posts,
    loading: false,
  })),
  on(socialActions.PostsFetchFailed, (state, action) => ({
    ...state,
    loading: false,
    fetchError: action.message
  })),
  on(socialActions.SocialCreating, (state) => ({
    ...state,
    loading: true,
    fetchError: null,
    social: null
  }))
);

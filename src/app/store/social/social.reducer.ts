import { createReducer, on } from '@ngrx/store';
import * as socialActions from './social.actions';
import { PostDetailed } from '../../interfaces/post.interface';

export interface State {
  // TODO: type
  readonly social: any; //
  readonly fetchError: string;
  readonly loading: boolean;
  // TODO: type not completed
  readonly focusedPost: PostDetailed;
}

const INIT_STATE: State = {
  social: null,
  fetchError: null,
  loading: false,
  focusedPost: null
};

export const reducer = createReducer(
  INIT_STATE,
  on(socialActions.SocialFetching, state => ({
    ...state,
    loading: true,
    social: null,
    fetchError: null
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
  on(socialActions.LeavePost, (state) => ({
    ...state,
    focusedPost: null,
    loading: false
  }))
);

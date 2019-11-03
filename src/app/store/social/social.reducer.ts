import { createReducer, on } from '@ngrx/store';
import * as socialActions from './social.actions';

export interface State {
  // TODO: type
  readonly social: any;
  readonly fetchError: string;
  readonly loading: boolean;
}

const INIT_STATE: State = {
  social: null,
  fetchError: null,
  loading: false
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
  }))
);

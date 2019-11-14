import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import * as credentialActions from './auth.actions';

export interface State {
  readonly user: User;
  readonly authError: string;
  readonly loading: boolean;
  readonly mode: 'signin' | 'signup';
}

const INIT_STATE: State = {
  user: null,
  authError: null,
  loading: false,
  mode: null
};

export const reducer = createReducer(
  INIT_STATE,
  on(credentialActions.loadUser, (state, action) => ({
    ...state,
    user: action.payload
  })),
  on(credentialActions.loginStart, state => ({
    ...state,
    authError: null,
    loading: true
  })),
  on(credentialActions.authenticateSuccess, (state, action) => ({
    ...state,
    user: action.payload.user,
    authError: null,
    loading: false
  })),
  on(credentialActions.authenticateFail, (state, action) => ({
    ...state,
    user: null,
    authError: action.payload.message,
    mode: action.payload.mode,
    loading: false
  })),
  on(credentialActions.signupStart, state => ({
    ...state,
    authError: null,
    loading: true
  })),
  on(credentialActions.logout, state => ({
    ...state,
    user: null
  }))
);

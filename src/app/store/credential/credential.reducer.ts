import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import * as credentialActions from './credential.actions';

export interface State {
  readonly user: User;
}

const INIT_STATE: State = { user: null };

export const reducer = createReducer(
  INIT_STATE,
  on(credentialActions.login, (state, action) => ({
    ...state,
    user: action.payload
  })),
  on(credentialActions.logout, state => ({
    ...state,
    user: null
  }))
);

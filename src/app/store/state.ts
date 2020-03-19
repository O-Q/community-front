import { ActionReducerMap } from '@ngrx/store';
import { fromAuth } from './auth';
import { fromSocial } from './social';
import { fromLoading } from './loading';
import { fromUser } from './user';
import { fromPost } from './post';




export interface AppState {
  auth: fromAuth.State;
  loading: fromLoading.State;
  social: fromSocial.State;
  user: fromUser.State;
  post: fromPost.State;
}

export const rootReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.reducer,
  loading: fromLoading.reducer,
  social: fromSocial.reducer,
  user: fromUser.reducer,
  post: fromPost.reducer,
};

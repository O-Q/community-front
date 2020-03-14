import { ActionReducerMap } from '@ngrx/store';
import { fromAuth } from './auth';
import { fromSocial } from './social';
import { fromLoading } from './loading';


export interface AppState {
  auth: fromAuth.State;
  loading: fromLoading.State;
  social: fromSocial.State;
}

export const rootReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.reducer,
  loading: fromLoading.reducer,
  social: fromSocial.reducer
};

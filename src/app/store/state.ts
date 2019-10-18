import { ActionReducerMap } from '@ngrx/store';
import { fromAuth, fromLoading } from './index';

export interface AppState {
  auth: fromAuth.State;
  loading: fromLoading.State;
}

export const rootReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.reducer,
  loading: fromLoading.reducer
};

import { ActionReducerMap } from '@ngrx/store';
import { fromCredential, fromLoading } from './index';

export interface AppState {
  credential: fromCredential.State;
  loading: fromLoading.State;
}

export const rootReducer: ActionReducerMap<AppState> = {
  credential: fromCredential.reducer,
  loading: fromLoading.reducer
};

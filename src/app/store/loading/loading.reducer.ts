import { createReducer, on } from '@ngrx/store';
import * as loadingActions from './loading.actions';

export interface State {
  readonly processCount: number;
  readonly isLoading: boolean;
}

const INIT_STATE: State = { processCount: 0, isLoading: false };
export const reducer = createReducer(
  INIT_STATE,
  on(loadingActions.addLoading, state => ({
    ...state,
    processCount: state.processCount + 1,
    isLoading: true
  })),
  on(loadingActions.removeLoading, state => ({
    ...state,
    processCount: state.processCount - 1,
    isLoading: state.processCount - 1 !== 0
  }))
);

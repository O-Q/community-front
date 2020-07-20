import * as fromAuth from './auth.reducer';
import { createSelector } from '@ngrx/store';
import { AppState } from '../state';
export { fromAuth };


export const selectUser = createSelector((s: AppState) => s.auth, (u) => u);
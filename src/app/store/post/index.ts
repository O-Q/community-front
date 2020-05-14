// import { createSelector } from '@ngrx/store';
// import { AppState } from '../state';

import * as fromPost from './post.reducer';
import * as PostState from './post.actions';
import { AppState } from '../state';
export { fromPost, PostState };

export const selectFocusedPost = (state: AppState) => state.post.post;

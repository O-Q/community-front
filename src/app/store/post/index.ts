// import { createSelector } from '@ngrx/store';
// import { AppState } from '../state';

import * as fromPost from './post.reducer';
import * as PostState from './post.actions';
import { AppState } from '../state';
export { fromPost, PostState };

export const selectFocusedPost = (state: AppState) => state.post.post;
export const isAuthor = (pid: string) => (state: AppState) => {
    if (state.post.posts) {
        return state.post.posts.find(p => p._id === pid)?.author === state.user.user.username;
    } else {
        return state.search.posts.find(p => p._id === pid)?.author === state.user.user.username;
    }
};

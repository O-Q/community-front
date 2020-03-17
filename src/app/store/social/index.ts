import { createSelector } from '@ngrx/store';
import { AppState } from '../state';

import * as fromSocial from './social.reducer';
import * as SocialState from './social.actions';
export { fromSocial, SocialState };

export const selectFocusedPost = (state: AppState) => state.social.focusedPost;
export const selectActionPost = createSelector(
    selectFocusedPost,
    (post) => ({
        commentCount: post?.comments.length,
        postId: post?.group
    }));

export interface IActionPost {
    commentCount: number;
    postId: string;
}
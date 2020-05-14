import { createSelector } from '@ngrx/store';
import { AppState } from '../state';

import * as fromSocial from './social.reducer';
import * as SocialState from './social.actions';
export { fromSocial, SocialState };

// export const selectActionPost = createSelector(
//     selectFocusedPost,
//     (post) => ({
//         commentCount: post?.comments.length,
//         postId: post?.so
//     }));
export const selectAdmins = (state: AppState) => state.social.social?.admins;
export const getDefaultWidgets = (state: AppState) => state.social.defaultWidgets;
export const getSocialLoading = (state: AppState) => state.social.loading;
export interface IActionPost {
    commentCount: number;
    postId: string;
}



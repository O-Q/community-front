import { createSelector } from '@ngrx/store';
import { AppState } from '../state';

import * as fromUser from './user.reducer';
import * as UserState from './user.actions';
export { fromUser, UserState };

export const selectUserSocials = (state: AppState) => state.user.socials;
// export const selectActionPost = createSelector(
//     selectFocusedPost,
//     (post) => ({
//         commentCount: post?.comments.length,
//         postId: post?.group
//     }));


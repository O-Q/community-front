import { createAction, props } from '@ngrx/store';
import { IUser } from '../../models/user.model';

export const UserInfoError = createAction('[UserInfo] User Info Error', props<{ message: string }>());

export const UserInfoGetting = createAction('[UserInfo] User Info Getting', props<{ username: string }>());
export const UserInfoGot = createAction('[UserInfo] User Info Got Successfully', props<{ user: IUser }>());

export const UserFollowing = createAction('[User] User Following', props<{ username: string }>());
export const UserFollowed = createAction('[User] User Followed');

export const UserUnFollowing = createAction('[User] User UnFollowing', props<{ username: string }>());
export const UserUnFollowed = createAction('[User] User UnFollowed');

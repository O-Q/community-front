import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const UserFetching = createAction('[User]  User Fetch Start');

export const UserFetched = createAction('[User]  User Fetched Successfully', props<User>());

export const UserSocialsFetching = createAction('[User]  User Socials Fetch Start');

// TODO: TYPE
export const UserSocialsFetched = createAction('[User]  User Socials Fetched Successfully', props<{ socials: any }>());

export const UserSocialsFetchFailed = createAction('[User]  User Socials Fetch Failed', props<{ message: string }>());

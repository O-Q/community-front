import { createAction, props } from '@ngrx/store';
import { IUser } from '@app/models/user.model';

export const UserFetching = createAction('[User]  User Fetch Start');

export const UserFetched = createAction('[User]  User Fetched Successfully', props<{ user: IUser }>());

export const UserSocialsFetched = createAction('[User]  User Socials Fetched Successfully', props<{ socials: any }>());


export const UserLogout = createAction('[User] User Logout And Removed');

export const UserEmailChanging = createAction('[User] User Email Changing', props<{ email: string, currentPassword: string }>());
export const UserEmailChanged = createAction('[User] User Email Changed', props<{ user: IUser }>());
export const UserEmailChangeFailed = createAction('[User] User Email Change Failed', props<{ message: string }>());

export const UserSocialCreated = createAction('[User] User Social Created', props<{ social: any }>());



export const UserPasswordChanging = createAction('[User] User Password Changing', props<{ password: string, currentPassword: string }>());
export const UserPasswordChanged = createAction('[User] User Password Changed');
export const UserPasswordChangeFailed = createAction('[User] User Password Change Failed', props<{ message: string }>());

export const UserAvatarChanging = createAction('[User] User Avatar Changing', props<{ file: any }>());
export const UserAvatarChanged = createAction('[User] User Avatar Changed', props<{ link: string }>());
export const UserAvatarChangeFailed = createAction('[User] User Avatar Change Failed', props<{ message: string }>());


export const UserBannerChanging = createAction('[User] User Banner Changing', props<{ file: any }>());
export const UserBannerChanged = createAction('[User] User Banner Changed', props<{ link: string }>());
export const UserBannerChangeFailed = createAction('[User] User Banner Change Failed', props<{ message: string }>());

export const UserPhotoRemoving = createAction('[User] User Photo Removing', props<{ fileType: 'banner' | 'avatar' }>());
export const UserPhotoRemoved = createAction('[User] User Photo Removed', props<{ fileType: 'banner' | 'avatar' }>());
export const UserPhotoRemoveFailed = createAction('[User] User Photo Remove Failed', props<{ message: string }>());

export const UserPrivacyUpdating = createAction('[User] User Privacy Updating', props<{ privacy: any }>());
export const UserPrivacyUpdated = createAction('[User] User Privacy Updated', props<{ privacy: any }>());

export const UserSocialNotification = createAction('[USER] Set User Social Notification', props<{ sname: string, notifications: number }>());

export const UserError = createAction('[User] User Error', props<{ message: string }>());
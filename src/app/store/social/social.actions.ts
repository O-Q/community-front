import { createAction, props } from '@ngrx/store';
import { Widget } from '@app/interfaces/widgets.interface';
import { SocialType } from '@app/models/user.model';

export const SocialFetching = createAction(
  '[Social] Social Fetch Start',
  props<SocialFetchingPayload>()
);
export const SocialFetched = createAction(
  '[Social] Social Fetched Successfully',
  props<SocialFetchedPayload>()
);

export const SocialError = createAction(
  '[Social] Social Error',
  props<{ message: string }>()
);
// export const LeavePost = createAction('[Social] Leave Post Detailed');



export const SocialCreating = createAction(
  '[Social] Social Create Start',
  props<SocialCreatingPayload>()
);

export const SocialWidgetsUpdating = createAction('[Social] Social Widgets Updating',
  props<{ sname: string, widgets: Widget[], socialType: SocialType }>());
export const SocialWidgetsUpdated = createAction('[Social] Social Widgets Updated Successfully', props<{ widgets: any }>());
// export const SocialWidgetsUpdateFailed = createAction('[Social] Social Widgets Update Failed', props<{ message: string }>());

export const SocialWidgetUpdating = createAction('[Social] Social Widget Updating',
  props<{ sname: string, widget: Widget, socialType: SocialType }>());
export const SocialWidgetUpdated = createAction('[Social] Social Widget Updated Successfully', props<{ widget: any }>());
// export const SocialWidgetUpdateFailed = createAction('[Social] Social Widget Update Failed', props<{ message: string }>());



export const SocialWidgetDefaultGetting = createAction('[Social] Social Widget Default Getting', props<{ socialType: SocialType }>());
export const SocialWidgetDefaultGot = createAction('[Social] Social Widget Default Got Successfully', props<{ widgets: Widget[] }>());
// export const SocialWidgetDefaultGetFailed = createAction('[Social] Social Widget Default Get Failed', props<{ message: string }>());

export const SocialInfoUpdating = createAction('[Social] Social Info Updating', props<SocialInfoUpdatingPayload>());
export const SocialInfoUpdated = createAction('[Social] Social Info Updated Successfully', props<SocialInfoUpdatedPayload>());
// export const SocialInfoUpdateFailed = createAction('[Social] Social Info Update Failed', props<{ message: string }>());

export const SocialImageUpdating = createAction('[Social] Social Image Updating',
  props<SocialImageUploadingPayload>());
export const SocialImageUpdated = createAction('[Social] Social Image Updated Successfully',
  props<{ link: any, imageType: 'avatar' | 'banner' }>());
// export const SocialImageUpdateFailed = createAction('[Social] Social Image Update Failed', props<{ message: string }>());

export const SocialImageDeleting = createAction('[Social] Social Image Deleting',
  props<SocialImageDeletingPayload>());
export const SocialImageDeleted = createAction('[Social] Social Image Deleted Successfully',
  props<{ imageType: 'avatar' | 'banner' }>());
// export const SocialImageDeleteFailed = createAction('[Social] Social Image Delete Failed', props<{ message: string }>());


export const SocialDeleting = createAction('[Social] Social Deleting', props<{ sid: string, socialType: SocialType }>());
export const SocialDeleted = createAction('[Social] Social Deleted Successfully');
// export const SocialDeleteFailed = createAction('[Social] Social Delete Failed', props<{ message: string }>());

export const SocialJoining = createAction('[Social] Social Joining', props<{ sid: string, socialType: SocialType }>());
export const SocialJoined = createAction('[Social] Social Joined Successfully');
// export const SocialJoinFailed = createAction('[Social] Social Join Failed', props<{ message: string }>());

export const SocialLeaving = createAction('[Social] Social Leaving', props<{ sid: string, socialType: SocialType }>());
export const SocialLeft = createAction('[Social] Social Left Successfully');
// export const SocialLeaveFailed = createAction('[Social] Social Leave Failed', props<{ message: string }>());


export const SocialUsersGetting = createAction('[Social] Social Users Getting', props<{ sname: string, socialType: SocialType }>());
export const SocialUsersGot = createAction('[Social] Social Users Got', props<{ users: any[] }>());


export const SocialUsersUpdating = createAction('[Social] Social Users Updating', props<{ sid: string, socialType: SocialType, updatedUsers: any[] }>());
export const SocialUsersUpdated = createAction('[Social] Social Users Updated');

export const SocialPermissionRolesUpdating = createAction('[Social] Social Users Permission Roles Updating',
  props<{ sid: string, socialType: SocialType, permissionRoles: any }>());

export const SocialPermissionRolesUpdated = createAction('[Social] Social Users Permission Roles Updated',
  props<{ permissionRoles: any }>());


export const SocialUserRemoving = createAction('[Social] Social User Removing', props<{ sid: string, socialType: SocialType, uid: string }>());
export const SocialUserRemoved = createAction('[Social] Social User Removed');
interface SocialCreatingPayload {
  name: string;
  title: string;
  description: string;
  subject: string;
  flairs: string[];
  socialType: SocialType;
}


interface SocialImageDeletingPayload {
  sname: string;
  imageType: 'avatar' | 'banner';
  socialType: SocialType;
}
interface SocialImageUploadingPayload extends SocialImageDeletingPayload {
  file: any;
}

interface SocialFetchingPayload {
  // TODO: type

  sname: string;
  socialType: 'FORUM' | 'BLOG';
}

export interface SocialInfoUpdatedPayload {
  description: string;
  status: string;
  aboutMe?: string;
  flairs: string[];
  isPrivate: boolean;
  title: string;
  colors: Colors;
}
export interface SocialInfoUpdatingPayload extends SocialInfoUpdatedPayload {
  sname: string;
  socialType: SocialType;
}


interface SocialFetchedPayload {
  // TODO: type
  social: any;
}

export interface Colors {
  background: string;
  text: string;
  primary: string;
  accent: string;
  title: string;
}

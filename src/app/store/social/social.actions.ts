import { createAction, props } from '@ngrx/store';

export const SocialFetching = createAction(
  '[Social] Fetch Start',
  props<SocialFetchingPayload>()
);
export const SocialFetched = createAction(
  '[Social] Fetch Successfully',
  props<SocialFetchedPayload>()
);

export const SocialFetchFailed = createAction(
  '[Social] Fetch Fail',
  props<{ message: string }>()
);

interface SocialFetchingPayload {
  // TODO: type

  id: string;
  name: string;
  socialType: 'forum' | 'blog';
}

interface SocialFetchedPayload {
  // TODO: type
  social: any;
}

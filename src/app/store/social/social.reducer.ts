import { createReducer, on } from '@ngrx/store';
import * as socialActions from './social.actions';
import { Post } from '@app/interfaces/post.interface';
import { Widget } from '@app/interfaces/widgets.interface';

export interface State {
  // TODO: type
  readonly social: any; //
  readonly fetchError: string;
  readonly loading: boolean;
  // TODO: type not completed
  readonly filterPostsQuery: { flair: string };
  readonly posts: Post[];
  readonly defaultWidgets: Widget[];
  readonly users: any[];

}

export const INIT_STATE: State = {
  social: null,
  fetchError: null,
  loading: false,
  filterPostsQuery: null,
  posts: null,
  defaultWidgets: null,
  users: null,
};

export const reducer = createReducer(
  INIT_STATE,
  on(socialActions.SocialFetching, state => ({
    ...state,
    loading: true,
    social: null,
    fetchError: null,
    filterPostsQuery: null,
    posts: null
  })),
  on(socialActions.SocialError, (state, action) => ({
    ...state,
    fetchError: action.message,
    loading: false
  })),
  on(socialActions.SocialFetched, (state, action) => ({
    ...state,
    social: action.social,
    loading: false
  })),

  on(socialActions.SocialCreating, (state) => ({
    ...state,
    loading: true,
    fetchError: null,
    social: null
  })),
  on(socialActions.SocialWidgetsUpdating, (state) => ({
    ...state,
    loading: true,
    fetchError: null,
  })),
  on(socialActions.SocialWidgetsUpdated, (state, action) => ({
    ...state,
    social: { ...state.social, widgets: action.widgets },
    loading: false,
  })),

  on(socialActions.SocialWidgetUpdating, (state) => ({
    ...state,
    loading: true,
    fetchError: null,
  })),
  on(socialActions.SocialWidgetUpdated, (state, action) => {
    const wIndex = state.social.widgets.findIndex(w => w.name === action.widget.name);
    const widgets = state.social.widgets.slice();
    widgets[wIndex] = action.widget;
    return {
      ...state,
      social: { ...state.social, widgets },
      loading: false,
    };
  }),

  on(socialActions.SocialWidgetDefaultGetting, (state) => ({
    ...state,
    loading: true,
    defaultWidgets: null,
    fetchError: null,
  })),
  on(socialActions.SocialWidgetDefaultGot, (state, action) => ({
    ...state,
    loading: false,
    defaultWidgets: action.widgets
  })),

  on(socialActions.SocialInfoUpdating, (state) => ({
    ...state,
    loading: true,
    fetchError: null,
  })),
  on(socialActions.SocialInfoUpdated, (state, action) => {
    const { description, status, flairs, isPrivate, title, colors } = action;
    return {
      ...state,
      loading: false,
      social: { ...state.social, description, status, flairs, isPrivate, title, colors }
    };
  }),

  on(socialActions.SocialDeleting, (state) => ({
    ...state,
    loading: true,
    fetchError: null,
  })),
  on(socialActions.SocialDeleted, (state) => {
    return {
      ...state,
      loading: false,
      social: null,
      users: null,
      posts: null,
    };
  }),

  on(socialActions.SocialImageUpdating, (state) => ({
    ...state,
    loading: true,
    fetchError: null,
  })),
  on(socialActions.SocialImageUpdated, (state, action) => {
    if (action.imageType === 'avatar') {
      return {
        ...state,
        loading: false,
        social: { ...state.social, avatar: action.link },
      };
    } else { // banner
      return {
        ...state,
        loading: false,
        social: { ...state.social, banner: action.link },
      };
    }

  }),

  on(socialActions.SocialImageDeleting, (state) => ({
    ...state,
    loading: true,
    fetchError: null,
  })),
  on(socialActions.SocialImageDeleted, (state, action) => {
    if (action.imageType === 'avatar') {
      return {
        ...state,
        loading: false,
        social: { ...state.social, avatar: null },
      };
    } else { // banner
      return {
        ...state,
        loading: false,
        social: { ...state.social, banner: null },
      };
    }
  }),

  on(socialActions.SocialJoining, (state) => ({
    ...state,
    loading: true,
    fetchError: null,
  })),
  on(socialActions.SocialJoined, (state) => {
    return {
      ...state,
      loading: false,
      social: { ...state.social, isUserRegistered: true }
    };
  }),

  on(socialActions.SocialLeaving, (state) => ({
    ...state,
    loading: true,
    fetchError: null,
    social: { ...state.social, isUserRegistered: false }
  })),
  on(socialActions.SocialLeft, (state) => {
    return {
      ...state,
      loading: false,
    };
  }), on(socialActions.SocialUsersGetting, (state) => ({
    ...state,
    users: null,
    loading: true
  })), on(socialActions.SocialUsersGot, (state, action) => ({
    ...state,
    loading: false,
    users: action.users
  })), on(socialActions.SocialUsersUpdating, (state) => ({
    ...state,
    loading: true
  })), on(socialActions.SocialUsersUpdated, (state, action) => ({
    ...state,
    loading: false,
  })), on(socialActions.SocialUserRemoving, (state) => ({
    ...state,
    loading: true
  })), on(socialActions.SocialUserRemoved, (state) => ({
    ...state,
    loading: false,
  }))
);

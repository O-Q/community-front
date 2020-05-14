import { createReducer, on } from '@ngrx/store';

import * as userActions from './user.actions';
import { IUser } from '../../models/user.model';

export interface State {
    // TODO: type
    readonly user: IUser;
    readonly fetchError: string;
    readonly loading: boolean;
}

const INIT_STATE: State = {
    user: null,
    fetchError: null,
    loading: false,
};

export const reducer = createReducer(
    INIT_STATE,
    on(userActions.UserFetching, state => ({
        ...state,
        loading: true,
        socials: null,
        fetchError: null,
    })),
    on(userActions.UserFetched, (state, action) => ({
        ...state,
        loading: false,
        user: action.user
    })),
    on(userActions.UserSocialCreated, (state, action) => ({
        ...state,
        loading: false,
        user: { ...state.user, socials: [...state.user.socials, action.social] }
    })),
    on(userActions.UserSocialsFetched, (state, action) => ({
        ...state,
        user: { ...state.user, socials: action.socials }
    })),
    on(userActions.UserLogout, state => ({
        ...state,
        user: null
    })),
    on(userActions.UserEmailChanging, state => ({
        ...state,
        loading: true,
        fetchError: null
    })),
    on(userActions.UserEmailChanged, (state, action) => ({
        ...state,
        loading: false,
        user: action.user
    })),
    on(userActions.UserEmailChangeFailed, (state, action) => ({
        ...state,
        loading: false,
        fetchError: action.message
    })),
    on(userActions.UserPasswordChanging, state => ({
        ...state,
        loading: true,
        fetchError: null
    })),
    on(userActions.UserPasswordChanged, state => ({
        ...state,
        loading: false,
    })),
    on(userActions.UserPasswordChangeFailed, (state, action) => ({
        ...state,
        loading: false,
        fetchError: action.message
    })),
    on(userActions.UserAvatarChanging, state => ({
        ...state,
        loading: true,
        fetchError: null
    })),
    on(userActions.UserAvatarChanged, (state, action) => ({
        ...state,
        loading: false,
        user: { ...state.user, avatar: action.link }
    })),
    on(userActions.UserAvatarChangeFailed, (state, action) => ({
        ...state,
        loading: false,
        fetchError: action.message
    })),
    on(userActions.UserBannerChanging, state => ({
        ...state,
        loading: true,
        fetchError: null
    })),
    on(userActions.UserBannerChanged, (state, action) => ({
        ...state,
        loading: false,
        user: { ...state.user, banner: action.link }
    })),
    on(userActions.UserBannerChangeFailed, (state, action) => ({
        ...state,
        loading: false,
        fetchError: action.message
    })),
    on(userActions.UserPhotoRemoving, state => ({
        ...state,
        loading: true,
        fetchError: null
    })),
    on(userActions.UserPhotoRemoved, (state, action) => (
        action.fileType === 'banner' ?
            {
                ...state,
                loading: false,
                user: { ...state.user, banner: null }
            } : {
                ...state,
                loading: false,
                user: { ...state.user, avatar: null }
            })),
    on(userActions.UserPhotoRemoveFailed, (state, action) => ({
        ...state,
        loading: false,
        fetchError: action.message
    })),
    on(userActions.UserPrivacyUpdating, state => ({
        ...state,
        loading: true,
        fetchError: null
    })),
    on(userActions.UserPrivacyUpdated, (state, action) => ({
        ...state,
        loading: false,
        user: { ...state.user, privacy: action.privacy }
    })), on(userActions.UserSocialNotification, (state, action) => ({
        ...state,
        user: {
            ...state.user,
            socials: state.user?.socials
                .map(s => (
                    s.social.name === action.sname ?
                        { ...s, notifications: action.notifications } : s
                ))
        }
    })),


);

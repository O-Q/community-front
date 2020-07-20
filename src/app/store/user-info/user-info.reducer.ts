import { IUser } from '@app/models/user.model';
import { createReducer, on } from '@ngrx/store';
import * as UserInfoActions from './user-info.actions';
export interface State {
    user: IUser;
    loading: boolean;
    fetchError: string;
}


const INIT_STATE = {
    user: null,
    loading: false,
    fetchError: null
};

export const reducer = createReducer(INIT_STATE, on(UserInfoActions.UserInfoGetting, state => ({
    ...state,
    loading: true,
    user: null,
    fetchError: null
})), on(UserInfoActions.UserInfoError, (state, action) => ({
    ...state,
    loading: false,
    fetchError: action.message
})),
    on(UserInfoActions.UserInfoGot, (state, action) => ({
        ...state,
        user: action.user,
        loading: false,
    })),

    on(UserInfoActions.UserFollowing, state => ({
        ...state,
        loading: true,
        fetchError: null,
    })),
    on(UserInfoActions.UserFollowed, (state, action) => ({
        ...state,
        loading: false,
        user: { ...state.user, isFollowing: true }

    })),

    on(UserInfoActions.UserUnFollowing, state => ({
        ...state,
        loading: true,
        fetchError: null
    })),
    on(UserInfoActions.UserUnFollowed, (state, action) => ({
        ...state,
        loading: false,
        user: { ...state.user, isFollowing: false }

    })),
);
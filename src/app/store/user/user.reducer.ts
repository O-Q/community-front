import { createReducer, on } from '@ngrx/store';

import * as userActions from './user.actions';
import { User } from '../../../../server/dist/user/interfaces/user.interface';

export interface State {
    // TODO: type
    readonly socials: any; //
    readonly user: User;
    readonly fetchError: string;
    readonly loading: boolean;
}

const INIT_STATE: State = {
    socials: null,
    user: null,
    fetchError: null,
    loading: false,
};

export const reducer = createReducer(
    INIT_STATE,
    on(userActions.UserSocialsFetching, state => ({
        ...state,
        loading: true,
        socials: null,
        fetchError: null,
    })),
    on(userActions.UserSocialsFetched, (state, action) => ({
        ...state,
        loading: false,
        socials: action.socials,
    })),
    on(userActions.UserSocialsFetchFailed, (state, action) => ({
        ...state,
        loading: false,
        fetchError: action.message
    })));

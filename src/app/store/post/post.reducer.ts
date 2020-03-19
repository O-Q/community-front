import { createReducer, on } from '@ngrx/store';
import * as postActions from './post.actions';
export interface State {
    readonly post: any;
    readonly fetchError: string;
    readonly loading: boolean;
}

const INIT_STATE: State = {
    post: null,
    fetchError: null,
    loading: false,
};

export const reducer = createReducer(
    INIT_STATE,
    on(postActions.PostPublishing, (state, action) => ({
        ...state,
        post: action.post,
        fetchError: null,
        loading: true,
    })),
    on(postActions.PostPublished, (state) => ({
        ...state,
        loading: false
    })),
    on(postActions.PostPublishFailed, (state, action) => ({
        ...state,
        loading: false,
        fetchError: action.message
    }))
);

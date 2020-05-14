import { createReducer, on } from '@ngrx/store';
import * as postActions from './post.actions';
import { Post } from '../../interfaces/post.interface';
export interface State {
    readonly post: Post;
    readonly posts: Post[];
    readonly fetchError: string;
    readonly loading: boolean;
}

const INIT_STATE: State = {
    post: null,
    posts: null,
    fetchError: null,
    loading: false,
};

export const reducer = createReducer(
    INIT_STATE,
    on(postActions.PostsFetching, (state, action) => ({
        ...state,
        filterPostsQuery: action.query,
        loading: true
    })),
    on(postActions.PostsFetched, (state, action) => ({
        ...state,
        posts: action.posts,
        loading: false,
    })),
    on(postActions.PostsFetchFailed, (state, action) => ({
        ...state,
        loading: false,
        fetchError: action.message
    })),
    on(postActions.PostPublishing, (state) => ({
        ...state,
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
    })),
    on(postActions.PostReplyPublishing, (state, action) => ({
        ...state,
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
    })), on(postActions.PostDeleting, (state) => ({
        ...state,
        loading: true
    })),
    on(postActions.PostDeleted, (state) => ({
        ...state,
        loading: false
    })), on(postActions.PostDeleteFailed, (state, action) => ({
        ...state,
        loading: false,
        fetchError: action.message
    })), on(postActions.PostDetailedFetching, (state) => ({
        ...state,
        post: null,
        loading: true
    })),
    on(postActions.PostDetailedFetched, (state, action) => ({
        ...state,
        post: action.post,
        loading: false
    })),
    on(postActions.PostDetailedFetchFailed, (state, action) => ({
        ...state,
        fetchError: action.message,
        loading: false
    })), on(postActions.PostUpdating, (state) => ({
        ...state,
        loading: true
    })),
    on(postActions.PostDetailedFetched, (state, action) => ({
        ...state,
        post: action.post,
        loading: false
    })),
    on(postActions.PostDetailedFetchFailed, (state, action) => ({
        ...state,
        fetchError: action.message,
        loading: false
    })), on(postActions.PostsUserFetching, (state) => ({
        ...state,
        loading: true,
        posts: null
    })),
    on(postActions.PostsUserFetched, (state, action) => ({
        ...state,
        posts: action.posts,
        loading: false
    })),
    on(postActions.PostsUserFetchFailed, (state, action) => ({
        ...state,
        fetchError: action.message,
        loading: false
    })), on(postActions.PostExpressing, (state, action) => {
        let liked = null;
        if (action.reaction === 'LIKE' && action.post.liked !== true) {
            liked = true;
        } else if (action.reaction === 'DISLIKE' && action.post.liked !== false) {
            liked = false;
        }
        return {
            ...state,
            posts: state.posts.map(p => p._id === action.pid ? { ...p, liked } : p),
            post: { ...state.post, liked }
        };
    }),
    on(postActions.PostExpressed, (state, action) => ({
        ...state,
        posts: state.posts.map(p => p._id === action.pid ? { ...p, reaction: action.reaction } : p),
        post: { ...state.post, reaction: action.reaction }
    })),
    on(postActions.PostExpressFailed, (state, action) => ({
        ...state,
        fetchError: action.message,
    }))

);

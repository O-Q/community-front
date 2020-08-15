import { createReducer, on } from '@ngrx/store';
import * as postActions from './post.actions';
import { Post } from '@app/interfaces/post.interface';
export interface State {
    readonly post: Post;
    readonly posts: Post[];
    readonly length: number;
    readonly fetchError: string;
    readonly loading: boolean;
}

const INIT_STATE: State = {
    post: null,
    posts: null,
    fetchError: null,
    length: null,
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
        length: action.length,
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
    on(postActions.PostPublished, (state, action) => {
        const comment = action.comment;
        const post = state.post;
        return {
            ...state,
            post: { ...post, comments: post?.comments ? [...post.comments, comment] : [comment], comment: post?.comment + 1 || 0 },
            loading: false
        };
    }),
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
        if (action.isComment) {
            return {
                ...state,
                posts: state.posts?.map(p => p._id === action.pid ? { ...action.post } : p),
                post: { ...state.post, comments: state.post.comments.map(p => p._id === action.pid ? { ...action.post } : p) }
            };
        } else {
            return {
                ...state,
                posts: state.posts?.map(p => p._id === action.pid ? { ...action.post } : p),
                post: { ...action.post }
            }
        };
    }),
    on(postActions.PostExpressed, (state, action) => {

        if (action.isComment) {
            return {
                ...state,
                posts: state.posts?.map(p => p._id === action.pid ? { ...p, reaction: action.reaction } : p),
                post: { ...state?.post, comments: state.post?.comments.map(p => p._id === action.pid ? { ...p, reaction: action.reaction } : p) }
            };
        } else {
            return {
                ...state,
                posts: state.posts?.map(p => p._id === action.pid ? { ...p, reaction: action.reaction } : p),
                post: { ...state.post, reaction: action.reaction }
            };
        }
    }),
    on(postActions.PostExpressFailed, (state, action) => ({
        ...state,
        fetchError: action.message,
    }))

);

import { createReducer, on } from '@ngrx/store';
import * as SearchAction from './search.actions';
import { Post } from '../../interfaces/post.interface';
import { act } from '@ngrx/effects';

export interface State {
  loadingPost: boolean;
  loadingSocial: boolean;
  loadingSearch: boolean;
  results: any;
  posts: Post[];
  blogs: any[];
  forums: any[];
  postLength: number;
  text: string;
  fetchError: string;
}

export const initialState: State = {
  loadingPost: false,
  loadingSocial: false,
  loadingSearch: false,
  results: null,
  posts: null,
  blogs: null,
  postLength: null,
  forums: null,
  text: null,
  fetchError: null
};


export const reducer = createReducer(
  initialState, on(SearchAction.SearchFetching, (state, action) => ({
    ...state,
    loadingSearch: true,
    text: action.text,
    fetchError: null
  })), on(SearchAction.SearchFetched, (state, action) => ({
    ...state,
    loadingSearch: false,
    results: action.data
  })), on(SearchAction.SearchError, (state, action) => ({
    ...state,
    loadingSearch: false,
    fetchError: action.message
  })), on(SearchAction.HomepagePostFetching, state => ({
    ...state,
    loadingPost: true,
    fetchError: null
  })), on(SearchAction.HomepagePostFetched, (state, action) => ({
    ...state,
    loadingPost: false,
    posts: action.posts,
    postLength: action.length
  })), on(SearchAction.HomepageSocialFetching, state => ({
    ...state,
    loadingSocial: true,
    fetchError: null
  })), on(SearchAction.HomepageSocialFetched, (state, action) => ({
    ...state,
    loadingPost: false,
    blogs: action.data.blogs,
    forums: action.data.forums,
    fetchError: null
  })), on(SearchAction.HomepagePostExpressing, (state, action) => ({
    ...state,
    posts: state.posts.map(p => p._id === action.post._id ? action.post : p)
  }))

);


import { createFeatureSelector, createSelector } from '@ngrx/store';
import { routerStateConfig } from './router-store.module';
import { MergedRouteReducerState } from './merged-route-serializer';

export const getRouterReducerState = createFeatureSelector<MergedRouteReducerState>(routerStateConfig.stateKey);
let prevUrl = '';
export const getMergedRoute = createSelector(getRouterReducerState, (routerReducerState) => {
    const temp = prevUrl;
    if (routerReducerState.state.url !== prevUrl) {
        prevUrl = routerReducerState.state.url;
    }
    return { ...routerReducerState.state, prevUrl: temp };
});

export const getPrevUrl = createSelector(getMergedRoute, (routerReducerState) => {
    return routerReducerState.prevUrl;
});
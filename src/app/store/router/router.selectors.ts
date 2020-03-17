import { createFeatureSelector, createSelector } from '@ngrx/store';
import { routerStateConfig } from './router-store.module';
import { MergedRouteReducerState } from './merged-route-serializer';

export const getRouterReducerState = createFeatureSelector<MergedRouteReducerState>(routerStateConfig.stateKey);
export const getMergedRoute = createSelector(getRouterReducerState, (routerReducerState) => routerReducerState.state);

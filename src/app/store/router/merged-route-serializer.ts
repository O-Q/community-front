import { RouterStateSerializer } from '@ngrx/router-store';
import { ActivatedRouteSnapshot, Data, Params, RouterStateSnapshot } from '@angular/router';
import { RouterReducerState } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { getMergedRoute } from './router.selectors';
import { first } from 'rxjs/operators';
export interface State {
    readonly url: string;
    readonly queryParams: Params;
    readonly params: Params;
    readonly data: Data;
}
export type MergedRouteReducerState = RouterReducerState<State>;

export class MergedRouterStateSerializer implements RouterStateSerializer<State> {
    serialize(routerState: RouterStateSnapshot): State {
        return {
            url: routerState.url,
            params: mergeRouteParams(routerState.root, r => r.params),
            queryParams: mergeRouteParams(routerState.root, r => r.queryParams),
            data: mergeRouteData(routerState.root)
        };
    }
}

function mergeRouteParams(route: ActivatedRouteSnapshot, getter: (r: ActivatedRouteSnapshot) => Params): Params {
    if (!route) {
        return {};
    }
    const currentParams = getter(route);
    const primaryChild = route.children.find(c => c.outlet === 'primary') || route.firstChild;
    return { ...currentParams, ...mergeRouteParams(primaryChild, getter) };
}

function mergeRouteData(route: ActivatedRouteSnapshot): Data {
    if (!route) {
        return {};
    }

    const currentData = route.data;
    const primaryChild = route.children.find(c => c.outlet === 'primary') || route.firstChild;
    return { ...currentData, ...mergeRouteData(primaryChild) };
}

import { NgModule, Optional, Self } from '@angular/core';
import { Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { routerReducer, RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { MergedRouterStateSerializer } from './merged-route-serializer';

export const routerStateConfig = {
    stateKey: 'router', // state-slice name for routing state
};

@NgModule({
    imports: [
        StoreModule.forFeature(routerStateConfig.stateKey, routerReducer),
        StoreRouterConnectingModule.forRoot(routerStateConfig),
    ],
    exports: [
        StoreModule,
        StoreRouterConnectingModule
    ],
    providers: [
        {
            provide: RouterStateSerializer,
            useClass: MergedRouterStateSerializer,
        }
    ]
})
export class RouterStoreModule {

    constructor(@Self() @Optional() router: Router) {
        // if (router) {
        //     console.log('All good, RouterStoreModule');
        // } else {
        //     console.error('RouterStoreModule must be imported in the same level as RouterModule');
        // }
    }
}
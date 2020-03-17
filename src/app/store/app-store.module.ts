import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { rootReducer } from './state';
import { AuthEffects } from './auth/auth.effects';
import { SocialEffects } from './social/social.effects';
import { RouterStoreModule } from './router/router-store.module';


@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(rootReducer),
    EffectsModule.forRoot([AuthEffects, SocialEffects]),
    RouterStoreModule
  ]
})
export class AppStoreModule { }

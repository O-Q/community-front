import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { rootReducer } from './state';
import { AuthEffects } from './auth/auth.effects';
import { SocialEffects } from './social/social.effects';
import { UserEffects } from './user/user.effects';
import { PostEffects } from './post/post.effects';


import { RouterStoreModule } from './router/router-store.module';
import { UserInfoEffects } from './user-info/user-info.effects';


@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(rootReducer),
    EffectsModule.forRoot([AuthEffects, SocialEffects, UserEffects, PostEffects, UserInfoEffects]),
    RouterStoreModule
  ]
})
export class AppStoreModule { }

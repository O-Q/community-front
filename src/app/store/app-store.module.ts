import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { rootReducer } from './state';
import { AuthEffects } from './auth/auth.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(rootReducer),
    EffectsModule.forRoot([AuthEffects])
  ]
})
export class AppStoreModule {}

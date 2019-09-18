import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from './state';

@NgModule({
  imports: [CommonModule, StoreModule.forRoot(rootReducer)]
})
export class AppStoreModule {}

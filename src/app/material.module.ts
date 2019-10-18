import { NgModule } from '@angular/core';
import {
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatDividerModule,
  MatProgressSpinnerModule
} from '@angular/material';

const modules = [
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatDividerModule,
  MatProgressSpinnerModule
];
@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialBaseModule {}

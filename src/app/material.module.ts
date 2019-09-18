import { NgModule } from '@angular/core';
import {
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatMenuModule,
  MatListModule,
  MatDividerModule
} from '@angular/material';

const modules = [
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatDividerModule
];
@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialBaseModule {}

import { NgModule } from '@angular/core';
import {
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatDividerModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBarConfig
} from '@angular/material';

const modules = [
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatDividerModule,
  MatProgressSpinnerModule,
  MatSnackBarModule
];
@NgModule({
  imports: modules,
  exports: modules,
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 3000,
        direction: 'rtl',
        horizontalPosition: 'center'
      } as MatSnackBarConfig
    }
  ]
})
export class MaterialBaseModule {}

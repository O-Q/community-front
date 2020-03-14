import { NgModule } from '@angular/core';
import {
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBarConfig,
  MatSlideToggleModule,
  MatMenuModule,
  MatListModule,
  MatDialogModule,
  MatInputModule,
  MatSidenavModule
} from '@angular/material';

const modules = [
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatSlideToggleModule,
  MatMenuModule,
  MatListModule,
  MatDialogModule,
  MatInputModule,
  MatSidenavModule,
];

/**
 * It'll needed in core module. so feel free to use it
 */
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
export class MaterialBaseModule { }

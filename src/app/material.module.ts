import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig } from '@angular/material/snack-bar';
import { PersianDatePipe } from './pipes/persian-date.pipe';

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
  declarations: [
    PersianDatePipe
  ],
  imports: modules,
  exports: [...modules, PersianDatePipe],
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

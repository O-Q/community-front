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
import { ButtonContentComponent } from './components/shared/button-content/button-content.component';
import { CommonModule } from '@angular/common';
import { getPersianPaginatorIntl } from './components/intl/persian-paginator';
import { MatPaginatorIntl } from '@angular/material/paginator';

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
    PersianDatePipe,
    ButtonContentComponent,
  ],
  imports: [CommonModule, ...modules],
  exports: [...modules, PersianDatePipe, ButtonContentComponent],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 3000,
        direction: 'rtl',
        horizontalPosition: 'center'
      } as MatSnackBarConfig
    },
    { provide: MatPaginatorIntl, useValue: getPersianPaginatorIntl() }
  ]
})
export class MaterialBaseModule { }

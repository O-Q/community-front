import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MaterialBaseModule } from '../../material.module';
import { SuccessComponent } from './success/success.component';

@NgModule({
  declarations: [ConfirmDialogComponent, SuccessComponent],
  imports: [CommonModule, MatDialogModule, MaterialBaseModule],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { minWidth: '250px' } }
  ]
})
export class AppCommonModule { }

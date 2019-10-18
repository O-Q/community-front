import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material';
import { MaterialBaseModule } from '../../material.module';
import { SuccessComponent } from './success/success.component';

@NgModule({
  declarations: [ConfirmDialogComponent, SuccessComponent],
  imports: [CommonModule, MatDialogModule, MaterialBaseModule],
  entryComponents: [ConfirmDialogComponent]
})
export class AppCommonModule {}

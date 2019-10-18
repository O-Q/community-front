import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { phoneControl } from '../../../utils/form.util';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordComponent {
  form: FormGroup;
  test = [];
  constructor(private dialog: MatDialog) {
    this.form = new FormGroup({
      phone: phoneControl()
    });
  }
  onConfirm() {
    if (this.form.valid) {
      // subscription will close automatically
      this.dialog
        .open(ConfirmDialogComponent, {
          data: `آیا از ارسال پیام به شماره‌ی ${this.form.value.phone} اطمینان دارید؟`,
          minWidth: '250px'
        })
        .afterClosed()
        .subscribe(this._sendMessage);
    }
  }
  private _sendMessage(confirm: boolean) {
    console.log('confirm:', confirm);
    // TODO: send request to server. then navigate to success message
    // Taught: not good maybe. it needs confirmation somehow
    // whether the user is owner of the phone. it will change password and annoys people.
  }
}

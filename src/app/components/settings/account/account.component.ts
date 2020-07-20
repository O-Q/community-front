import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@store/state';
import { MatDialog } from '@angular/material/dialog';
import { ChangeDialogComponent, IChangeDialogData } from './change-dialog/change-dialog.component';
import { passwordControl, passwordMatchValidator } from '@app/utils/form.util';
import * as UserActions from '@store/user/user.actions';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  user$ = this.store.select('user');
  constructor(private store: Store<AppState>, private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  onChangeEmail(currentEmail: string) {
    const data: IChangeDialogData = {
      title: 'تغییر ایمیل',
      viewValue: 'ایمیل',
      value: currentEmail,
      needConfirm: false,
      type: 'email',
    };
    this.dialog.open(ChangeDialogComponent, { data }).afterClosed().subscribe(r => {
      const email = r[data.viewValue];
      const currentPassword = r.currentPassword;
      this.store.dispatch(UserActions.UserEmailChanging({ email, currentPassword }));
    });
  }
  onChangePassword() {
    const data: IChangeDialogData = {
      title: 'تغییر گذرواژه',
      viewValue: 'گذرواژه جدید',
      formControl: passwordControl(),
      needConfirm: true,
      type: 'password',
      validator: passwordMatchValidator('گذرواژه جدید')
    };
    this.dialog.open(ChangeDialogComponent, {
      data
    }).afterClosed().subscribe(r => {
      const password = r[data.viewValue];
      const currentPassword = r.currentPassword;
      this.store.dispatch(UserActions.UserPasswordChanging({ password, currentPassword }));
    });
  }
}

import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { passwordControl } from 'src/app/utils/form.util';
import { Store } from '@ngrx/store';
import * as fromApp from '@store/state';
import * as AuthActions from '@store/auth/auth.actions';
import * as fromAuth from '@store/auth/auth.reducer';

import { Subscription, Observable } from 'rxjs';
import { MatInput } from '@angular/material/input';
import { selectUser } from '../../../store/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('username') nameInput: MatInput;
  passwordFieldType: 'password' | 'text';
  visibilityIcon: 'visibility' | 'visibility_off';
  form: FormGroup;
  auth$: Observable<fromAuth.State>;
  authSubscription: Subscription;
  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<LoginComponent>,
    private store: Store<fromApp.AppState>,
    private change: ChangeDetectorRef
  ) {
    this.passwordFieldType = 'password';
    this.visibilityIcon = 'visibility_off';
  }
  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: passwordControl()
    });
    this.auth$ = this.store.select(selectUser);
    this.authSubscription = this.auth$.subscribe(state => {
      if (state.user) {
        this.onClose();
      }
    });
  }
  ngAfterViewInit() {
    this.nameInput.focus();
    this.change.detectChanges();
  }
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  onVisibilityClick() {
    if (this.passwordFieldType === 'password') {
      this.passwordFieldType = 'text';
      this.visibilityIcon = 'visibility';
    } else {
      this.passwordFieldType = 'password';
      this.visibilityIcon = 'visibility_off';
    }
  }
  login() {
    console.log(this.form.valid);

    if (this.form.valid) {
      const { username, password } = this.form.value;
      this.store.dispatch(AuthActions.loginStart({ username, password }));
      // todo
    }
  }

  navigateRegister() {
    this.dialogRef.close();
    this.router.navigate(['auth', 'register']);
  }
  navigateForgotPassword() {
    this.dialogRef.close();
    this.router.navigate(['auth', 'forgot-password']);
  }
  onClose() {
    this.dialogRef.close();
  }
}

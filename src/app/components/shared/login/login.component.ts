import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { passwordControl } from 'src/app/utils/form.util';
import { Store } from '@ngrx/store';
import * as fromApp from './../../../store/state';
import * as AuthActions from './../../../store/auth/auth.actions';
import * as fromAuth from './../../../store/auth/auth.reducer';

import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  passwordFieldType: 'password' | 'text';
  visibilityIcon: 'visibility' | 'visibility_off';
  form: FormGroup;
  auth$: Observable<fromAuth.State>;
  authSubscription: Subscription;
  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<LoginComponent>,
    private store: Store<fromApp.AppState>
  ) {
    this.passwordFieldType = 'password';
    this.visibilityIcon = 'visibility_off';
  }
  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: passwordControl()
    });
    this.auth$ = this.store.select('auth');
    this.authSubscription = this.auth$.subscribe(state => {
      if (state.user) {
        this.dialogRef.close();
      }
    });
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
}

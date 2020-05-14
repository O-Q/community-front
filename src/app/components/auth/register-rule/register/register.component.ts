import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import {
  passwordControl,
  passwordMatchValidator,
  requiredError,
  MyErrorStateMatcher
} from 'src/app/utils/form.util';
import * as AuthActions from './../../../../store/auth/auth.actions';
import * as fromApp from './../../../../store/state';
import * as fromAuth from './../../../../store/auth/auth.reducer';

import { Observable } from 'rxjs';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {
  @Output() checkboxChange = new EventEmitter<boolean>();
  required = requiredError;
  passwordFieldType: 'password' | 'text';
  visibilityIcon: 'visibility' | 'visibility_off';
  form: FormGroup;
  auth$: Observable<fromAuth.State>;
  matcher = new MyErrorStateMatcher();

  constructor(private store: Store<fromApp.AppState>) {
    this.passwordFieldType = 'password';
    this.visibilityIcon = 'visibility_off';
    this.form = new FormGroup(
      {
        username: new FormControl('', [
          Validators.required,
          Validators.minLength(3)
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: passwordControl(),
        passwordConfirm: passwordControl(),
        acceptRules: new FormControl('', [Validators.requiredTrue])
      },
      { validators: passwordMatchValidator('password') }
    );
  }
  ngOnInit() {
    this.auth$ = this.store.select('auth');
  }
  register() {
    if (this.form.valid) {
      const { username, email, password } = this.form.value;
      this.store.dispatch(
        AuthActions.signupStart({ username, password, email })
      );
    } else {
      console.log(this.form.errors);
    }
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

  onCheckbox() {
    const acceptRules = this.form.get('acceptRules');
    this.checkboxChange.emit(acceptRules.value);
  }
}

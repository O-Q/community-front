import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { passwordControl } from 'src/app/utils/form.util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  passwordFieldType: 'password' | 'text';
  visibilityIcon: 'visibility' | 'visibility_off';
  form: FormGroup;
  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<LoginComponent>
  ) {
    this.passwordFieldType = 'password';
    this.visibilityIcon = 'visibility_off';
  }
  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: passwordControl()
    });
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
      console.log(this.form);
    }
  }

  navigateRegister() {
    this.dialogRef.close();
    this.router.navigate(['auth', 'register']);
  }
}

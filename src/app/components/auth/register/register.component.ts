import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  passwordControl,
  passwordMatchValidator
} from 'src/app/utils/form.util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Input() rulesRef;

  passwordFieldType: 'password' | 'text';
  visibilityIcon: 'visibility' | 'visibility_off';
  form: FormGroup;
  constructor() {
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
        acceptRules: new FormControl({ value: false, disabled: true }, [
          Validators.requiredTrue
        ])
      },
      passwordMatchValidator
    );
  }
  ngOnInit() {}
  register() {
    console.log(this.form);
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

  /**
   * enable checkbox and expand rules
   */
  onCheckbox() {
    const acceptRules = this.form.get('acceptRules');
    const cl: DOMTokenList = this.rulesRef.classList;
    cl.toggle('collapsed');
    cl.toggle('expanded');
    if (acceptRules.disabled) {
      setTimeout(() => acceptRules.enable(), 1);
    }
  }
}

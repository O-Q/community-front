import {
  FormControl,
  Validators,
  ValidatorFn,
  FormGroup,
  ValidationErrors
} from '@angular/forms';

/**
 * create `FormControl` for password which is `required` and `min length 6` and must contain `word` and `number`.
 */
export function passwordControl(): FormControl {
  return new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/)
  ]);
}
export function phoneControl(initialValue = ''): FormControl {
  return new FormControl(initialValue, [
    Validators.required,
    Validators.pattern(/^(([0]?)([0-9]{10}))$/)
  ]);
}

export const passwordMatchValidator: ValidatorFn = (
  control: FormGroup
): ValidationErrors | null => {
  const password = control.get('password');
  const passwordConfirm = control.get('passwordConfirm');

  return password && passwordConfirm && password.value === passwordConfirm.value
    ? null
    : { passwordMismatch: true };
};

export function requiredError(fieldName: string) {
  return `وارد کردن "${fieldName}" الزامی است`;
}

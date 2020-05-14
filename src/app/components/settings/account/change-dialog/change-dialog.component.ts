import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { passwordControl, passwordMatchValidator } from '../../../../utils/form.util';

@Component({
  selector: 'app-change-dialog',
  templateUrl: './change-dialog.component.html',
  styleUrls: ['./change-dialog.component.scss']
})
export class ChangeDialogComponent implements OnInit {
  form: FormGroup;
  defaultFormControl = new FormControl(this.data.value || '', [Validators.required]);
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: IChangeDialogData,
    private dialogRef: MatDialogRef<ChangeDialogComponent>,

  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      [this.data.viewValue]: this.data.formControl || this.defaultFormControl,
      currentPassword: passwordControl(),
    });
    if (!!this.data.needConfirm) {
      this.form.addControl(`${this.data.viewValue}Confirm`, this.data.formControl || this.defaultFormControl);
      if (this.data.validator) {
        this.form.setValidators(this.data.validator);
      }
    }
  }
  onChange() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.dialogRef.close(this.form.value);
    }
  }
  onClose() {
    this.dialogRef.close();
  }

}

export interface IChangeDialogData {
  title: string;
  value?: string;
  viewValue: string;
  needConfirm: boolean;
  formControl?: FormControl;
  type?: string;
  validator?: ValidatorFn | ValidatorFn[];
}

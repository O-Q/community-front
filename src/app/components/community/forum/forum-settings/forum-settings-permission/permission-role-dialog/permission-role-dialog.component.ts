import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { SocialType } from '../../../../../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../../store/state';
import * as SocialActions from '@store/social/social.actions';

@Component({
  selector: 'app-permission-role-dialog',
  templateUrl: './permission-role-dialog.component.html',
  styleUrls: ['./permission-role-dialog.component.scss']
})
export class PermissionRoleDialogComponent implements OnInit {
  form: FormGroup;
  constructor(
    private store: Store<AppState>,
    private dialogRef: MatDialogRef<PermissionRoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { permissions, socialType: SocialType, sid: string },
  ) { }

  ngOnInit(): void {
    const p = this.data.permissions;
    this.form = new FormGroup({
      newPost: new FormControl(p.newPost),
      comment: new FormControl(p.comment),
      changeAvatar: new FormControl(p.changeAvatar),
      changeBanner: new FormControl(p.changeBanner),
      changeInfo: new FormControl(p.changeInfo),
      changeWidgets: new FormControl(p.changeWidgets),
      changeUsers: new FormControl(p.changeUsers),
    });
  }

  onClose() {
    this.dialogRef.close();
  }
  onSave() {
    if (this.form.valid) {
      this.store.dispatch(SocialActions
        .SocialPermissionRolesUpdating(
          { permissionRoles: this.form.value, sid: this.data.sid, socialType: this.data.socialType }
        ));
      this.dialogRef.close();
    }
  }
}

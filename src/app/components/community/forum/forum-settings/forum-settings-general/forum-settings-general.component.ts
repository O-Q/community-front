import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SocialStatus } from '@app/constants/social.constant';
import { Store } from '@ngrx/store';
import { AppState } from '@store/state';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { first, skipWhile } from 'rxjs/operators';

import * as SocialActions from '@store/social/social.actions';
import { SocialType } from '@app/models/user.model';
import { ColorTypes } from '@app/interfaces/color-type.interface';
import { ThemeService } from '@app/services/theme.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@app/components/common/confirm-dialog/confirm-dialog.component';
import { enableSaveGuard } from '@app/guards/unsave-guard';
import { getUserSocialRole } from '../../../../../store/user';
@Component({
  selector: 'app-forum-settings-general',
  templateUrl: './forum-settings-general.component.html',
  styleUrls: ['./forum-settings-general.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForumSettingsGeneralComponent implements OnInit {
  colorTypes = ColorTypes;
  SocialStatus = SocialStatus;
  social$ = this.store.select('social');
  selectedFlairs: Set<string> = new Set();
  sname: string;
  colors;
  form: FormGroup;
  disableInfo: boolean;
  userRole$ = this.store.select(getUserSocialRole);
  constructor(private store: Store<AppState>, private theme: ThemeService, private dialog: MatDialog) {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      flairs: new FormControl([]),
      status: new FormControl('', [Validators.required]),
      isPrivate: new FormControl('', [Validators.required]),
    });

    this.store.select('social').pipe(skipWhile(w => !w.social), first()).subscribe(s => {
      this.form.get('title').setValue(s.social.title);
      this.form.get('description').setValue(s.social.description);
      this.form.get('status').setValue(s.social.status);
      this.form.get('isPrivate').setValue(s.social.isPrivate);
      const pr = s.social.permissionRoles;
      this.userRole$.pipe(first()).subscribe((r) => {
        if (r !== 'CREATOR' && !pr.changeInfo) {
          this.form.get('title').disable();
          this.form.get('description').disable();
          this.disableInfo = true;
        }
      });
      this.sname = s.social.name;
      this.colors = { ...s.social.colors } || {};
      s.social.flairs.forEach(f => this.selectedFlairs.add(f));
      this.form.valueChanges.pipe(first()).subscribe(() => enableSaveGuard());
    });
  }



  ngOnInit(): void {
  }
  onChangeColor(color: string, colorType: string) {
    enableSaveGuard();
    this.colors[colorType] = color;
    this.theme.changeColor(this.colors, colorType as any);
  }

  onChangeImage(event, imageFormFieldName: 'avatar' | 'banner') {
    if (confirm('آیا از آپلود تصویر مطمئنید؟')) {
      const image = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.store.dispatch(SocialActions.SocialImageUpdating({
          file: image,
          sname: this.sname,
          imageType: imageFormFieldName,
          socialType: SocialType.FORUM
        }));
      };
      reader.readAsDataURL(image);
    }
  }
  onRemoveImage(imageFormFieldName: 'avatar' | 'banner') {
    if (confirm('آیا از حذف تصویر مطمئنید؟')) {
      this.store.dispatch(SocialActions.SocialImageDeleting({
        imageType: imageFormFieldName,
        sname: this.sname,
        socialType: SocialType.FORUM
      }));
    }
  }

  onSave() {
    // TODO: add colors
    if (this.form.valid) {
      const { title, description, status, isPrivate } = this.form.value;
      this.store.dispatch(SocialActions.SocialInfoUpdating(
        {
          colors: { ...this.colors },
          title,
          sname: this.sname,
          description,
          status,
          isPrivate,
          socialType: SocialType.FORUM,
          flairs: [...this.selectedFlairs],
        }));
    }
  }
  onRemoveForum(sid: string) {
    this.dialog.open(ConfirmDialogComponent, { data: 'آیا از حذف این انجمن اطمینان دارید؟' }).afterClosed().subscribe((r) => {
      if (r) {
        this.store.dispatch(SocialActions.SocialDeleting({ sid, socialType: SocialType.FORUM }));
      }
    });
  }
}

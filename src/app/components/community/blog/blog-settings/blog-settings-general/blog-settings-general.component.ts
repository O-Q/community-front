import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../store/state';
import { first, skipWhile } from 'rxjs/operators';
import { enableSaveGuard } from '../../../../../utils/unsave-guard';
import { SocialStatus } from '../../../../../constants/social.constant';
import * as SocialActions from './../../../../../store/social/social.actions';
import { SocialType } from '../../../../../models/user.model';
import { ColorTypes } from '../../../../../interfaces/color-type.interface';
import { ThemeService } from '../../../../../services/theme.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../common/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-blog-settings-general',
  templateUrl: './blog-settings-general.component.html',
  styleUrls: ['./blog-settings-general.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogSettingsGeneralComponent implements OnInit {
  SocialStatus = SocialStatus;
  colorTypes = ColorTypes;
  social$ = this.store.select('social');
  form: FormGroup;
  sname: string;
  selectedFlairs: Set<string> = new Set();
  selectedBranch: 'subjects' | 'images' | 'advanced' | 'colors' = 'colors';
  colors;
  constructor(private store: Store<AppState>, private theme: ThemeService, private dialog: MatDialog) {
    this.form = new FormGroup({
      description: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      title: new FormControl('', Validators.required),
      flairs: new FormControl([]),
      status: new FormControl('', [Validators.required]),
      isPrivate: new FormControl('', [Validators.required]),
    });

    this.store.select('social').pipe(skipWhile(w => !w.social), first()).subscribe((s: any) => {
      this.form.get('description').setValue(s.social.description);
      this.form.get('title').setValue(s.social.title);
      this.form.get('status').setValue(s.social.status);
      this.form.get('isPrivate').setValue(s.social.isPrivate);
      this.colors = { ...s.social.colors };
      this.sname = s.social.name;
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
      const file = event.target.files[0];
      this.store.dispatch(SocialActions.SocialImageUpdating({
        file,
        imageType: imageFormFieldName,
        sname: this.sname,
        socialType: SocialType.BLOG
      }));
    }
  }
  onRemoveImage(imageFormFieldName: 'avatar' | 'banner') {
    if (confirm('آیا از حذف تصویر مطمئنید؟')) {
      this.store.dispatch(SocialActions.SocialImageDeleting({
        imageType: imageFormFieldName,
        sname: this.sname,
        socialType: SocialType.BLOG
      }));
    }
  }
  onSave() {
    console.log(this.form.value);

    if (this.form.valid) {
      const { title, description, status, isPrivate } = this.form.value;
      this.store.dispatch(SocialActions.SocialInfoUpdating(
        {
          title,
          colors: { ...this.colors },
          sname: this.sname,
          description,
          status,
          isPrivate,
          socialType: SocialType.BLOG,
          flairs: [...this.selectedFlairs],
        }));
    }

  }

  changeBranchStyle(branch: string) {
    return branch === this.selectedBranch ? {
      background: 'rgba(255, 255, 255, 0.04)',
      'border-radius': '5px',
    } : null;
  }
  onRemoveBlog(sid: string) {
    this.dialog.open(ConfirmDialogComponent, { data: 'آیا از حذف این بلاگ اطمینان دارید؟' }).afterClosed().subscribe(r => {
      if (r) {
        this.store.dispatch(SocialActions.SocialDeleting({ sid, socialType: SocialType.BLOG }));
      }
    });
  }
}

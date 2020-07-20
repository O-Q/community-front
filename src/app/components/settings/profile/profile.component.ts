import { Component, OnInit, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@store/state';
import * as UserActions from '@store/user/user.actions';
import { enableSaveGuard } from '@app/utils/unsave-guard';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  user$ = this.store.select('user');
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }
  onChangeAvatar(event) {
    if (confirm('آیا از آپلود تصویر اطمینان دارید؟')) {
      enableSaveGuard();
      const file = event.target.files[0];
      this.store.dispatch(UserActions.UserAvatarChanging({ file }));
    }
  }
  onChangeBanner(event) {
    if (confirm('آیا از آپلود تصویر اطمینان دارید؟')) {
      const file = event.target.files[0];
      this.store.dispatch(UserActions.UserBannerChanging({ file }));
    }
  }
  onRemovePhoto(fileType: 'banner' | 'avatar') {
    const type = fileType === 'banner' ? 'بنر' : 'آواتار';
    if (confirm(`آیا می‌خواهید ${type} را حذف کنید؟`)) {
      this.store.dispatch(UserActions.UserPhotoRemoving({ fileType }));
    }
  }
}

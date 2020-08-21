import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AppState } from '@store/state';
import { Store } from '@ngrx/store';
import { SocialType } from '@app/models/user.model';
import * as  SocialActions from '@store/social/social.actions';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@app/components/common/confirm-dialog/confirm-dialog.component';
import { getUserSocialRole } from '../../../../../store/user';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-forum-detail',
  templateUrl: './forum-detail.component.html',
  styleUrls: ['./forum-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForumDetailComponent implements OnInit {

  @Input()
  social;
  auth$ = this.store.select('user');
  role;
  constructor(private store: Store<AppState>, private dialog: MatDialog) {

  }
  async ngOnInit() {
    this.role = await this.store.select(getUserSocialRole).pipe(first()).toPromise();

  }

  onJoin() {
    this.store.dispatch(SocialActions.SocialJoining({ sid: this.social._id, socialType: SocialType.FORUM }));
  }

  onLeave() {
    this.dialog.open(ConfirmDialogComponent, { data: `آیا واقعا می‌خواهید انجمن ${this.social.name} را ترک کنید؟` })
      .afterClosed()
      .subscribe(r => {
        if (r) {
          this.store.dispatch(SocialActions.SocialLeaving({ sid: this.social._id, socialType: SocialType.FORUM }));
        }
      });
  }
  hasAccessToWrite(social) {
    return social.writeAccess &&
      (social.permissionRoles.newPost || ['CREATOR', 'MODERATOR'].includes(this.role))
      && social.status !== 'BANNED';
  }

}

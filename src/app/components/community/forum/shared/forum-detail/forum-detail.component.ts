import { Component, Input } from '@angular/core';
import { AppState } from '../../../../../store/state';
import { Store } from '@ngrx/store';
import { getUserSocialRole } from '../../../../../store/user';
import { SocialType } from '../../../../../models/user.model';
import * as  SocialActions from './../../../../../store/social/social.actions';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-forum-detail',
  templateUrl: './forum-detail.component.html',
  styleUrls: ['./forum-detail.component.scss']
})
export class ForumDetailComponent {
  @Input()
  social;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {
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

}

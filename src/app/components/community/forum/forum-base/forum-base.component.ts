import { Component, OnInit } from '@angular/core';
import { AppState } from '../../../../store/state';
import { Store } from '@ngrx/store';
import * as SocialActions from './../../../../store/social/social.actions';
import { SocialType } from '../../../../../../server/dist/user/interfaces/user.interface';
import { getUserSocialRole } from '../../../../store/user';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-forum-base',
  templateUrl: './forum-base.component.html',
  styleUrls: ['./forum-base.component.scss']
})
export class ForumBaseComponent implements OnInit {
  social$ = this.store.select('social');
  userRole$ = this.store.select(getUserSocialRole);
  constructor(private store: Store<AppState>, private dialog: MatDialog) {
  }

  ngOnInit() {
  }
  isModerator(userRole: string) {
    return ['MODERATOR', 'CREATOR'].includes(userRole);

  }
  onJoin(sid: string) {
    this.store.dispatch(SocialActions.SocialJoining({ sid, socialType: SocialType.FORUM }));
  }
  onLeave(sid: string, sname: string) {
    this.dialog.open(ConfirmDialogComponent, { data: `آیا واقعا می‌خواهید انجمن ${sname} را ترک کنید؟` }).afterClosed().subscribe(r => {
      if (r) {
        this.store.dispatch(SocialActions.SocialLeaving({ sid, socialType: SocialType.FORUM }));
      }
    });
  }
}

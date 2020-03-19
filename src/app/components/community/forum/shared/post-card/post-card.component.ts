import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../common/confirm-dialog/confirm-dialog.component';
import { Post } from '../../../../../interfaces/post.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../store/state';
import { AuthService } from './../../../../../services/auth.service';
import { selectAdmins } from '../../../../../store/social';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostCardComponent implements OnInit {
  @Input()
  post: Post;

  @Input()
  admins: string[];

  auth$ = this.store.select('auth');

  constructor(private dialog: MatDialog, private store: Store<AppState>, private auth: AuthService) { }

  ngOnInit() { }

  onDeletePost() {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: 'آیا از حذف این پست اطمینان دارید؟'
      })
      .afterClosed()
      .subscribe(isDeleted => {
        if (isDeleted) {
          // TODO: DELETE the post and update the post stack
          console.log('deleted');
        }
      });
  }

  isPermittedToRemove(username) {
    return this.admins.includes[username] || username === this.post.author;
  }
}

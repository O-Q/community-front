import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@app/components/common/confirm-dialog/confirm-dialog.component';
import { Post } from '@app/interfaces/post.interface';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/state';
import * as PostActions from '@store/post/post.actions';
import { DomSanitizer } from '@angular/platform-browser';
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

  @Input()
  isHomepage: boolean;
  safeHTML;
  auth$ = this.store.select('auth');
  constructor(private dialog: MatDialog, private store: Store<AppState>, private sanitizer: DomSanitizer) { }
  ngOnInit() {
    this.safeHTML = this.sanitizer.bypassSecurityTrustHtml(this.post.text);
  }

  onDeletePost() {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: 'آیا از حذف این پست اطمینان دارید؟'
      })
      .afterClosed()
      .subscribe(isDeleted => {
        if (isDeleted) {
          // TODO: DELETE the post and update the post stack
          const sname = this.post.social.name || this.post.social;
          this.store.dispatch(PostActions.PostDeleting({ pid: this.post._id, sname, socialType: this.post.type }));
        }
      });
  }

  isPermittedToRemove(username) {
    return username === this.post.author || this.admins?.includes[username];
  }

  express(reaction: 'LIKE' | 'DISLIKE') {
    this.store.dispatch(PostActions.PostExpressing({ reaction, pid: this.post._id, post: this.post }));
  }
}

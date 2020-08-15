import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@app/components/common/confirm-dialog/confirm-dialog.component';
import { Post } from '@app/interfaces/post.interface';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/state';
import * as PostActions from '@store/post/post.actions';
import * as SearchActions from '@store/search/search.actions';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SocialType, User, IUser, UserRole } from '../../../models/user.model';
import { updateReaction } from '../../../utils/reaction.util';
import { map } from 'rxjs/operators';
import { SocialUserRole } from '../../../constants/social.constant';
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
  sname: string;
  @Input()
  isHomepage: boolean;
  safeHTML: SafeHtml;
  isHover: boolean;
  editMode = false;
  socialUrl: string;
  isComment: boolean;
  isOnPostPage: boolean;
  liked: boolean;
  reaction: number;
  user$ = this.store.select('user');
  constructor(private dialog: MatDialog, private store: Store<AppState>, private sanitizer: DomSanitizer, private router: Router) { }
  ngOnInit() {
    this.liked = this.post.liked;
    this.reaction = this.post.reaction;
    this.safeHTML = this.sanitizer.bypassSecurityTrustHtml(this.post.text);
    this.sname = (this.sname || this.post.social?.name || this.post.social);
    this.socialUrl = (this.post.socialType === SocialType.BLOG ? '/b/' : '/c/') + this.sname;
    this.isComment = !!this.post.replyTo;
    this.isOnPostPage = !!this.post.comments;
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
          this.store.dispatch(PostActions.PostDeleting(
            {
              pid: this.post._id,
              sname: this.sname,
              socialType: this.post.socialType,
              isComment: this.isComment
            }));
        }
      });
  }

  onEdit(post: Post) {
    if (post.replyTo) {
      const contentContainer = document.getElementById(`p-${post._id}`);
      contentContainer.style.border = '1px solid #ffffff42';
      contentContainer.style.borderRadius = '4px';
      contentContainer.style.padding = '.5rem';
      this.editMode = true;
    } else {
      this.router.navigate([
        post.socialType === 'BLOG' ? '/b' : '/c',
        this.sname || post.social.name || post.social,
        'p',
        post._id,
        'edit']);
    }
  }
  updateComment(post: Post) {
    const contentContainer = document.getElementById(`p-${post._id}`);
    const text = contentContainer.innerHTML;
    contentContainer.style.border = null;
    contentContainer.style.borderRadius = null;
    contentContainer.style.padding = null;
    this.store.dispatch(PostActions.PostUpdating(
      {
        post: { ...post, text },
        sid: post.social,
        socialType: post.socialType,
        sname: this.sname, isComment: true
      }));
    this.editMode = false;
  }

  isPermittedToRemove(user: IUser) {
    const role = user?.socials?.find(s => s?.social?._id === this.post.social?._id)?.role;
    return user?.username === this.post.author || ['MODERATOR', 'CREATOR'].includes(role) || user?.roles?.some(r => r === UserRole.ADMIN);
  }

  express(newReaction: 'LIKE' | 'DISLIKE', user) {
    const isComment = !!this.post.replyTo;
    const { liked, reaction } = user ?
      updateReaction(newReaction, this.post.liked, this.post.reaction) : { liked: null, reaction: this.post.reaction };
    this.store.dispatch(PostActions.PostExpressing(
      {
        reaction: newReaction,
        pid: this.post._id,
        post: { ...this.post, liked, reaction },
        isComment,
        isHomepage: this.isHomepage
      }));
  }
}

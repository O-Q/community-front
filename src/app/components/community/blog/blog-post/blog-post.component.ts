import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { selectFocusedPost } from '@store/post';
import { Validators, FormControl } from '@angular/forms';
import { AppState } from '@store/state';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import * as PostActions from '@store/post/post.actions';
import { selectAdmins } from '@store/social';
import { getMergedRoute } from '@store/router/router.selectors';
import { first } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Post } from '@app/interfaces/post.interface';
import { updateReaction } from '../../../../utils/reaction.util';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogPostComponent implements OnInit, OnDestroy {
  post$ = this.store.select(selectFocusedPost);
  comment = new FormControl('', [Validators.minLength(15)]);
  user$ = this.store.select('user');
  admins$ = this.store.select(selectAdmins);
  safeHTML;
  subs: Subscription;
  sname: string;
  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer) {
    const urlS = this.route.snapshot.url;
    this.sname = urlS[0].path;
    const pid = urlS[2].path;
    this.store.dispatch(PostActions.PostDetailedFetching({ sname: this.sname, pid }));
  }
  ngOnInit() {
    this.subs = this.post$.subscribe(p =>
      this.safeHTML = this.sanitizer.bypassSecurityTrustHtml(p?.text)
    );
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  onSendComment(post) {
    console.log(this.comment.valid);

    if (this.comment.valid) {
      const comment = this.comment.value;
      const sid = post.social._id;
      const pid = post._id;
      this.comment.reset('');
      this.store.dispatch(PostActions.PostReplyPublishing({ pid, sid, sname: this.sname, comment, socialType: 'BLOG' }));
    }
  }
  async onBack() {
    this.router.navigateByUrl(
      (await this.store.select(getMergedRoute).pipe(first()).toPromise()).prevUrl || `/b/${this.sname}`
    );
  }
  express(newReaction: 'LIKE' | 'DISLIKE', post: Post, user) {
    const { liked, reaction } = user.user ?
      updateReaction(newReaction, post.liked, post.reaction) : { liked: null, reaction: post.reaction };
    this.store.dispatch(PostActions.PostExpressing(
      {
        reaction: newReaction,
        pid: post._id,
        post: { ...post, liked, reaction },
      }));
  }

}

import { Component, OnInit } from '@angular/core';
import { AppState } from '@store/state';
import { Store } from '@ngrx/store';
import * as PostActions from '@store/post/post.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { selectFocusedPost } from '@store/post';
import { selectAdmins } from '@store/social';
import { getMergedRoute } from '@store/router/router.selectors';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-forum-post',
  templateUrl: './forum-post.component.html',
  styleUrls: ['./forum-post.component.scss']
})
export class ForumPostComponent implements OnInit {
  post$ = this.store.select(selectFocusedPost);
  comment = new FormControl('', [Validators.minLength(15)]);
  user$ = this.store.select('user');
  admins$ = this.store.select(selectAdmins);
  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router: Router) {
    const urlS = this.route.snapshot.url;
    const sname = urlS[0].path;
    const pid = urlS[2].path;

    this.store.dispatch(PostActions.PostDetailedFetching({ sname, pid }));
  }
  ngOnInit() { }
  onSendComment(post) {
    if (this.comment.valid) {
      const comment = this.comment.value;
      const sname = post.social.name;
      const sid = post.social._id;
      const pid = post._id;
      this.store.dispatch(PostActions.PostReplyPublishing({ pid, sid, sname, comment, socialType: 'FORUM' }));
      this.comment.reset('');
    }
  }
  async onBack(sname: string) {
    this.router.navigateByUrl(
      (await this.store.select(getMergedRoute).pipe(first()).toPromise()).prevUrl || `/c/${sname}`
    );
  }

}
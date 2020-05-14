import { Component, OnInit } from '@angular/core';
import { selectFocusedPost } from '../../../../store/post';
import { Validators, FormControl } from '@angular/forms';
import { AppState } from '../../../../store/state';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import * as PostActions from './../../../../store/post/post.actions';
import { selectAdmins } from '../../../../store/social';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {
  post$ = this.store.select(selectFocusedPost);
  comment = new FormControl('', [Validators.minLength(15)]);
  user$ = this.store.select('user');
  admins$ = this.store.select(selectAdmins);
  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    const urlS = this.route.snapshot.url;
    const sname = urlS[0].path;
    const pid = urlS[2].path;

    this.store.dispatch(PostActions.PostDetailedFetching({ sname, pid }));
  }
  ngOnInit() { }
  onSendComment(post) {
    console.log(this.comment.valid);

    if (this.comment.valid) {
      const comment = this.comment.value;
      const sname = post.social.name;
      const sid = post.social._id;
      const pid = post._id;
      this.store.dispatch(PostActions.PostReplyPublishing({ pid, sid, sname, comment }));
    }
  }

}

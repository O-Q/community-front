import { Component, OnInit } from '@angular/core';
import { AppState } from '@store/state';
import { Store } from '@ngrx/store';
import * as PostActions from '@store/post/post.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { selectFocusedPost } from '@store/post';
import { selectAdmins, getPermissionRoles } from '@store/social';
import { getMergedRoute } from '@store/router/router.selectors';
import { first, skipWhile, map } from 'rxjs/operators';
import { getUserSocialRole, getUserSocialWriteAccess } from '../../../../store/user';
import { Title, Meta } from '@angular/platform-browser';
@Component({
  selector: 'app-forum-post',
  templateUrl: './forum-post.component.html',
  styleUrls: ['./forum-post.component.scss']
})
export class ForumPostComponent implements OnInit {
  post$ = this.store.select(selectFocusedPost).pipe(map(p => {
    if (p) {
      this.title.setTitle(`نارنجی - ${this.sname} - ${p.title}`);
      this.meta.updateTag({
        name: 'description',
        content: `${this.sname} - ${p.title} - ${p.text.slice(0, 120)}`
      });
    }
    return p;
  }));
  comment = new FormControl('', [Validators.minLength(15)]);
  user$ = this.store.select('user');
  admins$ = this.store.select(selectAdmins);
  sname: string;
  constructor(private store: Store<AppState>,
    private title: Title,
    private meta: Meta,
    private route: ActivatedRoute,
    private router: Router) {
    const urlS = this.route.snapshot.url;
    this.sname = urlS[0].path;
    const pid = urlS[2].path;

    this.store.dispatch(PostActions.PostDetailedFetching({ sname: this.sname, pid }));
  }
  async ngOnInit() {
    if (!await this.hasAccessToWrite()) {
      this.comment.disable();
    }
  }
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

  async hasAccessToWrite() {
    const permissionRoles = await this.store.select(getPermissionRoles).pipe(skipWhile(_ => !_), first()).toPromise();
    const userSocialRole = await this.store.select(getUserSocialRole).pipe(skipWhile(_ => !_), first()).toPromise();
    const writeAccess = await this.store.select(getUserSocialWriteAccess).pipe(skipWhile(_ => !_), first()).toPromise();
    return writeAccess && (permissionRoles.newPost || ['CREATOR', 'MODERATOR'].includes(userSocialRole));
  }
}
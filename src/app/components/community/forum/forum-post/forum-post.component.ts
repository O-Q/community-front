import { Component, OnInit } from '@angular/core';
import { AppState } from '../../../../store/state';
import { Store } from '@ngrx/store';
import * as SocialActions from './../../../../store/social/social.actions';
import { getMergedRoute } from '../../../../store/router/router.selectors';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { selectFocusedPost } from '../../../../store/social';
@Component({
  selector: 'app-forum-post',
  templateUrl: './forum-post.component.html',
  styleUrls: ['./forum-post.component.scss']
})
export class ForumPostComponent implements OnInit {
  backgroundImage = `url("https://material.angular.io/assets/img/examples/shiba1.jpg")`;
  post$ = this.store.select(selectFocusedPost);
  constructor(private store: Store<AppState>, private route: ActivatedRoute) {

    const urlS = this.route.snapshot.url;
    const sname = urlS[0].path;
    const pid = urlS[2].path;
    console.log(sname);
    console.log(pid);


    this.store.dispatch(SocialActions.PostDetailedFetching({ sname, pid }));
  }

  ngOnInit() { }
}

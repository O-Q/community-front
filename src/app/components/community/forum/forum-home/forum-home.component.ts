import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, first } from 'rxjs/operators';
import { Observable, Subscription, } from 'rxjs';
import { selectAdmins } from '../../../../store/social';

import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/state';
import { getMergedRoute } from '../../../../store/router/router.selectors';
import * as PostActions from './../../../../store/post/post.actions';
@Component({
  selector: 'app-forum-home',
  templateUrl: './forum-home.component.html',
  styleUrls: ['./forum-home.component.scss']
})
export class ForumHomeComponent implements OnInit, OnDestroy {
  sub: Subscription;
  social$ = this.store.select('social');
  post$ = this.store.select('post');
  isXSmall$: Observable<boolean>;
  admins$ = this.store.select(selectAdmins).pipe(first());
  auth$ = this.store.select('auth');
  constructor(
    private bpo: BreakpointObserver,
    private store: Store<AppState>,
  ) {
    this.isXSmall$ = this.bpo.observe(Breakpoints.XSmall).pipe(map(is => is.matches));

  }

  flair: string;
  sname: string;
  ngOnInit() {
    // NOTE: I don't know why but it seems there's a bug in snapshot.url

    this.sub = this.store.select(getMergedRoute).subscribe(r => {
      // if forums changed. eg. /c/x to /c/y
      const URLArray = r.url.split('/');
      const socialType = URLArray[1] === 'c' ? 'FORUM' : 'BLOG';
      if (socialType === 'FORUM' && !URLArray?.[3]) {
        const query = this.makeQuery(r.queryParams.flair);
        if (this.sname !== r.params.name) {
          this.sname = r.params.name;
        }
        this.flair = r.queryParams.flair;
        this.store.dispatch(PostActions.PostsFetching({
          sname: this.sname, query
        }));
      }
    });

  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  private makeQuery(flair: string) {
    if (flair) {
      return {
        page: 1,
        itemsPerPage: 10,
        flair
      };
    } else {
      return {
        page: 1,
        itemsPerPage: 10,
      };
    }
  }
}

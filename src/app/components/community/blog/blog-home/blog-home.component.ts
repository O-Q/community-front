import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@store/state';
import { Subscription } from 'rxjs';
import { getMergedRoute } from '@store/router/router.selectors';
import * as PostActions from '@store/post/post.actions';
import { selectAdmins } from '@store/social';
import { makeQuery } from '@app/utils/paginator.func';


@Component({
  selector: 'app-blog-home',
  templateUrl: './blog-home.component.html',
  styleUrls: ['./blog-home.component.scss']
})
export class BlogHomeComponent implements OnInit, OnDestroy {
  sub: Subscription;
  posts$ = this.store.select('post');
  social$ = this.store.select('social');
  admins$ = this.store.select(selectAdmins);
  constructor(private store: Store<AppState>) { }
  flair: string;
  sname: string;
  ngOnInit() {
    // NOTE: I don't know why but it seems there's a bug in snapshot.url
    this.sub = this.store.select(getMergedRoute).subscribe(r => {
      // if forums changed. eg. /c/x to /c/y
      const URLArray = r.url.split('/');
      const socialType = URLArray[1] === 'c' ? 'FORUM' : 'BLOG';
      if (socialType === 'BLOG' && !URLArray?.[3]) {
        const query = makeQuery(r.queryParams.flair);
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
  onChangePage(event) {
    const page = event.pageIndex + 1;
    const itemsPerPage = event.pageSize;
    const query = makeQuery(this.flair, page, itemsPerPage);
    this.store.dispatch(PostActions.PostsFetching({ sname: this.sname, query }));
  }
}

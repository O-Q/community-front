import { Component, OnInit, OnDestroy } from '@angular/core';
import { getMergedRoute } from '@store/router/router.selectors';
import { Subscription } from 'rxjs';
import * as SocialActions from '@store/social/social.actions';
import { AppState } from '@store/state';
import { Store } from '@ngrx/store';
import { ThemeService } from '@app/services/theme.service';
import { SocialType } from '@app/models/user.model';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit, OnDestroy {
  sub: Subscription;
  sname: string = null;
  social$ = this.store.select('social');
  isNew: boolean;
  constructor(private store: Store<AppState>, private theme: ThemeService) { }
  ngOnInit() {
    // NOTE: I don't know why but it seems there's a bug in snapshot.url
    this.sub = this.store.select(getMergedRoute).subscribe(async r => {
      // if forums changed. eg. /c/x to /c/y
      const social = await this.social$.pipe(first()).toPromise();
      const URLArray = r.url.split('/');
      if (URLArray?.[2] === 'new') { // create new blog
        this.isNew = true;
        this.theme.changeToUserDefault();
      } else if (!r.params.name || social.social?.name === r.params.name) {
        this.isNew = false;
        return;
      } else if (!this.sname || this.sname !== r.params.name) {
        this.isNew = false;
        this.sname = r.params.name;
        this.store.dispatch(SocialActions.SocialFetching({ sname: this.sname, socialType: SocialType.BLOG }));
      } else {
        this.isNew = false;
        this.store.select('social').pipe(first()).subscribe(s => this.theme.changeColors(s.social.colors));
      }
    });

  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

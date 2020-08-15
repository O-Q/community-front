import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppState } from '@store/state';
import { getMergedRoute } from '@store/router/router.selectors';
import { Store } from '@ngrx/store';
import * as SocialActions from '@store/social/social.actions';
import { ThemeService } from '@app/services/theme.service';
import { SocialType } from '@app/models/user.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit, OnDestroy {
  sub: Subscription;
  sname: string;
  constructor(private store: Store<AppState>, private theme: ThemeService) { }
  ngOnInit() {


    // NOTE: I don't know why but it seems there's a bug in snapshot.url
    this.sub = this.store.select(getMergedRoute).subscribe(async r => {
      // if forums changed. eg. /c/x to /c/y
      const social = await this.store.select('social').pipe(first()).toPromise();
      const URLArray = r.url.split('/');
      if (URLArray?.[2] === 'new') {
        this.theme.changeToUserDefault();
      } else if (!r.params.name || social.social?.name === r.params.name) {
        this.theme.changeColors(social.social.colors);
        return;
      } else if (!this.sname || this.sname !== r.params.name) {
        this.sname = r.params.name;
        this.store.dispatch(SocialActions.SocialFetching({ sname: this.sname, socialType: SocialType.FORUM }));
      } else {
        this.theme.changeColors(social.social.colors);
      }
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppState } from '../../../store/state';
import { getMergedRoute } from '../../../store/router/router.selectors';
import { Store } from '@ngrx/store';
import * as SocialActions from './../../../store/social/social.actions';
import { ThemeService } from '../../../services/theme.service';
import { SocialType } from '../../../models/user.model';
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
    this.sub = this.store.select(getMergedRoute).subscribe(r => {
      // if forums changed. eg. /c/x to /c/y
      const URLArray = r.url.split('/');
      if (URLArray?.[2] === 'new') {
        this.theme.changeToUserDefault();
      } else if (!r.params.name) {
        return;
      } else if (!this.sname || this.sname !== r.params.name) {
        this.sname = r.params.name;
        this.store.dispatch(SocialActions.SocialFetching({ sname: this.sname, socialType: SocialType.BLOG }));
      } else {
        this.store.select('social').pipe(first()).subscribe(s => this.theme.changeColors(s.social.colors));
      }
    });


  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

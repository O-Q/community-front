import { Component, OnInit, OnDestroy } from '@angular/core';
import { Widget } from '../../../../interfaces/widgets.interface';
import { WidgetNames } from './../../../../../../server/src/shared/widget-list.enum';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import * as fromApp from '../../../../store/state';
import { SocialState } from '../../../../store/social';
import { Store } from '@ngrx/store';
import { ConfigService } from '../../../../services/config.service';
import { getMergedRoute } from '../../../../store/router/router.selectors';


@Component({
  selector: 'app-forum-home',
  templateUrl: './forum-home.component.html',
  styleUrls: ['./forum-home.component.scss']
})
export class ForumHomeComponent implements OnInit {
  social$ = this.store.select('social');
  isXSmall$: Observable<boolean>;
  // posts = [1, 2, 3, 4, 5, 6];
  // widgets: Widget[] = [
  //   { name: WidgetNames.RULES },
  //   {
  //     name: WidgetNames.USER_LIST, inputs: {
  //       title: 'بهترین کاربران',
  //       users: [
  //         { name: 'Mahdi', url: 'https://google.com', value: 50 },
  //         { name: 'Asghar', url: 'https://yahoo.com', value: 60 },
  //       ]
  //     }
  //   },
  //   {
  //     name: WidgetNames.CHAT,
  //     inputs: {}
  //   }, {
  //     name: WidgetNames.FLAIRS,
  //     inputs: { flairs: ['یک', 'موضوع دو', 'موضوع یک', 'موضوع دو'] }
  //   }
  // ];
  constructor(
    private bpo: BreakpointObserver,
    private store: Store<fromApp.AppState>,
    private activatedRoute: ActivatedRoute
  ) {
    this.isXSmall$ = this.bpo.observe(Breakpoints.XSmall).pipe(map(is => is.matches));
  }

  ngOnInit() {
    this.store.dispatch(SocialState.SocialFetching({
      socialType: 'forum', sname: this.activatedRoute.snapshot.params.name
    }));
  }


}

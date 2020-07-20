import { Injectable } from '@angular/core';
import { CanLoad, UrlSegment, Route, Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store/state';
import { getUserSocialRole } from '../store/user';
import { first, skipWhile, map, takeUntil } from 'rxjs/operators';
import * as SocialActions from './../store/social/social.actions';
@Injectable({
  providedIn: 'root'
})
export class SocialModGuard implements CanLoad {

  constructor(private store: Store<AppState>, private router: Router) { }

  canLoad(route: Route, segments: UrlSegment[]) {
    const socialType = window.location.href.split('//')[1].split('/')[1] === 'b' ? 'BLOG' : 'FORUM'; // b or c
    return this.store.select(getUserSocialRole).pipe(
      skipWhile((role) => {

        if (role === undefined) {
          this.store.dispatch(SocialActions.SocialFetching({ sname: segments[0].path, socialType }));
          return true;
        }
        return false;
      }),
      first(), map(role => {
        if (!['MODERATOR', 'CREATOR'].includes(role)) {
          this.router.navigate([socialType === 'BLOG' ? 'b' : 'c', segments[0].path]);
        }
        return true;
      }));
  }
}

import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/state';
import { getUserSocialWriteAccess, getUserSocialWriteAccessRole } from '../store/user';
import { first, map, skipWhile } from 'rxjs/operators';
import * as SocialActions from './../store/social/social.actions';
@Injectable({
  providedIn: 'root'
})
export class SocialWriteGuard implements CanLoad {
  constructor(private store: Store<AppState>, private router: Router) { }
  oneCall = false;
  canLoad(
    route: Route,
    segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    const socialType = window.location.href.split('//')[1].split('/')[1] === 'b' ? 'BLOG' : 'FORUM'; // b or c
    return this.store.select(getUserSocialWriteAccessRole).pipe(
      skipWhile(r => {
        if (r?.writeAccess === undefined) {
          if (!this.oneCall) {
            this.store.dispatch(SocialActions.SocialFetching({ sname: segments[0].path, socialType }));
            this.oneCall = true;
          }
          return true;
        }
        this.oneCall = false;
        return false;
      }),
      first(), map(r => {
        if (!(r.writeAccess && (r.permissionRoles?.newPost || ['CREATOR', 'MODERATOR'].includes(r.role)))) {
          this.router.navigate([socialType === 'BLOG' ? 'b' : 'c', segments[0].path]);
        }
        return true;
      }));
  }

}

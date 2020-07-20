import { Injectable } from '@angular/core';
import { UrlSegment, Route, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/state';
import { isAuthor } from '../store/post';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocialAuthorGuard implements CanLoad {
  constructor(private store: Store<AppState>) { }
  canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    const pid = segments[2].path;

    return this.store.select(isAuthor(pid)).pipe(first());

  }
}

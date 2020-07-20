import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ACCESS_TOKEN_KEY } from '../constants/local-storage.constant';

@Injectable({
  providedIn: 'root'
})
export class NotAuthGuard implements CanLoad {
  constructor(private router: Router) { }
  canLoad(route: Route, segments: UrlSegment[]): boolean | Promise<boolean> | Observable<boolean> {
    if (!!localStorage.getItem(ACCESS_TOKEN_KEY)) {
      this.router.navigateByUrl('/error/404');
      return false;
    }
    return true;
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, UrlSegment, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ACCESS_TOKEN_KEY } from '../constants/local-storage.constant';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!localStorage.getItem(ACCESS_TOKEN_KEY)) {
      this.router.navigateByUrl('/error/404');
      return false;
    }
    return true;
  }
  canLoad(route: Route, segments: UrlSegment[]): boolean | Promise<boolean> | Observable<boolean> {
    if (!localStorage.getItem(ACCESS_TOKEN_KEY)) {
      this.router.navigateByUrl('/error/404');
      return false;
    }
    return true;
  }

}

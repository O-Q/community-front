import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ACCESS_TOKEN_KEY } from '../constants/local-storage.constant';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AppState } from '../store/state';
import { Store } from '@ngrx/store';
import * as AuthActions from './../store/auth/auth.actions';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private router: Router, private store: Store<AppState>) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = appTokenGetter();
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${appTokenGetter()}`
                }
            });

        }
        return next.handle(request).pipe(tap(r => { }, (e: HttpErrorResponse) => {
            if (e.status === 401 && !request.url.includes('signin')) {
                this.store.dispatch(AuthActions.logout({ silent: false, message: '⚠ برای این‌ کار ابتدا وارد شوید' }));
            } else if (e.status === 404) {
                this.router.navigateByUrl('/404');
            }
            //  else {
            //     this.store.dispatch(AuthActions.logout({ silent: false, message: '⛔ اطلاعات وارد شده نادرست است' }));
            // }
        }));
    }
}

export function appTokenGetter() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
}
export function appTokenRemover() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
}
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
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = appTokenGetter();
        console.log(token);

        if (token) {
            console.log(token);
            const jwt = new JwtHelperService();
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${appTokenGetter()}`
                }
            });

        }
        return next.handle(request).pipe(tap(r => { }, (e: HttpErrorResponse) => {
            if (e.status === 401) {
                appTokenRemover();
                this.router.navigateByUrl('/');
            }
        }));
    }
}

export function appTokenGetter() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
}
export function appTokenRemover() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
}
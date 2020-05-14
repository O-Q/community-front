import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private snackbar: MatSnackBar, private router: Router) { }

  handleHttpError(r: HttpErrorResponse, _ = { showSnackbar: false }) {
    if (!_.showSnackbar) {
      this._handleWithNavigate(r);
    } else {
      this._handleWithSnackbar(r);
    }
  }

  private _handleWithNavigate(r: HttpErrorResponse) {
    switch (r.status) {
      case 404: {
        this.router.navigateByUrl('/error/404');
        break;
      }
      case 500: {
        console.log(r);
        this.router.navigateByUrl('/error/500');
        break;
      }
    }
  }

  private _handleWithSnackbar(r: HttpErrorResponse) {
    if (r.error.error) {
      this.snackbar.open(r.error.error);
    } else if (r.error.statusCode === 401) {
      this.snackbar.open('شما خارج شدید.')
    } else {
      this.snackbar.open('خطای ناشناخته');
      console.log(r);


    }
  }
}

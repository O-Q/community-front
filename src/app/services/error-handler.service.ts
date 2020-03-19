import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private snackbar: MatSnackBar, private router: Router) { }

  handleHttpError(error: HttpErrorResponse, { showSnackbar = false }) {
    if (!showSnackbar) {
      this._handleWithNavigate(error);
    } else {
      this._handleWithSnackbar(error);
    }
  }

  private _handleWithNavigate(error: HttpErrorResponse) {
    switch (error.status) {
      case 404: {
        this.router.navigateByUrl('/error/404');
        break;
      }
      case 500: {
        console.log(error);
        this.router.navigateByUrl('/error/500');
      }
    }
  }

  private _handleWithSnackbar(error: HttpErrorResponse) {
    // TODO
    this.snackbar.open(error.error.message);
  }
}

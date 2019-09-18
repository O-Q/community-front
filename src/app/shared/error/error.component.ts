import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ERROR_MESSAGES } from 'src/app/constants/error-codes.constant';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorComponent {
  error$: Observable<{ code: string; message: string }>;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.error$ = this.route.params.pipe(
      map(params => ({
        code: params.code,
        message: ERROR_MESSAGES[params.code]
      }))
    );
  }

  onReturn() {
    this.router.navigateByUrl('');
  }
}

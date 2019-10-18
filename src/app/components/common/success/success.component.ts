import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {
  success$: Observable<{ message: string; iconName: string }>;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.success$ = this.route.data.pipe(
      map(data => ({
        message: data.message,
        iconName: data.iconName
      }))
    );
  }
  onReturn() {
    this.router.navigateByUrl('');
  }
}

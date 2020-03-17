import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './../../../store/state';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-widget-flairs',
  templateUrl: './widget-flairs.component.html',
  styleUrls: ['./widget-flairs.component.scss']
})
export class WidgetFlairsComponent implements OnInit {
  // todo: must contain username and link to profile
  flairs$ = this.store.select('social').pipe(map(x => x.social.flairs));
  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  goToFlair(flair: string) {
    this.router.navigate([], { queryParams: { flair } });
  }
}

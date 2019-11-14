import { Component, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Store } from '@ngrx/store';
import { AppState } from './store/state';
import { AuthService } from './services/auth.service';
import { Router, RouterEvent, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  asyncLoadCount = 0;
  showLoading = false;
  constructor(private authService: AuthService, private router: Router) {
    this.authService.loadUser();
  }
  ngOnInit() {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof RouteConfigLoadStart) {
        this.asyncLoadCount += 1;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.asyncLoadCount -= 1;
      }

      this.showLoading = !!this.asyncLoadCount;
    });
  }



}

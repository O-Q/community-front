import { Component, OnInit, EventEmitter } from '@angular/core';
import { AuthService } from '@app/services/auth.service';
import { Router, RouterEvent, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { ThemeService } from '@app/services/theme.service';
import { initHeader } from './utils/flexible-header';
import { SEOService } from './services/seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  asyncLoadingCount = 0;
  showLoading$ = new EventEmitter(false);

  constructor(private authService: AuthService, private router: Router, private theme: ThemeService, private seo: SEOService) {
    this.authService.loadUser();
    this.theme.initTheme();
  }
  ngOnInit() {
    this._initLoadingIndicator();
    initHeader();
    this.seo.SEOWorker();
  }

  private _initLoadingIndicator() {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof RouteConfigLoadStart) {
        this.asyncLoadingCount += 1;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.asyncLoadingCount -= 1;
      }
      this.showLoading$.next(!!this.asyncLoadingCount);
    });
  }



}


import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SEOService {
  constructor(
    private title: Title,
    private meta: Meta,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  updateTitle(title: string) {
    this.title.setTitle(title);
  }

  updateDescription(desc: string) {
    this.meta.updateTag({ name: 'description', content: desc });
  }
  SEOWorker() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.route),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data)
      )
      .subscribe(event => {
        if (event['title']) {
          this.updateTitle(`نارنجی - ${event['title']}`);
          // Updating Description tag dynamically with title
          this.updateDescription(event['title'] + ' - ' + event['description'] || '');
        }
      });
  }
}

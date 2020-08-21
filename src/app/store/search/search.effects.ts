import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as SearchAction from './search.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '@app/services/error-handler.service';
import { environment } from '@env/environment';
import { ConfigService } from '@app/services/config.service';


@Injectable()
export class SearchEffects {
  fetchSearch = createEffect(() => this.actions$.pipe(ofType(SearchAction.SearchFetching), switchMap(payload => {
    const { text, itemsPerPage, page } = payload;

    return this.http.get<any>(this.config.makeUrl(environment.urls.search.SEARCH, {
      queries: {
        text, page, itemsPerPage
      }
    })).pipe(map(r => {
      console.log(r);

      return SearchAction.SearchFetched({ data: r });
    }), catchError(error => {
      const message = error.error.message;
      this.errorHandler.handleHttpError(error);
      return of(SearchAction.SearchError({ message }));
    }));
  })));
  fetchPosts = createEffect(() => this.actions$.pipe(ofType(SearchAction.HomepagePostFetching), switchMap(payload => {
    const { itemsPerPage, page, sortBy } = payload;

    return this.http.get<any>(this.config.makeUrl(environment.urls.search.HOMEPAGE_POST, {
      queries: {
        page, itemsPerPage, sortBy
      }
    })).pipe(map(r => {
      return SearchAction.HomepagePostFetched({ posts: r.posts, length: r.length });
    }), catchError(error => {
      const message = error.error.message;
      this.errorHandler.handleHttpError(error);
      return of(SearchAction.SearchError({ message }));
    }));
  })));
  fetchSocial = createEffect(() => this.actions$.pipe(ofType(SearchAction.HomepageSocialFetching), switchMap(payload => {
    const { itemsPerPage, page } = payload;

    return this.http.get<any>(this.config.makeUrl(environment.urls.search.HOMEPAGE_SOCIAL, {
      queries: {
        page, itemsPerPage
      }
    })).pipe(map(r => {
      console.log(r);

      return SearchAction.HomepageSocialFetched({ data: r });
    }), catchError(error => {
      const message = error.error.message;
      this.errorHandler.handleHttpError(error);
      return of(SearchAction.SearchError({ message }));
    }));
  })));
  constructor(private actions$: Actions,
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
    private config: ConfigService,
  ) {
  }

}

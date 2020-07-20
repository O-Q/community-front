import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@store/state';
import * as SearchActions from '@store/search/search.actions';
import { ThemeService } from '@app/services/theme.service';
import { PostSortBy } from '@app/constants/post.constant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  search$ = this.store.select('search');
  postSortBy = PostSortBy.DEFAULT;
  constructor(private store: Store<AppState>, private theme: ThemeService) {
    this.store.dispatch(SearchActions.HomepagePostFetching({ page: 1, itemsPerPage: 10, sortBy: PostSortBy.DEFAULT }));
    this.store.dispatch(SearchActions.HomepageSocialFetching({ page: 1, itemsPerPage: 10 }));
  }

  ngOnInit() {
    this.theme.changeToUserDefault();
  }
  onToggleSortBy(sortBy: PostSortBy) {
    this.postSortBy = sortBy;
    this.store.dispatch(SearchActions.HomepagePostFetching({ page: 1, itemsPerPage: 10, sortBy }));
  }
  onChangePage(event) {
    const page = event.pageIndex + 1;
    const itemsPerPage = event.pageSize;
    this.store.dispatch(SearchActions.HomepagePostFetching({ page, itemsPerPage, sortBy: this.postSortBy }));
  }
}

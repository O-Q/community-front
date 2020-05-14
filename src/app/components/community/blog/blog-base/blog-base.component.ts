import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/state';
import { getUserSocialRole } from '../../../../store/user';

@Component({
  selector: 'app-blog-base',
  templateUrl: './blog-base.component.html',
  styleUrls: ['./blog-base.component.scss']
})
export class BlogBaseComponent implements OnInit {

  @Input()
  social;

  userRole$ = this.store.select(getUserSocialRole);

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }
  isModerator(userRole: string) {
    return ['MODERATOR', 'CREATOR'].includes(userRole);

  }

}

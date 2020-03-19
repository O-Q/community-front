import { Component, OnInit, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ShareBottomSheetComponent } from '../share-bottom-sheet/share-bottom-sheet.component';
import { Store } from '@ngrx/store';
import { AppState } from './../../../../../../store/state';
import { Observable } from 'rxjs';
// import { selectActionPost, IActionPost } from '../../../../../../store/social';
import { Post } from '../../../../../../interfaces/post.interface';


@Component({
  selector: 'app-post-actions',
  templateUrl: './post-actions.component.html',
  styleUrls: ['./post-actions.component.scss']
})
export class PostActionsComponent implements OnInit {
  @Input()
  post: Post;
  // actionPost$: Observable<IActionPost>;
  constructor(private _bottomSheet: MatBottomSheet, private store: Store<AppState>) {

  }

  ngOnInit() {
    // this.actionPost$ = this.store.select(selectActionPost);
  }

  openShareBottomSheet(): void {
    this._bottomSheet.open(ShareBottomSheetComponent, { data: { pid: this.post._id, social: this.post.social.name || this.post.social } });
  }
}

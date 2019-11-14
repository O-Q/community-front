import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../../../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
  @Input()
  post;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  onDeletePost() {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: 'آیا از حذف این پست اطمینان دارید؟'
      })
      .afterClosed()
      .subscribe(isDeleted => {
        if (isDeleted) {
          // TODO: DELETE the post and update the post stack
          console.log('deleted');
        }
      });
  }
}

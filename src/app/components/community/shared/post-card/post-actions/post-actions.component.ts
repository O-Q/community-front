import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { ShareBottomSheetComponent } from '../share-bottom-sheet/share-bottom-sheet.component';

@Component({
  selector: 'app-post-actions',
  templateUrl: './post-actions.component.html',
  styleUrls: ['./post-actions.component.scss']
})
export class PostActionsComponent implements OnInit {
  constructor(private _bottomSheet: MatBottomSheet) {}

  ngOnInit() {}

  openShareBottomSheet(): void {
    this._bottomSheet.open(ShareBottomSheetComponent);
  }
}

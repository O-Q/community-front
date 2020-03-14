import { Component, OnInit } from '@angular/core';
import {
  copyToClipboard,
  OPEN_WINDOW_FEATURES_MINI,
  ShareURL
} from '../../../../../utils/share.utils';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-share-bottom-sheet',
  templateUrl: './share-bottom-sheet.component.html',
  styleUrls: ['./share-bottom-sheet.component.scss']
})
export class ShareBottomSheetComponent implements OnInit {
  readonly ShareURL = ShareURL;
  postUrl =
    'https://www.reddit.com/r/Showerthoughts/comments/bg71oh/your_essential_guide_to_showerthoughts/';
  constructor(
    private bottomSheetRef: MatBottomSheetRef<ShareBottomSheetComponent>,
    private snackbar: MatSnackBar,
  ) { }
  ngOnInit() { }
  onCopy() {
    copyToClipboard(this.postUrl);
    this.bottomSheetRef.dismiss();
    this.snackbar.open('🔗 لینک با موفقیت کپی شد');
  }

  onShare(shareURL: ShareURL) {
    window.open(shareURL + this.postUrl, 'share', OPEN_WINDOW_FEATURES_MINI);
    this.bottomSheetRef.dismiss();
  }
}

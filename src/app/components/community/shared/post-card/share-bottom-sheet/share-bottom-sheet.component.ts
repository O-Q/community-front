import { Component, OnInit } from '@angular/core';
import {
  copyToClipboard,
  FEATURES_OPEN_WINDOW_MINI,
  ShareURL
} from '../../../../../utils/share.utils';
import { MatBottomSheetRef, MatSnackBar } from '@angular/material';

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
    private snackbar: MatSnackBar
  ) {}
  ngOnInit() {}
  onCopy() {
    copyToClipboard(this.postUrl);
    this.bottomSheetRef.dismiss();
    this.snackbar.open('🔗 لینک با موفقیت کپی شد');
  }

  onShare(shareURL: ShareURL) {
    window.open(shareURL + this.postUrl, 'share', FEATURES_OPEN_WINDOW_MINI);
    this.bottomSheetRef.dismiss();
  }
}

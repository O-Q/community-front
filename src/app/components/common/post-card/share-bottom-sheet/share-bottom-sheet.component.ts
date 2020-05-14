import { Component, OnInit, Inject } from '@angular/core';
import {
  copyToClipboard,
  OPEN_WINDOW_FEATURES_MINI,
  ShareURL
} from '../../../../utils/share.utils';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-share-bottom-sheet',
  templateUrl: './share-bottom-sheet.component.html',
  styleUrls: ['./share-bottom-sheet.component.scss']
})
export class ShareBottomSheetComponent implements OnInit {
  readonly ShareURL = ShareURL;
  postUrl: string;
  constructor(
    private bottomSheetRef: MatBottomSheetRef<ShareBottomSheetComponent>,
    private snackbar: MatSnackBar,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { pid: string, social: string }
  ) {
    this.postUrl = `${environment.BASE_FRONT_URL}/c/${data.social}/p/${data.pid}`;
  }
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

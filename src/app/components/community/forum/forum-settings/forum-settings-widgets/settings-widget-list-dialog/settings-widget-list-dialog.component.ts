import { Component, OnInit, ChangeDetectionStrategy, Inject, ChangeDetectorRef } from '@angular/core';
import { WidgetNames } from './../../../../../../constants/social.constant';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Widget } from '../../../../../../interfaces/widgets.interface';
import { MatSelectionListChange } from '@angular/material/list';
import { AppState } from '../../../../../../store/state';
import { Store } from '@ngrx/store';
import * as SocialActions from './../../../../../../store/social/social.actions';
import { getDefaultWidgets, getSocialLoading } from '../../../../../../store/social';
import { skipWhile, first } from 'rxjs/operators';
import { SocialType } from '../../../../../../models/user.model';
@Component({
  selector: 'app-settings-widget-list-dialog',
  templateUrl: './settings-widget-list-dialog.component.html',
  styleUrls: ['./settings-widget-list-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsWidgetListDialogComponent {
  defaultWidgets: Widget[];
  isLoading$ = this.store.select(getSocialLoading);
  constructor(
    @Inject(MAT_DIALOG_DATA) private currentWidgets: Widget[],
    private dialogRef: MatDialogRef<SettingsWidgetListDialogComponent>,
    private store: Store<AppState>,
    private changeDetect: ChangeDetectorRef
  ) {
    this.store.dispatch(SocialActions.SocialWidgetDefaultGetting());
    this.store.select(getDefaultWidgets).pipe(skipWhile(w => !w), first()).subscribe(w => {
      this.defaultWidgets = w;
      this.changeDetect.detectChanges();
    });
  }

  isActive(wname: string) {
    return this.currentWidgets.some(w => w.name === wname);
  }
  onSelectionChange(event: MatSelectionListChange) {
    const widget: Widget = event.option.value;
    if (event.option.selected) {
      this.currentWidgets.push(widget);
    } else {
      this.currentWidgets = this.currentWidgets.filter(w => widget.name !== w.name);
    }

  }

  onSave() {
    this.dialogRef.close(this.currentWidgets);
  }
  close() {
    this.dialogRef.close();
  }

}


import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Widget } from '../../../../../../interfaces/widgets.interface';
import { suggestedFlairs, WIDGETS, WidgetNames } from './../../../../../../constants/social.constant';
import { AppState } from '../../../../../../store/state';
import { Store } from '@ngrx/store';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-edit-widget-dialog',
  templateUrl: './edit-widget-dialog.component.html',
  styleUrls: ['./edit-widget-dialog.component.scss']
})
export class EditWidgetDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public widget: Widget, private dialogRef: MatDialogRef<EditWidgetDialogComponent>) {
    this.widget = JSON.parse(JSON.stringify(this.widget));
  }
  ngOnInit(): void {
  }

  addNew(inputWidget, input) {
    inputWidget.value.push(input.value);
    input.value = '';
    console.log(this.widget);
  }

  onRemove(inputWidget, item: string) {
    inputWidget.value = inputWidget.value.filter(i => i !== item);
  }
  onSave(widgetName: string) {
    this.widget.viewValue = widgetName;
    if (this.widget.viewValue) {
      this.dialogRef.close(this.widget);
    }
  }
  close() {
    this.dialogRef.close();
  }
}

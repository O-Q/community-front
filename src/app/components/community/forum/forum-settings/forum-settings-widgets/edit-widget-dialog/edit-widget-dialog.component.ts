import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Widget } from '@app/interfaces/widgets.interface';
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

import { Component, ViewContainerRef, AfterViewInit, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AppState } from '@store/state';
import { Store } from '@ngrx/store';
import { skipWhile, first, } from 'rxjs/operators';
import { WidgetLoaderService } from '@app/components/widgets/widget-loader.service';
import { Widget } from '@app/interfaces/widgets.interface';
import * as SocialActions from '@store/social/social.actions';
import { SocialType } from '@app/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { SettingsWidgetListDialogComponent } from './settings-widget-list-dialog/settings-widget-list-dialog.component';
import { EditWidgetDialogComponent } from './edit-widget-dialog/edit-widget-dialog.component';
import { enableSaveGuard } from '@app/guards/unsave-guard';
@Component({
  selector: 'app-forum-settings-widgets',
  templateUrl: './forum-settings-widgets.component.html',
  styleUrls: ['./forum-settings-widgets.component.scss']
})
export class ForumSettingsWidgetsComponent implements AfterViewInit {
  widgets: Widget[];
  social$ = this.store.select('social');
  sname: string;
  socialType: SocialType;
  @ViewChildren('widgetContainers', { read: ViewContainerRef }) widgetContainers: QueryList<ViewContainerRef>;
  constructor(
    private store: Store<AppState>,
    private widgetLoader: WidgetLoaderService,
    private snackbar: MatSnackBar,
    private change: ChangeDetectorRef,
    private dialog: MatDialog) {
    this._getWidgets();
  }

  private _getWidgets() {
    this.store.select('social')
      .pipe(skipWhile(v => !v.social), first())
      .subscribe(v => {
        this.sname = v.social.name;
        this.widgets = v.social.widgets.map(w => ({ ...w }));
        this.socialType = v.social.type;
      });
  }
  private _loadWidgets() {
    setTimeout(async () => {
      const promises = [];
      this.widgetContainers.forEach((vcr) => {
        const id = vcr.element.nativeElement.parentElement.id;
        const widget = this.widgets.find(w => w.name === id);
        promises.push(this.widgetLoader.load(id, vcr, widget.inputs, widget.viewValue));
      });
      await Promise.all(promises);
      this.change.detectChanges();
    }, 500);
  }
  private _reloadWidgets() {
    this.widgetContainers.forEach(vcf => vcf.remove());
    this._loadWidgets();
  }

  ngAfterViewInit(): void {
    this._loadWidgets();
  }

  drop(event: CdkDragDrop<string[]>) {
    enableSaveGuard();
    moveItemInArray(this.widgets, event.previousIndex, event.currentIndex);
  }
  onChangeShow(checked: boolean, widgetName: string) {
    enableSaveGuard();
    this.widgets.find(w => w.name === widgetName).registeredToShow = checked;
  }

  onDelete(widget: Widget) {
    enableSaveGuard();
    this.widgets = this.widgets.filter(w => w.name !== widget.name);
    this.snackbar.open('ویجت حذف شد');
  }
  onOpenWidgetLists() {
    this.dialog.open(SettingsWidgetListDialogComponent,
      { data: { currentWidgets: this.widgets, socialType: this.socialType } })
      .afterClosed()
      .subscribe((r: Widget[]) => {
        if (r) {
          console.log(r);

          this.widgets = r;
          this.store.dispatch(SocialActions.SocialWidgetsUpdating({
            socialType: SocialType.FORUM,
            widgets: r.slice(),
            sname: this.sname
          }));
          this._reloadWidgets();
        }
      });

  }
  onEdit(widget: Widget) {
    this.dialog.open(EditWidgetDialogComponent, { data: widget }).afterClosed().subscribe((r: Widget) => {
      if (r) {
        this.widgets = this.widgets.map(w => widget.name === w.name ? r : w);
        this.store.dispatch(SocialActions.SocialWidgetUpdating({ sname: this.sname, socialType: SocialType.FORUM, widget: r }));
        this._reloadWidgets();
      }
    });
  }

  onSave() {
    this.store.dispatch(SocialActions.SocialWidgetsUpdating({
      socialType: SocialType.FORUM,
      widgets: this.widgets.slice(),
      sname: this.sname
    }));
  }

}

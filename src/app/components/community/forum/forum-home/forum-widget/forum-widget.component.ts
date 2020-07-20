import {
  Component,
  OnInit,
  Input,
  ViewContainerRef,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import { WidgetLoaderService } from '@app/components/widgets/widget-loader.service';
import { Widget } from '@app/interfaces/widgets.interface';

@Component({
  selector: 'app-forum-widget',
  templateUrl: './forum-widget.component.html',
  styleUrls: ['./forum-widget.component.scss']
})
export class ForumWidgetComponent implements OnInit, AfterViewInit {
  @Input()
  widgets: Widget[];
  @Input()
  isRegistered: boolean;
  @ViewChild('widgetContainer', { read: ViewContainerRef })
  widgetContainer: ViewContainerRef;
  notLoadedWidgets: number;
  constructor(private widgetLoader: WidgetLoaderService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.notLoadedWidgets = this.widgets?.length || 0;

  }
  ngAfterViewInit(): void {
    // TODO: check if it's mobile don't load widgets at all for performance
    // TODO: POTENTIAL BUG: it will error when timeout remove because of order which is set in load method.
    // some widgets create sooner than others.
    this.widgets?.forEach((widget, i) => {
      if (!widget.registeredToShow || this.isRegistered) {
        setTimeout(() => {
          this.widgetLoader.load(widget.name, this.widgetContainer, widget.inputs, widget.viewValue).then(() => {
            this.notLoadedWidgets -= 1;
            this.changeDetector.detectChanges();
          });
        }, i * 200);
      } else {
        this.notLoadedWidgets -= 1;
        this.changeDetector.detectChanges();

      }
    }
    );
  }
}

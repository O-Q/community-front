import { Component, OnInit, Input, ViewChild, ViewContainerRef, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { WidgetLoaderService } from '../../../../widgets/widget-loader.service';
import { Widget } from '../../../../../../../server/dist/blog/interfaces/blog.interface';

@Component({
  selector: 'app-blog-widget',
  templateUrl: './blog-widget.component.html',
  styleUrls: ['./blog-widget.component.scss']
})
export class BlogWidgetComponent implements OnInit, AfterViewInit {
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

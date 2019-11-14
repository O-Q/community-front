import {
  Component,
  OnInit,
  Input,
  ViewContainerRef,
  ViewChild,
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import { WidgetLoaderService } from '../../../widgets/widget-loader.service';
import { Widget } from '../../../../interfaces/widgets.interface';

@Component({
  selector: 'app-forum-widget',
  templateUrl: './forum-widget.component.html',
  styleUrls: ['./forum-widget.component.scss']
})
export class ForumWidgetComponent implements OnInit, AfterViewInit {
  @Input()
  widgets: Widget[];
  @ViewChild('widgetContainer', { read: ViewContainerRef, static: false })
  widgetContainer: ViewContainerRef;
  notLoadedWidgets: number;
  constructor(private widgetLoader: WidgetLoaderService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.notLoadedWidgets = this.widgets.length;
  }
  ngAfterViewInit(): void {
    // TODO: fetch widget list for this forum/blog
    this.widgets.forEach((widget) => {
      this.widgetLoader.load(widget.name, this.widgetContainer, widget.inputs).then(() => {
        this.notLoadedWidgets -= 1;
        this.changeDetector.detectChanges();
      });
    }
    );
  }
}

import {
  Component,
  OnInit,
  Input,
  ViewContainerRef,
  ViewChild
} from '@angular/core';
import { WidgetLoaderService } from '../../../../services/widget-loader.service';

@Component({
  selector: 'app-community-widget',
  templateUrl: './community-widget.component.html',
  styleUrls: ['./community-widget.component.scss']
})
export class CommunityWidgetComponent implements OnInit {
  @Input()
  widgets;
  @ViewChild('widget-container', { read: ViewContainerRef, static: false })
  widgetContainer: ViewContainerRef;
  users = [
    { name: 'Mahdi', url: 'https://google.com', value: 50 },
    { name: 'Asghar', url: 'https://yahoo.com', value: 60 }
  ];
  constructor(private widgetLoader: WidgetLoaderService) {}

  ngOnInit() {
    // TODO: fetch widget list for this group/blog
    const widgetNames: string[] = [];
    widgetNames.forEach(name =>
      this.widgetLoader.load(name, this.widgetContainer)
    );
  }
}

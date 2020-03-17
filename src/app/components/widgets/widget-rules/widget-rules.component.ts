import { Component, OnInit } from '@angular/core';
import { RuleGroup } from '../../../interfaces/widgets.interface';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/state';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-widget-rules',
  templateUrl: './widget-rules.component.html',
  styleUrls: ['./widget-rules.component.scss']
})
export class WidgetRulesComponent implements OnInit {
  rules$: Observable<RuleGroup[]> = this.store.select('social').pipe(map(x => x.social.rules));
  constructor(private store: Store<AppState>) { }

  ngOnInit() { }
}

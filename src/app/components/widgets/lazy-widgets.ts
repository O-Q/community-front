import { NgModuleFactory, Type } from '@angular/core';
import { WidgetNames } from '../../../../shared/widget-list.enum';

export const lazyWidgets: {
  path: string;
  loadChildren: () => Promise<NgModuleFactory<any> | Type<any>>;
}[] = [
  {
    path: WidgetNames.RULES,
    loadChildren: () =>
      import('./widget-rules/widget-rules.module').then(
        m => m.WidgetRulesModule
      )
  },
  {
    path: WidgetNames.USER_LIST,
    loadChildren: () =>
      import('./widget-users-list/widget-user-list.module').then(
        m => m.WidgetUserListModule
      )
  }
];

export function LoadWidgetMap() {
  const result = {};
  for (const w of lazyWidgets) {
    result[w.path] = w.loadChildren;
  }
  return result;
}

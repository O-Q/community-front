import { NgModuleFactory, Type } from '@angular/core';
import { WIDGETS } from '@app/constants/social.constant';

export const lazyWidgets: {
  path: string;
  loadChildren: () => Promise<NgModuleFactory<any> | Type<any>>;
}[] = [
    {
      path: WIDGETS.RULES,
      loadChildren: () =>
        import('./widget-rules/widget-rules.module').then(
          m => m.WidgetRulesModule
        )
    },
    {
      path: WIDGETS.USER_LIST,
      loadChildren: () =>
        import('./widget-users-list/widget-user-list.module').then(
          m => m.WidgetUserListModule
        )
    },
    {
      path: WIDGETS.CHAT,
      loadChildren: () => import('./widget-chat/widget-chat.module').then(
        m => m.WidgetChatModule
      )
    },
    {
      path: WIDGETS.FLAIRS,
      loadChildren: () => import('./widget-flairs/widget-flairs.module').then(
        m => m.WidgetFlairsModule
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

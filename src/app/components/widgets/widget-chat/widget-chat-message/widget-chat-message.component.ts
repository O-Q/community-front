import { Component, OnInit, Input, ComponentRef } from '@angular/core';
import { Observable } from 'rxjs';

import * as fromAuth from '@store/auth/auth.reducer';

@Component({
  selector: 'app-widget-chat-message',
  templateUrl: './widget-chat-message.component.html',
  styleUrls: ['./widget-chat-message.component.scss']
})
export class WidgetChatMessageComponent {
  @Input()
  chatMessage: { username: string, message: string };

  @Input()
  selfRef: ComponentRef<WidgetChatMessageComponent>;

  @Input()
  auth$: Observable<fromAuth.State>;

  removeMessage() {
    // TODO: it maybe need by Moderators to remove inappropriate message
    this.selfRef.destroy();

  }
}

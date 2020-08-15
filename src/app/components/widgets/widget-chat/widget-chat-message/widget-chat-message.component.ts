import { Component, OnInit, Input, ComponentRef } from '@angular/core';
import { Observable } from 'rxjs';

import * as fromAuth from '@store/auth/auth.reducer';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-widget-chat-message',
  templateUrl: './widget-chat-message.component.html',
  styleUrls: ['./widget-chat-message.component.scss']
})
export class WidgetChatMessageComponent implements OnInit {
  @Input()
  chatMessage: { username: string, message: string };

  @Input()
  selfRef: ComponentRef<WidgetChatMessageComponent>;

  @Input()
  auth$: Observable<fromAuth.State>;

  isMe: boolean;


  async ngOnInit() {
    this.isMe = (await this.auth$.pipe(first()).toPromise()).user.username === this.chatMessage.username;
  }
  removeMessage() {
    // TODO: it maybe need by Moderators to remove inappropriate message
    this.selfRef.destroy();

  }
}

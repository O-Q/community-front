import { Component, OnInit, ViewContainerRef, ViewChild, ComponentFactoryResolver, Input, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import * as fromAuth from '@store/auth/auth.reducer';
import * as fromApp from '@store/state';
import { Socket } from 'ngx-socket-io';
import { first, map } from 'rxjs/operators';
import { WidgetChatMessageComponent } from './widget-chat-message/widget-chat-message.component';
import { User } from '../../../models/user.model';

enum ServerEvent {
  JOIN_CHAT = 'joinChat',
  SEND_MESSAGE_CHAT = 'sendMessageChat'
}
enum ClientEvent {
  CHAT = 'chat',
  ONLINE_CHAT = 'onlineChat',
  LATEST_MESSAGE = 'latestMessage',
  EXCEPTION = 'exception'
}


@Component({
  selector: 'app-widget-chat',
  templateUrl: './widget-chat.component.html',
  styleUrls: ['./widget-chat.component.scss'],
})
export class WidgetChatComponent implements OnInit {
  @Input()
  viewValue: string;


  @ViewChild('messageContainer', { read: ViewContainerRef })
  messageContainer: ViewContainerRef;
  connected = false;
  auth$: Observable<fromAuth.State>;
  onlineUsers$ = this._fromOnlineChat();
  // onlineUsers$ = of(1);
  sid: string;
  message: string;
  constructor(
    private store: Store<fromApp.AppState>,
    private socket: Socket,
    private componentFactoryResolver: ComponentFactoryResolver,
    private change: ChangeDetectorRef,
  ) { }

  async ngOnInit() {
    this.auth$ = this.store.select('auth');
    const social = await this.store.select('social').pipe(first()).toPromise();
    this.sid = social.social._id;
    console.log(this.sid);
  }

  connect() {
    this._fromOnlineChat();
    this._fromException();
    this._fromChat();
    this._joinChat(this.sid);
    this._fromLatestMessages();
    this.connected = true;
  }

  sendMessage(username: string) {
    // TODO: shift+enter and enter
    this.socket.emit(ServerEvent.SEND_MESSAGE_CHAT, { message: this.message, sid: this.sid });
    this.addMessageComponent({ message: this.message, username });
    this.message = undefined;
  }

  addMessageComponent(message: ChatRoomMessage) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(WidgetChatMessageComponent);
    const componentRef = this.messageContainer.createComponent<WidgetChatMessageComponent>(componentFactory);
    componentRef.instance.chatMessage = message;
    componentRef.instance.auth$ = this.auth$;
    componentRef.instance.selfRef = componentRef;
    this.change.detectChanges();
  }
  private _joinChat(sid: string) {
    this.socket.emit(ServerEvent.JOIN_CHAT, { sid });
  }
  private _fromException() {
    this.socket.fromEvent(ClientEvent.EXCEPTION).subscribe(x => console.log(x));
  }
  private _fromLatestMessages() {
    this.socket.fromEvent<ChatRoomMessage[]>(ClientEvent.LATEST_MESSAGE)
      .pipe(first()).subscribe(messages => {
        if (messages.length) {
          messages.forEach(m => this.addMessageComponent(m));
        } else {
          this.addMessageComponent(null);
        }
      });
  }
  private _fromChat() {
    this.socket.fromEvent<ChatRoomMessage>(ClientEvent.CHAT).subscribe(m => this.addMessageComponent(m));
  }
  private _fromOnlineChat(): Observable<number> {
    return this.socket.fromEvent<number>(ClientEvent.ONLINE_CHAT);
  }

}


interface ChatRoomMessage {
  message: string;
  username: string;
}

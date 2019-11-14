import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetChatComponent } from './widget-chat.component';
import { MatCardModule, MatIconModule, MatListModule, MatInputModule, MatButtonModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ACCESS_TOKEN_KEY } from '../../../constants/local-storage.constant';
import { WidgetChatMessageComponent } from './widget-chat-message/widget-chat-message.component';

const config: SocketIoConfig = { url: 'http://localhost:8080', options: { query: { token: localStorage.getItem(ACCESS_TOKEN_KEY) } } };


@NgModule({
  declarations: [WidgetChatComponent, WidgetChatMessageComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    SocketIoModule.forRoot(config),
  ],
  entryComponents: [WidgetChatComponent, WidgetChatMessageComponent]
})
export class WidgetChatModule {
  static entry = WidgetChatComponent;
}

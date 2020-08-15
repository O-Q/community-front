import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetChatComponent } from './widget-chat.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ACCESS_TOKEN_KEY } from '@app/constants/local-storage.constant';
import { WidgetChatMessageComponent } from './widget-chat-message/widget-chat-message.component';
import { environment } from '@env/environment';

const config: SocketIoConfig = {
  url: `ws://localhost:8080`,
  options: { query: { token: localStorage.getItem(ACCESS_TOKEN_KEY) } }
};


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
})
export class WidgetChatModule {
  static entry = WidgetChatComponent;
}

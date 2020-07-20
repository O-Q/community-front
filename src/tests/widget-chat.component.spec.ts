import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetChatComponent } from '@app/components/widgets/widget-chat/widget-chat.component';
import { SocketIoModule } from 'ngx-socket-io';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { State } from '../app/store/auth/auth.reducer';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
describe('WidgetChatComponent', () => {
  let component: WidgetChatComponent;
  let fixture: ComponentFixture<WidgetChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WidgetChatComponent],
      imports: [SocketIoModule.forRoot({ url: null })],
      providers: [provideMockStore({ selectors: [{ selector: 'auth', value: { user: {} } }] })]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetChatComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should connect Button causes a try to connect to the WS server', () => {
    console.log('ccc', component.connected);
    clickByCSS('#joinChat');
    fixture.detectChanges();
    const messages = fixture.debugElement.query(By.css('#messages'));
    expect(messages).toBeTruthy();
  });
  function clickByCSS(selector: string) {
    const debugElement = fixture.debugElement.query(By.css(selector));
    const el: HTMLElement = debugElement.nativeElement;
    el.click();
    fixture.detectChanges();
  }
});



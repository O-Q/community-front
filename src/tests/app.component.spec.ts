import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '@app/app.component';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from '@store/state';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        provideMockStore(),
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  }));


  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('shouldn\'t be in loading after rendering', async () => {
    const compiled = fixture.debugElement.nativeElement;
    await fixture.whenRenderingDone();
    expect(compiled.querySelector('#loading')).toBeFalsy();
  });
});

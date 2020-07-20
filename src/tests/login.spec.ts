import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StoreModule, Store } from '@ngrx/store';
import { LoginComponent } from '../app/components/shared/login/login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MaterialBaseModule } from '../app/material.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import * as AuthReducer from '@store/auth/auth.reducer';

import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '../app/store/auth/auth.effects';
import { AppState, rootReducer } from '../app/store/state';
import { of, throwError } from 'rxjs';
import { UserInfoEffects } from '../app/store/user-info/user-info.effects';

describe('Login Test', () => {
    const dummyJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QxIiwicm9sZXMiOltdLCJpZCI6IjVlNmZhNGRkNTUyNzE1MzZmMDM3MzRiYyIsImlhdCI6MTU5MjA5NDIxNywiZXhwIjoxNTkyMDk3ODE3fQ.riRMTp-YtolVJxFhvIy8arYykd5vlkJ3Em_bP7H0kRw';
    let fixture: ComponentFixture<LoginComponent>;
    let component: LoginComponent;
    let store: Store<AppState>;
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get']);
    const initialState = { ...AuthReducer.INIT_STATE } as any;
    const dialogMock = {
        close: () => { }
    };
    beforeEach((async () => {
        await TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [
                RouterTestingModule,
                CommonModule,
                MatFormFieldModule,
                ReactiveFormsModule,
                FormsModule,
                MaterialBaseModule,
                MatInputModule,
                NoopAnimationsModule,
                StoreModule.forRoot(rootReducer),
                EffectsModule.forRoot([AuthEffects, UserInfoEffects])
            ],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: MatDialogRef, useValue: dialogMock },
                { provide: HttpClient, useValue: httpClientSpy },
            ]
        }).compileComponents();
        httpClientSpy.get = () => of({ accessToken: dummyJWT });
        fixture = TestBed.createComponent(LoginComponent);
        fixture.detectChanges();
        component = fixture.debugElement.componentInstance;
        store = TestBed.inject(Store);
        const username = 'test1';
        component.form.get('username').setValue(username);
        component.form.get('password').setValue('passw0rd');
    }));

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should login successfully', async((done) => {
        httpClientSpy.post = () => of({ accessToken: dummyJWT });
        let loginSuccess = false;
        spyOn(component, 'onClose').and.callFake(() => { // when user logged in successfully, dialog will close. so spyOn it.
            loginSuccess = true;
        });
        clickByCSS('#loginClick');
        // TODO: need marble or delay
        // expect(getLoadingCSS()).toBeTruthy();
        fixture.detectChanges();
        expect(loginSuccess).toBe(true);
        expect(getLoadingCSS()).not.toBeTruthy();
    }));


    it('should show wrong password/username ERROR', () => {
        httpClientSpy.post = () => throwError({ status: 401 });
        // fill the form with wrong data
        clickByCSS('#loginClick');
        // expect(getLoadingCSS()).toBeTruthy();
        fixture.detectChanges();

        console.log(getErrorText());
        expect(getErrorText()).toBeTruthy();
        expect(getLoadingCSS()).not.toBeTruthy();
    });


    function clickByCSS(selector: string) {
        const debugElement = fixture.debugElement.query(By.css(selector));
        const el: HTMLElement = debugElement.nativeElement;
        el.click();
        fixture.detectChanges();
    }

    function getErrorText() {
        const de = fixture.debugElement;
        return de.queryAll(By.css('#authError'))[0]?.nativeElement.textContent;

    }
    function getLoadingCSS() {
        const de = fixture.debugElement;
        return de.queryAll(By.css('#loading'))[0];
    }
});

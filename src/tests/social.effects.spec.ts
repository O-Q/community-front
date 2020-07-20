import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { SocialEffects } from '../app/store/social/social.effects';
import { SocialType } from '../app/models/user.model';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideMockStore } from '@ngrx/store/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

describe('Store [Social] | Effects', () => {
    let actions$: Observable<Action>;
    let effects: SocialEffects;
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    beforeEach(() => {
        const moduleRef = TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, MatSnackBarModule],
            providers: [provideMockActions(() => actions$), SocialEffects, provideMockStore(), {
                provide: HttpClient, useValue: httpClientSpy,
            }, {
                provide: Router, useValue: routerSpy
            }],
        });
        effects = moduleRef.inject(SocialEffects);
    });
    it('should listen to Create Social and dispatch User Social Created', (done) => {
        httpClientSpy.post = () => (of(1));
        actions$ = of({
            type: '[Social] Social Create Start',
            name: '',
            subject: '',
            title: '',
            description: '',
            flairs: [],
            socialType: SocialType.FORUM
        });

        effects.socialCreate.subscribe(action => {
            expect(action).toEqual({
                type: '[User] User Social Created',
                social: {
                    notifications: 0,
                    role: 'CREATOR',
                    social: { flairs: [], _id: 1, name: '', type: SocialType.FORUM },
                    status: 'ACTIVE',
                    writeAccess: true,
                }
            });
            done();
        });
    });
});

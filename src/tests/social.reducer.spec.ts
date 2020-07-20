import * as fromReducer from '@store/social/social.reducer';
import * as fromActions from '@store/social/social.actions';

describe('Store [Social] | Reducer', () => {
    const INIT_STATE = { ...fromReducer.INIT_STATE };

    it('Should return the default state', () => {
        const initialState = { ...INIT_STATE };
        const state = fromReducer.reducer(undefined, { type: null });
        expect(state).toEqual(initialState);
    });

    it('Should reduce fetched Social', () => {
        const initialState = { ...INIT_STATE };
        const payload = {
            social: [{ name: 'testSocial' }],
        };
        const action = fromActions.SocialFetched(payload);
        const state = fromReducer.reducer(initialState, action);
        expect(state.social).toEqual(payload.social);
    });
});

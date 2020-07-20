import { AppState } from '../state';

import * as fromUser from './user.reducer';
import * as UserState from './user.actions';
import { createSelector } from '@ngrx/store';
export { fromUser, UserState };


export const getSelectedSocial = (state: AppState) => state.user.user?.socials
    .find(s => s.social.name === decodeURI(window.location.href.split(/\/[cb]\//)[1].split('/')[0])).social;

/**
 * @note `null` if user has no role. `undefined` if social not loaded.
 */
export const getUserSocialRole = createSelector((state: AppState) => {
    const socialName = state.social.social?.name;
    if (socialName) {
        const social = state.user.user?.socials?.find(s => s.social.name === socialName);
        return social?.role || null;
    } else {
        return undefined;
    }

}, (r) => r);

/**
 * @note `null` if user has no role. `undefined` if social not loaded.
 */
export const getUserSocialWriteAccess = (state: AppState) => {
    const socialName = state.social.social?.name;
    if (socialName) {
        const social = state.user.user?.socials?.find(s => s.social.name === socialName);
        return social?.writeAccess || null;
    } else {
        return undefined;
    }
};


// export const isUserModeratorSocial = (socialName:string) => 
// createSelector(getUserSocialRole(socialName),(x)=> SocialUserRole.some(r => r.v))
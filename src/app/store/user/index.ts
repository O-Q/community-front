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
export const getUserSocialRole = (state: AppState) => {
    const social = _getSocial(state);
    return social?.role || null;
};

/**
 * @note `null` if user has no role. `undefined` if social not loaded.
 */
export const getUserSocialWriteAccess = (state: AppState) => {
    const social = _getSocial(state);
    return social?.writeAccess || null;
};
export const getUserSocialWriteAccessRole = (state: AppState) => {
    const social = _getSocial(state);
    return social ? { writeAccess: social.writeAccess, role: social.role, permissionRoles: social['permissionRoles'] } : null;
};
function _getSocial(state: AppState) {
    const socialName = state.social.social?.name;
    if (socialName) {
        const social = { ...state.user.user?.socials?.find(s => s.social.name === socialName) };
        if (social) {
            social['permissionRoles'] = state.social.social.permissionRoles;
        }
        return social;
    } else {
        return undefined;
    }
}


// export const isUserModeratorSocial = (socialName:string) => 
// createSelector(getUserSocialRole(socialName),(x)=> SocialUserRole.some(r => r.v))
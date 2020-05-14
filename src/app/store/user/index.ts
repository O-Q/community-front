import { AppState } from '../state';

import * as fromUser from './user.reducer';
import * as UserState from './user.actions';
export { fromUser, UserState };


export const getSelectedSocial = (state: AppState) => state.user.user?.socials
    .find(s => s.social.name === decodeURI(window.location.href.split(/\/[cb]/)[1].split('/')[1])).social;

export const getUserSocialRole = (state: AppState) => {
    const socialName = state.social.social?.name;
    return state.user.user?.socials?.find(s => s.social.name === socialName)?.role;
};


// export const isUserModeratorSocial = (socialName:string) => 
// createSelector(getUserSocialRole(socialName),(x)=> SocialUserRole.some(r => r.v))
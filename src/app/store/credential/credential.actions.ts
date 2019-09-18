import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const login = createAction('[Auth] Login', props<{ payload: User }>());
export const logout = createAction('[Auth] Logout');

// can add requesting, success and failure

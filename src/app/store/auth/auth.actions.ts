import { createAction, props } from '@ngrx/store';
import { User } from '@app/models/user.model';


export const loadUser = createAction('[Auth] Load User', props<{ user: User, mode?: 'signin' | 'signup' }>());
export const loginStart = createAction(
  '[Auth] Login Start',
  props<SigninStartPayload>()
);
export const authenticateFail = createAction(
  '[Auth] Authenticate Fail',
  props<{ payload: { message: string; mode: Mode } }>()
);
export const signupStart = createAction(
  '[Auth] Signup Start',
  props<SignupStartPayload>()
);
export const logout = createAction('[Auth] Logout', props<{ silent: boolean, message?: string }>());

interface SigninStartPayload {
  username: string;
  password: string;
}
interface SignupStartPayload {
  username: string;
  email: string;
  password: string;
}

interface AuthSuccessPayload {
  mode: Mode;
  user: User;
}

type Mode = 'signin' | 'signup';

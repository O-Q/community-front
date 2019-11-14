import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';


export const loadUser = createAction('[Auth] Load User', props<{ payload: User }>());
export const loginStart = createAction(
  '[Auth] Login Start',
  props<SigninStartPayload>()
);
export const authenticateSuccess = createAction(
  '[Auth] Authenticate Success',
  props<{ payload: AuthSuccessPayload }>()
);
export const authenticateFail = createAction(
  '[Auth] Authenticate Fail',
  props<{ payload: { message: string; mode: Mode } }>()
);
export const signupStart = createAction(
  '[Auth] Signup Start',
  props<SignupStartPayload>()
);
export const logout = createAction('[Auth] Logout');

interface SigninStartPayload {
  username: string;
  password: string;
}
interface SignupStartPayload {
  username: string;
  email: string;
  password: string;
  phone: number;
}

interface AuthSuccessPayload {
  mode: Mode;
  user: User;
}

type Mode = 'signin' | 'signup';

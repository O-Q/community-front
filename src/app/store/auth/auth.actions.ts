import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const loginStart = createAction(
  '[Auth] Login Start',
  props<SigninStartPayload>()
);
export const authenticateSuccess = createAction(
  '[Auth] Authenticate Success',
  props<{ payload: User }>()
);
export const authenticateFail = createAction(
  '[Auth] Authenticate Fail',
  props<{ payload: { message: string; mode: 'signin' | 'signup' } }>()
);
export const signupStart = createAction(
  '[Auth] Signup Start',
  props<SignupStartPayload>()
);
export const logout = createAction('[Auth] Logout');

// can add requesting, success and failure

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

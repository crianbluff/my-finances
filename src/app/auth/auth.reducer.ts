// Actions
import * as fromAuth from '@auth/auth.action';

// Models
import { User } from '@auth/user.model';

export interface AuthState {
  user: User;
};

const initState:AuthState = {
  user: null
};

export function authReducer (state = initState, action:fromAuth.actions): AuthState {
  switch (action.type) {
    case fromAuth.SET_USER:
      return {
        user: { ...action.user }
      };

    case fromAuth.UNSET_USER:
      return {
        user: null
      };
  
    default:
      return state;
  }
};